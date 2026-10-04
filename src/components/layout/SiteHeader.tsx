"use client";

import Link from "next/link";
import { FileText, Sparkles } from "lucide-react";
import { MobileNav } from "./MobileNav";

export function SiteHeader() {
  return (
    <header className="fixed top-3 sm:top-5 inset-x-0 z-40 px-3 sm:px-6 pointer-events-none transition-all duration-300">
      <div className="pointer-events-auto mx-auto flex max-w-5xl items-center justify-between gap-4 rounded-full border border-white/10 bg-[#07091e]/80 px-4 sm:px-6 py-2.5 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] backdrop-blur-2xl">
        {/* Brand */}
        <Link href="/#top" className="flex items-center gap-2.5 group">
          <span className="relative flex size-8 items-center justify-center rounded-full bg-gradient-to-tr from-purple-600 to-cyan-500 font-mono text-xs font-bold text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]">
            DK
            <span className="absolute -top-0.5 -right-0.5 size-2.5 rounded-full bg-cyan-400 ring-2 ring-[#07091e] animate-pulse" />
          </span>
          <div className="hidden sm:flex flex-col">
            <span className="text-sm font-semibold tracking-tight text-white group-hover:text-purple-300 transition-colors">
              Dita S. Kurniawan
            </span>
            <span className="text-[10px] font-mono text-slate-400">DevOps Engineer</span>
          </div>
        </Link>

        {/* Center Desktop Navigation */}
        <nav aria-label="Navigasi utama" className="hidden md:flex items-center gap-1 text-xs sm:text-sm font-medium text-slate-300">
          <Link href="/#top" className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition-all">
            Beranda
          </Link>
          <Link href="/#about" className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition-all">
            Tentang
          </Link>
          <Link href="/#showcase" className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition-all">
            Showcase
          </Link>
          <Link href="/#tech-stack" className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition-all">
            Tech Stack
          </Link>
          <Link href="/#experience" className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition-all">
            Pengalaman
          </Link>
          <Link href="/#contact" className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition-all">
            Kontak
          </Link>
        </nav>

        {/* Right Action */}
        <div className="flex items-center gap-3">
          <Link
            href="/resume"
            className="hidden sm:inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-950/30 px-4 py-1.5 text-xs font-medium text-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.2)] hover:border-purple-400 hover:bg-purple-900/40 hover:text-white transition-all"
          >
            <FileText className="size-3.5 text-cyan-300" />
            <span>Resume</span>
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
