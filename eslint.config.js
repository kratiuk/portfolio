import js from "@eslint/js";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import vue from "eslint-plugin-vue";

export default [
  {
    ignores: ["dist/**", "node_modules/**"],
  },
  js.configs.recommended,
  ...vue.configs["flat/recommended"],
  {
    files: ["src/**/*.{js,vue}"],
    languageOptions: {
      globals: {
        URL: "readonly",
        IntersectionObserver: "readonly",
        MutationObserver: "readonly",
        cancelAnimationFrame: "readonly",
        console: "readonly",
        document: "readonly",
        fetch: "readonly",
        history: "readonly",
        performance: "readonly",
        requestAnimationFrame: "readonly",
        setTimeout: "readonly",
        window: "readonly",
      },
    },
  },
  {
    files: ["vite.config.js"],
    languageOptions: {
      globals: {
        __dirname: "readonly",
      },
    },
  },
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^\\u0000"],
            ["^vue$", "^@?\\w"],
            ["^@assets/"],
            ["^@app$", "^@components/"],
            ["^@data/"],
            ["^@root/"],
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
            ["^.+\\.s?css$"],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
      "vue/attribute-hyphenation": "off",
      "vue/attributes-order": "off",
      "vue/first-attribute-linebreak": "off",
      "vue/html-closing-bracket-newline": "off",
      "vue/html-indent": "off",
      "vue/html-self-closing": "off",
      "vue/max-attributes-per-line": "off",
      "vue/multi-word-component-names": "off",
      "vue/singleline-html-element-content-newline": "off",
    },
  },
];
