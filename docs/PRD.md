# Product Requirement Document

## Portofolio DevOps Dita Setya Kurniawan

**Status:** Draft implementasi · **Tanggal:** 27 September 2026 · **Pemilik produk:** Dita Setya Kurniawan · **Audiens dokumen:** Senior Software Engineer, visual designer, content owner

**Status implementasi 27 September 2026:** Fase 6 mencakup indeks `/work` berfilter URL, enam halaman kasus, foto, kontak publik dan CV PDF berversi. Audit klaim menemukan contoh coverage semula salah dilabeli React Native; log yang diberikan menunjukkan Go microservice, sehingga narasi situs dan CV dikoreksi. Verifikasi izin publikasi, canonical hostname/SEO, serta gate aksesibilitas/performa masih terbuka. Catatan implementasi di `docs/WORK_CASES.md` dan `docs/CLAIM_AUDIT_2026-09-27.md`.

**Pembaruan cakupan kerja enterprise:** Dita menjelaskan pekerjaan untuk dua kelompok layanan mobile banking (legacy dan platform lebih baru): koordinasi Jira, setup dan maintenance CI/CD lintas lingkungan, Dockerfile dan Helm template, resource dan konfigurasi aplikasi, SAST/SCA, Nexus dan alur image, integrasi logging, serta diagnosis insiden deploy. Ia ikut tabletop sebelum rilis dan membantu operasional banking selama produksi; narasi publik harus mengakui peran tim release/operasional dalam eksekusi. RabbitMQ, Redis, dan Kafka adalah area konfigurasi integrasi aplikasi; jangan mengubahnya menjadi klaim administrasi broker tanpa bukti. Jumlah layanan yang spesifik, nama program internal, topologi produksi, dan artefak bank belum dipublikasikan sampai ditinjau dan disetujui.

**Fase 5 — automation dan publication foundation:** Dita menulis dan memelihara Bamboo inline script dan file script di repository Helm untuk mendukung promosi rilis dari jalur produksi isolated menuju existing pada beberapa lokasi produksi. Kasus kelima merupakan rekonstruksi editorial dari praktik tersebut: jangan tampilkan script asli, nama lokasi, kredensial, atau hasil numerik tanpa peninjauan. Situs menambah `/resume` (ringkasan publik tanpa mengarang PDF), `/privacy`, dan komponen kontak dengan email opsional. F03/F05 hanya dianggap tuntas setelah alamat dan PDF berversi diberikan, dikonfirmasi, dan diuji; metadata canonical masih menunggu domain. Catatan penerimaan di `docs/PHASE_5.md`.

**Fase 6 — identitas dan cakupan homelab:** Dita memberikan foto, email, nomor telepon, LinkedIn, dan CV lama untuk pembaruan. Riwayat DevOps sebelumnya berakhir 2025; peran HR Assistant tidak ditampilkan. Zabisa menggunakan Kubernetes multi-VM (tiga control plane, tiga worker, dan VM layanan pendukung) pada **satu** server fisik. Pengaturan ini memberi isolasi antar-VM dan replikasi aplikasi, tetapi kegagalan host berdampak ke seluruh cluster. Repository Zabisa terverifikasi **private**; kontennya hanya boleh dipakai sebagai sumber pemeriksaan internal, bukan diberi tautan publik atau diposisikan sebagai bukti yang bisa dilihat pengunjung. Kasus keenam menggambarkan platform secara tersanitasi. PDF CV berversi tersedia untuk unduh; canonical/SEO final serta uji publikasi masih menunggu fase berikutnya.

**Keputusan produk.** Bangun portofolio editorial yang membuktikan kemampuan mengelola delivery dan operasi aplikasi melalui artefak teknis, studi kasus yang terukur, dan narasi peran yang presisi. Tampilan premium mendukung kredibilitas; bukti kerja harus tetap menjadi pusat pengalaman.

