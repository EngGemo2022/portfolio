"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Language, Translations, translations } from "@/lib/translations";

// ============================================
// THEME CONTEXT
// ============================================

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Helper to get initial theme synchronously
function getSystemTheme(): Theme {
  if (typeof window !== 'undefined' && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  return "light";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Use lazy initializer to read from localStorage only once on mount
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === "dark" || savedTheme === "light") {
        return savedTheme;
      }
      return getSystemTheme();
    }
    return "dark";
  });

  // Apply theme to document and save to localStorage
  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState(prev => prev === "dark" ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

// ============================================
// LANGUAGE CONTEXT & TRANSLATIONS
// ============================================

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

let cachedInitialLanguage: Language | undefined = undefined;

// Arabic is the default: the primary audience is Saudi businesses.
function getInitialLanguage(): Language {
  if (cachedInitialLanguage !== undefined) {
    return cachedInitialLanguage;
  }
  if (typeof window !== 'undefined') {
    const savedLang = localStorage.getItem("language") as Language;
    cachedInitialLanguage = (savedLang === "ar" || savedLang === "en") ? savedLang : "ar";
  } else {
    cachedInitialLanguage = "ar";
  }
  return cachedInitialLanguage;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    localStorage.setItem("language", language);
    cachedInitialLanguage = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
    isRTL: language === "ar",
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
