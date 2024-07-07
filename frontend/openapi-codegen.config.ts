import {
  generateSchemaTypes,
  generateReactQueryComponents,
} from "@openapi-codegen/typescript";
import { defineConfig } from "@openapi-codegen/cli";
export default defineConfig({
  sandbox: {
    from: {
      relativePath: "./openapi.yaml",
      source: "file",
    },
    outputDir: "./src/auto-generated",
    to: async (context) => {
      const filenamePrefix = "sandbox";
      // Generate all the schemas types (components & responses)
      const { schemasFiles } = await generateSchemaTypes(context, {
        filenamePrefix,
      });
      // Generate all react-query components
      await generateReactQueryComponents(context, {
        filenamePrefix,
        schemasFiles,
      });
    },
  },
});
