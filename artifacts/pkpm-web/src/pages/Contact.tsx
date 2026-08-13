import { MapPin, Mail, Phone, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-20">
      <section className="bg-primary py-16 text-white text-center">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl font-extrabold mb-4">Hubungi Kami</h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Mari berkolaborasi. Kami terbuka untuk diskusi program kerja sama, pendampingan UMKM, maupun pertanyaan terkait riset.
          </p>
        </div>
      </section>

      <section className="py-16 container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          
          {/* Contact Info */}
          <div className="space-y-8">
            <h2 className="text-2xl font-extrabold text-gray-900">Informasi Kontak</h2>
            
            <div className="grid gap-6">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
                <div className="p-3 bg-blue-50 text-primary rounded-xl shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Alamat Kantor</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Gedung Pusat Kajian Terapan Lt. 2<br />
                    Kampus Utama Politeknik Negeri Malang<br />
                    Jl. Soekarno Hatta No.9, Jatimulyo, Kec. Lowokwaru<br />
                    Kota Malang, Jawa Timur 65141
                  </p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
                <div className="p-3 bg-amber-50 text-secondary rounded-xl shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Telepon</h3>
                  <p className="text-gray-600 text-sm">(0341) 404424 (Ext. 1234)</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Email</h3>
                  <p className="text-gray-600 text-sm">pkpm@polinema.ac.id</p>
                  <p className="text-gray-600 text-sm">humas.pkpm@polinema.ac.id</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
                <div className="p-3 bg-green-50 text-green-600 rounded-xl shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Jam Operasional</h3>
                  <p className="text-gray-600 text-sm">Senin - Jumat: 08.00 - 16.00 WIB</p>
                  <p className="text-gray-600 text-sm">Sabtu - Minggu: Tutup</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 md:p-10 rounded-2xl border border-gray-100 shadow-lg">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Kirim Pesan</h2>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Nama Lengkap</label>
                    <Input placeholder="Budi Santoso" className="bg-gray-50 border-gray-200" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Instansi / UMKM</label>
                    <Input placeholder="Nama instansi..." className="bg-gray-50 border-gray-200" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Alamat Email</label>
                  <Input type="email" placeholder="budi@example.com" className="bg-gray-50 border-gray-200" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Subjek</label>
                  <Input placeholder="Tawaran Kerja Sama..." className="bg-gray-50 border-gray-200" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Pesan</label>
                  <Textarea placeholder="Tulis pesan Anda di sini..." className="min-h-[150px] bg-gray-50 border-gray-200 resize-none" />
                </div>
              </div>
              
              <Button type="submit" className="w-full font-bold h-12 text-base">
                <Send className="w-4 h-4 mr-2" /> Kirim Pesan
              </Button>
            </form>
          </div>

        </div>
      </section>

      {/* Map Placeholder */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="h-96 w-full bg-gray-200 rounded-2xl overflow-hidden border border-gray-300 relative group">
          <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors z-10 pointer-events-none" />
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.504391694285!2d112.61347961477465!3d-7.946713594276189!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e78827687d272e7%3A0x789ce9a636cd3aa2!2sPoliteknik%20Negeri%20Malang!5e0!3m2!1sid!2sid!4v1655180000000!5m2!1sid!2sid" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="filter grayscale-[20%] contrast-[110%] relative z-0"
          ></iframe>
        </div>
      </section>
    </div>
  );
}
