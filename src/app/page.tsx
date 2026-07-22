"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView, AnimatePresence, useScroll, useTransform, useSpring, MotionConfig, useReducedMotion } from "framer-motion";
import {
  Palette,
  Monitor,
  Smartphone,
  Brain,
  Code,
  Globe,
  Mail,
  MapPin,
  Linkedin,
  Download,
  ExternalLink,
  MessageCircle,
  Menu,
  X,
  ChevronUp,
  Sparkles,
  Layers,
  Zap,
  Award,
  Languages as LanguagesIcon,
  ArrowDown,
  Sun,
  Moon,
  ArrowRight,
  Megaphone,
  CheckCircle2,
  Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { ThemeProvider, LanguageProvider, useTheme, useLanguage } from "@/components/providers";
import { CertificatesSection } from "@/components/certificates-section";
import { CountUp } from "@/components/count-up";
import { FadeIn } from "@/components/fade-in";
import { services, serviceWaLink } from "@/data/services";
import { caseStudies } from "@/data/projects";

// ============================================
// UTILITY COMPONENTS & HOOKS
// ============================================

function MagneticButton({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - left - width / 2) * 0.3;
    const y = (clientY - top - height / 2) * 0.3;
    setPosition({ x, y });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 350, damping: 15 }}
    >
      {children}
    </motion.div>
  );
}

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    setRotateX((y - centerY) / 10);
    setRotateY((centerX - x) / 10);
    setGlarePosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const reset = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-30"
        style={{
          background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(212, 175, 55, 0.4), transparent 50%)`,
        }}
      />
      <div style={{ transform: "translateZ(30px)" }}>{children}</div>
    </motion.div>
  );
}

function GradientOrbs() {
  const { theme } = useTheme();
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute top-0 left-0 w-full h-full">
        <div 
          className="aurora absolute w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] rounded-full opacity-30"
          style={{
            background: `radial-gradient(circle, rgba(212, 175, 55, ${theme === "dark" ? 0.3 : 0.15}) 0%, rgba(245, 158, 11, ${theme === "dark" ? 0.1 : 0.05}) 50%, transparent 70%)`,
            top: "-20%",
            left: "-10%",
          }}
        />
      </div>
      <div className="absolute bottom-0 right-0 w-full h-full">
        <div 
          className="aurora-2 absolute w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] rounded-full opacity-25"
          style={{
            background: `radial-gradient(circle, rgba(251, 191, 36, ${theme === "dark" ? 0.2 : 0.1}) 0%, rgba(212, 175, 55, ${theme === "dark" ? 0.1 : 0.05}) 50%, transparent 70%)`,
            bottom: "-10%",
            right: "-5%",
          }}
        />
      </div>
    </div>
  );
}

function AnimatedSection({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#d4af37] via-[#f59e0b] to-[#fbbf24] origin-left z-50"
      style={{ scaleX }}
    />
  );
}

// ============================================
// MAIN COMPONENTS
// ============================================

function Navigation() {
  const { t, language, setLanguage, isRTL } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track which section is in view for the active nav indicator
  useEffect(() => {
    const ids = ["about", "services", "projects", "experience", "certificates", "contact"];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { href: "#about", label: t.navAbout },
    { href: "#services", label: t.navServices },
    { href: "#projects", label: t.navProjects },
    { href: "#experience", label: t.navExperience },
    { href: "#certificates", label: t.navCertificates },
    { href: "#contact", label: t.navContact },
  ];

  // ── Mobile menu: scroll lock, focus trap, Escape, focus restore ──
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const closeMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const panel = panelRef.current;

    // Lock body scroll without losing position; compensate for the
    // disappearing scrollbar so content doesn't shift horizontally.
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const previousOverflow = document.body.style.overflow;
    const previousPadding = document.body.style.paddingRight;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setIsMobileMenuOpen(false);
      } else if (e.key === "Tab" && panel) {
        const focusable = Array.from(
          panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey && (active === first || !panel.contains(active))) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && (active === last || !panel.contains(active))) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKey);
    const frame = requestAnimationFrame(() => {
      panel?.querySelector<HTMLElement>("[data-menu-close]")?.focus();
    });

    return () => {
      document.removeEventListener("keydown", handleKey);
      cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPadding;
      toggleButtonRef.current?.focus();
    };
  }, [isMobileMenuOpen]);

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  return (
    <>
    <motion.nav
      aria-label="Main navigation"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, type: "spring" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "glass py-2 sm:py-3" : "bg-transparent py-3 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <MagneticButton>
            <motion.a
              href="#"
              className="text-xl sm:text-2xl font-bold gold-gradient-animated relative group"
              whileHover={{ scale: 1.05 }}
            >
              {t.navName}
              <motion.span
                className={`absolute -bottom-1 h-0.5 bg-gradient-to-r from-[#d4af37] to-[#f59e0b] ${isRTL ? 'right-0' : 'left-0'}`}
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          </MagneticButton>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-8">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                aria-current={activeSection === link.href ? "true" : undefined}
                className={`relative transition-colors duration-300 text-sm font-medium group ${
                  activeSection === link.href
                    ? "text-[#d4af37]"
                    : "text-gray-500 dark:text-gray-300 hover:text-[#d4af37]"
                }`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
              >
                <span className="animated-underline">{link.label}</span>
                {activeSection === link.href && (
                  <motion.span
                    layoutId="nav-active-indicator"
                    className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-gradient-to-r from-[#d4af37] to-[#f59e0b] rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </motion.a>
            ))}
            
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="flex items-center justify-center w-9 h-9 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 hover:bg-[#d4af37]/20 transition-all duration-300"
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {theme === "dark" ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    <Sun className="w-4 h-4 text-[#d4af37]" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                  >
                    <Moon className="w-4 h-4 text-[#d4af37]" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
            
            {/* Language Switcher */}
            <motion.button
              onClick={toggleLanguage}
              aria-label={language === "en" ? "التبديل إلى العربية" : "Switch to English"}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 hover:bg-[#d4af37]/20 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Globe className="w-4 h-4 text-[#d4af37]" aria-hidden="true" />
              <span className="text-sm font-medium text-[#d4af37]">
                {language === "en" ? "EN" : "AR"}
              </span>
            </motion.button>

            {/* Contact CTA */}
            <motion.a
              href="#contact"
              className="hidden xl:inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#d4af37] to-[#f59e0b] text-white text-sm font-semibold shadow-md shadow-amber-500/20 hover:shadow-amber-500/40 transition-shadow"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              {t.contactTitle1} {t.contactTitle2}
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2 sm:gap-4">
            {/* Mobile Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="flex items-center justify-center w-8 h-8 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10"
              whileTap={{ scale: 0.9 }}
            >
              {theme === "dark" ? (
                <Sun className="w-3.5 h-3.5 text-[#d4af37]" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-[#d4af37]" />
              )}
            </motion.button>
            
            {/* Mobile Language Switcher */}
            <motion.button
              onClick={toggleLanguage}
              aria-label={language === "en" ? "التبديل إلى العربية" : "Switch to English"}
              className="flex items-center gap-1 px-2 py-1 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10"
              whileTap={{ scale: 0.95 }}
            >
              <Globe className="w-3 h-3 text-[#d4af37]" aria-hidden="true" />
              <span className="text-xs font-medium text-[#d4af37]">
                {language === "en" ? "EN" : "AR"}
              </span>
            </motion.button>

            <motion.button
              ref={toggleButtonRef}
              className="text-gray-700 dark:text-white p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav-menu"
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

      </div>
    </motion.nav>

    {/* Mobile menu overlay — sibling of the nav so `fixed` positioning is
        never trapped inside the nav's animated transform context */}
    <AnimatePresence>
      {isMobileMenuOpen && (
        <>
          {/* Blurred backdrop: clicking it closes the menu */}
          <motion.div
            key="menu-backdrop"
            className="lg:hidden fixed inset-0 z-[90] bg-black/60 mobile-menu-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.25, ease: "easeOut" }}
            onClick={closeMenu}
            aria-hidden="true"
          />

          {/* Opaque panel */}
          <motion.div
            key="menu-panel"
            ref={panelRef}
            id="mobile-nav-menu"
            role="dialog"
            aria-modal="true"
            aria-label={t.navName}
            className={`lg:hidden fixed top-0 inset-x-0 z-[91] rounded-b-2xl border-b border-[#d4af37]/25 shadow-2xl max-h-[100dvh] overflow-y-auto ${
              theme === "dark" ? "bg-[#0d0d0d]" : "bg-white"
            }`}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: reduceMotion ? 0 : 0.25, ease: "easeOut" }}
          >
            {/* Panel header: brand + close */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#d4af37]/15">
              <span className="text-xl font-bold gold-gradient-animated">{t.navName}</span>
              <button
                type="button"
                data-menu-close
                onClick={closeMenu}
                aria-label="Close menu"
                className="w-10 h-10 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-[#d4af37]/10 hover:text-[#d4af37] transition-colors focus-visible:outline-2 focus-visible:outline-[#d4af37]"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Links */}
            <nav aria-label={t.navName} className="px-5 py-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  aria-current={activeSection === link.href ? "true" : undefined}
                  className={`block py-3.5 text-base font-medium border-b border-[#d4af37]/10 transition-colors ${
                    activeSection === link.href
                      ? "text-[#d4af37]"
                      : "text-gray-700 dark:text-gray-200 hover:text-[#d4af37]"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Primary CTA */}
            <div className="px-5 pt-3 pb-6">
              <a
                href={`https://wa.me/966552962213?text=${encodeURIComponent(t.contactWaPrefill)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-[#25D366] text-white font-bold text-base"
              >
                <MessageCircle className="w-5 h-5" aria-hidden="true" />
                {t.heroWhatsAppMe}
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
    </>
  );
}

function HeroSection() {
  const { t, isRTL, language } = useLanguage();
  const { theme } = useTheme();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 120]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const stats = [
    { value: 3, suffix: "+", label: t.aboutYearsExperience },
    { value: 20, suffix: "+", label: t.aboutProjectsDone },
    { value: 15, suffix: "+", label: t.aboutHappyClients },
  ];

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 sm:pt-20">
      {/* Background */}
      <motion.div
        className={`absolute inset-0 ${theme === "dark"
          ? "bg-[#080808]"
          : "bg-[#fafafa]"}`}
        style={{ y, opacity }}
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Large blurred accent orbs */}
      <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(212,175,55,0.4) 0%, transparent 70%)", filter: "blur(80px)" }} />
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full opacity-15 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(245,158,11,0.3) 0%, transparent 70%)", filter: "blur(100px)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-12 lg:py-0 ${isRTL ? "lg:flex-row-reverse" : ""}`}>

          {/* ===== LEFT: TEXT CONTENT ===== */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
            }}
            className={`${isRTL ? "lg:order-2 text-right" : "lg:order-1 text-left"} text-center lg:text-left`}
          >
            {/* Available badge */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              className={`mb-5 ${isRTL ? "flex justify-center lg:justify-end" : "flex justify-center lg:justify-start"}`}
            >
              <span className="frosted-badge">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block hero-dot-pulse" aria-hidden="true" />
                {t.heroAvailable}
              </span>
            </motion.div>

            {/* Name + role */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              className="mb-5"
            >
              <p className="font-display text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Gamal <span className="hero-gradient-text">Abdlhafez</span>
              </p>
              <p className="text-sm sm:text-base font-medium text-[#d4af37] mt-1">
                {t.heroTitle1}
              </p>
            </motion.div>

            {/* Outcome headline */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
              className="mb-5"
            >
              <h1 className="font-display heading-lg text-gray-900 dark:text-white">
                {t.heroHeadlineA}{" "}
                <span className="hero-gradient-text">{t.heroHeadlineB}</span>{" "}
                {t.heroHeadlineC}
              </h1>
            </motion.div>

            {/* Subline */}
            <motion.p
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              className="text-base sm:text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-lg leading-relaxed"
            >
              {t.heroDescription1}
            </motion.p>

            {/* CTAs — one primary (WhatsApp), one secondary */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              className={`flex flex-wrap gap-3 mb-8 ${isRTL ? "justify-center lg:justify-end" : "justify-center lg:justify-start"}`}
            >
              <MagneticButton>
                <motion.a
                  href={`https://wa.me/966552962213?text=${encodeURIComponent(t.contactWaPrefill)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#25D366] hover:bg-[#1eb855] text-white font-bold text-sm sm:text-base shadow-lg shadow-green-500/25 transition-colors"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <MessageCircle className="w-5 h-5" aria-hidden="true" />
                  {t.heroWhatsAppMe}
                </motion.a>
              </MagneticButton>
              <MagneticButton>
                <motion.a
                  href="#projects"
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-[#d4af37]/40 text-[#d4af37] font-semibold text-sm hover:bg-[#d4af37]/8 transition-colors"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Layers className="w-4 h-4" aria-hidden="true" />
                  {t.heroViewProjects}
                </motion.a>
              </MagneticButton>
            </motion.div>

            {/* Location + email */}
            <motion.div
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              className={`flex flex-wrap items-center gap-5 text-sm text-gray-400 ${isRTL ? "justify-center lg:justify-end" : "justify-center lg:justify-start"}`}
            >
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#d4af37]" aria-hidden="true" />
                {t.heroLocation}
              </span>
              <span className="w-px h-4 bg-gray-200 dark:bg-white/10" aria-hidden="true" />
              <motion.a
                href="mailto:gamalabdlhafez263@gmail.com"
                className="flex items-center gap-1.5 hover:text-[#d4af37] transition-colors"
                whileHover={{ x: 3 }}
              >
                <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                {t.contactSendEmail}
              </motion.a>
            </motion.div>
          </motion.div>

          {/* ===== RIGHT: PROFILE + STATS ===== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: isRTL ? -40 : 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, type: "spring", damping: 20 }}
            className={`flex flex-col items-center gap-8 ${isRTL ? "lg:order-1" : "lg:order-2"}`}
          >
            {/* Profile image with premium frame */}
            <div className="relative">
              {/* Rotating rings */}
              <div
                className="absolute inset-0 rounded-3xl border border-[#d4af37]/20 hero-ring-1"
                aria-hidden="true"
              />
              <div
                className="absolute inset-0 rounded-3xl border border-[#d4af37]/10 hero-ring-2"
                aria-hidden="true"
              />

              {/* Glow */}
              <div
                className="absolute inset-0 rounded-3xl opacity-30 blur-3xl hero-glow-pulse"
                style={{ background: "radial-gradient(circle, rgba(212,175,55,0.6) 0%, transparent 70%)" }}
                aria-hidden="true"
              />

              {/* Image */}
              <motion.div
                className="relative w-56 sm:w-72 lg:w-80 aspect-[1058/1487] rounded-3xl overflow-hidden"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
                style={{
                  boxShadow: "0 32px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(212,175,55,0.2)",
                }}
              >
                <Image
                  src="/images/profile.jpg"
                  alt="Gamal Abdlhafez Hamood"
                  fill
                  sizes="(max-width: 640px) 224px, (max-width: 1024px) 288px, 320px"
                  className="object-cover"
                  priority
                />
                {/* Overlay gradient on image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
              </motion.div>

              {/* Badge floating top-right */}
              <motion.div
                className="absolute -top-3 -right-3 glass rounded-2xl px-3 py-2 flex items-center gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <Award className="w-4 h-4 text-[#d4af37]" aria-hidden="true" />
                <span className="text-xs font-semibold text-gray-800 dark:text-white">{t.heroTitle1}</span>
              </motion.div>
            </div>

            {/* Stats row */}
            <div className="flex gap-6 sm:gap-10">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.15 }}
                  className="text-center"
                >
                  <div className="text-2xl sm:text-3xl font-bold gold-gradient-animated font-display">
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5 whitespace-nowrap">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.a
          href="#about"
          className="flex flex-col items-center gap-2 text-gray-400 hover:text-[#d4af37] transition-colors"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          <span className="section-label">{t.heroScrollDown}</span>
          <ArrowDown className="w-4 h-4" />
        </motion.a>
      </motion.div>
    </section>
  );
}

