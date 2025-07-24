import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite config specifically for GitHub Pages deployment
export default defineConfig({
  base: '/demo-complete-md-viewer/',
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
});
