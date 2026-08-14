import { useState } from "react";
import { useListUmkm } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import AdminTable from "@/components/admin/AdminTable";
import AdminModal from "@/components/admin/AdminModal";
import ImageUpload from "@/components/admin/ImageUpload";
import { adminFetch } from "@/hooks/useAdmin";

type Umkm = { id: number; name: string; sector: string; ownerName: string; location: string; description: string; logoUrl?: string | null; products?: string | null; joinedYear?: number | null };

const EMPTY = { name: "", description: "", sector: "", ownerName: "", location: "", logoUrl: "", products: "", joinedYear: "" };

export default function AdminUmkm() {
  const qc = useQueryClient();
  const { data: umkm = [], isLoading } = useListUmkm();
  const [modal, setModal] = useState({ open: false, editing: null as Umkm | null });
  const [form, setForm] = useState({ ...EMPTY });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const openCreate = () => { setForm({ ...EMPTY }); setModal({ open: true, editing: null }); setError(""); };
  const openEdit = (row: Umkm) => {
    setForm({ name: row.name, description: row.description, sector: row.sector, ownerName: row.ownerName, location: row.location, logoUrl: row.logoUrl ?? "", products: row.products ?? "", joinedYear: row.joinedYear ? String(row.joinedYear) : "" });
    setModal({ open: true, editing: row }); setError("");
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true); setError("");
    try {
      if (modal.editing) await adminFetch(`/admin/umkm/${modal.editing.id}`, { method: "PUT", body: JSON.stringify(form) });
      else await adminFetch("/admin/umkm", { method: "POST", body: JSON.stringify(form) });
      await qc.invalidateQueries(); setModal({ open: false, editing: null });
    } catch (err) { setError(err instanceof Error ? err.message : "Gagal"); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus UMKM ini?")) return;
    await adminFetch(`/admin/umkm/${id}`, { method: "DELETE" }); await qc.invalidateQueries();
  };

  const F = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm(p => ({ ...p, [k]: e.target.value }));

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-gray-900">UMKM Binaan</h1><p className="text-gray-500 text-sm mt-1">{umkm.length} UMKM</p></div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-[#0a2558] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#0d2f6b]">
          <Plus className="w-4 h-4" /> Tambah UMKM
        </button>
      </div>
      <div className="bg-white rounded-xl border border-gray-100">
        <AdminTable loading={isLoading} data={umkm as Umkm[]} onEdit={openEdit} onDelete={handleDelete}
          columns={[
            { key: "name", label: "Nama UMKM" },
            { key: "sector", label: "Sektor" },
            { key: "ownerName", label: "Pemilik" },
            { key: "location", label: "Lokasi" },
            { key: "joinedYear", label: "Tahun Bergabung" },
          ]} />
      </div>
      <AdminModal title={modal.editing ? "Edit UMKM" : "Tambah UMKM"} open={modal.open} onClose={() => setModal({ open: false, editing: null })}>
        <form onSubmit={handleSave} className="space-y-4">
          <Field label="Nama UMKM *"><input className={inp} value={form.name} onChange={F("name")} required /></Field>
          <Field label="Deskripsi *"><textarea className={inp + " h-24"} value={form.description} onChange={F("description")} required /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Sektor *"><input className={inp} value={form.sector} onChange={F("sector")} required /></Field>
            <Field label="Nama Pemilik *"><input className={inp} value={form.ownerName} onChange={F("ownerName")} required /></Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Lokasi *"><input className={inp} value={form.location} onChange={F("location")} required /></Field>
            <Field label="Tahun Bergabung"><input type="number" className={inp} value={form.joinedYear} onChange={F("joinedYear")} placeholder="2024" /></Field>
          </div>
          <Field label="Produk Unggulan"><input className={inp} value={form.products} onChange={F("products")} placeholder="Batik, Kerajinan, dst." /></Field>
          <ImageUpload
            label="Logo UMKM"
            value={form.logoUrl}
            onChange={(url) => setForm(p => ({ ...p, logoUrl: url }))}
          />
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
