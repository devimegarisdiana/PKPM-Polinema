# Panduan Deploy PKPM ke cPanel Jagoan Hosting

## Gambaran Umum

Satu proses Node.js (Express) menjalankan semuanya:
- **API** di `/api/*`
- **Frontend** (file statis hasil build Vite) di semua route lain

Tidak perlu reverse proxy terpisah. Cukup satu Node.js app di cPanel.

---

## Langkah 1 – Build di Replit

Jalankan perintah berikut di terminal Replit:

```bash
bash deploy/build-deploy.sh
```

Setelah selesai, file `deploy/pkpm-deploy.zip` siap diupload.

---

## Langkah 2 – Upload ke cPanel

1. Login ke **cPanel Jagoan Hosting**
2. Buka **File Manager**
3. Navigasi ke direktori home (misal `/home/useranda/`)
4. Buat folder baru: `pkpm` → sehingga path-nya `/home/useranda/pkpm/`
5. Upload file `deploy/pkpm-deploy.zip` ke folder tersebut
6. Klik kanan → **Extract** → ekstrak isi ZIP ke `/home/useranda/pkpm/`

Setelah ekstrak, struktur folder harus seperti ini:
```
/home/useranda/pkpm/
├── app.js
├── package.json
├── .htaccess
├── .env.example
└── dist/
    ├── index.mjs
    ├── thread-stream-worker.mjs   (pino worker)
    └── public/
        ├── index.html
        └── assets/
```

---

## Langkah 3 – Install Dependencies di cPanel

1. Buka **Terminal** di cPanel (atau SSH)
2. Jalankan:

```bash
cd ~/pkpm
npm install --production
```

Ini hanya menginstall `mysql2` dan `pino-pretty` (sudah terdaftar di `package.json`).

---

## Langkah 4 – Set Environment Variables

Environment variables **wajib** diset sebelum app bisa jalan. Ada dua cara:

### Cara A – cPanel Node.js Selector (Direkomendasikan)

1. Di cPanel, buka **Node.js Selector** (atau **Setup Node.js App**)
2. Pilih app `pkpm` (folder `/home/useranda/pkpm`)
3. Scroll ke bagian **Environment Variables**, tambahkan:

| Key | Value |
|-----|-------|
| `DATABASE_URL` | `mysql://USER:PASS@101.50.1.94:3306/NAMA_DB` |
| `SESSION_SECRET` | String panjang acak (min 32 karakter) |
| `ADMIN_CREDENTIALS` | `admin:password_aman` |
| `NODE_ENV` | `production` |

### Cara B – File `.env` di Server

Sebagai alternatif, buat file `.env` di `/home/useranda/pkpm/.env` berisi:

```
DATABASE_URL=mysql://USER:PASS@101.50.1.94:3306/NAMA_DB
SESSION_SECRET=REPLACE_WITH_LONG_RANDOM_STRING
ADMIN_CREDENTIALS=admin:REPLACE_WITH_SECURE_PASSWORD
NODE_ENV=production
```

Lalu pastikan `dotenv` terinstall (sudah tercantum di `package.json`, jadi cukup jalankan `npm install`).

> **Catatan:** Jika variabel sudah diset via Cara A (cPanel Selector), file `.env` tidak diperlukan. Cara A lebih aman karena nilai tidak tersimpan di file teks di server.

---

## Langkah 5 – Konfigurasi Node.js App di cPanel

1. Buka **Node.js Selector** di cPanel
2. Klik **Create Application** (atau **Add Application**)
3. Isi formulir:

| Field | Value |
|-------|-------|
| **Node.js version** | 20.x atau 22.x (pilih terbaru yang tersedia) |
| **Application mode** | Production |
| **Application root** | `/home/useranda/pkpm` |
| **Application URL** | Domain/subdomain tujuan (misal `pkpm.polinema.ac.id`) |
| **Application startup file** | `app.js` |

4. Klik **Create** / **Save**
5. Klik **Restart** untuk memulai aplikasi

---

## Langkah 6 – Arahkan Domain

Hubungi pengelola domain `polinema.ac.id` untuk menambahkan DNS record:

```
Type: A
Name: pkpm (atau @ jika mau root domain)
Value: <IP server Jagoan Hosting>
TTL: 3600
```

IP server Jagoan Hosting bisa dilihat di cPanel → **Server Information**.

Atau, jika menggunakan subdomain di cPanel sendiri:
1. Buka **Subdomains** di cPanel
2. Buat subdomain `pkpm.polinema.ac.id` dengan Document Root yang mengarah ke `pkpm/dist/public` (jika menggunakan static hosting)
   - **Namun disarankan** menggunakan Node.js Selector seperti Langkah 5 agar API berjalan

---

## Langkah 7 – Pasang SSL (Opsional tapi Direkomendasikan)

1. Di cPanel, buka **SSL/TLS** → **Let's Encrypt SSL**
2. Pilih domain `pkpm.polinema.ac.id`
3. Klik **Issue**

Setelah SSL aktif, buka `deploy/cpanel.htaccess`, hapus komentar pada baris redirect HTTPS:
```apache
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```
Lalu upload ulang `.htaccess` ke `/home/useranda/pkpm/.htaccess`.

---

## Verifikasi

Setelah deploy selesai, cek:

- `https://pkpm.polinema.ac.id/` → halaman depan website
- `https://pkpm.polinema.ac.id/api/healthz` → harus mengembalikan `{"status":"ok"}`
- `https://pkpm.polinema.ac.id/admin` → halaman login admin

---

## Update / Re-deploy

Setiap ada perubahan kode:

1. Jalankan lagi `bash deploy/build-deploy.sh` di Replit
2. Upload ZIP baru, ekstrak (timpa file lama)
3. Di cPanel Node.js Selector → klik **Restart**

---

## Troubleshooting

**App tidak mau start:**
- Pastikan semua Environment Variables sudah diset
- Cek log di cPanel → Node.js Selector → **Error Log**
- Pastikan `DATABASE_URL` benar dan DB server `101.50.1.94` bisa diakses dari server cPanel

**API 500 error:**
- Cek koneksi database: pastikan user MySQL punya akses dari IP server Jagoan Hosting
- Di cPanel → **Remote MySQL**, tambahkan IP server jika perlu

**Frontend tampil tapi API tidak jalan:**
- Pastikan `NODE_ENV=production` sudah diset
- Cek apakah `dist/public/index.html` ada di server
