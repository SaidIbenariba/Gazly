import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { Buffer } from "buffer";
import { nodePolyfills } from "vite-plugin-node-polyfills";
// import nodePolyfills from ""
// https://vitejs.dev/config/
export default defineConfig({
  
  server:{
    // port:5174,\
    watch:{
      usePolling:true,
    },
    proxy:{
      "/api":{
        target:"http://localhost:5000",
        changeOrigin:true,
        rewrite:(path) => path.replace(/^\/api/,"/api")
      }
      
    }
  },
  // define: {
  //   Buffer: Buffer,
  // },
  plugins: [react(), nodePolyfills()],
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
