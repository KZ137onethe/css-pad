import antfu from "@antfu/eslint-config";

export default antfu(
  {
    type: "lib",
    ignores: ["**/node_modules/**"],
    gitignore: true,
    stylistic: {
      indent: 2,
      quotes: "double",
      semi: true,
      experimental: true,
    },
    typescript: {
      overrides: {},
      tsconfigPath: "./tsconfig.json",
    },
  },
  {
    rules: {
      "style/quote-props": ["error", "as-needed"],
      "style/max-len": [
        "error",
        {
          code: 100,
          tabWidth: 2,
        },
      ],
      "prefer-const": "warn",
      // 对没有使用的变量，会报 warn 警告
      "no-unused-vars": "off",
      "unused-imports/no-unused-vars": "warn",
      // 不允许使用 console，会报 warn 警告，但console.warn和console.error可以使用
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
);
