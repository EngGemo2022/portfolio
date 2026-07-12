/**
 * Certificates & credentials.
 *
 * Every entry maps to three assets generated from the original PDF:
 *   /certificates/files/{slug}.pdf      — original certificate (download)
 *   /certificates/preview/{slug}.webp   — 1600px preview (lightbox)
 *   /certificates/thumb/{slug}.webp     — 640px thumbnail (gallery card)
 *
 * To add a new certificate: drop the three files in public/certificates/
 * using a new slug, then append an entry here. Only include fields you can
 * verify on the certificate itself — omit anything that is not printed on it.
 */

export type CertificateCategory = "degree" | "ai-dev" | "security" | "marketing-business" | "digital";

export interface Certificate {
  slug: string;
  /** Official certificate title exactly as printed. */
  title: string;
  /** Arabic display title (translation or, for Arabic certificates, the printed title). */
  titleAr: string;
  /** Organization that authorized the course. */
  issuer: string;
  issuerAr: string;
  /** Delivery platform, when different from the issuer. */
  platform?: "Coursera" | "Edraak";
  /** Completion / issue date (ISO), as printed on the certificate. */
  date: string;
  dateLabel: { en: string; ar: string };
  credentialId?: string;
  credentialUrl?: string;
  category: CertificateCategory;
  /** Aspect ratio of the preview image (width / height). */
  aspect: number;
  /** Marks certificates issued in Arabic. */
  arabicEdition?: boolean;
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
    slug: "coursera-cybersecurity-careers",
    title: "Introduction to Cybersecurity Careers",
    titleAr: "مقدمة في مهن الأمن السيبراني",
    issuer: "IBM",
    issuerAr: "IBM",
    platform: "Coursera",
    date: "2025-08-27",
    dateLabel: { en: "Aug 27, 2025", ar: "٢٧ أغسطس ٢٠٢٥" },
    credentialId: "FO2LVZMR26MT",
    credentialUrl: "https://coursera.org/verify/FO2LVZMR26MT",
    category: "security",
    aspect: 792 / 612,
  },
  {
    slug: "edraak-cyber-security",
    title: "Introduction to Cyber Security",
    titleAr: "مقدمة في الأمن السيبراني",
    issuer: "Edraak",
    issuerAr: "إدراك",
    date: "2025-08-25",
    dateLabel: { en: "Aug 25, 2025", ar: "٢٥ أغسطس ٢٠٢٥" },
    category: "security",
    aspect: 1988 / 1408,
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
    slug: "edraak-computer-fundamentals",
    title: "Computer Essentials",
    titleAr: "أساسيات الكمبيوتر",
    issuer: "Edraak",
    issuerAr: "إدراك",
    date: "2025-08-03",
    dateLabel: { en: "Aug 3, 2025", ar: "٣ أغسطس ٢٠٢٥" },
    category: "digital",
    aspect: 1988 / 1408,
  },
  {
    slug: "edraak-internet-email-essentials",
    title: "Internet & Email Essentials",
    titleAr: "أساسيات الإنترنت والمراسلات",
    issuer: "Edraak",
    issuerAr: "إدراك",
    date: "2025-08-03",
    dateLabel: { en: "Aug 3, 2025", ar: "٣ أغسطس ٢٠٢٥" },
    category: "digital",
    aspect: 1988 / 1408,
  },
  {
    slug: "edraak-internet-fundamentals",
    title: "Internet & Email Essentials",
    titleAr: "أساسيات الإنترنت والمراسلات",
    issuer: "Edraak",
    issuerAr: "إدراك",
    date: "2025-08-03",
    dateLabel: { en: "Aug 3, 2025", ar: "٣ أغسطس ٢٠٢٥" },
    category: "digital",
    aspect: 1988 / 1408,
    arabicEdition: true,
  },
  {
    slug: "edraak-word-processing",
    title: "Word Processing",
    titleAr: "معالجة النصوص",
    issuer: "Edraak",
    issuerAr: "إدراك",
    date: "2025-08-03",
    dateLabel: { en: "Aug 3, 2025", ar: "٣ أغسطس ٢٠٢٥" },
    category: "digital",
    aspect: 1988 / 1408,
  },
];

export const certificateFile = (slug: string, ext: "pdf" | "png" = "pdf") =>
  `/certificates/files/${slug}.${ext}`;
export const certificatePreview = (slug: string) => `/certificates/preview/${slug}.webp`;
export const certificateThumb = (slug: string) => `/certificates/thumb/${slug}.webp`;
