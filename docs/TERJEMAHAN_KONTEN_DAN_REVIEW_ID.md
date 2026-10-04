# Terjemahan konten website dan tinjauan cerita — 27 September 2026

**Catatan status setelah patch Bahasa Indonesia:** dokumen ini merekam **teks Inggris sebelum pengalihan bahasa** dan terjemahan pembandingnya. Website sekarang sudah tampil dalam Bahasa Indonesia; beberapa pilihan redaksi baru mungkin lebih singkat. Gunakan halaman yang sedang berjalan sebagai sumber redaksi saat ini, sedangkan dokumen ini sebagai jejak untuk audit isi dan penerjemahan Inggris nanti. Dokumen ini tidak menyatakan bahwa semua klaim sudah diverifikasi.

**Tujuan semula:** memudahkan Dita memeriksa isi situs berbahasa Inggris sebelum publikasi. Teks usulan perbaikan dibedakan dari terjemahan. Nama produk dan istilah teknis dipertahankan jika terjemahannya mengaburkan makna.

**Cakupan:** beranda, terminal ilustratif, enam kartu keahlian, pengalaman, pustaka studi kasus, keenam halaman detail, ringkasan profesional/CV di web, dan privasi. File PDF CV adalah artefak terpisah; periksa lagi isinya sebelum menganggapnya final.

## 1. Apakah keseluruhan cerita sudah masuk akal?

**Secara garis besar, ya:** pekerjaan profesional saat ini di BRI sebagai DevOps Engineer melalui vendor; pengalaman sebelumnya di PT Pinus Pintar Community; dan pekerjaan infrastruktur mandiri Zabisa/homelab dijelaskan sebagai tiga konteks yang berbeda. Keenam studi kasus membedakan masalah, kontribusi, hal yang diketahui, dan batas pembuktiannya. Angka uptime, latensi, pengurangan insiden, dan kemampuan *high availability* fisik tidak dikarang.

**Belum siap dianggap narasi final tanpa pemeriksaan Dita.** Kekuatan pekerjaan BRI dan pekerjaan membangun platform dari nol kurang terlihat pada tiga studi kasus yang dipilih untuk beranda. Ada satu kasus BRI yang merangkum banyak pekerjaan menjadi satu cerita, sehingga hasilnya masih abstrak. Status beberapa bukti dan linimasa proyek mandiri perlu dibuat lebih jernih. Ini masalah ketepatan dan penyusunan cerita, **bukan kesimpulan bahwa semua pekerjaan itu fiktif**.

| Bagian cerita | Yang sudah didukung | Yang perlu diluruskan atau dipertegas |
| --- | --- | --- |
| Identitas | Nama; level **mid-level**; sedang bekerja dalam lingkup BRI melalui vendor. | Pilih penyebutan jabatan dan relasi vendor yang tepat untuk publik. Badge “Currently active” menyatakan masih bekerja, bukan sedang membuka lowongan. |
| BRI: cakupan kerja | Penjelasan Dita tentang Bamboo, shell/Helm, Dockerfile, OpenShift, Sonar, log, kolaborasi rilis, dan lingkungan terpisah. Bukti privat tersedia untuk kasus Go coverage. | Kasus 01 merupakan gabungan pola kerja, bukan satu kejadian. Agar kuat sebagai studi kasus, pilih satu masalah nyata yang aman diceritakan, jelaskan tindakan pribadi dan hasil yang benar-benar terlihat. |
| BRI: scripting | Kasus 05 secara jelas menyebut skrip inline Bamboo dan file skrip pada repo Helm untuk alur isolated→existing. | Kasus 01 dan 05 bertumpang tindih. Bedakan diagnosis deployment dari otomasi pemilihan target/serah-terima rilis; jelaskan siapa menjalankan tiap tahap dan titik persetujuannya. |
| Kasus Go coverage | Log Bamboo privat yang sebelumnya diberikan menunjukkan pembacaan `coverage.out` oleh Go Cover sensor dan quality gate lulus. | Jangan menyebut perbaikan kualitas tes atau kenaikan persentase cakupan tanpa datanya. Penjelasan saat ini sudah menghindari hal tersebut. |
| Eksperimen Bun | Image dan wrapper bercabang pernah divalidasi; migrasi repo secara penuh tidak dinyatakan selesai. | Status mungkin berubah sejak bukti terakhir. Perbarui jika `bun.lock`, tes tim, atau adopsi branch telah berubah. |
| Zabisa dan homelab | Catatan privat proyek, runbook, dan inventaris cluster mendukung jalur pengiriman DT dan VM control-plane/worker. Semua VM berada di satu mesin fisik. | Label umum “rekonstruksi tersanitasi” kurang pas untuk bukti proyek mandiri yang ada tetapi privat. Jelaskan bukti privat yang tersedia tanpa menjanjikan verifikasi publik. Konfirmasi awal periode proyek. |
| Pengalaman 2023–2025 | Ringkasan berasal dari CV lama dan koreksi tanggal yang telah diberikan. | Pastikan jabatan, tanggal, dan tanggung jawab DeployAja/SIDRA tetap akurat setelah dibaca lagi. |
| CV dan privasi | Halaman CV bisa diunduh, halaman privasi menjelaskan sistem tidak terhubung ke monitoring privat. | Isi PDF harus disetujui secara editorial; pemberitahuan privasi diperiksa lagi terhadap reverse proxy/log yang benar-benar dipakai sebelum situs dipublikasikan. |

### Selisih antara daftar pekerjaan Dita dan cerita yang tampil

