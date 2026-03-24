import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import fs from 'fs';
import path from 'path';

// Post-build plugin: copies compiled CSS to root/style.css so XAMPP can serve it
function copyCompiledCss() {
  return {
    name: 'copy-compiled-css',
    closeBundle() {
      const assetsDir = path.resolve(__dirname, 'dist/assets');
      if (!fs.existsSync(assetsDir)) return;
      const cssFiles = fs.readdirSync(assetsDir).filter(f => f.startsWith('style') && f.endsWith('.css'));
      if (cssFiles.length === 0) return;
      const src = path.join(assetsDir, cssFiles[0]);
      fs.copyFileSync(src, path.resolve(__dirname, 'style.css'));
      console.log(`[copy-css] Copied ${cssFiles[0]} -> style.css`);
    }
  };
}

export default defineConfig({
  base: './', // Required for XAMPP/sub-folder hosting - makes all asset paths relative
  plugins: [
    ViteImageOptimizer({
      png: { quality: 80 },
      jpeg: { quality: 80 },
      jpg: { quality: 80 },
      webp: { lossless: true },
      avif: { lossless: true },
    }),
    copyCompiledCss(),
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
