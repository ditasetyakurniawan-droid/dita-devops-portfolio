"use client";

import { useEffect, useState } from "react";
import { Activity, ArrowUpRight, Play, Server, ShieldCheck, Timer } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

type Scope = "enterprise" | "zabisa";
type Metric = Readonly<{
  label: string;
  value: string;
  detail: string;
  icon: typeof Activity;
}>;
type TerminalScenario = Readonly<{
  tabLabel: string;
  context: string;
  metrics: readonly Metric[];
  lines: readonly string[];
}>;

const scenarios: Record<Scope, TerminalScenario> = {
  enterprise: {
    tabLabel: "Lingkup Enterprise (BRI)",
    context: "Bamboo · Helm · OpenShift · EFK",
    metrics: [
      { label: "Skala Layanan", value: "200+ Microservices", detail: "Standarisasi Dockerfile, CI Bamboo & Helm Chart", icon: Server },
      { label: "Siklus Environment", value: "6 Tahap Distribusi", detail: "Dev → QA → Pentest → UAT → Preprod → Prod", icon: Activity },
      { label: "Kebijakan Gate CI", value: "Hardgate / Softgate", detail: "Feature hardgate, Dev softgate, Prod build & push", icon: ShieldCheck },
      { label: "Runtime & Log", value: "OpenShift & EFK", detail: "Fluent Bit/Fluentd, Elastic, Kibana & Middleware", icon: Timer },
    ],
    lines: [
      "> pipeline-policy --scope bri-enterprise",
      "[branch:feature] Unit Test & SonarQube SAST/SCA → HARDGATE (Wajib Lulus)",
      "[branch:dev]     Unit Test & Code Analysis      → SOFTGATE (Integrasi Cepat)",
      "[branch:prod]    Skip Unit Test → Murni Build Image & Push ke Nexus",
      "[environment]    Dev → QA → Pentest → UAT → Preprod → Prod (Isolated/Existing)",
      "[operations]     Rollout Helm/OpenShift & Diagnostik Log EFK Lintas Tim",
    ],
  },
  zabisa: {
    tabLabel: "Homelab K8s HA dari 0 (KVM)",
    context: "K8s v1.30 · HAProxy VIP · Longhorn · Vault · Argo CD",
    metrics: [
      { label: "Topologi Klaster", value: "3 CP + 3 Worker (v1.30.14)", detail: "Ubuntu 22.04, containerd 2.2, Calico CNI v3.28", icon: Server },
      { label: "HA Ingress & VIP", value: "HAProxy + Keepalived", detail: "Floating VIP 192.168.100.60:6443 & MetalLB .63", icon: Activity },
      { label: "Storage & Secret", value: "Longhorn & Vault HA", detail: "Replicated dynamic PVCs & Vault Agent Injector sidecars", icon: ShieldCheck },
      { label: "Workload Aktif", value: "30+ Pods (Zabisa 10 Services)", detail: "Zabisa 20 pods HA, Tropical OS, Argo CD, Prometheus", icon: Timer },
    ],
    lines: [
      "> cluster-health --scope homelab-ha-k8s",
      "[nodes]     6/6 Nodes Ready (3 Control-Plane + 3 Worker) · 70d+ Uptime",
      "[control]   Dual HAProxy + Keepalived VRRP Floating VIP 192.168.100.60:6443",
      "[storage]   Longhorn Distributed Storage Engine (Replicated Block Storage)",
      "[security]  HashiCorp Vault HA (3 Replicas) + Sidecar Secret Injection",
      "[workloads] 10 Zabisa Microservices (20 Pods HA) · Synced & Healthy via Argo CD",
    ],
  },
};

const scopes: readonly Scope[] = ["enterprise", "zabisa"];

