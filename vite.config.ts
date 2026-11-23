import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2015',
    minify: 'esbuild',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
          icons: ['lucide-react']
        }
      }
    }
  },
  server: {
    hmr: { overlay: false },
    // Backend FastAPI (inscriptions & équipes) en développement
    proxy: {
      '/api': 'http://127.0.0.1:8000',
      '/fichiers': 'http://127.0.0.1:8000'
    }
  }
});