| Informasi yang Dita pernah berikan | Representasi di situs sekarang | Penilaian editorial |
| --- | --- | --- |
| BRImo lama dan Qita | “legacy and newer service estates”/mobile banking; tidak menyebut nama produk. | Aman sebagai generalisasi. Bila nama produk ingin disebut, periksa dulu batas publikasi dari pekerjaan melalui vendor. |
| Merawat Dockerfile untuk **200+ microservice** | “large microservice estate”, tanpa angka. | Jumlah tidak terbit karena cakupan tepatnya (jumlah service, Dockerfile yang dirawat pribadi, atau seluruh estate) belum dipisahkan dan belum ada angka yang layak diverifikasi publik. |
| Dev, pentest, QA, staging, preprod, produksi isolated dan existing | Umumnya diringkas “development, test, pre-production and production”; isolated→existing ada pada kasus 05. | Detail penting untuk kompetensi, tetapi cerita sekarang belum memperlihatkan kapan tiap gate dan lingkungan berlaku. Tak perlu memuat topologi internal. |
| DC, DRC, ODC, GPC/GCP | Disamarkan menjadi beberapa lokasi/tujuan produksi. | Perbedaan ejaan **GPC/GCP** pada pesan-pesan sebelumnya harus dipastikan; jangan menganggapnya sama atau menerbitkan singkatan lokasi tanpa persetujuan. |
| Jira ticket, tabletop, operasi perbankan, developer, principal, platform, ekosistem, database | Muncul di pengalaman/kasus 01/05, namun principal tidak disebut khusus. | Alur kolaborasi cukup terlihat; masih perlu membedakan keputusan Dita sendiri dari keputusan bersama atau approval tim lain. |
| RabbitMQ, Redis, Kafka; Nexus; Fluent Bit/Fluentd/Elastic/Kibana; proxy/firewall | Muncul di kartu skill dan kasus 01, umumnya sebagai koordinasi konfigurasi/investigasi. | Sudah proporsional; jangan menaikkan menjadi kepemilikan penuh broker, registry, firewall, atau logging platform jika tidak demikian. |
| Membangun homelab dari nol; Zabisa dan aplikasi lain | Ada pada kasus 06, ringkasan pengalaman, dan PDF; tidak menjadi kasus unggulan di beranda. | Bukti penting untuk positioning tetapi eksposur beranda rendah. Kaitan antara platform umum, delivery Zabisa, dan aplikasi lain perlu satu kalimat transisi agar tidak dibaca sebagai cluster khusus Zabisa. |

### Titik putus alur yang paling terasa

1. **Janji awal → bukti utama:** hero menyebut kemampuan enterprise dan homelab, tetapi kartu unggulan beranda adalah kasus 01 (diagnosis), 02 (Go coverage), 04 (Zabisa). Kasus 06 yang paling nyata memperlihatkan pembangunan platform dari nol dan kasus 05 tentang scripting rilis belum diberi tempat yang setara. Saran urutan: hero → bukti scripting/operasional BRI → platform VM/Kubernetes mandiri → detail teknis quality gate; tetap sertakan tautan semua kasus.
2. **Linimasa tidak murni urutan pekerjaan:** entri 2026 proyek mandiri berada di antara jabatan BRI (Nov 2025–sekarang) dan pekerjaan lama. Sebut secara eksplisit bahwa proyek itu **berjalan paralel** dengan pekerjaan utama, jika memang demikian. Jangan membuatnya tampak sebagai perusahaan atau jabatan pengganti.
3. **Judul besar vs bukti hasil:** “Making complex delivery systems reliable” merupakan positioning yang kuat, tetapi situs tidak memuat pengukuran reliabilitas. Saat ini boleh dibaca sebagai tujuan kerja; untuk klaim hasil yang lebih kuat perlu kejadian dan pengukuran. Pertimbangkan judul yang lebih berbasis hal yang bisa ditunjukkan, misalnya “Membuat proses pengiriman layanan lebih terlacak dan lebih mudah didiagnosis.” Ini **usulan**, belum mengganti headline.
4. **Bukti privat tidak sama dengan bukti publik:** kasus 04 dan 06 memiliki jejak privat, sementara kasus 01 dan 05 terutama berdasarkan penuturan Dita. Satu label “sanitized” untuk semua menyamakan tingkat bukti yang berbeda. Beri label seperti “diringkas dari catatan privat” untuk homelab dan “rekonstruksi pekerjaan yang disamarkan” untuk kasus enterprise komposit.
5. **Terminal bukan status nyata:** kartu uptime/latensi/node bertuliskan tidak dipublikasikan. Topologi 3+3 VM di studi kasus tidak bertentangan dengan terminal karena jumlah VM yang dirancang berbeda dari **jumlah node aktif saat ini**. Penjelasan satu kalimat di terminal akan menghilangkan kesan kontradiksi.
6. **Bahasa untuk pemilik situs:** semua copy website berbahasa Inggris. Jika audiens rekrutmen Indonesia juga penting, versi Indonesia atau pilihan bahasa Inggris/Indonesia akan memudahkan pemeriksaan dan pembaca; keputusan produk itu terpisah dari dokumen terjemahan ini.
7. **Badge keamanan terminal:** teks “Security policies: OpenShift SCC / NetworkPolicy” bisa dibaca sebagai klaim bahwa Dita sendiri membuat dan mengelola semua kebijakan tersebut. Saat ini hanya merupakan ringkasan kontrol pada skenario ilustratif. Perjelas apakah pernah mengonfigurasi SCC/NetworkPolicy sendiri atau hanya bekerja pada deployment yang berada di bawah kontrol itu; jika yang kedua, ubah label menjadi “kontrol lingkungan”.
8. **Kesiapan publikasi:** metadata situs masih `noindex`, target Lighthouse/Core Web Vitals dalam PRD belum dibuktikan lewat pengukuran, dan deployment publik pada homelab belum dibuktikan oleh audit file. Jadi cerita produk dapat direview sekarang, tetapi jangan mengumumkan capaian SEO/performa/ketersediaan portfolio yang belum terukur.

## 2. Terjemahan beranda dan navigasi

### Navigasi dan hero

- Expertise / Work / Experience / Contact → **Keahlian / Karya / Pengalaman / Kontak**.
- Currently active · DevOps Engineer at BRI (vendor) → **Saat ini bekerja sebagai DevOps Engineer di BRI melalui vendor.**
- Dita Setya Kurniawan / Mid-level DevOps → **Dita Setya Kurniawan / DevOps tingkat menengah.**
- Making complex delivery systems reliable. → **Membuat sistem pengiriman perangkat lunak yang kompleks menjadi andal.** Ini terjemahan judul yang sekarang terpasang, bukan hasil yang sudah diukur.
- I support enterprise mobile banking delivery through CI/CD scripting, Dockerfiles, Helm, quality gates and incident diagnosis. I collaborate on production release readiness and operate a separate Kubernetes homelab project. → **Saya mendukung pengiriman layanan mobile banking enterprise melalui skrip CI/CD, Dockerfile, Helm, pemeriksaan mutu, dan diagnosis insiden. Saya berkolaborasi dalam kesiapan rilis produksi serta mengoperasikan proyek homelab Kubernetes yang terpisah.**
- Explore selected work / Get in touch → **Lihat karya pilihan / Hubungi saya**.
- Selected practice → **Bidang praktik pilihan**.
- Enterprise delivery — Bamboo · Helm · OpenShift → **Pengiriman layanan enterprise — Bamboo · Helm · OpenShift**.
- Independent platform — KVM · Kubernetes · GitOps → **Platform mandiri — KVM · Kubernetes · GitOps**.
- Enterprise case details are reconstructed and sanitized. Independently operated projects are labeled separately. → **Rincian pekerjaan enterprise disusun kembali dan disamarkan. Proyek yang saya operasikan sendiri diberi penanda terpisah.**

