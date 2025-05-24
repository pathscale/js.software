import { defineConfig } from "@rsbuild/core";
import { pluginBabel } from "@rsbuild/plugin-babel";
import { pluginSolid } from "@rsbuild/plugin-solid";
import CompressionPlugin from "compression-webpack-plugin";

export default defineConfig({
  plugins: [pluginBabel({ include: /\.(?:jsx|tsx)$/ }), pluginSolid()],
  source: {
    alias: { "~": "./src" },
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
          filename: "[path][base].br",
          test: /\.(js|css|html|svg)$/,
        }),
      ],
    },
  },
  output: {
    inlineStyles: false,
  },
});
