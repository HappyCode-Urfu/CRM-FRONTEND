import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
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
