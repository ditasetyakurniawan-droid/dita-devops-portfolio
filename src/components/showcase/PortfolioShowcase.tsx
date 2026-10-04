"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowUpRight } from "lucide-react";
import { BrandIcon, type BrandKey } from "@/components/icons/BrandIcon";
import Link from "next/link";
import { cases } from "@/content/cases";
import { CaseCard } from "@/components/work/CaseCard";
import { TechStackGrid } from "./TechStackGrid";
import { CaseArchitectureDiagram } from "@/components/work/CaseArchitectureDiagram";

type TabKey = "projects" | "homelab" | "techstack";

const tabs: { key: TabKey; label: string; brand: BrandKey }[] = [
  { key: "projects", label: "Proyek & Kasus Enterprise", brand: "bamboo" },
  { key: "homelab", label: "Klaster Homelab K8s (Dari 0)", brand: "kubernetes" },
  { key: "techstack", label: "Tech Stack & Tools", brand: "helm" },
];

export function PortfolioShowcase() {
  const [activeTab, setActiveTab] = useState<TabKey>("projects");

  return (
    <section id="showcase" aria-labelledby="showcase-heading" className="relative scroll-mt-24 py-20 sm:py-28">
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-indigo-950/20 blur-[150px] pointer-events-none rounded-full" />

      <div className="relative z-10 mx-auto max-w-content px-5 sm:px-8 lg:px-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-950/40 px-4 py-1.5 text-xs text-purple-200 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.2)]">
            <Sparkles className="size-3.5 text-cyan-300" />
            <span>Showcase Portofolio</span>
          </div>
          <h2 id="showcase-heading" className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Portfolio <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Showcase</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            Eksplorasi karya teruji: proyek skala perbankan enterprise di BRI, arsitektur klaster Kubernetes mandiri dari 0, serta katalog teknologi platform engineering.
          </p>
        </div>

        {/* Tab Switcher Controls (Replicating 00:20 in reference video) */}
        <div className="mt-10 flex justify-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-white/10 bg-[#07091e]/80 p-1.5 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] backdrop-blur-2xl">
            {tabs.map(({ key, label, brand }) => {
              const isActive = activeTab === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveTab(key)}
                  className={`relative flex items-center gap-2.5 rounded-xl px-5 py-2.5 text-xs sm:text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeShowcaseTab"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-purple-500"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10 grid size-5 place-items-center"><BrandIcon brand={brand} colored={!isActive} className="size-4" /></span>
                  <span className="relative z-10">{label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Panels */}
        <div className="mt-12">
          <AnimatePresence mode="wait">
            {activeTab === "projects" && (
              <motion.div
                key="projects"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="space-y-8"
              >
                {/* 6 Cases Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {cases.map((study) => (
                    <CaseCard key={study.slug} study={study} />
                  ))}
                </div>

                <div className="text-center pt-4">
                  <Link
                    href="/work"
                    className="neon-button-secondary inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium text-slate-200"
                  >
                    <span>Buka Direktori Lengkap Studi Kasus</span>
                    <ArrowUpRight className="size-4" />
                  </Link>
                </div>
              </motion.div>
            )}

            {activeTab === "homelab" && (
              <motion.div
                key="homelab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="space-y-8"
              >
                {/* Visual Topology Diagram */}
                <div className="rounded-3xl border border-white/10 bg-[#07091e]/80 p-6 sm:p-8 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                  <div className="max-w-2xl mb-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      Arsitektur Bare-Metal K8s HA (100% Dari Nol)
                    </h3>
                    <p className="mt-2 text-sm text-slate-300">
                      Diagram topologi jaringan, failover Keepalived VIP, control-plane quorum, worker compute, dan storage terdistribusi Longhorn di homelab.
                    </p>
                  </div>
                  <CaseArchitectureDiagram slug="multi-vm-kubernetes-platform" />
                </div>

                {/* Specs Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="glass-card rounded-2xl p-6">
                    <div className="flex items-center gap-3 text-cyan-400 font-semibold mb-3">
                      <BrandIcon brand="haproxy" className="size-5" />
                      <h4>HA Load Balancer & VIP</h4>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Dual VM HAProxy (lb-dt-1 .61 & lb-dt-2 .62) dengan Keepalived VRRP. Mengapungkan floating VIP <strong>192.168.100.60:6443</strong> sebagai single entry point API server.
                    </p>
                  </div>

                  <div className="glass-card rounded-2xl p-6">
                    <div className="flex items-center gap-3 text-purple-400 font-semibold mb-3">
                      <BrandIcon brand="kubernetes" className="size-5" />
                      <h4>6-Node Compute Quorum</h4>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      3 Control-Plane (master-dt-1..3) dengan etcd quorum aman + 3 Worker (worker-dt-1..3) berbasis Ubuntu 22.04 LTS & containerd 2.2. Uptime 70 hari+.
                    </p>
                  </div>

                  <div className="glass-card rounded-2xl p-6">
                    <div className="flex items-center gap-3 text-emerald-400 font-semibold mb-3">
                      <BrandIcon brand="vault" className="size-5" />
                      <h4>Storage, Vault & Zabisa</h4>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Longhorn Replicated Storage, HashiCorp Vault HA 3 replicas dengan auto-sidecar injector, serta Zabisa Super App (10 microservices / 20 pods aktif).
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "techstack" && (
              <motion.div
                key="techstack"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
              >
                <TechStackGrid />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
