import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: false,
    chunkSizeWarningLimit: 500,
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    open: true,   // Abre o navegador automaticamente ao iniciar o servidor
    hmr: true,    // Hot Module Replacement para desenvolvimento mais rápido
  },
});
