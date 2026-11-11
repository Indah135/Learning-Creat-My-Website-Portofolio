// ── Formspree: pesan form kontak diteruskan ke email pemilik website ──
// 1. Daftar gratis di https://formspree.io
// 2. Buat form baru → masukkan email Anda → konfirmasi lewat link di email
// 3. Salin Form ID (contoh: "xrgvoknq") lalu tempel di bawah
//    Belum diisi = form memakai fallback (API lokal / mailto pengunjung)
export const FORMSPREE_ID = '';

export const FORMSPREE_ENDPOINT = FORMSPREE_ID
  ? `https://formspree.io/f/${FORMSPREE_ID}`
  : '';
