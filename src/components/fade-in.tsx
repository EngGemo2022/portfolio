"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/components/providers";

type Direction = "up" | "start" | "end" | "none";

/**
 * Reusable scroll-entrance wrapper.
 *
 * - Animates transform + opacity only (no layout properties → CLS stays 0).
 * - Fires once per element (`viewport.once`), at 20% visibility.
 * - `start`/`end` are logical directions: they flip automatically in RTL.
 * - Under prefers-reduced-motion, movement is dropped (opacity only).
 * - Content is always in the server-rendered DOM; only visually animated.
 */
export function FadeIn({
  children,
  delay = 0,
  direction = "up",
  distance = 20,
  className,
}: {
  children: ReactNode;
  delay?: number;
  direction?: Direction;
  distance?: number;
  className?: string;
}) {
  const { isRTL } = useLanguage();
  const reduceMotion = useReducedMotion();

  const offset =
    direction === "up"
      ? { y: distance }
      : direction === "start"
        ? { x: (isRTL ? 1 : -1) * distance }
        : direction === "end"
          ? { x: (isRTL ? -1 : 1) * distance }
          : {};

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}
