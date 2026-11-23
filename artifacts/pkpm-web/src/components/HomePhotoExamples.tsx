import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";

const photos = [
  {
    image: "workshop-example.jpg",
    alt: "Peserta workshop membuat kerajinan bersama di meja kerja",
    label: "Belajar & berkolaborasi",
    title: "Dari diskusi menjadi solusi.",
    href: "/program",
  },
  {
    image: "business-example.jpg",
    alt: "Pelaku usaha roti menyerahkan produk dalam kemasan kertas",
    label: "Pengembangan usaha",
    title: "Usaha lokal, peluang lebih luas.",
    href: "/umkm",
  },
  {
    image: "product-example.jpg",
    alt: "Pelaku usaha menyiapkan paket produk di ruang kerjanya",
    label: "Produk & pemasaran",
    title: "Ide yang siap bertumbuh.",
    href: "/mitra",
  },
];

export function HomePhotoExamples() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Kolaborasi dalam gambar</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">Bersama, gagasan menjadi nyata.</h2>
          </div>
          <p className="max-w-sm text-sm text-gray-500 leading-relaxed">Foto ilustrasi sebagai contoh tampilan. Bukan dokumentasi kegiatan atau mitra resmi Polinema.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {photos.map(photo => (
            <Link key={photo.image} href={photo.href} className="group block relative overflow-hidden rounded-2xl aspect-[4/3] md:aspect-[3/4] bg-gray-100 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-primary">
              <img src={`${import.meta.env.BASE_URL}images/examples/${photo.image}`} alt={photo.alt} width={900} height={1200} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/5 to-transparent" />
              <span className="absolute top-4 left-4 rounded-full bg-white/95 px-3 py-1.5 text-[10px] uppercase tracking-wider font-bold text-gray-700">Foto ilustrasi</span>
              <div className="absolute bottom-0 inset-x-0 p-6 md:p-7 text-white">
                <p className="text-xs font-semibold text-white/80 mb-3">{photo.label}</p>
                <div className="flex items-end justify-between gap-4">
                  <h3 className="text-2xl font-bold leading-tight max-w-[14rem]">{photo.title}</h3>
                  <span className="bg-white/15 p-2 rounded-full shrink-0"><ArrowUpRight className="w-5 h-5" aria-hidden="true" /></span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-4">Foto stok: Pexels. Dapat diganti dengan dokumentasi kegiatan asli.</p>
      </div>
    </section>
  );
}
