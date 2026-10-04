"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";

interface SectionSlideProps {
  children: React.ReactNode;
  targetId?: string;
  className?: string;
  intensity?: "normal" | "subtle" | "prominent";
}

export function SectionSlide({
  children,
  targetId,
  className = "",
  intensity = "normal",
}: SectionSlideProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [isArriving, setIsArriving] = useState(false);

  // Continuous Scroll-Driven Physics (Liquid parallax on every scroll up & down)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Smooth out discrete mouse wheel ticks into velvet fluid inertia
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 24,
    mass: 0.15,
  });

  // Calculate dynamic offsets based on intensity
  const yRange = intensity === "prominent" ? [75, 0, 0, -75] : intensity === "subtle" ? [35, 0, 0, -35] : [55, 0, 0, -55];
  const scaleRange = intensity === "prominent" ? [0.93, 1, 1, 0.94] : intensity === "subtle" ? [0.97, 1, 1, 0.98] : [0.95, 1, 1, 0.96];

  // Motion values responding continuously on EVERY scroll up and down
  const y = useTransform(smoothProgress, [0, 0.22, 0.78, 1], yRange);
  const scale = useTransform(smoothProgress, [0, 0.22, 0.78, 1], scaleRange);
  const opacity = useTransform(smoothProgress, [0, 0.18, 0.82, 1], [0.35, 1, 1, 0.4]);

  // Listen for menu bar click "arrival" event
  useEffect(() => {
    if (!targetId) return;

    const handleArrival = (e: Event) => {
      const customEvent = e as CustomEvent<{ id: string }>;
      if (customEvent.detail?.id === targetId) {
        setIsArriving(true);
        setTimeout(() => setIsArriving(false), 1400);
      }
    };

    window.addEventListener("section-arrival", handleArrival);
    return () => window.removeEventListener("section-arrival", handleArrival);
  }, [targetId]);

  if (reduceMotion) {
    return (
      <div ref={containerRef} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative isolate ${className}`}>
      {/* Dramatic Arrival Aurora Sweep when clicked from navbar */}
      {isArriving && (
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: [0, 0.9, 0], scale: [0.95, 1.02, 1] }}
          transition={{ duration: 1.3, ease: "easeOut" }}
          className="pointer-events-none absolute -inset-6 z-20 rounded-3xl bg-gradient-to-r from-purple-500/25 via-cyan-400/30 to-purple-500/25 blur-2xl shadow-[0_0_80px_rgba(168,85,247,0.4)]"
          aria-hidden="true"
        />
      )}

      {/* Continuous Scroll Motion Container */}
      <motion.div
        style={{
          y,
          scale,
          opacity,
        }}
        className="size-full will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
