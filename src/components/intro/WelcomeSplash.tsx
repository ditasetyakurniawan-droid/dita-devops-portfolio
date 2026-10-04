"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { BrandIcon } from "@/components/icons/BrandIcon";

export function WelcomeSplash() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Show splash once per session
    const hasSeenSplash = sessionStorage.getItem("seen_devops_splash_v1");
    if (!hasSeenSplash) {
      setIsOpen(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsOpen(false);
    sessionStorage.setItem("seen_devops_splash_v1", "true");
  };

  if (!mounted || !isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#030014]/95 backdrop-blur-2xl px-5 text-center"
        >
          {/* Ambient cosmic lighting */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-purple-600/25 via-indigo-600/20 to-cyan-500/20 blur-[130px] animate-pulse" />
            <div className="absolute top-1/4 left-1/3 w-72 h-72 rounded-full bg-purple-500/15 blur-[90px]" />
          </div>

          {/* Floating tech icons */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              animate={{ y: [-15, 15, -15], rotate: [0, 10, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[22%] left-[20%] opacity-70 drop-shadow-[0_0_18px_rgba(168,85,247,0.45)]"
            >
              <BrandIcon brand="kubernetes" className="size-12" />
            </motion.div>
            <motion.div
              animate={{ y: [12, -18, 12], rotate: [0, -8, 8, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[28%] right-[22%] opacity-70 drop-shadow-[0_0_18px_rgba(6,182,212,0.45)]"
            >
              <BrandIcon brand="docker" className="size-11" />
            </motion.div>
            <motion.div
              animate={{ y: [-10, 14, -10] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-[26%] left-[25%] opacity-70 drop-shadow-[0_0_18px_rgba(99,102,241,0.45)]"
            >
              <BrandIcon brand="jenkins" className="size-10" />
            </motion.div>
          </div>

          {/* Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative z-10 max-w-lg"
          >
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-950/40 px-4 py-1.5 text-xs text-purple-200 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(168,85,247,0.25)]">
              <Sparkles className="size-3.5 text-cyan-300" />
              <span>Enterprise DevOps & Platform Engineer</span>
            </div>

            {/* Glowing Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
              Welcome To My <br />
              <span className="bg-gradient-to-r from-cyan-300 via-indigo-200 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(168,85,247,0.5)]">
                Portfolio Website
              </span>
            </h1>

            <p className="mt-5 text-sm sm:text-base text-slate-300 max-w-md mx-auto leading-relaxed">
              Dita Setya Kurniawan · Pengelolaan CI/CD 200+ Microservices di BRI & Arsitektur Klaster Kubernetes Multi-VM dari 0.
            </p>

            {/* Action button */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={handleDismiss}
                className="neon-button-primary inline-flex items-center gap-3 px-8 py-3.5 rounded-full font-medium text-sm tracking-wide group"
              >
                <span>Masuk ke Portofolio</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
            <p className="mt-4 text-[11px] text-slate-300">Klik di atas untuk melanjutkan eksplorasi</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
