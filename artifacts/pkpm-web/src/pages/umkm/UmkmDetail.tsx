import { useGetUmkm, getGetUmkmQueryKey } from "@workspace/api-client-react";
import { useParams, Link } from "wouter";
import { ArrowLeft, MapPin, Store, User, Phone, CheckCircle, Package } from "lucide-react";
const umkmImg = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80";

export default function UmkmDetail() {
  const { id } = useParams();
  const umkmId = parseInt(id || "0");
  const { data: umkm, isLoading } = useGetUmkm(umkmId, { 
    query: { enabled: !!umkmId, queryKey: getGetUmkmQueryKey(umkmId) } 
  });

  if (isLoading) return <div className="min-h-screen pt-24 flex justify-center"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;
  if (!umkm) return <div className="min-h-screen pt-32 text-center">UMKM tidak ditemukan</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-primary pt-6 pb-24 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <Link href="/umkm" className="inline-flex items-center text-sm font-semibold text-white/80 hover:text-white transition-colors mb-10">
            <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Direktori
          </Link>
          
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-full p-2 shrink-0 shadow-lg">
              <div className="w-full h-full rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                {umkm.logoUrl ? (
                  <img src={umkm.logoUrl} alt={umkm.name} className="w-full h-full object-cover" />
                ) : (
                  <Store className="w-12 h-12 text-gray-400" />
                )}
              </div>
            </div>
            
            <div className="text-center md:text-left">
              <span className="inline-block px-3 py-1 bg-secondary text-secondary-foreground text-xs font-bold uppercase tracking-wider rounded-full mb-3">
                {umkm.sector}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">{umkm.name}</h1>
              <p className="text-white/80 text-lg flex items-center justify-center md:justify-start gap-2">
                <User className="w-5 h-5" /> Pemilik: <span className="font-semibold text-white">{umkm.ownerName}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 -mt-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Store className="text-primary w-5 h-5" /> Tentang Usaha
              </h3>
              <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{umkm.description}</p>
            </div>

            {umkm.products && (
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Package className="text-primary w-5 h-5" /> Produk Unggulan
                </h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{umkm.products}</p>
                <div className="mt-6 rounded-xl overflow-hidden shadow-sm">
                  <img src={umkmImg} alt="Produk UMKM" className="w-full h-64 object-cover" />
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg text-gray-900 pb-4 border-b mb-4">Informasi Kontak</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-gray-700">{umkm.location}</span>
                </li>
                {umkm.joinedYear && (
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-secondary shrink-0" />
                    <span className="text-sm font-medium text-gray-700">Mitra Binaan sejak {umkm.joinedYear}</span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
