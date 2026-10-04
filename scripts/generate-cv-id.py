"""Generate the Indonesian two-page CV for editorial review. Requires reportlab."""
from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.pagesizes import A4
from reportlab.lib.utils import ImageReader, simpleSplit
from reportlab.lib.colors import HexColor

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public/resume/Dita_Setya_Kurniawan_CV_ID_2026-09.pdf"
OUT.parent.mkdir(parents=True, exist_ok=True)
PHOTO = ROOT / "public/profile/dita.png"
FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
pdfmetrics.registerFont(TTFont("DS", FONT))
pdfmetrics.registerFont(TTFont("DSB", BOLD))
W, H = A4
M = 47
INK = HexColor("#14202F")
MUTED = HexColor("#546273")
BLUE = HexColor("#205795")
LINE = HexColor("#DAE1EA")
BG = HexColor("#0C1422")
WHITE = HexColor("#F5F7FA")
CYAN = HexColor("#8ADDD8")


def line(c, x, y, s, font="DS", size=9, color=INK):
    c.setFont(font, size)
    c.setFillColor(color)
    c.drawString(x, y, s)


def section(c, y, title):
    line(c, M, y, title.upper(), "DSB", 9, BLUE)
    c.setStrokeColor(LINE)
    c.setLineWidth(.75)
    c.line(M, y - 7, W - M, y - 7)
    return y - 25


def wrapped(c, x, y, text, width, size=9.1, leading=14, color=INK):
    for row in simpleSplit(text, "DS", size, width):
        line(c, x, y, row, "DS", size, color)
        y -= leading
    return y


def bullet(c, y, text, size=8.7):
    c.setFillColor(BLUE)
    c.circle(M + 3, y + 2.2, 1.7, fill=1, stroke=0)
    return wrapped(c, M + 15, y, text, W - 2*M - 15, size, 13) - 4


def job(c, y, title, period, sub):
    line(c, M, y, title, "DSB", 10.2, INK)
    if period:
        c.setFont("DS", 8.8)
        c.setFillColor(MUTED)
        c.drawRightString(W - M, y, period)
    y -= 16
    line(c, M, y, sub, "DS", 8.6, MUTED)
    return y - 19


def page_number(c, n):
    c.setStrokeColor(LINE)
    c.line(M, 38, W - M, 38)
    line(c, M, 25, "DITA SETYA KURNIAWAN  /  DEVOPS ENGINEER", "DS", 7, MUTED)
    c.setFont("DS", 7)
    c.setFillColor(MUTED)
    c.drawRightString(W - M, 25, f"{n} / 2")


c = canvas.Canvas(str(OUT), pagesize=A4, pageCompression=1)
c.setTitle("Dita Setya Kurniawan | CV DevOps Engineer | Bahasa Indonesia | September 2026")
c.setAuthor("Dita Setya Kurniawan")

# First page
c.setFillColor(BG)
c.rect(0, H - 172, W, 172, fill=1, stroke=0)
line(c, M, H - 52, "DITA SETYA KURNIAWAN", "DSB", 18.8, WHITE)
line(c, M, H - 76, "DEVOPS & PLATFORM ENGINEER", "DSB", 8.8, CYAN)
line(c, M, H - 102, "+62 851 9451 3004", "DS", 8.3, WHITE)
line(c, M, H - 117, "ditasetya.kurniawan@gmail.com", "DS", 8.3, WHITE)
line(c, M, H - 132, "linkedin.com/in/dita-setya-kurniawan", "DS", 8.3, WHITE)
line(c, M, H - 147, "github.com/ditasetyakurniawan-droid", "DS", 8.3, WHITE)
image = ImageReader(str(PHOTO))
c.drawImage(image, W-M-91, H-149, 91, 117, mask="auto")
y = H - 203
y = section(c, y, "Profil Profesional")
y = wrapped(c, M, y, "DevOps & Platform Engineer yang berpengalaman mengelola arsitektur CI/CD Bamboo, standarisasi Dockerfile, konfigurasi Helm/OpenShift lintas 6 tahap environment (Dev, QA, Pentest, UAT, Preprod, hingga Prod Isolated & Existing), serta DevSecOps (SonarQube, SAST, SCA) untuk 200+ microservices mobile banking di BRI. Secara mandiri merancang dan membangun infrastruktur klaster Kubernetes Multi-VM 100% dari nol di atas bare-metal KVM/libvirt beserta ekosistem GitOps dan disaster recovery.", W-2*M, 8.6, 13) - 13
y = section(c, y, "Pengalaman Profesional")
y = job(c, y, "DevOps Engineer  |  BRI", "Nov 2025 - sekarang", "Ekosistem Mobile Banking (200+ Microservices · Legacy & New Services)")
y = bullet(c, y, "Merancang dan merawat pipeline Bamboo dengan kebijakan gate spesifik per branch: hardgate unit test pada branch feature, softgate pada branch dev, serta murni build & push image ke Nexus pada jalur produksi.", 8.3)
y = bullet(c, y, "Mengelola base Dockerfile, inline script Bamboo, automation script di repo Helm, serta values/manifest Helm lintas environment: Dev -> QA -> Pentest -> UAT -> Preprod -> Prod (DC, DRC, GCP).", 8.3)
y = bullet(c, y, "Mengawal promosi rilis dua fase: internal pilot 1–2 minggu di Prod Isolated sebelum serah-terima rollout ke Prod Existing bersama tim IBO (Internal Banking Operations) via Jira & tabletop.", 8.3)
y = bullet(c, y, "Mengatur ConfigMap, Secret, resource request/limit, probe di OpenShift, serta integrasi SonarQube, SAST, dan SCA pada pipeline CI (termasuk perbaikan parser coverage.out Go).", 8.3)
y = bullet(c, y, "Menelusuri insiden deployment dan aliran log EFK (Fluent Bit, Fluentd, Elasticsearch, Kibana) serta berkoordinasi lintas tim untuk konfigurasi RabbitMQ, Redis, Kafka, proxy, dan firewall.", 8.3)
y -= 8
y = job(c, y, "DevOps Engineer  |  PT Pinus Pintar Community", "", "Infrastruktur & Deployment Produk DeployAja dan SIDRA")
y = bullet(c, y, "Membangun dan memelihara pipeline CI/CD GitHub Actions serta standarisasi template deployment Docker dan Kubernetes untuk otomatisasi rilis aplikasi.", 8.3)
y = bullet(c, y, "Mengelola sistem observabilitas Prometheus/Grafana, konfigurasi routing Ingress, serta troubleshooting operasional bersama tim pengembang.", 8.3)
if y < 55:
    raise RuntimeError(f"Page 1 content overflow: {y:.1f}")
