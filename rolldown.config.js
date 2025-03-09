import { defineConfig } from "rolldown";
import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript";

export default defineConfig([
    // Web browser compatible (UMD) - plain
    {
        input: "src/index.ts",
        output: {
            format: "umd",
            file: "dist/index.js",
            name: "luscent",
        },
        plugins: [
            typescript(),
        ],
    },
    // Web browser compatible (UMD) - plain - increment example
    {
        input: "src/index.ts",
        output: {
            format: "umd",
            file: "examples/increment/index.js",
            name: "luscent",
        },
        plugins: [
            typescript(),
        ],
    },
    // Web browser compatible (UMD) - minified
    {
        input: "src/index.ts",
        output: {
            format: "umd",
            file: "dist/index.min.js",
            name: "luscent"
        },
        plugins: [
            typescript(),
            terser(),
        ],
    },
    // CommonJS compatible (Node.js)
    {
        input: "src/index.ts",
        output: {
            format: "cjs",
            file: "lib/index.js"
        },
        plugins: [
            typescript(),
        ],
    },
    // ES6 Import compatible
    {
        input: "src/index.ts",
        output: {
            format: "esm",
            file: "lib/index.esm.js"
        },
        plugins: [
            typescript(),
        ],
    },
]);
