import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Wajib diisi nama repository agar aset (JS/CSS/gambar) tampil benar di GitHub Pages
  base: '/Learning-Creat-My-Website-Portofolio/',
  build: {
    outDir: 'docs',
  },
})
