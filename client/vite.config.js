import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { Buffer } from "buffer";
// https://vitejs.dev/config/
export default defineConfig({
  define: {
    Buffer: Buffer,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // server: {
  //   proxy: {
  //     "/create": {
  //       target: "http://localhost:5000/create",
  //       changeOrigin: true,
  //     },
  //     "/": {
  //       target: "http://localhost:5000/",
  //       changeOrigin: true,
  //     },
  //   },
  // },
});
