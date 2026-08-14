import { Link } from "wouter";
import { BookOpen, MapPin, Mail, Phone, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground border-t border-primary-foreground/10 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-white text-primary p-2 rounded-lg">
                <BookOpen className="h-6 w-6" />
              </div>
              <div>
                <h2 className="font-bold text-base leading-snug tracking-tight text-white">
                  Pusat Kajian Pemberdayaan Masyarakat/<br/>UMKM/Ekonomi Kreatif
                </h2>
              </div>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed max-w-sm">
              Pusat Kajian Pemberdayaan Masyarakat, UMKM, dan Ekonomi Kreatif 
              Politeknik Negeri Malang. Berdedikasi untuk memajukan potensi lokal melalui riset dan inovasi terapan.
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
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 text-white">Fokus Kajian</h3>
            <ul className="space-y-3">
              <li className="text-primary-foreground/80 text-sm">Pemberdayaan Masyarakat Lokal</li>
              <li className="text-primary-foreground/80 text-sm">Pengembangan Kapasitas UMKM</li>
              <li className="text-primary-foreground/80 text-sm">Inovasi Ekonomi Kreatif</li>
              <li className="text-primary-foreground/80 text-sm">Digitalisasi Bisnis</li>
              <li className="text-primary-foreground/80 text-sm">Riset Terapan Multidisiplin</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 text-white">Hubungi Kami</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-primary-foreground/80 text-sm">
                <MapPin className="h-5 w-5 shrink-0 text-secondary" />
                <span>Gedung Pusat Kajian Terapan, Kampus Utama Polinema, Jl. Soekarno Hatta No.9, Malang</span>
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/80 text-sm">
                <Mail className="h-4 w-4 shrink-0 text-secondary" />
                <span>pkpm@polinema.ac.id</span>
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/80 text-sm">
                <Phone className="h-4 w-4 shrink-0 text-secondary" />
                <span>(0341) 404424</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
          <p>© {new Date().getFullYear()} PKPM Polinema. Hak Cipta Dilindungi.</p>
          <div className="flex gap-6">
            <a href="https://polinema.ac.id" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Website Polinema</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
