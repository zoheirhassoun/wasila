import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import netlify from "@netlify/vite-plugin";
import path from "node:path";
import { fileURLToPath } from "node:url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8888",
        changeOrigin: true,
      },
    },
  },
  plugins: [
    react(),
    netlify(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "وسيلة",
        short_name: "وسيلة",
        description: "متاجر، توصيل، مطاعم، طيران",
        theme_color: "#0f172a",
        background_color: "#0f172a",
        display: "standalone",
        dir: "rtl",
        lang: "ar",
        start_url: "/",
        icons: [
          { src: "/favicon.svg", sizes: "any", type: "image/svg+xml", purpose: "any maskable" },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],
        runtimeCaching: [
          {
            urlPattern: /\/api\//,
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              networkTimeoutSeconds: 10,
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
});
