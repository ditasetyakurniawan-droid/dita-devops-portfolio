import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { WorkIndex } from "@/components/work/WorkIndex";
import { cases } from "@/content/cases";
import { normalizeScope, normalizeTopic } from "@/content/work-filter";

export const metadata: Metadata = {
  title: "Studi Kasus & Proyek | Dita Setya Kurniawan",
  description: "Studi kasus DevOps di lingkungan perbankan enterprise (BRI) dan pembangunan klaster Kubernetes Multi-VM dari 0 di homelab.",
  openGraph: {
    title: "Studi Kasus & Proyek | Dita Setya Kurniawan",
    description: "Arsitektur CI/CD 200+ microservices, promosi rilis multi-environment, DevSecOps, dan infrastruktur Kubernetes dari nol.",
    type: "website",
  },
};

type Props = Readonly<{
  searchParams: Promise<{ scope?: string | string[]; topic?: string | string[] }>;
}>;

export default async function WorkPage({ searchParams }: Props) {
  const query = await searchParams;
  const scope = normalizeScope(typeof query.scope === "string" ? query.scope : null);
  const topic = normalizeTopic(typeof query.topic === "string" ? query.topic : null);

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-slate-50 focus:p-3 focus:text-obsidian">Langsung ke konten</a>
      <SiteHeader />
      <main id="main" className="relative mx-auto max-w-content px-5 pb-28 pt-20 sm:px-8 sm:pt-24 lg:px-10">
        <Link href="/#work" className="inline-flex min-h-11 items-center gap-2 text-sm text-slate-300 transition-colors hover:text-slate-50">
          <ArrowLeft aria-hidden="true" className="size-4" /> Kembali ke beranda
        </Link>
        <div className="mt-12 max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[.2em] text-accent-cyan">Pustaka Studi Kasus</p>
          <h1 className="mt-5 text-[clamp(2.8rem,6vw,4.8rem)] font-semibold leading-[1.07] tracking-display text-slate-50">
            Arsitektur & solusi teknis di lapangan.
          </h1>
          <p className="mt-6 text-base leading-8 text-slate-300 sm:text-lg">
            Kumpulan studi kasus dari pekerjaan saya mengelola 200+ microservices di lingkungan perbankan enterprise (BRI) serta infrastruktur klaster Kubernetes Multi-VM yang saya rancang dan bangun 100% dari 0 di homelab.
          </p>
        </div>
        <WorkIndex studies={cases} scope={scope} topic={topic} />
      </main>
      <SiteFooter />
    </>
  );
}
