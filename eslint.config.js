import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node, // Añade las variables globales de Node.js
      },
    },
    plugins: {
      react: pluginReact,
    },
    extends: [
      pluginJs.configs.recommended,
      pluginReact.configs.flat.recommended,
    ],
    rules: {
      // Agrega aquí cualquier regla personalizada
    },
  },
];
