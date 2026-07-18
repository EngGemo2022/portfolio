/**
 * Education & credentials.
 *
 * Every entry maps to assets generated from the original file:
 *   /certificates/files/{slug}.{pdf|png}  — original certificate (download)
 *   /certificates/preview/{slug}.webp     — 1600px preview (lightbox)
 *   /certificates/thumb/{slug}.webp       — 640px thumbnail (gallery card)
 *
 * To add a new certificate: drop the three files in public/certificates/
 * using a new slug, then append an entry here. Only include fields you can
 * verify on the certificate itself — omit anything that is not printed on it.
 */

export type CertificateCategory = "degree" | "ai-dev" | "marketing-business";

export interface Certificate {
  slug: string;
  /** Official certificate title exactly as printed. */
  title: string;
  /** Arabic display title. */
  titleAr: string;
  /** Organization that authorized the course. */
  issuer: string;
  issuerAr: string;
  /** Delivery platform, when different from the issuer. */
  platform?: "Coursera";
  /** Completion / issue date (ISO), as printed on the certificate. */
  date: string;
  dateLabel: { en: string; ar: string };
  credentialId?: string;
  credentialUrl?: string;
  category: CertificateCategory;
  /** Aspect ratio of the preview image (width / height). */
  aspect: number;
  /** Original file extension in /certificates/files/ (defaults to pdf). */
  fileExt?: "pdf" | "png";
}

export const certificates: Certificate[] = [
  {
    slug: "taiz-university-bachelor-software-engineering",
    title: "Bachelor Degree in Engineering & IT — Software Engineering",
    titleAr: "بكالوريوس الهندسة وتقنية المعلومات — قسم هندسة البرمجيات",
    issuer: "Taiz University",
    issuerAr: "جامعة تعز",
    date: "2024-07-01",
    dateLabel: { en: "July 2024", ar: "يوليو ٢٠٢٤" },
    credentialId: "71638",
    category: "degree",
    aspect: 1485 / 1059,
    fileExt: "png",
  },
  {
    slug: "coursera-intro-to-ai",
    title: "Introduction to Artificial Intelligence (AI)",
    titleAr: "مقدمة في الذكاء الاصطناعي",
    issuer: "IBM",
    issuerAr: "IBM",
    platform: "Coursera",
    date: "2026-01-16",
    dateLabel: { en: "Jan 16, 2026", ar: "١٦ يناير ٢٠٢٦" },
    credentialId: "7ELA81ZHT084",
    credentialUrl: "https://coursera.org/verify/7ELA81ZHT084",
    category: "ai-dev",
    aspect: 792 / 612,
  },
  {
    slug: "coursera-python-for-everybody",
    title: "Programming for Everybody (Getting Started with Python)",
    titleAr: "البرمجة للجميع (البدء مع بايثون)",
    issuer: "University of Michigan",
    issuerAr: "جامعة ميشيغان",
    platform: "Coursera",
    date: "2025-10-18",
    dateLabel: { en: "Oct 18, 2025", ar: "١٨ أكتوبر ٢٠٢٥" },
    credentialId: "HI1MD1PVMTJF",
    credentialUrl: "https://coursera.org/verify/HI1MD1PVMTJF",
    category: "ai-dev",
    aspect: 792 / 612,
  },
  {
    slug: "coursera-project-management",
    title: "Foundations of Project Management",
    titleAr: "أساسيات إدارة المشاريع",
    issuer: "Google",
    issuerAr: "Google",
    platform: "Coursera",
    date: "2025-12-23",
    dateLabel: { en: "Dec 23, 2025", ar: "٢٣ ديسمبر ٢٠٢٥" },
    credentialId: "YW5HUSOIB3PD",
    credentialUrl: "https://coursera.org/verify/YW5HUSOIB3PD",
    category: "marketing-business",
    aspect: 792 / 612,
  },
  {
    slug: "coursera-social-media-marketing",
    title: "Introduction to Social Media Marketing",
    titleAr: "مقدمة في التسويق عبر وسائل التواصل الاجتماعي",
    issuer: "Meta",
    issuerAr: "Meta",
    platform: "Coursera",
    date: "2026-03-23",
    dateLabel: { en: "Mar 23, 2026", ar: "٢٣ مارس ٢٠٢٦" },
    credentialId: "0EJLSI3IGCPY",
    credentialUrl: "https://coursera.org/verify/0EJLSI3IGCPY",
    category: "marketing-business",
    aspect: 792 / 612,
  },
  {
    slug: "coursera-english-for-career-development",
    title: "English for Career Development",
    titleAr: "اللغة الإنجليزية للتطور المهني",
    issuer: "University of Pennsylvania",
    issuerAr: "جامعة بنسلفانيا",
    platform: "Coursera",
    date: "2026-07-18",
    dateLabel: { en: "Jul 18, 2026", ar: "١٨ يوليو ٢٠٢٦" },
    credentialId: "6V9R2UWFX5R1",
    credentialUrl: "https://coursera.org/verify/6V9R2UWFX5R1",
    category: "marketing-business",
    aspect: 792 / 612,
  },
];

export const certificateFile = (slug: string, ext: "pdf" | "png" = "pdf") =>
  `/certificates/files/${slug}.${ext}`;
export const certificatePreview = (slug: string) => `/certificates/preview/${slug}.webp`;
export const certificateThumb = (slug: string) => `/certificates/thumb/${slug}.webp`;
