import { ReactNode, useEffect } from "react";
import { useLocation } from "wouter";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  useEffect(() => {
    const descriptions: Record<string, [string, string]> = {
      "/": ["Beranda", "Masalah nyata, pengetahuan terapan, perubahan yang terasa. Kolaborasi masyarakat dan UMKM dengan kepakaran Polinema."],
      "/profil": ["Profil", "Menghubungkan pengetahuan dengan kebutuhan masyarakat. Pengelola pusat riset periode 2025–2027."],
      "/program": ["Program", "Klinik Diagnosis UMKM, Riset Terapan Lintas Jurusan, TEFA untuk UMKM, dan Talenta Mahasiswa."],
      "/umkm": ["UMKM Binaan", "Kenali kebutuhan mitra, bidang kolaborasi, dan perjalanan pendampingan UMKM."],
      "/publikasi": ["Kabar, Publikasi & Luaran", "Gagasan, kegiatan, artikel ilmiah, panduan, dan solusi terapan untuk masyarakat dan UMKM."],
      "/luaran": ["Luaran", "Pengetahuan dan solusi yang dapat digunakan: karya ilmiah, HKI, buku, kajian, dan perangkat kerja."],
      "/mitra": ["Mitra", "Kolaborasi pemerintah, industri, komunitas, lembaga keuangan, media, dan alumni."],
      "/dampak": ["Dampak", "Perubahan ekonomi, pengetahuan, keberdayaan, proses usaha, teknologi, dan manfaat akademik yang dapat dibuktikan."],
      "/kontak": ["Konsultasi UMKM", "Ceritakan kondisi usaha, kendala yang dirasakan, dan perubahan yang ingin dicapai."],
      "/konsultasi": ["Konsultasi UMKM", "Ceritakan kondisi usaha, kendala yang dirasakan, dan perubahan yang ingin dicapai."],
      "/berita": ["Berita", "Gagasan, kegiatan, dan pengetahuan dari kolaborasi kampus dengan masyarakat."],
      "/galeri": ["Galeri", "Dokumentasi kunjungan, diskusi, pengujian, pendampingan, dan pembelajaran bersama mitra."],
    };
    const [title, description] = descriptions[location] ?? [location.startsWith("/berita/") ? "Detail Berita" : location.startsWith("/program/") ? "Detail Program" : location.startsWith("/umkm/") ? "Profil UMKM" : "Detail Publikasi", "Pengetahuan dan solusi terapan untuk masyarakat dan UMKM Polinema."];
    document.title = `${title} | Pusat Riset UMKM Polinema`;
    for (const [selector, value] of [
      ['meta[name="description"]', description],
      ['meta[property="og:title"]', document.title],
      ['meta[property="og:description"]', description],
      ['meta[name="twitter:title"]', document.title],
      ['meta[name="twitter:description"]', description],
    ]) document.querySelector(selector)?.setAttribute("content", value);
  }, [location]);
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
