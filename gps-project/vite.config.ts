import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: 'all',
    proxy: {
      '/api': {
        target: 'http://host.docker.internal:5001',
        changeOrigin: true,
        secure: false,
      },
      '/hubs': {
        target: 'http://host.docker.internal:5001',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
})
