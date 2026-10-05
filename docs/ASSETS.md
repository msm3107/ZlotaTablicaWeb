# Materiały strony — 2026-10-05

Wykorzystano pliki dostarczone przez właściciela w `public/`. Nie pobierano zdjęć stockowych ani zewnętrznych ikon. Istniejące lokalne ikony liniowe SVG zachowują spójny styl. `example-goal.png` służył jako referencja kompozycji, nie jest obrazem wyświetlanym na stronie.

| Oryginał                                                                  | Zastosowanie                                                                                                                         |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `company-logo.png` — PNG, 83 × 83                                         | Prawdziwe logo w nagłówku i stopce, favicon, ikona Apple, OG.                                                                        |
| `Zolta_Tablica_jak_dziala.png` — JPEG, 1152 × 1536, mimo rozszerzenia PNG | Materiał przedstawiający ustawienia, raport i zapisane inwestycje w bocie. Dwa osobne kadry w hero; całość dostępna przez odnośnik.  |
| `background-cranes.png` — 1672 × 941                                      | Subtelny rysunek techniczny w tle podglądu; wersja WebP 1400 × 788. Na telefonie tło znajduje się pod podglądem, poza opisem oferty. |
| `building-background.png` — 1448 × 1086                                   | Grafika budowlana przy korzyściach; WebP 760 × 570. Obraz dekoracyjny, pusty `alt`.                                                  |
| `example-goal.png` — 1536 × 1024                                          | Referencja: proporcje hero, szeryfowe nagłówki, pas kroków.                                                                          |

## Kadry i integralność

`npm run assets` odtwarza pliki pochodne przez `scripts/generate-assets.mjs`:

- `bot-report.webp`: lewy górny punkt **242, 775**, rozmiar **729 × 244**. Fragment raportu obejmuje nagłówek i dwa całe widoczne wpisy.
- `bot-saved.webp`: punkt **252, 1182**, rozmiar **674 × 222**. Lista zapisanych, opis inwestycji i przycisk z numerem.
- Oba WebP są **bezstratne**. Niezależny przegląd porównał zdekodowane piksele z odpowiednimi wycinkami źródła — identyczne. Nie retuszowano wiadomości, dat, lokalizacji, liczników ani przycisków.
- `bot-overview.jpg`: kopia całego źródła, identyczna bajtowo. Właściwe rozszerzenie umożliwia poprawny `Content-Type` podczas otwierania obrazu.
- Logo ma zawsze proporcje 1:1: desktop nagłówek 56 px / stopka 48 px, telefon 40–44 px. OG używa oryginalnych 83 px. Ikona Apple ma płótno 180 px z logo 83 px; nie powiększa znaku. Favicon ICO jest zmniejszony do 32 px.

Materiał nie pokazuje nazw kont, numerów telefonu, ID czatów, tokenów ani prywatnych rozmów. Widoczne są opisy i adresy obiektów w raporcie inwestycji. Nie sprawdzano aktualności poszczególnych wpisów; strona oznacza materiał jako przykładowy raport. Zapisywanie inwestycji i otwieranie ich po numerze potwierdzono w `gunb_tool/bot_ui.py`.

## Oryginały

Pliki źródłowe pozostają w `public/`; skrypt zapisuje wyłącznie osobne pliki pochodne. Sumy SHA-256 do kontroli kolejnych zmian:

| Plik                           | SHA-256                                                            |
| ------------------------------ | ------------------------------------------------------------------ |
| `company-logo.png`             | `ea144d3bbbb5583446343be796e8c6b6f764ffb5234e7d29787c19e8426c1cf4` |
| `Zolta_Tablica_jak_dziala.png` | `2f50980f0cc7b076ba641513751722d435556a7b98526e8b17257057df9ecc82` |
| `background-cranes.png`        | `ac9601f03e13f062ecfc734b6944063d878e75afb8b66d842cff48680f1ff820` |
| `building-background.png`      | `3839e943d98833fb060dc9509f25cf3a7345d390d9dedfc59f4d94ef50747f8c` |
| `example-goal.png`             | `27dc580bcde7db2b70139e91911e3fa3db0164d2fac2cfc0b2d0a100586bdbbe` |

Pliki oryginalne i referencja nie są ładowane podczas wejścia na stronę. Strona pobiera tylko logo i cztery mniejsze WebP; pełny materiał jest otwierany na życzenie.
