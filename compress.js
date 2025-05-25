import { readFileSync, writeFileSync } from "fs";
import { glob } from "glob";
import { brotliCompressSync } from "zlib";

const files = glob.sync("dist/static/**/*.{mjs,scss}");

files.forEach((file) => {
  const content = readFileSync(file);
  const compressed = brotliCompressSync(content, {
    params: {
      [require("zlib").constants.BROTLI_PARAM_QUALITY]: 11,
    },
  });
  writeFileSync(file, compressed);
  console.log(
    `${file}: ${content.length} -> ${compressed.length} bytes (${Math.round(
      (compressed.length / content.length) * 100
    )}%)`
  );
});
