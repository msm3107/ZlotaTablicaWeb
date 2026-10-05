import { Brand } from "./brand";
import { TrialLink } from "./trial-link";

const navigation = [
  { href: "#jak-to-dziala", label: "Jak to działa" },
  { href: "#korzysci", label: "Korzyści" },
  { href: "#faq", label: "FAQ" },
  { href: "#kontakt", label: "Kontakt" },
];

export function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Brand />
        <nav aria-label="Nawigacja główna" className="navigation">
          {navigation.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <TrialLink label="Otwórz bota" className="header-cta" />
      </div>
    </header>
  );
}
