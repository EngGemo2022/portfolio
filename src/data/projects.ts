/**
 * Project case studies.
 *
 * To add a project: copy an entry, add its screenshot to
 * /public/images/projects/, and fill the fields in both languages.
 */

export interface CaseStudy {
  title: string;
  image: string;
  link?: string;
  role: { en: string; ar: string };
  /** Client & context — who it was for, one line. */
  context: { en: string; ar: string };
  /** What I did — max 3 bullets. */
  did: { en: string[]; ar: string[] };
  tags: { en: string[]; ar: string[] };
}

export const caseStudies: CaseStudy[] = [
  {
    title: "Sky Najd",
    image: "/images/projects/skynajd.png",
    link: "https://skynajd.com/",
    role: { en: "Web Designer", ar: "مصمم الموقع" },
    context: {
      en: "Corporate website for a Saudi business establishing its online presence.",
      ar: "موقع تعريفي لشركة سعودية تبني حضورها الرقمي.",
    },
    did: {
      en: [
        "Designed the layout and visual direction",
        "Organized the content into clear, scannable sections",
        "Built responsive pages that work on every device",
      ],
      ar: [
        "صممت التخطيط والاتجاه البصري",
        "نظّمت المحتوى في أقسام واضحة وسهلة التصفح",
        "نفّذت صفحات متجاوبة تعمل على كل الأجهزة",
      ],
    },
    tags: {
      en: ["Website", "Branding", "UI Design"],
      ar: ["موقع", "هوية", "تصميم واجهة"],
    },
  },
  {
    title: "Dahanat KSA",
    image: "/images/projects/dahanatksa.png",
    link: "https://dahanatksa.com/",
    role: { en: "Web & Brand Designer", ar: "مصمم الموقع والهوية" },
    context: {
      en: "Commercial website for a Saudi paints business targeting a trade audience.",
      ar: "موقع تجاري لنشاط دهانات سعودي يستهدف جمهوراً تجارياً.",
    },
    did: {
      en: [
        "Built a strong visual identity into the site design",
        "Structured product and service sections for quick scanning",
        "Delivered a responsive, business-ready presentation",
      ],
      ar: [
        "دمجت هوية بصرية قوية في تصميم الموقع",
        "هيكلت أقسام المنتجات والخدمات لتصفح سريع",
        "سلّمت عرضاً متجاوباً جاهزاً للأعمال",
      ],
    },
    tags: {
      en: ["E-Commerce", "Responsive", "Branding"],
      ar: ["تجارة إلكترونية", "متجاوب", "هوية"],
    },
  },
];
