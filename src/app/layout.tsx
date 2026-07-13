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

const SITE_URL = "https://gemo-portfolio.vercel.app";

const TITLE = "جمال عبدالحافظ | مصمم مواقع وهويات بصرية — الرياض";
const DESCRIPTION =
  "أساعد الشركات السعودية على إطلاق مواقع وهويات بصرية تكسب ثقة العملاء. مواقع متجاوبة، شعارات، وتصاميم سوشيال ميديا. Gamal Abdlhafez — Web & Brand Designer, Riyadh.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "مصمم مواقع",
    "هوية بصرية",
    "تصميم شعار",
    "مصمم جرافيك الرياض",
    "تصميم سوشيال ميديا",
    "Web Designer",
    "Brand Identity",
    "Logo Designer",
    "Riyadh",
    "Saudi Arabia",
    "Gamal Abdlhafez",
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
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Gamal Abdlhafez — جمال عبدالحافظ",
    type: "website",
    locale: "ar_SA",
    alternateLocale: "en_US",
    images: [
      {
        url: "/images/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Gamal Abdlhafez — Web & Brand Designer | جمال عبدالحافظ — مصمم مواقع وهويات بصرية",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/profile.jpg"],
  },
};

// Structured data: only facts that appear on the site itself.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Gamal Abdlhafez Hamood",
  alternateName: "جمال عبدالحافظ حمود",
  jobTitle: "Web & Brand Designer",
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

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Gamal Abdlhafez — Web & Brand Design",
  alternateName: "جمال عبدالحافظ — تصميم مواقع وهويات بصرية",
  description:
    "Website design and development, brand identity and logo design, and social media design for businesses in Saudi Arabia.",
  url: SITE_URL,
  image: `${SITE_URL}/images/profile.jpg`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Riyadh",
    addressCountry: "SA",
  },
  areaServed: "SA",
  founder: { "@type": "Person", name: "Gamal Abdlhafez Hamood" },
  sameAs: [
    "https://linkedin.com/in/gamal-abdlhafez-2b9436289",
    "https://wa.me/966552962213",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jakarta.variable} ${cairo.variable} antialiased bg-background text-foreground`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
        />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
