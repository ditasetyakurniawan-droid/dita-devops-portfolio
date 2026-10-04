"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X, FileText } from "lucide-react";

const links = [
  { href: "/#top", label: "Beranda" },
  { href: "/#about", label: "Tentang Saya" },
  { href: "/#showcase", label: "Showcase Proyek" },
  { href: "/#tech-stack", label: "Tech Stack" },
  { href: "/#experience", label: "Pengalaman" },
  { href: "/#contact", label: "Kontak" },
  { href: "/resume", label: "Resume (CV)" },
] as const;

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative md:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? "Tutup navigasi" : "Buka navigasi"}
        onClick={() => setOpen((current) => !current)}
        className="grid size-9 place-items-center rounded-full border border-white/10 bg-white/5 text-slate-100 hover:bg-white/10"
      >
        {open ? <X aria-hidden="true" className="size-4" /> : <Menu aria-hidden="true" className="size-4" />}
      </button>
      {open && (
        <nav
          id="mobile-navigation"
          aria-label="Navigasi seluler"
          className="absolute right-0 top-[calc(100%+14px)] z-50 w-60 rounded-2xl border border-white/10 bg-[#07091e]/95 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl"
        >
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-xl px-4 py-2.5 text-sm text-slate-200 hover:bg-white/10 hover:text-white transition-colors"
            >
              <span>{label}</span>
              {href === "/resume" && <FileText className="size-3.5 text-cyan-300" />}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}
