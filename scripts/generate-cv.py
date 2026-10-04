"""Generate the draft public two-page DevOps CV. Requires reportlab."""
from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.pagesizes import A4
from reportlab.lib.utils import ImageReader, simpleSplit
from reportlab.lib.colors import HexColor

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public/resume/Dita_Setya_Kurniawan_CV_2026-09.pdf"
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
c.setTitle("Dita Setya Kurniawan | DevOps Engineer CV | September 2026")
c.setAuthor("Dita Setya Kurniawan")

# First page
c.setFillColor(BG)
c.rect(0, H - 172, W, 172, fill=1, stroke=0)
line(c, M, H - 52, "DITA SETYA KURNIAWAN", "DSB", 18.8, WHITE)
line(c, M, H - 76, "DEVOPS ENGINEER  /  MID-LEVEL", "DSB", 9.2, CYAN)
line(c, M, H - 102, "+62 851 9451 3004", "DS", 8.3, WHITE)
line(c, M, H - 117, "ditasetya.kurniawan@gmail.com", "DS", 8.3, WHITE)
line(c, M, H - 132, "linkedin.com/in/dita-setya-kurniawan", "DS", 8.3, WHITE)
line(c, M, H - 147, "github.com/ditasetyakurniawan-droid", "DS", 8.3, WHITE)
image = ImageReader(str(PHOTO))
c.drawImage(image, W-M-91, H-149, 91, 117, mask="auto")
y = H - 203
y = section(c, y, "Profile")
y = wrapped(c, M, y, "DevOps Engineer working with CI/CD scripting, container builds, Helm and OpenShift deployment configuration, quality gates and incident diagnosis in enterprise mobile banking. Independently built and operate a multi-VM Kubernetes platform, including delivery and recovery workflows. Production banking releases involve dedicated release and operations teams.", W-2*M, 9.2, 14) - 20
y = section(c, y, "Professional experience")
y = job(c, y, "DevOps Engineer  |  BRI", "Nov 2025 - Present", "Enterprise mobile banking delivery, legacy and newer service estates")
y = bullet(c, y, "Set up and maintain Bamboo plans, inline shell scripts, Helm-repository scripts and Dockerfile baselines for services across development, test, pre-production and production stages.")
y = bullet(c, y, "Maintain environment-specific Helm values, ConfigMap and secret references, resource settings, probes and OpenShift rollout configuration in collaboration with development and platform teams.")
y = bullet(c, y, "Support controlled isolated-to-existing production promotion; join Jira-based release reviews and troubleshoot rollouts with release and banking operations teams.")
y = bullet(c, y, "Integrate SonarQube coverage, SAST and software composition checks. Resolved a misleading Go CI coverage result by correcting Bamboo execution and verifying report import.")
y = bullet(c, y, "Investigate image/registry, Fluent Bit-Fluentd-Elasticsearch-Kibana logging, service dependencies and proxy or firewall configuration with responsible teams.")
y -= 10
y = job(c, y, "DevOps Engineer  |  PT Pinus Pintar Community", "", "DeployAja and SIDRA")
y = bullet(c, y, "Built and maintained GitHub Actions pipelines and Docker/Kubernetes deployment templates for application releases.")
y = bullet(c, y, "Worked on Prometheus/Grafana monitoring, ingress routing and operational troubleshooting with developers and product owners.")
if y < 55:
    raise RuntimeError(f"Page 1 content overflow: {y:.1f}")
page_number(c, 1)
c.showPage()

# Second page
c.setFillColor(BG)
c.rect(0, H - 92, W, 92, fill=1, stroke=0)
line(c, M, H-47, "INDEPENDENT PLATFORM & SELECTED WORK", "DSB", 15, WHITE)
line(c, M, H-67, "Architecture, delivery boundaries and evidence-led examples", "DS", 8.8, CYAN)
y = H-124
y = section(c, y, "Kubernetes platform | independent build | 2026")
y = wrapped(c, M, y, "Built and operate a KVM/libvirt environment with three control-plane VMs, three worker VMs, load-balancing VMs and separate CI, registry, observability, storage and database services. Zabisa and other applications run on the shared cluster. All VMs depend on one physical host; this is not physical high availability.", W-2*M, 9.1, 14)-10
y = bullet(c, y, "Kubernetes platform: Calico networking, ingress-nginx, MetalLB, Vault secret injection, observability and MinIO media storage.")
y = bullet(c, y, "Delivery: source quality checks, Jenkins, SonarQube, Trivy, SBOMs, immutable Harbor images, GitOps and reviewed Argo CD sync.")
y = bullet(c, y, "Recovery practice: encrypted MySQL backup, isolated restore verification and revision-bound development/test rollout; no public production or recovery-time claim.")
y -= 10
y = section(c, y, "Selected technical decisions")
y = bullet(c, y, "Go coverage: traced an apparent 0% report through Bamboo shell execution and Go coverage.out import until SonarQube loaded coverage and passed the quality gate.")
y = bullet(c, y, "Bun CI experiment: prepared a Debian Bun 1.4.2 container and branch-specific Bamboo wrapper while keeping other branches on npm; full migration awaited the repository lockfile.")
y = bullet(c, y, "Release automation: maintained Bamboo inline scripts and scripts versioned with Helm configuration for production handoffs; execution was shared with authorized operations teams.")
y -= 10
y = section(c, y, "Technical toolkit")
rows=[
 ("Delivery", "Bamboo, Jenkins, GitHub Actions, GitOps, Argo CD, Bash"),
 ("Platform", "Kubernetes, OpenShift, KVM/libvirt, Helm, Docker, Podman"),
 ("Security", "SonarQube, SAST/SCA, Trivy, Vault, SBOM, Harbor, Nexus"),
 ("Operations", "Prometheus, Grafana, Fluent Bit, Fluentd, Elastic, Kibana"),
 ("Storage", "MySQL, MinIO, backup and isolated restore practice"),
]
for name, value in rows:
    line(c, M, y, name.upper(), "DSB", 8.0, BLUE)
    line(c, M + 87, y, value, "DS", 8.3, INK)
    y -= 19
y -= 9
y = section(c, y, "Training")
y = wrapped(c, M, y, "DevOps / Cloud / Kubernetes course, PT Pinus Pintar Community IT, Semarang.", W-2*M, 9, 14)
if y < 55:
    raise RuntimeError(f"Page 2 content overflow: {y:.1f}")
page_number(c, 2)
c.save()
print(f"Created {OUT} ({OUT.stat().st_size} bytes)")