### Terminal status ilustratif

- system-overview / illustrative; DEMO · NO LIVE TELEMETRY → **gambaran sistem / ilustrasi; DEMO · BUKAN TELEMETRI LANGSUNG**.
- 01 / Operational picture; Built for clarity under pressure. → **01 / Gambaran operasional; Dibuat untuk membantu melihat masalah dengan jelas dalam situasi mendesak.**
- A safe reconstruction of the workflows I work with. Values without a public monitoring source are deliberately left unpublished. → **Rekonstruksi aman dari alur kerja saya. Nilai tanpa sumber pemantauan publik sengaja tidak ditampilkan.**
- Tab Enterprise workflow / Independent project → **Alur enterprise / Proyek mandiri**.
- Uptime / Latency / Active cluster nodes / Security policies → **Waktu aktif / Latensi / Node cluster yang sedang aktif / Kebijakan keamanan**.
- Not published / No production telemetry / Cluster inventory is private → **Tidak dipublikasikan / Tidak ada telemetri produksi yang dapat dibuka / Inventaris cluster privat**.
- Enterprise security: OpenShift SCC / Deployment-level controls → **OpenShift SCC / Kontrol pada tingkat deployment**. Ini adalah ringkasan kontrol, bukan daftar kebijakan lengkap.
- Independent uptime/latency: Not connected / No public telemetry feed → **Tidak tersambung / Tidak ada sumber telemetri publik**.
- Independent nodes: Not published / Homelab topology withheld → **Tidak dipublikasikan / Topologi homelab tidak diungkapkan di terminal**. Bagian studi kasus tetap menyebut 3 control-plane dan 3 worker VM.
- Independent security: NetworkPolicy / GitOps deployment controls → **NetworkPolicy / Kontrol deployment melalui GitOps**.
- Architecture notes / Replay / No connection to private systems / View work → **Catatan arsitektur / Putar ulang / Tidak terhubung ke sistem privat / Lihat karya**.
- Baris terminal enterprise: **tinjau pengiriman layanan; pemeriksaan Bamboo dan pemilihan lingkungan; konfigurasi Helm dan probe; integrasi laporan cakupan SonarQube; rollout OpenShift dan diagnosis pod**.
- Baris terminal Zabisa: **tinjau pengiriman Zabisa; build Jenkins dan pemeriksaan mutu; pemindaian image dan SBOM; kontrol revisi GitOps yang tepat; latihan backup dan pemulihan**.
- Pengumuman aksesibilitas: **demo selesai diputar; demo dihentikan karena halaman tersembunyi; konteks enterprise/proyek mandiri dipilih; demo tampil tanpa animasi; pemutaran dimulai**.

### Kartu keahlian

**Pengantar:** “Keahlian / pekerjaan yang benar-benar saya lakukan”; **“Perangkat kerja praktis untuk pengiriman layanan yang andal.”** Lingkup enterprise mencakup pipeline, Dockerfile, konfigurasi deployment, koordinasi rilis, dan diagnosis insiden. Secara terpisah saya membangun platform Kubernetes multi-VM untuk Zabisa dan workload lain; satu host fisik bersama menjadi batas ketersediaannya.

1. **Skrip CI/CD dan otomasi.** Membangun serta merawat skrip inline Bamboo dan file skrip dalam repo Helm untuk rilis yang memperhatikan lingkungan, termasuk serah-terima produksi dari isolated ke existing bersama tim operasional. Bukti tertaut: **kasus promosi rilis dengan skrip**. Alat: Bamboo, Shell, Helm, Jira.
2. **Helm dan konfigurasi lingkungan.** Merawat template Helm dan nilai per lingkungan dari development sampai production. Berkolaborasi dengan developer tentang ConfigMap dan referensi secret; mengatur resource workload dan mendiagnosis kegagalan probe/rollout. Bukti: **konfigurasi deployment dan diagnosis**. Alat: Helm, OpenShift, ConfigMaps, Secrets.
3. **Dockerfile dan pengiriman image.** Merawat dasar Dockerfile untuk kelompok microservice yang besar; menyelidiki build, push, sinkronisasi image, dan konfigurasi Nexus lintas lingkungan. Bukti tautan: **contoh runtime CI yang dikontainerkan (Bun)**. Alat: Docker, Podman, Nexus, Skopeo. **Catatan:** contoh Bun hanya membuktikan sebagian dari klaim cakupan Dockerfile/Nexus; masih perlu contoh aman yang lebih langsung jika ingin menonjolkan ini.
4. **Pemeriksaan mutu dan keamanan.** Mengintegrasikan laporan cakupan pengujian dan analisis SonarQube ke Bamboo; menyiapkan pemeriksaan SAST dan analisis komponen perangkat lunak (SCA) dalam CI enterprise. Bukti: **cakupan Go terbaca setelah perbaikan CI**. Alat: SonarQube, SAST, SCA, Go coverage.
5. **Observabilitas dan integrasi layanan.** Menelusuri insiden workload/aliran log melalui Fluent Bit, Fluentd, Elasticsearch, dan Kibana; mengoordinasikan konfigurasi aplikasi RabbitMQ, Redis, Kafka bersama pemilik layanan; memeriksa jalur proxy dan firewall. Bukti: **alur penanganan insiden yang disamarkan**. Ini **bukan** klaim bahwa seluruh broker dikelola sendiri.
6. **Platform dan latihan pemulihan.** Membangun cluster Kubernetes VM yang berisi tiga control-plane dan tiga worker dengan layanan CI, registry, ingress, secret, dan storage terpisah; berlatih pengiriman GitOps dan pemulihan terisolasi dalam batas satu host fisik. Bukti: **pembangunan infrastruktur mandiri**. Alat: KVM/libvirt, Kubernetes, Vault, Argo CD.

### Karya pilihan di beranda

