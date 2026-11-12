import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base './' keeps asset paths relative so the built site works on any static
// host or sub-folder (GitHub Pages, Netlify, Vercel, a plain web server).
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  // In development, forward /api to the backend (server/, port 5000) so no CORS setup is needed.
  server: { proxy: { '/api': 'http://localhost:5000' } },
})
