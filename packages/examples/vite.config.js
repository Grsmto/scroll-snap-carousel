import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  build: {
    rollupOptions: {
      input: './index.js',
    },
  },
  server: {
    port: 8090,
    open: true,
    hmr: true
  },
  plugins: [react()],
});
