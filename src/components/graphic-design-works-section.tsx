"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import { Sparkles, ExternalLink, X, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLanguage, useTheme } from "@/components/providers";
import { AnimatedSection } from "@/components/animated-section";

export default function GraphicDesignWorksSection() {
  const { t, isRTL } = useLanguage();
  const { theme } = useTheme();
  const [selectedDesign, setSelectedDesign] = useState<number | null>(null);

  const designs = [
    {
      image: "/images/designs/logo-real-estate.png",
      title: t.designLogoRealEstate,
      description: t.designLogoRealEstateDesc,
      category: "Logo Design",
      color: "#d4af37",
    },
    {
      image: "/images/designs/logo-abaya-shop.png",
      title: t.designLogoAbaya,
      description: t.designLogoAbayaDesc,
      category: "Brand Identity",
      color: "#60a5fa",
    },
    {
      image: "/images/designs/logo-coffee.png",
      title: t.designLogoCoffee,
      description: t.designLogoCoffeeDesc,
      category: "Logo Design",
      color: "#92400e",
    },
    {
      image: "/images/designs/logo-lawyer.png",
      title: t.designLogoLawyer,
      description: t.designLogoLawyerDesc,
      category: "Brand Identity",
      color: "#3b82f6",
    },
    {
      image: "/images/designs/logo-skincare.png",
      title: t.designLogoSkincare,
      description: t.designLogoSkincareDesc,
      category: "Logo Design",
      color: "#a855f7",
    },
    {
      image: "/images/designs/logo-magnet-creative.png",
      title: t.designLogoMagnetCreative,
      description: t.designLogoMagnetCreativeDesc,
      category: "Brand Identity",
      color: "#3b82f6",
    },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Marquee runs only while visible — saves main-thread work off-screen
  const marqueeRef = useRef(null);
  const marqueeInView = useInView(marqueeRef, { margin: "100px" });

  // Keyboard support + scroll lock while the design lightbox is open
  const designCount = designs.length;
  useEffect(() => {
    if (selectedDesign === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedDesign(null);
      else if (e.key === "ArrowRight") setSelectedDesign((p) => (p !== null ? (p + 1) % designCount : 0));
      else if (e.key === "ArrowLeft") setSelectedDesign((p) => (p !== null ? (p - 1 + designCount) % designCount : 0));
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedDesign, designCount]);

  return (
    <AnimatedSection id="designs" className={`py-16 sm:py-24 relative overflow-hidden ${theme === "dark" ? "bg-[#0a0a0a]" : "bg-gray-50"}`}>
      <div className="absolute inset-0 grid-pattern opacity-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12 sm:mb-16"
        >
          <Badge className="bg-[#d4af37]/10 text-[#d4af37] border-[#d4af37]/30 mb-4">
            <Sparkles className="w-3 h-3 mr-2" />
            {t.designBadge}
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t.designTitle1} <span className="gold-gradient-animated">{t.designTitle2}</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            {t.designDescription}
          </p>
        </motion.div>
      </div>

      {/* Infinite Scrolling Carousel — animates only while on screen */}
      <div ref={marqueeRef} className="relative w-full overflow-hidden">
        {/* Gradient Overlays */}
        <div className={`absolute left-0 top-0 bottom-0 w-20 sm:w-40 z-10 pointer-events-none ${theme === "dark" ? "bg-gradient-to-r from-[#0a0a0a]" : "bg-gradient-to-r from-gray-50"}`} />
        <div className={`absolute right-0 top-0 bottom-0 w-20 sm:w-40 z-10 pointer-events-none ${theme === "dark" ? "bg-gradient-to-l from-[#0a0a0a]" : "bg-gradient-to-l from-gray-50"}`} />

        {/* Scrolling Container */}
        <motion.div
          className="flex gap-4 sm:gap-6 py-4"
          animate={
            marqueeInView
              ? { x: isRTL ? ["0%", "50%"] : ["0%", "-50%"] }
              : undefined
          }
          transition={{
            x: {
              duration: 80,
              repeat: Infinity,
              ease: "linear",
            },
          }}
          style={{
            width: "fit-content",
          }}
        >
          {/* Two copies only (was three) — a -50%/+50% translation of the
              container's own width loops seamlessly regardless of item
              count or size, so no fragile hardcoded pixel distance is
              needed. Halves this component's DOM node count. Second copy
              hidden from assistive tech. */}
          {[...designs, ...designs].map((design, index) => (
            <motion.div
              key={index}
              aria-hidden={index >= designs.length}
              className="group relative flex-shrink-0 cursor-pointer"
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={() => setSelectedDesign(index % designs.length)}
            >
              <div className={`w-64 sm:w-72 lg:w-80 h-48 sm:h-56 lg:h-64 rounded-2xl overflow-hidden border-2 border-[#d4af37]/20 transition-all duration-500 group-hover:border-[#d4af37]/60 ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}
                style={{
                  boxShadow: theme === "dark"
                    ? "0 10px 40px rgba(0,0,0,0.3)"
                    : "0 10px 40px rgba(0,0,0,0.1)",
                }}
              >
                {/* Glow Effect on Hover */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at center, ${design.color}20, transparent 70%)`,
                  }}
                />

                <div className="relative w-full h-full">
                  <Image
                    src={design.image}
                    alt={design.title}
                    fill
                    sizes="320px"
                    style={{ aspectRatio: "4 / 3" }}
                    className="object-contain p-4 sm:p-6 transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                  <span className="text-xs px-2 sm:px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-[#d4af37] border border-[#d4af37]/30">
                    {design.category}
                  </span>
                </div>

                {/* View Icon */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ scale: 0.8 }}
                  whileHover={{ scale: 1 }}
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#d4af37]/90 flex items-center justify-center backdrop-blur-sm">
                    <ExternalLink className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                  </div>
                </motion.div>
              </div>

              {/* Title below card */}
              <div className="mt-3 sm:mt-4 text-center px-2">
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white group-hover:text-[#d4af37] transition-colors truncate">
                  {design.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {designs.map((design, index) => (
          <motion.button
            key={index}
            type="button"
            aria-label={`${t.designViewProject}: ${design.title}`}
            className="w-2.5 h-2.5 rounded-full bg-[#d4af37]/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4af37]"
            whileHover={{ scale: 1.5, backgroundColor: "#d4af37" }}
            onClick={() => setSelectedDesign(index)}
          />
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedDesign !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
            onClick={() => setSelectedDesign(null)}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal Content */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={designs[selectedDesign].title}
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={`relative max-w-4xl w-full rounded-3xl overflow-hidden border border-[#d4af37]/30 ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                aria-label={t.designClose}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#d4af37] transition-colors"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedDesign(null)}
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </motion.button>

              {/* Image */}
              <div className="relative w-full aspect-video sm:aspect-[16/10]">
                <Image
                  src={designs[selectedDesign].image}
                  alt={designs[selectedDesign].title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 896px"
                  style={{ aspectRatio: "16 / 9" }}
                  className="object-contain p-6 sm:p-10"
                />
              </div>

              {/* Info */}
              <div className="p-4 sm:p-6 border-t border-[#d4af37]/20">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs px-3 py-1 rounded-full bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/30">
                    {designs[selectedDesign].category}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {designs[selectedDesign].title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                  {designs[selectedDesign].description}
                </p>
              </div>

              {/* Navigation Arrows */}
              <motion.button
                aria-label={t.certPrev}
                className={`absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#d4af37] transition-colors ${isRTL ? 'right-2 sm:right-4 left-auto' : ''}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedDesign((prev) => prev !== null ? (prev - 1 + designs.length) % designs.length : 0);
                }}
              >
                <ChevronUp className={`w-5 sm:w-6 h-5 sm:h-6 ${isRTL ? '' : '-rotate-90'}`} />
              </motion.button>
              <motion.button
                aria-label={t.certNext}
                className={`absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#d4af37] transition-colors ${isRTL ? 'left-2 sm:left-4 right-auto' : ''}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedDesign((prev) => prev !== null ? (prev + 1) % designs.length : 0);
                }}
              >
                <ChevronUp className={`w-5 sm:w-6 h-5 sm:h-6 ${isRTL ? 'rotate-90' : 'rotate-90'}`} />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatedSection>
  );
}
