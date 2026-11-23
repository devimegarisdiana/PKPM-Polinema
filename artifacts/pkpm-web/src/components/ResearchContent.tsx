import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { collaborationPaths } from "@/content/research";

export function CollaborationPaths() {
  return (
    <section className="container mx-auto px-4 md:px-6 py-16" id="jalur-kolaborasi">
      <h2 className="text-3xl font-extrabold mb-4">Empat pintu menuju kolaborasi.</h2>
      <p className="text-gray-600 max-w-3xl mb-8">Setiap program dimulai dari kebutuhan nyata, dikerjakan bersama, dan diarahkan pada hasil yang dapat digunakan serta perubahan yang dapat dibuktikan.</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {collaborationPaths.map((path, i) => (
          <article key={path.title} id={i === 3 ? "mahasiswa" : undefined} className="bg-white text-gray-900 p-6 rounded-2xl border border-gray-100 shadow-sm scroll-mt-24">
            <p className="text-primary text-xs uppercase font-bold mb-3">{path.audience}</p>
            <h3 className="text-xl font-bold mb-3">{path.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-5">{path.description}</p>
            <Link href={path.href} className="inline-flex items-center text-primary text-sm font-bold">{path.action}<ArrowRight className="ml-2 w-4 h-4 shrink-0" /></Link>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ConsultationCallout() {
  return (
    <section className="bg-primary text-white py-16">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
        <h2 className="text-3xl font-extrabold mb-4">Ada tantangan dalam mengembangkan usaha?</h2>
        <p className="text-white/80 leading-relaxed mb-6">Sampaikan kebutuhan Anda—mulai dari produksi, keuangan, pemasaran, digitalisasi, hingga pengembangan produk. Kami akan mempelajarinya dan menghubungkannya dengan kepakaran yang relevan di Polinema.</p>
        <Link href="/kontak" className="inline-flex items-center bg-secondary text-secondary-foreground rounded-lg px-6 py-3 font-bold">Ceritakan kebutuhan usaha <ArrowRight className="ml-2 w-4 h-4" /></Link>
      </div>
    </section>
  );
}
