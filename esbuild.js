const esbuild = require("esbuild");
const path = require("node:path");
const fs = require("node:fs");

const definePath = path.resolve(__dirname, "src/types.d.ts");
const distPath = path.resolve(__dirname, "dist/types.d.ts");

const is_release = process.env.NODE_ENV === "production";

const writeDefine = {
  name: "writeDefine",
  setup({ onEnd }) {
    onEnd(({ errors }) => {
      fs.copyFileSync(definePath, distPath);
    });
  },
};

esbuild.build({
  entryPoints: [path.resolve(__dirname, "src/index.ts")],
  outdir: is_release ? "dist" : "test",
  bundle: true,
  minify: is_release ? true : false,
  //   splitting: true,
  format: "esm",
  loader: {
    ".css": "text",
  },
  plugins: [writeDefine],
});