**Batas klaim.** Label publik adalah **DevOps Engineer (mid-level)**; Dita masih aktif bekerja sebagai vendor DevOps di BRI. Profil publik menjelaskan pekerjaan yang benar-benar dilakukan. Jangan menyatakan kepemilikan cluster enterprise, rancangan HA produksi, kepemilikan database enterprise, atau hasil numerik tanpa artefak yang boleh dipublikasikan. Di lingkungan bank, fokus Dita adalah Bamboo, Helm, konfigurasi dan troubleshooting; eksekusi rilis dilakukan tim release. Sanitasi semua host, namespace, identitas nasabah, screenshot internal, token, dan rincian jaringan sebelum tayang. Repo Zabisa saat ini private; jangan menautkan ke halaman bukti publik sampai visibilitas dan isinya ditinjau ulang.

---

## 1 Project Overview & Objectives

### 1.1 Nilai dan positioning

**Value proposition:** DevOps engineer yang menghubungkan pipeline CI/CD, konfigurasi deployment, quality gate, dan diagnosis operasional menjadi jalur rilis yang dapat ditelusuri dan dipulihkan.

**Positioning statement:** “DevOps Engineer focused on reliable delivery workflows and cloud-native deployment troubleshooting across enterprise OpenShift and independent Kubernetes projects.” Gunakan bentuk “I work on…” atau “I contributed…” sesuai bukti pada setiap kasus; hindari headline yang menyiratkan kepemimpinan arsitektur HA yang belum terbukti.

**Strategi bukti:** Di halaman depan tampilkan tiga proof points: (1) Bamboo + Helm + OpenShift untuk lingkungan enterprise; (2) perbaikan pembacaan coverage Go oleh SonarQube di Bamboo; (3) Jenkins, GitOps, image security, dan uji pemulihan pada Zabisa Super App. Tautkan artefak publik atau tampilkan rekonstruksi yang diberi label.

### 1.2 Audiens dan tugas utama

| Audiens | Pertanyaan yang ingin dijawab | Bukti dan aksi utama |
| --- | --- | --- |
| Engineering Director | Dapatkah ia menaikkan mutu delivery tanpa memperbesar risiko rilis? | Hasil quality gate, kontrol promosi, pemulihan, dan keputusan trade-off; buka studi kasus. |
| Head of Infrastructure / Platform | Apakah ia memahami hubungan antara pipeline, chart, runtime, observability, dan keamanan? | Diagnosis teknis, batas ownership, diagram alur, artefak tersanitasi; buka deep dive. |
| Tech Recruiter enterprise | Apakah cakupan, senioritas, lokasi, dan kontak jelas dalam satu menit? | Ringkasan peran, stack, timeline, tautan CV; hubungi. |

### 1.3 Konversi dan pengukuran

1. **Primer:** klik email atau kontak profesional dari hero dan footer; ukur `contact_click` menurut lokasi CTA.
2. **Sekunder:** buka studi kasus sampai blok dampak dan bukti; ukur `case_open` dan `case_evidence_click`.
3. **Tersier:** unduh CV, buka GitHub/LinkedIn, salin alamat email; ukur `cv_download`, `external_profile_click`, `email_copy`.

Gunakan analitik yang menghormati privasi, tanpa merekam isi terminal, alamat email pengunjung, atau token. Baseline sebelum target rasio konversi; laporkan metrik per perangkat dan sumber kunjungan. Kriteria rilis: semua CTA berfungsi, semua klaim publik ditinjau, dan minimal tiga studi kasus memiliki problem–solution–impact serta status bukti.

### 1.4 Ruang lingkup

**MVP:** satu landing page, indeks proyek berfilter, tiga halaman studi kasus, career timeline, kontak, CV, metadata SEO, dan aksesibilitas. **Iterasi berikutnya:** catatan teknis singkat, konten bilingual, atau feed status nyata jika data publik, stabil, dan aman tersedia. Tidak ada klaim uptime atau telemetry live dalam MVP.

## 2 Visual Identity & UX Principles

### 2.1 Moodboard dan aturan tema

