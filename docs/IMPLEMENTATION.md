# Plan wizytówki — 2026-10-05

Cel: mała polska wizytówka, która wyjaśnia produkt i prowadzi do 7-dniowego testu bota.

## Rozpoznanie przy pierwszej implementacji

Ta część opisuje stan początkowy; aktualny wygląd wykorzystuje materiały dostarczone później, opisane poniżej i w [ASSETS.md](ASSETS.md).

- Nowy, pusty katalog `GUNB-WEBSITE`; bot pozostaje w sąsiednim `GUNB`.
- Aktualne repo bota: `msm3107/GUNB-TOOL`, odczytany commit `2f80e8b`.
- Nazwa: **Żółta Tablica** — README, `bot_ui.py`, `config.yaml`, `docs/TELEGRAM_PROFIL.md` i istniejąca strona są zgodne.
- Bot: `https://t.me/ZoltaTablicaBot?start=strona`; `/start` obsługuje ten kod kampanii, nie uruchamia sam testu.
- Zakres: warmińsko-mazurskie; pobieranie o 06:30 i 13:30 czasu polskiego; raport rano lub wieczorem.
- Test: prośba → administrator udostępnia → branża i obszar → użytkownik uruchamia 7 dni.
- Branża ustala kolejność i orientacyjne przypomnienia; rodzaj budynku i obszar są osobnymi filtrami. Tekst strony nie powinien upraszczać tego do ścisłego filtra branżowego.
- Przykład: fikcyjna miejscowość Przykładowo i dom jednorodzinny, jak w `gunb_tool/demo.py`.
- Zweryfikowane mapy, zapisane, notatki i przypomnienia istnieją, ale pierwsza strona eksponuje trzy podstawowe korzyści.
- Brak plików graficznych marki; znak tablicy wywiedziony z `strona/styl.css`.
- Brak potwierdzonej domeny i publicznego kontaktu. Cena niezatwierdzona.

## Projekt i granice

Jasne tło, granatowy tekst, żółty akcent, lokalna czcionka Manrope. Hero z HTML-owym podglądem rozmowy, trzy kroki, trzy korzyści, FAQ przez natywne `details`, test/kontakt, stopka. Nawigacja mobilna bez skryptów. Server Components, brak backendu, płatności, analityki, cookies i połączenia z bazą bota. Statyczny eksport Next.js do `out/`. Publikacja i merge poza zakresem.

## Kroki

- [x] Konfiguracja produktu i testy: poprawne publiczne URL, brak domeny, brak bota, brak kontaktu, odrzucanie błędnych wartości.
- [x] Next App Router, strict TypeScript, Tailwind, komponenty i responsywny wygląd.
- [x] SEO, favicon, obraz OG, robots i sitemap; bez domeny noindex i brak wymyślonych absolutnych URL.
- [x] README: uruchomienie, konfiguracja, statyczny hosting, VPS, DNS i HTTPS.
- [x] Lint, typy, produkcyjny build; testy przeglądarkowe na telefonie i komputerze, klawiatura, FAQ, linki i dostępność.
- [x] Odbiór wizualny screenshotów i raport rzeczywistych wyników.

Wyniki: [QA.md](QA.md). Niezależny przegląd kodu nie wykazał problemów critical/important. Poprawiono kodowanie mailto i doprecyzowano dokumentację zmian marki.

## Decyzje

Wykonanie bez dodatkowych bramek akceptacji projektu: użytkownik wyraźnie polecił przedstawić plan, następnie implementować i pytać wyłącznie o rzeczy blokujące pracę. Osobny folder jest już izolacją od bota. Nie tworzę wspólnego repozytorium ani commitów w repo nadrzędnym Documents. Ograniczam testy do zachowania konfiguracji i scenariuszy użytkownika.

## Dopracowanie po dostarczeniu materiałów

W dalszej iteracji właściciel dostarczył do `public/` prawdziwe logo, materiał o działaniu bota, dwie grafiki budowlane i referencję kompozycji. Zastępczy znak i fikcyjny podgląd HTML z pierwszej wersji zastąpiono oryginalnym logo oraz bezstratnymi kadrami. Hero jest asymetryczny, kroki połączone na granatowym pasie, korzyści mają zróżnicowane proporcje, a FAQ skrócono do pięciu odpowiedzi. Ograniczenia danych opisano raz.

Fonty: lokalna Manrope i systemowa Georgia. Oryginały zachowane, obrazy pochodne WebP, favicon i OG z logo. Nie zmieniono konfiguracji ani bota i nie dodano zależności produktu. Przy odbiorze powiększania kadrów poprawiono typ MIME w lokalnym podglądzie. Aktualne wyniki: 6 testów konfiguracji, 14 przeglądarkowych, lint, strict typecheck, produkcyjny build i warianty konfiguracji. Szczegóły: [QA.md](QA.md), [ASSETS.md](ASSETS.md).

## Osobne repozytorium i końcowy przegląd

Na polecenie właściciela utworzono własny Git w katalogu strony, gałąź `main` i remote `https://github.com/msm3107/ZlotaTablicaWeb.git`; repozytorium nadrzędne `Documents` oraz bot pozostają poza zakresem. Poprawiono fokusowanie głównej treści przez skip link, granice długości nazwy bota i ikonę kontaktu. Dokumentacja instalacji korzysta z właściwego URL repozytorium, a plan historyczny jest wyraźnie oznaczony. Ponowna weryfikacja: 7 testów konfiguracji, 14 przeglądarkowych, lint, typy, produkcyjny build i warianty konfiguracji — szczegóły w [QA.md](QA.md). Publikacja na serwerze i podłączenie domeny są kolejnym, osobnym krokiem.
