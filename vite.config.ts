import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import { viteSingleFile } from "vite-plugin-singlefile";

import path from "path";

const runNumber = process.env.GITHUB_RUN_NUMBER || "dev";

export default defineConfig({
  plugins: [solidPlugin(), tailwindcss(), viteSingleFile()],
  server: {
    port: 3000,
  },
  base: "/",
  build: {
    target: "esnext",
    cssCodeSplit: false,
    assetsInlineLimit: 100000000,
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
        entryFileNames: `assets/[name]-${runNumber}.[hash].js`,
        chunkFileNames: `assets/[name]-${runNumber}.[hash].js`,
        assetFileNames: `assets/[name]-${runNumber}.[hash].[ext]`,
      },
    },
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src"),
    },
  },
});
