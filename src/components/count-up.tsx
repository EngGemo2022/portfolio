"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

/**
 * Count-up number for stats.
 *
 * The real value is rendered from the very first paint (no SEO-invisible
 * content, no "0+" flash in server HTML); when the element enters the
 * viewport the number replays from 0 as a progressive enhancement.
 * Skipped entirely under prefers-reduced-motion.
 */
export function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const controls = animate(0, value, {
      type: "spring",
      duration: 1.2,
      bounce: 0,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduceMotion, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}
