import { useGetStats } from "@workspace/api-client-react";
import { Newspaper, GraduationCap, Store, BookOpen, Handshake, Image } from "lucide-react";
import { Link } from "wouter";

const CARDS = [
  { label: "Berita", icon: Newspaper, key: "totalArticles", href: "/admin/berita", color: "bg-blue-50 text-blue-600" },
  { label: "Program", icon: GraduationCap, key: "totalPrograms", href: "/admin/program", color: "bg-green-50 text-green-600" },
  { label: "UMKM", icon: Store, key: "totalUmkm", href: "/admin/umkm", color: "bg-orange-50 text-orange-600" },
  { label: "Publikasi", icon: BookOpen, key: "totalPublications", href: "/admin/publikasi", color: "bg-purple-50 text-purple-600" },
  { label: "Mitra", icon: Handshake, key: "totalPartners", href: "/admin/mitra", color: "bg-pink-50 text-pink-600" },
  { label: "Galeri", icon: Image, key: "totalGallery", href: "/admin/galeri", color: "bg-yellow-50 text-yellow-600" },
];

export default function AdminDashboard() {
  const { data: stats } = useGetStats();

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Kelola seluruh konten website PKPM Polinema</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CARDS.map(({ label, icon: Icon, key, href, color }) => (
          <Link key={key} href={href}>
            <a className="block bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow group">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500">{label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">
                    {stats ? (stats as Record<string, number>)[key] ?? 0 : "—"}
                  </p>
                </div>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <p className="text-xs text-[#0a2558] font-medium mt-4 group-hover:underline">
                Kelola {label} →
              </p>
            </a>
          </Link>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="font-semibold text-gray-900 mb-2">Panduan Cepat</h2>
        <ul className="text-sm text-gray-600 space-y-1.5 list-disc list-inside">
          <li>Klik menu di sidebar untuk mengelola masing-masing konten</li>
          <li>Tekan tombol <strong>+ Tambah</strong> untuk menambah data baru</li>
          <li>Ikon pensil untuk mengedit, ikon tempat sampah untuk menghapus</li>
          <li>Perubahan langsung tersimpan ke database dan tampil di website</li>
        </ul>
      </div>
    </div>
  );
}
