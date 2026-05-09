import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

export default defineConfig({
  plugins: [
    TanStackRouterVite({
      target: "react",
      autoCodeSplitting: true,
    }),
    react({
      jsxRuntime: "automatic",
    }),
    tailwindcss(),
  ],

  ssr: {
    external: [
      "@tanstack/start",
      "@tanstack/start-server-core",
      "@tanstack/react-router",
    ],
  },

  server: {
    host: true,
    port: 8000,
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "three", "@react-three/fiber"],
  },

  optimizeDeps: {
    include: ["react/jsx-runtime"],
  },
});