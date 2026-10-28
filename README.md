<div align="center">

# 💫 [Indah Amiati](https://github.com/Indah135) — Portfolio Website

**Website portfolio pribadi seorang Mahasiswa Informatika & Frontend Developer**  
*Dibangun dengan React 19 + Vite — tanpa UI library, semua animasi ditulis manual.*

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2024-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![PHP](https://img.shields.io/badge/PHP-Backend_API-777BB4?style=for-the-badge&logo=php&logoColor=white)](https://www.php.net)
[![MySQL](https://img.shields.io/badge/MySQL-Database-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com)
[![CSS3](https://img.shields.io/badge/CSS3-Custom_Properties-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](#license)

</div>

---

## 📑 Daftar Isi

- [Tentang](#-tentang)
- [Fitur Unggulan](#-fitur-unggulan)
- [Tech Stack](#-tech-stack)
- [Struktur Proyek](#-struktur-proyek)
- [Instalasi & Menjalankan](#-instalasi--menjalankan)
- [Keamanan & File Privat](#-keamanan--file-privat)
- [Optimasi Performa](#-optimasi-performa)
- [Roadmap](#-roadmap)
- [Kontak](#-kontak)

---

## 🌟 Tentang

Website portfolio pribadi milik **Indah Amiati**, seorang **Mahasiswa Informatika UTDI** yang berfokus pada Frontend Development. Website ini dirancang sebagai etalase karya, keahlian, dan pengalaman — seluruhnya dalam satu halaman (Single Page Application) yang mulus.

Yang membuat proyek ini istimewa:
- **Tanpa Tailwind, tanpa Framer Motion, tanpa UI library** — semua efek visual ditulis manual
- **Backend PHP + MySQL** untuk penyimpanan data portofolio yang dinamis
- **Area Admin pribadi** (tidak disertakan di repositori publik) untuk mengelola seluruh konten website
- **Middleware autentikasi** yang melindungi area admin dari akses tidak sah

> *"Coding adalah seni menyusun logika yang hidup."*

---

## ✨ Fitur Unggulan

<table>
<tr>
<td>

**🎬 Splash Screen**  
Intro loading dengan progress bar gradient dan tombol skip interaktif.

</td>
<td>

**🌗 Dark / Light Theme**  
Toggle tema gelap-terang yang tersimpan otomatis di `localStorage`.

</td>
</tr>
<tr>
<td>

**🖱️ Cursor Glow**  
Cahaya radial yang mengikuti kursor, plus blob parallax di mode terang.

</td>
<td>

**📜 Scroll Reveal**  
Animasi masuk elemen saat di-scroll, memakai `IntersectionObserver` custom.

</td>
</tr>
<tr>
<td>

**🔮 Glassmorphism**  
Navbar & kartu dengan efek kaca `backdrop-filter: blur` modern.

</td>
<td>

**🧊 3D Tilt Cards**  
Kartu proyek dengan efek miring tiga dimensi saat hover.

</td>
</tr>
<tr>
<td>

**✍️ Word Reveal**  
Teks muncul kata per kata dengan efek blur-in berurutan.

</td>
<td>

**📱 Fully Responsive**  
Layout adaptif untuk desktop, tablet, dan mobile (hamburger menu).

</td>
</tr>
<tr>
<td>

**🔒 Admin Area (Privat)**  
Dashboard pengelolaan konten website dengan autentikasi & middleware guard.

</td>
<td>

**🗄️ Backend PHP + MySQL**  
API PHP untuk menyimpan & membaca data portofolio dari database.

</td>
</tr>
</table>

**Alur halaman:**  
`Splash` → `Hero` → `About` → `Projects` → `Contact` → `Footer`

---

## 🛠 Tech Stack

| Kategori | Teknologi |
|---|---|
| **Framework** | React 19 |
| **Build Tool** | Vite 8 |
| **Bahasa (Frontend)** | JavaScript (JSX) — ESM |
| **Styling** | CSS murni dengan CSS Custom Properties |
| **Animasi** | CSS keyframes + React hooks kustom |
| **Backend** | PHP (Native) — REST API |
| **Database** | MySQL / MariaDB via phpMyAdmin |
| **Linting** | Oxlint + React plugin |
| **Runtime Deps** | `react`, `react-dom`, `ogl` |

---

## 📂 Struktur Proyek

> **Catatan:** Beberapa folder bersifat **privat** dan tidak disertakan di repositori ini demi keamanan (lihat [bagian keamanan](#-keamanan--file-privat)).

```
Learning-Creat-My-Website-Portofolio/
├── public/
│   ├── dark-bg.jpg              # Background mode gelap
│   └── photo/                   # 🔒 Foto (tidak di-commit)
│       └── indah2.png
├── src/
│   ├── main.jsx                 # Entry point React
│   ├── App.jsx                  # Root komponen + routing hash admin
│   ├── index.css                # Semua styles + design tokens
│   ├── data/
│   │   └── projects.js          # Data proyek default (fallback)
│   ├── hooks/
│   │   ├── useTheme.js          # Toggle tema gelap/terang
│   │   └── useScrollReveal.js   # IntersectionObserver hook
│   ├── context/
│   │   └── PortfolioContext.jsx  # State global + sinkronisasi API
│   ├── components/
│   │   ├── Splash.jsx           # Intro loading screen
│   │   ├── CursorGlow.jsx       # Efek cahaya kursor
│   │   ├── Navbar.jsx           # Navigasi glass + theme toggle
│   │   ├── Hero.jsx             # Marquee nama + foto
│   │   ├── About.jsx            # Bio + skills + minat + CV
│   │   ├── Projects.jsx         # Kartu proyek dengan 3D tilt
│   │   ├── Contact.jsx          # Form & info kontak
│   │   ├── Footer.jsx           # Footer
│   │   └── WordReveal.jsx       # Animasi teks per kata
│   └── admin/                   # 🔒 Area admin (tidak di-commit)
│       ├── AdminPortal.jsx
│       ├── AdminLogin.jsx
│       ├── AdminDashboard.jsx
│       ├── ProtectedRoute.jsx
│       └── admin.css
├── api/                         # 🔒 Backend PHP (tidak di-commit)
│   ├── config.php               # Konfigurasi & koneksi database
│   ├── login.php                # Autentikasi admin
│   ├── get_data.php             # Ambil semua data portofolio
│   ├── save_profile.php         # Simpan data profil
│   ├── save_contact.php         # Simpan data kontak
│   ├── projects.php             # CRUD data proyek
│   ├── skills_edu.php           # Simpan skills & pendidikan
│   └── messages.php             # Pesan dari form kontak
├── database/                    # 🔒 File SQL (tidak di-commit)
│   └── portfolio_db.sql
├── index.html
├── vite.config.js
├── package.json
└── .gitignore
```

---

## 🚀 Instalasi & Menjalankan

**Prasyarat:** [Node.js](https://nodejs.org) (v18+) dan npm.

### Frontend (React)

**1. Clone repository**

```bash
git clone https://github.com/Indah135/Learning-Creat-My-Website-Portofolio.git
cd Learning-Creat-My-Website-Portofolio
```

**2. Install dependencies**

```bash
npm install
```

**3. Jalankan development server**

```bash
npm run dev
```

Website akan tersedia di `http://localhost:5173` dengan hot module replacement aktif.

### Backend PHP (Opsional — untuk fitur database)

> Backend PHP bersifat privat dan tidak disertakan di repositori ini. Jika kamu adalah pemilik proyek, ikuti langkah berikut:

1. Pastikan **XAMPP / Laragon** sudah berjalan (Apache + MySQL aktif)
2. Letakkan folder `api/` di direktori server (`htdocs/` atau `www/`)
3. Import file `database/portfolio_db.sql` ke **phpMyAdmin**
4. Sesuaikan kredensial di `api/config.php`
5. Akses area admin melalui `http://localhost:5173/#admin`

### 📜 Perintah Lengkap

| Perintah | Deskripsi |
|---|---|
| `npm run dev` | Menjalankan dev server (HMR) |
| `npm run build` | Build produksi ke folder `dist/` |
| `npm run preview` | Preview hasil build produksi |
| `npm run lint` | Jalankan linting dengan Oxlint |

---

## 🔒 Keamanan & File Privat

Repositori ini bersifat **publik** namun beberapa bagian sensitif **sengaja tidak disertakan** demi keamanan:

| File / Folder | Alasan Tidak Di-commit |
|---|---|
| `api/` | Berisi logika server, koneksi database, dan query SQL |
| `src/admin/` | Area admin khusus pemilik (login, dashboard) |
| `database/*.sql` | Schema dan data database |
| `public/photo/indah2.png` | Foto profil pribadi |
| `public/photo/properti.png` | Ilustrasi section About (pribadi) |
| `public/*.pdf` | File CV pribadi |
| `.env` | Environment variable (jika ada) |

Semua file tersebut sudah terdaftar di `.gitignore` dan **tidak akan ikut ter-clone** oleh siapapun.

---

## 📊 Optimasi Performa

- ⚡ **Runtime dependencies minimal** — hanya `react`, `react-dom`, dan `ogl`
- 🚫 **Tanpa UI/animation library** — semua efek ditulis dengan CSS murni
- 📦 **Lazy loading** — komponen AdminPortal dimuat hanya saat dibutuhkan
- 🔁 **IntersectionObserver** — animasi dijalankan hanya saat elemen terlihat
- 💾 **Data persisten** — konten tersimpan di `localStorage` sebagai fallback offline
- 🗄️ **Sinkronisasi database** — data otomatis diambil dari MySQL jika server tersedia

---

## 🗺️ Roadmap

- [x] Splash screen dengan progress bar
- [x] Dark / light theme toggle
- [x] Cursor glow & parallax blob
- [x] Scroll reveal animasi
- [x] Kartu proyek 3D tilt
- [x] Area admin dengan autentikasi & middleware guard
- [x] Backend PHP + MySQL untuk data dinamis
- [x] Proteksi file privat via `.gitignore`
- [ ] Deploy ke Vercel / Netlify
- [ ] Optimasi SEO (meta tags, Open Graph)
- [ ] Filter kategori pada section Projects
- [ ] Dukungan `prefers-color-scheme` (sistem OS)
- [ ] Migrasi bertahap ke TypeScript

---

## 📬 Kontak

Dibuat oleh **Indah Amiati** — terbuka untuk kolaborasi, diskusi, dan peluang kerja.

<div align="center">

[![GitHub](https://img.shields.io/badge/GitHub-Indah135-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Indah135)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-indah--amiati-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/indah-amiati/)
[![Email](https://img.shields.io/badge/Email-indahamiati85-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:indahamiati85@gmail.com)

*Jangan ragu untuk membuka issue atau memberikan feedback di repository ini.*

</div>

---

<div align="center">

**Made with 💙 and lots of vanilla CSS**

© 2026 Indah Amiati

</div>
