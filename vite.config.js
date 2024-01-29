import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
// vite.config.js

export default defineConfig({
  // other Vite configurations...
  plugins: [react()],
  server: {
    proxy: {
      "/api/node": {
        target: "http://localhost:5050", // Adjust the port as needed
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/node/, ""),
      },
      "/api/python": {
        target: "http://localhost:7050", // Adjust the port as needed
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/python/, ""),
      },
    },
  },
});
