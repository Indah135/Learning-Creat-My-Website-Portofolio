<div align="center">

# 💫 [Indah Amiati](https://github.com/Indah135) — Portfolio Website

**Personal portfolio site for a Front-End Developer**
*built with React 19 + Vite — zero UI libraries, all animations hand-crafted.*

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2024-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
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
- [Optimasi Performa](#-optimasi-performa)
- [Roadmap](#-roadmap)
- [Kontak](#-kontak)

---

## 🌟 Tentang

Website portfolio pribadi milik **Indah Amiati**, seorang **Front-End Developer** yang membangun antarmuka web yang cepat, responsif, dan estetis. Website ini dirancang sebagai etalase karya, keahlian, dan pengalaman profesional — seluruhnya dalam satu halaman (single-page application) yang mulus.

Yang membuat proyek ini istimewa: **tanpa Tailwind, tanpa Framer Motion, tanpa UI library.** Semua efek visual — splash screen, cursor glow, scroll-reveal, marquee, glassmorphism, hingga animasi tema gelap/terang — ditulis manual dengan CSS murni dan React hooks. Sebuah perjalanan belajar yang serius tentang fondasi front-end.

> *"Coding adalah seni menyusun logika yang hidup."*

---

## ✨ Fitur Unggulan

<table>
<tr>
<td>

**🎬 Splash Screen**
Intro loading dengan progress bar gradient 2.2 detik dan tombol skip interaktif.

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
Animasi masuk elemen saat di-scroll, memakai IntersectionObserver custom.

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
</table>

**Alur halaman:**
`Splash` → `Hero` → `About` → `Skills` → `Projects` → `Experience` → `Contact` → `Footer`

---

## 🛠 Tech Stack

| Kategori | Teknologi |
|---|---|
| **Framework** | React 19 |
| **Build Tool** | Vite 8 |
| **Bahasa** | JavaScript (JSX) — ESM |
| **Styling** | CSS murni dengan CSS Custom Properties |
| **Linting** | Oxlint + React plugin |
| **Animasi** | CSS keyframes + React hooks kustom |
| **Runtime Deps** | Hanya `react` & `react-dom` (sangat ringan!) |

---

## 📂 Struktur Proyek

```
Learning-Creat-My-Website-Portofolio/
├── public/
│   ├── dark-bg.jpg              # Background mode gelap
│   └── photo/
│       ├── indah2.png           # Foto hero
│       └── properti.png         # Ilustrasi section About
├── src/
│   ├── main.jsx                 # Entry point React
│   ├── App.jsx                  # Komposisi seluruh section
│   ├── index.css                # Semua styles + design tokens
│   ├── hooks/
│   │   ├── useTheme.js          # Toggle tema gelap/terang
│   │   └── useScrollReveal.js   # IntersectionObserver hook
│   └── components/
│       ├── Splash.jsx           # Intro loading screen
│       ├── CursorGlow.jsx       # Efek cahaya kursor
│       ├── Navbar.jsx           # Navigasi glass + theme toggle
│       ├── Hero.jsx             # Marquee nama + foto
│       ├── About.jsx            # Bio + Download CV
│       ├── Skills.jsx           # 10 kartu keahlian + progress bar
│       ├── Projects.jsx         # 4 kartu proyek dengan 3D tilt
│       ├── Experience.jsx       # Timeline pengalaman
│       ├── Contact.jsx          # Kartu kontak
│       ├── Footer.jsx           # Footer
│       └── WordReveal.jsx       # Animasi teks per kata
├── index.html
├── vite.config.js
└── package.json
```

---

## 🚀 Instalasi & Menjalankan

**Prasyarat:** [Node.js](https://nodejs.org) (v18+) dan npm.

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

### 📜 Perintah Lengkap

| Perintah | Deskripsi |
|---|---|
| `npm run dev` | Menjalankan dev server (HMR) |
| `npm run build` | Build produksi ke folder `dist/` |
| `npm run preview` | Preview hasil build produksi |
| `npm run lint` | Jalankan linting dengan Oxlint |

---

## 📊 Optimasi Performa

Pendekatan yang dipakai agar website tetap ringan dan cepat:

- ⚡ **Runtime dependencies minimal** — hanya `react` dan `react-dom`
- 🚫 **Tanpa UI/animation library** — semua efek ditulis dengan CSS murni
- 🖼️ **Aset gambar** — kompresi foto agar tidak membebani loading
- 🔁 **IntersectionObserver** — animasi dijalankan hanya saat elemen terlihat
- 💾 **Tema persisten** — preferensi pengguna disimpan di `localStorage`

---

## 🗺️ Roadmap

- [ ] Mengecek seluruh tautan placeholder (Email, GitHub, LinkedIn, CV)
- [ ] Deploy ke GitHub Pages / Vercel / Netlify
- [ ] Menambahkan section **Blog**
- [ ] Menambahkan **filter** pada section Projects
- [ ] Optimasi SEO (meta tags, Open Graph, sitemap)
- [ ] Menambahkan **dark mode system preference** (`prefers-color-scheme`)
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
