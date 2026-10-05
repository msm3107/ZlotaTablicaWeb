import Image from "next/image";
import { product } from "@/config/product";

export function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <a
      href="#top"
      className={`brand ${footer ? "brand-footer" : ""}`}
      aria-label={`${product.name} — początek strony`}
    >
      <Image
        src="/company-logo.png"
        alt=""
        width={83}
        height={83}
        className="brand-logo"
        unoptimized
      />
      <span>{product.name}</span>
    </a>
  );
}
