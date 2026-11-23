import { useListUmkm } from "@workspace/api-client-react";
import { Link } from "wouter";
import { Search, MapPin, Store, ArrowRight, Phone } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BusinessExamples } from "@/components/ReferenceExamples";
import { ConsultationCallout } from "@/components/ResearchContent";

export default function UmkmList() {
  const { data: umkms, isLoading } = useListUmkm();
  const [searchTerm, setSearchTerm] = useState("");
  
  const filtered = umkms?.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.sector.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <section className="bg-primary py-16 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-800/20 -skew-x-12 transform origin-top" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-extrabold mb-4">UMKM Binaan</h1>
            <p className="text-primary-foreground/80 text-lg">
              Setiap profil memperlihatkan kebutuhan utama, solusi yang sedang dikembangkan, bidang kolaborasi, dan perkembangan pendampingan.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 container mx-auto px-4 md:px-6">
        <h2 className="text-2xl font-extrabold mb-6">Direktori UMKM terdaftar</h2>
        <div className="flex justify-between items-center mb-10">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Cari nama UMKM atau sektor..." 
              className="pl-9 bg-white border-gray-200 focus-visible:ring-primary h-12 rounded-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {!isLoading && filtered?.length === 0 && <p className="text-gray-600 mb-6">Belum ada profil terdaftar yang sesuai pencarian.</p>}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1,2,3,4,5,6,7,8].map(i => <div key={i} className="h-64 bg-white rounded-2xl animate-pulse"></div>)}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered?.map(umkm => (
              <Link key={umkm.id} href={`/umkm/${umkm.id}`} className="group bg-white rounded-2xl border border-gray-100 p-6 flex flex-col hover:shadow-md transition-shadow">
                <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-4 overflow-hidden border border-gray-200 group-hover:border-primary transition-colors flex items-center justify-center">
                  {umkm.logoUrl ? (
                    <img src={umkm.logoUrl} alt={umkm.name} className="w-full h-full object-cover" />
                  ) : (
                    <Store className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <div className="text-center mb-4">
                  <span className="inline-block px-2 py-1 bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-wider rounded-full mb-2">
                    {umkm.sector}
                  </span>
                  <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors">{umkm.name}</h3>
                </div>
                <div className="mt-auto space-y-2 text-sm text-gray-500">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 shrink-0 text-gray-400 mt-0.5" />
                    <span className="line-clamp-2 leading-tight">{umkm.location}</span>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-50 text-center">
                  <span className="text-sm font-semibold text-primary inline-flex items-center group-hover:underline">
                    Lihat Profil <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
      <BusinessExamples search={searchTerm} />
      <ConsultationCallout />
    </div>
  );
}
