const esbuild = require("esbuild");
const path = require("node:path");

const sassPlugin = require("esbuild-plugin-sass");

console.log(process.env.Product);

const is_release = process.env.NODE_ENV === "production";

esbuild.build({
  entryPoints: [path.resolve(__dirname, "src/index.ts")],
  outdir: is_release ? "dist" : "test",
  bundle: true,
  minify: false,
  // minify: is_release ? true : false,
  //   splitting: true,
  format: "esm",
  // plugins: [sassPlugin()],
  loader: {
    ".css": "text",
  },
});
