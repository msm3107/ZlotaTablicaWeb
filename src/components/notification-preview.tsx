import Image from "next/image";
import { Icon } from "./icon";

export function NotificationPreview() {
  return (
    <figure className="preview" id="przyklad" aria-labelledby="preview-caption">
      <p className="preview-label">
        <Icon name="telegram" /> Przykładowy raport z bota
      </p>
      <div className="bot-screens">
        <a
          href="/bot-report.webp"
          className="bot-screen-link"
          target="_blank"
          rel="noopener"
          aria-label="Powiększ raport bota — obraz w nowej karcie"
        >
          <Image
            src="/bot-report.webp"
            alt="Raport bota: inwestycje z Olsztyna, z opisem, lokalizacją i datą. Fragment listy dopasowanej do filtrów."
            width={729}
            height={244}
            className="bot-screen"
            unoptimized
            preload
          />
        </a>
        <a
          href="/bot-saved.webp"
          className="bot-screen-link"
          target="_blank"
          rel="noopener"
          aria-label="Powiększ zapisane inwestycje — obraz w nowej karcie"
        >
          <Image
            src="/bot-saved.webp"
            alt="Zapisana inwestycja w Olsztynie. Przycisk z numerem 1 otwiera jej szczegóły w bocie."
            width={674}
            height={222}
            className="bot-screen"
            unoptimized
            loading="eager"
          />
        </a>
      </div>
      <figcaption id="preview-caption">
        <span>
          Kadry z materiału bota.
          <br />
          Przyciski działają w Telegramie.
        </span>
        <a
          href="/bot-overview.jpg"
          className="preview-full-link"
          target="_blank"
          rel="noopener"
        >
          Zobacz cały materiał <Icon name="external" />
        </a>
      </figcaption>
    </figure>
  );
}