- **Arah visual:** ketenangan dan presisi Linear, tipografi editorial Vercel, kedalaman panel Supabase, dan detail aplikasi Raycast. Jadikan referensi kualitas, bukan menyalin elemen merek.
- **Dark first:** kanvas obsidian `#090B10`, surface `#11151D`, elevated `#19202B`, teks utama `#F5F7FA`, teks sekunder `#A8B2C0`. Aksen platinum `#C9D2DC`, biru elektrik `#7AA8FF`, dan cyan lembut `#71D7D0`; batasi aksen terang pada aksi, status, dan sorotan diagram.
- **Depth (revisi 27 Sep 2026):** atmosfer obsidian, navy dan cyan menyambung dari Hero melalui terminal sampai akhir Expertise. Grid, orbit, topologi dan spotlight harus berlanjut tanpa batas keras antarseksi. Border 1 px dan bayangan lembut menjaga hirarki kartu.
- **Grid:** lebar konten maksimum 1200 px, grid 12 kolom desktop, ritme spasi berbasis 8 px, radius 12–20 px. Grid dekoratif 76 px dan grain ringan berada di belakang konten. Sorotan kursor selaras dengan grid, termasuk saat halaman digulir.
- **Aksesibilitas:** kontras teks minimal WCAG AA, state fokus jelas, target sentuh minimal 44 × 44 px, jangan gunakan warna sebagai satu-satunya pembeda status.

### 2.2 Tipografi

Sans modern seperti **Geist Sans** untuk heading/body dan **Geist Mono** untuk terminal, command, tag, dan metrik; gunakan subset dan `font-display: swap`, serta fallback sistem untuk mencegah pergeseran. Hero 56–72 px desktop / 38–48 px mobile; H2 36–48 / 28–34 px; body 16–18 px dengan line-height 1.5–1.7; mono 12–14 px. Panjang paragraf maksimal kira-kira 65–75 karakter per baris. Hierarki diperoleh dari ukuran dan ruang, bukan uppercase berlebihan.

### 2.3 Interaksi dan motion

- Entrance: opacity + translate 8–16 px, 240–400 ms, sekali ketika masuk viewport; konten tetap terlihat bila JavaScript atau animasi gagal.
- Hover/focus: perubahan border dan elevasi kecil (2–4 px), 120–180 ms; tombol aktif tidak bergantung pada animasi untuk memberi umpan balik.
- Transisi filter/kartu: 180–260 ms; pertahankan tinggi area hasil atau animasikan layout secara terukur agar tak melompat.
- Terminal mockup: ketikan maksimal satu siklus singkat; kontrol “Replay”; hentikan saat tab tersembunyi. Label jelas `Illustrative demo · not live production telemetry`.
- Background: aura 16–18 detik, orbit 23–26 detik, jejak sinyal 6,5 detik. Lapisan berbaur dan mengikuti tinggi konten; hentikan gerak di luar viewport atau ketika tab tersembunyi. Validasi glow di transisi Hero–terminal dan seluruh Expertise.
- Hormati `prefers-reduced-motion`: matikan transform, parallax, animasi berulang, dan smooth scroll; pertahankan state langsung. Motion for React menangani transform dan opacity dekoratif serta interaksi.

## 3 Information Architecture & Page Structure

### 3.1 Sitemap

`/` — Hero → system demo → competencies → featured cases → career → contact  
`/work` — seluruh studi kasus + filter  
`/work/[slug]` — detail kasus dan bukti  
`/resume` — ringkasan CV + unduh PDF  
`/privacy` — penjelasan analitik dan kontak

Navigasi sticky desktop: Work, Expertise, Experience, Contact; mobile menu yang dapat dioperasikan keyboard. Setiap anchor mempertahankan heading terlihat setelah scroll. Breadcrumb pada halaman studi kasus. Footer memuat kontak, profil publik, dan waktu pembaruan konten.

### 3.2 Wireframe konten per seksi

