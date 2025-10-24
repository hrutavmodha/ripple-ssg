import Markdown from "ripple-markdown";
import { mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";

export async function renderStaticSite(routes, outDir) {
  for (const [url, mdPath] of Object.entries(routes)) {
    const markdownContent = readFileSync(mdPath as any, "utf8");

    // Create DOM anchor manually
    const anchor = document.createTextNode("");
    const container = document.createElement("div");
    container.appendChild(anchor);

    Markdown(anchor, { markdown: markdownContent }, null);

    mkdirSync(path.join(outDir, url), { recursive: true });
    writeFileSync(path.join(outDir, url, "index.html"), container.innerHTML);
  }
}
