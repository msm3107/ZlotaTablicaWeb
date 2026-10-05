import { product } from "@/config/product";
import { Icon } from "./icon";

export function TrialLink({
  label = "Wypróbuj przez 7 dni",
  variant = "yellow",
  className = "",
}: {
  label?: string;
  variant?: "yellow" | "navy";
  className?: string;
}) {
  if (!product.botUrl) {
    return (
      <span className={`trial-unavailable ${className}`} role="status">
        Test chwilowo niedostępny
      </span>
    );
  }
  return (
    <a
      href={product.botUrl}
      className={`button button-${variant} ${className}`}
    >
      <Icon name="telegram" className="button-telegram" />
      <span>{label}</span>
      <Icon name="arrow" className="button-arrow" />
    </a>
  );
}
