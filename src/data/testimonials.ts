/**
 * Client testimonials.
 *
 * The Testimonials section renders ONLY when this array has entries —
 * nothing fake ever ships. GAMAL TODO: collect 2–3 real quotes from past
 * clients (WhatsApp messages work — ask permission to publish), then
 * uncomment the template and fill it in.
 *
 * Set `featured: true` on the strongest quote — it also appears next to
 * the contact CTA.
 */

export interface Testimonial {
  /** Client's real name. */
  name: string;
  /** Company / business name. */
  company: string;
  /** Their role, e.g. "Owner", "Marketing Manager". */
  role: { en: string; ar: string };
  /** 2–3 line quote, in the language the client wrote it. */
  quote: { en: string; ar: string };
  /** Optional photo or company logo in /public/images/testimonials/ */
  image?: string;
  featured?: boolean;
}

export const testimonials: Testimonial[] = [
  // ── REPLACE WITH REAL TESTIMONIAL ────────────────────────────────────
  // {
  //   name: "اسم العميل",
  //   company: "اسم الشركة",
  //   role: { en: "Owner", ar: "المالك" },
  //   quote: {
  //     en: "What the client actually said about working with you.",
  //     ar: "ما قاله العميل فعلاً عن العمل معك.",
  //   },
  //   image: "/images/testimonials/client-1.jpg",
  //   featured: true,
  // },
];
