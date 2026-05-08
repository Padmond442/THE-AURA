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
  // --- ADD THIS SECTION ---
  server: {
    host: true, // This exposes the project on your local network
    port: 8000, // You can specify a port or leave it default
  },
  // ------------------------
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