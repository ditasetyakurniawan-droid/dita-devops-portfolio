"use client";

import { useState } from "react";
import { 
  ArrowRight, 
  Boxes, 
  CheckCircle2, 
  Cloud, 
  Container, 
  Database, 
  FolderLock, 
  GitBranch, 
  Layers, 
  Network, 
  Radio, 
  Server, 
  ShieldAlert, 
  ShieldCheck, 
  Terminal, 
  Users, 
  Workflow
} from "lucide-react";
import { BrandIcon } from "@/components/icons/BrandIcon";

type Props = {
  slug: string;
};

export function CaseArchitectureDiagram({ slug }: Props) {
  const isEnterpriseRelease = slug === "enterprise-delivery-diagnostics" || slug === "scripted-release-promotion";
  const isHomelabCluster = slug === "multi-vm-kubernetes-platform" || slug === "zabisa-controlled-delivery";
  const isDevSecOps = slug === "go-coverage-quality-gate";
  const isContainerRuntime = slug === "bun-runtime-for-ci";

  if (isEnterpriseRelease) {
    return <EnterpriseReleaseDiagram isScripted={slug === "scripted-release-promotion"} />;
  }

  if (isHomelabCluster) {
    return <HomelabClusterDiagram isZabisa={slug === "zabisa-controlled-delivery"} />;
  }

  if (isDevSecOps) {
    return <DevSecOpsCoverageDiagram />;
  }

  if (isContainerRuntime) {
    return <ContainerRuntimeDiagram />;
  }

  return null;
}

