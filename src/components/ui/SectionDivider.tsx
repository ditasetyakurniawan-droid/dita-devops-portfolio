"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface SectionDividerProps {
  label?: string;
  accentColor?: "purple" | "cyan" | "emerald";
}

export function SectionDivider({
  label,
  accentColor = "purple",
}: SectionDividerProps) {
  const dividerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: dividerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.15,
  });

  // Continuous expansion & luminescence on scroll
  const scaleX = useTransform(smoothProgress, [0, 0.4, 0.6, 1], [0.3, 1, 1, 0.3]);
  const opacity = useTransform(smoothProgress, [0, 0.35, 0.65, 1], [0.2, 1, 1, 0.25]);

  const colorConfig = {
    purple: {
      lineGradient: "from-transparent via-purple-500/50 to-transparent",
      beamColor: "via-purple-400",
      glowBg: "bg-purple-900/25",
      chipBorder: "border-purple-500/40",
      chipText: "text-purple-200",
      iconColor: "text-purple-400",
    },
    cyan: {
      lineGradient: "from-transparent via-cyan-500/50 to-transparent",
      beamColor: "via-cyan-400",
      glowBg: "bg-cyan-900/25",
      chipBorder: "border-cyan-500/40",
      chipText: "text-cyan-200",
      iconColor: "text-cyan-400",
    },
    emerald: {
      lineGradient: "from-transparent via-emerald-500/50 to-transparent",
      beamColor: "via-emerald-400",
      glowBg: "bg-emerald-900/25",
      chipBorder: "border-emerald-500/40",
      chipText: "text-emerald-200",
      iconColor: "text-emerald-400",
    },
  }[accentColor];

  return (
    <div
      ref={dividerRef}
      className="relative my-8 sm:my-14 flex items-center justify-center overflow-hidden py-4"
    >
      {/* Background Soft Glow Aura */}
      <motion.div
        style={{ opacity }}
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[130px] ${colorConfig.glowBg} blur-[95px] pointer-events-none rounded-full`}
        aria-hidden="true"
      />

      {/* Main Base Line with Dynamic Scroll Expansion */}
      <motion.div
        style={{ scaleX, opacity }}
        className={`relative h-[1.5px] w-full max-w-4xl bg-gradient-to-r ${colorConfig.lineGradient} origin-center will-change-transform`}
      >
        {/* Animated Specular Laser Light Sweep */}
        {!reduceMotion && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{
              repeat: Infinity,
              duration: 3.8,
              ease: "easeInOut",
              repeatDelay: 1.2,
            }}
            className={`absolute top-0 bottom-0 w-72 bg-gradient-to-r from-transparent ${colorConfig.beamColor} to-transparent blur-[1.5px] opacity-90`}
            aria-hidden="true"
          />
        )}
      </motion.div>

      {/* Center Illuminated Chip / Emblem */}
      {label ? (
        <motion.div
          style={{ opacity }}
          className={`absolute flex items-center gap-2 rounded-full border ${colorConfig.chipBorder} bg-[#06081e]/90 px-4 py-1.5 text-[11px] font-mono ${colorConfig.chipText} shadow-[0_0_25px_rgba(0,0,0,0.9),0_0_15px_rgba(168,85,247,0.25)] backdrop-blur-2xl`}
        >
          <Sparkles className={`size-3.5 ${colorConfig.iconColor} animate-pulse`} />
          <span className="tracking-wider uppercase font-semibold">{label}</span>
        </motion.div>
      ) : (
        <motion.div
          style={{ opacity }}
          className={`absolute flex size-6 items-center justify-center rounded-full border ${colorConfig.chipBorder} bg-[#06081e] shadow-[0_0_15px_rgba(168,85,247,0.4)] backdrop-blur-xl`}
        >
          <span className={`size-1.5 rounded-full ${colorConfig.iconColor} bg-current animate-ping`} />
        </motion.div>
      )}
    </div>
  );
}
