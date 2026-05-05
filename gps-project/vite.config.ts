import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiBase = env.VITE_API_BASE_URL || 'http://host.docker.internal:5001'

  return {
    plugins: [react()],
    server: {
      allowedHosts: true,
      proxy: {
        '/api': {
          target: apiBase,
          changeOrigin: true,
          secure: false,
        },
        '/hubs': {
          target: apiBase,
          changeOrigin: true,
          secure: false,
          ws: true,
        },
      },
    },
  }
})
