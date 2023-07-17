import { defineConfig } from "rollup";
import babel from "@rollup/plugin-babel";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { existsSync, rmSync } from "node:fs";
import ts from "typescript";
import requireJSON5 from "require-json5";

const pkg = requireJSON5("./package.json");

rmSync("dist", {
    force: true,
    recursive: true
});

export default defineConfig({
    input: "src/index.ts",
    output: [
        {
            file: "dist/esm/index.js",
            format: "esm"
        }
    ],
    external: ["@autharmor/autharmor-js", "@autharmor/autharmor-js-ui", "react", "react-dom"],
    plugins: [
        babel({
            extensions: [".js", ".ts", ".jsx", ".tsx"],
            babelHelpers: "bundled",
            presets: [
                ["@babel/preset-react", { runtime: "automatic" }],
                "@babel/preset-typescript",
                ["@babel/preset-env", { bugfixes: true, targets: pkg.browserslist }]
            ]
        }),
        nodeResolve({
            extensions: [".js", ".ts", ".jsx", ".tsx"]
        }),
        commonjs(),
        {
            name: "ts",
            buildEnd() {
                if (existsSync("dist/types")) {
                    return;
                }

                ts.createProgram(["src/index.ts"], {
                    target: ts.ScriptTarget.ESNext,
                    module: ts.ModuleKind.ESNext,
                    moduleResolution: ts.ModuleResolutionKind.Bundler,
                    jsx: ts.JsxEmit.ReactJSX,
                    allowSyntheticDefaultImports: true,
                    esModuleInterop: true,
                    rootDir: "src",
                    declarationDir: "dist/types",
                    declaration: true,
                    emitDeclarationOnly: true
                }).emit();
            }
        }
    ]
});
