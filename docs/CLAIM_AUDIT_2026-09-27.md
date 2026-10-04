# Audit klaim portofolio — 27 September 2026

## Cakupan dan cara membaca

Yang ditinjau: seluruh konten publik `/`, `/work`, keenam halaman kasus, `/resume`, `/privacy`, dua halaman PDF CV, metadata, dan dokumentasi PRD. Pembanding: informasi langsung dari Dita, CV lama Oktober 2025, keluaran CI Bamboo yang ia berikan, inventaris pod Kubernetes yang ia berikan, dan dokumen proyek Zabisa dalam repositori privat hingga catatan status 26 September 2026. Ini audit konsistensi klaim, bukan verifikasi oleh BRI, PT Pinus Pintar Community, atau auditor infrastruktur independen. Tidak ada akses langsung ke cluster BRI atau host homelab untuk mengukur kondisi terkini.

**Kelas bukti:** `U` = pernyataan Dita; `CV` = CV lama yang ditulis sebelumnya; `LOG` = keluaran privat CI/inventaris pod yang diberikan; `REPO` = kode atau dokumen privat Zabisa; `I` = inferensi/editorial. Bukti privat tidak boleh dipublikasikan mentah. Klaim faktual publik sebaiknya menyebut dengan jelas batas pengamatan dan kepemilikan.

## Temuan yang dikoreksi dalam revisi ini

| Prioritas | Temuan | Koreksi yang sudah dilakukan | Bukti |
| --- | --- | --- | --- |
| **Tinggi** | Kasus coverage BRI semula salah menyebut **React Native dan LCOV**. Log sukses yang diserahkan Dita menunjukkan **Go Cover** mengimpor `coverage.out` dan SonarQube quality gate lulus. Perbaikan pada RN monorepo adalah konteks pekerjaan yang berbeda. | Ganti studi kasus 02, kartu keahlian, CV PDF, PRD, dan tabel kasus menjadi Go; alihkan URL lama ke `/work/go-coverage-quality-gate`. Jangan klaim penulisan test atau kenaikan persentase coverage. | `LOG`: keluaran CI 21 September; `U`: konfirmasi coverage muncul. |
| **Menengah** | Kasus delivery enterprise dan script promosi menaruh instruksi pemeriksaan di bagian **Validation**, sehingga dapat terbaca sebagai bukti hasil satu rilis yang sudah diaudit. Dampak “lebih mudah didiagnosis” juga tidak diukur. | Ubah menjadi keterangan bahwa alur pemeriksaan diceritakan Dita dan belum ada log kasus spesifik yang disetujui untuk publikasi; hilangkan hasil efisiensi yang tersirat. | `U`; tidak ada log rilis BRI yang layak terbit. |
| **Menengah** | PDF CV lama mencantumkan Temanggung sebagai lokasi pada Oktober 2025. Tidak ada konfirmasi bahwa itu masih lokasi saat ini pada September 2026. | Hapus lokasi dari header CV terbitan sekarang. Nomor telepon, email dan tautan profil tetap dipertahankan. | `CV` lama; lokasi kini belum dikonfirmasi. |
| **Rendah** | Ringkasan awal PRD masih menggambarkan Fase 4 sebagai status terkini walau Fase 6 sudah ada. | Perbarui status implementasi dan catat koreksi coverage. | Kode situs dan dokumen fase. |

## Pemetaan klaim yang masih tampil

