import { defineConfig } from 'vite'
import type { UserConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from "@tailwindcss/vite"
import path from "path"
import { sitemapPlugin } from './vite.sitemap'
import { ogpPlugin } from './vite.ogp'

// https://vite.dev/config/
const config: UserConfig = {
  plugins: [
    react(),
    tailwindcss(),
    sitemapPlugin(),
    ogpPlugin()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 2048,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
      output: {
        comments: false,
      },
      mangle: true,
    },
    cssMinify: "lightningcss"
  }
};

export default defineConfig(config);
