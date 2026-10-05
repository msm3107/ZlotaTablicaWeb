import type { Metadata, Viewport } from "next";
import { product } from "@/config/product";
import "@fontsource-variable/manrope";
import "./globals.css";

const title = `${product.name} — nowe inwestycje w Twojej okolicy`;

export const metadata: Metadata = {
  title,
  description: product.description,
  applicationName: product.name,
  ...(product.siteUrl
    ? { metadataBase: new URL(product.siteUrl), alternates: { canonical: "/" } }
    : {}),
  robots: { index: Boolean(product.siteUrl), follow: Boolean(product.siteUrl) },
  openGraph: {
    title,
    description: product.description,
    siteName: product.name,
    locale: "pl_PL",
    type: "website",
    ...(product.siteUrl
      ? {
          url: product.siteUrl,
          images: [
            {
              url: `${product.siteUrl}/og-image.png`,
              width: 1200,
              height: 630,
              alt: `${product.name} — informacje z rejestru GUNB na Telegramie`,
            },
          ],
        }
      : {}),
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: product.description,
    ...(product.siteUrl ? { images: [`${product.siteUrl}/og-image.png`] } : {}),
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b2231",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl" id="top">
      <body>
        <a className="skip-link" href="#tresc">
          Przejdź do treści
        </a>
        {children}
      </body>
    </html>
  );
}