function AboutSection() {
  const { t, isRTL, language } = useLanguage();
  const { theme } = useTheme();
  
  const highlights = [
    { icon: Palette, label: t.aboutGraphicDesign, color: "from-[#d4af37] to-[#f59e0b]" },
    { icon: Monitor, label: t.aboutSocialMediaDesign, color: "from-[#f59e0b] to-[#fbbf24]" },
    { icon: Globe, label: t.aboutWebsiteDesign, color: "from-[#fbbf24] to-[#d4af37]" },
    { icon: Smartphone, label: t.aboutResponsiveUI, color: "from-[#d4af37] to-[#f59e0b]" },
    { icon: Brain, label: t.aboutAIWorkflows, color: "from-[#f59e0b] to-[#fbbf24]" },
    { icon: Code, label: t.aboutFrontendDev, color: "from-[#fbbf24] to-[#d4af37]" },
    { icon: Zap, label: t.aboutAdaptability, color: "from-[#d4af37] to-[#f59e0b]" },
    { icon: MessageCircle, label: t.aboutCommunication, color: "from-[#f59e0b] to-[#fbbf24]" },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <AnimatedSection id="about" className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Badge className="bg-[#d4af37]/10 text-[#d4af37] border-[#d4af37]/30 mb-4 text-sm px-4 py-1">
              <Sparkles className="w-3 h-3 mr-2" />
              {t.aboutBadge}
            </Badge>
          </motion.div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t.aboutTitle1} <span className="gold-gradient-animated">{t.aboutTitle2}</span>
          </h2>
        </motion.div>

        <div className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`space-y-4 sm:space-y-6 ${isRTL ? 'lg:order-2 lg:text-right' : 'lg:order-1'}`}
          >
            <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
              {t.aboutPara1}
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base">
              {t.aboutPara2}
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base">
              {t.aboutPara3}
            </p>

            <div className={`pt-2 ${isRTL ? 'text-right' : ''}`}>
              <a
                href={language === "ar" ? "/cv/gamal-hamood-cv-ar.pdf" : "/cv/gamal-hamood-cv.pdf"}
                download
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#d4af37]/40 text-[#d4af37] font-semibold text-sm hover:bg-[#d4af37]/10 transition-colors"
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                {t.heroDownloadCV}
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className={`grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 ${isRTL ? 'lg:order-1' : 'lg:order-2'}`}
          >
            {highlights.map((item, index) => (
              <TiltCard key={index}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="group bg-gray-50 dark:bg-gray-900 border border-[#d4af37]/20 rounded-xl p-3 sm:p-4 text-center card-hover h-full"
                >
                  <motion.div
                    className={`w-10 sm:w-12 h-10 sm:h-12 mx-auto mb-2 sm:mb-3 rounded-xl bg-gradient-to-br ${item.color} p-0.5`}
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className={`w-full h-full rounded-[10px] flex items-center justify-center ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}>
                      <item.icon className="w-5 sm:w-6 h-5 sm:h-6 text-[#d4af37]" />
                    </div>
                  </motion.div>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium group-hover:text-[#d4af37] transition-colors">
                    {item.label}
                  </p>
                </motion.div>
              </TiltCard>
            ))}
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}

function SkillsSection() {
  const { t, isRTL } = useLanguage();
  const { theme } = useTheme();
  
  const skillCategories = [
    {
      title: t.skillsDesign,
      icon: Palette,
      color: "#d4af37",
      skills: [
        t.skillGraphicDesign,
        t.skillSocialMediaDesign,
        t.skillWebsiteDesign,
        t.skillUIUX,
        t.skillResponsiveWeb,
        t.skillPhotoshop,
        t.skillIllustrator,
        t.skillInDesign,
        t.skillCanva,
      ],
    },
    {
      title: t.skillsDevelopment,
      icon: Code,
      color: "#f59e0b",
      skills: [
        t.skillHTML,
        t.skillCSS,
        t.skillJavaScript,
        t.skillReact,
        t.skillBootstrap,
        t.skillPHP,
        t.skillLaravel,
        t.skillMySQL,
        t.skillAPIs,
      ],
    },
    {
      title: t.skillsTools,
      icon: Layers,
      color: "#fbbf24",
      skills: [
        t.skillAIPrompt,
        t.skillGit,
        t.skillWord,
        t.skillExcel,
        t.skillPowerPoint,
        t.skillAccess,
      ],
    },
    {
      title: t.skillsProfessional,
      icon: Award,
      color: "#d4af37",
      skills: [
        t.skillProblemSolving,
        t.skillTimeManagement,
        t.skillTeamCoordination,
        t.skillClientSupport,
        t.skillCommunication,
        t.skillFastLearning,
      ],
    },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <AnimatedSection id="skills" className={`py-16 sm:py-24 relative ${theme === "dark" ? "bg-[#0a0a0a]" : "bg-gray-50"}`}>
      <div className="absolute inset-0 grid-pattern opacity-20" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12 sm:mb-16"
        >
          <Badge className="bg-[#d4af37]/10 text-[#d4af37] border-[#d4af37]/30 mb-4">
            <Sparkles className="w-3 h-3 mr-2" />
            {t.skillsBadge}
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t.skillsTitle1} <span className="gold-gradient-animated">{t.skillsTitle2}</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            {t.skillsDescription}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.15 }}
              className="group"
            >
              <TiltCard>
                <div className={`rounded-2xl p-4 sm:p-6 card-hover h-full border border-[#d4af37]/20 ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}>
                  <div className={`flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <motion.div
                      className="w-10 sm:w-14 h-10 sm:h-14 rounded-xl flex items-center justify-center relative overflow-hidden shrink-0"
                      style={{ background: `linear-gradient(135deg, ${category.color}20, ${category.color}10)` }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <motion.div
                        className="absolute inset-0"
                        style={{
                          background: `linear-gradient(135deg, ${category.color}40, transparent)`,
                        }}
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.5 }}
                      />
                      <category.icon className="w-5 sm:w-7 h-5 sm:h-7 relative z-10" style={{ color: category.color }} />
                    </motion.div>
                    <div className={isRTL ? 'text-right' : ''}>
                      <h3 className="text-base sm:text-xl font-semibold text-gray-900 dark:text-white group-hover:text-[#d4af37] transition-colors">
                        {category.title}
                      </h3>
                      <p className="text-gray-500 text-xs sm:text-sm">{category.skills.length} {t.skillsCount}</p>
                    </div>
                  </div>

                  <ul className={`flex flex-wrap gap-2 list-none p-0 m-0 ${isRTL ? 'justify-end' : ''}`}>
                    {category.skills.map((skill, skillIndex) => (
                      <motion.li
                        key={skillIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.25 + skillIndex * 0.04, duration: 0.4 }}
                      >
                        <span
                          className="skill-pill border text-gray-600 dark:text-gray-300"
                          style={{
                            borderColor: `${category.color}30`,
                            background: `${category.color}0d`,
                          }}
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ background: category.color }}
                            aria-hidden="true"
                          />
                          {skill}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

const serviceIcons = { globe: Globe, palette: Palette, megaphone: Megaphone } as const;

function ServicesSection() {
  const { t, language, isRTL } = useLanguage();
  const { theme } = useTheme();

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <AnimatedSection id="services" className={`py-16 sm:py-24 relative ${theme === "dark" ? "bg-[#0a0a0a]" : "bg-gray-50"}`}>
      <div className="absolute inset-0 grid-pattern opacity-15" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12 sm:mb-16"
        >
          <Badge className="bg-[#d4af37]/10 text-[#d4af37] border-[#d4af37]/30 mb-4">
            <Sparkles className="w-3 h-3 mr-2" aria-hidden="true" />
            {t.servicesBadge}
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t.servicesTitle1} <span className="gold-gradient-animated">{t.servicesTitle2}</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            {t.servicesDescription}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {services.map((service, index) => {
            const Icon = serviceIcons[service.icon];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.12, duration: 0.5 }}
                className={`flex flex-col rounded-2xl p-6 sm:p-7 border border-[#d4af37]/20 hover-lift ${
                  theme === "dark" ? "bg-gray-900" : "bg-white"
                } ${isRTL ? "text-right" : ""}`}
              >
                <div className={`flex items-center gap-3 mb-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <span className="w-11 h-11 rounded-xl bg-[#d4af37]/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-[#d4af37]" aria-hidden="true" />
                  </span>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                    {service.title[language]}
                  </h3>
                </div>

                <ul className={`space-y-2.5 mb-5 flex-1 list-none p-0 m-0 ${isRTL ? "text-right" : ""}`}>
                  {service.includes[language].map((item, i) => (
                    <li key={i} className={`flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300 ${isRTL ? "flex-row-reverse" : ""}`}>
                      <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>


                <Button
                  asChild
                  className="w-full bg-[#25D366] hover:bg-[#1eb855] text-white font-semibold text-sm"
                >
                  <a
                    href={serviceWaLink(service, language)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className={`w-4 h-4 ${isRTL ? "ml-2" : "mr-2"}`} aria-hidden="true" />
                    {t.servicesStart}
                  </a>
                </Button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}

function ProjectsSection() {
  const { t, language, isRTL } = useLanguage();
  const { theme } = useTheme();

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <AnimatedSection id="projects" className="py-16 sm:py-24 relative">
      <div className="absolute inset-0 grid-pattern opacity-10" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12 sm:mb-16"
        >
          <Badge className="bg-[#d4af37]/10 text-[#d4af37] border-[#d4af37]/30 mb-4">
            <Sparkles className="w-3 h-3 mr-2" aria-hidden="true" />
            {t.projectsBadge}
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t.projectsTitle1} <span className="gold-gradient-animated">{t.projectsTitle2}</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            {t.projectsDescription}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {caseStudies.map((project, index) => (
            <article
              key={project.title}
              className={`group rounded-2xl overflow-hidden border border-[#d4af37]/20 hover-lift ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}
            >
              <div className="relative h-52 sm:h-60 overflow-hidden">
                {/* Screenshot slides in from the inline-start side (flips in RTL) */}
                <motion.div
                  className="absolute inset-0"
                  initial={{ opacity: 0, x: isRTL ? 24 : -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <Image
                    src={project.image}
                    alt={`${project.title} — ${language === "ar" ? "لقطة من الموقع" : "website screenshot"}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 512px"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${theme === "dark" ? "from-gray-900/80" : "from-white/80"} via-transparent to-transparent`} aria-hidden="true" />
                  <div className={`absolute top-4 ${isRTL ? "left-4" : "right-4"} flex gap-2 flex-wrap`}>
                    {project.tags[language].map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-1 bg-black/55 backdrop-blur-sm text-[#d4af37] rounded-full border border-[#d4af37]/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Case study body */}
              <FadeIn delay={index * 0.1 + 0.15} distance={16} className={`p-5 sm:p-6 ${isRTL ? "text-right" : ""}`}>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-[#d4af37] transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#d4af37] mb-3">{project.role[language]}</p>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {project.context[language]}
                </p>

                <h4 className="section-label text-gray-500 dark:text-gray-400 mb-2">{t.caseDid}</h4>
                <ul className={`space-y-1.5 mb-4 list-none p-0 m-0`}>
                  {project.did[language].map((item, i) => (
                    <li key={i} className={`flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300 ${isRTL ? "flex-row-reverse" : ""}`}>
                      <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {project.link && (
                  <Button
                    asChild
                    className="w-full bg-transparent border-2 border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-white font-semibold group/btn text-sm transition-all duration-300"
                  >
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className={`w-4 h-4 group-hover/btn:rotate-45 transition-transform ${isRTL ? "ml-2" : "mr-2"}`} aria-hidden="true" />
                      {t.projectVisitWebsite}
                    </a>
                  </Button>
                )}
              </FadeIn>
            </article>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

// Graphic Design Works Section with Infinite Scrolling Carousel
function GraphicDesignWorksSection() {
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
              ? { x: isRTL ? [0, 7500] : [0, -7500] }
              : undefined
          }
          transition={{
            x: {
              duration: 120,
              repeat: Infinity,
              ease: "linear",
            },
          }}
          style={{
            width: "fit-content",
          }}
        >
          {/* Duplicate items for seamless loop — clones hidden from assistive tech */}
          {[...designs, ...designs, ...designs].map((design, index) => (
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

function ExperienceSection() {
  const { t, isRTL } = useLanguage();
  const { theme } = useTheme();

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const work = [t.expWork1, t.expWork2, t.expWork3];

  return (
    <AnimatedSection id="experience" className={`py-16 sm:py-24 relative ${theme === "dark" ? "bg-[#0a0a0a]" : "bg-gray-50"}`}>
      <div className="absolute inset-0 grid-pattern opacity-15" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12 sm:mb-16"
        >
          <Badge className="bg-[#d4af37]/10 text-[#d4af37] border-[#d4af37]/30 mb-4">
            <Sparkles className="w-3 h-3 mr-2" aria-hidden="true" />
            {t.experienceBadge}
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t.experienceTitle1} <span className="gold-gradient-animated">{t.experienceTitle2}</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <article className={`relative rounded-2xl p-6 sm:p-8 border border-[#d4af37]/20 ${theme === "dark" ? "bg-gray-900" : "bg-white"} ${isRTL ? "text-right" : ""}`}>
            <div className={`flex flex-wrap items-start justify-between gap-3 mb-4 ${isRTL ? "flex-row-reverse" : ""}`}>
              <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                <span className="w-12 h-12 rounded-xl bg-[#d4af37]/10 flex items-center justify-center shrink-0">
                  <Briefcase className="w-6 h-6 text-[#d4af37]" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                    {t.expRole}
                  </h3>
                  <p className="text-sm text-[#d4af37] font-medium">{t.expPeriod}</p>
                </div>
              </div>
            </div>

            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-5">
              {t.expScope}
            </p>

            <h4 className="section-label text-gray-500 dark:text-gray-400 mb-3">{t.expWorkLabel}</h4>
            <ul className="space-y-2.5 list-none p-0 m-0">
              {work.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: isRTL ? 16 : -16 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.35 + i * 0.1 }}
                  className={`flex items-start gap-2.5 text-sm sm:text-base text-gray-700 dark:text-gray-300 ${isRTL ? "flex-row-reverse" : ""}`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] shrink-0 mt-2" aria-hidden="true" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </article>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

function LanguagesSection() {
  const { t, isRTL } = useLanguage();
  const { theme } = useTheme();
  
  const languages = [
    { name: t.languageArabic, level: t.languageNative },
    { name: t.languageEnglish, level: t.languageVeryGood },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <AnimatedSection id="languages" className={`py-16 sm:py-24 relative ${theme === "dark" ? "bg-[#0a0a0a]" : "bg-gray-50"}`}>
      <div className="absolute inset-0 grid-pattern opacity-15" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12 sm:mb-16"
        >
          <Badge className="bg-[#d4af37]/10 text-[#d4af37] border-[#d4af37]/30 mb-4">
            <Sparkles className="w-3 h-3 mr-2" />
            {t.languagesBadge}
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t.languagesTitle1} <span className="gold-gradient-animated">{t.languagesTitle2}</span>
          </h2>
        </motion.div>

        <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6">
          {languages.map((lang, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? (isRTL ? 50 : -50) : (isRTL ? -50 : 50) }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.2 }}
            >
              <TiltCard>
                <div className={`rounded-xl p-4 sm:p-6 card-hover group border border-[#d4af37]/20 ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}>
                  <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <LanguagesIcon className="w-5 h-5 text-[#d4af37]" aria-hidden="true" />
                      </motion.div>
                      <span className="text-base sm:text-lg font-medium text-gray-900 dark:text-white group-hover:text-[#d4af37] transition-colors">
                        {lang.name}
                      </span>
                    </div>
                    <Badge className="bg-[#d4af37]/10 text-[#d4af37] border-[#d4af37]/30 text-xs sm:text-sm">
                      {lang.level}
                    </Badge>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

function ContactSection() {
  const { t, isRTL } = useLanguage();
  const { theme } = useTheme();
  
  const waLink = `https://wa.me/966552962213?text=${encodeURIComponent(t.contactWaPrefill)}`;

  const contactInfo = [
    {
      icon: MessageCircle,
      label: t.contactWhatsApp,
      value: "+966 55 296 2213",
      link: "https://wa.me/966552962213",
      color: "#25D366",
    },
    {
      icon: Mail,
      label: t.contactEmail,
      value: "gamalabdlhafez263@gmail.com",
      link: "mailto:gamalabdlhafez263@gmail.com",
      color: "#d4af37",
    },
    {
      icon: Linkedin,
      label: t.contactLinkedIn,
      value: "linkedin.com/in/gamal-abdlhafez",
      link: "https://linkedin.com/in/gamal-abdlhafez-2b9436289",
      color: "#0A66C2",
    },
    {
      icon: MapPin,
      label: t.contactLocation,
      value: t.heroLocation,
      link: null,
      color: "#d4af37",
    },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <AnimatedSection id="contact" className="py-16 sm:py-24 relative">
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
            {t.contactBadge}
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t.contactTitle1} <span className="gold-gradient-animated">{t.contactTitle2}</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            {t.contactDescription}
          </p>
        </motion.div>

        <div className={`grid lg:grid-cols-2 gap-8 lg:gap-12 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className={isRTL ? 'lg:order-2' : ''}
          >
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
              {t.contactInfoTitle}
            </h3>
            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ x: isRTL ? -10 : 10, scale: 1.02 }}
                  className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl group cursor-pointer border border-[#d4af37]/20 ${
                    info.link ? "hover:border-[#d4af37]/40" : ""
                  } ${isRTL ? 'flex-row-reverse' : ''} ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}
                  onClick={() => info.link && window.open(info.link, "_blank")}
                >
                  <motion.div
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center relative overflow-hidden shrink-0"
                    style={{ background: `${info.color}15` }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <motion.div
                      className="absolute inset-0"
                      style={{ background: `${info.color}20` }}
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <info.icon className="w-4 sm:w-5 h-4 sm:h-5 relative z-10" style={{ color: info.color }} />
                  </motion.div>
                  <div className={isRTL ? 'text-right' : ''}>
                    <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">{info.label}</p>
                    <p className="text-gray-900 dark:text-white font-medium group-hover:text-[#d4af37] transition-colors text-sm sm:text-base">
                      {info.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className={isRTL ? 'lg:order-1' : ''}
          >
            <Card className={`rounded-2xl border-[#d4af37]/20 overflow-hidden ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}>
              <div className="h-1 bg-gradient-to-r from-[#d4af37] via-[#f59e0b] to-[#d4af37]" />

              <CardContent className={`p-6 sm:p-8 ${isRTL ? 'text-right' : ''}`}>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {t.contactCardTitle}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed mb-6">
                  {t.contactCardText}
                </p>

                <MagneticButton className="w-full">
                  <Button
                    asChild
                    className="w-full bg-[#25D366] hover:bg-[#1eb855] text-white py-6 sm:py-7 text-base sm:text-lg font-bold shadow-lg shadow-green-500/20"
                  >
                    <a href={waLink} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} aria-hidden="true" />
                      {t.contactChatWhatsApp}
                    </a>
                  </Button>
                </MagneticButton>

                <p className="mt-3 text-xs text-gray-500 dark:text-gray-400 text-center">
                  {t.contactReply}
                </p>

                <div className="flex items-center gap-3 my-5" aria-hidden="true">
                  <span className="flex-1 h-px bg-[#d4af37]/15" />
                  <span className="text-xs text-gray-400">•</span>
                  <span className="flex-1 h-px bg-[#d4af37]/15" />
                </div>

                <Button
                  asChild
                  variant="outline"
                  className="w-full border-[#d4af37]/40 text-[#d4af37] hover:bg-[#d4af37]/10 text-sm"
                >
                  <a href="mailto:gamalabdlhafez263@gmail.com">
                    <Mail className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} aria-hidden="true" />
                    {t.contactSendEmail}
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}

// Floating WhatsApp CTA — mobile only, appears after scrolling past the hero
function FloatingWhatsApp() {
  const { t, isRTL } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.9);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          href={`https://wa.me/966552962213?text=${encodeURIComponent(t.contactWaPrefill)}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t.heroWhatsAppMe}
          className={`sm:hidden fixed bottom-6 ${isRTL ? "right-5" : "left-5"} z-40 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xl shadow-green-500/30`}
          whileTap={{ scale: 0.9 }}
        >
          <MessageCircle className="w-7 h-7" aria-hidden="true" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}

function Footer() {
  const { t, isRTL } = useLanguage();
  const { theme } = useTheme();
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer className={`border-t border-[#d4af37]/20 py-8 sm:py-12 relative ${theme === "dark" ? "bg-[#0a0a0a]" : "bg-white"}`}>
      <div className="absolute inset-0 grid-pattern opacity-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`flex flex-col md:flex-row items-center justify-between gap-6 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className={`text-center ${isRTL ? 'md:text-right' : 'md:text-left'}`}
          >
            <motion.h3
              className="text-lg sm:text-xl font-bold gold-gradient-animated mb-2"
              whileHover={{ scale: 1.05 }}
            >
              {t.footerName}
            </motion.h3>
            <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
              {t.footerTitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 sm:gap-4"
          >
            {[
              { icon: MessageCircle, href: "https://wa.me/966552962213", color: "#25D366" },
              { icon: Linkedin, href: "https://linkedin.com/in/gamal-abdlhafez-2b9436289", color: "#0A66C2" },
              { icon: Mail, href: "mailto:gamalabdlhafez263@gmail.com", color: "#d4af37" },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400 transition-all duration-300 hover:scale-110 border border-[#d4af37]/20 ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}
                style={{ 
                  "--hover-color": social.color 
                } as React.CSSProperties}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = social.color;
                  e.currentTarget.style.color = social.color;
                  e.currentTarget.style.boxShadow = `0 0 15px ${social.color}30`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(212, 175, 55, 0.2)";
                  e.currentTarget.style.color = theme === "dark" ? "#9ca3af" : "#6b7280";
                  e.currentTarget.style.boxShadow = "none";
                }}
                whileTap={{ scale: 0.9 }}
              >
                <social.icon className="w-4 sm:w-5 h-4 sm:h-5" />
              </motion.a>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className={`text-gray-500 text-xs sm:text-sm text-center ${isRTL ? 'md:text-left' : 'md:text-right'}`}
          >
            © {new Date().getFullYear()} {t.footerName}. {t.footerCopyright}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-[#d4af37]/10"
        >
          <p className="text-gray-500 text-xs">
            {t.footerDesignBy}
          </p>
        </motion.div>
      </div>

      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={scrollToTop}
            aria-label="Back to top"
            className={`fixed bottom-6 sm:bottom-8 ${isRTL ? 'left-6 sm:left-8' : 'right-6 sm:right-8'} w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-[#d4af37] to-[#f59e0b] text-white rounded-full flex items-center justify-center shadow-lg z-40 btn-glow`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <ChevronUp className="w-5 sm:w-6 h-5 sm:h-6" />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}

// Main Page Component
function PortfolioContent() {
  const { theme } = useTheme();

  const { t } = useLanguage();

  return (
    <main id="main-content" className={`min-h-screen overflow-x-hidden relative ${theme === "dark" ? "bg-[#0a0a0a] text-white" : "bg-white text-gray-900"}`}>
      <a href="#about" className="skip-link">
        {t.skipToContent}
      </a>
      <ScrollProgress />
      <GradientOrbs />

      <div className="mood-light-1" aria-hidden="true" />
      <div className="mood-light-2" aria-hidden="true" />
      <div className="ambient-vignette" aria-hidden="true" />

      <div className="noise-overlay" aria-hidden="true" />

      <Navigation />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <GraphicDesignWorksSection />
      <SkillsSection />
      <ExperienceSection />
      <CertificatesSection />
      <LanguagesSection />
      <ContactSection />
      <FloatingWhatsApp />
      <Footer />
    </main>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <MotionConfig reducedMotion="user">
          <PortfolioContent />
        </MotionConfig>
      </LanguageProvider>
    </ThemeProvider>
  );
}
