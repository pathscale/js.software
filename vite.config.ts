import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

import path from "path";

const runNumber = process.env.GITHUB_RUN_NUMBER || "dev";

export default defineConfig({
  plugins: [solidPlugin(), tailwindcss()],
  server: {
    port: 3000,
  },
  base: "/",
  build: {
    target: "esnext",
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name]-${runNumber}.[hash].js`,
        chunkFileNames: `assets/[name]-${runNumber}.[hash].js`,
        assetFileNames: `assets/[name]-${runNumber}.[hash].[ext]`,
        manualChunks: {
          vendor: ["@solidjs/router", "solid-js"],
        },
      },
    },
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src"),
    },
  },
});
