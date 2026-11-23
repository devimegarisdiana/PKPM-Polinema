import { impactCategories } from "@/content/research";
import { ConsultationCallout } from "@/components/ResearchContent";

export default function Impact() {
  return <div className="bg-gray-50 min-h-screen">
    <section className="bg-primary py-16 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 max-w-4xl">Perubahan yang dapat dilihat, dirasakan, dan dibuktikan.</h1>
        <p className="text-white/80 text-lg max-w-3xl">Dampak tidak berhenti pada jumlah kegiatan. Kami membaca perubahan ekonomi, pengetahuan, keberdayaan, proses usaha, dan manfaat akademik dari kondisi awal hingga hasil yang dicapai.</p>
      </div>
    </section>
    <section className="container mx-auto px-4 md:px-6 py-16">
      <h2 className="text-3xl font-extrabold mb-4">Apa yang berubah bagi mitra?</h2>
      <p className="text-gray-600 mb-8">Setiap program dapat memiliki bentuk dampak yang berbeda. Bukti dipilih sesuai tujuan, konteks usaha, dan suara mitra.</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{impactCategories.map(category => <article key={category.title} className="p-8 rounded-2xl border bg-white"><h3 className="font-bold text-xl mb-3">{category.title}</h3><p className="text-gray-600 leading-relaxed">{category.description}</p></article>)}</div>
    </section>
    <section className="container mx-auto px-4 md:px-6 pb-16">
      <h2 className="text-3xl font-extrabold mb-4">Dari kondisi awal menuju hasil.</h2>
      <p className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-amber-900 mb-6"><strong>DATA CONTOH.</strong> Tabel dan kutipan berikut adalah simulasi dari situs referensi, bukan capaian aktual pusat riset.</p>
      <blockquote className="bg-white p-6 rounded-xl mb-6 text-gray-700">“Sekarang kami tidak lagi menentukan harga hanya dengan mengikuti pesaing. Kami mulai memahami biaya setiap produk.”<footer className="text-sm mt-3">— Pemilik UMKM pangan, simulasi</footer></blockquote>
      <div className="overflow-x-auto"><table className="w-full bg-white text-left">
        <thead><tr>{["Indikator", "Kondisi awal", "Perubahan"].map(h => <th className="p-4" key={h} scope="col">{h}</th>)}</tr></thead>
        <tbody>{[
          ["Pemahaman HPP", "Harga berdasarkan perkiraan", "Mampu menghitung biaya per produk"],
          ["Pencatatan", "Tidak rutin", "Transaksi dicatat mingguan"],
          ["Keputusan produksi", "Berdasarkan kebiasaan", "Menggunakan data penjualan"],
          ["Keberdayaan", "Bergantung pada pendamping", "Mampu menjalankan alat secara mandiri"],
        ].map(row => <tr key={row[0]} className="border-t">{row.map(cell => <td key={cell} className="p-4 text-gray-600">{cell}</td>)}</tr>)}</tbody>
      </table></div>
    </section>
    <ConsultationCallout />
  </div>;
}
