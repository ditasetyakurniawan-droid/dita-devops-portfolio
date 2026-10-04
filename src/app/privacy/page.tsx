import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const metadata: Metadata = {
  title: "Privasi | Dita Setya Kurniawan",
  description: "Informasi yang ditampilkan portofolio DevOps ini dan data yang tidak dikumpulkan melalui aplikasinya.",
};

export default function PrivacyPage() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-slate-50 focus:p-3 focus:text-obsidian">Langsung ke konten</a>
      <SiteHeader />
      <main id="main" className="mx-auto max-w-content px-5 pb-28 pt-16 sm:px-8 sm:pt-24 lg:px-10">
        <Link href="/" className="inline-flex min-h-11 items-center gap-2 text-sm text-slate-300 hover:text-slate-50"><ArrowLeft aria-hidden="true" className="size-4" /> Beranda</Link>
        <div className="mt-12 max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[.2em] text-accent-cyan">Privasi / situs saat ini</p>
          <h1 className="mt-5 text-[clamp(2.8rem,6vw,4.8rem)] font-semibold leading-[1.07] tracking-display text-slate-50">Jejak publik yang terbatas.</h1>
          <p className="mt-7 text-base leading-8 text-slate-300">Portofolio ini memakai konten editorial statis dan terminal ilustratif. Kode aplikasinya tidak terhubung ke sistem perusahaan, sumber monitoring homelab, formulir kontak, atau layanan analitik pihak ketiga.</p>
          <section className="mt-12 rounded-2xl border border-border-subtle bg-obsidian-surface p-7">
            <h2 className="text-xl font-semibold text-slate-50">Saat mengunjungi situs</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">Situs menampilkan halaman dan mungkin memakai cookie teknis yang diperlukan oleh framework atau hosting. Penyedia hosting atau reverse proxy kelak mungkin menyimpan log permintaan dan keamanan sesuai konfigurasinya. Isi halaman ini perlu diperiksa terhadap deployment sebenarnya sebelum situs dipublikasikan.</p>
          </section>
          <section className="mt-5 rounded-2xl border border-border-subtle bg-obsidian-surface p-7">
            <h2 className="text-xl font-semibold text-slate-50">Kontak dan tautan luar</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">Fitur salin email memakai clipboard browser; tidak ada data kontak yang dikirim ke situs ini. Membuka GitHub atau LinkedIn akan membawa Anda ke layanan lain dengan kebijakan privasinya sendiri.</p>
          </section>
          <p className="mt-9 text-sm text-slate-300">Konten terakhir ditinjau: 27 September 2026. Pemberitahuan ini perlu diperbarui jika nanti ditambahkan analitik atau pemrosesan kontak.</p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
