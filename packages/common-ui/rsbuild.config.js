import { defineConfig } from "@rsbuild/core";
import { pluginSass } from "@rsbuild/plugin-sass";

export default defineConfig(({ envMode, env }) => {
  return {
    source: {
      entry: {
        play: {
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
      open: true,
    },
    html: {
      template({ entryName }) {
        return `./${entryName}/index.html`;
      },
    },
    resolve: {
      alias: {
        "@": "./src",
      },
    },
    output: {
      distPath: {
        root: "dist/preview",
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
      sourceMap: "cheap-module-source-map",
      cleanDistPath: {
        enable: true,
      },
    },
    plugins: [pluginSass()],
  };
});
