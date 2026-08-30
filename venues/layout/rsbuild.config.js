import { pluginSass } from "@rsbuild/plugin-sass";

export default function () {
  return {
    root: "./src",
    source: {
      entry: {
        grid: "./grid/app.js",
      },
    },
    html: {
      template({ entryName }) {
        return `./${entryName}/index.html`;
      },
    },
    output: {
    },
    server: {
      open: true,
    },
    plugins: [pluginSass()],
  };
}
