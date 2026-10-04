export const TOPICS = [
  { id: "delivery", label: "CI/CD & Strategi Rilis" },
  { id: "automation", label: "Scripting & Otomasi" },
  { id: "quality", label: "DevSecOps & Quality Gate" },
  { id: "platform", label: "Kubernetes & Container" },
  { id: "operations", label: "Observabilitas & Operasi" },
  { id: "recovery", label: "GitOps & Disaster Recovery" },
] as const;

export type Topic = (typeof TOPICS)[number]["id"];
export type Scope = "enterprise" | "independent";
export type EvidenceStatus = "sanitized" | "in-progress" | "public-reference";

export type CaseStudy = Readonly<{
  slug: string;
  number: string;
  featured: boolean;
  scope: Scope;
  confidentiality: "enterprise-sanitized" | "independent-public";
  evidenceStatus: EvidenceStatus;
  reviewNote: string;
  title: string;
  summary: string;
  role: string;
  period: string;
  context: string;
  problem: string;
  action: string;
  impact: string;
  constraints: readonly string[];
  architecture: readonly string[];
  implementation: readonly string[];
  validation: readonly string[];
  limits: readonly string[];
  tags: readonly Topic[];
  tools: readonly string[];
  links: readonly Readonly<{ label: string; href: string }>[];
}>;

