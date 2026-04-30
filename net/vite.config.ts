import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3112',
        changeOrigin: true,
      },
      '/graphql': {
        target: 'http://localhost:3112',
        changeOrigin: true,
      },
      '/rpc': {
        target: 'http://localhost:3112',
        changeOrigin: true,
      },
      '/ws': {
        target: 'ws://localhost:3112',
        ws: true,
      },
    },
  },
})
