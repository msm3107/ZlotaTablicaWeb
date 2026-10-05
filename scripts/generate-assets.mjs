import sharp from "sharp";
import { readFile, writeFile } from "node:fs/promises";

// Kadry zachowują oryginalne piksele i całe widoczne wiadomości.
// Materiały źródłowe pozostają bez zmian w public/.
const source = "public/Zolta_Tablica_jak_dziala.png";
// Dostarczony plik ma rozszerzenie .png, lecz zawiera JPEG.
// Kopia z właściwym rozszerzeniem zachowuje dokładnie te same bajty.
await writeFile("public/bot-overview.jpg", await readFile(source));
const report = { left: 242, top: 775, width: 729, height: 244 };
const saved = { left: 252, top: 1182, width: 674, height: 222 };
await sharp(source)
  .extract(report)
  .webp({ lossless: true })
  .toFile("public/bot-report.webp");
await sharp(source)
  .extract(saved)
  .webp({ lossless: true })
  .toFile("public/bot-saved.webp");

for (const [input, output, width] of [
  ["background-cranes.png", "hero-construction.webp", 1400],
  ["building-background.png", "construction-detail.webp", 760],
]) {
  await sharp(`public/${input}`)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(`public/${output}`);
}

const logo = await readFile("public/company-logo.png");
const background = { r: 11, g: 34, b: 49, alpha: 1 };
// SVG jest tylko kontenerem oryginalnego logo, bez odrysowywania znaku.
await writeFile(
  "public/icon.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" width="83" height="83" viewBox="0 0 83 83"><image width="83" height="83" href="data:image/png;base64,${logo.toString("base64")}"/></svg>`,
);
// Ikona Apple ma wymagany format, ale logo pozostaje w swoim rozmiarze 83 px.
await sharp({ create: { width: 180, height: 180, channels: 4, background } })
  .composite([{ input: logo, left: 48, top: 48 }])
  .png()
  .toFile("public/apple-touch-icon.png");
const png = await sharp(logo).resize(32, 32).png().toBuffer();
const header = Buffer.alloc(22);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
header[6] = 32;
header[7] = 32;
header.writeUInt16LE(1, 10);
header.writeUInt16LE(32, 12);
header.writeUInt32LE(png.length, 14);
header.writeUInt32LE(22, 18);
await writeFile("public/favicon.ico", Buffer.concat([header, png]));

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#faf8f1"/>
  <rect y="614" width="1200" height="16" fill="#ffd02b"/>
  <text x="164" y="112" font-family="Segoe UI,Arial,sans-serif" font-size="33" font-weight="700" fill="#0b2231">Żółta Tablica</text>
  <text x="66" y="205" font-family="Segoe UI,Arial,sans-serif" font-size="17" letter-spacing="2" fill="#526171">PILOTAŻ · WARMIA I MAZURY</text>
  <g fill="#0b2231" font-family="Georgia,serif" font-weight="700" font-size="58">
    <text x="62" y="294">Nowe inwestycje.</text>
    <text x="62" y="373">W Twojej okolicy.</text>
  </g>
  <text x="66" y="435" font-family="Segoe UI,Arial,sans-serif" font-size="23" fill="#526171">Publiczne dane GUNB na Telegramie.</text>
  <rect x="64" y="482" width="337" height="58" rx="6" fill="#ffd02b"/>
  <text x="85" y="519" font-family="Segoe UI,Arial,sans-serif" font-size="22" font-weight="700" fill="#0b2231">7 dni bezpłatnego testu</text>
  <text x="650" y="228" font-family="Segoe UI,Arial,sans-serif" font-size="19" fill="#526171">Przykładowy raport z bota</text>
  <text x="650" y="505" font-family="Segoe UI,Arial,sans-serif" font-size="17" fill="#526171">Wybierz obszar. Przeglądaj w Telegramie.</text>
</svg>`;
const reportImage = await sharp(source)
  .extract(report)
  .resize(490)
  .png()
  .toBuffer();
await sharp(Buffer.from(og))
  .composite([
    { input: logo, left: 64, top: 58 },
    { input: reportImage, left: 648, top: 252 },
  ])
  .png()
  .toFile("public/og-image.png");
console.log(
  "Utworzono kadry bota, lekkie WebP oraz favicon/OG z prawdziwym logo. Oryginały zachowane.",
);
