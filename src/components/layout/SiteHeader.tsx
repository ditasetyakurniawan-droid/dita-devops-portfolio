"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, Search } from "lucide-react";
import { MobileNav } from "./MobileNav";

const navItems = [
  { href: "/#top", id: "top", label: "Beranda" },
  { href: "/#about", id: "about", label: "Tentang" },
  { href: "/#showcase", id: "showcase", label: "Showcase" },
  { href: "/#tech-stack", id: "tech-stack", label: "Tech Stack" },
  { href: "/#experience", id: "experience", label: "Pengalaman" },
  { href: "/#contact", id: "contact", label: "Kontak" },
];

export function SiteHeader() {
  const [activeSection, setActiveSection] = useState("top");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = navItems.length - 1; i >= 0; i--) {
        const item = navItems[i];
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: { href: string; id: string }) => {
    // If not on homepage, let default Link navigate
    if (window.location.pathname !== "/") {
      return;
    }

    e.preventDefault();
    const el = document.getElementById(item.id);
    if (el) {
      const yOffset = item.id === "top" ? 0 : -85;
      const targetY = item.id === "top" ? 0 : el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({
        top: targetY,
        behavior: "smooth",
      });
      setActiveSection(item.id);
      window.history.pushState(null, "", item.href);

      // Fire arrival animation event for destination section
      window.dispatchEvent(new CustomEvent("section-arrival", { detail: { id: item.id } }));
    }
  };

  return (
    <header className="fixed top-3 sm:top-5 inset-x-0 z-40 px-3 sm:px-6 pointer-events-none transition-all duration-300">
      <div className="pointer-events-auto mx-auto flex max-w-5xl items-center justify-between gap-4 rounded-full border border-white/10 bg-[#07091e]/85 px-4 sm:px-6 py-2.5 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] backdrop-blur-2xl">
        {/* Brand */}
        <Link
          href="/#top"
          onClick={(e) => handleNavClick(e, { href: "/#top", id: "top" })}
          className="flex items-center gap-2.5 group"
        >
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

        {/* Center Desktop Navigation with sliding pill */}
        <nav aria-label="Navigasi utama" className="hidden md:flex items-center gap-1 text-xs sm:text-sm font-medium text-slate-300">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                className={`relative px-3.5 py-1.5 rounded-full transition-colors ${
                  isActive ? "text-white font-semibold" : "hover:text-white hover:bg-white/5"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/35 via-indigo-600/30 to-cyan-500/35 border border-white/20 shadow-[0_0_15px_rgba(168,85,247,0.35)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Action */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Command Menu Trigger Button */}
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("open-command-menu"))}
            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 sm:px-3 py-1.5 text-xs text-slate-300 hover:border-purple-400/50 hover:bg-white/10 hover:text-white transition-all shadow-[0_0_10px_rgba(0,0,0,0.3)]"
            title="Buka Command Menu (⌘K atau Ctrl+K)"
            aria-label="Buka Command Menu"
          >
            <Search className="size-3.5 text-cyan-400" />
            <span className="hidden lg:inline text-[11px] text-slate-400">Cari</span>
            <kbd className="hidden sm:inline-flex items-center rounded border border-white/20 bg-white/10 px-1.5 py-0.5 font-mono text-[9px] text-slate-300">
              ⌘K
            </kbd>
          </button>

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
