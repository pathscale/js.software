import { defineConfig } from "@rsbuild/core";
import { pluginBabel } from "@rsbuild/plugin-babel";
import { BannerPlugin } from "@rspack/core";
import CompressionPlugin from "compression-webpack-plugin";
import { pluginSolid2LayoutsApplication } from "rsbuild-plugin-solid-layouts";

export default defineConfig({
  plugins: [
    pluginSolid2LayoutsApplication({ layouts: ["@pathscale/ui"] }),
    /*
     * `@rsbuild/plugin-solid` is deliberately not used: it injects
     * `solid-refresh` whenever `dev.hmr` is on, and solid-refresh 0.6.3 halts
     * Solid 2's reactive system at module-eval time. The Solid 2 preset is
     * driven through Babel directly instead, which is also what compiles JSX at
     * all -- without it SWC falls through to React's automatic runtime and asks
     * @solidjs/web/jsx-runtime for a `jsx` export Solid does not have.
     */
    pluginBabel({
      include: /\.(?:jsx|tsx|ts)$/,
      babelLoaderOptions: (config) => {
        config.presets ??= [];
        config.presets.push(["babel-preset-solid", { moduleName: "@solidjs/web" }]);
      },
    }),
  ],
  source: {
    alias: { "~": "./src" },
    define: {
      "import.meta.env.VERSION": JSON.stringify(
        process.env.GITHUB_RUN_NUMBER || "0.0.1"
      ),
    },
  },
  dev: {
    hmr: true,
    liveReload: true,
  },
  server: {
    port: 3000,
  },
  tools: {
    // rsbuild's own SWC pass also transforms JSX and defaults to Solid 1's
    // `solid-js/web`. Babel has already produced the Solid 2 output by then,
    // so point SWC at the same runtime rather than letting it re-emit the old.
    swc: {
      jsc: {
        transform: {
          react: { runtime: "automatic", importSource: "@solidjs/web" },
        },
      },
    },
    rspack: {
      // solid-layouts feature-detects on a namespace import to support both
      // Solid majors from one file. The dead branch is never evaluated, but the
      // bundler still checks it and hard-errors on the missing export.
      ignoreWarnings: [/export '(splitProps|omit)' .* was not found in 'solid-js'/],
      output: { chunkFilename: "static/js/async/[name].[contenthash:8].mjs" },
      optimization: {
        splitChunks: false,
        runtimeChunk: false,
      },
      plugins:
        process.env.NODE_ENV === "production"
          ? [
              new BannerPlugin({
                banner: () => "",
                test: /\.js$/,
              }),
              new CompressionPlugin({
                algorithm: "brotliCompress",
                filename: "[path][base].br",
                test: /\.(mjs|css)$/,
                compressionOptions: {
                  level: 11,
                },
                threshold: 0,
                minRatio: 1,
              }),
            ]
          : [],
    },
  },
  output: {
    inlineStyles: false,
    filename: {
      js: "app.mjs",
      css: "app.css",
    },
    legalComments: "none",
  },
});
