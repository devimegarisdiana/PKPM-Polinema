export const exampleBusinesses = [
  { name: "Sari Rasa", sector: "Pangan olahan", product: "Keripik buah", location: "Malang Raya", status: "Tahap diagnosis", need: "HPP, kapasitas, mutu, dan kemasan", collaboration: "Akuntansi, Teknik Mesin, Administrasi Niaga" },
  { name: "Kayu Lestari", sector: "Kerajinan", product: "Produk dekorasi", location: "Kota Batu", status: "Pemetaan kebutuhan", need: "Efisiensi bahan, desain, katalog digital", collaboration: "Teknik Mesin, TI, Administrasi Niaga" },
  { name: "Batik Arunika", sector: "Wastra & fesyen", product: "Produk wastra", location: "Kabupaten Malang", status: "Calon program 2027", need: "Biaya, merek, dan perluasan pasar", collaboration: "Akuntansi, Teknik Kimia, Administrasi Niaga" },
  { name: "Digital Kampung", sector: "Jasa digital", product: "Jasa kreatif", location: "Kota Malang", status: "Penjaringan", need: "Model layanan dan pengukuran kinerja", collaboration: "TI, Akuntansi, Administrasi Niaga" },
];

export function BusinessExamples({ search = "" }: { search?: string }) {
  const examples = exampleBusinesses.filter(item => `${item.name} ${item.sector}`.toLocaleLowerCase("id").includes(search.toLocaleLowerCase("id")));
  return <section className="container mx-auto px-4 md:px-6 pb-16">
    <h2 className="text-2xl font-extrabold mb-4">Kenali mitra dan perjalanan tumbuhnya.</h2>
    <p className="bg-amber-50 text-amber-900 border border-amber-200 p-4 rounded-xl mb-6"><strong>DATA CONTOH.</strong> Nama dan informasi berikut berasal dari prototype referensi untuk menunjukkan bentuk direktori, bukan daftar mitra resmi.</p>
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">{examples.map(item => <article key={item.name} className="p-6 rounded-2xl bg-white border shadow-sm">
      <p className="text-xs uppercase font-bold text-primary mb-3">{item.sector} · {item.status}</p>
      <h3 className="text-xl font-bold mb-2">{item.name}</h3>
      <p className="text-sm text-gray-600 mb-3">{item.product} · {item.location}</p>
      <p className="text-sm text-gray-600 mb-2"><strong>Kebutuhan:</strong> {item.need}</p>
      <p className="text-sm text-gray-600"><strong>Kolaborasi:</strong> {item.collaboration}</p>
    </article>)}</div>
    {examples.length === 0 && <p className="text-gray-600">Tidak ada data contoh yang sesuai pencarian.</p>}
  </section>;
}

const exampleOutputs = [
  ["Jurnal / Artikel", "Model diagnosis kesiapan digital UMKM", "Artikel riset terapan · Dalam pengembangan · 2026"],
  ["HKI", "Instrumen pemetaan kebutuhan UMKM", "Perangkat diagnosis kolaboratif · Rancangan · 2026"],
  ["Buku ISBN", "Pemberdayaan UMKM berbasis masalah nyata", "Naskah buku referensi · Rancangan · 2027"],
  ["Feasibility Study", "Kelayakan peningkatan kapasitas produksi", "Kajian teknis dan finansial · Contoh · 2027"],
  ["Naskah Kebijakan", "Penguatan ekosistem pendampingan UMKM", "Rekomendasi berbasis temuan lapangan · Contoh · 2027"],
  ["Laporan Kegiatan", "Forum Masalah UMKM 2026", "Dokumentasi, temuan, dan tindak lanjut · Contoh · 2026"],
  ["Prototipe", "Dashboard sederhana biaya dan penjualan", "Akuntansi × Teknologi Informasi · Contoh · 2027"],
  ["SOP & Modul", "Panduan kendali mutu produksi", "Perangkat kerja untuk mitra · Contoh · 2027"],
  ["Karya Mahasiswa", "Portofolio solusi untuk UMKM", "Solution Fellow, PKL, TA, dan skripsi · Contoh · 2027"],
];

export function OutputExamples() {
  return <section className="container mx-auto px-4 md:px-6 py-16 scroll-mt-24" id="luaran">
    <h2 className="text-3xl font-extrabold mb-4">Pengetahuan dan solusi yang dapat digunakan.</h2>
    <p className="text-gray-600 mb-4">Luaran menunjukkan apa yang berhasil dihasilkan dari kolaborasi: karya ilmiah, kekayaan intelektual, buku, kajian, perangkat kerja, hingga solusi terapan bagi mitra.</p>
    <p className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-amber-900 mb-6"><strong>DATA CONTOH.</strong> Kartu berikut memperlihatkan rancangan katalog luaran dari situs referensi. Bukan daftar karya terbit atau dokumen yang sudah tersedia.</p>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{exampleOutputs.map(([category, title, description]) => <article key={title} className="bg-white border rounded-2xl p-6">
      <p className="text-xs uppercase font-bold text-primary mb-3">{category}</p><h3 className="font-bold text-lg mb-3">{title}</h3><p className="text-gray-600 text-sm">{description}</p>
    </article>)}</div>
  </section>;
}

export function PublicationExamples() {
  return <section className="container mx-auto px-4 md:px-6 pb-10">
    <h2 className="text-2xl font-extrabold mb-4">Gagasan dan sumber belajar</h2>
    <p className="bg-amber-50 text-amber-900 border border-amber-200 p-4 rounded-xl mb-6"><strong>KONTEN CONTOH.</strong> Berikut materi prototype referensi, bukan berita terverifikasi atau publikasi yang sudah terbit.</p>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{[
      ["Publikasi media", "Riset terapan Polinema hadir lebih dekat dengan UMKM", "Liputan tentang kolaborasi lintas jurusan untuk menjawab kebutuhan pelaku usaha."],
      ["Kabar kegiatan", "Dialog awal bersama calon UMKM binaan", "Mendengar cerita usaha untuk memahami kebutuhan yang paling relevan."],
      ["Agenda · November 2026", "Forum Masalah UMKM", "Mempertemukan kebutuhan mitra dengan dosen, TEFA, laboratorium, dan mahasiswa."],
      ["Ilmiah · Concept note", "Model diagnosis kesiapan digital UMKM", "Kerangka penelitian untuk memahami kebutuhan transformasi digital secara bertahap."],
      ["Panduan · Sumber belajar", "Membaca kebutuhan UMKM tanpa tergesa menawarkan solusi", "Pertanyaan awal untuk membantu tim dan mitra memahami akar persoalan."],
      ["Artikel populer", "Ketika kampus dan UMKM belajar dari masalah yang sama", "Gagasan tentang kolaborasi yang memberikan manfaat akademik dan praktis."],
    ].map(([category, title, description]) => <article key={title} className="bg-white border rounded-2xl p-6"><p className="text-xs font-bold uppercase text-primary mb-3">{category}</p><h3 className="font-bold text-lg mb-3">{title}</h3><p className="text-sm text-gray-600">{description}</p></article>)}</div>
  </section>;
}
