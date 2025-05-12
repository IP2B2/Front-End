import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

const valconfig = pluginReact.configs.flat.recommended;
valconfig.rules["react/react-in-jsx-scope"] = "off";
valconfig.rules["react/prop-types"] = "off";
valconfig.rules["no-unused-vars"] = "warn";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,jsx}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["**/*.{js,mjs,cjs,jsx}"], languageOptions: { globals: globals.browser } },
  { files: ["**/*.{js,mjs,cjs,jsx}"], languageOptions: { globals: globals.node } },
  valconfig,
]);