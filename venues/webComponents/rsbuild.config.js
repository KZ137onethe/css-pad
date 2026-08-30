import { pluginSass } from "@rsbuild/plugin-sass";

export default function () {
  return {
    root: "./example",
    source: {
      entry: {
        "word-count": "./word-count/app.js",
        "popup-info": "./popup-info/app.js",
        "emoji-switch": "./emoji-switch/app.js",
        "expanding-list": "./expanding-list/app.js",
        "custom-square": "./custom-square/app.js",
        "filled-circle": "./filled-circle/app.js",
      },
    },
    html: {
      template({ entryName }) {
        return `./${entryName}/index.html`;
      },
    },
    output: {
      copy: [
        { from: "popup-info/assets", to: "assets" },
        { from: "expanding-list/assets", to: "assets" },
      ],
    },
    server: {
      open: true,
    },
    plugins: [pluginSass()],
  };
}
