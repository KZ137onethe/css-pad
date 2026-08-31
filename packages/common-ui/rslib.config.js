import { pluginSass } from "@rsbuild/plugin-sass";
import { defineConfig } from "@rslib/core";

export default defineConfig(() => {
  return {
    source: {
      entry: {
        register: "./src/index.ts",
        "e-switch": "./src/switch/index.ts",
      },
    },
    lib: [
      {
        format: "esm",
        bundle: true,
        dts: true,
        output: {
          distPath: "./dist/scripts",
        },
      },
    ],
    output: {
      target: "web",
    },
    plugins: [pluginSass()],
  };
});
