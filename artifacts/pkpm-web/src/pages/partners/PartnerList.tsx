import { useListPartners } from "@workspace/api-client-react";
import { Handshake, Globe, MapPin } from "lucide-react";
const partnerImg = "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80";

export default function PartnerList() {
  const { data: partners, isLoading } = useListPartners();

  const types = [
    { id: "government", label: "Pemerintah" },
    { id: "industry", label: "Industri & Swasta" },
    { id: "university", label: "Perguruan Tinggi" },
    { id: "community", label: "Komunitas" },
    { id: "ngo", label: "LSM / NGO" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-20">
      <section className="relative h-[400px] flex items-center">
        <div className="absolute inset-0 bg-primary/90 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${partnerImg})` }}
        />
        <div className="container mx-auto px-4 md:px-6 relative z-20">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">Mitra Strategis</h1>
            <p className="text-lg text-white/90">
              Kolaborasi lintas sektor (pentahelix) untuk menciptakan ekosistem pemberdayaan yang berdampak luas dan berkelanjutan.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 container mx-auto px-4 md:px-6 -mt-16 relative z-30">
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i => <div key={i} className="h-40 bg-white rounded-2xl animate-pulse shadow-sm"></div>)}
          </div>
        ) : (
          <div className="space-y-16">
            {types.map(type => {
              const typePartners = partners?.filter(p => p.type === type.id) || [];
              if (typePartners.length === 0) return null;

              return (
                <div key={type.id}>
                  <div className="flex items-center gap-4 mb-8">
                    <h2 className="text-2xl font-extrabold text-gray-900">{type.label}</h2>
                    <div className="h-px bg-gray-200 flex-1"></div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {typePartners.map(partner => (
                      <div key={partner.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4 group">
                        <div className="w-16 h-16 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 p-2 overflow-hidden group-hover:border-primary transition-colors">
                          {partner.logoUrl ? (
                            <img src={partner.logoUrl} alt={partner.name} className="max-w-full max-h-full object-contain" />
                          ) : (
                            <Handshake className="w-8 h-8 text-gray-300" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-900 text-lg mb-1 truncate">{partner.name}</h3>
                          {partner.location && (
                            <p className="text-xs text-gray-500 flex items-center gap-1 mb-2 truncate">
                              <MapPin className="w-3 h-3" /> {partner.location}
                            </p>
                          )}
                          {partner.website && (
                            <a href={partner.website} target="_blank" rel="noreferrer" className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
                              <Globe className="w-3 h-3" /> Kunjungi Situs
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
