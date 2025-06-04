import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // build: {
  //   outDir: 'dist',
  //   rollupOptions: {
  //     input: {
  //       main: resolve(__dirname, 'index.html'), // popup UI
  //     },
  //     output: {
  //       entryFileNames: 'assets/[name].js',
  //       chunkFileNames: 'assets/[name].js',
  //       assetFileNames: 'assets/[name].[ext]',
  //     },
  //   },
  // },
});
