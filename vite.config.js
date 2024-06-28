import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import daisyui from "daisyui";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), daisyui],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@views": path.resolve(__dirname, "src/views"),
      "@": path.resolve(__dirname, "src"),
      // Tambahkan alias lainnya sesuai kebutuhan Anda
    },
  },
});
