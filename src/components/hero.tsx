import Image from "next/image";
import { product } from "@/config/product";
import { Icon } from "./icon";
import { NotificationPreview } from "./notification-preview";
import { TrialLink } from "./trial-link";

export function Hero() {
  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <Image
        src="/hero-construction.webp"
        alt=""
        width={1400}
        height={788}
        className="hero-art"
        unoptimized
        loading="eager"
      />
      <div className="container hero">
        <div className="hero-copy">
          <p className="eyebrow region-label">Pilotaż · Warmia i Mazury</p>
          <h1 id="hero-title">
            <span>Nowe inwestycje.</span>
            <span>W Twojej okolicy.</span>
          </h1>
          <p className="hero-description">
            {product.name} sprawdza pozwolenia i zgłoszenia w rejestrze GUNB.
            Wybierasz obszar i branżę, a informacje przeglądasz na Telegramie.
          </p>
          <div className="hero-actions">
            <TrialLink />
            <a href="#jak-to-dziala" className="text-link">
              Jak to działa <Icon name="down" />
            </a>
          </div>
          <p className="trial-facts">
            Bezpłatny test <span aria-hidden="true">·</span> Pomoc w
            konfiguracji
          </p>
          <a href={product.sourceUrl} className="source-link">
            Publiczne dane GUNB · Pozwolenia i zgłoszenia
            <Icon name="external" />
          </a>
        </div>
        <NotificationPreview />
      </div>
    </section>
  );
}
