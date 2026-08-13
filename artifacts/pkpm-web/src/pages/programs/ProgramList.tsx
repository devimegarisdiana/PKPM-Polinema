import { useListPrograms } from "@workspace/api-client-react";
import { Link } from "wouter";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import { Target, ArrowRight, Calendar } from "lucide-react";
const programImg = "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80";
import { Button } from "@/components/ui/button";

export default function ProgramList() {
  const { data: programs, isLoading } = useListPrograms();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'ongoing': return 'bg-secondary/20 text-secondary-foreground border-secondary/30';
      case 'completed': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'upcoming': return 'Akan Datang';
      case 'ongoing': return 'Sedang Berjalan';
      case 'completed': return 'Selesai';
      default: return status;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <section className="bg-primary py-16 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-extrabold mb-4">Program & Kegiatan</h1>
            <p className="text-primary-foreground/80 text-lg">
              Aksi nyata kami dalam pemberdayaan masyarakat, pelatihan UMKM, dan pengembangan industri kreatif.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 container mx-auto px-4 md:px-6">
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1,2,3,4].map(i => <div key={i} className="h-80 bg-white rounded-2xl animate-pulse"></div>)}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs?.map(program => (
              <div key={program.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm flex flex-col group hover:shadow-md transition-shadow">
                <div className="relative aspect-video overflow-hidden">
                  <div className="absolute inset-0 bg-gray-900/10 group-hover:bg-transparent transition-colors z-10" />
                  <img 
                    src={program.imageUrl || programImg} 
                    alt={program.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 z-20">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full border shadow-sm ${getStatusColor(program.status)}`}>
                      {getStatusText(program.status)}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-primary text-xs font-bold mb-2 uppercase tracking-wider">{program.category}</span>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">{program.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-6 flex-1">
                    {program.description}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                    <div className="text-xs font-medium text-gray-500 flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {program.startDate ? format(new Date(program.startDate), 'MMM yyyy', { locale: idLocale }) : 'TBA'}
                    </div>
                    <Button asChild variant="ghost" size="sm" className="font-semibold text-primary hover:text-primary hover:bg-blue-50">
                      <Link href={`/program/${program.id}`}>Detail <ArrowRight className="w-4 h-4 ml-1" /></Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
