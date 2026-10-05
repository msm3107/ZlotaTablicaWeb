# Odbiór wizytówki — 2026-10-05

Frontend jest osobnym projektem w `C:/Users/SLC/Documents/GUNB-WEBSITE`, z własnym repozytorium Git i remote `https://github.com/msm3107/ZlotaTablicaWeb.git`. Nie wdrożono strony, nie utworzono PR ani nie wykonano merge'a. `git -C ../GUNB status --porcelain=v1` był pusty przed i po pracy — repo bota pozostaje bez zmian.

## Kontrola przed pierwszym commitem

Przed wysłaniem projektu do GitHub ponownie zainstalowano zależności przez `npm ci` i uruchomiono lint, typecheck, 7 testów konfiguracji, produkcyjny build, warianty konfiguracji oraz 14 testów przeglądarkowych. Wszystkie te sprawdzenia zakończyły się kodem 0. Audyt wykonano ponownie: 0 podatności produkcyjnych, 5 ostrzeżeń high w narzędziach lintujących. Kontrola publikacji poprawnie zgłasza brak domeny i kontaktu.

Poprawiono trzy drobne niespójności:

- Skip link przewijał stronę, ale pozostawiał fokus na `body`. `main` na wizytówce i 404 ma teraz `tabIndex={-1}`; test klawiatury sprawdza faktyczne przeniesienie fokusu. Test najpierw odtworzył problem, a po poprawce przeszedł na desktopie i telefonie.
- Walidacja nazwy bota błędnie dopuszczała 7–35 znaków. Obejmuje teraz 5–32 wraz z końcówką `bot`, zgodnie z [dokumentacją Telegrama](https://core.telegram.org/bots/features#botfather). Regresja sprawdza granice 5/32 oraz odrzucenie 4/33; obecny link nie zmienił się.
- Kontakt e-mail i kontakt Telegram wyświetlają odpowiednią ikonę.

Niezależny przegląd potwierdził powyższe poprawki i nie znalazł dalszych problemów critical/important/minor. `.gitignore` pomija sekrety `.env`, zależności, buildy, wyniki testów i lokalny stan `.superdesign/`. Skan plików przeznaczonych do wersjonowania nie wykrył wzorców tokenów Telegram/GitHub/AWS ani kluczy prywatnych. Lockfile korzysta wyłącznie z publicznego rejestru npm i nie zawiera danych logowania w URL-ach.

## Dopracowanie wyglądu

Obecna wersja używa dostarczonego logo, prawdziwego materiału bota i grafik budowlanych. Obejrzano poprzednią stronę w Chromium na komputerze i telefonie, wszystkie pięć nowych plików `public/`, osobne kadry, końcowe zrzuty oraz poprawiony OG. Sprawdzono proporcje logo i czytelność kadrów; obraz można otworzyć w pełnym rozmiarze. Szczegóły pochodzenia i integralności: [ASSETS.md](ASSETS.md).

Po dopracowaniu ponownie wykonano lint, strict typecheck, 6 testów konfiguracji, produkcyjny build, test wariantów konfiguracji i **14 testów przeglądarkowych**. Nowy test otwierania kadrów odtworzył błędny typ MIME (`application/octet-stream`) w lokalnym serwerze; dodano WebP/JPEG i test przeszedł na desktopie oraz telefonie. Pełny materiał JPEG z poprawnym rozszerzeniem jest bajtowo identyczny z oryginałem.

Ręczna próba w Chromium potwierdziła aktywny fokus CTA (obrys 3 px), poprawny link Telegrama i wyłączenie przejścia koloru przy `prefers-reduced-motion` (`transition-duration: 0s`). Automatyczne axe przy otwartych FAQ: 0 naruszeń. Powiększanie obrazu przez Enter otwiera nową kartę z prawidłowym, zdekodowanym obrazem. Właściwy profil Telegrama ponownie zwrócił HTTP 200. Nie uruchamiano testu w bocie.

Nie dodano zależności produktu ani własnych Client Components. Konfiguracja domeny, kontaktu, bota i jego architektura pozostały bez zmian. Przy zmianie wyglądu nie zmieniano lockfile; instalację i audyt powtórzono następnie przed pierwszym commitem, jak opisano powyżej.

## Faktycznie wykonane sprawdzenia

| Sprawdzenie                   | Wynik                                                                                                                                                      |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm ci`                      | Świeża instalacja z zapisanego lockfile przed pierwszym commitem, kod 0.                                                                                  |
| `npm run lint`                | Bez błędów i ostrzeżeń lintowania, kod 0.                                                                                                                  |
| `npm run typecheck`           | Strict TypeScript, kod 0.                                                                                                                                  |
| `npm test`                    | 7/7 testów konfiguracji, w tym granice długości nazwy bota.                                                                                                |
| `npm run build`               | Produkcyjny eksport: `/`, 404, robots i sitemap. Kod 0.                                                                                                    |
| `npm run test:build-variants` | Domena steruje canonical/OG/robots/sitemap; kontakt tworzy mailto; pusty bot nie tworzy pozornych linków. Kod 0. Build z lokalną konfiguracją przywrócony. |
| `npm run test:e2e`            | 14/14 testów przed pierwszym commitem, Chromium desktop i emulacja telefonu.                                                                               |
| `npm run check:publish`       | Oczekiwany kod 1: brak `SITE_URL` i `CONTACT`; poprawna lista braków.                                                                                      |
| `npm audit --omit=dev`        | 0 podatności.                                                                                                                                              |
| Pełny `npm audit`             | 5 high w łańcuchu narzędzia lintującego, opis poniżej.                                                                                                     |
| Link bota                     | HTTP 200, tytuł `Telegram: Launch @ZoltaTablicaBot`, właściwy username.                                                                                    |
| Źródło GUNB                   | Otwarta oficjalna strona danych do pobrania; link dostępny.                                                                                                |

Testy konfiguracji obejmują także nieprawidłowe domeny, linki spoza Telegrama, nieobsługiwane parametry start, jawnie pusty link bota oraz kodowanie `?`, `#`, `%`, `+` w adresie e-mail. Problem mailto został odtworzony testem, który najpierw nie przechodził, a następnie przeszedł po poprawce.

Scenariusze przeglądarkowe sprawdzają:

- Polskie metadane i `lang=pl`, dwa główne CTA z właściwym linkiem, wszystkie kotwice i ich cele.
- Prawdziwe logo w dwóch miejscach, proporcje 1:1 i rozmiar nieprzekraczający 83 px; ładowanie każdego obrazu.
- Kadry WebP i całość JPEG z prawidłowym typem MIME; otwieranie obrazu w nowej karcie przez klawiaturę.
- Favicon, ikonę Apple, SVG, OG, robots i sitemap — odpowiedzi 200.
- Nawigację do sekcji, skip link z przeniesieniem fokusu na treść wizytówki i 404 oraz otwieranie/zamykanie FAQ przez klawiaturę.
- Brak przewijania poziomego przy 320, 360, 390, 768, 1024, 1440 i 1920 px oraz w dodatkowej próbie CSS zoom 200% przy 390 px.
- Działanie podstawowego przepływu i FAQ przy wyłączonym JavaScript.
- Reguły axe WCAG 2/2.1 A/AA przy otwartych FAQ: **0 naruszeń wykrywanych automatycznie**.
- Brak błędów JavaScript i brak zewnętrznych żądań podczas ładowania strony — fonty lokalne, bez analityki.
- Tryb bez domeny: noindex/nofollow, robots blokujący indeksowanie, sitemap bez wymyślonych URL i brak canonical.

## Odbiór wizualny

Obejrzano zrzuty całej strony dla desktopu i telefonu oraz obraz OG 1200 × 630. Obejrzano również końcowe pierwsze ekrany przy 1440 × 1000 i 390 × 844. Potwierdzono ładowanie Manrope i zgodność szerokości treści z viewportem.

- [Desktop — pierwszy ekran](preview-desktop.png)
- [Telefon — pierwszy ekran](preview-mobile.png)
- [Desktop — cała strona](preview-desktop-full.png)
- [Telefon — cała strona](preview-mobile-full.png)

## Przegląd kodu

Niezależny agent przejrzał konfigurację, komponenty, metadane, skrypty, README i zgodność treści z repo bota. Nie znalazł problemów critical/important. Dwa drobne ustalenia zamknięto: poprawione kodowanie mailto i doprecyzowanie, że rebranding wymaga też zmiany treści i grafiki OG.

Po zmianie wyglądu wykonano drugi przegląd komponentów, CSS, skryptu assetów, materiału źródłowego i zrzutów: brak znalezisk critical/important/minor. Niezależnie potwierdzono identyczność pikseli kadrów z wycinkami oryginału, zachowanie logo, brak prywatnych danych i prawidłowy wariant bez linku bota. Korektę rozmiaru nagłówka OG oraz lokalny typ MIME sprawdzono następnie przy końcowym odbiorze.

## Ograniczenia i dane do uzupełnienia

- **Domena:** nieznana. Wpisz rzeczywistą domenę HTTPS do `SITE_URL`, potem zbuduj stronę ponownie.
- **Kontakt operatora:** nieznany. Wpisz publiczny e-mail lub @nick do `CONTACT`. Obecnie kontakt prowadzi do udokumentowanej procedury prośby o test w bocie.
- **Pełny przebieg w Telegramie:** nie wysyłano prośby do administratora i nie uruchamiano testu. HTTP 200 nie potwierdza działania procesu bota. Operator powinien sprawdzić Start → prośba → zgoda → konfiguracja → świadomy start 7 dni.
- **Urządzenia:** testy mobilne to emulacja w Chromium, nie rzeczywisty iPhone/Safari. Nie wykonano testów Firefox/WebKit ani testów czytnikiem ekranu. Przed publikacją sprawdź prawdziwy telefon i finalną domenę.
- **Hosting:** nie weryfikowano DNS, TLS ani konfiguracji VPS-a, ponieważ nie wdrażano strony.
- **Zasady/prywatność bota:** operator musi uzupełnić dane w istniejących szkicach; nie skopiowano niegotowych dokumentów na wizytówkę.

Pełny audyt zgłasza jedną podatność `braces` (GHSA-vfj7-8cjw-p6xm) propagowaną przez `micromatch` → `fast-glob` → `@next/eslint-plugin-next` → `eslint-config-next` — łącznie 5 wpisów high. Rejestr npm nie miał poprawionej wersji `braces` na dzień sprawdzenia. Narzędzie działa wyłącznie w development/CI i nie trafia do statycznego eksportu. Do aktualizacji pozostają zależności lintowania: ESLint 9.x jest oznaczony jako niewspierany, ale bieżące wtyczki konfiguracji Next.js nie są kompatybilne z 10.x. Próba 10.x wykazała błędne peer dependencies i błąd `react/display-name`; zachowano najnowsze zgodne 9.x. Parser TypeScript wspiera `<6.1`, dlatego użyto 6.0.3 zamiast 7.x.