/** 1. Diagram Alur Rilis Enterprise BRI: Dev -> Preprod -> Prod Isolated -> Prod Existing (DC, DRC, GCP) */
function EnterpriseReleaseDiagram({ isScripted }: { isScripted: boolean }) {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    {
      id: 1,
      title: "1. Branch Strategy & Gate CI",
      tag: "Bamboo Pipeline",
      brand: "bamboo",
      color: "border-accent-cyan/40 bg-accent-cyan/5",
      badge: "Kebijakan Gate",
      details: [
        "feature/* branch → Unit Test & SonarQube SAST/SCA (HARDGATE: Gagal = Stop Pipeline)",
        "dev branch → Continuous Integration (SOFTGATE: Integrasi Cepat tanpa blokir)",
      ],
    },
    {
      id: 2,
      title: "2. Gated Multi-Environment",
      tag: "6 Tahapan Uji",
      brand: "helm",
      color: "border-accent-blue/40 bg-accent-blue/5",
      badge: "Siklus Kepatuhan Bank",
      details: [
        "Dev → QA (SIT) → Pentest (Security Test) → UAT (User Acceptance) → Preprod",
        "Penyesuaian Helm values, Secret, ConfigMap, dan Resource limits di OpenShift",
      ],
    },
    {
      id: 3,
      title: "3. Prod Image Packaging",
      tag: "Nexus Registry",
      brand: "nexus",
      color: "border-amber-400/40 bg-amber-400/5",
      badge: "Build & Push Murni",
      details: [
        "Jalur prod branch: Tanpa eksekusi ulang Unit Test",
        "Murni build image, injeksi release metadata, dan push immutable digest ke Nexus",
      ],
    },
    {
      id: 4,
      title: "4. Fase 1: Prod Isolated",
      tag: "Internal Pilot (1–2 Minggu)",
      brand: "openshift",
      color: "border-purple-400/40 bg-purple-400/5",
      badge: "Akses Karyawan Internal",
      details: [
        "Rollout ke klaster produksi tertutup khusus internal perbankan",
        "Soak test & uji stabilitas transaksi nyata selama 1–2 minggu sebelum publik",
      ],
    },
    {
      id: 5,
      title: "5. Handoff & Eksekusi IBO",
      tag: "Jira & Tabletop Pra-Rilis",
      brand: "jira",
      color: "border-emerald-400/40 bg-emerald-400/5",
      badge: "Segregation of Duties",
      details: [
        "DevOps: Verifikasi kesiapan microservices, manifest Helm, dan skrip promosi",
        "Eksekusi Rollout: Dijalankan resmi oleh Tim IBO (Internal Banking Operations)",
      ],
    },
    {
      id: 6,
      title: "6. Fase 2: Prod Existing",
      tag: "Live Publik (DC, DRC, GCP)",
      brand: "gcp",
      color: "border-cyan-400/40 bg-cyan-400/5",
      badge: "Nasabah Luas",
      details: [
        "Rollout ke 3 wilayah produksi aktif: Data Center (DC), DRC, dan Google Cloud Platform (GCP)",
        "Monitoring real-time transaksi nasabah via EFK Stack (Fluent Bit, Elastic, Kibana)",
      ],
    },
  ] as const;

  return (
    <div className="mt-8 rounded-2xl border border-border-highlight bg-obsidian-surface p-6 shadow-panel">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-subtle pb-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-accent-cyan">Diagram Alur Arsitektur</span>
          <h3 className="mt-1 text-lg font-semibold text-slate-50">
            Siklus Rilis Enterprise Perbankan (BRI): Prod Isolated → Prod Existing
          </h3>
        </div>
        <span className="rounded-full border border-accent-blue/30 bg-accent-blue/10 px-3 py-1 font-mono text-[11px] text-accent-blue">
          Multi-Site: DC · DRC · GCP
        </span>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((step) => {
          const brand = step.brand;
          const isActive = activeStep === step.id;
          return (
            <div
              key={step.id}
              onClick={() => setActiveStep(isActive ? null : step.id)}
              className={`relative cursor-pointer rounded-xl border p-4 transition-all duration-200 ${step.color} ${
                isActive ? "ring-2 ring-accent-cyan shadow-halo" : "hover:border-slate-400"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="grid size-8 place-items-center rounded-lg border border-border-highlight bg-obsidian-raised text-accent-cyan">
                  <BrandIcon brand={brand} className="size-4" />
                </span>
                <span className="rounded-md border border-border-subtle bg-obsidian-inset px-2 py-0.5 font-mono text-[10px] text-slate-300">
                  {step.tag}
                </span>
              </div>
              <h4 className="mt-3 text-sm font-semibold text-slate-100">{step.title}</h4>
              <ul className="mt-3 space-y-1.5 text-xs text-slate-300">
                {step.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="mt-1 size-1 shrink-0 rounded-full bg-accent-cyan" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex items-center justify-between border-t border-border-subtle pt-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-accent-blue">{step.badge}</span>
                <span className="text-[10px] text-slate-400">{isActive ? "Tutup detail" : "Klik detail"}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 rounded-xl border border-border-subtle bg-obsidian-inset/70 p-4 font-mono text-xs text-slate-300">
        <p className="flex items-center gap-2 font-medium text-accent-cyan">
          <Terminal className="size-4 shrink-0" />
          <span>Ringkasan Tata Kelola Rilis:</span>
        </p>
        <p className="mt-2 text-[11px] leading-relaxed text-slate-400">
          DevOps mengawal kesiapan microservices, otomatisasi skrip promosi Helm/Bamboo, dan verifikasi kualitas kode. Eksekusi rollout produksi dijalankan bersama <strong className="text-slate-200">IBO (Internal Banking Operations)</strong> setelah melewati masa <strong className="text-slate-200">internal pilot 1–2 minggu di Prod Isolated</strong> sebelum dialirkan ke <strong className="text-slate-200">Prod Existing</strong> yang melayani jutaan nasabah luas di DC, DRC, dan GCP.
        </p>
      </div>
    </div>
  );
}

/** 2. Diagram Topologi Homelab: Bare-Metal KVM -> Dual HAProxy/Keepalived -> 3 Master + 3 Worker -> Dedicated VMs -> Workloads */
function HomelabClusterDiagram({ isZabisa }: { isZabisa: boolean }) {
  const [activeTab, setActiveTab] = useState<"topology" | "services" | "workloads">("topology");

  return (
    <div className="mt-8 rounded-2xl border border-border-highlight bg-obsidian-surface p-6 shadow-panel">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-subtle pb-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-accent-cyan">Diagram Arsitektur Nyata</span>
          <h3 className="mt-1 text-lg font-semibold text-slate-50">
            Topologi Klaster Kubernetes HA Multi-VM (Bare-Metal KVM/libvirt)
          </h3>
        </div>
        <div className="inline-flex rounded-lg border border-border-subtle bg-obsidian-inset p-1">
          <button
            type="button"
            onClick={() => setActiveTab("topology")}
            className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
              activeTab === "topology" ? "bg-obsidian-raised text-accent-cyan shadow-sm" : "text-slate-300"
            }`}
          >
            Topologi Klaster HA
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("services")}
            className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
              activeTab === "services" ? "bg-obsidian-raised text-accent-cyan shadow-sm" : "text-slate-300"
            }`}
          >
            Dedicated Infra VMs
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("workloads")}
            className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
              activeTab === "workloads" ? "bg-obsidian-raised text-accent-cyan shadow-sm" : "text-slate-300"
            }`}
          >
            Workload Aktif (Zabisa)
          </button>
        </div>
      </div>

      {activeTab === "topology" && (
        <div className="mt-6 space-y-5">
          {/* Layer 1: Bastion Host */}
          <div className="rounded-xl border border-border-subtle bg-obsidian-inset/80 p-4">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                <Terminal className="size-4 text-accent-cyan" /> Layer 1: Bastion Jump Host & Secure Access
              </span>
              <span className="font-mono text-[10px] text-accent-cyan">ProxyJump · ed25519 · Agent Forwarding</span>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs">
              <div className="rounded-lg border border-border-highlight bg-obsidian-raised px-3 py-2 text-slate-300">
                Laptop Admin <span className="font-mono text-[10px] text-slate-400">(dsk)</span>
              </div>
              <ArrowRight className="size-4 text-slate-500" />
              <div className="rounded-lg border border-accent-cyan/30 bg-accent-cyan/10 px-3 py-2 text-slate-200">
                Host Bare-Metal <strong className="text-accent-cyan">bayern</strong> <span className="font-mono text-[10px] text-slate-400">(117.54.148.124)</span>
              </div>
            </div>
          </div>

          {/* Layer 2: Dual Load Balancer & VIP */}
          <div className="rounded-xl border border-border-subtle bg-obsidian-inset/80 p-4">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                <BrandIcon brand="haproxy" className="size-4" /> Layer 2: High Availability Control-Plane Load Balancer
              </span>
              <span className="font-mono text-[10px] text-accent-blue">Keepalived VRRP · Failover 1–2s</span>
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-border-highlight bg-obsidian-raised p-3">
                <span className="font-mono text-[10px] text-emerald-400">MASTER (Priority 101)</span>
                <p className="mt-1 text-sm font-semibold text-slate-100">lb-dt-1</p>
                <p className="font-mono text-xs text-slate-400">192.168.100.61</p>
                <p className="mt-2 text-[11px] text-slate-300">HAProxy L4 TCP pass-through *:6443</p>
              </div>
              <div className="flex flex-col items-center justify-center rounded-lg border border-accent-cyan/40 bg-accent-cyan/10 p-3 text-center">
                <span className="font-mono text-[10px] uppercase tracking-wider text-accent-cyan">Floating Virtual IP</span>
                <p className="mt-1 font-mono text-base font-bold text-slate-50">192.168.100.60:6443</p>
                <p className="mt-1 text-[11px] text-slate-300">Control-Plane Endpoint Kubeadm</p>
              </div>
              <div className="rounded-lg border border-border-highlight bg-obsidian-raised p-3">
                <span className="font-mono text-[10px] text-amber-400">BACKUP (Priority 100)</span>
                <p className="mt-1 text-sm font-semibold text-slate-100">lb-dt-2</p>
                <p className="font-mono text-xs text-slate-400">192.168.100.62</p>
                <p className="mt-2 text-[11px] text-slate-300">Standby VRRP vrrp_script tracking</p>
              </div>
            </div>
          </div>

          {/* Layer 3: Kubernetes Nodes (3 Master + 3 Worker) */}
          <div className="rounded-xl border border-border-subtle bg-obsidian-inset/80 p-4">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                <BrandIcon brand="kubernetes" className="size-4" /> Layer 3: Klaster Kubernetes HA v1.30.14 (70d+ Uptime)
              </span>
              <span className="font-mono text-[10px] text-accent-cyan">Ubuntu 22.04 · containerd 2.2 · Calico v3.28</span>
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-border-highlight bg-obsidian-raised p-3">
                <p className="text-xs font-medium text-slate-300">3 Node Control-Plane (etcd Quorum):</p>
                <ul className="mt-2 space-y-1 font-mono text-xs text-slate-200">
                  <li className="flex justify-between"><span>master-dt-1</span><span className="text-slate-400">192.168.100.51</span></li>
                  <li className="flex justify-between"><span>master-dt-2</span><span className="text-slate-400">192.168.100.52</span></li>
                  <li className="flex justify-between"><span>master-dt-3</span><span className="text-slate-400">192.168.100.53</span></li>
                </ul>
              </div>
              <div className="rounded-lg border border-border-highlight bg-obsidian-raised p-3">
                <p className="text-xs font-medium text-slate-300">3 Node Worker (Workload Execution):</p>
                <ul className="mt-2 space-y-1 font-mono text-xs text-slate-200">
                  <li className="flex justify-between"><span>worker-dt-1</span><span className="text-slate-400">192.168.100.54</span></li>
                  <li className="flex justify-between"><span>worker-dt-2</span><span className="text-slate-400">192.168.100.55</span></li>
                  <li className="flex justify-between"><span>worker-dt-3</span><span className="text-slate-400">192.168.100.56</span></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Layer 4: Storage & Security Engine */}
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-border-highlight bg-obsidian-raised p-4">
              <span className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                <BrandIcon brand="longhorn" className="size-4" /> Longhorn Replicated Storage
              </span>
              <p className="mt-2 text-xs text-slate-300">
                Distributed Block Storage engine dengan replikasi lintas worker node untuk persistent volume dinamis (StorageClass: longhorn).
              </p>
            </div>
            <div className="rounded-xl border border-border-highlight bg-obsidian-raised p-4">
              <span className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                <BrandIcon brand="vault" className="size-4" /> HashiCorp Vault HA + Injector
              </span>
              <p className="mt-2 text-xs text-slate-300">
                3 Pod replicas HA cluster dengan Vault Agent Injector sidecar yang secara otomatis menyuntikkan kredensial saat container boot.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "services" && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-border-highlight bg-obsidian-inset p-4">
            <span className="font-mono text-[10px] text-accent-cyan">VM CI Server</span>
            <h4 className="mt-1 text-sm font-semibold text-slate-100">jenkins-dt</h4>
            <p className="font-mono text-xs text-slate-400">192.168.100.57</p>
            <p className="mt-2 text-xs text-slate-300">Automated Pipeline, Trivy vulnerability scan, dan SBOM generator</p>
          </div>
          <div className="rounded-xl border border-border-highlight bg-obsidian-inset p-4">
            <span className="font-mono text-[10px] text-accent-blue">VM Private Registry</span>
            <h4 className="mt-1 text-sm font-semibold text-slate-100">harbor-dt</h4>
            <p className="font-mono text-xs text-slate-400">192.168.100.58 (harbor-dt.co.id)</p>
            <p className="mt-2 text-xs text-slate-300">Penyimpanan immutable container image dengan webhook ke GitOps</p>
          </div>
          <div className="rounded-xl border border-border-highlight bg-obsidian-inset p-4">
            <span className="font-mono text-[10px] text-amber-400">VM Logging & Quality</span>
            <h4 className="mt-1 text-sm font-semibold text-slate-100">ELK-sonar</h4>
            <p className="font-mono text-xs text-slate-400">192.168.100.59</p>
            <p className="mt-2 text-xs text-slate-300">Elasticsearch, Fluentd, Kibana centralized logs + SonarQube Gate</p>
          </div>
          <div className="rounded-xl border border-border-highlight bg-obsidian-inset p-4">
            <span className="font-mono text-[10px] text-emerald-400">VM Database</span>
            <h4 className="mt-1 text-sm font-semibold text-slate-100">DB-dt</h4>
            <p className="font-mono text-xs text-slate-400">192.168.100.70 (db-dt)</p>
            <p className="mt-2 text-xs text-slate-300">MySQL Server dengan jadwal encrypted backup dan simulasi restore</p>
          </div>
        </div>
      )}

      {activeTab === "workloads" && (
        <div className="mt-6 space-y-4">
          <div className="rounded-xl border border-accent-cyan/30 bg-accent-cyan/[0.04] p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-200">
                Zabisa Super App — 10 Microservices (20 Pods High Availability)
              </span>
              <span className="font-mono text-[10px] text-accent-cyan">2/2 Containers (Vault Sidecar Injected)</span>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5 font-mono text-xs text-slate-300">
              <span className="rounded-md border border-border-subtle bg-obsidian-raised px-2.5 py-1.5">api-gateway (2)</span>
              <span className="rounded-md border border-border-subtle bg-obsidian-raised px-2.5 py-1.5">identity (2)</span>
              <span className="rounded-md border border-border-subtle bg-obsidian-raised px-2.5 py-1.5">academic (2)</span>
              <span className="rounded-md border border-border-subtle bg-obsidian-raised px-2.5 py-1.5">student (2)</span>
              <span className="rounded-md border border-border-subtle bg-obsidian-raised px-2.5 py-1.5">tahfidz (2)</span>
              <span className="rounded-md border border-border-subtle bg-obsidian-raised px-2.5 py-1.5">donation (2)</span>
              <span className="rounded-md border border-border-subtle bg-obsidian-raised px-2.5 py-1.5">media (2)</span>
              <span className="rounded-md border border-border-subtle bg-obsidian-raised px-2.5 py-1.5">notification (2)</span>
              <span className="rounded-md border border-border-subtle bg-obsidian-raised px-2.5 py-1.5">content (2)</span>
              <span className="rounded-md border border-border-subtle bg-obsidian-raised px-2.5 py-1.5">admin-web (2)</span>
            </div>
            <p className="mt-3 text-[11px] text-slate-400">
              Ingress Domain Publik: <strong className="text-slate-200">backoffice-dt.zabisa.my.id</strong> (MetalLB VIP 192.168.100.63 & Cloudflare Tunnel)
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-border-subtle bg-obsidian-inset p-4">
              <p className="text-xs font-semibold text-slate-200">Workload Pendukung (Namespace test-app):</p>
              <p className="mt-1 text-xs text-slate-400">
                Tropical OS Microservices (API Gateway, Auth, Dashboard, Inventory, Sales, Workforce, Chat, Web) & Absensi RFID Frontend/Backend.
              </p>
            </div>
            <div className="rounded-xl border border-border-subtle bg-obsidian-inset p-4">
              <p className="text-xs font-semibold text-slate-200">Continuous Delivery (Namespace argocd):</p>
              <p className="mt-1 text-xs text-slate-400">
                Argo CD melakukan rekonsiliasi deklaratif otomatis langsung dari repositori GitOps tanpa campur tangan manual.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/** 3. Diagram DevSecOps Go Coverage & Quality Gate */
function DevSecOpsCoverageDiagram() {
  return (
    <div className="mt-8 rounded-2xl border border-border-highlight bg-obsidian-surface p-6 shadow-panel">
      <span className="font-mono text-xs uppercase tracking-wider text-accent-cyan">Diagram Alur DevSecOps</span>
      <h3 className="mt-1 text-lg font-semibold text-slate-50">
        Integrasi Scanner SonarQube & Resolusi Parser coverage.out pada Pipeline CI
      </h3>
      <div className="mt-6 grid gap-3 sm:grid-cols-4 font-mono text-xs">
        <div className="rounded-xl border border-border-highlight bg-obsidian-raised p-4">
          <span className="text-[10px] text-accent-cyan">01 / Trigger</span>
          <p className="mt-2 font-semibold text-slate-100">Branch Evaluation</p>
          <p className="mt-1 text-[11px] text-slate-400">Feature branch (Hardgate) vs Dev (Softgate)</p>
        </div>
        <div className="rounded-xl border border-border-highlight bg-obsidian-raised p-4">
          <span className="text-[10px] text-accent-blue">02 / Eksekusi</span>
          <p className="mt-2 font-semibold text-slate-100">Bamboo Shell Task</p>
          <p className="mt-1 text-[11px] text-slate-400">go test -coverprofile=coverage.out di working directory</p>
        </div>
        <div className="rounded-xl border border-border-highlight bg-obsidian-raised p-4">
          <span className="text-[10px] text-amber-400">03 / Parsing</span>
          <p className="mt-2 font-semibold text-slate-100">SonarQube Scanner</p>
          <p className="mt-1 text-[11px] text-slate-400">Sensor Go Cover memproses path laporan coverage</p>
        </div>
        <div className="rounded-xl border border-emerald-400/40 bg-emerald-400/5 p-4">
          <span className="text-[10px] text-emerald-400">04 / Gate</span>
          <p className="mt-2 font-semibold text-slate-100">Quality Gate Lulus</p>
          <p className="mt-1 text-[11px] text-slate-400">Metrik cakupan valid & lolos pemeriksaan merger</p>
        </div>
      </div>
    </div>
  );
}

/** 4. Diagram Isolasi Container Runtime pada Shared Agent */
function ContainerRuntimeDiagram() {
  return (
    <div className="mt-8 rounded-2xl border border-border-highlight bg-obsidian-surface p-6 shadow-panel">
      <span className="font-mono text-xs uppercase tracking-wider text-accent-cyan">Diagram Isolasi Runtime</span>
      <h3 className="mt-1 text-lg font-semibold text-slate-50">
        Isolasi Per Branch Menggunakan Custom Container Image di Shared Build Agent
      </h3>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-accent-cyan/30 bg-accent-cyan/[0.04] p-4">
          <span className="font-mono text-xs font-semibold text-accent-cyan">Branch Eksperimen (Bun Runtime)</span>
          <p className="mt-2 text-xs text-slate-300">
            Pipeline Bamboo mendeteksi branch uji coba $\rightarrow$ Mengeksekusi custom Debian container via Podman (Bun 1.4.2, Git, SSH, Root CA certs internal).
          </p>
          <p className="mt-3 font-mono text-[11px] text-emerald-400">✓ Terisolasi penuh dari sistem operasi host agent</p>
        </div>
        <div className="rounded-xl border border-border-highlight bg-obsidian-raised p-4">
          <span className="font-mono text-xs font-semibold text-slate-300">Branch Reguler (Node / npm)</span>
          <p className="mt-2 text-xs text-slate-400">
            Seluruh branch standar (dev, qa, pentest, uat, preprod, prod) tetap dieksekusi di runtime Node.js bawaan host tanpa perubahan dependensi.
          </p>
          <p className="mt-3 font-mono text-[11px] text-slate-400">✓ Stabilitas ratusan job CI lainnya tetap terjaga</p>
        </div>
      </div>
    </div>
  );
}
