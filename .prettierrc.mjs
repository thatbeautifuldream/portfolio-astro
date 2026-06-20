/** @type {import("prettier").Config} */
export default {
  plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
  printWidth: 80,
  semi: true,
  singleQuote: false,
  trailingComma: "all",
  useTabs: false,
  tabWidth: 2,
  overrides: [
    {
      files: "*.astro",
      options: { parser: "astro" },
    },
  ],
};
