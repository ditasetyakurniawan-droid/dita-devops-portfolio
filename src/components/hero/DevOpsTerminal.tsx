"use client";

import { useState, useEffect } from "react";
import { Play, RotateCcw, CheckCircle2, ShieldCheck, Sparkles, Terminal as TerminalIcon, Cpu, Layers } from "lucide-react";
import { BrandIcon } from "@/components/icons/BrandIcon";

type TerminalTab = "telemetry" | "nodes" | "gitops" | "simulator";

interface SimulationStep {
  text: string;
  status: "pending" | "running" | "done";
  detail?: string;
}

export function DevOpsTerminal() {
  const [activeTab, setActiveTab] = useState<TerminalTab>("telemetry");
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStepIndex, setSimStepIndex] = useState(0);

  const simulationSteps: SimulationStep[] = [
    { text: "Git Push Event via Cloudflare Tunnel", detail: "Webhook received at /github-webhook/ (200 OK)", status: "pending" },
    { text: "Node 22 Quality Gate & Test Runner", detail: "tsc --noEmit && node --test (100% LCOV Coverage)", status: "pending" },
    { text: "SonarQube SAST Code Analysis", detail: "0 Bugs, 0 Vulnerabilities, 0 Hotspots (Gate: PASSED)", status: "pending" },
    { text: "Container Build & Trivy Security Scan", detail: "Built Next.js standalone image & scanned OCI layers", status: "pending" },
    { text: "Promote GitOps & Argo CD Instant Rollout", detail: "Manifest updated -> Kubernetes zero-downtime rolling update", status: "pending" },
  ];

  const [steps, setSteps] = useState<SimulationStep[]>(simulationSteps);

  const startSimulation = () => {
    setIsSimulating(true);
    setSimStepIndex(0);
    setSteps(simulationSteps.map((s, idx) => ({ ...s, status: idx === 0 ? "running" : "pending" })));
  };

  const resetSimulation = () => {
    setIsSimulating(false);
    setSimStepIndex(0);
    setSteps(simulationSteps);
  };

  useEffect(() => {
    if (!isSimulating) return;

    if (simStepIndex < steps.length) {
      const timer = setTimeout(() => {
        setSteps((prev) =>
          prev.map((step, idx) => {
            if (idx === simStepIndex) return { ...step, status: "done" };
            if (idx === simStepIndex + 1) return { ...step, status: "running" };
            return step;
          })
        );
        setSimStepIndex((prev) => prev + 1);
      }, 750);
      return () => clearTimeout(timer);
    } else {
      setIsSimulating(false);
    }
  }, [isSimulating, simStepIndex, steps.length]);

  return (
    <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
      {/* Ambient background blur glow */}
      <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-purple-600/35 via-indigo-500/25 to-cyan-500/30 opacity-75 blur-2xl transition-all" />

      {/* Main Terminal Window */}
      <div className="glass-panel-luxury relative overflow-hidden rounded-2xl border border-white/15 bg-[#090c24]/90 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
        
        {/* Terminal Header Bar */}
        <div className="flex flex-wrap items-center justify-between border-b border-white/10 bg-[#07091e]/90 px-4 py-3">
          {/* Traffic light dots */}
          <div className="flex items-center gap-2">
            <span className="size-3 rounded-full bg-rose-500/90 shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
            <span className="size-3 rounded-full bg-amber-500/90 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
            <span className="size-3 rounded-full bg-emerald-500/90 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
            <span className="ml-2 font-mono text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <TerminalIcon className="size-3.5 text-cyan-400" />
              platform-console@homelab-k8s
            </span>
          </div>

          {/* Active status indicator */}
          <div className="flex items-center gap-2">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-400 font-semibold">
              K8s HA Ready
            </span>
          </div>
        </div>

        {/* Terminal Navigation Tabs */}
        <div className="flex items-center gap-1 border-b border-white/10 bg-[#060818]/60 px-3 py-1.5 overflow-x-auto text-xs font-mono">
          <button
            type="button"
            onClick={() => setActiveTab("telemetry")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-all ${
              activeTab === "telemetry"
                ? "bg-purple-600/30 text-purple-200 border border-purple-500/40 shadow-[0_0_12px_rgba(168,85,247,0.3)]"
                : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
            }`}
          >
            <Cpu className="size-3.5 text-cyan-400" />
            <span>telemetry.live</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("nodes")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-all ${
              activeTab === "nodes"
                ? "bg-purple-600/30 text-purple-200 border border-purple-500/40 shadow-[0_0_12px_rgba(168,85,247,0.3)]"
                : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
            }`}
          >
            <BrandIcon brand="kubernetes" className="size-3.5 text-cyan-300" />
            <span>kubectl-nodes.sh</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("gitops")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-all ${
              activeTab === "gitops"
                ? "bg-purple-600/30 text-purple-200 border border-purple-500/40 shadow-[0_0_12px_rgba(168,85,247,0.3)]"
                : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
            }`}
          >
            <BrandIcon brand="argocd" className="size-3.5" />
            <span>gitops-pods.sh</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("simulator")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-all ${
              activeTab === "simulator"
                ? "bg-cyan-600/30 text-cyan-200 border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.3)]"
                : "text-cyan-400 hover:text-cyan-200 hover:bg-cyan-950/30"
            }`}
          >
            <Sparkles className="size-3.5 text-amber-300 animate-pulse" />
            <span>simulate-pipeline.sh</span>
          </button>
        </div>

        {/* Terminal Content Area */}
        <div className="p-4 sm:p-5 font-mono text-xs text-slate-300 min-h-[310px] custom-terminal-scroll overflow-y-auto">
          {/* TAB 1: Telemetry Live Overview */}
          {activeTab === "telemetry" && (
            <div className="space-y-4">
              <div className="rounded-xl border border-white/10 bg-[#0e1236]/50 p-3">
                <div className="flex items-center justify-between text-slate-400 text-[11px] mb-2">
                  <span>ENTERPRISE FOOTPRINT (BRI)</span>
                  <span className="text-emerald-400 font-semibold">200+ SERVICES</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-[#07091e]/80 p-2 rounded-lg border border-white/5">
                    <span className="text-slate-400 text-[10px] block">CI/CD Engine</span>
                    <span className="text-white font-semibold flex items-center gap-1.5 mt-0.5">
                      <BrandIcon brand="bamboo" className="size-3.5" /> Bamboo 6-Stage
                    </span>
                  </div>
                  <div className="bg-[#07091e]/80 p-2 rounded-lg border border-white/5">
                    <span className="text-slate-400 text-[10px] block">Production Sites</span>
                    <span className="text-cyan-300 font-semibold flex items-center gap-1.5 mt-0.5">
                      <Layers className="size-3.5 text-cyan-400" /> DC · DRC · GCP
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#0e1236]/50 p-3">
                <div className="flex items-center justify-between text-slate-400 text-[11px] mb-2">
                  <span>HOMELAB CLUSTER (100% DARI 0)</span>
                  <span className="text-cyan-400 font-semibold">VIP: 192.168.100.60</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-[#07091e]/80 p-2 rounded-lg border border-white/5">
                    <span className="text-slate-400 text-[10px] block">K8s Quorum</span>
                    <span className="text-emerald-400 font-bold">3 CP + 3 Worker</span>
                  </div>
                  <div className="bg-[#07091e]/80 p-2 rounded-lg border border-white/5">
                    <span className="text-slate-400 text-[10px] block">Quality Gate</span>
                    <span className="text-purple-300 font-bold">100% Coverage</span>
                  </div>
                  <div className="bg-[#07091e]/80 p-2 rounded-lg border border-white/5">
                    <span className="text-slate-400 text-[10px] block">Argo CD GitOps</span>
                    <span className="text-emerald-400 font-bold">Auto-Rollout</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
                <span className="flex items-center gap-1 text-emerald-400">
                  <ShieldCheck className="size-4" /> Trivy CVE Scan: 0 Critical
                </span>
                <span className="text-slate-400">Live Uptime: 70d+</span>
              </div>
            </div>
          )}

          {/* TAB 2: Kubectl Nodes */}
          {activeTab === "nodes" && (
            <div className="space-y-3">
              <div className="text-cyan-300 font-semibold text-xs flex items-center gap-1.5">
                <span className="text-slate-500">$</span> kubectl get nodes -o wide
              </div>
              <div className="overflow-x-auto text-[11px]">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-slate-400 border-b border-white/10 pb-1">
                      <th className="py-1">NAME</th>
                      <th>STATUS</th>
                      <th>ROLES</th>
                      <th>VERSION</th>
                      <th>INTERNAL-IP</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-mono">
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="py-1.5 text-purple-300 font-semibold">master-dt-1</td>
                      <td><span className="text-emerald-400 bg-emerald-950/60 px-1 rounded border border-emerald-500/30">Ready</span></td>
                      <td className="text-slate-400">control-plane</td>
                      <td>v1.30.2</td>
                      <td className="text-slate-300">192.168.100.51</td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="py-1.5 text-purple-300 font-semibold">master-dt-2</td>
                      <td><span className="text-emerald-400 bg-emerald-950/60 px-1 rounded border border-emerald-500/30">Ready</span></td>
                      <td className="text-slate-400">control-plane</td>
                      <td>v1.30.2</td>
                      <td className="text-slate-300">192.168.100.52</td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="py-1.5 text-purple-300 font-semibold">master-dt-3</td>
                      <td><span className="text-emerald-400 bg-emerald-950/60 px-1 rounded border border-emerald-500/30">Ready</span></td>
                      <td className="text-slate-400">control-plane</td>
                      <td>v1.30.2</td>
                      <td className="text-slate-300">192.168.100.53</td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="py-1.5 text-cyan-300 font-semibold">worker-dt-1</td>
                      <td><span className="text-emerald-400 bg-emerald-950/60 px-1 rounded border border-emerald-500/30">Ready</span></td>
                      <td className="text-slate-400">worker</td>
                      <td>v1.30.2</td>
                      <td className="text-slate-300">192.168.100.54</td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="py-1.5 text-cyan-300 font-semibold">worker-dt-2</td>
                      <td><span className="text-emerald-400 bg-emerald-950/60 px-1 rounded border border-emerald-500/30">Ready</span></td>
                      <td className="text-slate-400">worker</td>
                      <td>v1.30.2</td>
                      <td className="text-slate-300">192.168.100.55</td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="py-1.5 text-cyan-300 font-semibold">worker-dt-3</td>
                      <td><span className="text-emerald-400 bg-emerald-950/60 px-1 rounded border border-emerald-500/30">Ready</span></td>
                      <td className="text-slate-400">worker</td>
                      <td>v1.30.2</td>
                      <td className="text-slate-300">192.168.100.56</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-[10px] text-slate-500 pt-1">
                Total 6/6 Nodes Ready · Kernel: 5.15.0-generic · Runtime: containerd://2.2.0
              </p>
            </div>
          )}

          {/* TAB 3: GitOps Pods */}
          {activeTab === "gitops" && (
            <div className="space-y-3">
              <div className="text-cyan-300 font-semibold text-xs flex items-center gap-1.5">
                <span className="text-slate-500">$</span> kubectl get pods -n test-app -l app=dita-devops-portfolio
              </div>
              <div className="space-y-1.5 text-[11px]">
                <div className="flex items-center justify-between rounded-lg bg-emerald-950/30 border border-emerald-500/30 p-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-emerald-400 shrink-0" />
                    <span className="text-white font-medium">dita-devops-portfolio-5759b9558b-m9tnx</span>
                  </div>
                  <span className="text-emerald-400 font-semibold text-[10px]">1/1 Running</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-emerald-950/30 border border-emerald-500/30 p-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-emerald-400 shrink-0" />
                    <span className="text-white font-medium">dita-devops-portfolio-5759b9558b-rxb6l</span>
                  </div>
                  <span className="text-emerald-400 font-semibold text-[10px]">1/1 Running</span>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#070a20] p-3 text-[11px] space-y-1">
                <div className="text-slate-400 flex items-center justify-between">
                  <span>Argo CD Application:</span>
                  <span className="text-emerald-400 font-bold">Healthy & Synced</span>
                </div>
                <div className="text-slate-400 flex items-center justify-between">
                  <span>GitOps Commit Target:</span>
                  <span className="text-cyan-300 font-mono">main (ac6da83)</span>
                </div>
                <div className="text-slate-400 flex items-center justify-between">
                  <span>Ingress Host:</span>
                  <span className="text-purple-300 font-mono">dita-devops.zabisa.my.id</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Interactive Simulator */}
          {activeTab === "simulator" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-cyan-300 font-semibold text-xs flex items-center gap-1.5">
                  <Sparkles className="size-3.5 text-amber-300" /> GitOps Automated Promotion Simulator
                </span>
                {!isSimulating ? (
                  <button
                    type="button"
                    onClick={startSimulation}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 px-3 py-1 font-sans text-xs font-semibold text-white shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-all hover:scale-105 active:scale-95"
                  >
                    <Play className="size-3 fill-current" /> Jalankan Simulasi
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={resetSimulation}
                    className="inline-flex items-center gap-1 rounded-lg border border-white/20 bg-white/5 px-2.5 py-1 text-[11px] text-slate-300 hover:bg-white/10"
                  >
                    <RotateCcw className="size-3" /> Reset
                  </button>
                )}
              </div>

              {/* Progress Steps List */}
              <div className="space-y-2 pt-1 text-[11px]">
                {steps.map((step, idx) => (
                  <div
                    key={step.text}
                    className={`rounded-lg border p-2.5 transition-all duration-300 ${
                      step.status === "done"
                        ? "border-emerald-500/40 bg-emerald-950/30 text-emerald-200"
                        : step.status === "running"
                        ? "border-cyan-500/50 bg-cyan-950/40 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.3)] animate-pulse"
                        : "border-white/5 bg-[#07091e]/50 text-slate-500"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold flex items-center gap-2">
                        {step.status === "done" ? (
                          <CheckCircle2 className="size-3.5 text-emerald-400 shrink-0" />
                        ) : step.status === "running" ? (
                          <span className="size-3 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin shrink-0" />
                        ) : (
                          <span className="size-3.5 rounded-full border border-slate-600 grid place-items-center text-[9px] shrink-0">
                            {idx + 1}
                          </span>
                        )}
                        {step.text}
                      </span>
                      <span className="text-[10px] uppercase font-mono tracking-wider font-semibold">
                        {step.status === "done" ? "LULUS" : step.status === "running" ? "PROSES..." : "PENDING"}
                      </span>
                    </div>
                    {step.detail && step.status !== "pending" && (
                      <p className="mt-1 text-[10px] text-slate-300 pl-5.5 font-sans leading-tight">
                        {step.detail}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Terminal Footer Bar */}
        <div className="flex items-center justify-between border-t border-white/10 bg-[#060818]/90 px-4 py-2 text-[10px] font-mono text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>GitOps Channel: synchronized</span>
          </span>
          <span className="text-slate-400">Namespace: test-app (K8s v1.30)</span>
        </div>

      </div>
    </div>
  );
}
