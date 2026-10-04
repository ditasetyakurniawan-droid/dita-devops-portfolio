"use client";

import { useState } from "react";
import { Send, Terminal, Check, Copy, Sparkles, Clock, Globe } from "lucide-react";
import { profile } from "@/content/profile";
import { BrandIcon, type BrandKey } from "@/components/icons/BrandIcon";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

export function ContactSection() {
  const [copied, setCopied] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [copiedTerminal, setCopiedTerminal] = useState(false);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2500);
  };

  const handleCopyTerminal = () => {
    if (!terminalOutput.length) return;
    navigator.clipboard.writeText(terminalOutput.join("\n"));
    setCopiedTerminal(true);
    setTimeout(() => setCopiedTerminal(false), 2000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message) return;
    const mailto = `mailto:${profile.publicEmail}?subject=Pesan Portofolio dari ${encodeURIComponent(name || "Pengunjung")}&body=${encodeURIComponent(
      `Nama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`
    )}`;
    window.open(mailto, "_blank");
  };

  const runCommand = (cmd: string) => {
    if (cmd === "nodes") {
      setTerminalOutput([
        "$ kubectl get nodes -o wide",
        "NAME          STATUS   ROLES           AGE   VERSION   INTERNAL-IP",
        "master-dt-1   Ready    control-plane   70d   v1.30.14  192.168.100.51",
        "master-dt-2   Ready    control-plane   70d   v1.30.14  192.168.100.52",
        "master-dt-3   Ready    control-plane   70d   v1.30.14  192.168.100.53",
        "worker-dt-1   Ready    <none>          70d   v1.30.14  192.168.100.54",
        "worker-dt-2   Ready    <none>          70d   v1.30.14  192.168.100.55",
        "worker-dt-3   Ready    <none>          70d   v1.30.14  192.168.100.56",
        "VIP Floating: 192.168.100.60:6443 (Keepalived VRRP active)",
      ]);
    } else if (cmd === "ci") {
      setTerminalOutput([
        "# Ringkasan kebijakan pipeline Bamboo di BRI",
        "Total Microservices: 200+ active services",
        "Policy feature/*   : HARDGATE (Unit test + SonarQube SAST/SCA required)",
        "Policy dev         : SOFTGATE (Fast integration test)",
        "Policy prod        : PURE BUILD & PUSH (Immutable digest to Nexus)",
        "Rollout Promotion  : Prod Isolated (1-2 wk pilot) -> IBO Handover -> Prod Existing",
        "Target Production  : Data Center (DC), DRC, and Google Cloud Platform (GCP)",
      ]);
    } else if (cmd === "vault") {
      setTerminalOutput([
        "# Ringkasan Vault HA & workload Zabisa (homelab)",
        "Vault HA               3 replicas (HA enabled)",
        "Sidecar Injection       Active (Vault Agent Sidecar 2/2 containers)",
        "Zabisa Workload         10 microservices, 20 pods running HA",
      ]);
    } else if (cmd === "cv") {
      window.open(profile.resumePdf.href, "_blank");
      setTerminalOutput([
        "# Membuka CV (PDF)",
        "Dita Setya Kurniawan - CV DevOps Engineer",
        "Berhasil dibuka.",
      ]);
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-heading" className="relative scroll-mt-24 py-20 sm:py-28">
      {/* Ambient glow */}
      <div className="absolute top-1/2 right-1/4 w-[700px] h-[500px] bg-purple-900/15 blur-[160px] pointer-events-none rounded-full" />

      <div className="relative z-10 mx-auto max-w-content px-5 sm:px-8 lg:px-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-950/40 px-4 py-1.5 text-xs text-purple-200 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.2)]">
            <Sparkles className="size-3.5 text-cyan-300" />
            <span>Terbuka Untuk Peluang Baru</span>
          </div>
          <h2 id="contact-heading" className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Contact <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Me</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            Diskusikan kebutuhan platform engineering, otomatisasi CI/CD, atau peluang karier DevOps selanjutnya.
          </p>
        </div>

        {/* Dual Cards Grid (Matches 00:41 - 00:47 in reference video) */}
        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          
          {/* Left Card: Get in Touch Form & Socials */}
          <div className="lg:col-span-6 flex flex-col">
            <SpotlightCard
              spotlightColor="rgba(168, 85, 247, 0.28)"
              className="flex-1"
            >
              <div className="p-6 sm:p-8 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">Get In Touch</h3>
                      <p className="text-xs text-slate-400 mt-0.5">Kirim pesan langsung ke inbox email saya</p>
                    </div>
                    <span className="text-xs font-mono text-cyan-400 rounded-full border border-cyan-500/20 bg-cyan-950/40 px-2.5 py-1">
                      Direct Email
                    </span>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSendMessage} className="mt-6 space-y-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-mono text-slate-300 mb-1.5">
                        NAMA ANDA / RECRUITER
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Contoh: Sarah - Tech Recruiter"
                        className="w-full rounded-xl border border-white/10 bg-[#07091e]/80 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-400 transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-mono text-slate-300 mb-1.5">
                        EMAIL PERUSAHAAN / PRIBADI
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="sarah@company.com"
                        className="w-full rounded-xl border border-white/10 bg-[#07091e]/80 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-400 transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-msg" className="block text-xs font-mono text-slate-300 mb-1.5">
                        PESAN ATAU DISKUSI
                      </label>
                      <textarea
                        id="contact-msg"
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Halo Dita, kami tertarik untuk mendiskusikan posisi DevOps Engineer..."
                        required
                        className="w-full rounded-xl border border-white/10 bg-[#07091e]/80 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-400 transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="neon-button-primary w-full py-3.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2 text-white"
                    >
                      <Send className="size-4" />
                      <span>Kirim Pesan Sekarang</span>
                    </button>
                  </form>
                </div>

                {/* Quick Contacts Footer */}
                <div className="mt-8 border-t border-white/10 pt-6">
                  <p className="text-xs font-mono text-slate-400 mb-3">Koneksi Langsung & Media Sosial:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopy(profile.publicEmail ?? "", "email")}
                      className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3 text-left hover:border-purple-500/40 transition-colors"
                    >
                      <BrandIcon brand="gmail" className="size-5 shrink-0 mr-3" />
                      <div className="truncate mr-2 flex-1">
                        <span className="text-[10px] text-slate-400 block font-mono">Email</span>
                        <span className="text-xs text-white truncate block">{profile.publicEmail}</span>
                      </div>
                      {copied === "email" ? <Check className="size-4 text-emerald-400 shrink-0" /> : <Copy className="size-4 text-slate-400 shrink-0" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleCopy(profile.publicPhone ?? "", "phone")}
                      className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3 text-left hover:border-emerald-500/40 transition-colors"
                    >
                      <BrandIcon brand="whatsapp" className="size-5 shrink-0 mr-3" />
                      <div className="truncate mr-2 flex-1">
                        <span className="text-[10px] text-slate-400 block font-mono">WhatsApp</span>
                        <span className="text-xs text-white truncate block">{profile.publicPhone}</span>
                      </div>
                      {copied === "phone" ? <Check className="size-4 text-emerald-400 shrink-0" /> : <Copy className="size-4 text-slate-400 shrink-0" />}
                    </button>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {([
                      { brand: "linkedin", label: "LinkedIn", href: profile.linkedinUrl },
                      { brand: "github", label: "GitHub", href: profile.githubUrl },
                    ] as const satisfies readonly { brand: BrandKey; label: string; href: string }[]).map(({ brand, label, href }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 transition-colors hover:border-white/30"
                      >
                        <BrandIcon brand={brand} className="size-5 shrink-0" />
                        <span className="text-xs text-white">{label}</span>
                        <span className="sr-only">(terbuka di tab baru)</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </div>

          {/* Right Card: Interactive Terminal & Diagnostics */}
          <div className="lg:col-span-6 flex flex-col">
            <SpotlightCard
              spotlightColor="rgba(6, 182, 212, 0.28)"
              className="flex-1"
            >
              <div className="p-6 sm:p-8 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-2">
                      <span className="size-3 rounded-full bg-rose-500/80" />
                      <span className="size-3 rounded-full bg-amber-500/80" />
                      <span className="size-3 rounded-full bg-emerald-500/80" />
                      <span className="ml-2 font-mono text-xs text-purple-300 font-semibold flex items-center gap-1.5">
                        <Terminal className="size-3.5" /> devops-console
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                      ● Snapshot Ready
                    </span>
                  </div>

                  {/* Availability Highlights */}
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                      <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-mono mb-1">
                        <Clock className="size-3 text-cyan-400" /> Respons Cepat
                      </div>
                      <p className="text-xs font-semibold text-white">&lt; 2 Jam Waktu Respons</p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                      <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-mono mb-1">
                        <Globe className="size-3 text-purple-400" /> Preferensi Kerja
                      </div>
                      <p className="text-xs font-semibold text-white">Hybrid / Remote / On-Site</p>
                    </div>
                  </div>

                  <p className="mt-4 text-xs text-slate-300">
                    Klik tombol untuk melihat ringkasan klaster Kubernetes homelab, kebijakan pipeline BRI, status Vault & Zabisa, atau buka CV:
                  </p>

                  {/* Quick Command Action Buttons */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => runCommand("nodes")}
                      className="inline-flex items-center gap-2 rounded-lg border border-cyan-500/30 bg-cyan-950/40 px-3 py-1.5 font-mono text-xs text-cyan-200 hover:border-cyan-400 hover:bg-cyan-900/50 transition-colors"
                    >
                      <BrandIcon brand="kubernetes" className="size-4" /> kubectl get nodes
                    </button>
                    <button
                      type="button"
                      onClick={() => runCommand("ci")}
                      className="inline-flex items-center gap-2 rounded-lg border border-purple-500/30 bg-purple-950/40 px-3 py-1.5 font-mono text-xs text-purple-200 hover:border-purple-400 hover:bg-purple-900/50 transition-colors"
                    >
                      <BrandIcon brand="bamboo" className="size-4" /> kebijakan pipeline
                    </button>
                    <button
                      type="button"
                      onClick={() => runCommand("vault")}
                      className="inline-flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-950/40 px-3 py-1.5 font-mono text-xs text-amber-200 hover:border-amber-400 hover:bg-amber-900/50 transition-colors"
                    >
                      <BrandIcon brand="vault" className="size-4" /> vault & zabisa
                    </button>
                    <button
                      type="button"
                      onClick={() => runCommand("cv")}
                      className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-950/40 px-3 py-1.5 font-mono text-xs text-emerald-200 hover:border-emerald-400 hover:bg-emerald-900/50 transition-colors"
                    >
                      <BrandIcon brand="pdf" className="size-4" /> buka cv
                    </button>
                  </div>

                  {/* Terminal Screen */}
                  <div className="mt-4 relative rounded-2xl border border-white/10 bg-[#050716] p-4 font-mono text-xs leading-relaxed text-slate-300 min-h-[200px] shadow-inner custom-terminal-scroll overflow-x-auto">
                    {terminalOutput.length > 0 && (
                      <button
                        type="button"
                        onClick={handleCopyTerminal}
                        className="absolute top-3 right-3 inline-flex items-center gap-1 rounded border border-white/10 bg-white/10 px-2 py-0.5 text-[10px] text-slate-300 hover:text-white"
                        title="Salin isi terminal"
                      >
                        {copiedTerminal ? <Check className="size-3 text-emerald-400" /> : <Copy className="size-3" />}
                        <span>{copiedTerminal ? "Tersalin" : "Salin"}</span>
                      </button>
                    )}

                    {terminalOutput.length > 0 ? (
                      terminalOutput.map((line, idx) => (
                        <div
                          key={idx}
                          className={
                            line.startsWith("$")
                              ? "text-cyan-400 font-bold"
                              : line.includes("Ready") || line.includes("HARDGATE") || line.includes("true")
                              ? "text-emerald-400"
                              : "text-slate-300"
                          }
                        >
                          {line}
                        </div>
                      ))
                    ) : (
                      <div className="text-slate-500 space-y-1">
                        <p>Klik tombol di atas untuk menampilkan ringkasan...</p>
                        <p># Snapshot klaster bare-metal 6 node (kubectl)</p>
                        <p># Kebijakan branch gating Bamboo di BRI</p>
                        <p># Status HashiCorp Vault HA & Zabisa Super App</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-[11px] text-slate-400 font-mono">
                  <span>Terbuka untuk diskusi posisi DevOps / Platform.</span>
                  <span className="text-cyan-400">Jakarta, ID / UTC+7</span>
                </div>
              </div>
            </SpotlightCard>
          </div>

        </div>

      </div>
    </section>
  );
}
