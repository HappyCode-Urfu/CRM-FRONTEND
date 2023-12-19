import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    strictPort: true,
    port: 3000,
    // proxy: {
    //   '/api/v1': {
    //     target: 'http://localhost:10000',
    //     changeOrigin: true,
    //   },
    // },
  },
  resolve: {
    alias: {
      assets: '/src/assets',
      components: '/src/components',
      http: '/src/http',
      hooks: '/src/hooks',
      layouts: '/src/layouts',
      pages: '/src/pages',
      models: '/src/models',
      router: '/src/router',
      store: '/src/store',
      utils: '/src/utils',
    },
  },
})
