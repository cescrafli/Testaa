import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  plugins: [
    ViteImageOptimizer({
      png: { quality: 80 },
      jpeg: { quality: 80 },
      jpg: { quality: 80 },
      webp: { lossless: true },
      avif: { lossless: true },
    }),
  ],
  build: {
    minify: 'terser', 
    rollupOptions: {
      input: {
        main: './index.html',
        katalog: './katalog.html',
        proyek: './proyek.html',
        tentang: './tentang.html',
        artikel: './artikel.html',
        kontak: './kontak.html',
        sukses: './sukses.html',
        enMain: './en/index.html',
        enKatalog: './en/katalog.html',
        enProyek: './en/proyek.html',
        enTentang: './en/tentang.html',
        enArtikel: './en/artikel.html',
        enKontak: './en/kontak.html',
        enSukses: './en/sukses.html'
      }
    }
  }
});
