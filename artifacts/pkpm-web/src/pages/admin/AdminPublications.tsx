import { useState } from "react";
import { useListPublications } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import AdminTable from "@/components/admin/AdminTable";
import AdminModal from "@/components/admin/AdminModal";
import { adminFetch } from "@/hooks/useAdmin";

type Publication = { id: number; title: string; authors: string; type: string; publishedYear: number; journalName?: string | null; doiUrl?: string | null; pdfUrl?: string | null; abstract?: string | null; coverImageUrl?: string | null };

const EMPTY = { title: "", authors: "", abstract: "", type: "journal", journalName: "", publishedYear: String(new Date().getFullYear()), doiUrl: "", pdfUrl: "", coverImageUrl: "" };
const TYPES = [{ v: "journal", l: "Jurnal" }, { v: "conference", l: "Prosiding" }, { v: "book", l: "Buku" }, { v: "report", l: "Laporan" }];

export default function AdminPublications() {
  const qc = useQueryClient();
  const { data: pubs = [], isLoading } = useListPublications();
  const [modal, setModal] = useState({ open: false, editing: null as Publication | null });
  const [form, setForm] = useState({ ...EMPTY });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const openCreate = () => { setForm({ ...EMPTY }); setModal({ open: true, editing: null }); setError(""); };
  const openEdit = (row: Publication) => {
    setForm({ title: row.title, authors: row.authors, abstract: row.abstract ?? "", type: row.type, journalName: row.journalName ?? "", publishedYear: String(row.publishedYear), doiUrl: row.doiUrl ?? "", pdfUrl: row.pdfUrl ?? "", coverImageUrl: row.coverImageUrl ?? "" });
    setModal({ open: true, editing: row }); setError("");
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true); setError("");
    try {
      if (modal.editing) await adminFetch(`/admin/publications/${modal.editing.id}`, { method: "PUT", body: JSON.stringify(form) });
      else await adminFetch("/admin/publications", { method: "POST", body: JSON.stringify(form) });
      await qc.invalidateQueries(); setModal({ open: false, editing: null });
    } catch (err) { setError(err instanceof Error ? err.message : "Gagal"); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus publikasi ini?")) return;
    await adminFetch(`/admin/publications/${id}`, { method: "DELETE" }); await qc.invalidateQueries();
  };

  const F = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm(p => ({ ...p, [k]: e.target.value }));
  const TYPE_LABEL: Record<string, string> = { journal: "Jurnal", conference: "Prosiding", book: "Buku", report: "Laporan" };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-gray-900">Riset & Publikasi</h1><p className="text-gray-500 text-sm mt-1">{pubs.length} publikasi</p></div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-[#0a2558] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#0d2f6b]">
          <Plus className="w-4 h-4" /> Tambah Publikasi
        </button>
      </div>
      <div className="bg-white rounded-xl border border-gray-100">
        <AdminTable loading={isLoading} data={pubs as Publication[]} onEdit={openEdit} onDelete={handleDelete}
          columns={[
            { key: "title", label: "Judul", render: r => <span className="line-clamp-2 max-w-xs">{r.title}</span> },
            { key: "authors", label: "Penulis", render: r => <span className="truncate max-w-[120px] block">{r.authors}</span> },
            { key: "type", label: "Jenis", render: r => <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">{TYPE_LABEL[r.type] ?? r.type}</span> },
            { key: "publishedYear", label: "Tahun" },
          ]} />
      </div>
      <AdminModal title={modal.editing ? "Edit Publikasi" : "Tambah Publikasi"} open={modal.open} onClose={() => setModal({ open: false, editing: null })}>
        <form onSubmit={handleSave} className="space-y-4">
          <Field label="Judul *"><input className={inp} value={form.title} onChange={F("title")} required /></Field>
          <Field label="Penulis *"><input className={inp} value={form.authors} onChange={F("authors")} required placeholder="Nama1, Nama2, dst." /></Field>
          <Field label="Abstrak"><textarea className={inp + " h-24"} value={form.abstract} onChange={F("abstract")} /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Jenis *">
              <select className={inp} value={form.type} onChange={F("type")}>
                {TYPES.map(t => <option key={t.v} value={t.v}>{t.l}</option>)}
              </select>
            </Field>
            <Field label="Tahun Terbit *"><input type="number" className={inp} value={form.publishedYear} onChange={F("publishedYear")} required /></Field>
          </div>
          <Field label="Nama Jurnal / Prosiding"><input className={inp} value={form.journalName} onChange={F("journalName")} /></Field>
          <Field label="DOI / URL Artikel"><input className={inp} value={form.doiUrl} onChange={F("doiUrl")} placeholder="https://doi.org/..." /></Field>
          <Field label="URL PDF"><input className={inp} value={form.pdfUrl} onChange={F("pdfUrl")} placeholder="https://..." /></Field>
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
