"use client";

import Link from "next/link";
import { Download, ArrowUpRight, Sparkles } from "lucide-react";
import { profile } from "@/content/profile";
import { InteractiveIdCard } from "@/components/badge/InteractiveIdCard";
import { BrandIcon, brands, type BrandKey } from "@/components/icons/BrandIcon";

const metrics: readonly Readonly<{ number: string; label: string; detail: string; brand: BrandKey }>[] = [
  { number: "200+", label: "Microservices Dikelola", detail: "Ekosistem Mobile Banking BRI · OpenShift", brand: "openshift" },
  { number: "6 Node", label: "Kubernetes HA Bare-Metal", detail: "3 Control-Plane + 3 Worker (100% dari 0)", brand: "kubernetes" },
  { number: "6 Tahap", label: "Environment Pipeline", detail: "Dev → QA → Pentest → UAT → Preprod → Prod", brand: "bamboo" },
  { number: "3 Site", label: "Cakupan Produksi", detail: "DC, DRC, & Google Cloud Platform", brand: "gcp" },
];

export function AboutMeSection() {
  return (
    <section id="about" aria-labelledby="about-heading" className="relative scroll-mt-24 py-20 sm:py-28">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-900/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="relative z-10 mx-auto max-w-content px-5 sm:px-8 lg:px-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-950/40 px-4 py-1.5 text-xs text-purple-200 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.2)]">
            <Sparkles className="size-3.5 text-cyan-300" />
            <span>Profil Profesional</span>
          </div>
          <h2 id="about-heading" className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            About <span className="bg-gradient-to-r from-purple-400 via-pink-300 to-cyan-400 bg-clip-text text-transparent">Me</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            Mentransformasi kompleksitas infrastruktur enterprise menjadi platform yang tangguh, aman, dan terotomatisasi.
          </p>
        </div>

        {/* Main Card: Bio + Avatar */}
        <div className="mt-12 rounded-3xl border border-white/10 bg-[#0a0d24]/75 p-6 sm:p-10 lg:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            
            {/* Left Bio Details */}
            <div className="lg:col-span-7">
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Halo, Saya <span className="bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent">Dita Setya Kurniawan</span>
              </h3>
              
              <div className="mt-5 space-y-4 text-sm sm:text-base leading-relaxed text-slate-300">
                <p>
                  Saya adalah seorang <strong>DevOps & Platform Engineer</strong> yang berfokus pada keandalan siklus pengiriman perangkat lunak skala enterprise dan arsitektur klaster kontainer berbasis Kubernetes.
                </p>
                <p>
                  Di <strong>BRI</strong>, tanggung jawab saya mencakup pengelolaan arsitektur CI/CD Bamboo untuk <strong>200+ microservices</strong> mobile banking, standarisasi base Dockerfile, otomasi scripting Helm, penerapan gate spesifik per branch (hardgate unit test di branch feature, softgate di branch dev, murni build & push image ke Nexus di prod), hingga mengawal transisi rilis dua tahap (internal pilot 1–2 minggu di Prod Isolated sebelum serah-terima ke tim IBO untuk rollout Prod Existing di DC, DRC, dan GCP).
                </p>
                <p>
                  Untuk memastikan pemahaman sistem yang mendalam dari dasar, saya secara mandiri merancang dan membangun klaster <strong>Kubernetes HA Multi-VM 100% dari 0</strong> di atas bare-metal KVM/libvirt (Dual HAProxy Keepalived Floating VIP, Calico CNI, Longhorn Replicated Storage, HashiCorp Vault HA, dan alur GitOps Argo CD).
                </p>
              </div>

              {/* Action buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={profile.resumePdf.href}
                  download="Dita_Setya_Kurniawan_CV.pdf"
                  className="neon-button-primary inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-medium text-white"
                >
                  <Download className="size-4" />
                  <span>Unduh CV (PDF)</span>
                </a>
                <Link
                  href="#showcase"
                  className="neon-button-secondary inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium text-slate-200"
                >
                  <span>Lihat Showcase Karya</span>
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </div>

            {/* Right: Interactive Draggable Lanyard ID Card */}
            <div className="lg:col-span-5 flex justify-center">
              <InteractiveIdCard />
            </div>

          </div>
        </div>

        {/* Bottom Metrics Grid (Matches 00:14 - 00:18 in reference video) */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map(({ number, label, detail, brand }) => (
            <div
              key={label}
              className="glass-card relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02]"
              style={{ boxShadow: `0 8px 30px -14px ${brands[brand].color}88` }}
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                  {number}
                </span>
                <span title={brands[brand].label} className="grid size-11 place-items-center rounded-xl border border-white/10 bg-[#07091e]/80 shadow-md">
                  <BrandIcon brand={brand} className="size-6" />
                </span>
              </div>
              <h4 className="mt-4 text-sm font-semibold text-slate-100">{label}</h4>
              <p className="mt-1 text-xs text-slate-300">{detail}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
