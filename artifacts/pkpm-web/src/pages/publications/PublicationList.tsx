import { useListPublications } from "@workspace/api-client-react";
import { Link } from "wouter";
import { FileText, Download, ExternalLink, Search, Filter, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { OutputExamples, PublicationExamples } from "@/components/ReferenceExamples";

export default function PublicationList() {
  const { data: publications, isLoading } = useListPublications();
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string | undefined>();

  const filtered = publications?.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.authors.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter ? p.type === typeFilter : true;
    return matchesSearch && matchesType;
  });

  const types = [
    { id: undefined, label: "Semua" },
    { id: "journal", label: "Jurnal" },
    { id: "conference", label: "Konferensi" },
    { id: "book", label: "Buku" },
    { id: "report", label: "Laporan Riset" }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <section className="bg-primary py-16 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl font-extrabold mb-4">Kabar, Publikasi & Luaran</h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl">
            Ikuti gagasan, kegiatan, dan pengetahuan yang kami bagikan. Temukan kabar program, publikasi media, artikel ilmiah, artikel populer, panduan, dan agenda yang mempertemukan kampus dengan masyarakat.
          </p>
        </div>
      </section>

      <section className="py-12 container mx-auto px-4 md:px-6">
        <h2 className="text-2xl font-extrabold mb-6">Publikasi terdaftar</h2>
        <div className="flex flex-wrap gap-5 mb-6 font-semibold text-primary"><Link href="/berita">Berita & kegiatan →</Link><a href="#luaran">Katalog luaran →</a></div>
        <div className="flex flex-col md:flex-row justify-between gap-6 mb-10 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-wrap gap-2">
            {types.map((t) => (
              <Button 
                key={t.label}
                variant={typeFilter === t.id ? "default" : "outline"}
                size="sm"
                onClick={() => setTypeFilter(t.id)}
                className="rounded-full font-semibold"
              >
                {t.label}
              </Button>
            ))}
          </div>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Cari judul atau penulis..." 
              className="pl-9 bg-gray-50 border-transparent focus-visible:ring-primary focus-visible:border-primary rounded-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1,2,3,4].map(i => <div key={i} className="h-32 bg-white rounded-xl animate-pulse"></div>)}
          </div>
        ) : filtered?.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Tidak ada publikasi ditemukan</h3>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered?.map(pub => (
              <div key={pub.id} className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-md transition-shadow group flex flex-col md:flex-row gap-6">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 bg-blue-50 text-primary text-[10px] font-bold uppercase tracking-wider rounded-md">
                      {types.find(t => t.id === pub.type)?.label || pub.type}
                    </span>
                    <span className="text-sm font-semibold text-gray-500">{pub.publishedYear}</span>
                    {pub.journalName && (
                      <span className="text-sm text-gray-500 italic hidden md:inline-block border-l border-gray-300 pl-3">
                        {pub.journalName}
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 leading-tight">
                    <Link href={`/publikasi/${pub.id}`} className="hover:text-primary transition-colors">
                      {pub.title}
                    </Link>
                  </h3>
                  
                  <p className="text-sm text-gray-600 font-medium">
                    Oleh: {pub.authors}
                  </p>
                </div>
                
                <div className="flex md:flex-col gap-3 justify-center shrink-0">
                  <Button asChild variant="outline" className="w-full md:w-auto font-semibold">
                    <Link href={`/publikasi/${pub.id}`}>Detail</Link>
                  </Button>
                  {pub.pdfUrl && (
                    <Button asChild className="w-full md:w-auto bg-primary text-white font-semibold">
                      <a href={pub.pdfUrl} target="_blank" rel="noreferrer">
                        <Download className="w-4 h-4 mr-2" /> PDF
                      </a>
                    </Button>
                  )}
                  {pub.doiUrl && !pub.pdfUrl && (
                    <Button asChild className="w-full md:w-auto bg-gray-100 text-gray-900 hover:bg-gray-200 font-semibold">
                      <a href={pub.doiUrl} target="_blank" rel="noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" /> DOI
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      <PublicationExamples />
      <OutputExamples />
    </div>
  );
}
