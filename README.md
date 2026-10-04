# Dita DevOps Portfolio — tinjauan konten Bahasa Indonesia

**Status saat ini:** teks website dan CV yang ditautkan tersedia dalam Bahasa Indonesia untuk diperiksa Dita. Struktur halaman, URL studi kasus, logika filter, animasi, serta batas klaim dari Fase 6 tetap dipakai. Ini tahap penyuntingan isi; terjemahan Inggris profesional dilakukan setelah redaksi Indonesia disetujui. Lihat `docs/TERJEMAHAN_KONTEN_DAN_REVIEW_ID.md` untuk perbandingan dengan copy Inggris sebelumnya dan `docs/REVIEW_BAHASA_INDONESIA.md` untuk daftar pemeriksaan.

Next.js App Router portfolio with a continuous animated atmosphere, a filterable work index, six case study pages, a career timeline, a real portrait, public contact actions, and a versioned downloadable CV. Public role: **DevOps Engineer (mid-level)**, currently active as a vendor DevOps engineer at BRI. Zabisa is a multi-VM cluster sharing one physical host. Terminal values are illustrative; no endpoint connects to enterprise or homelab systems.

## Update on your Linux laptop (zsh)

Download patch Bahasa Indonesia dari percakapan dan salin ke folder Downloads. Jika proyek sudah ada di `~/project-homelab`:

```bash
unzip -o ~/Downloads/Dita_Portfolio_Bahasa_Indonesia_Review_Patch.zip -d ~/project-homelab
cd ~/project-homelab/dita-devops-portfolio
npm run dev
```

Hentikan server lama dengan Ctrl+C sebelum menjalankan ulang. Simpan salinan perubahan lokal jika ada sebelum menggunakan `-o`. Tidak ada perubahan dependency; instalasi yang sudah memiliki `node_modules` tidak perlu menjalankan `npm ci` ulang.

For a fresh installation, use the complete archive instead:

```bash
mkdir -p ~/project-homelab
unzip ~/Downloads/Dita_DevOps_Portfolio_Phase_6.zip -d ~/project-homelab
cd ~/project-homelab/dita-devops-portfolio
npm ci
npm run dev
```

This project targets Node.js 22 (see `.nvmrc`). Open `http://localhost:3000`, then visit `/work`. Select Enterprise or Independent, change Topic, and open the case pages. A bookmarked query such as `/work?scope=enterprise&topic=quality` should restore its filters on a fresh load.

Kunjungi `/work/multi-vm-kubernetes-platform`, `/resume`, dan bagian kontak. Tombol CV kini mengunduh `/resume/Dita_Setya_Kurniawan_CV_ID_2026-09.pdf` yang berbahasa Indonesia. PDF Inggris lama masih ada sebagai referensi untuk tahap penerjemahan akhir. Kasus cakupan tes menggunakan Go/`coverage.out`; URL React Native yang lama dialihkan ke kasus itu. Detail internal perusahaan, IP pribadi, jalur SSH, dan kredensial tidak ditampilkan. Repositori sumber Zabisa bersifat privat.

## Verification

```bash
npm run typecheck
npm run build
node --experimental-strip-types --test tests/atmosphere-geometry.test.mjs
```

The home page links three featured cases and the scripting case to the typed content at `/work`. Expertise cards and the timeline link to relevant detail pages. See `docs/WORK_CASES.md`, `docs/PHASE_5.md`, `docs/PHASE_6.md` and `docs/CLAIM_AUDIT_2026-09-27.md` for acceptance and claim boundaries.

## Homelab image

```bash
docker build -t dita-devops-portfolio:phase6 .
docker run --rm -p 3000:3000 dita-devops-portfolio:phase6
curl -fsS http://localhost:3000/api/health
```

The image serves port 3000 as a non-root user. Configure the cluster Deployment, Service, and ingress or route once the namespace, registry address, public hostname, and TLS policy are known. The `/api/health` route supports readiness and liveness probes.

## Portrait and CV

Foto disimpan di `public/profile/dita.png`. Kontak dan tautan PDF diatur dalam `src/content/profile.ts`. `scripts/generate-cv-id.py` membuat ulang CV Bahasa Indonesia; `scripts/generate-cv.py` menyimpan sumber PDF Inggris. Keduanya membutuhkan Python ReportLab dan font pada lingkungan pembuatan PDF. PDF sudah disertakan dalam paket; container produksi tidak membutuhkan Python.

## Project map

```text
src/
  app/
    api/health/route.ts       readiness endpoint
    globals.css               global styling and reduced motion
    layout.tsx                fonts and metadata
    page.tsx                  landing page
    resume/page.tsx           public professional overview
    privacy/page.tsx          application privacy summary
    work/page.tsx             query-filterable case index
    work/[slug]/page.tsx      statically generated case details
  components/
    background/               shared atmosphere and geometry
    contact/                  optional public email actions
    hero/                     headline and optional portrait
    layout/                   shared header, mobile menu, footer
    sections/                 expertise, featured work, timeline
    system/                   illustrative terminal
    work/                     filters, badges, and case cards
  content/
    cases.ts                  typed case schema and records
    experience.ts             competencies and timeline
    profile.ts                public identity and optional portrait
    work-filter.ts            query normalization and filtering
docs/PRD.md                   product single source of truth
docs/BACKGROUND_EFFECT.md     background acceptance notes
docs/WORK_CASES.md            case study and filter acceptance notes
docs/PHASE_5.md               scripting and public-profile foundations
docs/PHASE_6.md               public identity, CV and homelab case review
public/profile/dita.png       supplied portrait
public/resume/*.pdf           versioned PDF CV for review
scripts/generate-cv.py        authoring source for the CV PDF
scripts/generate-cv-id.py     sumber CV tinjauan Bahasa Indonesia
tests/atmosphere-geometry.test.mjs
Dockerfile                    multistage non-root standalone image
```

## Publication boundaries

- `robots` remains `noindex` until canonical URL, SEO, publication review, accessibility/performance checks, and cluster deployment are complete. The `/resume` page now includes the versioned CV PDF for review.
- Enterprise cases are reconstructions of work. The release team executes production deployments. Zabisa and other applications run on multiple VMs sharing a single bare-metal host; VM replicas are not physical HA.
- Never publish private hostnames, namespace names, customer information, credentials, or internal screenshots and logs without approval and sanitation.
- Uptime, latency, cluster counts, and numerical impact remain unpublished without a safe, reviewable source.
- The next PRD gates are CV and claim review, final contact validation, SEO, and accessibility/performance acceptance.

## CI/CD Pipeline Status
- Automated via GitHub Webhook -> Jenkins -> SonarQube -> Harbor -> Argo CD -> Kubernetes.