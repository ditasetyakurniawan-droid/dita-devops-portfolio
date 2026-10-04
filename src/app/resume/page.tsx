import type { Metadata } from "next";
import { existsSync } from "node:fs";
import { join } from "node:path";
import Link from "next/link";
import { ArrowDownToLine, ArrowLeft, ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { competencies } from "@/content/experience";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: "Ringkasan Profesional & CV | Dita Setya Kurniawan",
  description: "Ringkasan pengalaman dan keahlian Dita Setya Kurniawan, DevOps Engineer di BRI (Enterprise 200+ microservices) dan pembangun platform Kubernetes Multi-VM dari 0.",
};

function getReviewedPdf() {
  const pdf = profile.resumePdf;
  if (!pdf) return undefined;
  if (!/^\/resume\/[a-zA-Z0-9._-]+\.pdf$/.test(pdf.href) || !pdf.size.trim() || !pdf.updated.trim()) {
    throw new Error("Resume PDF must have a versioned /resume/*.pdf path, update date and file size.");
  }
  if (!existsSync(join(process.cwd(), "public", pdf.href.slice(1)))) {
    throw new Error("Configured resume PDF is missing from public" + pdf.href);
  }
  return pdf;
}

export default function ResumePage() {
  const pdf = getReviewedPdf();

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-slate-50 focus:p-3 focus:text-obsidian">Langsung ke konten</a>
      <SiteHeader />
      <main id="main" className="mx-auto max-w-content px-5 pb-28 pt-16 sm:px-8 sm:pt-24 lg:px-10">
        <Link href="/" className="inline-flex min-h-11 items-center gap-2 text-sm text-slate-300 hover:text-slate-50"><ArrowLeft aria-hidden="true" className="size-4" /> Beranda</Link>
        <div className="mt-12 max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[.2em] text-accent-cyan">Ringkasan Profesional & Curriculum Vitae</p>
          <h1 className="mt-5 text-[clamp(2.8rem,6vw,4.8rem)] font-semibold leading-[1.07] tracking-display text-slate-50">Pengalaman Enterprise & Infrastruktur dari Nol.</h1>
          <p className="mt-7 text-base leading-8 text-slate-300 sm:text-lg">{profile.name} · {profile.role}. Saya menangani arsitektur pipeline CI/CD Bamboo (hardgate branch feature, softgate branch dev, dan build & push produksi), standarisasi Dockerfile, konfigurasi Helm/OpenShift melintasi environment Dev → QA → Pentest → UAT → Preprod → Prod, serta DevSecOps untuk 200+ microservices di BRI. Secara paralel, saya merancang dan mengoperasikan sendiri platform Kubernetes Multi-VM dari 0 di atas bare-metal KVM.</p>
          {pdf ? (
            <a href={pdf.href} download className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-xl border border-accent-cyan/40 bg-accent-cyan/10 px-5 text-sm font-medium text-slate-50 hover:bg-accent-cyan/20">
              <ArrowDownToLine aria-hidden="true" className="size-4" /> Unduh CV PDF ({pdf.size}) · Diperbarui {pdf.updated}
            </a>
          ) : (
            <p className="mt-8 text-sm text-slate-300">CV PDF sedang diperbarui. Halaman ini menampilkan ringkasan profesional terbaru.</p>
          )}
        </div>
        <section aria-labelledby="experience-resume" className="mt-20 border-t border-border-subtle pt-12">
          <h2 id="experience-resume" className="text-3xl font-semibold text-slate-50">Pengalaman Utama.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <article className="rounded-2xl border border-border-subtle bg-obsidian-surface p-7">
              <p className="font-mono text-xs uppercase tracking-[.16em] text-accent-cyan">Nov 2025 — sekarang · Enterprise Banking</p>
              <h3 className="mt-4 text-xl font-semibold text-slate-50">DevOps Engineer · BRI</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">Mengelola pipeline Bamboo (feature hardgate, dev softgate, prod build & push), otomatisasi skrip Shell & Helm, perawatan Dockerfile untuk 200+ microservices, integrasi SonarQube/SAST/SCA, serta koordinasi rilis lintas environment (Dev → QA → Pentest → UAT → Preprod → Prod Isolated & Existing) dan diagnostik EFK/OpenShift.</p>
              <Link href="/work/enterprise-delivery-diagnostics" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm text-accent-cyan hover:text-slate-50">Baca studi kasus 200+ microservices <ArrowUpRight aria-hidden="true" className="size-4" /></Link>
            </article>
            <article className="rounded-2xl border border-border-subtle bg-obsidian-surface p-7">
              <p className="font-mono text-xs uppercase tracking-[.16em] text-accent-cyan">2026 — sekarang · Infrastruktur Mandiri dari 0</p>
              <h3 className="mt-4 text-xl font-semibold text-slate-50">Platform Kubernetes HA Multi-VM (Bare-Metal KVM)</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">Membangun klaster Kubernetes HA v1.30 dari 0 di atas KVM (3 Control-Plane, 3 Worker, dan Dedicated VMs: Jenkins, Harbor, ELK-Sonar, DB) dengan Dual HAProxy + Keepalived (VIP 192.168.100.60), Calico CNI, Longhorn Replicated Storage, HashiCorp Vault HA, GitOps Argo CD, dan menampung aktif 10 microservices Zabisa Super App (20 pods HA).</p>
              <Link href="/work/multi-vm-kubernetes-platform" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm text-accent-cyan hover:text-slate-50">Baca arsitektur klaster HA dari 0 <ArrowUpRight aria-hidden="true" className="size-4" /></Link>
            </article>
          </div>
          <article className="mt-4 rounded-2xl border border-border-subtle bg-obsidian-surface p-7">
            <p className="font-mono text-xs uppercase tracking-[.16em] text-accent-cyan">Pengalaman Sebelumnya</p>
            <h3 className="mt-4 text-xl font-semibold text-slate-50">DevOps Engineer · PT Pinus Pintar Community</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">Merancang dan memelihara pipeline CI/CD GitHub Actions, standarisasi template deployment Docker dan Kubernetes, konfigurasi Ingress, serta sistem monitoring Prometheus dan Grafana untuk aplikasi DeployAja dan SIDRA.</p>
          </article>
        </section>
        <section aria-labelledby="skills-resume" className="mt-20 border-t border-border-subtle pt-12">
          <h2 id="skills-resume" className="text-3xl font-semibold text-slate-50">Kompetensi Teknis.</h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {competencies.map(({ title, description, caseSlug }) => (
              <li key={title} className="rounded-2xl border border-border-subtle bg-obsidian-surface p-6">
                <h3 className="text-lg font-semibold text-slate-50">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{description}</p>
                <Link href={`/work/${caseSlug}`} className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm text-accent-cyan hover:text-slate-50">Kasus terkait <ArrowUpRight aria-hidden="true" className="size-4" /></Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
