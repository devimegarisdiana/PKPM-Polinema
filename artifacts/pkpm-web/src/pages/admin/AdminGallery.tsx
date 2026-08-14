import { useState } from "react";
import { useListGallery } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import AdminTable from "@/components/admin/AdminTable";
import AdminModal from "@/components/admin/AdminModal";
import ImageUpload from "@/components/admin/ImageUpload";
import { adminFetch } from "@/hooks/useAdmin";

type GalleryItem = { id: number; title: string; type: string; url: string; category?: string | null; description?: string | null; thumbnailUrl?: string | null };
const EMPTY = { title: "", description: "", type: "photo", url: "", thumbnailUrl: "", category: "" };

export default function AdminGallery() {
  const qc = useQueryClient();
  const { data: items = [], isLoading } = useListGallery({});
  const [modal, setModal] = useState({ open: false, editing: null as GalleryItem | null });
  const [form, setForm] = useState({ ...EMPTY });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const openCreate = () => { setForm({ ...EMPTY }); setModal({ open: true, editing: null }); setError(""); };
  const openEdit = (row: GalleryItem) => {
    setForm({ title: row.title, description: row.description ?? "", type: row.type, url: row.url, thumbnailUrl: row.thumbnailUrl ?? "", category: row.category ?? "" });
    setModal({ open: true, editing: row }); setError("");
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true); setError("");
    try {
      if (modal.editing) await adminFetch(`/admin/gallery/${modal.editing.id}`, { method: "PUT", body: JSON.stringify(form) });
      else await adminFetch("/admin/gallery", { method: "POST", body: JSON.stringify(form) });
      await qc.invalidateQueries(); setModal({ open: false, editing: null });
    } catch (err) { setError(err instanceof Error ? err.message : "Gagal"); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus item galeri ini?")) return;
    await adminFetch(`/admin/gallery/${id}`, { method: "DELETE" }); await qc.invalidateQueries();
  };

  const F = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm(p => ({ ...p, [k]: e.target.value }));

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-gray-900">Galeri</h1><p className="text-gray-500 text-sm mt-1">{items.length} item</p></div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-[#0a2558] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#0d2f6b]">
          <Plus className="w-4 h-4" /> Tambah Item
        </button>
      </div>
      <div className="bg-white rounded-xl border border-gray-100">
        <AdminTable loading={isLoading} data={items as GalleryItem[]} onEdit={openEdit} onDelete={handleDelete}
          columns={[
            { key: "thumbnailUrl", label: "Preview", render: r => r.thumbnailUrl
              ? <img src={r.thumbnailUrl} alt={r.title} className="w-12 h-9 object-cover rounded" />
              : <div className="w-12 h-9 bg-gray-100 rounded flex items-center justify-center text-gray-400 text-xs">—</div>
            },
            { key: "title", label: "Judul" },
            { key: "type", label: "Jenis", render: r => <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${r.type === "video" ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"}`}>{r.type === "video" ? "Video" : "Foto"}</span> },
            { key: "category", label: "Kategori" },
          ]} />
      </div>
      <AdminModal title={modal.editing ? "Edit Galeri" : "Tambah Item Galeri"} open={modal.open} onClose={() => setModal({ open: false, editing: null })}>
        <form onSubmit={handleSave} className="space-y-4">
          <Field label="Judul *"><input className={inp} value={form.title} onChange={F("title")} required /></Field>
          <Field label="Deskripsi"><textarea className={inp + " h-20"} value={form.description} onChange={F("description")} /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Jenis *">
              <select className={inp} value={form.type} onChange={F("type")}>
                <option value="photo">Foto</option>
                <option value="video">Video</option>
              </select>
            </Field>
            <Field label="Kategori"><input className={inp} value={form.category} onChange={F("category")} placeholder="Kegiatan, Pelatihan, dst." /></Field>
          </div>
          {form.type === "photo" ? (
            <ImageUpload
              label="Foto *"
              value={form.url}
              onChange={(url) => setForm(p => ({ ...p, url }))}
              placeholder="https://... atau upload foto"
            />
          ) : (
            <Field label="URL Video *">
              <input className={inp} value={form.url} onChange={F("url")} required placeholder="https://youtube.com/... atau https://..." />
            </Field>
          )}
          <ImageUpload
            label="Thumbnail"
            value={form.thumbnailUrl}
            onChange={(url) => setForm(p => ({ ...p, thumbnailUrl: url }))}
            placeholder="https://... (opsional untuk video)"
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
