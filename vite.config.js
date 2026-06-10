import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    // Don't inline small assets — keep the CSS that lives in public/ untouched
    assetsInlineLimit: 0,
    rollupOptions: {
      // Three language entries — same bundle, language picked from <html lang>
      input: {
        main: 'index.html',
        en: 'en/index.html',
        es: 'es/index.html',
      },
    },
  },
  server: {
    port: 3000,
  },
});
