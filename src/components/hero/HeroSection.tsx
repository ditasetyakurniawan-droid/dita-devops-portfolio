"use client";

import { ArrowUpRight, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { profile } from "@/content/profile";
import { BrandIcon, type BrandKey } from "@/components/icons/BrandIcon";
import { DevOpsTerminal } from "./DevOpsTerminal";

export function HeroSection() {
  const reduceMotion = useReducedMotion();

  const socialLinks: readonly Readonly<{ label: string; href: string; brand: BrandKey }>[] = [
    { label: "LinkedIn", href: profile.linkedinUrl, brand: "linkedin" },
    { label: "GitHub", href: profile.githubUrl, brand: "github" },
    { label: "Email", href: `mailto:${profile.publicEmail}`, brand: "gmail" },
    { label: "WhatsApp", href: "https://wa.me/6285194513004", brand: "whatsapp" },
  ];

  return (
    <section id="top" aria-labelledby="hero-heading" className="relative isolate overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-44 lg:pb-32">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-gradient-to-tr from-purple-700/20 via-indigo-600/15 to-cyan-500/15 blur-[140px] pointer-events-none" />

      <div className="relative z-10 mx-auto grid max-w-content gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:items-center lg:gap-12 lg:px-10">
        
        {/* Left Column: Typography & Actions */}
        <div className="lg:col-span-7">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-purple-500/30 bg-[#0c0f26]/80 px-4 py-1.5 text-xs text-slate-200 shadow-[0_0_20px_rgba(168,85,247,0.2)] backdrop-blur-md">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            </span>
            <span className="font-medium text-slate-200">
              Aktif bekerja · <strong className="text-white font-semibold">DevOps Engineer di BRI</strong>
            </span>
          </div>

          {/* Subtitle label */}
          <p className="mt-7 font-mono text-xs uppercase tracking-[0.24em] text-cyan-400 font-semibold">
            Dita Setya Kurniawan <span className="mx-2 text-slate-600">/</span> Enterprise CI/CD & Cloud Native
          </p>

          {/* Headline */}
          <h1 id="hero-heading" className="mt-4 text-4xl sm:text-6xl lg:text-[4.2rem] font-bold tracking-tight text-white leading-[1.08]">
            DevOps & Platform{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-indigo-200 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(168,85,247,0.4)]">
              Engineer
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-300">
            Mengelola pipeline CI/CD Bamboo, standarisasi Dockerfile, konfigurasi Helm lintas 6 tahap environment (Dev → QA → Pentest → UAT → Preprod → Prod), DevSecOps, serta diagnostik rilis untuk <strong className="text-white font-medium">200+ microservices mobile banking di BRI</strong>. Di luar pekerjaan kantor, saya merancang dan membangun platform Kubernetes Multi-VM mandiri <strong className="text-white font-medium">100% dari 0</strong> di atas bare-metal KVM.
          </p>

          {/* Action Buttons */}
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <motion.a
              href="#showcase"
              className="neon-button-primary inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-medium text-sm text-white"
              whileHover={reduceMotion ? undefined : { y: -2 }}
              transition={{ duration: 0.18 }}
            >
              <span>Eksplorasi Showcase</span>
              <ArrowUpRight className="size-4" />
            </motion.a>
            <a
              href="#contact"
              className="neon-button-secondary inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-medium text-sm text-slate-200"
            >
              <span>Hubungi Saya</span>
            </a>
          </div>

          {/* Social Links Row */}
          <div className="mt-10 flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400 mr-1">Connect:</span>
            {socialLinks.map(({ label, href, brand }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="grid size-10 place-items-center rounded-xl border border-white/10 bg-[#0d1028]/80 shadow-sm backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-white/30"
              >
                <BrandIcon brand={brand} className="size-[18px]" />
              </a>
            ))}
          </div>
        </div>

        {/* Right Column: High-Tech Interactive DevOps Terminal */}
        <div className="lg:col-span-5 relative">
          <DevOpsTerminal />

          {/* Floating Achievement Badge */}
          <motion.div
            animate={{ y: [-4, 6, -4] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-6 -left-4 rounded-xl border border-purple-500/40 bg-[#0d102e]/95 px-3.5 py-2 shadow-[0_10px_25px_rgba(0,0,0,0.5)] backdrop-blur-xl hidden sm:flex items-center gap-2.5 z-20"
          >
            <BrandIcon brand="kvm" className="size-5 text-cyan-400" />
            <div className="text-[11px]">
              <span className="font-semibold text-white block">Bare-Metal K8s Cluster</span>
              <span className="text-slate-400">100% Dari Nol (KVM/libvirt)</span>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
