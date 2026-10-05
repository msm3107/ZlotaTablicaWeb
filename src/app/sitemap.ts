import type { MetadataRoute } from "next";
import { product } from "@/config/product";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return product.siteUrl ? [{ url: `${product.siteUrl}/` }] : [];
}
