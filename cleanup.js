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

const cssPath = "dist/static/css/app.css";
const scssPath = "dist/static/css/app.scss";

if (existsSync(cssPath)) {
  renameSync(cssPath, scssPath);
}

const htmlPath = "dist/index.html";
let html = readFileSync(htmlPath, "utf8");
html = html.replace("/static/css/app.css", "/static/css/app.scss");
writeFileSync(htmlPath, html);

console.log("Cleanup completed");
