import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("out");
const port = Number(process.env.PORT ?? 3000);
const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
};
const server = http.createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(
      new URL(req.url ?? "/", "http://localhost").pathname,
    );
    let target = path.resolve(root, `.${pathname}`);
    if (target !== root && !target.startsWith(`${root}${path.sep}`)) {
      res.writeHead(403).end();
      return;
    }
    if ((await stat(target)).isDirectory())
      target = path.join(target, "index.html");
    const data = await readFile(target);
    res.writeHead(200, {
      "Content-Type": mime[path.extname(target)] ?? "application/octet-stream",
      "X-Content-Type-Options": "nosniff",
    });
    res.end(req.method === "HEAD" ? undefined : data);
  } catch {
    const fallback = await readFile(path.join(root, "404.html")).catch(() =>
      Buffer.from("Wykonaj npm run build przed uruchomieniem podglądu."),
    );
    res
      .writeHead(404, { "Content-Type": "text/html; charset=utf-8" })
      .end(fallback);
  }
});
server.listen(port, "127.0.0.1", () =>
  console.log(`Podgląd statycznego buildu: http://127.0.0.1:${port}`),
);