| Seksi | Susunan layar dan konten minimum | Interaksi / CTA |
| --- | --- | --- |
| Hero | Eyebrow “DevOps · CI/CD · Cloud Native”; H1 “Making complex delivery systems reliable”; dua kalimat cakupan Bamboo/OpenShift dan Jenkins/Kubernetes; bukti singkat “Enterprise delivery workflows / independent GitOps project”; identitas Dita. | `Explore work` primer, `Get in touch` sekunder. |
| System status / terminal | Dua kolom: panel abstrak pipeline `Commit → Quality gate → Image → GitOps/Helm → Runtime` dan terminal berisi log sintetis yang aman. Status memakai `DEMO` pada setiap badge. | Play/pause dan `View the case study`; tidak ada polling ke sistem internal. |
| Core competencies bento grid | 4–6 kartu dengan judul, keputusan nyata, artefak, dan tools. Kelompok: CI/CD scripting/automation; Kubernetes/OpenShift deployment; Helm/configuration; security & quality gates; observability/troubleshooting; recovery discipline. | Kartu membuka studi kasus terkait; tab/focus mengikuti urutan DOM. |
| Featured case studies | Tiga kartu besar: konteks → masalah → tindakan Dita → hasil terverifikasi. Tampilkan label `Enterprise, sanitized` atau `Public project`, durasi/peran bila sudah disetujui. | Buka deep dive atau filter di `/work`. |
| Career milestones | Timeline: vendor DevOps BRI sejak Nov 2025; proyek infrastruktur mandiri 2026; DevOps PT Pinus Pintar Community 2023–2025 sesuai konfirmasi Dita. Tekankan perluasan tanggung jawab, bukan jumlah tahun fiktif. | Unduh CV; lihat kasus per milestone. |
| Contact terminal | Prompt visual `> connect --with dita`, deskripsi kolaborasi, email yang nyata setelah disediakan, tautan LinkedIn/GitHub, tombol copy dengan status aria-live. | `Email Dita`, `Copy email`, `View GitHub`; fallback `mailto:`. |

**Detail halaman kasus:** H1 dan metadata (peran, periode, lingkup, status bukti) → masalah dan constraint → arsitektur/alur tersanitasi → keputusan dan alternatif → implementasi → validasi → hasil yang diketahui → pelajaran dan batas klaim → link bukti/next case. Setiap screenshot perlu alt text, tanggal, dan penjelasan apa yang dibuktikan.

### 3.3 Daftar kasus awal dan aturan editorial

| Kasus | Problem → tindakan Dita → impact yang boleh ditulis | Bukti / redaksi |
| --- | --- | --- |
| Enterprise delivery via Bamboo, Dockerfile, Helm, OpenShift | Pada layanan mobile banking lintas development hingga production, ketidaksesuaian image, chart, konfigurasi aplikasi, probe, dan pipeline dapat mengganggu rollout. Dita menyiapkan/memelihara CI dan template, memeriksa resource, log, dan dependensi aplikasi; tabletop serta penanganan produksi dilakukan bersama release/operasional. Hasil yang aman: jalur diagnosis dan handoff menjadi lebih jelas, tanpa angka downtime atau klaim mengelola cluster. | Kasus komposit tersanitasi; jangan publikasikan jumlah layanan, nama internal, topologi DC/DR, namespace, URL, atau log tanpa tinjauan. |
| Scripted production promotion | Bamboo inline script dan file script dalam repository Helm membantu pemilihan jalur dan handoff rilis dari isolated ke existing pada sejumlah lokasi produksi. Dita menulis/merawat script; pelaksanaan produksi bersama release dan operasional. Hasil yang aman: tahapan dan target bisa direview saat handoff, tanpa menjanjikan zero-downtime atau angka percepatan. | Alur editorial tersanitasi tanpa command atau nama lokasi asli; pemeriksaan hasil rilis bergantung log privat yang belum dapat dipublikasikan. |
| Coverage Go dan SonarQube di Bamboo | Coverage sempat terbaca 0%; Dita memperbaiki eksekusi shell dan pemilihan plan/branch. Log sukses memuat `coverage.out` melalui sensor Go Cover dan quality gate lulus. Angka spesifik tidak dipublikasikan. | Log asli privat; rekonstruksi publik tanpa nama layanan, ID build atau konfigurasi internal. Jangan campur dengan eksperimen Bun untuk monorepo React Native. |
| Bun runtime container untuk CI | Agent bersama tidak perlu memasang Bun untuk eksperimen satu branch. Dita menyiapkan image Bun 1.4.2 berbasis Debian berisi git/ssh/CA dan wrapper branch-specific; branch lain tetap Node/npm. Hasil terverifikasi: image dan wrapper tervalidasi; migrasi penuh bergantung pada `bun.lock` dan kesiapan repo. | Diagram branch gate, Dockerfile yang aman, hasil smoke test tanpa credential. |
| Zabisa Super App delivery and recovery | Proyek pribadi memadukan source gates, Jenkins, SonarQube, Trivy, Harbor, SBOM, GitOps dan Argo CD; backup terenkripsi dan uji restore terisolasi mendahului rollout DT. Hasil berupa alur delivery dan penerimaan DT yang terdokumentasi secara privat; hindari angka yang belum dapat ditunjukkan publik. | Repo GitHub saat ini private. Gunakan rekonstruksi alur yang tersanitasi; jelaskan seluruh VM berbagi satu host fisik dan jangan sebut HA produksi. |
| Multi-VM Kubernetes platform | Dita membangun tiga VM control plane dan tiga VM worker serta VM terpisah untuk load balancing, CI, registry, observability, secrets, storage dan database. Zabisa dan aplikasi lain berjalan di cluster yang sama. | Sembunyikan IP publik/internal, hostname, SSH hop dan kredensial. Jelaskan replikasi VM tidak menghilangkan single point of failure server fisik. |

