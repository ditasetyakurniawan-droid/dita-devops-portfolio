import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BrandIcon, findBrandKey } from "@/components/icons/BrandIcon";
import type { CaseStudy } from "@/content/cases";
import { CaseBadge } from "./CaseBadge";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

export function CaseCard({ study }: { study: CaseStudy }) {
  const isEnterprise = study.scope === "enterprise";
  const spotlightColor = isEnterprise ? "rgba(168, 85, 247, 0.3)" : "rgba(6, 182, 212, 0.3)";

  return (
    <SpotlightCard
      spotlightColor={spotlightColor}
      className="group flex flex-col h-full hover:-translate-y-1.5 transition-all duration-300 hover:shadow-[0_20px_50px_rgba(147,51,234,0.18)]"
    >
      <article className="relative flex h-full min-h-[440px] flex-col p-6 sm:p-8">
        {/* Top Header */}
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-slate-400">
            <span
              className={`size-1.5 rounded-full ${
                isEnterprise
                  ? "bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.8)]"
                  : "bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]"
              }`}
            />
            <span>
              {study.number} / {isEnterprise ? "BRI Enterprise" : "Homelab K8s (Dari 0)"}
            </span>
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
        <p className="mt-4 text-xs text-slate-400 font-mono flex items-center gap-2">
          <span className="text-slate-300 font-medium">{study.role}</span>
          <span className="text-slate-600">·</span>
          <span>{study.period}</span>
        </p>

        {/* Tools badges */}
        <ul aria-label={"Perangkat pada " + study.title} className="mt-auto flex flex-wrap gap-1.5 pt-6">
          {study.tools.slice(0, 5).map((tool) => {
            const brand = findBrandKey(tool);
            return (
              <li
                key={tool}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-[#0c102a]/80 px-2.5 py-1 font-mono text-[11px] text-slate-200 backdrop-blur-sm group-hover:border-purple-500/20 transition-colors"
              >
                {brand && <BrandIcon brand={brand} className="size-3.5 shrink-0" />}
                {tool}
              </li>
            );
          })}
          {study.tools.length > 5 && (
            <li className="rounded-lg border border-white/10 bg-[#0c102a]/80 px-2 py-1 font-mono text-[10px] text-slate-400">
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
          <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 text-cyan-400 group-hover:text-purple-300" />
        </div>
      </article>
    </SpotlightCard>
  );
}
