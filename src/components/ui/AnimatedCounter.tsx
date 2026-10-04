"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface AnimatedCounterProps {
  value: string;
  className?: string;
  duration?: number;
}

export function AnimatedCounter({ value, className = "", duration = 1.6 }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduceMotion = useReducedMotion();

  // Extract number and suffix, e.g. "200+" -> numeric: 200, suffix: "+"
  const match = value.match(/^(\d+)(.*)$/);
  const targetNumber = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : "";

  const [displayNumber, setDisplayNumber] = useState(reduceMotion ? targetNumber : 0);

  useEffect(() => {
    if (!inView || reduceMotion || !targetNumber) return;

    let start = 0;
    const end = targetNumber;
    const startTime = performance.now();
    const durationMs = duration * 1000;

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      
      // Easing function: easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(ease * (end - start) + start);

      setDisplayNumber(current);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setDisplayNumber(end);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [inView, targetNumber, duration, reduceMotion]);

  if (!match) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {displayNumber}
      {suffix}
    </span>
  );
}
