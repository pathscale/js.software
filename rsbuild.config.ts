import { defineConfig } from "@rsbuild/core";
import { pluginBabel } from "@rsbuild/plugin-babel";
import { pluginSolid } from "@rsbuild/plugin-solid";

export default defineConfig({
  plugins: [
    pluginBabel({
      include: /\.(?:jsx|tsx)$/,
    }),
    pluginSolid(),
  ],
  source: {
    alias: {
      "~": "./src",
    },
  },
  tools: {
    rspack: {
      optimization: {
        splitChunks: {
          chunks: "all",
          minSize: 30000,
          cacheGroups: {
            styles: {
              name: "styles",
              type: "css/mini-extract",
              chunks: "all",
              enforce: true,
            },
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: "vendors",
              chunks: "all",
              priority: 10,
            },
            common: {
              name: "common",
              minChunks: 2,
              chunks: "async",
              priority: 5,
              reuseExistingChunk: true,
              enforce: true,
            },
          },
        },
      },
    },
  },
  output: {
    inlineStyles: true,
  },
});
