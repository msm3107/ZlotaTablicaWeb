import { product } from "@/config/product";
import { Brand } from "./brand";
import { Icon } from "./icon";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <Brand footer />
            <p>
              Informacje o inwestycjach.
              <br />Z rejestru GUNB do Twojej rozmowy.
            </p>
          </div>
          <nav aria-label="Nawigacja w stopce" className="footer-links">
            <a href="#jak-to-dziala">Jak to działa</a>
            <a href="#faq">Pytania i odpowiedzi</a>
            <a href="#kontakt">Kontakt</a>
            {product.botUrl && (
              <a href={product.botUrl}>
                Otwórz bota <Icon name="external" />
              </a>
            )}
          </nav>
        </div>
        <div className="footer-bottom">
          <p>
            {product.name} korzysta z publicznych danych GUNB.
            <br />
            Nie jest serwisem GUNB ani nie jest z nim powiązana.
          </p>
          <span>
            © {new Date().getFullYear()} {product.name}
          </span>
        </div>
      </div>
    </footer>
  );
}
