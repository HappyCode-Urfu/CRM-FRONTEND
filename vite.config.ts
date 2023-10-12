import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      assets: '/src/assets',
      components: '/src/components',
      http: '/src/http',
      layouts: '/src/layouts',
      pages: '/src/pages',
      router: '/src/router',
      store: '/src/store',
      styles: '/src/styles',
      utils: '/src/utils',
    },
  },
})
