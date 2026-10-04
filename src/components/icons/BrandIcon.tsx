import type { ComponentType, CSSProperties } from "react";
import {
  SiKubernetes, SiDocker, SiPodman, SiHelm, SiJenkins, SiArgo, SiVault, SiSonarqubeserver,
  SiHarbor, SiSonatype, SiLonghorn, SiPrometheus, SiGrafana, SiElasticsearch, SiKibana,
  SiFluentbit, SiFluentd, SiQemu, SiRedhatopenshift, SiBamboo, SiJira, SiGithub, SiGithubactions,
  SiWhatsapp, SiGmail, SiGooglecloud, SiCloudflare, SiGo, SiGnubash, SiBun, SiDebian,
  SiRabbitmq, SiRedis, SiApachekafka, SiMysql, SiMinio, SiNginx, SiTrivy, SiAtlassian,
  SiGit,
} from "react-icons/si";
import { FaLinkedin, FaFilePdf } from "react-icons/fa";
import { VscVscode } from "react-icons/vsc";

type IconType = ComponentType<{ className?: string; style?: CSSProperties; "aria-hidden"?: boolean }>;

export type Brand = Readonly<{
  label: string;
  /** Warna resmi brand (sebagian dicerahkan agar terbaca di latar gelap). */
  color: string;
  Icon?: IconType;
  /** Dipakai bila logo resmi tidak tersedia di pustaka ikon. */
  monogram?: string;
}>;

export const brands = {
  kubernetes: { label: "Kubernetes", color: "#326CE5", Icon: SiKubernetes },
  docker: { label: "Docker", color: "#2496ED", Icon: SiDocker },
  podman: { label: "Podman", color: "#A855C8", Icon: SiPodman },
  helm: { label: "Helm", color: "#5C6CFF", Icon: SiHelm },
  jenkins: { label: "Jenkins", color: "#D24939", Icon: SiJenkins },
  argocd: { label: "Argo CD", color: "#EF7B4D", Icon: SiArgo },
  vault: { label: "HashiCorp Vault", color: "#FFD814", Icon: SiVault },
  sonarqube: { label: "SonarQube", color: "#4E9BCD", Icon: SiSonarqubeserver },
  harbor: { label: "Harbor", color: "#60B932", Icon: SiHarbor },
  nexus: { label: "Sonatype Nexus", color: "#3FA9F5", Icon: SiSonatype },
  longhorn: { label: "Longhorn", color: "#E056A8", Icon: SiLonghorn },
  prometheus: { label: "Prometheus", color: "#E6522C", Icon: SiPrometheus },
  grafana: { label: "Grafana", color: "#F46800", Icon: SiGrafana },
  elasticsearch: { label: "Elasticsearch", color: "#00BFB3", Icon: SiElasticsearch },
  kibana: { label: "Kibana", color: "#F04E98", Icon: SiKibana },
  fluentbit: { label: "Fluent Bit", color: "#49BDA5", Icon: SiFluentbit },
  fluentd: { label: "Fluentd", color: "#0E83C8", Icon: SiFluentd },
  kvm: { label: "KVM / libvirt (QEMU)", color: "#FF6600", Icon: SiQemu },
  openshift: { label: "OpenShift", color: "#EE0000", Icon: SiRedhatopenshift },
  bamboo: { label: "Atlassian Bamboo", color: "#2684FF", Icon: SiBamboo },
  jira: { label: "Jira", color: "#2684FF", Icon: SiJira },
  atlassian: { label: "Atlassian", color: "#2684FF", Icon: SiAtlassian },
  github: { label: "GitHub", color: "#F5F7FA", Icon: SiGithub },
  githubactions: { label: "GitHub Actions", color: "#2088FF", Icon: SiGithubactions },
  linkedin: { label: "LinkedIn", color: "#0A66C2", Icon: FaLinkedin },
  whatsapp: { label: "WhatsApp", color: "#25D366", Icon: SiWhatsapp },
  gmail: { label: "Gmail", color: "#EA4335", Icon: SiGmail },
  gcp: { label: "Google Cloud", color: "#4285F4", Icon: SiGooglecloud },
  cloudflare: { label: "Cloudflare", color: "#F38020", Icon: SiCloudflare },
  go: { label: "Go", color: "#00ADD8", Icon: SiGo },
  bash: { label: "Bash", color: "#4EAA25", Icon: SiGnubash },
  bun: { label: "Bun", color: "#FBF0DF", Icon: SiBun },
  debian: { label: "Debian", color: "#D70A53", Icon: SiDebian },
  rabbitmq: { label: "RabbitMQ", color: "#FF6600", Icon: SiRabbitmq },
  redis: { label: "Redis", color: "#FF4438", Icon: SiRedis },
  kafka: { label: "Apache Kafka", color: "#F5F7FA", Icon: SiApachekafka },
  mysql: { label: "MySQL", color: "#4479A1", Icon: SiMysql },
  minio: { label: "MinIO", color: "#C72E49", Icon: SiMinio },
  nginx: { label: "NGINX", color: "#009639", Icon: SiNginx },
  trivy: { label: "Trivy", color: "#6C63FF", Icon: SiTrivy },
  git: { label: "Git", color: "#F05032", Icon: SiGit },
  vscode: { label: "Visual Studio Code", color: "#007ACC", Icon: VscVscode },
  pdf: { label: "PDF", color: "#F5564A", Icon: FaFilePdf },
  // Logo resmi belum tersedia di pustaka: monogram berwarna brand.
  haproxy: { label: "HAProxy", color: "#2FA84F", monogram: "HA" },
  keepalived: { label: "Keepalived", color: "#E5484D", monogram: "KA" },
  calico: { label: "Calico", color: "#F5A623", monogram: "Ca" },
  metallb: { label: "MetalLB", color: "#4C8DFF", monogram: "ML" },
} as const satisfies Record<string, Brand>;

