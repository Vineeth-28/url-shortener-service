import typescript from "@rollup/plugin-typescript";
import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { builtinModules } from "module";

export default {
  input: "src/server.ts",
  output: [
    {
      file: "dist/index.cjs",
      format: "cjs",
      sourcemap: true,
    },
    {
      file: "dist/index.mjs",
      format: "esm",
      sourcemap: true,
    },
  ],
  external: [...builtinModules],
  plugins: [
    resolve(),
    commonjs(),
    json(),
    typescript({ tsconfig: "./tsconfig.json" }),
    babel({
      babelHelpers: "bundled",
      extensions: [".ts", ".js"],
      exclude: "node_modules/**",
    }),
  ],
};
