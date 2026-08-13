import { useState } from "react";
import { useListArticles } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import AdminTable from "@/components/admin/AdminTable";
import AdminModal from "@/components/admin/AdminModal";
import { adminFetch } from "@/hooks/useAdmin";

type Article = {
  id: number; title: string; category: string; author: string;
  isFeatured: boolean; publishedAt: string; slug: string;
  excerpt?: string | null; content: string; imageUrl?: string | null;
  videoUrl?: string | null; mediaUrls: string[];
};

const EMPTY: Omit<Article, "id" | "slug"> = {
  title: "", category: "Berita", author: "", isFeatured: false,
  publishedAt: new Date().toISOString().slice(0, 10),
  excerpt: "", content: "", imageUrl: "", videoUrl: "", mediaUrls: [],
};

export default function AdminArticles() {
  const qc = useQueryClient();
  const { data: articles = [], isLoading } = useListArticles({});
  const [modal, setModal] = useState<{ open: boolean; editing: Article | null }>({ open: false, editing: null });
  const [form, setForm] = useState({ ...EMPTY });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function openCreate() {
    setForm({ ...EMPTY });
    setModal({ open: true, editing: null });
    setError("");
  }

  function openEdit(row: Article) {
    setForm({
      title: row.title, category: row.category, author: row.author,
      isFeatured: row.isFeatured,
      publishedAt: row.publishedAt?.slice(0, 10) ?? new Date().toISOString().slice(0, 10),
      excerpt: row.excerpt ?? "", content: row.content,
      imageUrl: row.imageUrl ?? "", videoUrl: row.videoUrl ?? "",
      mediaUrls: row.mediaUrls,
    });
    setModal({ open: true, editing: row });
    setError("");
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const body = { ...form, isFeatured: form.isFeatured };
      if (modal.editing) {
        await adminFetch(`/admin/articles/${modal.editing.id}`, { method: "PUT", body: JSON.stringify(body) });
      } else {
        await adminFetch("/admin/articles", { method: "POST", body: JSON.stringify(body) });
      }
      await qc.invalidateQueries();
      setModal({ open: false, editing: null });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menyimpan");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Hapus artikel ini?")) return;
    await adminFetch(`/admin/articles/${id}`, { method: "DELETE" });
    await qc.invalidateQueries();
  }

  const F = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }));

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Berita & Artikel</h1>
          <p className="text-gray-500 text-sm mt-1">{articles.length} artikel</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-[#0a2558] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#0d2f6b] transition-colors">
          <Plus className="w-4 h-4" /> Tambah Berita
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100">
        <AdminTable
          loading={isLoading}
          data={articles as Article[]}
          onEdit={openEdit}
          onDelete={handleDelete}
          columns={[
            { key: "title", label: "Judul", render: (r) => <span className="line-clamp-2 max-w-xs">{r.title}</span> },
            { key: "category", label: "Kategori" },
            { key: "author", label: "Penulis" },
            { key: "isFeatured", label: "Unggulan", render: (r) => r.isFeatured ? <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-medium">Ya</span> : <span className="text-gray-400 text-xs">—</span> },
            { key: "publishedAt", label: "Tanggal", render: (r) => <span>{r.publishedAt?.slice(0, 10)}</span> },
          ]}
        />
      </div>

      <AdminModal title={modal.editing ? "Edit Artikel" : "Tambah Artikel"} open={modal.open} onClose={() => setModal({ open: false, editing: null })}>
        <form onSubmit={handleSave} className="space-y-4">
          <Field label="Judul *"><input className={inp} value={form.title} onChange={F("title")} required /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Kategori *">
              <select className={inp} value={form.category} onChange={F("category")}>
                {["Berita","Kegiatan","Riset","Pengabdian","Prestasi","Publikasi"].map(c => <option key={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Penulis *"><input className={inp} value={form.author} onChange={F("author")} required /></Field>
          </div>
          <Field label="Ringkasan"><textarea className={inp + " h-20"} value={form.excerpt ?? ""} onChange={F("excerpt")} /></Field>
          <Field label="Isi Artikel *"><textarea className={inp + " h-40"} value={form.content} onChange={F("content")} required /></Field>
          <Field label="URL Gambar Utama"><input className={inp} value={form.imageUrl ?? ""} onChange={F("imageUrl")} placeholder="https://..." /></Field>
          <Field label="URL Video (YouTube atau MP4)"><input className={inp} value={form.videoUrl ?? ""} onChange={F("videoUrl")} placeholder="https://youtube.com/..." /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Tanggal Terbit">
              <input type="date" className={inp} value={form.publishedAt} onChange={F("publishedAt")} />
            </Field>
            <Field label="Artikel Unggulan">
              <label className="flex items-center gap-2 mt-2 cursor-pointer">
                <input type="checkbox" checked={form.isFeatured} onChange={e => setForm(p => ({ ...p, isFeatured: e.target.checked }))} className="w-4 h-4 accent-[#0a2558]" />
                <span className="text-sm text-gray-700">Tampilkan di beranda</span>
              </label>
            </Field>
          </div>
          {error && <p className="text-red-600 text-sm bg-red-50 rounded px-3 py-2">{error}</p>}
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="flex-1 bg-[#0a2558] text-white rounded-lg py-2.5 text-sm font-medium hover:bg-[#0d2f6b] disabled:opacity-60">
              {saving ? "Menyimpan..." : "Simpan"}
            </button>
            <button type="button" onClick={() => setModal({ open: false, editing: null })} className="px-4 py-2.5 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">
              Batal
            </button>
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
