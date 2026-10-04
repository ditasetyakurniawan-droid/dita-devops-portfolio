import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cases } from "@/content/cases";
import { CaseCard } from "@/components/work/CaseCard";

export function WorkSection() {
  return (
    <section id="work" aria-labelledby="work-heading" className="scroll-mt-24 border-t border-border-subtle bg-obsidian-surface/60 py-24 sm:py-28">
      <div className="mx-auto max-w-content px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[.24em] text-accent-cyan">Studi Kasus Pilihan</p>
            <h2 id="work-heading" className="mt-4 text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">Arsitektur, otomasi, dan penyelesaian masalah.</h2>
            <p className="mt-4 text-base leading-7 text-slate-300">Tiga studi kasus utama di bawah ini menampilkan cara saya menangani skala 200+ microservices di BRI, otomatisasi promosi rilis lintas environment, serta perancangan klaster Kubernetes Multi-VM dari 0 di homelab.</p>
          </div>
          <Link href="/work" className="inline-flex min-h-11 shrink-0 items-center gap-2 self-start rounded-xl border border-border-highlight bg-obsidian-raised px-4 text-sm font-medium text-slate-50 transition-colors hover:border-accent-cyan md:self-auto">
            Lihat semua 6 studi kasus <ArrowUpRight aria-hidden="true" className="size-4 text-accent-cyan" />
          </Link>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {cases.filter((study) => study.featured).map((study) => <CaseCard key={study.slug} study={study} />)}
        </div>
        <p className="mt-7 text-sm leading-7 text-slate-300">
          Lihat juga studi kasus lainnya di pustaka: <Link href="/work/zabisa-controlled-delivery" className="font-medium text-accent-cyan underline decoration-accent-cyan/40 underline-offset-4 hover:text-slate-50">Pipeline DevSecOps, GitOps Argo CD & Disaster Recovery (Zabisa) <span aria-hidden="true">↗</span></Link> serta <Link href="/work/go-coverage-quality-gate" className="font-medium text-accent-cyan underline decoration-accent-cyan/40 underline-offset-4 hover:text-slate-50">Integrasi SAST/SCA/SonarQube & Perbaikan Coverage Go di CI <span aria-hidden="true">↗</span></Link>.
        </p>
      </div>
    </section>
  );
}