- Selected work / context and outcome; The work behind the systems. → **Karya pilihan / konteks dan hasil; Pekerjaan di balik sistem.**
- Three case studies trace a problem, my contribution and the known result. Enterprise examples are generalized to protect internal details. → **Tiga studi kasus menelusuri masalah, kontribusi saya, dan hasil yang diketahui. Contoh enterprise digeneralisasi untuk melindungi detail internal.**
- Explore all work → **Lihat semua karya**.
- Also in the case library: Bamboo and shell scripting for controlled production promotion → **Juga ada di pustaka: skrip Bamboo dan shell untuk promosi produksi yang terkendali**.

### Pengalaman di beranda

- Experience / current chapter; How the practice evolved. → **Pengalaman / tahap saat ini; Perkembangan praktik kerja saya.**
- A clear account of my professional scope alongside the infrastructure I build and operate independently. → **Gambaran lingkup pekerjaan profesional saya dan infrastruktur yang saya bangun serta operasikan secara mandiri.**
- **Nov 2025–sekarang, DevOps Engineer · BRI (vendor):** mendukung pengiriman layanan mobile banking pada sistem lama dan baru. Menyiapkan serta merawat pipeline Bamboo, skrip shell inline dan dalam repo, Dockerfile, dan konfigurasi Helm di development, test, pre-production, dan production. Berkoordinasi melalui Jira dan tabletop sebelum rilis; bekerja dengan operasional perbankan saat rollout produksi; menyelidiki insiden bersama tim platform, ekosistem, dan database. Pelaksanaan produksi dikerjakan bersama tim rilis dan operasional. Tautan: **lihat kasus enterprise yang disamarkan / jelajahi alur skrip**.
- **2026, proyek mandiri, platform Kubernetes multi-VM & Zabisa:** membangun tiga VM control-plane, tiga VM worker, dan layanan platform terpisah pada satu host fisik; mengoperasikan Zabisa dan workload lain dengan Jenkins, Harbor, Vault, GitOps, Argo CD. Banyak VM tidak menghapus titik kegagalan tunggal di host fisik. Tautan: **lihat kasus platform**.
- **2023–2025, DevOps Engineer · PT Pinus Pintar Community:** bekerja pada pipeline pengiriman, template deployment Docker/Kubernetes, dan monitoring Prometheus/Grafana untuk DeployAja dan SIDRA. Dirangkum dari CV 2025; angka hasil yang belum terverifikasi sengaja tidak ditampilkan.

### Kontak dan footer

- Contact / public profile; Let’s talk about reliable delivery. → **Kontak / profil publik; Mari berdiskusi tentang pengiriman layanan yang andal.**
- Explore selected work or reach out by email, phone, LinkedIn or GitHub. → **Lihat karya pilihan atau hubungi saya melalui email, telepon, LinkedIn, atau GitHub.**
- Professional overview / Privacy → **Ringkasan profesional / Privasi**.
- Email, nomor telepon, LinkedIn, dan GitHub yang ditampilkan memakai data yang telah diberikan/diizinkan; **cek lagi email di profil**: `ditasetya.kurniawan@gmail.com`.
- Email Dita / Copy email → **Kirim email ke Dita / Salin email**. Pesan status: **Email disalin**; **Alamat email dipilih, tekan Ctrl+C atau Command+C untuk menyalin**; **Pilih alamat email yang terlihat di atas untuk menyalinnya**. Label aksesibilitas “opens in a new tab” berarti **membuka tab baru**. Menu seluler: **Buka navigasi / Tutup navigasi**.

## 3. Pustaka studi kasus dan template halaman detail

- Selected work / evidence-led; Work behind the systems. → **Karya pilihan / berdasarkan bukti; Pekerjaan di balik sistem.**
- Explore enterprise delivery work and an independently operated platform. Each case distinguishes my contribution, what was observed and what remains unverified publicly. → **Jelajahi pekerjaan enterprise dan platform yang saya operasikan sendiri. Setiap kasus membedakan kontribusi saya, hal yang diamati, dan bagian yang belum bisa diverifikasi publik.**
- Filter by scope: All work / Enterprise / Independent → **Filter berdasarkan lingkup: Semua / Enterprise / Mandiri**.
- Topic / All topics → **Topik / Semua topik**. Topik: **pengiriman CI/CD; skrip dan otomasi; quality gate; container dan platform; observabilitas dan operasi; GitOps dan pemulihan**.
- No matching case studies / Try another scope or topic / Show all work → **Tidak ada kasus yang sesuai / Coba lingkup atau topik lain / Tampilkan semua karya**. Penjelasan saat kosong: ringkasan yang terbit hanya mencakup pekerjaan dengan lingkup jelas dan status bukti yang dapat dipertanggungjawabkan.
- Enterprise · sanitized / Independent project → **Enterprise · disamarkan / Proyek mandiri**; Read case study → **Baca studi kasus**.
- Status “Sanitized reconstruction” → **Rekonstruksi yang disamarkan**; “Migration in progress” → **Migrasi sedang berlangsung**. Status “Public reference” disediakan dalam komponen tetapi belum dipakai keenam kasus.
- Halaman detail memakai: **Beranda → Karya → Kasus**; **Peran / Periode / Bukti**; **Konteks dan batasan / Lingkungan kerja**; **Masalah / Hal yang perlu ditangani**; **Kontribusi / Hal yang saya ubah**; **Hasil diketahui / Yang terjadi setelahnya**; **Arsitektur / gambaran aman / Hubungan antartahap**; **Implementasi / keputusan dan pelaksanaan**; **Validasi / hasil yang diketahui**; **Bukti dan batas klaim**; **Semua studi kasus / Berikutnya**.
- Pengantar diagram di semua detail: **model serah-terima yang aman untuk publik, tanpa endpoint internal, metrik runtime, atau diagram sistem privat**.

## 4. Terjemahan lengkap enam studi kasus

### 01 — Diagnosis kegagalan deployment enterprise

**Judul saat ini:** “Making deployment failures diagnosable” → **Membuat kegagalan deployment lebih mudah didiagnosis**. **Ringkasan:** menjaga pengiriman layanan lintas lingkungan tetap dapat ditelusuri, dari konfigurasi CI dan build image sampai rollout Helm dan serah-terima operasional. **Peran:** DevOps Engineer melalui vendor di BRI. **Periode:** 2025–sekarang. **Status bukti:** direkonstruksi dari pengalaman kerja; pemeriksaan artefak yang bisa dipublikasikan masih menunggu.

