import { useListGallery } from "@workspace/api-client-react";
import { Image as ImageIcon, PlayCircle, Filter } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function GalleryList() {
  const [typeFilter, setTypeFilter] = useState<'photo' | 'video' | undefined>();
  const { data: items, isLoading } = useListGallery({ type: typeFilter });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-20">
      <section className="bg-primary py-16 text-white text-center">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl font-extrabold mb-4">Galeri Kegiatan</h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Dokumentasi visual dari berbagai program, pelatihan, dan aktivitas pemberdayaan masyarakat.
          </p>
        </div>
      </section>

      <section className="py-12 container mx-auto px-4 md:px-6">
        <div className="flex justify-center mb-10">
          <div className="bg-white p-1.5 rounded-full shadow-sm border border-gray-100 flex gap-1">
            <Button 
              variant={!typeFilter ? "default" : "ghost"} 
              size="sm"
              onClick={() => setTypeFilter(undefined)}
              className="rounded-full px-6 font-semibold"
            >
              Semua
            </Button>
            <Button 
              variant={typeFilter === 'photo' ? "default" : "ghost"} 
              size="sm"
              onClick={() => setTypeFilter('photo')}
              className="rounded-full px-6 font-semibold"
            >
              <ImageIcon className="w-4 h-4 mr-2" /> Foto
            </Button>
            <Button 
              variant={typeFilter === 'video' ? "default" : "ghost"} 
              size="sm"
              onClick={() => setTypeFilter('video')}
              className="rounded-full px-6 font-semibold"
            >
              <PlayCircle className="w-4 h-4 mr-2" /> Video
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[1,2,3,4,5,6,7,8].map(i => <div key={i} className="aspect-square bg-white rounded-2xl animate-pulse"></div>)}
          </div>
        ) : items?.length === 0 ? (
          <div className="text-center py-20">
            <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900">Belum ada dokumentasi</h3>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {items?.map(item => (
              <div key={item.id} className="group relative aspect-square rounded-2xl overflow-hidden bg-gray-100 shadow-sm cursor-pointer">
                <img 
                  src={item.type === 'video' ? (item.thumbnailUrl || `https://api.dicebear.com/7.x/shapes/svg?seed=${item.id}`) : item.url} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {item.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-primary transition-all">
                      <PlayCircle className="w-6 h-6 text-white" />
                    </div>
                  </div>
                )}
                
                <div className="absolute bottom-0 left-0 w-full p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <h4 className="text-white font-bold text-sm line-clamp-2">{item.title}</h4>
                  {item.category && (
                    <span className="inline-block mt-1 text-[10px] uppercase font-bold tracking-wider text-secondary">
                      {item.category}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
