import assert from "node:assert/strict";
import { test } from "node:test";
import { createProductConfig } from "../src/config/product.ts";

test("uses the verified bot with a supported campaign code", () => {
  const config = createProductConfig({});
  assert.equal(config.name, "Żółta Tablica");
  assert.equal(config.botUrl, "https://t.me/ZoltaTablicaBot?start=strona");
  assert.equal(config.siteUrl, null);
  assert.equal(config.contact, null);
});

test("an explicitly empty bot link stays unavailable", () => {
  assert.equal(createProductConfig({ BOT_URL: "" }).botUrl, null);
});

test("bot usernames must have 5 to 32 characters including the bot suffix", () => {
  for (const username of ["AbBot", "AbcBot", `A${"b".repeat(28)}Bot`]) {
    const url = `https://t.me/${username}`;
    assert.equal(createProductConfig({ BOT_URL: url }).botUrl, url);
  }
  for (const username of ["ABot", `A${"b".repeat(29)}Bot`]) {
    assert.throws(
      () => createProductConfig({ BOT_URL: `https://t.me/${username}` }),
      /BOT_URL/,
    );
  }
});

test("accepts only a public HTTPS origin for the domain", () => {
  assert.equal(
    createProductConfig({ SITE_URL: "https://firma.pl/" }).siteUrl,
    "https://firma.pl",
  );
  for (const site of [
    "http://firma.pl",
    "https://localhost",
    "https://127.0.0.1",
    "https://firma.pl/path",
    "https://firma.pl?x=1",
    "https://user:pass@firma.pl",
    "https://example.com",
    "niedomena",
  ]) {
    assert.throws(() => createProductConfig({ SITE_URL: site }), /SITE_URL/);
  }
});

test("does not accept invented start parameters, non-bot URLs or secrets in links", () => {
  for (const bot of [
    "javascript:alert(1)",
    "https://firma.pl/bot",
    "https://t.me/TestBot?start=phone123456789",
    "https://t.me/TestBot?start=unknown",
    "https://t.me/TestBot?token=secret",
  ]) {
    assert.throws(() => createProductConfig({ BOT_URL: bot }), /BOT_URL/);
  }
});

test("contact is an explicit email or Telegram handle", () => {
  assert.deepEqual(
    createProductConfig({ CONTACT: "kontakt@firma.pl" }).contact,
    { label: "kontakt@firma.pl", href: "mailto:kontakt@firma.pl" },
  );
  assert.deepEqual(createProductConfig({ CONTACT: "@operator_test" }).contact, {
    label: "@operator_test",
    href: "https://t.me/operator_test",
  });
  assert.throws(
    () => createProductConfig({ CONTACT: "do uzupełnienia" }),
    /CONTACT/,
  );
  assert.equal(createProductConfig({ CONTACT: "  " }).contact, null);
});

test("valid mailbox characters cannot become mailto query or fragment", () => {
  for (const localPart of [
    "help?desk",
    "help#desk",
    "help%desk",
    "help+desk",
  ]) {
    const contact = createProductConfig({
      CONTACT: `${localPart}@firma.pl`,
    }).contact;
    assert.ok(contact);
    assert.equal(
      contact.href,
      `mailto:${encodeURIComponent(localPart)}@firma.pl`,
    );
    const url = new URL(contact.href);
    assert.equal(url.search, "");
    assert.equal(url.hash, "");
    assert.equal(decodeURIComponent(url.pathname), `${localPart}@firma.pl`);
  }
});