- **Konteks:** layanan mobile banking dikirim ke development, test, pre-production, production. Ini gabungan tersamarkan dari pekerjaan konfigurasi dan rilis yang berulang, bukan satu insiden yang dapat diidentifikasi.
- **Masalah:** Dockerfile, rencana CI, template Helm, dependensi aplikasi, dan nilai per lingkungan perlu tetap selaras di banyak layanan. Build yang lulus tidak otomatis berarti rollout sehat atau serah-terima produksi siap.
- **Kontribusi:** menyiapkan/merawat rencana Bamboo, dasar Dockerfile, dan konfigurasi Helm; memeriksa resource, probe, log, serta setting per lingkungan; bekerja dengan developer dan operasional untuk kesiapan rilis serta diagnosis insiden.
- **Hasil diketahui:** alur kerja menyediakan tempat yang jelas untuk memeriksa konfigurasi, gangguan runtime, dan tanggung jawab saat serah-terima. Belum ada bukti mandiri bahwa insiden, downtime, atau waktu investigasi berkurang untuk kasus ini.
- **Batas konteks:** rilis produksi melibatkan tim rilis dan operasional perbankan; tidak ada klaim melakukan seluruhnya sendiri atau memiliki cluster enterprise. Nama layanan, host, namespace, manifest, topologi, endpoint registry, dan jumlah layanan tidak dipublikasikan.
- **Alur:** Jira dan rencana CI → image dan Nexus → Helm dan OpenShift → serah-terima operasional.
- **Pelaksanaan:** (1) merawat Dockerfile dan template Bamboo untuk layanan baru/lama serta memetakan branch ke lingkungan; (2) membandingkan nilai Helm, manifest hasil render, referensi ConfigMap/secret, resource, dan probe bersama developer/platform; (3) memeriksa aliran Fluent Bit/Fluentd, tampilan Elasticsearch/Kibana, serta setting dependensi aplikasi bersama pemiliknya; (4) mengikuti tabletop sebelum rilis dan diagnosis saat produksi bersama tim rilis/operasional, termasuk jalur proxy/firewall jika terkait.
- **Validasi:** Dita menjelaskan pemeriksaan chart hasil render, pilihan lingkungan CI, readiness workload, event runtime, dan log yang boleh diakses. Belum ada artefak sebelum/sesudah khusus atau log produksi yang disetujui untuk dipublikasikan.
- **Batas klaim:** alur ini adalah rekonstruksi gabungan, bukan satu kejadian produksi atau dashboard; RabbitMQ, Redis, Kafka adalah titik integrasi aplikasi, bukan klaim memiliki broker; tidak ada jumlah fleet, uptime, latensi, atau waktu pemulihan yang dipublikasikan.

### 02 — Cakupan tes Go dalam SonarQube

**Judul:** “Making Go coverage visible in SonarQube” → **Membuat cakupan tes Go terbaca di SonarQube**. **Ringkasan:** menelusuri laporan Go dari eksekusi Bamboo sampai analisis SonarQube setelah cakupan sebelumnya tampil 0%. **Peran:** DevOps Engineer melalui vendor di BRI. **Periode:** 2026. **Status bukti:** log Bamboo privat menunjukkan Go Cover membaca `coverage.out` dan quality gate lulus; log itu tidak terbuka untuk umum.

- **Konteks:** microservice Go dianalisis dengan Bamboo dan SonarQube; nama internal dan ID rencana tidak ditampilkan.
- **Masalah:** cakupan terlihat 0% sebelum laporan Go yang dimaksud dipakai dalam analisis. Eksekusi task, pemilihan branch, dan pemuatan laporan perlu dicek bersama.
- **Kontribusi:** mengalihkan eksekusi ke task shell Bamboo, memeriksa pilihan plan/branch, memastikan scanner membaca `coverage.out` yang dibuat tes Go, lalu menjalankan ulang pipeline.
- **Hasil diketahui:** pada pengulangan, laporan Go dibaca, cakupan dihitung secara normal, dan quality gate SonarQube lulus. Situs tidak mengklaim Dita menulis suite tes atau menaikkan persentase cakupan tes.
- **Batas konteks:** ID plan, path proyek, dan log build privat; implementasi tes dan target cakupan milik tim developer.
- **Alur:** tes Go → `coverage.out` → task shell Bamboo → sensor Go SonarQube.
- **Pelaksanaan:** pastikan tes membuat `coverage.out` sebelum scanner; cocokkan task shell dan branch dengan rencana Bamboo; periksa pembacaan laporan Go dan ulangi quality gate.
- **Validasi:** log CI privat yang diberikan menunjukkan sensor Go Cover memuat `coverage.out` dan quality gate lulus; menurut Dita angka cakupan kemudian muncul, tetapi persentasenya sengaja tidak dicantumkan.
- **Batas klaim:** tidak menyalin persentase atau ID build privat; integrasi scanner berbeda dari penulisan tes.

### 03 — Eksperimen Bun untuk CI

**Judul:** “Bun without changing shared agents” → **Mencoba Bun tanpa mengubah agent CI bersama**. **Ringkasan:** membatasi eksperimen Bun pada satu branch sementara branch CI lain tetap menggunakan Node/npm. **Peran:** DevOps Engineer melalui vendor di BRI. **Periode:** 2026. **Status bukti:** image dan wrapper sudah divalidasi; migrasi repo menunggu lockfile dan tes dari tim.

- **Konteks:** pemilihan runtime berdasarkan branch untuk monorepo React Native di Bamboo.
- **Masalah:** branch eksperimen membutuhkan Bun, sedangkan branch lain tetap bergantung pada Node/npm; agent build bersama tidak diubah hanya untuk satu eksperimen.
- **Kontribusi:** menyiapkan image CI Debian + Bun 1.4.2 dengan dukungan git, SSH, dan sertifikat CA, beserta wrapper yang hanya memilih container pada branch eksperimen.
- **Hasil diketahui:** image dan wrapper yang mempertimbangkan branch divalidasi. Migrasi repo ke Bun secara menyeluruh **belum diklaim selesai**.
- **Batas konteks:** kredensial build tetap dalam variabel CI yang diamankan; branch lain tetap pada jalur Node/npm.
- **Alur:** pemeriksaan branch → container Bun → tes dan analisis → jalur cadangan Node/npm.
- **Pelaksanaan:** kemas alat SCM/sertifikat yang diperlukan; deteksi runtime container dan branch sebelum memilih perintah; pertahankan npm untuk branch non-eksperimen.
- **Validasi:** image Debian melaporkan Bun 1.4.2 dan utilitas SCM; wrapper memilih branch yang dituju dan tetap menyediakan jalur cadangan.
- **Batas klaim:** `bun.lock` yang di-commit dan validasi tim developer masih diperlukan menurut status saat ini; lokasi registry dan variabel rahasia tidak ditampilkan.

