const postcssPresetEnv = require("postcss-preset-env");

module.exports = {
  map: false,
  plugins: [
    postcssPresetEnv({
      stage: 2,
      features: {
        "custom-selectors": ["auto", { preserve: true }],
        "all-property": true,
      },
      preserve: false,
    }),
  ],
};
