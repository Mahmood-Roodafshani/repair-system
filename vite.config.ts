import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'src': path.resolve(__dirname, './src'),
      'localization': path.resolve(__dirname, './src/localization'),
      '@/localization': path.resolve(__dirname, './src/localization'),
      '@/types': path.resolve(__dirname, './src/types'),
      '@/types/pagination': path.resolve(__dirname, './src/types/pagination.ts'),
    },
  },
  server: {
    port: 3000,
    host: true,
    open: true,
    cors: true,
  },
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
}); 