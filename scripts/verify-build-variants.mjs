import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import path from "node:path";

function build(env) {
  const result = spawnSync(
    process.execPath,
    [path.resolve("node_modules/next/dist/bin/next"), "build"],
    { env, encoding: "utf8" },
  );
  if (result.status !== 0) throw new Error(result.stdout + result.stderr);
}

try {
  // Wyłącznie testowe dane, nigdy konfiguracja docelowego wdrożenia.
  build({
    ...process.env,
    SITE_URL: "https://firma.pl",
    CONTACT: "kontakt@firma.pl",
    BOT_URL: "",
  });
  const [html, robots, sitemap] = await Promise.all([
    readFile("out/index.html", "utf8"),
    readFile("out/robots.txt", "utf8"),
    readFile("out/sitemap.xml", "utf8"),
  ]);
  assert.match(html, /rel="canonical" href="https:\/\/firma.pl\/"/);
  assert.match(
    html,
    /property="og:image" content="https:\/\/firma.pl\/og-image.png"/,
  );
  assert.match(html, /name="robots" content="index, follow"/);
  assert.match(html, /mailto:kontakt@firma.pl/);
  assert.match(html, /Test chwilowo niedostępny/);
  assert.doesNotMatch(html, /<a[^>]*href="https:\/\/t\.me\//);
  assert.match(robots, /Allow: \//);
  assert.match(robots, /Sitemap: https:\/\/firma.pl\/sitemap.xml/);
  assert.match(sitemap, /<loc>https:\/\/firma.pl\/<\/loc>/);
  console.log(
    "OK: domena steruje canonical, OG, robots i sitemap; kontakt działa; pusty BOT_URL nie renderuje linków do bota.",
  );
} finally {
  build(process.env);
  console.log(
    "Przywrócono build z właściwą lokalną konfiguracją. Dane testowe nie pozostają w out/.",
  );
}
