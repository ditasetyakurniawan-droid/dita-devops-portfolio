import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { BrandIcon } from "@/components/icons/BrandIcon";

export function ExperienceSection() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="relative scroll-mt-24 py-20 sm:py-28">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 w-[600px] h-[400px] bg-purple-900/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="relative z-10 mx-auto max-w-content px-5 sm:px-8 lg:px-10">
        
        {/* Header */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-950/40 px-4 py-1.5 text-xs text-purple-200 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.2)]">
            <Sparkles className="size-3.5 text-cyan-300" />
            <span>Rekam Jejak Profesional</span>
          </div>
          <h2 id="experience-heading" className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Perjalanan Karier & <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Infrastruktur</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            Sinergi antara pengalaman mengelola ratusan microservices perbankan enterprise di BRI dan kemandirian merancang klaster Kubernetes dari nol.
          </p>
        </div>

        {/* Illuminated Timeline */}
        <div className="mt-12 relative border-l-2 border-indigo-500/30 pl-6 sm:pl-10 space-y-12">
          
          {/* Item 1: BRI */}
          <div className="relative group">
            {/* Glowing marker dot */}
            <div className="absolute -left-[31px] sm:-left-[47px] top-1 flex size-5 items-center justify-center rounded-full bg-purple-600 ring-4 ring-[#030014] shadow-[0_0_15px_rgba(168,85,247,0.8)]">
              <span className="size-2 rounded-full bg-white" />
            </div>

            <div className="glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-950/40 px-3 py-1 font-mono text-xs font-semibold text-purple-200">
                  <BrandIcon brand="bamboo" className="size-3.5" /> Nov 2025 — sekarang
                </span>
                <span className="rounded-md border border-emerald-500/30 bg-emerald-950/50 px-2.5 py-0.5 font-mono text-[11px] text-emerald-300">
                  Aktif Bekerja
                </span>
              </div>

              <h3 className="mt-4 text-xl sm:text-2xl font-bold text-white">
                DevOps Engineer · BRI
              </h3>
              <p className="mt-1 font-mono text-xs text-slate-400">
                Ekosistem Mobile Banking (200+ Microservices · Legacy & New Services)
              </p>

              <div className="mt-4 space-y-2.5 text-sm leading-relaxed text-slate-300">
                <p>
                  Mengelola pipeline CI/CD Bamboo, standarisasi base Dockerfile, skrip otomatisasi Shell, serta konfigurasi Helm dan OpenShift untuk <strong>200+ microservices</strong> lintas environment: Dev → QA → Pentest → UAT → Preprod → Prod (Isolated & Existing).
                </p>
                <p>
                  Menerapkan kebijakan gate spesifik per branch: <strong>hardgate unit test</strong> pada branch feature, <strong>softgate</strong> pada branch dev, serta <strong>murni build & push image ke Nexus</strong> pada jalur produksi.
                </p>
                <p>
                  Mengawal rilis dua tahap: internal pilot 1–2 minggu di Prod Isolated sebelum serah-terima rollout ke Prod Existing bersama tim <strong>IBO (Internal Banking Operations)</strong> via Jira & tabletop melintasi 3 lokasi fisik: DC, DRC, dan Google Cloud Platform (GCP).
                </p>
              </div>

              {/* Case study direct links */}
              <div className="mt-6 flex flex-wrap gap-4 border-t border-white/10 pt-4">
                <Link
                  href="/work/enterprise-delivery-diagnostics"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-white transition-colors"
                >
                  <span>Studi Kasus 200+ Microservices</span>
                  <ArrowUpRight className="size-3.5" />
                </Link>
                <Link
                  href="/work/scripted-release-promotion"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-purple-300 hover:text-white transition-colors"
                >
                  <span>Studi Kasus Promosi Rilis Terkendali</span>
                  <ArrowUpRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Item 2: Homelab K8s Mandiri */}
          <div className="relative group">
            {/* Glowing marker dot */}
            <div className="absolute -left-[31px] sm:-left-[47px] top-1 flex size-5 items-center justify-center rounded-full bg-cyan-500 ring-4 ring-[#030014] shadow-[0_0_15px_rgba(6,182,212,0.8)]">
              <span className="size-2 rounded-full bg-white" />
            </div>

            <div className="glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3 py-1 font-mono text-xs font-semibold text-cyan-200">
                  <BrandIcon brand="kubernetes" className="size-3.5" /> 2026 — berjalan paralel (Proyek Mandiri)
                </span>
                <span className="rounded-md border border-cyan-500/30 bg-cyan-950/50 px-2.5 py-0.5 font-mono text-[11px] text-cyan-300">
                  Bare-Metal KVM
                </span>
              </div>

              <h3 className="mt-4 text-xl sm:text-2xl font-bold text-white">
                Platform Kubernetes HA Multi-VM dari 0 & GitOps (Zabisa)
              </h3>
              <p className="mt-1 font-mono text-xs text-slate-400">
                Infrastruktur Mandiri · 3 CP + 3 Worker · Keepalived VIP 192.168.100.60
              </p>

              <div className="mt-4 space-y-2.5 text-sm leading-relaxed text-slate-300">
                <p>
                  Merancang dan membangun sendiri klaster Kubernetes HA v1.30 dari 0 di atas bare-metal KVM/libvirt: Dual VM HAProxy + Keepalived VRRP floating VIP, 3 Control-Plane, 3 Worker, dan Dedicated VMs (Jenkins CI, Harbor Registry, ELK-Sonar, DB).
                </p>
                <p>
                  Mengonfigurasi Longhorn Distributed Storage, HashiCorp Vault HA 3 replicas dengan sidecar injector untuk injeksi secret aplikasi dinamis, serta alur GitOps Argo CD dan simulasi backup/restore MySQL terenkripsi berkala.
                </p>
              </div>

              {/* Case study direct links */}
              <div className="mt-6 flex flex-wrap gap-4 border-t border-white/10 pt-4">
                <Link
                  href="/work/multi-vm-kubernetes-platform"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-white transition-colors"
                >
                  <span>Arsitektur Klaster K8s dari 0</span>
                  <ArrowUpRight className="size-3.5" />
                </Link>
                <Link
                  href="/work/zabisa-controlled-delivery"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-purple-300 hover:text-white transition-colors"
                >
                  <span>GitOps Zabisa & Disaster Recovery</span>
                  <ArrowUpRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Item 3: PT Pinus Pintar Community */}
          <div className="relative group">
            {/* Glowing marker dot */}
            <div className="absolute -left-[31px] sm:-left-[47px] top-1 flex size-5 items-center justify-center rounded-full bg-slate-600 ring-4 ring-[#030014]">
              <span className="size-2 rounded-full bg-slate-300" />
            </div>

            <div className="glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-slate-300">
                  <BrandIcon brand="githubactions" className="size-3.5" /> Pengalaman Sebelumnya
                </span>
              </div>

              <h3 className="mt-4 text-xl sm:text-2xl font-bold text-white">
                DevOps Engineer · PT Pinus Pintar Community
              </h3>
              <p className="mt-1 font-mono text-xs text-slate-400">
                Infrastruktur & Deployment Produk DeployAja dan SIDRA
              </p>

              <p className="mt-4 text-sm leading-relaxed text-slate-300">
                Merancang dan memelihara pipeline CI/CD GitHub Actions, standarisasi template deployment Docker dan Kubernetes, konfigurasi routing Ingress, serta sistem monitoring Prometheus dan Grafana untuk kestabilan operasional produk.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
