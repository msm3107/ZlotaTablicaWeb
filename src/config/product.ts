type PublicEnvironment = {
  SITE_URL?: string;
  BOT_URL?: string;
  CONTACT?: string;
};

const verifiedBotUrl = "https://t.me/ZoltaTablicaBot?start=strona";
const supportedSources = new Set(["strona", "strona_oferta", "strona_dol"]);

function parseSiteUrl(value: string | undefined): string | null {
  if (!value?.trim()) return null;
  try {
    const url = new URL(value.trim());
    const host = url.hostname.toLowerCase();
    const reserved =
      /(^|\.)(localhost|local|invalid|test|example|internal)$/.test(host) ||
      /(^|\.)(example\.(com|org|net))$/.test(host);
    if (
      url.protocol !== "https:" ||
      url.username ||
      url.password ||
      url.port ||
      url.pathname !== "/" ||
      url.search ||
      url.hash ||
      !host.includes(".") ||
      reserved ||
      /^[\d.]+$/.test(host) ||
      host.includes(":")
    )
      throw new Error();
    return url.origin;
  } catch {
    throw new Error(
      "SITE_URL: podaj publiczną domenę HTTPS bez ścieżki, parametrów i danych logowania albo pozostaw puste.",
    );
  }
}

function parseBotUrl(value: string): string | null {
  if (!value.trim()) return null;
  try {
    const url = new URL(value.trim());
    const source = url.searchParams.get("start");
    if (
      url.protocol !== "https:" ||
      url.hostname !== "t.me" ||
      url.port ||
      url.username ||
      url.password ||
      url.hash ||
      !/^\/[a-z][a-z\d_]{1,28}bot$/i.test(url.pathname) ||
      [...url.searchParams.keys()].some((key) => key !== "start") ||
      url.searchParams.getAll("start").length > 1 ||
      (source !== null && !supportedSources.has(source))
    )
      throw new Error();
    return url.href;
  } catch {
    throw new Error(
      "BOT_URL: wymagany publiczny link https://t.me/NazwaBot z opcjonalnym, obsługiwanym start=strona (lub strona_oferta, strona_dol).",
    );
  }
}

function parseContact(
  value: string | undefined,
): { label: string; href: string } | null {
  const contact = value?.trim();
  if (!contact) return null;
  if (/^@[a-z][a-z\d_]{4,31}$/i.test(contact)) {
    return { label: contact, href: `https://t.me/${contact.slice(1)}` };
  }
  if (
    /^[a-z\d.!#$%&'*+/=?^_`{|}~-]+@[a-z\d](?:[a-z\d.-]*[a-z\d])?\.[a-z]{2,}$/i.test(
      contact,
    )
  ) {
    const [mailbox, domain] = contact.split("@");
    return {
      label: contact,
      href: `mailto:${encodeURIComponent(mailbox)}@${domain}`,
    };
  }
  throw new Error(
    "CONTACT: podaj publiczny adres e-mail albo @nick w Telegramie lub pozostaw puste.",
  );
}

export function createProductConfig(env: PublicEnvironment) {
  return {
    name: "Żółta Tablica",
    description:
      "Pozwolenia i zgłoszenia budowlane z publicznego rejestru GUNB. Dopasowane informacje z Warmii i Mazur na Telegramie. 7 dni bezpłatnego testu.",
    region: "województwo warmińsko-mazurskie",
    siteUrl: parseSiteUrl(env.SITE_URL),
    botUrl: parseBotUrl(env.BOT_URL ?? verifiedBotUrl),
    contact: parseContact(env.CONTACT),
    sourceUrl: "https://wyszukiwarka.gunb.gov.pl/pobranie.html",
    trialDays: 7,
  } as const;
}

// Wyłącznie jawna lista publicznych ustawień; żadnych tokenów ani konfiguracji bota.
export const product = createProductConfig({
  SITE_URL: process.env.SITE_URL,
  BOT_URL: process.env.BOT_URL,
  CONTACT: process.env.CONTACT,
});
