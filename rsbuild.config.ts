import { defineConfig } from "@rsbuild/core"
import { pluginBabel } from "@rsbuild/plugin-babel"
import { pluginSolid } from "@rsbuild/plugin-solid"
import CompressionPlugin from "compression-webpack-plugin"

export default defineConfig({
  plugins: [pluginBabel({ include: /\.(?:jsx|tsx)$/ }), pluginSolid()],
  source: {
    alias: { "~": "./src" },
    define: {
      "import.meta.env.VERSION": JSON.stringify(
        process.env.GITHUB_RUN_NUMBER || "0.0.1"
      ),
    },
  },
  tools: {
    rspack: {
      optimization: {
        splitChunks: false,
        runtimeChunk: false,
      },
      plugins: [
        new CompressionPlugin({
          algorithm: "brotliCompress",
          filename: "[path][base]",
          test: /\.(js|css)$/,
          compressionOptions: {
            level: 11,
          },
          threshold: 0,
          minRatio: 1,
          deleteOriginalAssets: true,
        }),
      ],
    },
  },
  output: {
    inlineStyles: false,
    filename: {
      js: "app.mjs",
      css: "app.css",
    },
  },
})
