import { useListArticles } from "@workspace/api-client-react";
import { Link } from "wouter";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import { Calendar, Search, Tag, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ArticleList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState<string | undefined>();
  const { data: articles, isLoading } = useListArticles({ category });

  const filteredArticles = articles?.filter(a => 
    a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = ["Semua", "Berita", "Opini", "Liputan", "Pengumuman"];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <section className="bg-primary py-16 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl font-extrabold mb-4">Berita & Artikel</h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl">
            Informasi terkini, liputan kegiatan, dan artikel seputar pemberdayaan masyarakat, UMKM, serta ekonomi kreatif.
          </p>
        </div>
      </section>

      <section className="py-12 container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between gap-6 mb-10 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <Button 
                key={c}
                variant={category === c || (c === "Semua" && !category) ? "default" : "outline"}
                size="sm"
                onClick={() => setCategory(c === "Semua" ? undefined : c)}
                className="rounded-full font-semibold"
              >
                {c}
              </Button>
            ))}
          </div>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Cari artikel..." 
              className="pl-9 bg-gray-50 border-transparent focus-visible:ring-primary focus-visible:border-primary rounded-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white rounded-2xl h-96 animate-pulse"></div>
            ))}
          </div>
        ) : filteredArticles?.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Tidak ada artikel ditemukan</h3>
            <p className="text-gray-500">Coba ubah kata kunci pencarian atau kategori.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles?.map(article => (
              <article key={article.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col">
                <Link href={`/berita/${article.id}`} className="block relative aspect-video overflow-hidden">
                  <div className="absolute inset-0 bg-gray-900/10 group-hover:bg-transparent transition-colors z-10" />
                  <img 
                    src={article.imageUrl || `https://api.dicebear.com/7.x/shapes/svg?seed=${article.id}`} 
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-bold rounded-full shadow-sm">
                      {article.category}
                    </span>
                  </div>
                </Link>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-4 text-xs text-gray-500 font-medium mb-3">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {format(new Date(article.publishedAt), 'd MMM yyyy', { locale: idLocale })}</span>
                    <span className="flex items-center gap-1"><User className="w-3 h-3" /> {article.author}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors leading-tight">
                    <Link href={`/berita/${article.id}`}>{article.title}</Link>
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-6 flex-1">
                    {article.excerpt}
                  </p>
                  <Link href={`/berita/${article.id}`} className="inline-flex items-center text-primary font-bold text-sm hover:underline mt-auto">
                    Baca Selengkapnya <Search className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
import { BookOpen } from "lucide-react";