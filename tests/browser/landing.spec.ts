import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("page, preview, CTA and all local links are usable", async ({
  page,
  request,
}, testInfo) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Żółta Tablica/);
  await expect(page.locator("html")).toHaveAttribute("lang", "pl");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Nowe inwestycje.",
  );
  await expect(page.getByText("Przykładowy raport z bota")).toBeVisible();
  await expect(page.getByText("Przykładowo, ul. Lipowa")).toHaveCount(0);
  const logos = page.locator('img[src="/company-logo.png"]');
  await expect(logos).toHaveCount(2);
  for (const logo of await logos.all()) {
    const size = await logo.boundingBox();
    expect(size).not.toBeNull();
    expect(size!.width).toBeLessThanOrEqual(83);
    expect(size!.width).toBe(size!.height);
  }
  await expect(
    page.getByRole("img", { name: /Raport bota: inwestycje z Olsztyna/ }),
  ).toBeVisible();
  const ctas = page.getByRole("link", { name: "Wypróbuj przez 7 dni" });
  await expect(ctas).toHaveCount(2);
  for (const cta of await ctas.all())
    await expect(cta).toHaveAttribute(
      "href",
      "https://t.me/ZoltaTablicaBot?start=strona",
    );

  const links = await page
    .locator("a")
    .evaluateAll((anchors) => anchors.map((a) => a.getAttribute("href")));
  for (const href of links) {
    expect(href).toBeTruthy();
    if (href?.startsWith("#"))
      expect(await page.locator(href).count(), href).toBe(1);
    else if (href?.startsWith("/"))
      expect((await request.get(href)).status(), href).toBe(200);
    else expect(href).toMatch(/^(https:\/\/|mailto:)/);
  }

  for (const image of await page.locator("img").all()) {
    await image.scrollIntoViewIfNeeded();
    await expect(image).toHaveJSProperty("complete", true);
    expect(
      await image.evaluate((img: HTMLImageElement) => img.naturalWidth),
    ).toBeGreaterThan(0);
  }

  for (const url of [
    "/icon.svg",
    "/favicon.ico",
    "/apple-touch-icon.png",
    "/og-image.png",
    "/robots.txt",
    "/sitemap.xml",
  ]) {
    expect((await request.get(url)).status(), url).toBe(200);
  }
  await page
    .getByRole("navigation", { name: "Nawigacja główna" })
    .getByRole("link", { name: "Jak to działa" })
    .click();
  await expect(page).toHaveURL(/#jak-to-dziala$/);
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: `test-results/${testInfo.project.name}-full.png`,
    fullPage: true,
  });
});

test("FAQ and skip link work from the keyboard", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Przejdź do treści" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#tresc$/);
  await expect(page.getByRole("main")).toBeFocused();
  const summary = page
    .locator("summary")
    .filter({ hasText: "Jak działa 7-dniowy test?" });
  await summary.focus();
  await page.keyboard.press("Enter");
  await expect(summary.locator("..")).toHaveAttribute("open", "");
  await expect(summary.locator("..")).toContainText(
    "administrator udostępnia go ręcznie",
  );
  await page.keyboard.press("Enter");
  await expect(summary.locator("..")).not.toHaveAttribute("open", "");
  await page.goto("/nieistniejaca-strona/");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Enter");
  await expect(page.getByRole("main")).toBeFocused();
});

test("product previews open as images from the keyboard", async ({
  page,
  request,
}) => {
  for (const [url, contentType] of [
    ["/bot-report.webp", "image/webp"],
    ["/bot-saved.webp", "image/webp"],
    ["/bot-overview.jpg", "image/jpeg"],
  ]) {
    const response = await request.get(url);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toBe(contentType);
  }
  await page.goto("/");
  await page
    .getByRole("link", { name: "Powiększ raport bota — obraz w nowej karcie" })
    .focus();
  const popupPromise = page.waitForEvent("popup");
  await page.keyboard.press("Enter");
  const popup = await popupPromise;
  await expect(popup).toHaveURL(/\/bot-report\.webp$/);
  await expect(popup.locator("img")).toHaveJSProperty("complete", true);
  await expect(popup.locator("img")).toHaveJSProperty("naturalWidth", 729);
  await popup.close();
});

test("no horizontal overflow at small and large widths or enlarged text", async ({
  page,
}) => {
  for (const width of [320, 360, 390, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const dimensions = await page.evaluate(() => ({
      content: document.documentElement.scrollWidth,
      viewport: window.innerWidth,
    }));
    expect(dimensions.content, `${width}px`).toBeLessThanOrEqual(
      dimensions.viewport,
    );
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.addStyleTag({ content: "body { zoom: 2 }" });
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(390);
});

test("WCAG AA checks, no JS errors or external page requests", async ({
  page,
}) => {
  const errors: string[] = [];
  const external: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("request", (request) => {
    if (!request.url().startsWith("http://127.0.0.1:3000"))
      external.push(request.url());
  });
  await page.goto("/");
  for (const details of await page.locator("details").all())
    await details.locator("summary").click();
  await page.evaluate(() => document.fonts.ready);
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  expect(results.violations).toEqual([]);
  expect(errors).toEqual([]);
  expect(external).toEqual([]);
});

test("preview without a domain is not indexed and has no fabricated canonical", async ({
  page,
  request,
}) => {
  await page.goto("/");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    "noindex, nofollow",
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  expect(await (await request.get("/robots.txt")).text()).toContain(
    "Disallow: /",
  );
  expect(await (await request.get("/sitemap.xml")).text()).not.toContain(
    "<loc>",
  );
});

test("core flow works without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3000/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  const summary = page.locator("summary").first();
  await summary.click();
  await expect(summary.locator("..")).toHaveAttribute("open", "");
  await expect(
    page.getByRole("link", { name: "Wypróbuj przez 7 dni" }).first(),
  ).toHaveAttribute("href", "https://t.me/ZoltaTablicaBot?start=strona");
  await context.close();
});
