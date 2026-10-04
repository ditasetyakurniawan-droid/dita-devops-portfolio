"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, FileText, Sparkles, Compass } from "lucide-react";

interface NavLinkItem {
  href: string;
  id: string;
  label: string;
}

const links: readonly NavLinkItem[] = [
  { href: "/#top", id: "top", label: "Beranda" },
  { href: "/#about", id: "about", label: "Tentang Saya" },
  { href: "/#showcase", id: "showcase", label: "Showcase Proyek" },
  { href: "/#tech-stack", id: "tech-stack", label: "Tech Stack & Tools" },
  { href: "/#experience", id: "experience", label: "Pengalaman" },
  { href: "/#contact", id: "contact", label: "Kontak" },
  { href: "/resume", id: "resume", label: "Resume (CV)" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    // Prevent background scrolling while mobile nav drawer is open
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, item: NavLinkItem) => {
    setOpen(false);

    if (item.href.startsWith("/#") || item.href.startsWith("#")) {
      const targetElement = document.getElementById(item.id);
      if (targetElement) {
        e.preventDefault();
        const yOffset = -85;
        const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
        window.history.pushState(null, "", item.href);
        // Dispatch arrival aurora wave animation on destination section
        window.dispatchEvent(new CustomEvent("section-arrival", { detail: { id: item.id } }));
      }
    }
  };

  return (
    <div ref={rootRef} className="relative md:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? "Tutup navigasi" : "Buka navigasi"}
        onClick={() => setOpen((current) => !current)}
        className="grid size-9 place-items-center rounded-full border border-white/10 bg-white/5 text-slate-100 transition-colors hover:bg-white/10 active:scale-95"
      >
        {open ? <X aria-hidden="true" className="size-4" /> : <Menu aria-hidden="true" className="size-4" />}
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md"
              aria-hidden="true"
            />

            {/* Floating Glass Navigation Drawer */}
            <motion.nav
              id="mobile-navigation"
              aria-label="Navigasi seluler"
              initial={{ opacity: 0, y: -12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="absolute right-0 top-[calc(100%+14px)] z-50 w-64 rounded-3xl border border-white/15 bg-[#07091e]/95 p-3 shadow-[0_25px_60px_rgba(0,0,0,0.85)] backdrop-blur-2xl"
            >
              <div className="px-3 py-2 border-b border-white/10 mb-2 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400">Navigasi Utama</span>
                <span className="flex items-center gap-1 font-mono text-[10px] text-cyan-400">
                  <Sparkles className="size-3" /> Quick Jump
                </span>
              </div>

              <div className="space-y-1">
                {links.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item)}
                    className="flex items-center justify-between rounded-2xl px-3.5 py-2.5 text-sm font-medium text-slate-200 transition-all hover:bg-white/10 hover:text-white active:scale-[0.98]"
                  >
                    <span className="flex items-center gap-2">
                      <Compass className="size-3.5 text-purple-400/80" />
                      {item.label}
                    </span>
                    {item.href === "/resume" && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-2 py-0.5 text-[10px] text-cyan-300">
                        <FileText className="size-3" /> PDF
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
