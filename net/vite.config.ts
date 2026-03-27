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
        target: 'http://localhost:3202',
        changeOrigin: true,
      },
      '/graphql': {
        target: 'http://localhost:3202',
        changeOrigin: true,
      },
      '/rpc': {
        target: 'http://localhost:3202',
        changeOrigin: true,
      },
      '/ws': {
        target: 'ws://localhost:3202',
        ws: true,
      },
    },
  },
})
