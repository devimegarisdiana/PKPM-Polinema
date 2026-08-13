import { useGetPublication, getGetPublicationQueryKey } from "@workspace/api-client-react";
import { useParams, Link } from "wouter";
import { ArrowLeft, Download, ExternalLink, Book, Calendar, Users, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PublicationDetail() {
  const { id } = useParams();
  const pubId = parseInt(id || "0");
  const { data: pub, isLoading } = useGetPublication(pubId, { 
    query: { enabled: !!pubId, queryKey: getGetPublicationQueryKey(pubId) } 
  });

  if (isLoading) return <div className="min-h-screen pt-24 flex justify-center"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;
  if (!pub) return <div className="min-h-screen pt-32 text-center">Publikasi tidak ditemukan</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 md:px-6 py-6">
          <Link href="/publikasi" className="inline-flex items-center text-sm font-semibold text-gray-500 hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Daftar Publikasi
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 pt-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100 mb-8">
            <div className="flex gap-3 mb-6">
              <span className="px-3 py-1 bg-secondary/10 text-secondary border border-secondary/20 text-xs font-bold uppercase tracking-wider rounded-md">
                {pub.type}
              </span>
              <span className="px-3 py-1 bg-blue-50 text-primary border border-blue-100 text-xs font-bold rounded-md">
                Tahun {pub.publishedYear}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-6">
              {pub.title}
            </h1>

            <div className="flex items-start gap-4 mb-10 pb-8 border-b border-gray-100">
              <Users className="w-6 h-6 text-gray-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-1">Penulis / Tim Riset</p>
                <p className="text-lg font-bold text-primary">{pub.authors}</p>
              </div>
            </div>

            <div className="space-y-8">
              {pub.journalName && (
                <div>
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Book className="w-4 h-4 text-gray-400" /> Diterbitkan pada
                  </h3>
                  <p className="text-lg italic text-gray-700">{pub.journalName}</p>
                </div>
              )}

              {pub.abstract && (
                <div>
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gray-400" /> Abstrak
                  </h3>
                  <div className="prose max-w-none text-gray-600 text-justify">
                    <p>{pub.abstract}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-12 pt-8 border-t border-gray-100 flex flex-wrap gap-4">
              {pub.pdfUrl && (
                <Button asChild size="lg" className="bg-primary text-white font-bold px-8">
                  <a href={pub.pdfUrl} target="_blank" rel="noreferrer">
                    <Download className="w-5 h-5 mr-2" /> Unduh Dokumen (PDF)
                  </a>
                </Button>
              )}
              {pub.doiUrl && (
                <Button asChild variant="outline" size="lg" className="font-bold px-8">
                  <a href={pub.doiUrl} target="_blank" rel="noreferrer">
                    <ExternalLink className="w-5 h-5 mr-2" /> Lihat Sumber Asli (DOI)
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
