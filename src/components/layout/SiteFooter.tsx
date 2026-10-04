import Link from "next/link";
import { ArrowUp, Heart, Terminal } from "lucide-react";
import { profile } from "@/content/profile";

export function SiteFooter() {
  return (
    <footer className="relative border-t border-white/10 bg-[#040614] py-12 text-slate-400">
      <div className="mx-auto flex max-w-content flex-col items-center justify-between gap-6 px-5 sm:px-8 sm:flex-row lg:px-10">
        
        {/* Left: Brand and Copyright */}
        <div className="flex flex-col items-center sm:items-start gap-1 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white tracking-tight">{profile.name}</span>
            <span className="text-slate-600">/</span>
            <span className="font-mono text-xs text-purple-300">DevOps Engineer</span>
          </div>
          <p className="text-xs text-slate-300">
            Dikelola dengan standar platform engineering · Seluruh hak cipta dilindungi.
          </p>
        </div>

        {/* Center: Quick navigation */}
        <div className="flex items-center gap-5 text-xs font-medium text-slate-300">
          <Link href="/#top" className="hover:text-white transition-colors">Beranda</Link>
          <Link href="/#about" className="hover:text-white transition-colors">Tentang</Link>
          <Link href="/#showcase" className="hover:text-white transition-colors">Showcase</Link>
          <Link href="/resume" className="hover:text-white transition-colors">Resume (CV)</Link>
          <Link href="/privacy" className="hover:text-white transition-colors">Privasi</Link>
        </div>

        {/* Right: Scroll to top */}
        <a
          href="#top"
          aria-label="Kembali ke atas"
          className="grid size-9 place-items-center rounded-full border border-white/10 bg-white/5 text-slate-300 hover:border-purple-400 hover:bg-white/10 hover:text-white transition-all"
        >
          <ArrowUp className="size-4" />
        </a>

      </div>
    </footer>
  );
}
