import {
  existsSync,
  readFileSync,
  renameSync,
  unlinkSync,
  writeFileSync,
} from "fs";
import { glob } from "glob";

const brFiles = glob.sync("dist/static/**/*.br");

brFiles.forEach((brFile) => {
  const originalFile = brFile.replace(".br", "");
  if (existsSync(originalFile)) unlinkSync(originalFile);
  renameSync(brFile, originalFile);
});

const htmlPath = "dist/index.html";
let html = readFileSync(htmlPath, "utf8");
if (!html.includes("app.scss")) {
  html = html.replace(
    "</head>",
    '<link href="/static/css/app.scss" rel="stylesheet"></head>'
  );
  writeFileSync(htmlPath, html);
  console.log("Injected CSS link into index.html");
}

console.log("Cleanup completed");
