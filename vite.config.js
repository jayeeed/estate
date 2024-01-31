import { defineConfig } from "vite";
import react from '@vitejs/plugin-react';

export default defineConfig({
  // other Vite configurations...
  plugins: [react()],
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  server: {
    port: 3009,
    preview:{
      port:80,
    }
  },
});





// import react from '@vitejs/plugin-react-swc'
// import styled from 'vite-plugin-styled-components';

    // proxy: {
    //   "/api/node": {
    //     target: "http://localhost:5050", // Adjust the port as needed
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/node/, ""),
    //   },
    //   "/api/python": {
    //     target: "http://localhost:7050", // Adjust the port as needed
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/python/, ""),
    //   },
    // },