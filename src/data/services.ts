/**
 * Service offers shown in the Services section.
 * `waText` is the prefilled WhatsApp message for that service's CTA.
 */

export interface Service {
  id: string;
  icon: "globe" | "palette" | "megaphone";
  title: { en: string; ar: string };
  includes: { en: string[]; ar: string[] };
  waText: { en: string; ar: string };
}

export const services: Service[] = [
  {
    id: "website",
    icon: "globe",
    title: {
      en: "Website Design & Development",
      ar: "تصميم وتطوير المواقع",
    },
    includes: {
      en: [
        "Responsive design for phone, tablet, and desktop",
        "Designed, built, and launched — not just a design file",
        "Fast loading and ready for search engines",
      ],
      ar: [
        "تصميم متجاوب للجوال والتابلت والكمبيوتر",
        "تصميم وتنفيذ وإطلاق — وليس مجرد ملف تصميم",
        "سرعة في التحميل وجاهزية لمحركات البحث",
      ],
    },
    waText: {
      en: "Hi Gamal, I'd like a website for my business.",
      ar: "مرحباً جمال، أرغب بتصميم موقع إلكتروني لنشاطي.",
    },
  },
  {
    id: "brand",
    icon: "palette",
    title: {
      en: "Brand Identity & Logo",
      ar: "الهوية البصرية والشعار",
    },
    includes: {
      en: [
        "Logo with a color and font system",
        "Files ready for print and social media",
        "Usage guidelines so your brand stays consistent",
      ],
      ar: [
        "شعار مع نظام ألوان وخطوط",
        "ملفات جاهزة للطباعة ووسائل التواصل",
        "دليل استخدام يحافظ على ثبات هويتك",
      ],
    },
    waText: {
      en: "Hi Gamal, I'd like a brand identity / logo.",
      ar: "مرحباً جمال، أرغب بتصميم هوية بصرية / شعار.",
    },
  },
  {
    id: "social",
    icon: "megaphone",
    title: {
      en: "Social Media Design",
      ar: "تصميم السوشيال ميديا",
    },
    includes: {
      en: [
        "Post and story templates in your brand style",
        "Campaign and ad designs",
        "Correct sizes for every platform",
      ],
      ar: [
        "قوالب منشورات وستوري بهوية علامتك",
        "تصاميم حملات وإعلانات",
        "مقاسات صحيحة لكل منصة",
      ],
    },
    waText: {
      en: "Hi Gamal, I'd like social media designs for my business.",
      ar: "مرحباً جمال، أرغب بتصاميم سوشيال ميديا لنشاطي.",
    },
  },
];

export const WHATSAPP_NUMBER = "966552962213";

export const serviceWaLink = (service: Service, lang: "en" | "ar") =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(service.waText[lang])}`;