/** Studi kasus portofolio DevOps: menggabungkan lingkup enterprise perbankan (BRI) dan infrastruktur homelab mandiri dari nol. */
export const cases = [
  {
    slug: "enterprise-delivery-diagnostics",
    number: "01",
    featured: true,
    scope: "enterprise",
    confidentiality: "enterprise-sanitized",
    evidenceStatus: "sanitized",
    reviewNote: "Disusun dari lingkup kerja nyata di BRI; nama layanan internal dan kredensial disamarkan sesuai NDA perbankan.",
    title: "Standarisasi CI/CD, Helm, & Diagnostik pada 200+ Microservices",
    summary: "Mengelola pipeline Bamboo dengan strategi gate per branch, konfigurasi Helm lintas 6 tahap environment (Dev hingga Prod), serta orkestrasi rilis multi-site (DC, DRC, GCP) bersama tim IBO.",
    role: "DevOps Engineer · BRI",
    period: "Nov 2025 – sekarang",
    context: "Ekosistem mobile banking berskala enterprise dengan 200+ microservices (layanan legacy maupun arsitektur baru) yang didistribusikan melintasi siklus ketat: Dev → QA → Pentest → UAT → Preprod → Prod (terbagi menjadi Prod Isolated dan Prod Existing pada 3 wilayah: DC, DRC, dan GCP).",
    problem: "Mengelola ratusan microservice menuntut keselarasan antara Dockerfile, aturan pipeline CI per branch, nilai konfigurasi Helm di tiap environment, serta kesiapan runtime OpenShift. Tanpa standarisasi gate dan visibilitas log yang jelas, potensi kegagalan saat perpindahan environment maupun serah-terima produksi akan sangat tinggi.",
    action: "Saya menyiapkan dan merawat plan Bamboo dengan kebijakan gate spesifik (hardgate unit test pada branch feature, softgate pada branch dev, serta build & push image murni di jalur prod), mengelola base Dockerfile dan template Helm lintas 6 tahap environment, memvalidasi konfigurasi untuk 3 target produksi (DC, DRC, GCP), serta menelusuri insiden deployment melalui Fluent Bit/Fluentd/ELK dan integrasi middleware (RabbitMQ, Redis, Kafka).",
    impact: "Mendukung kelancaran rilis berkala untuk ratusan layanan dengan standar kualitas otomatis sejak fase awal, menghasilkan image produksi yang terverifikasi dan bersih dari test dependencies, serta mempercepat investigasi gangguan rollout sebelum serah-terima ke tim operasional.",
    constraints: [
      "Menerapkan Segregation of Duties ketat: eksekusi perubahan di cluster produksi dilakukan oleh tim IBO (Internal Banking Operations), di mana peran DevOps adalah menyiapkan seluruh kesiapan teknis microservices dan skrip rilis.",
      "Identitas nama service, topologi IP jaringan internal, namespace, serta alamat registry Nexus privat disamarkan.",
      "Melibatkan koordinasi intensif bersama tim Developer, Principal, Platform, Middleware, Database, dan IBO.",
    ],
    architecture: [
      "Branch Gate (Feature Hardgate / Dev Softgate)",
      "Prod Build & Push Image (Nexus)",
      "Helm Multi-Env (Dev→QA→Pentest→UAT→Preprod)",
      "Prod Multi-Site Rollout (DC, DRC, GCP via IBO)",
    ],
    implementation: [
      "Mengonfigurasi aturan pipeline Bamboo berdasarkan siklus branch: menerapkan hardgate pada branch feature untuk memastikan kualitas unit test dan SAST/SCA, softgate pada branch dev untuk integrasi cepat, dan meniadakan unit test pada jalur prod agar fokus murni pada build image dan push ke Nexus.",
      "Merawat base Dockerfile dan menyelaraskan values Helm, referensi ConfigMap/Secret, alokasi CPU/Memory (resource requests & limits), serta liveness/readiness probe dari environment Dev, QA, Pentest, UAT, Preprod hingga Prod.",
      "Memastikan kesiapan konfigurasi deployment untuk didistribusikan ke tiga target data center produksi: Data Center utama (DC), Disaster Recovery Center (DRC), dan Google Cloud Platform (GCP).",
      "Menginvestigasi kendala runtime pod di OpenShift dan melacak aliran log aplikasi menggunakan tumpukan Fluent Bit, Fluentd, Elasticsearch, dan Kibana (EFK).",
      "Mengoordinasikan integrasi aplikasi terhadap RabbitMQ, Redis, dan Kafka bersama pemilik layanan, serta memvalidasi jalur proxy dan firewall sebelum rilis.",
    ],
    validation: [
      "Verifikasi konsistensi hasil render manifest Helm, kecocokan tag image di Nexus, serta kesiapan health probe dan event pod saat deployment di setiap tahapan environment.",
      "Validasi kesiapan rilis melalui tiket Jira dan sesi tabletop bersama tim terkait sebelum proses serah-terima ke tim operasional perbankan (IBO).",
    ],
    limits: [
      "Detail manifest YAML internal, log transaksi, dan metrik SLA internal perbankan tidak dipublikasikan secara terbuka.",
      "Pengelolaan infrastruktur inti message broker dan firewall dilakukan melalui koordinasi bersama tim infrastruktur terkait.",
    ],
    tags: ["delivery", "platform", "operations"],
    tools: ["Bamboo", "Docker", "Helm", "OpenShift", "Nexus", "Fluent Bit", "Elasticsearch", "Kibana"],
    links: [],
  },
  {
    slug: "scripted-release-promotion",
    number: "02",
    featured: true,
    scope: "enterprise",
    confidentiality: "enterprise-sanitized",
    evidenceStatus: "sanitized",
    reviewNote: "Studi kasus otomasi rilis enterprise; menjelaskan alur promosi Prod Isolated ke Existing tanpa mengungkap parameter privat.",
    title: "Otomatisasi Promosi Rilis Dua Fase: Prod Isolated → Prod Existing (DC, DRC, GCP)",
    summary: "Membangun otomatisasi skrip Bamboo dan repositori Helm untuk mengawal promosi rilis dua fase: pilot internal 1–2 minggu di Prod Isolated sebelum rilis publik di Prod Existing bersama tim IBO.",
    role: "DevOps Engineer · BRI",
    period: "Nov 2025 – sekarang",
    context: "Di BRI, lingkungan produksi menerapkan pemisahan dua fase: Prod Isolated (lingkungan produksi tertutup yang hanya dapat diakses karyawan internal bank selama 1–2 minggu untuk masa internal pilot / soak test) dan Prod Existing (lingkungan real production yang melayani jutaan nasabah publik) yang terdistribusi di DC, DRC, dan GCP.",
    problem: "Mengawal promosi rilis yang melintasi 6 tahap environment dan beralih dari fase internal Prod Isolated menuju Prod Existing pada 3 site (DC, DRC, GCP) sangat rentan human error apabila pemilihan target environment, pemetaan versi image, dan injeksi parameter Helm dilakukan manual saat window rilis.",
    action: "Saya membangun dan memelihara skrip otomatisasi Shell (baik sebagai inline script di Bamboo maupun skrip terkelola di dalam repositori Helm) untuk menstandarkan logika pemilihan environment, memverifikasi kesiapan microservices, memastikan artefak image teruji di Prod Isolated, serta mendampingi tim IBO (Internal Banking Operations) saat eksekusi rollout ke Prod Existing.",
    impact: "Menghilangkan risiko kesalahan parameter manual saat window rilis, memastikan setiap fitur baru telah melewati masa uji coba transaksi internal 1–2 minggu di Prod Isolated secara terkontrol, dan memperlancar proses serah-terima operasional rilis publik ke tim IBO.",
    constraints: [
      "Sesuai tata kelola perbankan, eksekusi deployment akhir ke cluster produksi dijalankan oleh tim IBO (Internal Banking Operations); peran DevOps adalah menyiapkan seluruh kesiapan microservices, konfigurasi, dan memastikan kelancaran skrip promosi.",
      "Parameter IP klaster, kredensial service account, dan struktur direktori internal dirahasiakan.",
    ],
    architecture: [
      "Pipeline Bamboo & Helm Scripting",
      "Fase 1: Prod Isolated (Internal Pilot 1-2 Minggu)",
      "Tabletop & Handoff ke Tim IBO",
      "Fase 2: Prod Existing (Publik di DC, DRC, GCP)",
    ],
    implementation: [
      "Menyusun logika inline script pada Bamboo untuk memvalidasi branch, memisahkan alur non-prod dengan alur prod (yang dikhususkan untuk build image, push, dan persiapan rilis tanpa eksekusi ulang unit test).",
      "Mengintegrasikan file skrip otomatisasi langsung di dalam repositori Helm sehingga setiap perubahan logika deployment tercatat di Git berdampingan dengan chart dan values environment.",
      "Menyiapkan alur promosi dua fase: mengarahkan deployment awal ke Prod Isolated untuk pengujian internal selama 1–2 minggu guna memvalidasi stabilitas transaksi sebelum fitur dibuka ke publik luas.",
      "Mengoordinasikan serah-terima ke tim IBO (Internal Banking Operations) melalui tiket Jira dan sesi tabletop pra-rilis, mendampingi proses eksekusi rollout ke Prod Existing di DC, DRC, dan GCP, serta memantau kesehatan pod pasca-rilis.",
    ],
    validation: [
      "Peninjauan parameter rilis, kecocokan digest/tag image, dan hasil render chart pada sesi tabletop sebelum rilis dijalankan.",
      "Konfirmasi keberhasilan masa soak test 1–2 minggu di Prod Isolated sebelum persetujuan rilis ke Prod Existing diberikan bersama tim IBO.",
    ],
    limits: [
      "Potongan kode bash internal milik perusahaan tidak dilampirkan secara publik untuk melindungi struktur pipeline perbankan.",
      "Otorisasi akhir jadwal rilis berada di bawah kendali Release Management dan IBO.",
    ],
    tags: ["delivery", "automation", "platform"],
    tools: ["Bamboo", "Bash Scripting", "Helm", "OpenShift", "Jira"],
    links: [],
  },
  {
    slug: "multi-vm-kubernetes-platform",
    number: "03",
    featured: true,
    scope: "independent",
    confidentiality: "independent-public",
    evidenceStatus: "sanitized",
    reviewNote: "Arsitektur klaster beroperasi nyata dan diverifikasi langsung melalui kubectl; detail IP internal dan kredensial disamarkan secara aman.",
    title: "Merancang & Membangun Platform Kubernetes HA Multi-VM dari Nol (KVM/libvirt)",
    summary: "Membangun klaster Kubernetes HA v1.30 dari nol di atas bare-metal KVM (3 Control-Plane, 3 Worker) dengan Dual HAProxy + Keepalived VIP, Longhorn Distributed Storage, Vault HA, dan Dedicated Services VM.",
    role: "Platform & DevOps Engineer · Proyek Infrastruktur Mandiri",
    period: "2026 – sekarang",
    context: "Di lingkungan perbankan enterprise, pembuatan klaster dari level hypervisor dan bare-metal umumnya dipisahkan ke divisi platform khusus. Untuk membuktikan penguasaan arsitektur secara menyeluruh (end-to-end), saya membangun laboratorium platform Kubernetes production-grade sendiri dari nol di atas server bare-metal.",
    problem: "Menjalankan puluhan microservices modern membutuhkan ekosistem platform yang tangguh: kontrol API server yang redundant (High Availability), jaringan CNI dengan isolasi kebijakan keamanan, sistem penyimpanan terdistribusi persisten (bukan host-path lokal), manajemen secret terenkripsi dinamis, serta pemisahan beban kerja aplikasi dari server CI/CD, container registry, dan database.",
    action: "Saya merancang dan melakukan provisioning multi-VM di atas KVM/libvirt: membangun Dual Load Balancer (HAProxy + Keepalived dengan Virtual IP floating 192.168.100.60), 3 node Control-Plane (etcd quorum) dan 3 node Worker K8s v1.30.14 dengan containerd 2.2 dan Calico CNI v3.28. Di luar klaster, saya mengisolasi dedicated VM untuk Jenkins CI, Harbor Registry, ELK Stack + SonarQube, dan Database. Di dalam klaster, saya mengimplementasikan Longhorn Distributed Block Storage, HashiCorp Vault HA dengan auto-injector sidecar, MetalLB, dan Ingress-Nginx.",
    impact: "Menghasilkan platform Kubernetes mandiri production-grade yang aktif menampung lebih dari 30+ workload container (termasuk 10 microservices Zabisa Super App dengan 2 replika per service, Tropical OS, dan monitoring full-stack Prometheus-Grafana), lengkap dengan persistensi data terdistribusi dan injeksi secret terpusat.",
    constraints: [
      "Provisioning dilakukan dengan kernel parameter tuning (br_netfilter, overlay, net.ipv4.ip_forward = 1) dan swap disabled pada seluruh node Ubuntu 22.04 LTS.",
      "Akses administrasi jaringan diamankan melalui Bastion Jump Host (ProxyJump, SSH key ed25519, dan SSH agent forwarding).",
      "Konektivitas publik dienkripsi dan diamankan menggunakan Cloudflare Tunnel dan Cert-Manager tanpa membuka port sensitif ke internet publik.",
    ],
    architecture: [
      "Dual HAProxy + Keepalived VRRP (Floating VIP 192.168.100.60:6443)",
      "3 Control-Plane & 3 Worker Nodes (K8s v1.30.14 · Calico CNI)",
      "Longhorn Replicated Storage & HashiCorp Vault HA Injector",
      "Dedicated VMs (Jenkins CI, Harbor Registry, ELK-Sonar, Database)",
    ],
    implementation: [
      "Menyiapkan lapisan High Availability Layer 4 TCP load balancing menggunakan 2 VM (lb-dt-1 MASTER priority 101 dan lb-dt-2 BACKUP priority 100) dengan Keepalived vrrp_script failover dan Virtual IP floating (192.168.100.60:6443) untuk mendistribusikan trafik API server ke 3 node master.",
      "Menginisialisasi klaster dengan kubeadm HA multi-master (upload-certs, etcd quorum), containerd 2.2 dengan SystemdCgroup=true, serta menginstal Calico CNI v3.28 untuk perutean pod dan penegakan NetworkPolicy antarnamespace.",
      "Memisahkan server pendukung kritis ke VM mandiri di luar klaster: dedicated Jenkins CI (192.168.100.57), private Harbor container registry (192.168.100.58), ELK stack dan SonarQube (192.168.100.59), serta dedicated MySQL Database (192.168.100.70).",
      "Menginstal Longhorn Distributed Storage (longhorn-system) sebagai default StorageClass untuk dynamic provisioning PVC tereplikasi di seluruh worker node, mendukung persistensi data Vault audit/data, WhatsApp engine, dan stateful services.",
      "Mendeploy HashiCorp Vault HA cluster (3 replica pods: vault-0, vault-1, vault-2) bersama Vault Agent Injector untuk menyuntikkan token dan kredensial secara aman ke container aplikasi via sidecar pattern tanpa hardcode secret di Git.",
      "Mengonfigurasi MetalLB bare-metal load balancer (VIP 192.168.100.63), Ingress-Nginx Controller, serta perutean terproteksi ke domain backoffice dan dashboard menggunakan Cloudflare Tunnel.",
    ],
    validation: [
      "Verifikasi berkala menunjukkan seluruh 6 node (3 master + 3 worker) berstatus Ready 70d+ uptime dengan kernel Linux 5.15 dan containerd 2.2.",
      "Seluruh namespace platform aktif dan sehat: argocd, cert-manager, cloudflare, ingress-nginx, longhorn-system, metallb-system, monitoring, vault, test-app, dan zabisa-app.",
      "Uji failover Keepalived terbukti memindahkan VIP 192.168.100.60 ke node backup secara instan saat service HAProxy master dimatikan.",
    ],
    limits: [
      "Meskipun lapisan VM, control plane, worker, storage, dan load balancer telah terisolasi secara High Availability, seluruh VM berjalan pada satu server fisik bare-metal (KVM/libvirt).",
      "Akses dashboard Headlamp dan Longhorn UI dibatasi pada jaringan lokal dan tunnel privat.",
    ],
    tags: ["platform", "operations", "recovery"],
    tools: ["Kubernetes v1.30", "KVM/libvirt", "HAProxy", "Keepalived", "Calico CNI", "Longhorn", "HashiCorp Vault", "MetalLB", "Ingress-Nginx"],
    links: [],
  },
  {
    slug: "zabisa-controlled-delivery",
    number: "04",
    featured: false,
    scope: "independent",
    confidentiality: "independent-public",
    evidenceStatus: "sanitized",
    reviewNote: "Diverifikasi dari pipeline Jenkins, Harbor registry, dan status pod operasional di namespace zabisa-app.",
    title: "Implementasi DevSecOps, GitOps Argo CD, & Multi-Microservice Delivery (Zabisa)",
    summary: "Mengelola siklus rilis 10 microservices Zabisa Super App (20 healthy pods) menggunakan Jenkins CI, Harbor Registry, Trivy vulnerability scan, SBOM, Vault secret injection, dan rekonsiliasi GitOps Argo CD.",
    role: "DevOps & Platform Engineer · Proyek Mandiri",
    period: "2026 – sekarang",
    context: "Zabisa Super App merupakan aplikasi terdistribusi yang terdiri dari 10 microservices (API Gateway, Identity, Academic, Student, Tahfidz, Donation, Media, Notification, Content, dan Admin Web) yang berjalan aktif di atas klaster Kubernetes multi-VM mandiri.",
    problem: "Mengelola rilis untuk 10 microservice yang saling terintegrasi rawan menimbulkan bottleneck deployment, celah keamanan pada dependensi container, ketidakkonsistenan konfigurasi environment (configuration drift), serta risiko kebocoran kredensial database.",
    action: "Saya membangun arsitektur pengiriman end-to-end: pipeline Jenkins otomatis yang melakukan unit test, analisis SonarQube, pemindaian kerentanan image dengan Trivy, dan pembuatan SBOM sebelum mempublikasikan immutable image ke private Harbor Registry. Di sisi deployment, saya mengimplementasikan GitOps deklaratif dengan Argo CD, manajemen secret melalui HashiCorp Vault Agent Injector, serta otomatisasi backup database terenkripsi.",
    impact: "Seluruh 10 microservices Zabisa (total 20 pods dengan konfigurasi 2 replika per service untuk HA) berjalan stabil dalam status Running, dengan pembaruan manifest yang terlacak penuh di repositori GitOps dan kredensial yang disuntikkan secara dinamis saat runtime.",
    constraints: [
      "Setiap rilis image diberi tag immutable berbasis commit hash untuk mempermudah audit jejak rilis dan proses rollback instan via Argo CD.",
      "Kredensial database tidak disimpan di manifest Kubernetes maupun repositori Git, melainkan diambil saat container start melalui Vault Agent Injector sidecar.",
    ],
    architecture: [
      "Jenkins CI: Test, SonarQube, Trivy Scan & SBOM",
      "Private Harbor Registry (harbor-dt.co.id)",
      "Declarative GitOps Sync via Argo CD",
      "Vault Secret Injection & 20 Pods HA (10 Services)",
    ],
    implementation: [
      "Menyusun pipeline Jenkins multi-stage: checkout kode, eksekusi unit test, pemindaian static code analysis (SonarQube), pemindaian vulnerability container image (Trivy), serta pembuatan Software Bill of Materials (SBOM) sebelum mendorong image ke Harbor privat.",
      "Menerapkan prinsip GitOps dengan memisahkan repository kode sumber dari repository konfigurasi manifest Kubernetes, sehingga Argo CD melakukan rekonsiliasi otomatis hanya dari branch manifest yang telah disetujui.",
      "Mengonfigurasi deployment 10 microservices Zabisa di namespace zabisa-app dengan pola High Availability (2 replika per service: api-gateway, identity, academic, student, tahfidz, donation, media, notification, content, admin-web).",
      "Mengintegrasikan Vault Agent Injector sidecar pada pod Zabisa untuk menyuntikkan kredensial database dan API keys langsung ke volume in-memory (/vault/secrets) saat container diinisialisasi (2/2 containers running).",
      "Menghubungkan Ingress-Nginx dan MetalLB dengan domain publik backoffice-dt.zabisa.my.id yang diarahkan secara aman melalui Cloudflare.",
      "Menjalankan runbook pemeliharaan berkala: backup database terenkripsi ke dedicated storage dan latihan verifikasi restore di environment terisolasi.",
    ],
    validation: [
      "Pemeriksaan namespace zabisa-app mengonfirmasi 20 pod microservices aktif berjalan (Running) dengan zero restart dan injeksi secret sidecar terverifikasi (2/2 containers).",
      "Status aplikasi di Argo CD berstatus Synced dan Healthy, membuktikan sinkronisasi konfigurasi deklaratif tanpa drift.",
      "Laporan pemindaian keamanan Trivy dan SonarQube tersimpan di Harbor dan server ELK-sonar untuk memenuhi standar audit mutu.",
    ],
    limits: [
      "Arsitektur saat ini dioperasikan pada lingkungan homelab enterprise simulation untuk mendukung pengembangan dan pengujian sistem terdistribusi.",
    ],
    tags: ["delivery", "quality", "platform", "recovery"],
    tools: ["Jenkins", "Harbor", "Trivy", "SBOM", "SonarQube", "HashiCorp Vault", "Argo CD", "Kubernetes", "MetalLB", "Cloudflare"],
    links: [],
  },
  {
    slug: "go-coverage-quality-gate",
    number: "05",
    featured: false,
    scope: "enterprise",
    confidentiality: "enterprise-sanitized",
    evidenceStatus: "sanitized",
    reviewNote: "Berdasarkan penyelesaian masalah nyata pada pipeline CI microservice Go di BRI; log internal disamarkan.",
    title: "Integrasi DevSecOps (SAST/SCA/SonarQube) & Perbaikan Coverage Go di CI",
    summary: "Mengintegrasikan pemeriksaan keamanan kode (SAST, SCA, SonarQube) pada pipeline Bamboo serta mendiagnosis masalah pembacaan laporan coverage.out pada microservice Go yang sempat bernilai 0%.",
    role: "DevOps Engineer · BRI",
    period: "2026",
    context: "Dalam kebijakan pipeline BRI, branch feature menerapkan hardgate ketat untuk unit test dan analisis kualitas kode, sedangkan branch dev menggunakan softgate. Salah satu microservice berbasis Go mengalami kendala di mana hasil test coverage pada SonarQube selalu terbaca 0% meskipun unit test telah berjalan.",
    problem: "Ketika laporan coverage.out tidak terbaca dengan benar oleh sensor SonarQube di Bamboo, metrik cakupan kode menjadi tidak akurat (0%) dan menghambat validasi hardgate pada branch feature maupun visibilitas kualitas kode pada branch dev.",
    action: "Selain menyiapkan integrasi standar SAST dan SCA pada alur CI, saya menginvestigasi urutan eksekusi task pada plan Bamboo layanan Go tersebut, menstandarkan eksekusi pengujian ke dalam Bamboo shell task, memastikan file coverage.out tergenerasi di path kerja yang tepat, dan menyelaraskan konfigurasi properti scanner SonarQube.",
    impact: "Sensor Go Cover pada SonarQube berhasil mengimpor artefak coverage.out secara akurat, persentase cakupan tes tampil sesuai kondisi kode sebenarnya, dan mekanisme quality gate kembali berfungsi normal.",
    constraints: [
      "Perbaikan difokuskan pada arsitektur pipeline CI dan integrasi scanner DevSecOps, sementara penulisan unit test tetap menjadi ranah tim developer aplikasi.",
      "Nama repositori, identitas proyek SonarQube, dan log internal tidak dipublikasikan.",
    ],
    architecture: [
      "Trigger Branch (Feature Hardgate / Dev Softgate)",
      "Eksekusi Go Test & Artefak coverage.out",
      "Pemindaian SAST, SCA & SonarQube Scanner",
      "Validasi Quality Gate Lulus",
    ],
    implementation: [
      "Menyiapkan tahapan pemeriksaan SAST, analisis komposisi dependensi (SCA), dan SonarQube pada template pipeline Bamboo.",
      "Mengubah mekanisme pemanggilan test Go ke dalam task shell Bamboo yang terkontrol agar pembuatan artefak coverage.out konsisten di setiap build agent.",
      "Memastikan kesesuaian variabel working directory dan parameter sonar.go.coverage.reportPaths sebelum scanner dijalankan.",
      "Menjalankan ulang pipeline dan memverifikasi log pembacaan sensor Go Cover hingga evaluasi quality gate dinyatakan lulus.",
    ],
    validation: [
      "Log eksekusi CI mengonfirmasi sensor Go Cover berhasil memproses file coverage.out dan metrik coverage langsung tercatat di dashboard SonarQube.",
      "Status quality gate pada pipeline kembali hijau dan siap mendukung alur penggabungan kode (merge) sesuai aturan branch.",
    ],
    limits: [
      "Angka persentase coverage spesifik milik layanan internal sengaja tidak dicantumkan untuk menjaga privasi proyek.",
    ],
    tags: ["delivery", "quality"],
    tools: ["Bamboo", "SonarQube", "Go", "SAST", "SCA", "Bash"],
    links: [],
  },
  {
    slug: "bun-runtime-for-ci",
    number: "06",
    featured: false,
    scope: "enterprise",
    confidentiality: "enterprise-sanitized",
    evidenceStatus: "in-progress",
    reviewNote: "Desain custom image dan wrapper isolasi per branch telah tervalidasi di pipeline CI enterprise.",
    title: "Isolasi Runtime CI dengan Custom Container Image pada Shared Build Agent",
    summary: "Merancang custom container image berbasis Debian (Bun 1.4.2, Git, SSH, CA certs) beserta wrapper script di Bamboo agar pengujian runtime baru pada satu branch tidak mengganggu ratusan job Node/npm lainnya.",
    role: "DevOps Engineer · BRI",
    period: "2026",
    context: "Sebuah monorepo aplikasi mobile (React Native) di lingkungan CI Bamboo membutuhkan uji coba menggunakan runtime Bun pada branch eksperimen, sementara seluruh branch utama lainnya masih bergantung penuh pada ekosistem Node.js dan npm di shared build agent.",
    problem: "Mengubah atau menginstal runtime baru secara langsung di host shared build agent berisiko mengganggu stabilitas ratusan job pipeline layanan lain yang berjalan di agent yang sama.",
    action: "Saya membangun custom container image berbasis Debian yang telah dilengkapi Bun 1.4.2, Git, konfigurasi SSH, dan sertifikat CA internal perusahaan, lalu menulis wrapper script pendeteksi branch di Bamboo menggunakan Podman untuk mengarahkan hanya branch eksperimen ke dalam container tersebut.",
    impact: "Eksperimen runtime baru dapat berjalan secara terisolasi penuh di infrastruktur CI enterprise tanpa menyentuh konfigurasi host agent bersama, sekaligus mempertahankan jalur build Node/npm yang stabil untuk seluruh branch reguler.",
    constraints: [
      "Kredensial repositori dan variabel lingkungan disuntikkan secara aman saat runtime tanpa disimpan di dalam layer container image.",
      "Branch reguler (dev, qa, pentest, uat, preprod, prod) tetap terjamin berjalan menggunakan alur standar yang sudah mapan.",
    ],
    architecture: [
      "Deteksi Branch di Pipeline Bamboo",
      "Branch Eksperimen → Container Debian Bun 1.4.2",
      "Branch Reguler → Jalur Standar Node/npm",
      "Isolasi Penuh pada Shared Build Agent",
    ],
    implementation: [
      "Menyusun Dockerfile khusus untuk image CI berbasis Debian dengan menyertakan binary Bun 1.4.2, utilitas SCM (Git/SSH), serta registrasi root CA internal agar dapat mengakses registry dan repositori privat.",
      "Membuat wrapper script Shell pada job Bamboo yang mengevaluasi nama branch aktif secara otomatis sebelum mengeksekusi perintah instalasi dan build.",
      "Mengintegrasikan eksekusi container menggunakan Podman sehingga dependensi Bun terisolasi sepenuhnya dari sistem operasi host agent.",
    ],
    validation: [
      "Container image berhasil tervalidasi menjalankan Bun 1.4.2 beserta autentikasi Git/SSH dan koneksi TLS internal di dalam pipeline Bamboo.",
      "Logika pemilih branch terbukti mengarahkan branch uji coba ke container Bun dan menjaga branch lainnya tetap di jalur Node/npm.",
    ],
    limits: [
      "Penerapan penuh ke seluruh branch menunggu finalisasi penyelarasan lockfile dari tim pengembang aplikasi.",
    ],
    tags: ["delivery", "platform", "automation"],
    tools: ["Podman", "Docker", "Bun", "Debian", "Bamboo", "Bash"],
    links: [],
  },
] as const satisfies readonly CaseStudy[];

