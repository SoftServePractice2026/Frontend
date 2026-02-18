import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  const apiUrl = env.VITE_API_URL || 'https://localhost:7087'

  return {
    plugins: [
      react(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      proxy: {
        "/api": {
          target: apiUrl,
          changeOrigin: true,
          secure: false,
        }
      }
    }
  }
})
