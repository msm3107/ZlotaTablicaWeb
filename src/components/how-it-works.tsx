const steps = [
  {
    title: "Wybierasz obszar i branżę",
    body: "Ustawiasz, gdzie działasz i co oferujesz. Możesz też wybrać rodzaje budynków. Pomożemy z konfiguracją.",
  },
  {
    title: "Bot sprawdza rejestr GUNB",
    body: "Porządkuje publiczne dane o pozwoleniach i zgłoszeniach według Twoich ustawień.",
  },
  {
    title: "Przeglądasz na Telegramie",
    body: "Wybierasz raport rano lub wieczorem. Ciekawą inwestycję możesz zapisać i wrócić do niej później.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="jak-to-dziala"
      className="how-section"
      aria-labelledby="how-title"
    >
      <div className="container">
        <div className="how-heading">
          <h2 className="eyebrow" id="how-title">
            Jak to działa
          </h2>
          <p>
            Rejestr sprawdzamy dwa razy dziennie: <strong>06:30 i 13:30</strong>{" "}
            czasu polskiego.
          </p>
        </div>
        <ol className="steps grid md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title}>
              <span className="step-number" aria-hidden="true">
                0{index + 1}
              </span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