Prioritas MVP: tiga kasus pertama atau dua enterprise + Zabisa, sesuai akses bukti. “High availability”, “clustering”, dan failover menjadi bagian **arah pengembangan / design exercise** bila ada rancangan yang dapat diterangkan; pengalaman KVM/libvirt dan Kubernetes homelab boleh dipaparkan sebagai lab, bukan jaminan resilien data center. Penyebutan MinIO untuk Zabisa dipisahkan dari lingkup kerja bank.

## 4 Functional & Non-Functional Requirements

### 4.1 Kebutuhan fungsional

| ID | Requirement dan acceptance criterion | Prioritas |
| --- | --- | --- |
| F01 | Filter `/work` menurut `Enterprise`, `Independent`, dan topik; URL query menyimpan state; hasil, jumlah, serta empty state diperbarui dan diumumkan ke pembaca layar. | P0 |
| F02 | Kartu proyek dan detail berasal dari typed content schema: slug, title, role, period, context, problem, action, impact, evidenceStatus, links, tags, confidentiality. Build gagal bila field wajib atau tautan internal kosong. | P0 |
| F03 | Tombol copy email menyalin alamat yang dikonfigurasi, menampilkan “Email copied” melalui `aria-live`, menyediakan fallback pemilihan teks jika Clipboard API ditolak. Tidak pernah menyalin prompt dekoratif. | P0 |
| F04 | Badge `Demo`, `Verified`, `Sanitized`, `In progress` berasal dari metadata konten. Badge terminal tidak pernah berubah menjadi “Live” tanpa feed publik, health check, dan pemilik data. | P0 |
| F05 | Download CV memakai berkas berversi dan label ukuran/tanggal; tautan eksternal jelas, aman, dan diperiksa saat build. | P0 |
| F06 | Menu mobile, filter, terminal replay, dan disclosure dapat dioperasikan dengan keyboard; fokus terlihat dan kembali ke pemicu setelah overlay ditutup. | P0 |
| F07 | Metadata unik, canonical URL, sitemap, Open Graph, dan structured data `Person` yang hanya memuat fakta terverifikasi. | P0 |
| F08 | Analitik privacy-conscious pada CTA dan pembukaan studi kasus; consent atau konfigurasi sesuai kebutuhan hukum setempat sebelum tracker non-esensial diaktifkan. | P1 |

### 4.2 Kualitas, performa, dan keamanan

- **Lighthouse:** target desain **100/100 untuk Performance, Accessibility, Best Practices, SEO** pada template utama desktop dan mobile dalam pengujian lab terkontrol. Ambang rilis yang stabil: Performance ≥95; tiga kategori lain 100; simpan laporan dan perbaiki regresi. Skor 100 bersifat target optimasi, bukan janji setiap perangkat atau setiap run.
- **Core Web Vitals lapangan:** p75 mobile dan desktop LCP ≤2.5 s, INP ≤200 ms, CLS ≤0.1. Sasaran implementasi CLS **0.00 pada navigasi dan perubahan komponen yang dirancang**; sediakan ukuran intrinsik media dan ruang tetap untuk terminal, font, badge, dan filter. INP memerlukan interaksi pengguna nyata dan tidak dinilai dari Lighthouse load audit saja.
- **Budget awal:** JS interaktif halaman utama ≤100 kB gzip setelah framework; hero image ≤150 kB pada mobile; font maksimal dua keluarga dan subset yang diperlukan. Audit hasil build sebelum menetapkan angka sebagai gate final.
- **Responsive:** desain pada 320, 375, 768, 1024, 1440, 1920 px; satu kolom mobile, dua kolom tablet, maksimal tiga/empat kolom hanya untuk bento desktop. Tidak ada overflow horizontal pada zoom 200%.
- **A11y:** WCAG 2.2 AA sebagai kriteria, semantic landmarks, urutan heading benar, label form/ikon, focus visible, reduced motion, kontras dan screen-reader smoke tests. Jalankan axe dan uji manual keyboard untuk semua state.
- **Reliability/security:** konten statis dirender sebelum hydration; demo terminal dari data lokal deterministik; tidak ada akses browser ke Bamboo, OpenShift, Jenkins, atau MinIO internal. HTTPS, dependency scanning, security headers sesuai hosting, minim data pihak ketiga.
- **SEO/content:** SSR/prerender kasus, deskripsi unik, social card, alt text; kaji ulang klaim dan tautan setiap kuartal.