### 04 — Pengiriman Zabisa yang terkendali

**Judul:** “Controlled delivery for Zabisa” → **Pengiriman Zabisa yang terkendali**. **Ringkasan:** menyambungkan pemeriksaan kode sumber, keamanan image, publikasi GitOps, dan deployment runtime yang ditinjau pada Kubernetes yang dioperasikan sendiri. **Peran:** proyek mandiri, platform dan pengiriman. **Periode:** 2026. **Status bukti:** kode sumber dan runbook privat pernah diperiksa; pengunjung publik tidak bisa mengaksesnya.

- **Konteks:** Zabisa Super App berjalan di cluster Kubernetes beberapa VM pada satu host fisik bersama. Repo sumber bersifat privat; catatan pengiriman menjelaskan lingkungan development/test (DT).
- **Masalah:** aplikasi yang tumbuh membutuhkan alur rilis berulang yang memungkinkan diagnosis kegagalan dan latihan pemulihan, sambil mengakui satu host bukan *high availability* fisik.
- **Kontribusi:** menyiapkan pemeriksaan mutu sumber, gate build dan pemindaian Jenkins, publikasi image immutable ke Harbor, manifest GitOps dan rekonsiliasi Argo CD; melatih backup database terenkripsi serta pemulihan terisolasi sebelum rollout terkendali.
- **Hasil diketahui:** ada jalur pengiriman development/test terdokumentasi secara internal dan jejak rollout. Tidak ada klaim ketersediaan produksi publik; host bersama tetap menjadi titik kegagalan.
- **Batas konteks:** VM control-plane dan worker berbagi satu server bare-metal; kredensial, detail storage privat, dan telemetri langsung tidak dipublikasikan; repo sumber privat sehingga tidak ada tautan kode publik sebagai pembuktian.
- **Alur:** pemeriksaan source GitHub → Jenkins dan Harbor → publikasi GitOps → Argo CD dan Kubernetes.
- **Pelaksanaan:** gunakan hasil tes, quality check SonarQube, scan image Trivy, dan SBOM sebelum publikasi; catat referensi image yang tidak berubah dan tinjau revisi GitOps sebelum sinkronisasi Argo CD; lakukan latihan backup terenkripsi dan pemulihan database secara terisolasi.
- **Validasi:** runbook privat mencatat publikasi image, revisi GitOps, dan rollout DT yang terkendali; langkah backup/pemulihan didokumentasikan privat tetapi belum dapat diverifikasi publik.
- **Batas klaim:** repo tidak terbuka; arsitektur tidak dinyatakan sebagai high availability produksi atau rancangan pemulihan bencana yang selesai.

### 05 — Promosi rilis produksi dengan skrip

**Judul:** “Scripted production promotion” → **Promosi rilis produksi dengan skrip**. **Ringkasan:** memakai skrip inline Bamboo dan skrip dalam repo Helm untuk membantu promosi terkontrol dari lingkungan produksi isolated ke existing. **Peran:** DevOps Engineer melalui vendor di BRI. **Periode:** 2025–sekarang. **Status bukti:** penjelasan publik disusun kembali dari penuturan Dita; skrip serta log asli tetap privat.

- **Konteks:** pengiriman mobile banking melalui banyak lingkungan dan tujuan produksi yang terpisah. Ini pola pekerjaan berulang, bukan satu rilis yang dapat diidentifikasi.
- **Masalah:** promosi antara jalur isolated dan existing perlu pemilihan lingkungan yang konsisten, langkah yang dapat dipakai ulang, dan koordinasi dengan tim rilis/operasional perbankan. Serah-terima manual dapat membuat konfigurasi dan artefak yang terpilih kurang jelas.
- **Kontribusi:** menulis dan merawat skrip inline Bamboo serta file skrip pada repo Helm untuk persiapan rollout dan promosi berdasarkan lingkungan; mengoordinasikan pelaksanaan produksi dan troubleshooting bersama tim rilis serta operasional.
- **Hasil diketahui:** skrip memberikan titik tinjau yang jelas untuk pemilihan target dan langkah rilis saat serah-terima. Tidak ada klaim pengurangan insiden, durasi, atau pekerjaan manual tanpa bukti yang disetujui.
- **Batas konteks:** pelaksanaan produksi bersama tim rilis/operasional yang berwenang; tanggung jawab menulis skrip tidak berarti kewenangan deployment tunggal. Target, topologi, path internal, skrip, dan kredensial tidak dimuat.
- **Alur:** logika inline Bamboo → skrip di repo → pemeriksaan jalur isolated → serah-terima jalur existing.
- **Pelaksanaan:** skrip inline memilih lingkungan dan memanggil skrip yang dikelola dalam repo; file skrip dirawat bersama konfigurasi Helm supaya logika rilis dapat ditinjau; promosi lintas lokasi produksi dikoordinasikan dengan tim terkait; output pipeline dan diagnosis deployment dipakai saat ada ketidakcocokan skrip, image, atau chart.
- **Validasi:** Dita menjelaskan peninjauan target pilihan, versi image, dan konfigurasi Helm hasil render saat serah-terima; tidak ada log rilis khusus yang disetujui untuk publik atau pengukuran sebelum/sesudah.
- **Batas klaim:** diagram hanyalah rekonstruksi editorial; kode otomasi produksi tidak terbuka untuk verifikasi mandiri; nama/konektivitas lokasi tidak diungkap; skrip tidak otomatis membuktikan rilis tanpa downtime atau sepenuhnya otomatis.

### 06 — Platform Kubernetes multi-VM

**Judul:** “Building a multi-VM Kubernetes platform” → **Membangun platform Kubernetes multi-VM**. **Ringkasan:** membangun dan mengoperasikan cluster VM control-plane/worker beserta layanan delivery, storage, observabilitas pada satu mesin fisik. **Peran:** proyek mandiri, pembangun dan operator infrastruktur. **Periode:** 2026. **Status bukti:** topologi menurut Dita dan catatan cluster privat; hostname serta alamat IP sengaja tidak dipublikasikan.