function validateCases() {
  const slugs = new Set<string>();
  for (const entry of cases) {
    const item: CaseStudy = entry;
    for (const key of ["slug", "title", "summary", "role", "period", "context", "problem", "action", "impact", "reviewNote"] as const) {
      if (!item[key].trim()) throw new Error("Case record has an empty required field: " + key);
    }
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.slug) || slugs.has(item.slug)) {
      throw new Error("Invalid or duplicate case slug: " + item.slug);
    }
    slugs.add(item.slug);
    if (item.architecture.length < 3 || item.validation.length === 0 || item.tags.length === 0) {
      throw new Error("Case record lacks architecture, validation or tags: " + item.slug);
    }
    if (item.scope === "enterprise" && item.links.length !== 0) {
      throw new Error("Review and sanitize enterprise links before publishing: " + item.slug);
    }
    for (const link of item.links) {
      if (!link.label.trim() || !link.href.startsWith("https://")) {
        throw new Error("Invalid public reference in case: " + item.slug);
      }
    }
  }
}
validateCases();

export function caseHref(slug: string): string {
  if (!cases.some((item) => item.slug === slug)) throw new Error("Unknown case slug: " + slug);
  return "/work/" + slug;
}

export function getCaseBySlug(slug: string): CaseStudy | undefined {
  return cases.find((item) => item.slug === slug);
}
