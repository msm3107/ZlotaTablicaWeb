import nextEnv from "@next/env";
import { createProductConfig } from "../src/config/product.ts";

nextEnv.loadEnvConfig(process.cwd(), false);
const config = createProductConfig({
  SITE_URL: process.env.SITE_URL,
  BOT_URL: process.env.BOT_URL,
  CONTACT: process.env.CONTACT,
});
const missing = [
  !config.siteUrl && "SITE_URL — docelowa domena HTTPS",
  !config.contact && "CONTACT — publiczny e-mail lub @nick operatora",
  !config.botUrl && "BOT_URL — działający link do bota",
].filter(Boolean);
if (missing.length) {
  console.error(
    `Przed publikacją uzupełnij:\n${missing.map((item) => `- ${item}`).join("\n")}`,
  );
  process.exitCode = 1;
} else {
  console.log(
    `Konfiguracja publikacji kompletna: ${config.siteUrl}. Przed wdrożeniem wykonaj nowy build i sprawdź ręcznie start testu w Telegramie.`,
  );
}