- **Konteks:** host KVM/libvirt yang dioperasikan sendiri memuat tiga VM control-plane, tiga VM worker, dan VM pendukung lain. Zabisa menggunakan platform yang sama dengan workload lain.
- **Masalah:** beberapa aplikasi membutuhkan platform bersama untuk delivery, routing, secret, log, dan deployment dibanding container manual yang terpisah. Satu server fisik membatasi toleransi kegagalan seluruh VM.
- **Kontribusi:** menyusun VM dan Kubernetes, lapisan load-balancing/ingress, serta Jenkins, registry, observabilitas, secret, dan database pendukung; mengoperasikan workload aplikasi pada cluster bersama.
- **Hasil diketahui:** beberapa aplikasi dapat berjalan pada cluster mandiri bersama dengan layanan pendukung dan pengiriman berulang. Replikasi di tingkat VM tidak menghapus host fisik sebagai satu titik kegagalan.
- **Batas konteks:** server fisik merupakan *failure domain* bersama; IP privat, IP publik host, SSH entry point, dan hostname tidak dimuat; repo Zabisa privat dan halaman ini hanya menguraikan arsitektur yang disamarkan.
- **Alur:** host KVM/libvirt → VM control-plane dan worker → ingress dan load-balancing → layanan platform.
- **Pelaksanaan:** menyusun 3+3 VM dan VM lain untuk load-balancing, CI, registry, observabilitas, object storage, database; menyediakan jaringan Kubernetes, ingress/routing, pengelolaan secret, storage, dan integrasi log; menjalankan Zabisa serta aplikasi lain dengan batas deployment/operasional per layanan.
- **Validasi:** inventaris cluster lintas namespace yang pernah diberikan memperlihatkan komponen control-plane, infrastruktur, dan beberapa namespace aplikasi berstatus Running **pada satu waktu pemeriksaan**; runbook privat menjelaskan GitOps dan penerimaan aplikasi untuk development/test.
- **Batas klaim:** satu snapshot pod sehat bukan ukuran uptime atau bukti DR; worker VM yang terpisah tetap bisa gagal bersamaan saat host/site bermasalah; tidak ada topologi internal, target waktu pemulihan, atau SLO produksi yang dipublikasikan.

## 5. Halaman ringkasan profesional, CV, dan privasi

### `/resume` — terjemahan konten halaman

- Professional overview / current scope; Delivery is a team practice. → **Ringkasan profesional / lingkup saat ini; Pengiriman layanan adalah kerja tim.**
- Dita Setya Kurniawan · DevOps Engineer (mid-level). I work on CI/CD scripting, container builds, Helm configuration and operational diagnosis in enterprise mobile banking delivery. I build and operate a separate Kubernetes homelab project. → **Dita Setya Kurniawan · DevOps Engineer tingkat menengah. Saya menangani skrip CI/CD, build container, konfigurasi Helm, dan diagnosis operasional dalam pengiriman layanan mobile banking enterprise. Saya juga membangun dan mengoperasikan proyek homelab Kubernetes yang terpisah.**
- Download CV · 665 KiB · Updated 27 September 2026 → **Unduh CV · 665 KiB · diperbarui 27 September 2026**. Tanggal dan ukuran mengikuti metadata di kode saat ini; isi PDF diperiksa tersendiri.
- Selected experience → **Pengalaman pilihan**. **BRI (vendor), Nov 2025–sekarang:** skrip Bamboo inline/repo, Dockerfile, Helm, quality check, konfigurasi lingkungan, dan dukungan rilis produksi bersama tim rilis/operasional. **Proyek mandiri, 2026:** 3+3 VM pada satu server fisik dengan CI, registry, storage; Zabisa dan workload lain menggunakannya, dengan batas satu host. **PT Pinus Pintar Community, 2023–2025:** GitHub Actions, Docker/Kubernetes, Prometheus/Grafana untuk DeployAja/SIDRA.
- Engineering practice → **Praktik rekayasa**; mengulang enam kartu keahlian pada §2. Read scripting case / Read platform case / Related case → **Baca kasus scripting / Baca kasus platform / Kasus terkait**.

**Catatan PDF:** tautan unduh sebelum pengalihan bahasa mengarah ke `public/resume/Dita_Setya_Kurniawan_CV_2026-09.pdf` (Inggris). Sekarang tombol CV mengarah ke `public/resume/Dita_Setya_Kurniawan_CV_ID_2026-09.pdf` (Indonesia). Sebelum dipakai melamar, cocokkan tanggal, identitas, jabatan, pelatihan, proyek, dan seluruh klaim PDF dengan data Dita.

### PDF CV yang diunduh — terjemahan isi untuk diperiksa

**Halaman 1.** **Dita Setya Kurniawan — DevOps Engineer / tingkat menengah.** Kontak: nomor telepon, email, LinkedIn, GitHub sebagaimana pada bagian kontak di atas.

- **Profil:** DevOps Engineer yang menangani skrip CI/CD, build container, konfigurasi deployment Helm/OpenShift, quality gate, dan diagnosis insiden pada mobile banking enterprise. Secara mandiri membangun serta mengoperasikan platform Kubernetes multi-VM, termasuk alur pengiriman dan latihan pemulihan. Rilis perbankan produksi melibatkan tim rilis dan operasional khusus.
- **Pengalaman profesional — BRI melalui vendor, Nov 2025–sekarang:** (1) menyiapkan/merawat plan Bamboo, skrip shell inline, skrip repo Helm, dasar Dockerfile dari development sampai production; (2) mengelola nilai Helm per lingkungan, referensi ConfigMap/secret, resource, probe, dan konfigurasi rollout OpenShift bersama developer/platform; (3) mendukung promosi produksi isolated→existing, tinjauan rilis berbasis Jira, troubleshooting dengan tim rilis/operasional; (4) mengintegrasikan SonarQube coverage, SAST, dan analisis komponen; menyelesaikan hasil cakupan Go yang tampak keliru lewat perbaikan eksekusi Bamboo dan pemeriksaan impor laporan; (5) menyelidiki image/registry, rantai log Fluent Bit–Fluentd–Elasticsearch–Kibana, dependensi layanan, proxy/firewall bersama tim pemilik.
- **PT Pinus Pintar Community, 2023–2025:** DeployAja dan SIDRA sebagaimana tercatat pada CV terdahulu; membuat/merawat pipeline GitHub Actions dan template deployment Docker/Kubernetes; menangani monitoring Prometheus/Grafana, ingress, troubleshooting bersama developer dan pemilik produk.

