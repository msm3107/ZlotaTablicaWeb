import { product } from "@/config/product";
import { Icon } from "./icon";
import { TrialLink } from "./trial-link";

export function Contact() {
  return (
    <section
      className="contact-section"
      id="kontakt"
      aria-labelledby="contact-title"
    >
      <div className="container contact-inner">
        <div className="contact-copy">
          <p className="eyebrow">Sprawdź w swojej okolicy</p>
          <h2 id="contact-title">
            Przetestuj Żółtą Tablicę
            <br />w swojej firmie.
          </h2>
          <p>7 dni bez opłat. Pomożemy dobrać obszar i skonfigurować bota.</p>
        </div>
        <div className="contact-actions">
          <TrialLink variant="navy" />
          {product.contact ? (
            <a href={product.contact.href} className="contact-direct">
              <Icon
                name={product.contact.href.startsWith("mailto:") ? "mail" : "telegram"}
              />
              {product.contact.label}
            </a>
          ) : product.botUrl ? (
            <a href={product.botUrl} className="contact-direct">
              Poproś o test w rozmowie z botem <Icon name="arrow" />
            </a>
          ) : (
            <p className="contact-missing">
              Kontakt zostanie udostępniony przed uruchomieniem testów.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