| Area | Sumber | Penilaian dan batas klaim |
| --- | --- | --- |
| Identitas, label **mid-level**, BRI aktif sebagai vendor, kontak dan foto | `U`; email/lokasi historis dalam `CV` | Sesuai data yang diberikan. Hubungan kerja belum divalidasi ke pemberi kerja; email dan nomor dapat ditautkan tetapi penerimaan pesan sebenarnya belum diuji. Tanggal mulai di situs disederhanakan menjadi November 2025, sesuai keterangan 24 November 2025. |
| Riwayat DevOps PT Pinus Pintar Community, DeployAja dan SIDRA | `CV` + `U` (Dita mengonfirmasi peran berakhir 2025) | Peran dan tugas berasal dari CV lama. Klaim kuantitatif lama tentang jumlah aplikasi, kecepatan deploy, HA dan dampak bisnis sengaja tidak diteruskan. Peran HR Assistant dihilangkan sesuai pilihan Dita. |
| Kasus 01: Bamboo, Dockerfile, Helm, OpenShift, incident/release handoff | `U`; sebagian konteks kerja dari percakapan troubleshooting | Klaim pengalaman langsung; kasus adalah **komposit**, bukan laporan sebuah rilis terukur. Tidak mengklaim memiliki cluster bank atau eksekusi produksi sendiri. Hasil terukur dan angka lebih dari 200 microservices belum dipublikasikan. |
| Kasus 02: Go coverage BRI | `LOG` + `U` | Log privat memperlihatkan sensor Go membaca laporan, quality gate lulus dan coverage dihitung. `U` menyebut coverage muncul. Detail perbaikan UI Bamboo tidak dapat diuji ulang dari situs; jangan menyamakan ini dengan RN. |
| Kasus 03: Bun Debian 1.4.2 branch khusus RN | `U`; log dan penjelasan yang pernah dibagikan | Image/wrapper teruji pada ruang lingkup eksperimen yang dilaporkan. **Migrasi seluruh repositori, hasil test Bun, dan penggantian Node di branch lain tidak terbukti**. Label *in progress* tepat. |
| Kasus 04: Zabisa Jenkins, Sonar, Trivy, SBOM, Harbor, GitOps, Argo CD, backup terisolasi | `REPO` (Jenkins runbook, proyek status, runbook rollout, backup) | Alur build dan DT tercatat pada sumber privat; status produk sampai 26 September adalah lingkungan DT. Tidak berarti produksi publik, otomatis terdeploy setelah CI hijau, aman dari semua kerentanan, atau sudah lulus disaster recovery. Source repo **private** dan tidak diberi tautan bukti publik. |
| Kasus 05: script Bamboo dan repo Helm untuk produksi isolated/existing | `U` | Cakupan kontribusi dan kolaborasi release/operasional berasal dari keterangan Dita. Belum ada script/log tersanitasi yang dapat diterbitkan; tidak ada angka percepatan atau zero downtime. |
| Kasus 06: tiga control-plane dan tiga worker VM, layanan pendukung, aplikasi lain | `U` + `LOG` inventaris pod + `REPO` | Inventaris menunjukkan komponen dan workload hidup pada satu inspeksi; susunan VM, satu host fisik dan pembangunan dari awal berasal dari Dita. Snapshot pod **tidak membuktikan** HA fisik, uptime, RTO/RPO atau ketahanan kehilangan datacenter. |
| Terminal status, animasi, keamanan | Kode lokal + sebagian `U`/`REPO` | Terminal jelas berlabel demo dan tidak terhubung ke telemetry. SCC untuk pekerjaan OpenShift dan NetworkPolicy untuk Zabisa cocok dengan cakupannya; keduanya bukan audit keamanan menyeluruh. Tidak ada metrik uptime/latency yang dibuat-buat. |
| Privasi, SEO, performa dan deployment | Kode lokal dan PRD | Tidak ditemukan endpoint bank/homelab, analytic SDK, nama host privat atau alamat jaringan dalam sumber publik; foto PNG tanpa metadata EXIF. `noindex` aktif. Belum ada bukti Lighthouse 100/100, pengukuran CWV lapangan, uji WCAG lengkap, hostname final, atau deploy produksi portfolio di cluster. Target PRD tidak boleh disebut sebagai hasil. |

## Keputusan yang masih perlu konfirmasi Dita

1. **Tanggal proyek homelab:** label 2026 mencerminkan aktivitas yang sedang berlangsung. Pastikan apakah tahun itu juga merupakan tahun mulai membangun cluster; jika tidak, ubah timeline ke tahun sebenarnya atau “independent, ongoing”.
2. **CV dan kontak:** tinjau kembali PDF hasil koreksi, terutama periodisasi PT Pinus, ringkasan tugas BRI, email yang masih aktif, dan apakah lokasi ingin dicantumkan. Tidak ada verifikasi pengiriman email/SMS; tautan `mailto:`/`tel:` saja yang telah diuji.
3. **Publikasi bukti enterprise:** bila ingin label lebih kuat daripada “sanitized reconstruction”, siapkan satu artefak BRI yang sudah disetujui dan dibersihkan dari nama layanan, ID proyek, endpoint, data nasabah dan kredensial.
4. **Bun dan pengalaman SAST/SCA:** untuk mengubah cerita menjadi hasil yang terukur, diperlukan log atau ringkasan job yang aman untuk dibagikan. Jangan memindahkan capaian Go coverage ke eksperimen RN/Bun.
5. **Foto dan teks:** gambar berasal dari Dita tetapi provenance, hak pakai dan apakah foto itu representasi pribadi asli belum diverifikasi secara independen. Pastikan Dita nyaman memakai gambar tersebut sebagai potret profesional publik.

## Gerbang sebelum publikasi

- Periksa dan setujui redaksi CV serta kasus satu per satu; URL dan akses kontak diuji pada perangkat pengguna.
- Simpan bukti sumber privat di luar repositori publik, dan hanya tampilkan redaksi yang disetujui.
- Uji metadata canonical/domain, aksesibilitas, Lighthouse dan CWV pada deployment nyata sebelum menghapus `noindex`.
- Ulangi audit ketika pengalaman kerja, topologi homelab atau status proyek berubah.
