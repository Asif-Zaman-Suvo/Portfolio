import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { getPortfolioContent } from "@/sanity/portfolio";

import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

/**
 * Shares the page's cached CMS read (Next dedupes it within a render), so
 * editing SEO copy in Sanity updates metadata on the next revalidation.
 */
export async function generateMetadata(): Promise<Metadata> {
  const { site } = await getPortfolioContent();

  return {
    title: site.seo.title,
    description: site.seo.description,
    openGraph: {
      title: site.seo.title,
      description: site.seo.description,
      type: "website",
      ...(site.seo.ogImage
        ? {
            images: [
              {
                url: site.seo.ogImage.src,
                width: site.seo.ogImage.width,
                height: site.seo.ogImage.height,
                alt: site.seo.ogImage.alt,
              },
            ],
          }
        : {}),
    },
  };
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
