# Żółta Tablica — strona wizytówka

Jedna responsywna strona po polsku, prowadząca do 7-dniowego testu istniejącego bota Telegram. Next.js App Router, strict TypeScript, Tailwind CSS i Server Components. Lokalna Manrope do treści i interfejsu, systemowa Georgia do nagłówków; bez dodatkowego pobierania fontów. FAQ i nawigacja działają bez JavaScriptu. Bez bazy, API, webhooków, panelu, płatności, analityki i cookies.

## Dlaczego „Żółta”, a nie „Złota”?

W chwili rozpoznania (2026-10-05, commit bota `2f80e8b`) aktualny `Documents/GUNB` używał **Żółta Tablica** w README, `gunb_tool/bot_ui.py`, `config.yaml`, `docs/TELEGRAM_PROFIL.md` i `strona/index.html`. Repozytorium GitHub to `msm3107/GUNB-TOOL`. Link `https://t.me/ZoltaTablicaBot?start=strona` jest podany w dokumentacji i obsługiwany w `LeadBot._start()` oraz `campaign_source()`.

Obecny pilotaż obejmuje całe województwo warmińsko-mazurskie (`voivodeships: ["28"]`, `powiats: []`). Import działa o 06:30 i 13:30 czasu polskiego. Test jest udostępniany ręcznie przez administratora, a użytkownik uruchamia licznik po konfiguracji. Branża wpływa na kolejność; obszar i rodzaj budynku są osobnymi filtrami. Treści strony uwzględniają te ograniczenia.

Po pierwszej implementacji właściciel dostarczył do `public/` prawdziwe logo, materiał przedstawiający działanie bota oraz grafiki budowlane. Obecna strona wykorzystuje **oryginalne logo** i bezstratne kadry materiału bota, zamiast zastępczego znaku i fikcyjnej rozmowy HTML. Zapisane inwestycje, widoczne w materiale i opisane na stronie, potwierdzono w `gunb_tool/bot_ui.py`. Podgląd jest oznaczony jako przykładowy raport; nie weryfikujemy aktualności pokazanych wpisów. Cena nie jest publikowana. Nadal brakuje potwierdzonej domeny i publicznego kontaktu operatora.

Asymetryczny hero z rysunkiem technicznym, połączone numerowane kroki na granacie, korzyści w zróżnicowanym układzie, pięć natywnych FAQ i jednoznaczne CTA do Telegrama. Logo nie jest rozciągane ani powiększane ponad rozmiar źródłowy. Kliknięcie kadru otwiera obraz w nowej karcie; przyciski widoczne na obrazie działają w bocie. Źródła, kadry i kontrola danych: [docs/ASSETS.md](docs/ASSETS.md).

## Osobny folder i serwer

Zalecane: **osobny projekt strony, osobne repozytorium i niezależne wdrożenie**. Ten katalog jest niezależny od bota; nie odczytuje jego `.env`, SQLite ani plików danych. Bot pozostaje w `Documents/GUNB`.

Można utrzymywać oba produkty na jednym VPS-ie: statyczna strona w `/var/www/zolta-tablica`, bot w `/opt/gunb-tool`. Nginx/Caddy obsługuje domenę i HTTPS; bot nadal korzysta z long pollingu i własnej usługi. Aktualizacja strony nie wymaga restartu bota. Na początek strona nie potrzebuje własnego serwera Node. Alternatywnie można użyć odrębnego hostingu statycznego.

Gdy powstanie rzeczywisty panel webowy, można zachować komponenty i App Router, wyłączyć `output: "export"` i wdrożyć aplikację Next.js. Nie dodano usług ani abstrakcji dla przyszłych funkcji.

## Uruchomienie lokalne

Node.js **22.18+** lub **24 LTS**, npm. Lockfile jest zapisany; instaluj przez `npm ci`.

```powershell
git clone https://github.com/msm3107/ZlotaTablicaWeb.git
cd ZlotaTablicaWeb
npm ci
Copy-Item .env.example .env.local
npm run dev
```

Jeżeli masz już ten projekt lokalnie, pomiń klonowanie i przejdź do jego katalogu. W macOS/Linux skopiuj plik przez `cp .env.example .env.local`. Otwórz `http://127.0.0.1:3000`.

## Jedno miejsce konfiguracji

Publiczne wartości są walidowane w [`src/config/product.ts`](src/config/product.ts). Link bota, domena i kontakt są odczytywane wyłącznie z następujących zmiennych w `.env.local` lub w środowisku buildu:

| Zmienna    | Wartość / zachowanie                                                                                                                                                                                                                                  |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `BOT_URL`  | Domyślnie zweryfikowany link `https://t.me/ZoltaTablicaBot?start=strona`. Jawnie puste wyłącza linki i pokazuje zwykłą informację o niedostępnym teście, bez pozornego przycisku.                                                                     |
| `SITE_URL` | Pełna **rzeczywista** domena HTTPS, bez ścieżki, np. wartość otrzymana od właściciela domeny. Puste oznacza tryb podglądu: `noindex, nofollow`, robots blokuje indeksowanie, sitemap nie zawiera adresów, brak canonical i absolutnego URL obrazu OG. |
| `CONTACT`  | Publiczny adres e-mail lub `@nick` operatora w Telegramie. Puste pomija kontakt bezpośredni; sekcja prowadzi do bota i procedury prośby o test.                                                                                                       |

