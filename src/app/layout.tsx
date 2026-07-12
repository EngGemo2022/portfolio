import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Cairo } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const SITE_URL = "https://portfolio-two-coral-86.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Gamal Abdlhafez | Graphic Designer & Web Designer",
  description:
    "Portfolio of Gamal Abdlhafez Hamood — Graphic Designer, Brand Identity Creator & Web Designer based in Riyadh, Saudi Arabia. Logos, social media design, responsive websites, and verified credentials.",
  keywords: [
    "Graphic Designer",
    "Web Designer",
    "Brand Identity",
    "UI/UX Designer",
    "Logo Designer",
    "Digital Design",
    "Riyadh",
    "Saudi Arabia",
    "Gamal Abdlhafez",
    "Portfolio",
  ],
  authors: [{ name: "Gamal Abdlhafez Hamood" }],
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: "/logo.svg",
    apple: "/images/profile.jpg",
  },
  openGraph: {
    title: "Gamal Abdlhafez | Graphic Designer & Web Designer",
    description:
      "Crafting premium digital experiences through graphic design, branding, and web design — based in Riyadh, Saudi Arabia.",
    url: SITE_URL,
    siteName: "Gamal Abdlhafez Portfolio",
    type: "website",
    images: [
      {
        url: "/images/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Gamal Abdlhafez Hamood — Graphic Designer & Web Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gamal Abdlhafez | Graphic Designer & Web Designer",
    description:
      "Crafting premium digital experiences through graphic design, branding, and web design.",
    images: ["/images/profile.jpg"],
  },
};

// Structured data: only facts that appear on the site itself.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Gamal Abdlhafez Hamood",
  jobTitle: "Graphic Designer & Web Designer",
  url: SITE_URL,
  image: `${SITE_URL}/images/profile.jpg`,
  email: "mailto:gamalabdlhafez263@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Riyadh",
    addressCountry: "SA",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Taiz University",
  },
  sameAs: ["https://linkedin.com/in/gamal-abdlhafez-2b9436289"],
  knowsLanguage: ["ar", "en"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jakarta.variable} ${cairo.variable} antialiased bg-background text-foreground`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
