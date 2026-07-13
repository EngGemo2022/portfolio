/**
 * Project case studies.
 *
 * Optional fields (`problem`, `outcome`, `mobileImage`) render only when
 * filled — the card degrades gracefully without them.
 *
 * GAMAL TODO: for each project, fill in:
 *   - `problem`: one line on what the client needed solved
 *   - `outcome`: ONE concrete, true result (delivery time, before/after,
 *     client feedback). Never invent numbers.
 *   - `mobileImage`: a phone-frame screenshot in /public/images/projects/
 *
 * To add a project: copy an entry, add its screenshot to
 * /public/images/projects/, and fill the fields.
 */

export interface CaseStudy {
  title: string;
  image: string;
  /** Phone-frame screenshot — shows next to the desktop one when provided. */
  mobileImage?: string;
  link?: string;
  role: { en: string; ar: string };
  /** Client & context — who it was for, one line. */
  context: { en: string; ar: string };
  /** What the client needed solved. TODO: fill with real detail. */
  problem?: { en: string; ar: string };
  /** What I did — max 3 bullets. */
  did: { en: string[]; ar: string[] };
  /** One concrete result line. TODO: fill with a true, verifiable result. */
  outcome?: { en: string; ar: string };
  tags: { en: string[]; ar: string[] };
}

export const caseStudies: CaseStudy[] = [
  {
    title: "Sky Najd",
    image: "/images/projects/skynajd.png",
    // mobileImage: "/images/projects/skynajd-mobile.png", // TODO: add mobile screenshot
    link: "https://skynajd.com/",
    role: { en: "Web Designer", ar: "مصمم الموقع" },
    context: {
      en: "Corporate website for a Saudi business establishing its online presence.",
      ar: "موقع تعريفي لشركة سعودية تبني حضورها الرقمي.",
    },
    // problem: { en: "", ar: "" }, // TODO: what did the client need solved?
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
    // outcome: { en: "", ar: "" }, // TODO: one true result line
    tags: {
      en: ["Website", "Branding", "UI Design"],
      ar: ["موقع", "هوية", "تصميم واجهة"],
    },
  },
  {
    title: "Dahanat KSA",
    image: "/images/projects/dahanatksa.png",
    // mobileImage: "/images/projects/dahanatksa-mobile.png", // TODO: add mobile screenshot
    link: "https://dahanatksa.com/",
    role: { en: "Web & Brand Designer", ar: "مصمم الموقع والهوية" },
    context: {
      en: "Commercial website for a Saudi paints business targeting a trade audience.",
      ar: "موقع تجاري لنشاط دهانات سعودي يستهدف جمهوراً تجارياً.",
    },
    // problem: { en: "", ar: "" }, // TODO
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
    // outcome: { en: "", ar: "" }, // TODO
    tags: {
      en: ["E-Commerce", "Responsive", "Branding"],
      ar: ["تجارة إلكترونية", "متجاوب", "هوية"],
    },
  },
  // ── TEMPLATE — copy for the next project ─────────────────────────────
  // {
  //   title: "Project Name",
  //   image: "/images/projects/slug.png",
  //   mobileImage: "/images/projects/slug-mobile.png",
  //   link: "https://example.com",
  //   role: { en: "Web Designer", ar: "مصمم الموقع" },
  //   context: { en: "Who the client is, one line.", ar: "من هو العميل، سطر واحد." },
  //   problem: { en: "What they needed solved.", ar: "ما الذي احتاجوا حله." },
  //   did: { en: ["…", "…", "…"], ar: ["…", "…", "…"] },
  //   outcome: { en: "One true result.", ar: "نتيجة حقيقية واحدة." },
  //   tags: { en: ["Website"], ar: ["موقع"] },
  // },
];
