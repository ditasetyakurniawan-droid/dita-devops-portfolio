"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface SectionDividerProps {
  label?: string;
  accentColor?: "purple" | "cyan" | "emerald";
}

export function SectionDivider({
  label,
  accentColor = "purple",
}: SectionDividerProps) {
  const reduceMotion = useReducedMotion();

  const colorConfig = {
    purple: {
      lineGradient: "from-transparent via-purple-500/40 to-transparent",
      beamColor: "via-purple-400",
      glowBg: "bg-purple-900/20",
      chipBorder: "border-purple-500/30",
      chipText: "text-purple-300",
      iconColor: "text-purple-400",
    },
    cyan: {
      lineGradient: "from-transparent via-cyan-500/40 to-transparent",
      beamColor: "via-cyan-400",
      glowBg: "bg-cyan-900/20",
      chipBorder: "border-cyan-500/30",
      chipText: "text-cyan-300",
      iconColor: "text-cyan-400",
    },
    emerald: {
      lineGradient: "from-transparent via-emerald-500/40 to-transparent",
      beamColor: "via-emerald-400",
      glowBg: "bg-emerald-900/20",
      chipBorder: "border-emerald-500/30",
      chipText: "text-emerald-300",
      iconColor: "text-emerald-400",
    },
  }[accentColor];

  return (
    <div className="relative my-8 sm:my-14 flex items-center justify-center overflow-hidden py-4">
      {/* Background Soft Glow Aura */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[120px] ${colorConfig.glowBg} blur-[90px] pointer-events-none rounded-full`}
        aria-hidden="true"
      />

      {/* Main Base Line with Gradient Fade */}
      <div className={`relative h-[1.5px] w-full max-w-4xl bg-gradient-to-r ${colorConfig.lineGradient}`}>
        {/* Animated Specular Laser Light Sweep */}
        {!reduceMotion && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut",
              repeatDelay: 1.5,
            }}
            className={`absolute top-0 bottom-0 w-64 bg-gradient-to-r from-transparent ${colorConfig.beamColor} to-transparent blur-[1px] opacity-80`}
            aria-hidden="true"
          />
        )}
      </div>

      {/* Center Illuminated Chip / Emblem */}
      {label ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`absolute flex items-center gap-2 rounded-full border ${colorConfig.chipBorder} bg-[#06081e]/90 px-3.5 py-1 text-[11px] font-mono ${colorConfig.chipText} shadow-[0_0_20px_rgba(0,0,0,0.8)] backdrop-blur-xl`}
        >
          <Sparkles className={`size-3 ${colorConfig.iconColor} animate-pulse`} />
          <span>{label}</span>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`absolute flex size-6 items-center justify-center rounded-full border ${colorConfig.chipBorder} bg-[#06081e] shadow-[0_0_15px_rgba(168,85,247,0.4)] backdrop-blur-xl`}
        >
          <span className={`size-1.5 rounded-full ${colorConfig.iconColor} bg-current animate-ping`} />
        </motion.div>
      )}
    </div>
  );
}
