import Image from "next/image";

export function Benefits() {
  return (
    <section
      className="benefits-section"
      id="korzysci"
      aria-labelledby="benefits-title"
    >
      <div className="container benefits-layout">
        <div className="benefits-copy">
          <p className="eyebrow">Dla firm, które działają lokalnie</p>
          <h2 id="benefits-title">
            Mniej szukania.
            <br />
            Więcej konkretów.
          </h2>
          <p className="benefits-lead">
            Zamiast regularnie przeglądać rejestr, dostajesz wybrane informacje
            w jednej rozmowie. Ty decydujesz, co warto sprawdzić bliżej.
          </p>
          <div className="benefit-details">
            <article className="benefit-row">
              <span className="benefit-number" aria-hidden="true">
                01
              </span>
              <div>
                <h3>Informacje z Twojego obszaru</h3>
                <p>
                  Wybierz powiat, miejscowość lub promień od swojej bazy.
                  Pilotaż obejmuje całe województwo warmińsko-mazurskie.
                </p>
              </div>
            </article>
            <article className="benefit-row">
              <span className="benefit-number" aria-hidden="true">
                02
              </span>
              <div>
                <h3>Wróć do ciekawej inwestycji</h3>
                <p>
                  Raport masz w Telegramie. Zapisz wybrane wpisy, żeby łatwo
                  znaleźć je później — na telefonie lub komputerze.
                </p>
              </div>
            </article>
          </div>
        </div>
        <div className="benefits-visual" aria-hidden="true">
          <Image
            src="/construction-detail.webp"
            alt=""
            width={760}
            height={570}
            unoptimized
            className="construction-detail"
          />
          <p className="visual-caption">Twój obszar. Twoja branża.</p>
        </div>
      </div>
    </section>
  );
}
