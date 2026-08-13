import { useGetProgram, getGetProgramQueryKey } from "@workspace/api-client-react";
import { useParams, Link } from "wouter";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import { ArrowLeft, Calendar, Tag, Target, CheckCircle2 } from "lucide-react";
const programImg = "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80";
import { Button } from "@/components/ui/button";

export default function ProgramDetail() {
  const { id } = useParams();
  const programId = parseInt(id || "0");
  const { data: program, isLoading } = useGetProgram(programId, { 
    query: { enabled: !!programId, queryKey: getGetProgramQueryKey(programId) } 
  });

  if (isLoading) return <div className="min-h-screen pt-24 flex justify-center"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;
  if (!program) return <div className="min-h-screen pt-32 text-center">Program tidak ditemukan</div>;

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
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 md:px-6 py-6">
          <Link href="/program" className="inline-flex items-center text-sm font-semibold text-gray-500 hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Program
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 pt-10">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-4">
              <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full border shadow-sm ${getStatusColor(program.status)}`}>
                {getStatusText(program.status)}
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                {program.title}
              </h1>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <img src={program.imageUrl || programImg} alt={program.title} className="w-full h-auto max-h-[500px] object-cover" />
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Target className="text-primary w-5 h-5" /> Deskripsi Program
              </h3>
              <div className="prose max-w-none text-gray-600">
                <p className="whitespace-pre-wrap">{program.description}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-28 space-y-6">
              <h3 className="font-bold text-lg text-gray-900 pb-4 border-b">Informasi Kegiatan</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-50 text-primary rounded-lg shrink-0">
                    <Tag className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Kategori</p>
                    <p className="font-bold text-gray-900">{program.category}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-50 text-primary rounded-lg shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Pelaksanaan</p>
                    <p className="font-bold text-gray-900">
                      {program.startDate ? format(new Date(program.startDate), 'd MMMM yyyy', { locale: idLocale }) : 'TBA'}
                      {program.endDate ? ` - ${format(new Date(program.endDate), 'd MMMM yyyy', { locale: idLocale })}` : ''}
                    </p>
                  </div>
                </div>
              </div>

              {program.status === 'upcoming' && (
                <div className="pt-6 border-t">
                  <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold" size="lg">
                    Daftar Program
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