Nie wpisuj do frontendu tokenów bota, ID czatów, danych konta administracyjnego ani żadnych sekretów. Nie kopiuj `.env` bota. Nie wymyślaj parametrów `/start` — obsługiwane i udokumentowane kody strony to `strona`, `strona_oferta`, `strona_dol`.

Wszystkie ustawienia są **wypalane w statycznym buildzie**. Po zmianie domeny, kontaktu lub linku wykonaj nowy build i wgraj go ponownie. Zmiana zmiennych na serwerze już wyeksportowanej strony nie zmienia jej treści.

Nazwa w konfiguracji jest używana przez znak marki i metadane, ale treść FAQ, opis regionu i tekst grafiki OG zawierają też świadomie zapisane, zweryfikowane fakty. Przy rebrandingu lub rozszerzeniu obszaru trzeba zaktualizować również teksty w `src/components/` i grafikę w `scripts/generate-assets.mjs`, uruchomić `npm run assets` i ponownie sprawdzić zgodność z botem. Sama edycja nazwy/regionu w konfiguracji nie aktualizuje wszystkich materiałów.

## Sprawdzenia i build

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run preview
```

`npm run build` tworzy statyczny katalog `out/`. `npm run preview` serwuje go lokalnie na `http://127.0.0.1:3000`; to serwer **do lokalnego odbioru**, nie wdrożenia. Zatrzymasz go przez Ctrl+C. `next start` nie jest używany przy eksporcie statycznym.

Testy przeglądarkowe (produkcja musi być wcześniej zbudowana):

```bash
npx playwright install chromium
npm run test:e2e
npm run test:build-variants
```

Testują desktop i telefon, CTA, kotwice, pliki SEO, proporcje logo i ładowanie obrazów, powiększanie kadru z klawiatury, typy MIME WebP/JPEG, obsługę FAQ klawiaturą, skip link, szerokości 320–1920 px, działanie bez JS, błędy przeglądarki, brak zewnętrznych żądań i reguły dostępności WCAG AA przez axe. Testy SEO domyślnie zakładają podgląd z pustą domeną. Zrzuty pełnej strony powstają w `test-results/`.

`test:build-variants` dodatkowo buduje wariant z domeną/kontaktem **testowym** i pustym linkiem bota, sprawdza canonical, OG, robots, sitemap, mailto oraz brak pozornych CTA. Na końcu przywraca build z lokalną konfiguracją. Nie uruchamiaj go równocześnie z innym buildem ani w katalogu obsługującym opublikowaną stronę.

Oryginały materiałów właściciela są zachowane w `public/`. Kadry WebP są bezstratne; grafiki budowlane mają mniejsze wersje WebP. Favicon, ikona Apple i OG korzystają z prawdziwego logo. SVG favicony zawiera oryginalne logo rastrowe, bez odrysowywania. Zmiana źródeł lub kadrów wymaga ponownego wygenerowania plików:

```bash
npm run assets
```

Obraz Open Graph ma 1200 × 630 px. Źródłowy `Zolta_Tablica_jak_dziala.png` zawiera faktycznie JPEG; `bot-overview.jpg` jest jego identyczną bajtowo kopią z właściwym rozszerzeniem. Oryginał pozostaje bez zmian. Lokalne powiększanie działa dzięki odpowiedziom `image/webp` i `image/jpeg` w skrypcie podglądu. Fonty ładowane są lokalnie, bez Google Fonts. Nie potrzeba banneru cookies; sam serwer hostingu może tworzyć logi dostępu, więc jego ustawienia sprawdza operator.

## Przed publikacją

1. Podaj docelową domenę w `SITE_URL` i publiczny kontakt operatora w `CONTACT`.
2. Sprawdź, że `BOT_URL` otwiera właściwy profil. Ręcznie przejdź w Telegramie: Start → prośba o test → zgoda administratora → branża i obszar → rozpoczęcie testu. Strona nie wywołuje API bota i nie może potwierdzić dostępności jego procesu.
3. Uzgodnij nazwę/operatora w danych bota i materiałach marki. Aktualne repo mówi „Żółta Tablica”; rebranding wymaga świadomej decyzji, nie zmiany tylko nagłówka.
4. Uzupełnij rzeczywiste dane operatora w zasadach/prywatności **bota**. Istniejące szkice w repo bota nie są kopiowane ani udostępniane na tej wizytówce jako gotowe dokumenty.
5. Uruchom `npm run check:publish`, następnie lint, typy i świeży build. Polecenie zgłasza brak domeny, kontaktu lub bota i kończy się kodem 1; lokalny podgląd pozostaje możliwy.
6. Sprawdź po wdrożeniu canonical, OG, `robots.txt`, `sitemap.xml`, favicon, HTTPS oraz wszystkie CTA na prawdziwym telefonie.

