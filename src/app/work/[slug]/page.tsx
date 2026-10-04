import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, ChevronRight } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CaseBadge } from "@/components/work/CaseBadge";
import { CaseArchitectureDiagram } from "@/components/work/CaseArchitectureDiagram";
import { cases, getCaseBySlug, type CaseStudy } from "@/content/cases";

type Props = Readonly<{ params: Promise<{ slug: string }> }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return cases.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseBySlug(slug);
  if (!study) return { title: "Studi kasus tidak ditemukan" };
  return {
    title: study.title + " | Dita Setya Kurniawan",
    description: study.summary,
    openGraph: { title: study.title, description: study.summary, type: "article" },
  };
}

function DetailList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-6 space-y-4">
      {items.map((item) => (
        <li key={item} className="flex gap-4 text-sm leading-7 text-slate-300">
          <span aria-hidden="true" className="mt-[.7rem] size-1.5 shrink-0 rounded-full bg-accent-cyan" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function CaseDetail({ study }: { study: CaseStudy }) {
  const next = cases[(cases.findIndex((item) => item.slug === study.slug) + 1) % cases.length];
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-slate-50 focus:p-3 focus:text-obsidian">Langsung ke konten</a>
      <SiteHeader />
      <main id="main">
        <div className="relative overflow-hidden border-b border-border-subtle bg-ambient-blue">
          <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-64 size-[700px] rounded-full border border-accent-cyan/10 shadow-halo" />
          <div className="relative mx-auto max-w-content px-5 pb-20 pt-12 sm:px-8 sm:pb-24 lg:px-10">
            <nav aria-label="Jejak halaman" className="font-mono text-xs text-slate-300">
              <ol className="flex flex-wrap items-center gap-2">
                <li><Link href="/" className="inline-flex min-h-11 items-center hover:text-slate-50">Beranda</Link></li>
                <li aria-hidden="true"><ChevronRight className="size-3" /></li>
                <li><Link href="/work" className="inline-flex min-h-11 items-center hover:text-slate-50">Karya</Link></li>
                <li aria-hidden="true"><ChevronRight className="size-3" /></li>
                <li className="text-accent-cyan" aria-current="page">{study.number}</li>
              </ol>
            </nav>
            <div className="mt-14 flex flex-wrap items-center gap-4">
              <p className="font-mono text-xs uppercase tracking-[.2em] text-accent-cyan">
                Studi Kasus {study.number} / {study.scope === "enterprise" ? "Enterprise · BRI" : "Homelab Mandiri (Dari 0)"}
              </p>
              <CaseBadge study={study} />
            </div>
            <h1 className="mt-7 max-w-4xl text-[clamp(2.8rem,6vw,4.8rem)] font-semibold leading-[1.07] tracking-display text-slate-50">{study.title}</h1>
            <p className="mt-7 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">{study.summary}</p>
            <dl className="mt-12 grid gap-6 border-t border-border-highlight pt-8 sm:grid-cols-3">
              <div><dt className="font-mono text-[11px] uppercase tracking-[.17em] text-slate-400">Peran</dt><dd className="mt-2 text-sm text-slate-50">{study.role}</dd></div>
              <div><dt className="font-mono text-[11px] uppercase tracking-[.17em] text-slate-400">Periode</dt><dd className="mt-2 text-sm text-slate-50">{study.period}</dd></div>
              <div><dt className="font-mono text-[11px] uppercase tracking-[.17em] text-slate-400">Konteks Publikasi</dt><dd className="mt-2 text-sm text-slate-50">{study.reviewNote}</dd></div>
            </dl>
          </div>
        </div>

        <div className="mx-auto max-w-content px-5 py-20 sm:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,.65fr)_minmax(0,1fr)] lg:gap-20">
            <div>
              <p className="font-mono text-xs uppercase tracking-[.2em] text-accent-cyan">Latar Belakang & Tata Kelola</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-50">Konteks lingkungan kerja.</h2>
              <p className="mt-5 text-sm leading-8 text-slate-300">{study.context}</p>
              <DetailList items={study.constraints} />
            </div>
            <div className="grid gap-4">
              {[
                { label: "01 / Tantangan Teknis", title: "Masalah yang dihadapi", body: study.problem },
                { label: "02 / Solusi & Eksekusi", title: "Tindakan yang saya lakukan", body: study.action },
                { label: "03 / Dampak Operasional", title: "Hasil yang dicapai", body: study.impact },
              ].map(({ label, title, body }) => (
                <section key={label} className="rounded-2xl border border-border-subtle bg-obsidian-surface p-6 sm:p-8">
                  <p className="font-mono text-[11px] uppercase tracking-[.18em] text-accent-blue">{label}</p>
                  <h3 className="mt-4 text-xl font-semibold text-slate-50">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{body}</p>
                </section>
              ))}
            </div>
          </div>

          <section aria-labelledby="case-flow" className="mt-24 border-t border-border-subtle pt-20">
            <p className="font-mono text-xs uppercase tracking-[.2em] text-accent-cyan">Alur Arsitektur</p>
            <h2 id="case-flow" className="mt-4 text-3xl font-semibold tracking-tight text-slate-50">Tahapan teknis & alur integrasi.</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">Representasi tahapan pipeline dan arsitektur sistem yang saya terapkan pada studi kasus ini.</p>
            <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {study.architecture.map((stage, index) => (
                <li key={stage} className="min-h-36 rounded-2xl border border-border-highlight bg-obsidian-raised/65 p-5">
                  <span className="font-mono text-xs text-accent-cyan">{String(index + 1).padStart(2, "0")} / {String(study.architecture.length).padStart(2, "0")}</span>
                  <p className="mt-7 text-base font-medium text-slate-50">{stage}</p>
                </li>
              ))}
            </ol>
            <CaseArchitectureDiagram slug={study.slug} />
          </section>

          <div className="mt-24 grid gap-12 border-t border-border-subtle pt-20 lg:grid-cols-2 lg:gap-20">
            <section aria-labelledby="implementation-heading">
              <p className="font-mono text-xs uppercase tracking-[.2em] text-accent-cyan">Detail Implementasi</p>
              <h2 id="implementation-heading" className="mt-4 text-3xl font-semibold tracking-tight text-slate-50">Langkah teknis yang dikerjakan.</h2>
              <DetailList items={study.implementation} />
            </section>
            <section aria-labelledby="validation-heading">
              <p className="font-mono text-xs uppercase tracking-[.2em] text-accent-cyan">Verifikasi & Validasi</p>
              <h2 id="validation-heading" className="mt-4 text-3xl font-semibold tracking-tight text-slate-50">Indikator keberhasilan sistem.</h2>
              <DetailList items={study.validation} />
              <p className="mt-7 rounded-xl border border-accent-cyan/20 bg-accent-cyan/[.06] p-5 text-sm leading-7 text-slate-200">{study.impact}</p>
            </section>
          </div>

          <section aria-labelledby="limitations-heading" className="mt-24 rounded-2xl border border-border-subtle bg-obsidian-surface p-7 sm:p-10">
            <p className="font-mono text-xs uppercase tracking-[.2em] text-accent-cyan">Kepatuhan & Kerahasiaan (NDA)</p>
            <h2 id="limitations-heading" className="mt-4 text-2xl font-semibold text-slate-50">Ruang lingkup informasi publik.</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">{study.reviewNote}</p>
            <DetailList items={study.limits} />
            {study.links.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-3 border-t border-border-subtle pt-7">
                {study.links.map(({ href, label }) => (
                  <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border-highlight px-4 text-sm font-medium text-slate-50 hover:border-accent-cyan">
                    {label} <ArrowUpRight aria-hidden="true" className="size-4" /><span className="sr-only">(terbuka di tab baru)</span>
                  </a>
                ))}
              </div>
            )}
          </section>

          <nav aria-label="Navigasi studi kasus" className="mt-20 flex flex-col justify-between gap-6 border-t border-border-subtle pt-8 sm:flex-row">
            <Link href="/work" className="inline-flex min-h-11 items-center gap-2 text-sm text-slate-300 hover:text-slate-50">
              <ArrowLeft aria-hidden="true" className="size-4" /> Semua studi kasus
            </Link>
            <Link href={"/work/" + next.slug} className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-accent-cyan hover:text-slate-50">
              Berikutnya: {next.title} <ArrowUpRight aria-hidden="true" className="size-4" />
            </Link>
          </nav>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseBySlug(slug);
  if (!study) notFound();
  return <CaseDetail study={study} />;
}
