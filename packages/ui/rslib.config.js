import { pluginSass } from "@rsbuild/plugin-sass";
import { defineConfig } from "@rslib/core";

export default defineConfig(() => {
  return {
    source: {
      entry: {
        register: "./src/index.ts",
        "e-switch": "./src/switch/index.ts",
        "e-progress": "./src/progress/index.ts",
        "e-button": "./src/button/index.ts",
      },
    },
    lib: [
      {
        format: "esm",
        bundle: true,
        dts: true,
        syntax: "es6",
      },
    ],
    resolve: {
      alias: {
        "@": "./src",
        "~": "./utils",
      },
    },
    output: {
      injectStyles: false,
      target: "web",
      distPath: "./dist/scripts",
      cleanDistPath: "./dist/scripts",
      sourceMap: true,
    },

    plugins: [pluginSass()],
  };
});
