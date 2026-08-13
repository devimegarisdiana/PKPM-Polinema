import { Users, Target, BookOpen, ChevronRight, Award, Compass, ShieldCheck } from "lucide-react";
const aboutTeamImg = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80";

export default function Profile() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="bg-primary py-20 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-800/30 -skew-x-12 transform origin-top" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
              Profil Pusat Kajian <br/>
              <span className="text-secondary">Pemberdayaan Masyarakat</span>
            </h1>
            <p className="text-lg text-white/80 leading-relaxed font-medium">
              Mengenal lebih dekat lembaga yang berdedikasi menjembatani dunia akademik dengan kebutuhan nyata masyarakat, UMKM, dan pelaku ekonomi kreatif.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-sm font-bold text-primary uppercase tracking-widest">Tentang Kami</h2>
              <h3 className="text-3xl font-extrabold text-gray-900 leading-tight">
                Inovasi Terapan untuk <br/>Kemandirian Ekonomi
              </h3>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Pusat Kajian Pemberdayaan Masyarakat, UMKM, dan Ekonomi Kreatif (PKPM) adalah lembaga strategis di bawah naungan Politeknik Negeri Malang. Kami hadir sebagai respons atas kebutuhan akselerasi ekonomi di sektor informal dan kreatif.
                </p>
                <p>
                  Melalui pendekatan multidisiplin, kami mengintegrasikan kepakaran riset terapan dari berbagai jurusan di Polinema untuk memberikan solusi nyata bagi persoalan yang dihadapi oleh komunitas lokal dan pelaku usaha kecil.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-primary translate-x-4 translate-y-4 rounded-2xl z-0"></div>
              <img 
                src={aboutTeamImg} 
                alt="Tim Pusat Kajian" 
                className="relative z-10 w-full h-auto rounded-2xl shadow-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-gray-50 border-y border-gray-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-4">Visi & Misi</h2>
            <h3 className="text-3xl font-extrabold text-gray-900">Arah Langkah Kami</h3>
          </div>

          <div className="grid md:grid-cols-12 gap-8">
            <div className="md:col-span-5 bg-primary text-white p-10 rounded-2xl shadow-lg flex flex-col justify-center relative overflow-hidden">
              <Compass className="absolute -bottom-10 -right-10 w-48 h-48 text-white/10" />
              <div className="relative z-10">
                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-6">
                  <Target className="text-secondary-foreground w-6 h-6" />
                </div>
                <h4 className="text-2xl font-bold mb-4">Visi</h4>
                <p className="text-lg text-white/90 leading-relaxed">
                  Menjadi pusat unggulan (Center of Excellence) tingkat nasional dalam riset terapan dan inovasi pemberdayaan masyarakat, penguatan UMKM, dan pengembangan ekonomi kreatif berbasis kearifan lokal pada tahun 2030.
                </p>
              </div>
            </div>
            
            <div className="md:col-span-7 bg-white p-10 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
              <div className="w-12 h-12 bg-blue-50 text-primary rounded-lg flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-6">Misi</h4>
              <ul className="space-y-4">
                {[
                  "Melaksanakan riset terapan yang berorientasi pada pemecahan masalah (problem-solving) pada sektor UMKM dan ekonomi kreatif.",
                  "Menyelenggarakan program pendampingan dan inkubasi bisnis yang berkelanjutan bagi masyarakat dan pelaku usaha lokal.",
                  "Membangun ekosistem kolaborasi (pentahelix) antara akademisi, dunia usaha, pemerintah, komunitas, dan media.",
                  "Mendesiminasikan hasil riset dan inovasi tepat guna melalui publikasi dan kekayaan intelektual."
                ].map((misi, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 text-primary flex items-center justify-center font-bold text-sm">
                      {i + 1}
                    </span>
                    <p className="text-gray-600 leading-relaxed pt-1">{misi}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Organization Structure */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-4">Struktur Organisasi</h2>
            <h3 className="text-3xl font-extrabold text-gray-900">Tim Pengelola Pusat Kajian</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { role: "Ketua Pusat Kajian", name: "Dr. Ir. Budi Santoso, M.T." },
              { role: "Sekretaris", name: "Rina Kusuma, S.E., M.M." },
              { role: "Kepala Bidang Pemberdayaan", name: "Dr. Agus Wibowo, M.Sc." },
              { role: "Kepala Bidang UMKM & Ekraf", name: "Siti Aminah, S.Kom., M.B.A." },
            ].map((person, i) => (
              <div key={i} className="bg-gray-50 border border-gray-100 rounded-xl p-6 text-center hover:shadow-md transition-shadow">
                <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-gray-900 mb-1">{person.name}</h4>
                <p className="text-sm text-gray-500 font-medium">{person.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