Nie musisz zatwierdzać ceny do publikacji tej wersji; strona nie zawiera cennika. Nie wdrażamy automatycznie i nie wykonujemy merge'a.

## Wdrożenie statyczne i podłączenie domeny

Na hostingu statycznym ustaw polecenie instalacji `npm ci`, build `npm run build`, katalog publikacji `out` i trzy publiczne wartości środowiskowe. Podłącz domenę w ustawieniach hostingu i wprowadź dokładnie wskazane przez niego rekordy A/AAAA/CNAME. Nie zgaduj IP. Włącz HTTPS i przekierowanie wariantu `www` na wybrany adres główny (lub odwrotnie). Ten sam adres główny wpisz w `SITE_URL`.

Na VPS-ie z botem:

1. Zbuduj stronę lokalnie lub w CI z docelową konfiguracją. Wgraj **wyłącznie zawartość `out/`** do osobnego katalogu `/var/www/zolta-tablica` (najlepiej nowy katalog wydania i przełączenie symlinka).
2. Nadaj serwerowi WWW prawo odczytu, bez dostępu do katalogu/bazy bota. Otwórz 80/443 dla strony, nie zmieniaj usługi `gunb-bot`.
3. Skonfiguruj vhost Nginx. Poniżej `TWOJA_DOMENA` jest oznaczeniem do zastąpienia **rzeczywistą domeną**, nie adresem wpisanym w aplikację:

```nginx
server {
    listen 80;
    server_name TWOJA_DOMENA;
    root /var/www/zolta-tablica;
    index index.html;
    charset utf-8;

    location / {
        try_files $uri $uri/ $uri.html =404;
    }

    location /_next/static/ {
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    error_page 404 /404.html;
    location = /404.html { internal; }
}
```

4. Ustaw rekord A na rzeczywisty adres IPv4 VPS-a, ewentualnie AAAA tylko przy działającym IPv6. Po propagacji DNS sprawdź `nginx -t`, przeładuj Nginx i skonfiguruj certyfikat HTTPS (np. Certbot lub Caddy).
5. Włącz przekierowanie HTTP → HTTPS i wybierz jedną domenę kanoniczną. Zweryfikuj stronę z zewnętrznej sieci. Nie wgrywaj `node_modules`, źródeł bota ani `.env` do webroot.

## Struktura

```text
src/app/          strona, layout, CSS, robots i sitemap
src/components/   nagłówek, hero, podgląd, kroki, korzyści, FAQ, kontakt, stopka
src/config/       publiczna konfiguracja produktu i walidacja
public/           oryginały marki i produktu, lekkie kadry, favicon i Open Graph
scripts/          lokalny podgląd, kontrola publikacji, generowanie ikon
tests/            testy konfiguracji i scenariusze przeglądarkowe
docs/             plan i faktyczne wyniki weryfikacji
```

Repozytorium strony: [msm3107/ZlotaTablicaWeb](https://github.com/msm3107/ZlotaTablicaWeb). Nazwa repozytorium nie zmienia nazwy produktu — strona nadal używa zweryfikowanej „Żółtej Tablicy”. `.gitignore` pomija pliki `.env`, zależności, wyniki buildów i testów oraz lokalny stan narzędzia projektowego `.superdesign/`. Wersjonowane są `.env.example`, lockfile, materiały marki i zrzuty odbioru w `docs/`. `.gitattributes` utrzymuje zakończenia linii LF niezależnie od systemu.

Podstawy konfiguracji: [Next.js static exports](https://nextjs.org/docs/app/guides/static-exports), [Tailwind z Next.js](https://tailwindcss.com/docs/installation/framework-guides/nextjs), [publiczne dane GUNB](https://wyszukiwarka.gunb.gov.pl/pobranie.html).

## Stan narzędzi i zależności

Zweryfikowane wersje: Next.js 16.3.8, React 19.3.0, Tailwind 4.3.3, TypeScript 6.0.3. TypeScript 7 nie mieści się jeszcze w zakresie parsera używanego przez konfigurację ESLint (`<6.1`). ESLint 9.39.5 jest najnowszym kompatybilnym wydaniem 9.x; zależności `eslint-config-next` nie obsługują jeszcze ESLint 10. Registry oznacza 9.x jako niewspierane — aktualizacja czeka na zgodne wtyczki.

Pełny audyt npm zgłasza 5 ostrzeżeń high wynikających z jednej podatności `braces` przez narzędzie lintujące Next.js. Na dzień weryfikacji nie było opublikowanej poprawki `braces`; proponowana automatyczna naprawa oznacza cofnięcie konfiguracji Next.js. Audyt `npm audit --omit=dev` zgłasza **0 podatności**. Zależności lintowania nie trafiają do statycznego `out/`. Stan i faktycznie wykonane sprawdzenia opisuje [`docs/QA.md`](docs/QA.md).
