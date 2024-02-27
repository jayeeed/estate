import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],

  build: {
    minify: "terser", // Use terser for minification
    brotliSize: false, // Disable Brotli compression for faster build times
    assetsInlineLimit: 4096,
    sourcemap: false,
  },
  server: {
    port: 3009, // Use a specific port for the development server
    // open: true, // Automatically open the browser when starting the dev server
    hmr: {
      overlay: false, // Disable hot module replacement overlay for faster updates
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom", 'buffer',], // Specify the dependencies to pre-bundle for faster startup time
  },
  esbuild: {
    jsxFactory: "h", // Use 'h' as JSX factory for faster JSX transformation
    jsxFragment: "Fragment", // Use 'Fragment' as JSX fragment for faster JSX transformation
  },
});

// import react from '@vitejs/plugin-react';
// import { defineConfig } from 'vite';

// export default defineConfig({
//   plugins: [react()],
//   optimizeDeps: {
//     esbuildOptions: {
//       loader: {
//         '.js': 'jsx',
//       },
//     },
//   },
//   server: {
//     port: 3009,
//     preview: {
//       port: 80,
//     },
//     proxy: {
//       '/api/node': {
//         target: 'http://localhost:5050',
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api\/node/, ''),
//       },
//       '/api/python': {
//         target: 'http://localhost:7050',
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api\/python/, ''),
//       },
//     },
//   },
//   build: {
//     minify: 'terser',
//     target: 'esnext',
//     assetsInlineLimit: 4096,
//     sourcemap: false,
//     rollupOptions: {
//       output: {
//         manualChunks: {
//           react: ['react', 'react-dom'],
//         },
//       },
//     },
//   },
// });

// import { defineConfig } from "vite";
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   // other Vite configurations...
//   plugins: [react()],
//   optimizeDeps: {
//     esbuildOptions: {
//       loader: {
//         '.js': 'jsx',
//       },
//     },
//   },
//   server: {
//     port: 3009,
//     preview:{
//       port:80,
//     }
//   },
// });

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
