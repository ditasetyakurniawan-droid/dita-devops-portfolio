import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BrandIcon, findBrandKey } from "@/components/icons/BrandIcon";
import type { CaseStudy } from "@/content/cases";
import { CaseBadge } from "./CaseBadge";

export function CaseCard({ study }: { study: CaseStudy }) {
  const isEnterprise = study.scope === "enterprise";

  return (
    <article className="glass-card group relative flex h-full min-h-[440px] flex-col rounded-3xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-purple-500/40 hover:shadow-[0_20px_50px_rgba(168,85,247,0.22)]">
      {/* Top Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-slate-400">
          <span className="size-1.5 rounded-full bg-purple-400" />
          <span>{study.number} / {isEnterprise ? "BRI Enterprise" : "Homelab K8s (Dari 0)"}</span>
        </div>
        <CaseBadge study={study} />
      </div>

      {/* Title */}
      <h3 className="mt-6 text-xl sm:text-2xl font-bold leading-snug tracking-tight text-white group-hover:text-cyan-300 transition-colors">
        <Link
          href={"/work/" + study.slug}
          className="outline-none after:absolute after:inset-0 after:rounded-3xl focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-purple-400"
        >
          {study.title}
        </Link>
      </h3>

      {/* Summary */}
      <p className="mt-3.5 text-sm leading-relaxed text-slate-300 line-clamp-4">
        {study.summary}
      </p>

      {/* Role & Period */}
      <p className="mt-4 text-xs text-slate-400 font-mono">
        {study.period} · {study.role}
      </p>

      {/* Tools badges */}
      <ul aria-label={"Perangkat pada " + study.title} className="mt-auto flex flex-wrap gap-1.5 pt-6">
        {study.tools.slice(0, 5).map((tool) => {
          const brand = findBrandKey(tool);
          return (
            <li
              key={tool}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-[#07091e]/60 px-2.5 py-1 font-mono text-[11px] text-slate-200"
            >
              {brand && <BrandIcon brand={brand} className="size-3.5 shrink-0" />}
              {tool}
            </li>
          );
        })}
        {study.tools.length > 5 && (
          <li className="rounded-lg border border-white/10 bg-[#07091e]/60 px-2 py-1 font-mono text-[10px] text-slate-400">
            +{study.tools.length - 5}
          </li>
        )}
      </ul>

      {/* Bottom Action */}
      <div
        aria-hidden="true"
        className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs font-semibold text-cyan-400 group-hover:text-purple-300 transition-colors"
      >
        <span>Baca studi kasus lengkap</span>
        <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>
    </article>
  );
}
