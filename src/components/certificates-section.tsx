"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import {
  Award,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  Sparkles,
  X,
  ZoomIn,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLanguage, useTheme } from "@/components/providers";
import {
  certificates,
  certificateFile,
  certificatePreview,
  certificateThumb,
  type Certificate,
  type CertificateCategory,
} from "@/data/certificates";

type FilterId = "all" | CertificateCategory;

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

function CertificateLightbox({
  items,
  index,
  onClose,
  onNavigate,
}: {
  items: Certificate[];
  index: number;
  onClose: () => void;
  onNavigate: (next: number) => void;
}) {
  const { t, language, isRTL } = useLanguage();
  const { theme } = useTheme();
  const dialogRef = useRef<HTMLDivElement>(null);
  const cert = items[index];

  const goPrev = useCallback(
    () => onNavigate((index - 1 + items.length) % items.length),
    [index, items.length, onNavigate]
  );
  const goNext = useCallback(
    () => onNavigate((index + 1) % items.length),
    [index, items.length, onNavigate]
  );

  // Keyboard: Escape closes, arrows navigate (direction-aware), Tab is trapped.
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        (isRTL ? goPrev : goNext)();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        (isRTL ? goNext : goPrev)();
      } else if (e.key === "Tab") {
        const dialog = dialogRef.current;
        if (!dialog) return;
        const focusable = Array.from(
          dialog.querySelectorAll<HTMLElement>(FOCUSABLE)
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey && (active === first || !dialog.contains(active))) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && (active === last || !dialog.contains(active))) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [goNext, goPrev, isRTL, onClose]);

  // Scroll lock + initial focus.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const frame = requestAnimationFrame(() => {
      dialogRef.current
        ?.querySelector<HTMLElement>("[data-lightbox-close]")
        ?.focus();
    });
    return () => {
      document.body.style.overflow = previousOverflow;
      cancelAnimationFrame(frame);
    };
  }, []);

  const title = language === "ar" ? cert.titleAr : cert.title;
  const issuer = language === "ar" ? cert.issuerAr : cert.issuer;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/85 backdrop-blur-md" aria-hidden="true" />

      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${title} — ${issuer}`}
        initial={{ scale: 0.94, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.96, opacity: 0, y: 16 }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
        className={`relative w-full max-w-4xl max-h-[92dvh] flex flex-col rounded-2xl overflow-hidden border border-[#d4af37]/25 shadow-2xl ${
          theme === "dark" ? "bg-[#101010]" : "bg-white"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3 border-b border-[#d4af37]/15">
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 tabular-nums" aria-live="polite">
            {index + 1} / {items.length}
          </p>
          <button
            type="button"
            data-lightbox-close
            onClick={onClose}
            aria-label={t.certClose}
            className="w-9 h-9 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-[#d4af37] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-[#d4af37]"
          >
            <X className="w-4.5 h-4.5" aria-hidden="true" />
          </button>
        </div>

        {/* Image area — swipeable on touch */}
        <div className="relative flex-1 min-h-0 bg-gray-100 dark:bg-black/40">
          <motion.div
            key={cert.slug}
            className="relative h-full w-full touch-pan-y"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={(_, info) => {
              if (info.offset.x < -70) goNext();
              else if (info.offset.x > 70) goPrev();
            }}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="relative mx-auto h-full w-full max-w-full"
              style={{ aspectRatio: `${cert.aspect}` }}
            >
              <Image
                src={certificatePreview(cert.slug)}
                alt={`${title} — ${issuer}`}
                fill
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-contain p-2 sm:p-4 select-none pointer-events-none"
                priority
              />
            </div>
          </motion.div>

          {/* Prev / next */}
          <button
            type="button"
            onClick={isRTL ? goNext : goPrev}
            aria-label={isRTL ? t.certNext : t.certPrev}
            className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#d4af37] transition-colors focus-visible:outline-2 focus-visible:outline-[#d4af37]"
          >
            <ChevronLeft className="w-5 h-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={isRTL ? goPrev : goNext}
            aria-label={isRTL ? t.certPrev : t.certNext}
            className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#d4af37] transition-colors focus-visible:outline-2 focus-visible:outline-[#d4af37]"
          >
            <ChevronRight className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Details + actions */}
        <div className={`px-4 sm:px-5 py-4 border-t border-[#d4af37]/15 ${isRTL ? "text-right" : ""}`}>
          <div className={`flex flex-wrap items-center gap-2 mb-1.5 ${isRTL ? "flex-row-reverse justify-end" : ""}`}>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
            {cert.arabicEdition && (
              <span className="tag-badge">{t.certArabicEdition}</span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-3">
            {issuer}
            {cert.platform ? ` · ${cert.platform}` : ""} · {t.certIssued}{" "}
            {language === "ar" ? cert.dateLabel.ar : cert.dateLabel.en}
            {cert.credentialId ? (
              <span className="whitespace-nowrap"> · {t.certCredentialId}: {cert.credentialId}</span>
            ) : null}
          </p>
          <div className={`flex flex-wrap gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
            <a
              href={certificateFile(cert.slug, cert.fileExt)}
              download
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#d4af37] text-white text-xs sm:text-sm font-semibold hover:bg-[#b8912e] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4af37]"
            >
              <Download className="w-3.5 h-3.5" aria-hidden="true" />
              {t.certDownload}
            </a>
            {cert.credentialUrl && (
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#d4af37]/40 text-[#d4af37] text-xs sm:text-sm font-semibold hover:bg-[#d4af37]/10 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4af37]"
              >
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                {t.certVerify}
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function CertificatesSection() {
  const { t, language, isRTL } = useLanguage();
  const { theme } = useTheme();
  const [filter, setFilter] = useState<FilterId>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const filters: { id: FilterId; label: string }[] = [
    { id: "all", label: t.certFilterAll },
    { id: "degree", label: t.certCategoryDegree },
    { id: "ai-dev", label: t.certCategoryAI },
    { id: "security", label: t.certCategorySecurity },
    { id: "marketing-business", label: t.certCategoryMarketing },
    { id: "digital", label: t.certCategoryDigital },
  ];

  const visible = useMemo(
    () => (filter === "all" ? certificates : certificates.filter((c) => c.category === filter)),
    [filter]
  );

  const openLightbox = (index: number, trigger: HTMLElement) => {
    lastTriggerRef.current = trigger;
    setOpenIndex(index);
  };

  const closeLightbox = () => {
    setOpenIndex(null);
    // Restore focus to the card that opened the viewer.
    requestAnimationFrame(() => lastTriggerRef.current?.focus());
  };

  return (
    <section
      id="certificates"
      ref={sectionRef}
      className={`py-16 sm:py-24 relative ${theme === "dark" ? "bg-[#0a0a0a]" : "bg-gray-50"}`}
    >
      <div className="absolute inset-0 grid-pattern opacity-10" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <Badge className="bg-[#d4af37]/10 text-[#d4af37] border-[#d4af37]/30 mb-4">
            <Sparkles className="w-3 h-3 mr-2" aria-hidden="true" />
            {t.certBadge}
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t.certTitle1} <span className="gold-gradient-animated">{t.certTitle2}</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            {t.certDescription}
          </p>
          <p className="mt-3 text-xs sm:text-sm font-medium text-[#d4af37] flex items-center justify-center gap-1.5">
            <BadgeCheck className="w-4 h-4" aria-hidden="true" />
            {certificates.length} {t.certCount}
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          role="group"
          aria-label={t.certBadge}
          className="flex flex-wrap justify-center gap-2 mb-10 sm:mb-12"
        >
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              aria-pressed={filter === f.id}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4af37] ${
                filter === f.id
                  ? "bg-[#d4af37] text-white border-[#d4af37] shadow-md shadow-amber-500/20"
                  : `border-[#d4af37]/25 text-gray-600 dark:text-gray-300 hover:border-[#d4af37]/60 hover:text-[#d4af37] ${
                      theme === "dark" ? "bg-gray-900/60" : "bg-white"
                    }`
              }`}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Gallery */}
        <motion.ul
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 list-none p-0 m-0"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((cert, i) => {
              const title = language === "ar" ? cert.titleAr : cert.title;
              const issuer = language === "ar" ? cert.issuerAr : cert.issuer;
              return (
                <motion.li
                  key={cert.slug}
                  layout
                  initial={{ opacity: 0, y: 32 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.45, delay: Math.min(i * 0.06, 0.4), ease: [0.16, 1, 0.3, 1] }}
                >
                  <button
                    type="button"
                    onClick={(e) => openLightbox(i, e.currentTarget)}
                    aria-haspopup="dialog"
                    aria-label={`${t.certView}: ${title} — ${issuer}`}
                    className={`cert-card group w-full text-start rounded-2xl overflow-hidden border border-[#d4af37]/20 transition-all duration-400 hover:border-[#d4af37]/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4af37] ${
                      theme === "dark" ? "bg-gray-900" : "bg-white"
                    }`}
                  >
                    {/* Thumbnail */}
                    <div className="relative overflow-hidden bg-gray-100 dark:bg-black/50">
                      <div className="relative w-full" style={{ aspectRatio: `${cert.aspect}` }}>
                        <Image
                          src={certificateThumb(cert.slug)}
                          alt={`${title} — ${issuer}`}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          loading="lazy"
                        />
                      </div>
                      {/* Hover / focus veil */}
                      <div
                        className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/35 group-focus-visible:bg-black/35 transition-colors duration-300"
                        aria-hidden="true"
                      >
                        <span className="w-11 h-11 rounded-full bg-[#d4af37]/95 text-white flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 group-focus-visible:opacity-100 group-focus-visible:scale-100 transition-all duration-300">
                          <ZoomIn className="w-5 h-5" />
                        </span>
                      </div>
                      {cert.credentialUrl && (
                        <span
                          className={`absolute top-3 ${isRTL ? "left-3" : "right-3"} inline-flex items-center gap-1 text-[0.65rem] font-semibold uppercase tracking-wider px-2 py-1 rounded-full bg-black/55 text-[#d4af37] border border-[#d4af37]/30 backdrop-blur-sm`}
                        >
                          <BadgeCheck className="w-3 h-3" aria-hidden="true" />
                          {t.certVerify.split(" ")[0]}
                        </span>
                      )}
                    </div>

                    {/* Meta */}
                    <div className={`p-4 sm:p-5 ${isRTL ? "text-right" : ""}`}>
                      <div className={`flex items-center gap-2 mb-2 ${isRTL ? "flex-row-reverse justify-end" : ""}`}>
                        <Award className="w-4 h-4 text-[#d4af37] shrink-0" aria-hidden="true" />
                        <span className="text-xs font-medium text-[#d4af37]">
                          {issuer}
                          {cert.platform ? ` · ${cert.platform}` : ""}
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white leading-snug mb-1.5 group-hover:text-[#d4af37] transition-colors">
                        {title}
                        {cert.arabicEdition ? ` — ${t.certArabicEdition}` : ""}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {t.certIssued} {language === "ar" ? cert.dateLabel.ar : cert.dateLabel.en}
                      </p>
                    </div>
                  </button>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ul>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {openIndex !== null && openIndex < visible.length && (
          <CertificateLightbox
            items={visible}
            index={openIndex}
            onClose={closeLightbox}
            onNavigate={setOpenIndex}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
