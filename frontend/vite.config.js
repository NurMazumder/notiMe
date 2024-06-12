import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:5050", // The target host of your backend
        changeOrigin: true, // Recommended for virtual hosted sites
        secure: false, // If the backend server is on HTTPS, you might need this
        // rewrite: (path) => path.replace(/^\/api/, '') // Optional, if you need to rewrite the API path
      },
    },
  },
});
