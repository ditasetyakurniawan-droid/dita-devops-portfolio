"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Command,
  FileText,
  Mail,
  Phone,
  Server,
  Layers,
  Sparkles,
  ExternalLink,
  Check,
  X,
  Compass,
  ArrowRight,
} from "lucide-react";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { cases } from "@/content/cases";
import { profile } from "@/content/profile";

interface CommandItem {
  id: string;
  title: string;
  subtitle?: string;
  category: "Navigasi" | "Studi Kasus" | "Aksi Cepat" | "Tautan";
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  keywords?: string[];
}

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedAction, setCopiedAction] = useState<string | null>(null);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const copyToClipboard = useCallback((text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAction(label);
    setTimeout(() => setCopiedAction(null), 2000);
  }, []);

  const navigateTo = useCallback(
    (href: string) => {
      setOpen(false);
      if (href.startsWith("http")) {
        window.open(href, "_blank", "noopener,noreferrer");
      } else {
        router.push(href);
      }
    },
    [router]
  );

  // Build commands list
  const commands: CommandItem[] = [
    // Navigation
    {
      id: "nav-home",
      title: "Beranda Utama",
      subtitle: "Hero, profil ringkas & telemetry",
      category: "Navigasi",
      icon: Compass,
      action: () => navigateTo("/#top"),
      keywords: ["home", "beranda", "hero", "profil"],
    },
    {
      id: "nav-about",
      title: "Tentang & Metrik",
      subtitle: "200+ Microservices, 6 Nodes K8s, 100% SLA",
      category: "Navigasi",
      icon: Sparkles,
      action: () => navigateTo("/#about"),
      keywords: ["about", "tentang", "metrik", "sla", "bri"],
    },
    {
      id: "nav-showcase",
      title: "Portfolio Showcase",
      subtitle: "Studi kasus, klaster homelab & katalog teknologi",
      category: "Navigasi",
      icon: Layers,
      action: () => navigateTo("/#showcase"),
      keywords: ["showcase", "proyek", "katalog", "studi kasus"],
    },
    {
      id: "nav-techstack",
      title: "Tech Stack & Tools",
      subtitle: "Kubernetes, Argo CD, Vault, Jenkins, Helm",
      category: "Navigasi",
      icon: Server,
      action: () => navigateTo("/#tech-stack"),
      keywords: ["tech", "stack", "tools", "kubernetes", "argocd", "vault"],
    },
    {
      id: "nav-experience",
      title: "Pengalaman Kerja",
      subtitle: "Platform & DevOps Engineer di BRI",
      category: "Navigasi",
      icon: Layers,
      action: () => navigateTo("/#experience"),
      keywords: ["experience", "pengalaman", "bri", "karir"],
    },
    {
      id: "nav-contact",
      title: "Hubungi / Kontak",
      subtitle: "Kirim pesan langsung atau email",
      category: "Navigasi",
      icon: Mail,
      action: () => navigateTo("/#contact"),
      keywords: ["contact", "kontak", "pesan", "email"],
    },

    // Case Studies
    ...cases.map((c) => ({
      id: `case-${c.slug}`,
      title: c.title,
      subtitle: `${c.scope === "enterprise" ? "BRI Enterprise" : "Homelab K8s"} · ${c.period}`,
      category: "Studi Kasus" as const,
      icon: ArrowRight,
      action: () => navigateTo(`/work/${c.slug}`),
      keywords: [c.title, c.summary, ...c.tools, c.scope],
    })),

    // Fast Actions
    {
      id: "act-resume",
      title: "Buka / Unduh Resume (CV)",
      subtitle: "Dokumen CV lengkap terverifikasi",
      category: "Aksi Cepat",
      icon: FileText,
      action: () => navigateTo("/resume"),
      keywords: ["resume", "cv", "curriculum vitae", "unduh"],
    },
    {
      id: "act-copy-email",
      title: "Salin Alamat Email",
      subtitle: profile.publicEmail ?? "ditasetya.kurniawan@gmail.com",
      category: "Aksi Cepat",
      icon: Mail,
      action: () => copyToClipboard(profile.publicEmail ?? "ditasetya.kurniawan@gmail.com", "Email berhasil disalin!"),
      keywords: ["email", "salin", "copy", profile.publicEmail ?? ""],
    },
    {
      id: "act-copy-phone",
      title: "Salin Nomor WhatsApp / Telepon",
      subtitle: profile.publicPhone,
      category: "Aksi Cepat",
      icon: Phone,
      action: () => copyToClipboard(profile.publicPhone, "Nomor WhatsApp berhasil disalin!"),
      keywords: ["phone", "wa", "whatsapp", "telepon", profile.publicPhone],
    },

    // External
    {
      id: "ext-github",
      title: "GitHub Profile (@ditasetyakurniawan-droid)",
      subtitle: "Repositori kode & konfigurasi GitOps",
      category: "Tautan",
      icon: SiGithub,
      action: () => navigateTo(profile.githubUrl),
      keywords: ["github", "repo", "git", "source"],
    },
    {
      id: "ext-linkedin",
      title: "LinkedIn Profile (Dita Setya Kurniawan)",
      subtitle: "Koneksi profesional & jejaring",
      category: "Tautan",
      icon: FaLinkedin,
      action: () => navigateTo(profile.linkedinUrl),
      keywords: ["linkedin", "profil", "koneksi"],
    },
  ];

  // Filter commands
  const filtered = query.trim()
    ? commands.filter((cmd) => {
        const q = query.toLowerCase();
        return (
          cmd.title.toLowerCase().includes(q) ||
          cmd.subtitle?.toLowerCase().includes(q) ||
          cmd.category.toLowerCase().includes(q) ||
          cmd.keywords?.some((k) => k.toLowerCase().includes(q))
        );
      })
    : commands;

  // Global keyboard listener
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    }

    function handleCustomOpen() {
      setOpen(true);
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-menu", handleCustomOpen);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-menu", handleCustomOpen);
    };
  }, []);

  // Reset selected index on query change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Focus input on open
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [open]);

  // Arrow navigation
  const handleKeyNav = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      e.preventDefault();
      filtered[selectedIndex].action();
    }
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 sm:px-6">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-[#030014]/80 backdrop-blur-xl"
              aria-hidden="true"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-white/15 bg-[#07091e]/95 shadow-[0_25px_70px_rgba(0,0,0,0.8),0_0_50px_rgba(168,85,247,0.25)] backdrop-blur-2xl"
              role="dialog"
              aria-modal="true"
              aria-label="Pusat Perintah & Navigasi"
            >
              {/* Header Search Input */}
              <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3.5 sm:px-6">
                <Search className="size-5 shrink-0 text-cyan-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyNav}
                  placeholder="Ketik tujuan, teknologi, atau tindakan... (e.g. k8s, resume, bri, kontak)"
                  className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-400 outline-none"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="rounded-lg p-1 text-slate-400 hover:bg-white/10 hover:text-white"
                  >
                    <X className="size-4" />
                  </button>
                )}
                <kbd className="hidden sm:inline-flex items-center gap-1 rounded-md border border-white/20 bg-white/5 px-2 py-0.5 font-mono text-[10px] text-slate-400">
                  ESC
                </kbd>
              </div>

              {/* Toast Feedback */}
              {copiedAction && (
                <div className="flex items-center gap-2 border-b border-emerald-500/30 bg-emerald-500/10 px-6 py-2 text-xs font-medium text-emerald-400">
                  <Check className="size-3.5" />
                  <span>{copiedAction}</span>
                </div>
              )}

              {/* Results List */}
              <div className="max-h-[380px] overflow-y-auto p-2 sm:p-3 custom-terminal-scroll">
                {filtered.length === 0 ? (
                  <div className="py-12 text-center">
                    <p className="text-sm text-slate-400">
                      Tidak ditemukan hasil untuk <span className="text-cyan-300">"{query}"</span>
                    </p>
                    <p className="mt-1 text-xs text-slate-500 font-mono">
                      Coba cari: "bamboo", "k8s", "resume", "vault", "email"
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {filtered.map((cmd, idx) => {
                      const Icon = cmd.icon;
                      const isSelected = idx === selectedIndex;
                      return (
                        <div
                          key={cmd.id}
                          role="button"
                          tabIndex={0}
                          onClick={() => cmd.action()}
                          onMouseEnter={() => setSelectedIndex(idx)}
                          className={`flex items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 cursor-pointer transition-all duration-150 ${
                            isSelected
                              ? "bg-purple-600/25 border border-purple-500/40 text-white shadow-[0_0_20px_rgba(168,85,247,0.2)]"
                              : "border border-transparent text-slate-300 hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div
                              className={`grid size-8 shrink-0 place-items-center rounded-lg ${
                                isSelected
                                  ? "bg-purple-500 text-white"
                                  : "bg-white/5 text-slate-400"
                              }`}
                            >
                              <Icon className="size-4" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs sm:text-sm font-semibold truncate leading-tight">
                                {cmd.title}
                              </p>
                              {cmd.subtitle && (
                                <p className="text-[11px] text-slate-400 truncate mt-0.5 font-mono">
                                  {cmd.subtitle}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <span className="font-mono text-[9px] uppercase tracking-wider rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-slate-400">
                              {cmd.category}
                            </span>
                            {isSelected && (
                              <ArrowRight className="size-3.5 text-purple-400" />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Footer Guide */}
              <div className="flex items-center justify-between border-t border-white/10 bg-[#050616] px-4 py-2.5 text-[11px] text-slate-400 font-mono">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <kbd className="rounded bg-white/10 px-1 py-0.5">↑↓</kbd> Navigasi
                  </span>
                  <span className="flex items-center gap-1.5">
                    <kbd className="rounded bg-white/10 px-1 py-0.5">↵</kbd> Buka
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-cyan-400">
                  <Command className="size-3" />
                  <span>Command Palette</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