### 4.3 Definition of Done

Seluruh rute dan state pada F01–F07 lulus; tiga studi kasus mempunyai proof-status dan reviewer; desktop/mobile + keyboard/reduced motion diuji; tidak ada rahasia atau hostname internal dalam output build; laporan Lighthouse dan CWV baseline tercatat; CTA bekerja dan terinstrumentasi; CV, metadata, serta kontak aktual disediakan oleh Dita sebelum publikasi.

## 5 Recommended Tech Stack & Dependencies

| Lapisan | Rekomendasi dan alasan | Batas implementasi |
| --- | --- | --- |
| Framework | Next.js App Router + TypeScript; prerender halaman konten dan gunakan Server Components sebagai default untuk HTML yang cepat dan SEO. | Client Components hanya untuk filter, clipboard, menu, dan motion; tidak perlu backend aplikasi untuk MVP. |
| Styling | Tailwind CSS dengan semantic CSS variables untuk tokens, breakpoint, dan dark-first. | Hindari utility yang mengaburkan kontras dan state fokus; audit CSS akhir. |
| Motion | Framer Motion yang sudah terpasang untuk transform/opacity background, hover, dan reveal terpilih; CSS transition untuk efek sederhana. | `useReducedMotion`, visibilitas per lapisan, dan jeda saat tab tersembunyi. |
| UI primitives | Radix Primitives untuk menu/disclosure/dialog bila digunakan; komponen presentasional sendiri. | Validasi label dan fokus pada komposisi akhir. |
| Content | Typed MDX atau file TypeScript/JSON tervalidasi schema (mis. Zod); commit dan review bersama kode. | Tidak perlu CMS sampai frekuensi pembaruan membenarkannya. |
| Media | SVG diagram buatan sendiri; AVIF/WebP dengan ukuran eksplisit; font lokal/subset. | Tidak mengambil screenshot sistem internal mentah. |
| Quality | ESLint, TypeScript, Playwright untuk alur filter/kontak, axe untuk a11y, Lighthouse CI untuk template utama. | Gate otomatis pada PR; uji visual manual perangkat utama. |
| Deploy | Target utama: container Next.js standalone pada cluster Kubernetes homelab, di belakang Service serta ingress/route dengan TLS dan domain publik. Preview per PR boleh memakai lingkungan terpisah. | Namespace, registry, domain, kebijakan TLS, dan izin publikasi harus dipastikan sebelum manifest rilis dibuat; jangan mengekspos endpoint internal atau telemetry privat. |

**Dependency policy:** pin versi mayor setelah proof of concept, commit lockfile, audit paket transitif, dan hindari library animasi/ikon ganda. Tidak perlu database, WebSocket, atau API status produksi untuk MVP.

### Sumber teknis untuk implementasi

- Next.js App Router dan production checklist: https://nextjs.org/docs/app/guides/production-checklist
- Next.js static exports dan batas fitur: https://nextjs.org/docs/app/guides/static-exports
- Tailwind responsive design: https://tailwindcss.com/docs/responsive-design
- Motion dan reduced motion: https://motion.dev/docs/react-accessibility
- Radix accessibility: https://www.radix-ui.com/primitives/docs/overview/accessibility
- Core Web Vitals: https://web.dev/articles/vitals
- Vercel preview deployments: https://vercel.com/docs/git