export type BrandKey = keyof typeof brands;

const aliases: ReadonlyArray<readonly [RegExp, BrandKey]> = [
  [/kubernetes|k8s/i, "kubernetes"],
  [/docker/i, "docker"],
  [/podman/i, "podman"],
  [/helm/i, "helm"],
  [/jenkins/i, "jenkins"],
  [/argo/i, "argocd"],
  [/vault/i, "vault"],
  [/sonar/i, "sonarqube"],
  [/harbor/i, "harbor"],
  [/nexus/i, "nexus"],
  [/longhorn/i, "longhorn"],
  [/prometheus/i, "prometheus"],
  [/grafana/i, "grafana"],
  [/elasticsearch|^elastic/i, "elasticsearch"],
  [/kibana/i, "kibana"],
  [/fluent ?bit/i, "fluentbit"],
  [/fluentd/i, "fluentd"],
  [/kvm|libvirt/i, "kvm"],
  [/openshift/i, "openshift"],
  [/bamboo/i, "bamboo"],
  [/jira/i, "jira"],
  [/github actions/i, "githubactions"],
  [/cloudflare/i, "cloudflare"],
  [/^go$/i, "go"],
  [/bash/i, "bash"],
  [/^bun$/i, "bun"],
  [/debian/i, "debian"],
  [/rabbitmq/i, "rabbitmq"],
  [/redis/i, "redis"],
  [/kafka/i, "kafka"],
  [/mysql/i, "mysql"],
  [/minio/i, "minio"],
  [/ingress-nginx|nginx/i, "nginx"],
  [/trivy/i, "trivy"],
  [/^git$/i, "git"],
  [/vscode|visual studio code/i, "vscode"],
  [/haproxy/i, "haproxy"],
  [/keepalived/i, "keepalived"],
  [/calico/i, "calico"],
  [/metallb/i, "metallb"],
];

/** Mencari brand dari nama alat bebas, mis. "Kubernetes v1.30" atau "HashiCorp Vault". */
export function findBrandKey(name: string): BrandKey | undefined {
  return aliases.find(([pattern]) => pattern.test(name))?.[1];
}

type BrandIconProps = Readonly<{
  brand: BrandKey;
  className?: string;
  /** false = pakai currentColor (mis. di atas latar berwarna). */
  colored?: boolean;
}>;

export function BrandIcon({ brand, className = "size-5", colored = true }: BrandIconProps) {
  const spec: Brand = brands[brand];
  const color = colored ? spec.color : "currentColor";

  if (spec.Icon) {
    const { Icon } = spec;
    return <Icon aria-hidden className={className} style={{ color }} />;
  }

  return (
    <svg aria-hidden viewBox="0 0 24 24" className={className}>
      <rect x="1" y="1" width="22" height="22" rx="6" fill={color} />
      <text x="12" y="16" textAnchor="middle" fontSize="10.5" fontWeight="800" fontFamily="ui-monospace, monospace" fill={colored ? "#07091E" : "#07091E"}>
        {spec.monogram}
      </text>
    </svg>
  );
}
