import { defineConfig } from "vite";
import react from '@vitejs/plugin-react';

// import react from '@vitejs/plugin-react-swc'
// import styled from 'vite-plugin-styled-components';

export default defineConfig({
  // other Vite configurations...
  plugins: [react()],
  // plugins: [react(),styled()],
  // optimizeDeps: {
  //   esbuildOptions: {
  //     loader: {
  //       '.js': 'jsx',
  //     },
  //   },
  // },
  server: {
    port: 3009,
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
    preview:{
      port:80,
    }
  },
});
