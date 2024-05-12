import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // proxy: {
    //   "/": "http://localhost:5000",
    // },
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
