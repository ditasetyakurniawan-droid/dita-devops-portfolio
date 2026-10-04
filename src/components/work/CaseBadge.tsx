import type { CaseStudy, EvidenceStatus } from "@/content/cases";

const labels: Record<EvidenceStatus, string> = {
  sanitized: "Studi Kasus Terdokumentasi",
  "in-progress": "Implementasi Tervalidasi",
  "public-reference": "Referensi Publik",
};

export function CaseBadge({ study }: { study: CaseStudy }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-accent-cyan/25 bg-accent-cyan/[.07] px-3 py-1.5 font-mono text-[10px] leading-4 tracking-wide text-accent-cyan">
      <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-accent-cyan" />
      {labels[study.evidenceStatus]}
    </span>
  );
}
