import { useState } from "react";
import { useListPartners } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import AdminTable from "@/components/admin/AdminTable";
import AdminModal from "@/components/admin/AdminModal";
import { adminFetch } from "@/hooks/useAdmin";

type Partner = { id: number; name: string; type: string; description?: string | null; logoUrl?: string | null; website?: string | null; location?: string | null };
const EMPTY = { name: "", description: "", type: "government", logoUrl: "", website: "", location: "" };
const TYPES = [{ v: "government", l: "Pemerintah" }, { v: "industry", l: "Industri" }, { v: "university", l: "Perguruan Tinggi" }, { v: "community", l: "Komunitas" }, { v: "ngo", l: "LSM" }];
const TYPE_LABEL: Record<string, string> = { government: "Pemerintah", industry: "Industri", university: "Perguruan Tinggi", community: "Komunitas", ngo: "LSM" };

export default function AdminPartners() {
  const qc = useQueryClient();
  const { data: partners = [], isLoading } = useListPartners();
  const [modal, setModal] = useState({ open: false, editing: null as Partner | null });
  const [form, setForm] = useState({ ...EMPTY });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const openCreate = () => { setForm({ ...EMPTY }); setModal({ open: true, editing: null }); setError(""); };
  const openEdit = (row: Partner) => {
    setForm({ name: row.name, description: row.description ?? "", type: row.type, logoUrl: row.logoUrl ?? "", website: row.website ?? "", location: row.location ?? "" });
    setModal({ open: true, editing: row }); setError("");
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true); setError("");
    try {
      if (modal.editing) await adminFetch(`/admin/partners/${modal.editing.id}`, { method: "PUT", body: JSON.stringify(form) });
      else await adminFetch("/admin/partners", { method: "POST", body: JSON.stringify(form) });
      await qc.invalidateQueries(); setModal({ open: false, editing: null });
    } catch (err) { setError(err instanceof Error ? err.message : "Gagal"); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus mitra ini?")) return;
    await adminFetch(`/admin/partners/${id}`, { method: "DELETE" }); await qc.invalidateQueries();
  };

  const F = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm(p => ({ ...p, [k]: e.target.value }));

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-gray-900">Mitra Kerja Sama</h1><p className="text-gray-500 text-sm mt-1">{partners.length} mitra</p></div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-[#0a2558] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#0d2f6b]">
          <Plus className="w-4 h-4" /> Tambah Mitra
        </button>
      </div>
      <div className="bg-white rounded-xl border border-gray-100">
        <AdminTable loading={isLoading} data={partners as Partner[]} onEdit={openEdit} onDelete={handleDelete}
          columns={[
            { key: "name", label: "Nama Mitra" },
            { key: "type", label: "Jenis", render: r => <span className="text-xs bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full">{TYPE_LABEL[r.type] ?? r.type}</span> },
            { key: "location", label: "Lokasi" },
            { key: "website", label: "Website", render: r => r.website ? <a href={r.website} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline text-xs truncate max-w-[120px] block">{r.website}</a> : <span className="text-gray-400">—</span> },
          ]} />
      </div>
      <AdminModal title={modal.editing ? "Edit Mitra" : "Tambah Mitra"} open={modal.open} onClose={() => setModal({ open: false, editing: null })}>
        <form onSubmit={handleSave} className="space-y-4">
          <Field label="Nama Mitra *"><input className={inp} value={form.name} onChange={F("name")} required /></Field>
          <Field label="Deskripsi"><textarea className={inp + " h-24"} value={form.description} onChange={F("description")} /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Jenis *">
              <select className={inp} value={form.type} onChange={F("type")}>
                {TYPES.map(t => <option key={t.v} value={t.v}>{t.l}</option>)}
              </select>
            </Field>
            <Field label="Lokasi"><input className={inp} value={form.location} onChange={F("location")} /></Field>
          </div>
          <Field label="Website"><input className={inp} value={form.website} onChange={F("website")} placeholder="https://..." /></Field>
          <Field label="URL Logo"><input className={inp} value={form.logoUrl} onChange={F("logoUrl")} placeholder="https://..." /></Field>
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