page_number(c, 1)
c.showPage()

# Second page
c.setFillColor(BG)
c.rect(0, H - 92, W, 92, fill=1, stroke=0)
line(c, M, H-47, "ARSITEKTUR KUBERNETES DARI 0 & STUDI KASUS", "DSB", 14.5, WHITE)
line(c, M, H-67, "Pembangunan Klaster Multi-VM Mandiri, Ekosistem GitOps, & Solusi Engineering", "DS", 8.8, CYAN)
y = H-124
y = section(c, y, "Infrastruktur Homelab K8s HA dari 0 | Bare-Metal KVM | 2026")
y = wrapped(c, M, y, "Membuktikan penguasaan arsitektur end-to-end dengan merancang klaster Kubernetes HA v1.30 dari nol di atas bare-metal KVM/libvirt: Dual HAProxy + Keepalived (VIP floating 192.168.100.60), 3 Control-Plane, 3 Worker, dan Dedicated VMs terpisah (Jenkins CI, Harbor Registry, ELK-Sonar, Database). Menampung aktif 10 microservices Zabisa Super App (20 pods HA) dan Tropical OS.", W-2*M, 8.5, 13)-8
y = bullet(c, y, "Penyimpanan & Keamanan: Longhorn Distributed Block Storage (replicated dynamic PVCs) dan HashiCorp Vault HA (3 pod replicas + Vault Agent Injector sidecar untuk injeksi secret dinamis ke aplikasi).", 8.2)
y = bullet(c, y, "DevSecOps & GitOps (Zabisa): Pipeline Jenkins multi-stage (Trivy scan, SBOM, SonarQube), private Harbor registry, rekonsiliasi deklaratif Argo CD, serta backup database MySQL terenkripsi berkala.", 8.2)
y -= 7
y = section(c, y, "Sorotan Solusi Engineering (Studi Kasus)")
y = bullet(c, y, "Promosi Produksi Terkendali (Isolated -> Existing): Menstandarkan skrip otomatisasi di Bamboo dan repositori Helm untuk mengawal transisi rilis lintas 6 tahap environment hingga produksi.", 8.2)
y = bullet(c, y, "Perbaikan Quality Gate Go di CI: Mendiagnosis kegagalan pembacaan coverage 0% pada microservice Go dengan merestrukturisasi task shell Bamboo dan integrasi sensor Go Cover di SonarQube.", 8.2)
y = bullet(c, y, "Isolasi Runtime CI pada Shared Agent: Merancang custom container image Debian (Bun 1.4.2, Git, SSH, internal CA certs) dan wrapper Podman per branch tanpa mengganggu ratusan job Node/npm reguler.", 8.2)
y -= 7
y = section(c, y, "Keahlian & Perangkat Teknis")
rows=[
 ("CI/CD & GitOps", "Bamboo, Jenkins, GitHub Actions, Argo CD, GitOps, Bash / Shell Scripting"),
 ("Container & K8s", "Kubernetes v1.30 (HA Kubeadm), OpenShift, KVM/libvirt, Helm, Docker, Podman"),
 ("Storage & Secret", "Longhorn Replicated Storage, HashiCorp Vault HA (Sidecar Injector), MinIO"),
 ("DevSecOps", "SonarQube, SAST, SCA, Trivy, SBOM, Harbor Registry, Nexus, Cloudflare Tunnel"),
 ("Jaringan & Operasi", "Calico CNI, MetalLB, HAProxy, Keepalived VIP, Ingress-Nginx, EFK, Prometheus, Grafana"),
]
for name, value in rows:
    line(c, M, y, name.upper(), "DSB", 7.9, BLUE)
    line(c, M + 92, y, value, "DS", 8.2, INK)
    y -= 19
y -= 9
y = section(c, y, "Pelatihan & Sertifikasi")
y = wrapped(c, M, y, "Bootcamp & Pelatihan Intensif DevOps, Cloud, & Kubernetes — PT Pinus Pintar Community IT, Semarang.", W-2*M, 8.8, 14)
if y < 55:
    raise RuntimeError(f"Page 2 content overflow: {y:.1f}")
page_number(c, 2)
c.save()
print(f"Created {OUT} ({OUT.stat().st_size} bytes)")
