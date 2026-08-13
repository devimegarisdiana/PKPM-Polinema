import { useGetArticle, getGetArticleQueryKey } from "@workspace/api-client-react";
import { useParams, Link } from "wouter";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import { Calendar, User, ArrowLeft, Tag, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ArticleDetail() {
  const { id } = useParams();
  const articleId = parseInt(id || "0");
  const { data: article, isLoading } = useGetArticle(articleId, { 
    query: { enabled: !!articleId, queryKey: getGetArticleQueryKey(articleId) } 
  });

  if (isLoading) {
    return <div className="min-h-screen bg-gray-50 pt-24 pb-12 flex justify-center"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;
  }

  if (!article) {
    return <div className="min-h-screen pt-32 text-center">Artikel tidak ditemukan</div>;
  }

  // Determine if video is youtube embed or native
  const isYoutube = article.videoUrl?.includes("youtube.com") || article.videoUrl?.includes("youtu.be");

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 md:px-6 py-6">
          <Link href="/berita" className="inline-flex items-center text-sm font-semibold text-gray-500 hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Berita
          </Link>
        </div>
      </div>

      <article className="container mx-auto px-4 md:px-6 pt-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center space-y-4">
            <span className="inline-block px-3 py-1 bg-secondary/10 text-secondary border border-secondary/20 text-xs font-bold rounded-full">
              {article.category}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm text-gray-500 font-medium pt-4">
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-primary" /> {format(new Date(article.publishedAt), 'd MMMM yyyy', { locale: idLocale })}</span>
              <span className="flex items-center gap-1.5"><User className="w-4 h-4 text-primary" /> {article.author}</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 mb-10">
            {article.videoUrl ? (
              <div className="aspect-video w-full">
                {isYoutube ? (
                  <iframe 
                    className="w-full h-full"
                    src={article.videoUrl.replace("watch?v=", "embed/").replace("youtu.be/", "youtube.com/embed/")} 
                    title="Video Player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                ) : (
                  <video src={article.videoUrl} controls className="w-full h-full object-cover" />
                )}
              </div>
            ) : article.imageUrl && (
              <div className="aspect-video w-full">
                <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          <div className="prose prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-xl bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </div>

          {article.mediaUrls && article.mediaUrls.length > 0 && (
            <div className="mt-12">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Galeri Foto</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {article.mediaUrls.map((url, idx) => (
                  <div key={idx} className="aspect-square rounded-xl overflow-hidden shadow-sm">
                    <img src={url} alt={`Galeri ${idx + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12 flex justify-between items-center py-6 border-t border-gray-200">
            <div className="flex gap-2">
              {/* social share placeholders */}
              <Button variant="outline" size="sm" className="font-semibold text-gray-600">
                <Share2 className="w-4 h-4 mr-2" /> Bagikan
              </Button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
