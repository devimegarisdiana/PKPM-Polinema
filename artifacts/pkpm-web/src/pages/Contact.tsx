import { MapPin, Mail, Phone, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, type FormEvent } from "react";

export default function Contact() {
  const [emailDraft, setEmailDraft] = useState<string | null>(null);
  function prepareConsultation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = [
      `Nama: ${data.get("name")}`,
      `Nama usaha: ${data.get("business")}`,
      `WhatsApp: ${data.get("whatsapp")}`,
      `Lokasi usaha: ${data.get("location") || "Belum diisi"}`,
      `Kebutuhan utama: ${data.get("need")}`,
      `Kondisi usaha:\n${data.get("message")}`,
    ].join("\n\n");
    setEmailDraft(`mailto:pkpm@polinema.ac.id?subject=${encodeURIComponent("Konsultasi UMKM — " + data.get("business"))}&body=${encodeURIComponent(body)}`);
  }
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-20">
      <section className="bg-primary py-16 text-white text-center">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl font-extrabold mb-4">Ceritakan tantangan usaha Anda kepada kami.</h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Tidak harus sudah memiliki rumusan masalah. Sampaikan kondisi usaha, kendala yang dirasakan, dan perubahan yang ingin dicapai sebagai langkah awal untuk berdiskusi.
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
                    Politeknik Negeri Malang
                  </p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
                <div className="p-3 bg-amber-50 text-secondary rounded-xl shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Kolaborasi lintas bidang</h3>
                  <p className="text-gray-600 text-sm">Terbuka untuk UMKM, dosen, mahasiswa, TEFA, pemerintah, industri, komunitas, dan mitra lainnya.</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Email</h3>
                  <a href="mailto:pkpm@polinema.ac.id" className="text-primary text-sm hover:underline">pkpm@polinema.ac.id</a>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
                <div className="p-3 bg-green-50 text-green-600 rounded-xl shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Langkah awal</h3>
                  <p className="text-gray-600 text-sm">Informasi awal membantu kami memahami kebutuhan Anda sebelum menghubungkannya dengan kepakaran yang relevan.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 md:p-10 rounded-2xl border border-gray-100 shadow-lg">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-4">Sampaikan kebutuhan usaha</h2>
            <p className="text-sm text-gray-600 mb-6">Kolom bertanda * perlu diisi. Formulir menyiapkan draf email ke pkpm@polinema.ac.id; pesan belum terkirim sampai Anda mengirimnya melalui aplikasi email. Data tidak disimpan di website.</p>
            <form className="space-y-6" onSubmit={prepareConsultation} onChange={() => setEmailDraft(null)}>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="consultation-name" className="text-sm font-bold text-gray-700">Nama *</label>
                    <Input id="consultation-name" name="name" required maxLength={120} autoComplete="name" className="bg-gray-50 border-gray-200" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="consultation-business" className="text-sm font-bold text-gray-700">Nama usaha *</label>
                    <Input id="consultation-business" name="business" required maxLength={160} className="bg-gray-50 border-gray-200" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="consultation-whatsapp" className="text-sm font-bold text-gray-700">WhatsApp *</label>
                  <Input id="consultation-whatsapp" name="whatsapp" type="tel" required maxLength={30} autoComplete="tel" className="bg-gray-50 border-gray-200" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="consultation-location" className="text-sm font-bold text-gray-700">Lokasi usaha</label>
                  <Input id="consultation-location" name="location" maxLength={200} className="bg-gray-50 border-gray-200" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="consultation-need" className="text-sm font-bold text-gray-700">Kebutuhan utama *</label>
                  <select id="consultation-need" name="need" required defaultValue="" className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm">
                    <option value="" disabled>Pilih kebutuhan</option>
                    {["Produksi dan mutu", "Keuangan dan pembiayaan", "Pemasaran dan merek", "Digitalisasi usaha", "Desain dan pengembangan produk", "Perizinan dan standardisasi", "Lainnya"].map(need => <option key={need}>{need}</option>)}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="consultation-message" className="text-sm font-bold text-gray-700">Ceritakan kondisi usaha Anda *</label>
                  <Textarea id="consultation-message" name="message" required maxLength={2000} placeholder="Kondisi usaha, kendala, dan perubahan yang ingin dicapai..." className="min-h-[150px] bg-gray-50 border-gray-200 resize-none" />
                </div>
              </div>
              
              <Button type="submit" className="w-full font-bold h-12 text-base">
                <Send className="w-4 h-4 mr-2" /> Siapkan draf email
              </Button>
              {emailDraft && <div role="status" className="rounded-xl bg-blue-50 p-4 text-sm text-primary"><p className="mb-3">Draf sudah disiapkan, belum terkirim. Buka aplikasi email, periksa isinya, lalu kirim.</p><a href={emailDraft} className="font-bold underline">Buka draf di aplikasi email →</a></div>}
            </form>
          </div>

        </div>
      </section>

      {/* Map Placeholder */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="h-96 w-full bg-gray-200 rounded-2xl overflow-hidden border border-gray-300 relative group">
          <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors z-10 pointer-events-none" />
          <iframe 
            title="Lokasi kampus Politeknik Negeri Malang"
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
