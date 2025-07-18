import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000, // ← choose your custom port here
    cors : true,
    allowedHosts: ['test.fazalkadivar.com'] 
  },
  plugins: [react(), tailwindcss()],
});

