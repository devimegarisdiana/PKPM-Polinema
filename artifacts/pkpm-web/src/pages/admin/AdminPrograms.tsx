import { useState } from "react";
import { useListPrograms } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import AdminTable from "@/components/admin/AdminTable";
import AdminModal from "@/components/admin/AdminModal";
import { adminFetch } from "@/hooks/useAdmin";

type Program = { id: number; title: string; description: string; category: string; status: string; startDate?: string | null; endDate?: string | null; imageUrl?: string | null };

const EMPTY = { title: "", description: "", category: "Pengembangan Kapasitas", status: "upcoming", startDate: "", endDate: "", imageUrl: "" };
const STATUSES = [{ v: "upcoming", l: "Akan Datang" }, { v: "ongoing", l: "Berlangsung" }, { v: "completed", l: "Selesai" }];
const STATUS_LABEL: Record<string, string> = { upcoming: "Akan Datang", ongoing: "Berlangsung", completed: "Selesai" };
const STATUS_COLOR: Record<string, string> = { upcoming: "bg-blue-100 text-blue-700", ongoing: "bg-green-100 text-green-700", completed: "bg-gray-100 text-gray-600" };

export default function AdminPrograms() {
  const qc = useQueryClient();
  const { data: programs = [], isLoading } = useListPrograms();
  const [modal, setModal] = useState({ open: false, editing: null as Program | null });
  const [form, setForm] = useState({ ...EMPTY });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const openCreate = () => { setForm({ ...EMPTY }); setModal({ open: true, editing: null }); setError(""); };
  const openEdit = (row: Program) => {
    setForm({ title: row.title, description: row.description, category: row.category, status: row.status, startDate: row.startDate ?? "", endDate: row.endDate ?? "", imageUrl: row.imageUrl ?? "" });
    setModal({ open: true, editing: row }); setError("");
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true); setError("");
    try {
      if (modal.editing) await adminFetch(`/admin/programs/${modal.editing.id}`, { method: "PUT", body: JSON.stringify(form) });
      else await adminFetch("/admin/programs", { method: "POST", body: JSON.stringify(form) });
      await qc.invalidateQueries(); setModal({ open: false, editing: null });
    } catch (err) { setError(err instanceof Error ? err.message : "Gagal"); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus program ini?")) return;
    await adminFetch(`/admin/programs/${id}`, { method: "DELETE" }); await qc.invalidateQueries();
  };

  const F = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm(p => ({ ...p, [k]: e.target.value }));

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-gray-900">Program</h1><p className="text-gray-500 text-sm mt-1">{programs.length} program</p></div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-[#0a2558] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#0d2f6b]">
          <Plus className="w-4 h-4" /> Tambah Program
        </button>
      </div>
      <div className="bg-white rounded-xl border border-gray-100">
        <AdminTable loading={isLoading} data={programs as Program[]} onEdit={openEdit} onDelete={handleDelete}
          columns={[
            { key: "title", label: "Nama Program", render: r => <span className="line-clamp-2 max-w-xs">{r.title}</span> },
            { key: "category", label: "Kategori" },
            { key: "status", label: "Status", render: r => <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLOR[r.status] ?? ""}`}>{STATUS_LABEL[r.status] ?? r.status}</span> },
            { key: "startDate", label: "Mulai" },
          ]} />
      </div>
      <AdminModal title={modal.editing ? "Edit Program" : "Tambah Program"} open={modal.open} onClose={() => setModal({ open: false, editing: null })}>
        <form onSubmit={handleSave} className="space-y-4">
          <Field label="Nama Program *"><input className={inp} value={form.title} onChange={F("title")} required /></Field>
          <Field label="Deskripsi *"><textarea className={inp + " h-28"} value={form.description} onChange={F("description")} required /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Kategori *"><input className={inp} value={form.category} onChange={F("category")} required /></Field>
            <Field label="Status *">
              <select className={inp} value={form.status} onChange={F("status")}>
                {STATUSES.map(s => <option key={s.v} value={s.v}>{s.l}</option>)}
              </select>
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Tanggal Mulai"><input type="date" className={inp} value={form.startDate} onChange={F("startDate")} /></Field>
            <Field label="Tanggal Selesai"><input type="date" className={inp} value={form.endDate} onChange={F("endDate")} /></Field>
          </div>
          <Field label="URL Gambar"><input className={inp} value={form.imageUrl} onChange={F("imageUrl")} placeholder="https://..." /></Field>
          {error && <p className="text-red-600 text-sm bg-red-50 rounded px-3 py-2">{error}</p>}
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="flex-1 bg-[#0a2558] text-white rounded-lg py-2.5 text-sm font-medium hover:bg-[#0d2f6b] disabled:opacity-60">{saving ? "Menyimpan..." : "Simpan"}</button>
            <button type="button" onClick={() => setModal({ open: false, editing: null })} className="px-4 py-2.5 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">Batal</button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}

const inp = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a2558]/40";
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>{children}</div>;
}
