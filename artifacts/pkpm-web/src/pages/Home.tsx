import { useListFeaturedArticles, useListRecentArticles, useGetStats, useListPrograms } from "@workspace/api-client-react";
import { Link } from "wouter";
import { ArrowRight, BookOpen, GraduationCap, Users, LayoutDashboard, Calendar, ChevronRight, Activity, Handshake, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CollaborationPaths, ConsultationCallout } from "@/components/ResearchContent";
import { BusinessExamples } from "@/components/ReferenceExamples";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
const heroBg = "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=1600&q=80";

export default function Home() {
  const { data: stats } = useGetStats();
  const { data: featuredArticles } = useListFeaturedArticles();
  const { data: recentArticles } = useListRecentArticles({ limit: 4 });
  const { data: programs } = useListPrograms();

  const mainFeatured = featuredArticles?.[0];
  const otherFeatured = featuredArticles?.slice(1, 3);
  const upcomingPrograms = programs?.filter(p => p.status === 'upcoming' || p.status === 'ongoing').slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[600px] md:h-[700px] flex items-center">
        <div className="absolute inset-0 bg-primary/90 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${heroBg})`, backgroundPosition: 'center 30%' }}
        />
        
        <div className="container mx-auto px-4 md:px-6 relative z-20 pt-20">
          <div className="max-w-3xl space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-wider">Politeknik Negeri Malang</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
              Masalah nyata, pengetahuan terapan, <br/>
              <span className="text-secondary">perubahan yang terasa.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed max-w-2xl font-medium">
              Temukan ruang kolaborasi yang mempertemukan kebutuhan masyarakat dan UMKM dengan kepakaran dosen, fasilitas TEFA, mitra strategis, dan talenta mahasiswa lintas jurusan.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold h-12 px-8 text-base">
                <Link href="/kontak">Ceritakan kebutuhan usaha Anda</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white/10 h-12 px-8 text-base font-semibold">
                <Link href="/program">Jelajahi program</Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Abstract shape decoration */}
        <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-gradient-to-tl from-primary to-transparent z-10 pointer-events-none" />
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b relative z-30 -mt-10 mx-4 md:mx-auto md:container rounded-xl shadow-xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-6 md:px-12">
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="p-3 bg-blue-50 rounded-full text-primary mb-2">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-3xl font-extrabold text-gray-900">{stats?.totalUmkm ?? '—'}</h3>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">UMKM Binaan</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="p-3 bg-blue-50 rounded-full text-primary mb-2">
              <Activity className="h-6 w-6" />
            </div>
            <h3 className="text-3xl font-extrabold text-gray-900">{stats?.totalPrograms ?? '—'}</h3>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Program Terdaftar</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="p-3 bg-blue-50 rounded-full text-primary mb-2">
              <BookOpen className="h-6 w-6" />
            </div>
            <h3 className="text-3xl font-extrabold text-gray-900">{stats?.totalPublications ?? '—'}</h3>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Publikasi Riset</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="p-3 bg-blue-50 rounded-full text-primary mb-2">
              <Handshake className="h-6 w-6" />
            </div>
            <h3 className="text-3xl font-extrabold text-gray-900">{stats?.totalPartners ?? '—'}</h3>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Mitra Kerja Sama</p>
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-sm font-bold text-primary uppercase tracking-widest">Ruang untuk bertumbuh</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900">Pengetahuanmu dapat bekerja untuk persoalan yang nyata.</h3>
            <p className="text-gray-600 text-lg">
              Setiap orang dapat mengambil peran. Pilih jalur yang paling sesuai dan temukan kesempatan untuk belajar, meneliti, mengembangkan solusi, atau memperluas kolaborasi.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <Users className="h-7 w-7" />
              </div>
              <h4 className="text-xl font-bold mb-3 text-gray-900">Untuk UMKM</h4>
              <p className="text-gray-600 leading-relaxed">
                Ceritakan tantangan usaha Anda dan temukan kepakaran yang relevan untuk mendampinginya.
              </p>
              <Link href="/kontak" className="inline-block mt-4 font-bold text-primary">Sampaikan kebutuhan →</Link>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
              <div className="w-14 h-14 bg-amber-50 rounded-xl flex items-center justify-center text-secondary mb-6 group-hover:scale-110 transition-transform">
                <Target className="h-7 w-7" />
              </div>
              <h4 className="text-xl font-bold mb-3 text-gray-900">Untuk dosen</h4>
              <p className="text-gray-600 leading-relaxed">
                Temukan persoalan lapangan yang dapat dikembangkan menjadi riset terapan dan solusi bagi mitra.
              </p>
              <Link href="/program" className="inline-block mt-4 font-bold text-primary">Jelajahi agenda riset →</Link>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
              <div className="w-14 h-14 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform">
                <LayoutDashboard className="h-7 w-7" />
              </div>
              <h4 className="text-xl font-bold mb-3 text-gray-900">Untuk mahasiswa</h4>
              <p className="text-gray-600 leading-relaxed">
                Bawa kompetensimu ke kasus nyata melalui riset, Solution Fellow, PKL, tugas akhir, atau skripsi.
              </p>
              <Link href="/program#mahasiswa" className="inline-block mt-4 font-bold text-primary">Lihat peluang →</Link>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <Handshake className="h-7 w-7 text-primary mb-6" />
              <h4 className="text-xl font-bold mb-3 text-gray-900">Untuk mitra</h4>
              <p className="text-gray-600 leading-relaxed">Bangun program kolaboratif yang memperkuat UMKM sekaligus menghasilkan dampak yang terukur.</p>
              <Link href="/mitra" className="inline-block mt-4 font-bold text-primary">Mulai kolaborasi →</Link>
            </div>
          </div>
        </div>
      </section>

      <CollaborationPaths />
      <BusinessExamples />
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
          <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-4">Dampak yang dapat dibuktikan</h2>
          <h3 className="text-3xl font-extrabold mb-4">Bukan hanya selesai berkegiatan.</h3>
          <p className="text-gray-600 mb-6">Perubahan ekonomi, pengetahuan, dan keberdayaan mitra dibaca dari kondisi awal, target, bukti perubahan, dan suara mitra.</p>
          <Link href="/dampak" className="font-bold text-primary">Lihat kerangka dampak →</Link>
        </div>
      </section>

      {/* Featured Content & News */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
            <div className="max-w-2xl space-y-4">
              <h2 className="text-sm font-bold text-primary uppercase tracking-widest">Informasi Terkini</h2>
              <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900">Gagasan, kegiatan, dan hasil yang dibagikan.</h3>
              <p className="text-gray-600">Ikuti perkembangan program melalui berita kegiatan, publikasi media, artikel ilmiah, panduan, dan sumber belajar.</p>
              <Link href="/publikasi" className="inline-block font-bold text-primary">Jelajahi publikasi →</Link>
            </div>
            <Button asChild variant="outline" className="shrink-0 font-semibold group">
              <Link href="/berita">
                Lihat Semua <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* Main Featured */}
            {mainFeatured && (
              <div className="lg:col-span-7 group">
                <Link href={`/berita/${mainFeatured.id}`} className="block h-full relative rounded-2xl overflow-hidden shadow-md">
                  <div className="absolute inset-0 bg-gray-900/40 group-hover:bg-gray-900/30 transition-colors z-10" />
                  <img 
                    src={mainFeatured.imageUrl || `https://api.dicebear.com/7.x/shapes/svg?seed=${mainFeatured.id}`} 
                    alt={mainFeatured.title}
                    className="w-full h-full object-cover min-h-[400px] lg:min-h-full group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 z-20">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-bold rounded-full">
                        {mainFeatured.category}
                      </span>
                      <span className="text-white/80 text-sm font-medium flex items-center gap-1">
                        <Calendar className="h-4 w-4" /> 
                        {format(new Date(mainFeatured.publishedAt), 'd MMM yyyy', { locale: idLocale })}
                      </span>
                    </div>
                    <h4 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight group-hover:underline decoration-2 underline-offset-4">
                      {mainFeatured.title}
                    </h4>
                    {mainFeatured.excerpt && (
                      <p className="text-white/90 text-sm md:text-base line-clamp-2">
                        {mainFeatured.excerpt}
                      </p>
                    )}
                  </div>
                </Link>
              </div>
            )}

            {/* Other News */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {recentArticles?.map((article) => (
                <Link key={article.id} href={`/berita/${article.id}`} className="group flex gap-4 bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-200">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden shrink-0">
                    <img 
                      src={article.imageUrl || `https://api.dicebear.com/7.x/shapes/svg?seed=${article.id}`} 
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex flex-col justify-center flex-1">
                    <span className="text-primary text-xs font-bold mb-2 uppercase tracking-wider">{article.category}</span>
                    <h5 className="font-bold text-gray-900 line-clamp-2 mb-2 group-hover:text-primary transition-colors leading-snug">
                      {article.title}
                    </h5>
                    <span className="text-gray-500 text-xs font-medium mt-auto flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {format(new Date(article.publishedAt), 'd MMM yyyy', { locale: idLocale })}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Programs Teaser */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12 border-b border-white/20 pb-6">
            <div className="max-w-2xl space-y-4">
              <h2 className="text-sm font-bold text-secondary uppercase tracking-widest">Aksi Nyata</h2>
              <h3 className="text-3xl md:text-4xl font-extrabold text-white">Program & Pendampingan</h3>
            </div>
            <Button asChild variant="outline" className="shrink-0 font-semibold border-white/30 text-white hover:bg-white hover:text-primary group">
              <Link href="/program">
                Seluruh Program <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {upcomingPrograms?.map((program) => (
              <div key={program.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors group backdrop-blur-sm">
                <div className="flex justify-between items-start mb-6">
                  <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                    program.status === 'ongoing' ? 'bg-secondary text-secondary-foreground' : 'bg-blue-500/20 text-blue-200'
                  }`}>
                    {program.status === 'ongoing' ? 'Sedang Berjalan' : 'Akan Datang'}
                  </span>
                </div>
                <h4 className="text-xl font-bold mb-3 text-white leading-tight group-hover:text-secondary transition-colors">
                  {program.title}
                </h4>
                <p className="text-white/70 text-sm line-clamp-3 mb-6">
                  {program.description}
                </p>
                <Link href={`/program/${program.id}`} className="inline-flex items-center text-sm font-bold text-white hover:text-secondary transition-colors">
                  Detail Program <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ConsultationCallout />
    </div>
  );
}
