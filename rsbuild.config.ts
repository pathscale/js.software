import { defineConfig } from "@rsbuild/core";
import { pluginBabel } from "@rsbuild/plugin-babel";
import { pluginSolid } from "@rsbuild/plugin-solid";
import path from "path";

const runNumber = process.env.GITHUB_RUN_NUMBER || "dev";

export default defineConfig({
  plugins: [
    pluginBabel({
      include: /\.(?:jsx|tsx)$/,
    }),
    pluginSolid(),
  ],
  server: {
    port: 3000,
  },
  html: {
    template: "./index.html",
  },
  output: {
    inlineStyles: true,
    assetPrefix: "/",
    filename: {
      js: `assets/[name]-${runNumber}.[hash].js`,
      css: `assets/[name]-${runNumber}.[hash].css`,
    },
    distPath: {
      root: "dist",
      js: "assets",
      css: "assets",
      html: "",
      image: "assets",
    },
  },
  source: {
    alias: {
      "~": path.resolve(__dirname, "./src"),
    },
  },
  tools: {
    rspack: {
      target: "web",
      optimization: {
        minimize: true,
      },
    },
  },
});
