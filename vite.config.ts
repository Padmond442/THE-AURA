import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic', 
    }),
    tailwindcss(),
  ],
  // --- ADD THIS TO FIX THE BUILD ERROR ---
  ssr: {
    external: [
      '@tanstack/start',
      '@tanstack/start-server-core',
      '@tanstack/react-router'
    ],
  },
  // ---------------------------------------
  server: {
    host: true,
    port: 8000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ['react', 'react-dom', 'three', '@react-three/fiber'],
  },
  optimizeDeps: {
    include: ['react/jsx-runtime'],
  }
})