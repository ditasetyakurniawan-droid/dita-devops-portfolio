"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { ArrowUp, Command } from "lucide-react";

export function FloatingQuickAction() {
  const { scrollY, scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const unsubscribeScroll = scrollY.on("change", (latest) => {
      setVisible(latest > 350);
    });

    const unsubscribeProgress = scrollYProgress.on("change", (latest) => {
      setScrollPercent(Math.round(latest * 100));
    });

    return () => {
      unsubscribeScroll();
      unsubscribeProgress();
    };
  }, [scrollY, scrollYProgress]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openCommandPalette = () => {
    window.dispatchEvent(new CustomEvent("open-command-menu"));
  };

  // SVG circular ring calculations (r = 16, circumference = 2 * pi * 16 ≈ 100.53)
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollPercent / 100) * circumference;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 25 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2"
        >
          {/* Quick Command Menu Trigger */}
          <button
            type="button"
            onClick={openCommandPalette}
            aria-label="Buka Command Menu (⌘K)"
            title="Buka Command Menu (⌘K)"
            className="group relative hidden sm:flex size-11 items-center justify-center rounded-full border border-white/15 bg-[#07091e]/90 text-slate-300 shadow-[0_8px_30px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-200 hover:border-purple-400/60 hover:bg-white/10 hover:text-white hover:scale-105 active:scale-95"
          >
            <Command className="size-4 text-purple-300 group-hover:text-purple-200 transition-colors" />
            <span className="sr-only">Buka Command Menu</span>
          </button>

          {/* Scroll to Top with Circular Progress Indicator */}
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Kembali ke atas"
            title={`Kembali ke atas (${scrollPercent}%)`}
            className="group relative flex size-12 items-center justify-center rounded-full border border-white/15 bg-[#07091e]/90 text-white shadow-[0_8px_30px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-200 hover:border-cyan-400/60 hover:bg-white/10 hover:scale-105 active:scale-95"
          >
            {/* Circular Progress Ring */}
            <svg
              className="absolute inset-0 size-full -rotate-90 pointer-events-none p-1"
              viewBox="0 0 40 40"
              aria-hidden="true"
            >
              {/* Background circle */}
              <circle
                cx="20"
                cy="20"
                r={radius}
                className="stroke-white/10"
                strokeWidth="2.5"
                fill="none"
              />
              {/* Animated Progress circle */}
              <circle
                cx="20"
                cy="20"
                r={radius}
                className="stroke-cyan-400 transition-[stroke-dashoffset] duration-150"
                strokeWidth="2.5"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>

            {/* Inner Arrow Icon */}
            <ArrowUp className="size-4 text-cyan-300 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:text-cyan-200" />
            <span className="sr-only">Kembali ke atas halaman</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
