import type { LucideIcon } from "lucide-react";
import { Boxes, ChartNoAxesCombined, Container, GitBranch, ScanSearch, ShieldCheck } from "lucide-react";

export type Competency = Readonly<{
  title: string;
  description: string;
  evidence: string;
  caseSlug: string;
  tools: readonly string[];
  icon: LucideIcon;
}>;

export const competencies: readonly Competency[] = [
  {
    title: "Arsitektur CI/CD & Strategi Gate",
    description: "Merancang dan mengelola pipeline Bamboo untuk 200+ microservices dengan aturan spesifik per branch: hardgate unit test pada branch feature, softgate pada branch dev, serta alur khusus build & push image murni pada jalur produksi.",
    evidence: "Lihat studi kasus promosi & rilis",
    caseSlug: "scripted-release-promotion",
    tools: ["Git", "Bamboo", "Bash Scripting", "Helm", "Jira"],
    icon: GitBranch,
  },
  {
    title: "Orkestrasi Helm & Multi-Environment",
    description: "Mengelola template dan values Helm melintasi siklus penuh (Dev → QA → Pentest → UAT → Preprod → Prod Isolated & Existing) di OpenShift. Menangani ConfigMap, Secret, resource tuning, serta kesiapan liveness/readiness probe.",
    evidence: "Lihat studi kasus 200+ microservices",
    caseSlug: "enterprise-delivery-diagnostics",
    tools: ["Helm", "OpenShift", "ConfigMaps", "Secrets"],
    icon: Boxes,
  },
  {
    title: "Standarisasi Container & Registry",
    description: "Merawat base Dockerfile untuk ratusan microservice, mengisolasi eksperimen runtime CI dengan custom container image (Podman/Docker), serta mengelola distribusi dan sinkronisasi artefak image melalui Nexus dan Harbor.",
    evidence: "Lihat studi kasus isolasi runtime CI",
    caseSlug: "bun-runtime-for-ci",
    tools: ["Docker", "Podman", "Nexus", "Harbor", "Skopeo"],
    icon: Container,
  },
  {
    title: "DevSecOps & Quality Gate",
    description: "Mengintegrasikan analisis kualitas kode SonarQube, validasi test coverage (Go/Node), serta pemindaian keamanan SAST, SCA, Trivy, dan pembuatan SBOM sebagai bagian dari standar kelayakan rilis.",
    evidence: "Lihat studi kasus integrasi SonarQube",
    caseSlug: "go-coverage-quality-gate",
    tools: ["SonarQube", "SAST", "SCA", "Trivy", "SBOM"],
    icon: ShieldCheck,
  },
  {
    title: "Observabilitas & Integrasi Layanan",
    description: "Menelusuri insiden deployment dan aliran log melalui Fluent Bit, Fluentd, Elasticsearch, dan Kibana (EFK). Berkoordinasi lintas tim terkait integrasi RabbitMQ, Redis, Kafka, serta jalur konektivitas proxy dan firewall.",
    evidence: "Lihat studi kasus diagnostik sistem",
    caseSlug: "enterprise-delivery-diagnostics",
    tools: ["Fluent Bit", "Fluentd", "Elasticsearch", "Kibana", "RabbitMQ", "Redis", "Kafka"],
    icon: ScanSearch,
  },
  {
    title: "Platform Kubernetes HA dari 0 & GitOps",
    description: "Membangun klaster Kubernetes HA v1.30 dari 0 di atas bare-metal KVM (3 Control-Plane, 3 Worker, dan Dedicated VMs: Jenkins, Harbor, ELK-Sonar, DB) lengkap dengan Dual HAProxy + Keepalived (VIP 192.168.100.60), Calico CNI, Longhorn Replicated Storage, HashiCorp Vault HA, dan Argo CD.",
    evidence: "Lihat arsitektur klaster HA dari 0",
    caseSlug: "multi-vm-kubernetes-platform",
    tools: ["Kubernetes v1.30", "KVM/libvirt", "HAProxy", "Keepalived", "Calico", "Longhorn", "Vault HA", "Argo CD"],
    icon: ChartNoAxesCombined,
  },
];
