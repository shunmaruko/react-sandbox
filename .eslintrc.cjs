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
    "no-console": [
      "error",
      {
        allow: ["warn", "error"],
      },
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
            format: ["strictCamelCase"],
            types: ["boolean"],
            prefix: ["is", "should"],
          },
          {
            selector: "variable",
            modifiers: ["const", "exported"],
            types: ["function"],
            format: ["StrictPascalCase"],
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
      },
    },
    {
      // except index.tsx
      files: ["**/*.tsx", "**/*.ts", "!**/index.tsx"],
      rules: {
        "check-file/filename-naming-convention": [
          "error",
          {
            "**/*.tsx": "PASCAL_CASE",
            "**/*.ts": "KEBAB_CASE",
          },
          {
            ignoreMiddleExtensions: true,
          },
        ],
      },
    },
    {
      // for index.tsx
      files: ["**/index.tsx"],
      rules: {
        "check-file/filename-naming-convention": [
          "error",
          {
            "**/*": "CAMEL_CASE",
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
      },
    },
  ],
};
