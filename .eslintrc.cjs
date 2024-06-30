module.exports = {
  root: true,
  env: { browser: true, es2023: true },
  extends: ["eslint:recommended", "plugin:react-hooks/recommended"],
  ignorePatterns: ["dist", ".eslintrc.cjs", "node_modules/*"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
  plugins: ["react", "react-refresh", "import", "check-file"],
  rules: {
    //TODO: enforce react component to PascallCase
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "no-else-return": "error",
    "linebreak-style": ["error", "unix"],
    // TODO: set import/no-restricted-paths
    "import/no-cycle": "error",
    "import/no-named-as-default-member": "off",
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "parent", "sibling", "index"],
        "newlines-between": "always",
        alphabetize: { order: "asc", caseInsensitive: true },
      },
    ],
    "react/function-component-definition": [
      "error",
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    "react/jsx-max-depth": ["error", { max: 5 }],
  },
  overrides: [
    {
      // ts/tsx specific rules
      files: ["**/*.ts", "**/*.tsx"],
      extends: ["plugin:@typescript-eslint/recommended"],
      parser: "@typescript-eslint/parser",
      settings: {
        react: { version: "detect" },
      },
      rules: {
        "@typescript-eslint/no-unused-vars": ["error"],
        "@typescript-eslint/naming-convention": [
          "error",
          {
            // function or component
            selector: "function",
            format: ["camelCase", "PascalCase"],
            leadingUnderscore: "forbid",
          },
          {
            selector: "variable",
            format: ["strictCamelCase", "UPPER_CASE"],
            types: ["array", "number", "string"],
          },
          {
            selector: "variable",
            format: ["StrictPascalCase"],
            types: ["boolean"],
            prefix: ["is", "should"],
          },
          {
            selector: "variable",
            modifiers: ["const", "exported"],
            types: ["function"],
            format: ["StrictPascalCase", "camelCase"],
          },
          {
            selector: "typeAlias",
            format: ["StrictPascalCase"],
          },
          {
            selector: "import",
            format: ["camelCase", "PascalCase"],
          },
        ],
        "@typescript-eslint/no-explicit-any": ["off"],
      },
    },
    {
      // except index.tsx
      files: ["**/*.tsx", "**/*.ts"],
      rules: {
        "check-file/filename-naming-convention": [
          "error",
          {
            "**/*.{ts,tsx}": "KEBAB_CASE",
          },
          {
            ignoreMiddleExtensions: true,
          },
        ],
      },
    },
    {
      files: ["src/**/!(__tests__)/*"], // exclude __tests__
      rules: {
        "check-file/folder-naming-convention": [
          "error",
          {
            "**/*": "KEBAB_CASE",
          },
        ],
        "no-console": [
          "error",
          {
            allow: ["warn", "error"],
          },
        ],
      },
    },
  ],
};
