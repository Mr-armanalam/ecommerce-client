import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended
});

const eslintConfig = [
  ...compat.config({
    extends: [
      "next",
      "next/core-web-vitals",
      "standard",
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:@typescript-eslint/recommended"
    ],
    plugins: ["react", "@typescript-eslint", "tailwindcss"],
    rules: {
      "tailwindcss/classnames-order": "warn",
      "tailwindcss/enforces-negative-arbitrary-values": "warn",
      "comma-dangle": "off", // Disable the trailing comma rule
      quotes: "off",
      semi: 'off',
    }
  })
];
export default eslintConfig;
