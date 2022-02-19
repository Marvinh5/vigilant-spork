import { defineConfig } from "rollup";
import typescriptPlugin from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

export default defineConfig([
  {
    input: "src/main.ts",
    plugins: [typescriptPlugin()],
    output: [
      {
        file: "dist/bundle.js",
        format: "cjs",
      },
    ],
  },
  {
    input: "src/main.ts",
    plugins: [typescriptPlugin(), dts()],
    output: [
      {
        file: "dist/bundle.d.ts",
        format: "es",
      },
    ],
  },
]);
