"use client";

import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, SlidersHorizontal } from "lucide-react";
import { TOPICS, type CaseStudy } from "@/content/cases";
import { filterCases, workQuery, type ScopeFilter, type TopicFilter } from "@/content/work-filter";
import { CaseCard } from "./CaseCard";

type Props = Readonly<{
  studies: readonly CaseStudy[];
  scope: ScopeFilter;
  topic: TopicFilter;
}>;

const scopes: readonly Readonly<{ value: ScopeFilter; label: string }>[] = [
  { value: "all", label: "Semua Studi Kasus" },
  { value: "enterprise", label: "Enterprise (BRI)" },
  { value: "independent", label: "Homelab Mandiri (Dari 0)" },
];

export function WorkIndex({ studies, scope, topic }: Props) {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const results = filterCases(studies, scope, topic);
  const scopeLabel = scopes.find((item) => item.value === scope)?.label ?? "Semua karya";
  const topicLabel = TOPICS.find((item) => item.id === topic)?.label ?? "Semua topik";

  function change(nextScope: ScopeFilter, nextTopic: TopicFilter) {
    router.push(workQuery(nextScope, nextTopic), { scroll: false });
  }

  return (
    <>
      <div className="mt-12 flex flex-col gap-6 rounded-[20px] border border-border-subtle bg-obsidian-surface/75 p-5 shadow-panel sm:p-6 lg:flex-row lg:items-end lg:justify-between">
        <fieldset>
          <legend className="mb-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[.17em] text-slate-300">
            <SlidersHorizontal aria-hidden="true" className="size-4 text-accent-cyan" /> Filter berdasarkan lingkup
          </legend>
          <div className="flex flex-wrap gap-2">
            {scopes.map((item) => (
              <button
                key={item.value}
                type="button"
                aria-pressed={scope === item.value}
                onClick={() => change(item.value, topic)}
                className={`min-h-11 rounded-xl border px-4 text-sm font-medium transition-colors ${scope === item.value
                  ? "border-accent-cyan/40 bg-accent-cyan/10 text-slate-50"
                  : "border-border-highlight bg-obsidian-inset text-slate-300 hover:border-slate-400 hover:text-slate-50"}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </fieldset>
        <div className="flex w-full flex-col gap-2 sm:max-w-64">
          <label htmlFor="work-topic" className="font-mono text-[11px] uppercase tracking-[.17em] text-slate-300">Topik</label>
          <select
            id="work-topic"
            value={topic}
            onChange={(event) => change(scope, event.target.value as TopicFilter)}
            className="min-h-11 w-full rounded-xl border border-border-highlight bg-obsidian-inset px-3 text-sm text-slate-50 focus-visible:outline-accent-blue"
          >
            <option value="all">Semua topik</option>
            {TOPICS.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
          </select>
        </div>
      </div>

      <p role="status" aria-live="polite" aria-atomic="true" className="mt-7 font-mono text-xs text-slate-300">
        {results.length} studi kasus · {scopeLabel} · {topicLabel}
      </p>

      {results.length ? (
        <div className="mt-6 grid items-stretch gap-5 md:grid-cols-2">
          {results.map((study) => (
            <motion.div
              key={study.slug}
              layout={!reduceMotion}
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .22, ease: "easeOut" }}
            >
              <CaseCard study={study} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-[20px] border border-border-subtle bg-obsidian-surface p-9 sm:p-12">
          <p className="font-mono text-xs uppercase tracking-[.16em] text-accent-cyan">Tidak ada studi kasus yang sesuai</p>
          <h2 className="mt-4 text-2xl font-semibold text-slate-50">Coba lingkup atau topik lain.</h2>
          <p className="mt-3 max-w-lg text-sm leading-7 text-slate-300">Ringkasan yang dipublikasikan hanya mencakup pekerjaan dengan lingkup jelas dan status bukti yang bisa dipertanggungjawabkan.</p>
          <button type="button" onClick={() => change("all", "all")} className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl border border-border-highlight px-4 text-sm font-medium text-slate-50 hover:border-accent-cyan">
            Tampilkan semua karya <ArrowUpRight aria-hidden="true" className="size-4" />
          </button>
        </div>
      )}
    </>
  );
}
