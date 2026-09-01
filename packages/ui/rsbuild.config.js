import { defineConfig } from "@rsbuild/core";
import { pluginSass } from "@rsbuild/plugin-sass";

export default defineConfig(({ envMode, env }) => {
  const isProd = envMode === "production";

  return {
    source: {
      entry: {
        index: {
          import: ["./play/index.ts"],
        },
      },
    },
    dev: {
      watchFiles: {
        paths: ["play/**/*.ts", "play/**/*.html"],
      },
    },
    server: {
      open: !isProd,
    },
    html: {
      template({ entryName }) {
        const store = {
          index: "./play/index.html",
        };
        return store[entryName];
      },
    },
    resolve: {
      alias: {
        "@": "./src",
      },
    },
    output: {
      distPath: {
        root: !isProd ? "dist/preview" : "dist/build",
        js: ".",
      },
      filenameHash: {
        format: "contenthash:8",
      },
      filename: {
        js: "[name].js",
        html: "[name].html",
        css: "[name].js",
      },
      sourceMap: !isProd ? "cheap-module-source-map" : false,
      cleanDistPath: {
        enable: true,
      },
      assetPrefix: "/css-pad",
    },
    plugins: [pluginSass()],
  };
});
