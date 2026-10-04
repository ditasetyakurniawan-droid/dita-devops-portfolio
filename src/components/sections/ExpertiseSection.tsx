import Link from "next/link";
import { competencies } from "@/content/experience";
import { caseHref } from "@/content/cases";

export function ExpertiseSection() {
  return (
    <section id="expertise" aria-labelledby="expertise-heading" className="scroll-mt-24 border-t border-border-subtle py-24 sm:py-28">
      <div className="mx-auto max-w-content px-5 sm:px-8 lg:px-10">
        <div className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[.24em] text-accent-cyan">Keahlian & Kompetensi Utama</p>
          <h2 id="expertise-heading" className="mt-4 text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">Kapabilitas teknis di lingkungan Enterprise & Mandiri.</h2>
          <p className="mt-4 text-base leading-7 text-slate-300">Di lingkungan perbankan (BRI), saya mengelola siklus CI/CD, Dockerfile, konfigurasi Helm, DevSecOps, dan kesiapan rilis untuk 200+ microservices melintasi 6 tahap environment. Untuk melengkapi penguasaan infrastruktur dari level dasar, saya membangun sendiri platform Kubernetes Multi-VM dari 0 di atas bare-metal KVM.</p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {competencies.map(({ title, description, evidence, caseSlug, tools, icon: Icon }) => (
            <article key={title} className="flex flex-col rounded-2xl border border-border-subtle bg-card-sheen bg-obsidian-surface p-6 shadow-panel sm:p-7">
              <span className="grid size-11 place-items-center rounded-xl border border-border-highlight bg-obsidian-raised text-accent-blue"><Icon className="size-5" aria-hidden="true" strokeWidth={1.6} /></span>
              <h3 className="mt-7 text-xl font-semibold tracking-tight text-slate-50">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p>
              <Link href={caseHref(caseSlug)} className="mt-5 inline-flex min-h-11 items-center self-start text-xs leading-5 text-accent-cyan hover:text-slate-50">
                {evidence} <span aria-hidden="true" className="ml-1">↗</span>
              </Link>
              <ul aria-label={`Alat untuk ${title}`} className="mt-auto flex flex-wrap gap-2 pt-7">
                {tools.map((tool) => <li key={tool} className="rounded-md border border-border-subtle bg-obsidian-inset px-2.5 py-1 font-mono text-[11px] text-slate-200">{tool}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
