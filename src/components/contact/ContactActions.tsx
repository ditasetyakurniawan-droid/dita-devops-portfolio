"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, Check, Copy, Mail, Phone } from "lucide-react";

type Props = Readonly<{ email?: string; githubUrl: string; linkedinUrl: string; phone: string }>;

export function ContactActions({ email, githubUrl, linkedinUrl, phone }: Props) {
  const [status, setStatus] = useState("");
  const emailRef = useRef<HTMLSpanElement>(null);

  async function copyEmail() {
    if (!email) return;
    try {
      await navigator.clipboard.writeText(email);
      setStatus("Email disalin");
    } catch {
      const selection = window.getSelection();
      if (selection && emailRef.current) {
        selection.removeAllRanges();
        const range = document.createRange();
        range.selectNodeContents(emailRef.current);
        selection.addRange(range);
        setStatus("Alamat email dipilih. Tekan Ctrl+C atau Command+C untuk menyalinnya.");
      } else {
        setStatus("Pilih alamat email di atas untuk menyalinnya.");
      }
    }
  }

  return (
    <div className="flex flex-col items-start gap-3">
      {email && (
        <>
          <span ref={emailRef} className="select-text break-all font-mono text-sm text-slate-200">{email}</span>
          <div className="flex flex-wrap gap-3">
            <a href={`mailto:${email}`} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border-highlight bg-obsidian-raised px-4 text-sm font-medium text-slate-50 hover:border-accent-cyan">
              <Mail aria-hidden="true" className="size-4 text-accent-cyan" /> Kirim email
            </a>
            <button type="button" onClick={copyEmail} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border-highlight px-4 text-sm font-medium text-slate-50 hover:border-accent-cyan">
              {status === "Email disalin" ? <Check aria-hidden="true" className="size-4" /> : <Copy aria-hidden="true" className="size-4" />}
              Salin email
            </button>
          </div>
          <span role="status" aria-live="polite" className="text-xs text-slate-300">{status}</span>
        </>
      )}
      <a href={`tel:${phone}`} className="inline-flex min-h-11 items-center gap-2 text-sm text-slate-300 hover:text-slate-50"><Phone aria-hidden="true" className="size-4" /> {phone}</a>
      <div className="flex flex-wrap gap-3">
        {[{ href: linkedinUrl, label: "LinkedIn" }, { href: githubUrl, label: "GitHub" }].map(({ href, label }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border-highlight px-5 text-sm font-medium text-slate-50 transition-colors hover:border-accent-blue">
            {label} <ArrowUpRight aria-hidden="true" className="size-4" /><span className="sr-only">(terbuka di tab baru)</span>
          </a>
        ))}
      </div>
    </div>
  );
}
