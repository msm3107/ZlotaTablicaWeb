import type { MetadataRoute } from "next";
import { product } from "@/config/product";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return product.siteUrl
    ? {
        rules: { userAgent: "*", allow: "/" },
        sitemap: `${product.siteUrl}/sitemap.xml`,
        host: product.siteUrl,
      }
    : { rules: { userAgent: "*", disallow: "/" } };
}
