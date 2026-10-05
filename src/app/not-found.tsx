import { product } from "@/config/product";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container not-found" id="tresc" tabIndex={-1}>
      <p className="eyebrow">{product.name} · 404</p>
      <h1>Nie ma tu takiej strony.</h1>
      <p>Wróć do wizytówki i sprawdź, jak działa bot.</p>
      <Link href="/" prefetch={false} className="button button-yellow">
        Wróć na stronę główną
      </Link>
    </main>
  );
}
