import { Link } from "wouter";
import { BookOpen, MapPin, Mail, Phone, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground border-t border-primary-foreground/10 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <img
                src={`${import.meta.env.BASE_URL}logo-polinema.jpg`}
                alt="Logo Polinema"
                className="h-14 w-14 object-contain"
              />
              <div>
                <h2 className="font-bold text-base leading-snug tracking-tight text-white">
                  Pusat Riset Pemberdayaan Masyarakat<br/>dan UMKM
                </h2>
              </div>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed max-w-sm">
              Ruang temu bagi persoalan nyata, kepakaran lintas jurusan, fasilitas terapan, dan jejaring kolaborasi di Politeknik Negeri Malang.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 text-white">Tautan Cepat</h3>
            <ul className="space-y-3">
              <li><Link href="/profil" className="text-primary-foreground/80 hover:text-white transition-colors text-sm flex items-center gap-2">Profil Kami</Link></li>
              <li><Link href="/berita" className="text-primary-foreground/80 hover:text-white transition-colors text-sm flex items-center gap-2">Berita & Informasi</Link></li>
              <li><Link href="/program" className="text-primary-foreground/80 hover:text-white transition-colors text-sm flex items-center gap-2">Program Kegiatan</Link></li>
              <li><Link href="/umkm" className="text-primary-foreground/80 hover:text-white transition-colors text-sm flex items-center gap-2">Direktori UMKM</Link></li>
              <li><Link href="/publikasi" className="text-primary-foreground/80 hover:text-white transition-colors text-sm flex items-center gap-2">Publikasi Riset</Link></li>
              <li><Link href="/dampak" className="text-primary-foreground/80 hover:text-white transition-colors text-sm">Kerangka Dampak</Link></li>
              <li><Link href="/galeri" className="text-primary-foreground/80 hover:text-white transition-colors text-sm">Galeri Kolaborasi</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 text-white">Jalur Kolaborasi</h3>
            <ul className="space-y-3">
              <li className="text-primary-foreground/80 text-sm">Klinik Diagnosis UMKM</li>
              <li className="text-primary-foreground/80 text-sm">Riset Terapan Lintas Jurusan</li>
              <li className="text-primary-foreground/80 text-sm">TEFA untuk UMKM</li>
              <li className="text-primary-foreground/80 text-sm">Talenta Mahasiswa</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 text-white">Hubungi Kami</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-primary-foreground/80 text-sm">
                <MapPin className="h-5 w-5 shrink-0 text-secondary" />
                <span>Politeknik Negeri Malang</span>
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/80 text-sm">
                <Mail className="h-4 w-4 shrink-0 text-secondary" />
                <a href="mailto:pkpm@polinema.ac.id" className="hover:underline">pkpm@polinema.ac.id</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
          <p>© {new Date().getFullYear()} Pusat Riset UMKM Polinema. Hak Cipta Dilindungi.</p>
          <div className="flex gap-6">
            <a href="https://polinema.ac.id" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Website Polinema</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
