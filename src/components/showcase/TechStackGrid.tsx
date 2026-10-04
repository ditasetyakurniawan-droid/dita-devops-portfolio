import { BrandIcon, brands, type BrandKey } from "@/components/icons/BrandIcon";

type TechItem = Readonly<{
  name: string;
  category: "Orchestration" | "CI/CD" | "Security" | "Storage" | "Networking" | "Observability";
  description: string;
  /** Logo resmi yang ditampilkan; boleh lebih dari satu untuk kartu gabungan. */
  brands: readonly BrandKey[];
}>;

export const techStackList: readonly TechItem[] = [
  { name: "Kubernetes v1.30", category: "Orchestration", brands: ["kubernetes"], description: "HA Multi-Master cluster setup dari 0 via Kubeadm" },
  { name: "Docker & Podman", category: "Orchestration", brands: ["docker", "podman"], description: "Multi-stage Dockerfile baselines & isolated CI agent container runtimes" },
  { name: "Helm 3", category: "Orchestration", brands: ["helm"], description: "Templating & dynamic values release scripts melintasi 6 environment" },
  { name: "OpenShift", category: "Orchestration", brands: ["openshift"], description: "Enterprise PaaS: ConfigMaps, Secrets, resource tuning & probes di BRI" },
  { name: "Linux KVM / libvirt", category: "Orchestration", brands: ["kvm"], description: "Bare-metal virtualization layer, bridge networking & VM lifecycle" },
  { name: "Bamboo CI/CD", category: "CI/CD", brands: ["bamboo", "jira"], description: "Multi-branch hardgate & softgate pipelines untuk 200+ services, rilis via Jira" },
  { name: "Git & VS Code", category: "CI/CD", brands: ["git", "vscode"], description: "Branching strategy multi-branch, GitOps manifests, commit conventions & custom IDE automation" },
  { name: "Jenkins CI", category: "CI/CD", brands: ["jenkins"], description: "Dedicated CI VM, declarative multi-stage pipelines, Trivy & Sonar scanning" },
  { name: "Argo CD", category: "CI/CD", brands: ["argocd"], description: "GitOps declarative deployment & real-time drift reconciliation" },
  { name: "GitHub Actions", category: "CI/CD", brands: ["githubactions", "github"], description: "Pipeline otomasi & template deployment Docker/Kubernetes" },
  { name: "HashiCorp Vault HA", category: "Security", brands: ["vault"], description: "Secret engine terenkripsi & Vault Agent Injector sidecar di pod" },
  { name: "SonarQube & Trivy", category: "Security", brands: ["sonarqube", "trivy"], description: "Quality gate, coverage parser, SAST/SCA, container & SBOM scanning" },
  { name: "Harbor & Nexus", category: "Security", brands: ["harbor", "nexus"], description: "Private registry dengan vulnerability scan & immutable image digest" },
  { name: "Longhorn Storage", category: "Storage", brands: ["longhorn"], description: "Distributed replicated block storage untuk persistent dynamic volume" },
  { name: "MySQL & MinIO", category: "Storage", brands: ["mysql", "minio"], description: "Database dengan backup/restore drill & object storage media" },
  { name: "Keepalived & HAProxy", category: "Networking", brands: ["keepalived", "haproxy"], description: "Floating VIP (192.168.100.60) & failover load balancing control-plane" },
  { name: "Calico CNI & MetalLB", category: "Networking", brands: ["calico", "metallb"], description: "Pod network policy & on-premise LoadBalancer VIP pool" },
  { name: "Ingress-Nginx", category: "Networking", brands: ["nginx", "cloudflare"], description: "Routing HTTP(S) cluster & Cloudflare Tunnel untuk akses publik aman" },
  { name: "Prometheus & Grafana", category: "Observability", brands: ["prometheus", "grafana"], description: "Metrics scraping, kube-prometheus-stack & alert rules" },
  { name: "EFK Stack", category: "Observability", brands: ["fluentbit", "fluentd", "elasticsearch", "kibana"], description: "Fluent Bit, Fluentd, Elasticsearch & Kibana log aggregation" },
];

export function TechStackGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {techStackList.map((tech) => {
        const accent = brands[tech.brands[0]].color;
        return (
          <div
            key={tech.name}
            className="glass-card group relative overflow-hidden rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1"
            style={{ boxShadow: `0 8px 30px -14px ${accent}66` }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                {tech.brands.map((key) => (
                  <span
                    key={key}
                    title={brands[key].label}
                    className="grid size-11 place-items-center rounded-xl border border-white/10 bg-[#07091e]/80 shadow-sm transition-transform duration-300 group-hover:scale-110"
                  >
                    <BrandIcon brand={key} className="size-6" />
                  </span>
                ))}
              </div>
              <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] text-slate-300">
                {tech.category}
              </span>
            </div>

            <h4 className="mt-4 text-base font-bold text-white transition-colors group-hover:text-cyan-300">{tech.name}</h4>
            <p className="mt-1.5 text-xs leading-relaxed text-slate-300">{tech.description}</p>

            <div className="pointer-events-none absolute inset-0 rounded-2xl border border-transparent transition-colors group-hover:border-cyan-500/30" />
          </div>
        );
      })}
    </div>
  );
}