export function SystemStatusTerminal() {
  const [scope, setScope] = useState<Scope>("enterprise");
  const [visibleLines, setVisibleLines] = useState<number>(scenarios.enterprise.lines.length);
  const [replaying, setReplaying] = useState(false);
  const [replayRun, setReplayRun] = useState(0);
  const [announcement, setAnnouncement] = useState("");
  const reduceMotion = useReducedMotion();
  const scenario = scenarios[scope];

  useEffect(() => {
    if (!replaying) return;

    let nextLine = 0;
    const timer = window.setInterval(() => {
      nextLine += 1;
      setVisibleLines(nextLine);
      if (nextLine >= scenario.lines.length) {
        window.clearInterval(timer);
        setReplaying(false);
        setAnnouncement("Pemutaran demo selesai.");
      }
    }, 340);

    const onVisibilityChange = () => {
      if (document.hidden) {
        window.clearInterval(timer);
        setVisibleLines(scenario.lines.length);
        setReplaying(false);
        setAnnouncement("Pemutaran demo dihentikan karena halaman tidak terlihat.");
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [replaying, scenario]);

  function selectScope(nextScope: Scope) {
    setScope(nextScope);
    setVisibleLines(scenarios[nextScope].lines.length);
    setReplaying(false);
    setAnnouncement(`${scenarios[nextScope].tabLabel} dipilih.`);
  }

  function replay() {
    setReplayRun((current) => current + 1);
    if (reduceMotion) {
      setVisibleLines(scenario.lines.length);
      setReplaying(false);
      setAnnouncement("Demo ditampilkan tanpa animasi.");
      return;
    }
    setVisibleLines(0);
    setReplaying(true);
    setAnnouncement("Pemutaran demo dimulai.");
  }

  return (
    <div className="overflow-hidden rounded-[20px] border border-border-highlight bg-obsidian-surface/95 shadow-panel">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border-subtle px-5 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="flex gap-[5px]"><i className="size-[7px] rounded-full bg-slate-600" /><i className="size-[7px] rounded-full bg-slate-600" /><i className="size-[7px] rounded-full bg-slate-600" /></span>
          <span className="font-mono text-[11px] tracking-[.12em] text-slate-300 sm:text-xs">arsitektur-pipeline / ringkasan-teknis</span>
        </div>
        <span className="rounded-full border border-accent-cyan/25 bg-accent-cyan/10 px-3 py-1 font-mono text-[10px] font-semibold tracking-[.13em] text-accent-cyan">
          ARSITEKTUR & ALUR KERJA NYATA
        </span>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,.88fr)]">
        <div className="min-w-0 px-5 py-7 sm:px-7 sm:py-8">
          <p className="font-mono text-[11px] uppercase tracking-[.22em] text-accent-blue">01 / Spesifikasi Lingkungan Kerja</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-[28px]">Perbandingan lingkup Enterprise & Homelab.</h2>
          <p className="mt-3 max-w-lg text-sm leading-6 text-slate-300">Ringkasan teknis dari aturan pipeline yang saya kelola di kantor (BRI) serta arsitektur klaster Kubernetes yang saya bangun dari nol di homelab pribadi.</p>

          <div role="group" aria-label="Pilih konteks demo" className="mt-7 inline-flex max-w-full flex-wrap gap-1 rounded-xl border border-border-subtle bg-obsidian-inset p-1">
            {scopes.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={scope === item}
                onClick={() => selectScope(item)}
                className={`min-h-11 rounded-lg px-3 text-xs font-medium transition-colors sm:px-4 ${scope === item ? "bg-obsidian-raised text-slate-50 shadow-sm" : "text-slate-300 hover:text-slate-50"}`}
              >
                {scenarios[item].tabLabel}
              </button>
            ))}
          </div>

          <dl className="mt-7 grid grid-cols-2 gap-3" aria-label={`Metrik ${scenario.tabLabel}`}>
            {scenario.metrics.map(({ label, value, detail, icon: Icon }) => (
              <div key={label} className="min-h-[135px] min-w-0 rounded-xl border border-border-subtle bg-obsidian-raised/70 p-4">
                <dt className="flex items-center gap-2 text-xs text-slate-300"><Icon aria-hidden="true" className="size-4 shrink-0 text-accent-blue" strokeWidth={1.7} />{label}</dt>
                <dd className="mt-4 break-words text-sm font-semibold text-slate-50 sm:text-base">{value}</dd>
                <dd className="mt-1 text-[11px] leading-4 text-slate-300">{detail}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="flex min-w-0 flex-col border-t border-border-subtle bg-obsidian-inset/80 lg:border-l lg:border-t-0">
          <div className="flex items-center justify-between gap-4 border-b border-border-subtle px-5 py-5 sm:px-7">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[.2em] text-slate-300">Catatan arsitektur</p>
              <p className="mt-1 font-mono text-xs text-accent-cyan">{scenario.context}</p>
            </div>
            <button type="button" onClick={replay} className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-lg border border-border-highlight px-3 text-xs font-medium text-slate-50 transition-colors hover:border-accent-blue" aria-label="Putar ulang urutan terminal ilustratif">
              <Play aria-hidden="true" className="size-3" /> Putar ulang
            </button>
          </div>

          <div className="flex-1 px-5 py-7 sm:px-7">
            <ol className="min-h-[165px] space-y-3 overflow-x-auto font-mono text-[11px] leading-5 text-slate-300 sm:text-xs" aria-label="Catatan arsitektur yang disamarkan">
              {scenario.lines.slice(0, visibleLines).map((line, index) => (
                <motion.li
                  key={`${scope}-${replayRun}-${index}`}
                  initial={replaying && !reduceMotion ? { opacity: 0, y: 4 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18 }}
                  className={index === 0 ? "whitespace-nowrap text-accent-cyan" : "whitespace-nowrap"}
                >
                  {line}
                </motion.li>
              ))}
            </ol>
            <p aria-live="polite" className="sr-only">{announcement}</p>
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-border-subtle px-5 py-5 sm:px-7">
            <span className="font-mono text-[10px] uppercase tracking-[.12em] text-slate-400">Tidak tersambung ke sistem privat</span>
            <a href="#work" className="inline-flex min-h-11 shrink-0 items-center gap-1 text-xs font-medium text-accent-blue hover:text-slate-50">Lihat karya <ArrowUpRight aria-hidden="true" className="size-3.5" /></a>
          </div>
        </div>
      </div>
    </div>
  );
}
