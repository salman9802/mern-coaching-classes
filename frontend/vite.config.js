import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:80",
        changeOrigin: true, // Change the origin of the host header to the target
        // secure: false,
        // ws: false,
        // rewrite: (path) => path.replace("", ""), // Rewrite the path by removing '/api'
        // rewrite: (path) => path.replace(/^\/api/, ""), // Rewrite the path by removing '/api'
      },
      // "/api": "http://localhost:4567/foo",
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    // include: ["src/__tests__/**/*.{spec,test}.{js,jsx,ts,tsx}"],
    include: ["src/**/*.test.{js,jsx,ts,tsx}", "src/**/*.spec.{js,jsx,ts,tsx}"],
    setupFiles: ["src/__tests__/vitest-setup.js"],
  },
});
