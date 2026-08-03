import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      // Multi-page: the homepage and the dashcam deep-dive are separate HTML
      // entries, so the deep-dive ships its own meta tags and link preview.
      input: {
        main: resolve(__dirname, 'index.html'),
        dashcam: resolve(__dirname, 'dashcam.html'),
      },
    },
  },
})