**Halaman 2.**

- **Platform Kubernetes mandiri, 2026:** lingkungan KVM/libvirt dengan tiga VM control-plane, tiga VM worker, VM load-balancing, serta layanan CI, registry, observabilitas, storage, database terpisah. Zabisa dan aplikasi lain menggunakan cluster bersama. Semua VM bergantung pada satu host fisik, sehingga ini bukan *high availability* fisik.
- **Platform:** jaringan Calico, ingress-nginx, MetalLB, injeksi secret Vault, observabilitas, serta MinIO untuk penyimpanan media. **Delivery:** pemeriksaan mutu kode, Jenkins, SonarQube, Trivy, SBOM, image immutable di Harbor, GitOps, dan sinkronisasi Argo CD yang ditinjau. **Latihan pemulihan:** backup MySQL terenkripsi, verifikasi pemulihan terisolasi, dan rollout development/test yang terikat pada revisi; tanpa klaim produksi publik atau target waktu pemulihan.
- **Keputusan teknis pilihan:** cakupan Go 0% ditelusuri melalui Bamboo shell dan impor `coverage.out` hingga dibaca SonarQube dan quality gate lulus; eksperimen Bun memakai container Debian Bun 1.4.2 dan wrapper branch Bamboo dengan npm untuk branch lain, migrasi penuh menunggu lockfile; otomasi rilis melalui skrip inline Bamboo dan skrip yang diversi bersama Helm, pelaksanaan bersama operasional yang berwenang.
- **Perangkat teknis:** pengiriman (Bamboo, Jenkins, GitHub Actions, GitOps, Argo CD, Bash); platform (Kubernetes, OpenShift, KVM/libvirt, Helm, Docker, Podman); keamanan (SonarQube, SAST/SCA, Trivy, Vault, SBOM, Harbor, Nexus); operasi (Prometheus, Grafana, Fluent Bit, Fluentd, Elastic, Kibana); storage (MySQL, MinIO, latihan backup/pemulihan terisolasi).
- **Pelatihan:** kursus DevOps / Cloud / Kubernetes, PT Pinus Pintar Community IT, Semarang (2022–2023). **Koreksi bila perlu:** pastikan nama lembaga, lokasi, periode, dan apakah sebutan “kursus” benar.

### `/privacy` — terjemahan konten halaman

- Privacy / current website; A small public footprint. → **Privasi / website saat ini; Jejak publik yang terbatas.**
- Situs memakai konten editorial statis dan terminal ilustratif. Kode aplikasinya tidak terhubung ke sistem perusahaan, aliran monitoring homelab, formulir kontak, atau layanan analitik pihak ketiga.
- What a visit involves → **Apa yang terjadi saat mengunjungi situs**. Website merender halaman dan mungkin memasang cookie teknis yang diperlukan framework/hosting. Penyedia hosting atau reverse proxy kelak mungkin menyimpan log permintaan dan keamanan sesuai konfigurasinya. Halaman ini harus dicek terhadap deployment sesungguhnya sebelum peluncuran publik.
- Contact and external links → **Kontak dan tautan luar**. Menyalin email memakai clipboard browser; tidak ada data kontak dikirim ke situs ini. GitHub dan LinkedIn merupakan layanan lain dengan aturan privasi masing-masing.
- Last content review: 27 September 2026. Any future analytics or contact processing will need an updated notice. → **Konten terakhir ditinjau 27 September 2026. Jika nanti ditambahkan analitik atau pemrosesan kontak, pemberitahuan privasi perlu diperbarui.**

## 6. Informasi yang akan paling membantu untuk koreksi berikutnya

Ini **bukan prasyarat untuk membaca atau memakai terjemahan**. Jawab hanya yang diketahui dan aman dibuka; jumlah IP, endpoint, kredensial, log perusahaan, nama internal, dan artefak sensitif tidak perlu dikirim.

1. **Satu contoh BRI yang aman diceritakan:** apa yang gagal/berisiko (tanpa nama sistem), apa pemeriksaan atau perbaikan yang Dita lakukan sendiri, siapa terlibat, dan bagaimana tahu rilis/diagnosis berhasil? “Tidak ada angka yang boleh dipublikasikan” adalah jawaban yang sah.
2. **Alur scripting produksi:** dalam cerita isolated→existing, bagian mana milik skrip Dita, siapa yang memberi persetujuan, dan siapa yang mengeksekusi tiap tahap? Istilah DC/DRC/ODC/GCP/GPC: apakah semuanya memang lokasi/lingkungan yang sesuai untuk disebut publik, atau sebaiknya cukup “beberapa tujuan produksi”?
3. **Linimasa mandiri:** kapan mulai membangun host/VM/Kubernetes dan Zabisa? Apakah benar mulai 2026 dan berjalan paralel dengan BRI? Jangan menebak tahun hanya karena bukti saat ini berasal dari 2026.
4. **Status Bun terbaru:** masih eksperimen per branch, sudah dipakai penuh, atau dihentikan? Apakah `bun.lock` dan hasil tes telah selesai?
5. **Pengalaman awal dan CV:** apakah peran PT Pinus, DeployAja, SIDRA, dan tanggal 2023–2025 sudah tepat? Apakah email publik yang tercantum masih aktif dan semua isi PDF CV boleh dipublikasikan?
6. **Prioritas pembaca:** ingin website tetap Inggris dengan dokumen Indonesia untuk audit, atau nanti situs bilingual? Jawaban ini baru diperlukan ketika benar-benar mengubah UI.
7. **Kontrol keamanan dan rincian CV:** apakah Dita pernah menyusun/mengubah SCC atau NetworkPolicy sendiri? Apakah “Vault secret injection”, “backup MySQL terenkripsi”, dan pelatihan 2022–2023 pada PDF akurat serta aman diterbitkan?

**Jika semua jawaban belum tersedia, perbaikan yang masih bisa dikerjakan sekarang:** ubah urutan studi kasus unggulan, bedakan jenis bukti, jelaskan pekerjaan mandiri yang paralel, dan rapikan salinan kasus 01/05 agar tidak menyiratkan hasil yang belum terukur. Jangan tambahkan angka atau artefak privat untuk mengisi kekosongan.
