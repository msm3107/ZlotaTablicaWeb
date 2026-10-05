import { product } from "@/config/product";
import { Icon } from "./icon";

const questions = [
  {
    question: "Dla kogo jest Żółta Tablica?",
    answer:
      "Dla wykonawców, hurtowni i składów budowlanych oraz handlowców szukających informacji o lokalnych inwestycjach.",
  },
  {
    question: "Skąd pochodzą dane?",
    answer: (
      <>
        Z publicznych plików Rejestru Wniosków, Decyzji i Zgłoszeń (RWDZ),
        udostępnianych przez GUNB.{" "}
        <a href={product.sourceUrl}>
          Zobacz źródło danych <Icon name="external" />
        </a>
      </>
    ),
  },
  {
    question: "Czy potrzebuję Telegrama?",
    answer:
      "Tak — bezpłatnego konta Telegram. Z bota skorzystasz na telefonie, komputerze i w przeglądarce.",
  },
  {
    question: "Jak działa 7-dniowy test?",
    answer:
      "Poproś o test w bocie; administrator udostępnia go ręcznie. Skonfiguruj obszar i branżę. Siedem dni liczymy od Twojego kliknięcia startu testu. Test jest bezpłatny, raz na konto Telegram. Pomożemy w konfiguracji.",
  },
  {
    question: "Jakie są ograniczenia danych?",
    answer:
      "Wpis pozwala zauważyć potencjalną inwestycję, ale nie gwarantuje zlecenia ani kontaktu do inwestora. Nie potwierdza rozpoczęcia ani aktualnego etapu budowy. Urzędy mogą publikować dane z opóźnieniem, a lokalizacja bywa przybliżona. Stan inwestycji trzeba sprawdzić samodzielnie.",
  },
];

export function FAQ() {
  return (
    <section
      className="container faq-section"
      id="faq"
      aria-labelledby="faq-title"
    >
      <div className="faq-intro">
        <p className="eyebrow">Warto wiedzieć</p>
        <h2 id="faq-title">Zanim zaczniesz.</h2>
        <p>Najważniejsze informacje o danych i bezpłatnym teście.</p>
        <a href="#kontakt" className="text-link">
          Masz inne pytanie? <Icon name="arrow" />
        </a>
      </div>
      <div className="faq-list">
        {questions.map((item) => (
          <details key={item.question}>
            <summary>
              {item.question}
              <Icon name="plus" />
            </summary>
            <div className="faq-answer">{item.answer}</div>
          </details>
        ))}
      </div>
    </section>
  );
}
