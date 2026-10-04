"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import Image from "next/image";
import { animate, motion, useInView, useMotionValue, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { profile } from "@/content/profile";
import { BrandIcon, brands, type BrandKey } from "@/components/icons/BrandIcon";

/** Sudut ayun maksimum (derajat) saat kartu ditarik. */
const MAX_ANGLE = 30;
/** Posisi awal kartu sebelum jatuh menggantung (px, di atas bingkai). */
const DROP_FROM = -480;
/** Gerakan di bawah ini dianggap klik, bukan tarikan (px). */
const TAP_SLOP = 6;

const environments = ["Dev", "QA", "Pentest", "UAT", "Preprod", "Prod"] as const;
const stack: readonly BrandKey[] = ["git", "vscode", "bamboo", "helm", "openshift", "docker", "kubernetes", "vault", "argocd", "jenkins"];
const contacts: readonly Readonly<{ brand: BrandKey; label: string; href: string }>[] = [
  { brand: "linkedin", label: "LinkedIn", href: profile.linkedinUrl },
  { brand: "github", label: "GitHub", href: profile.githubUrl },
  { brand: "gmail", label: "Email", href: `mailto:${profile.publicEmail}` },
  { brand: "whatsapp", label: "WhatsApp", href: "https://wa.me/6285194513004" },
];

const clamp = (value: number, limit: number) => Math.max(-limit, Math.min(limit, value));

export function InteractiveIdCard() {
  const reduceMotion = useReducedMotion();
  const anchorRef = useRef<HTMLDivElement>(null);
  const inView = useInView(anchorRef, { once: true, amount: 0.35 });

  const rotate = useMotionValue(0);
  const y = useMotionValue(DROP_FROM);
  const swing = useRef<ReturnType<typeof animate> | null>(null);
  const drag = useRef({ active: false, moved: false, startX: 0, startY: 0, grabOffset: 0, lastAngle: 0, lastTime: 0, velocity: 0 });

  const [flipped, setFlipped] = useState(false);
  const [dragging, setDragging] = useState(false);

  const stopSwing = useCallback(() => {
    swing.current?.stop();
    swing.current = null;
  }, []);

  /** Ayunan pelan saat diam, seperti kartu tertiup udara. */
  const idle = useCallback(() => {
    if (reduceMotion) return;
    swing.current = animate(rotate, [0, 2.4, 0, -2.4, 0], { duration: 8, ease: "easeInOut", repeat: Infinity });
  }, [reduceMotion, rotate]);

  /** Bandul teredam: kartu berayun bolak-balik lalu diam di posisi tergantung lurus. */
  const settle = useCallback(
    (velocity = 0) => {
      stopSwing();
      if (reduceMotion) {
        rotate.set(0);
        return;
      }
      swing.current = animate(rotate, 0, {
        type: "spring",
        stiffness: 38,
        damping: 3.2,
        mass: 1,
        velocity,
        restDelta: 0.05,
        restSpeed: 0.5,
        onComplete: idle,
      });
    },
    [idle, reduceMotion, rotate, stopSwing],
  );

  // Kartu jatuh dari atas lalu berayun saat area ini masuk layar.
  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      y.set(0);
      return;
    }
    rotate.set(9);
    const drop = animate(y, 0, { type: "spring", stiffness: 70, damping: 12, mass: 1.1 });
    const timer = window.setTimeout(() => settle(0), 350);
    return () => {
      drop.stop();
      window.clearTimeout(timer);
    };
  }, [inView, reduceMotion, rotate, settle, y]);

  useEffect(() => stopSwing, [stopSwing]);

  /** Sudut tali dari titik gantung ke posisi pointer; titik gantung = tepi atas area kartu. */
  const pointerAngle = (clientX: number, clientY: number) => {
    const rect = anchorRef.current?.getBoundingClientRect();
    if (!rect) return 0;
    const dx = clientX - (rect.left + rect.width / 2);
    const dy = clientY - rect.top;
    if (dy <= 8) return dx >= 0 ? -MAX_ANGLE : MAX_ANGLE;
    return -(Math.atan2(dx, dy) * 180) / Math.PI;
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    if ((event.target as HTMLElement).closest("a, button")) return;
    stopSwing();
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = {
      active: true,
      moved: false,
      startX: event.clientX,
      startY: event.clientY,
      grabOffset: pointerAngle(event.clientX, event.clientY) - rotate.get(),
      lastAngle: rotate.get(),
      lastTime: performance.now(),
      velocity: 0,
    };
    setDragging(true);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const state = drag.current;
    if (!state.active) return;
    if (!state.moved && Math.hypot(event.clientX - state.startX, event.clientY - state.startY) > TAP_SLOP) state.moved = true;
    if (!state.moved) return;

    const next = clamp(pointerAngle(event.clientX, event.clientY) - state.grabOffset, MAX_ANGLE);
    const now = performance.now();
    const dt = now - state.lastTime;
    if (dt > 0) state.velocity = state.velocity * 0.8 + ((next - state.lastAngle) / dt) * 1000 * 0.2;
    state.lastAngle = next;
    state.lastTime = now;
    rotate.set(next);
  };

  const release = (event: ReactPointerEvent<HTMLDivElement>, cancelled: boolean) => {
    const state = drag.current;
    if (!state.active) return;
    state.active = false;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);

    if (!state.moved && !cancelled) {
      setFlipped((value) => !value);
      settle(0);
      return;
    }
    settle(state.velocity);
  };

  return (
    <div className="flex w-full flex-col items-center">
      <div
        ref={anchorRef}
        className="relative h-[650px] w-full max-w-[360px]"
        // Hanya sisi atas yang dipotong: tali tampak tersambung ke atas bingkai, kartu bebas berayun ke samping.
        style={{ clipPath: "inset(0px -100vw -120px -100vw)" }}
      >
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-80 w-72 -translate-x-1/2 rounded-full bg-gradient-to-tr from-purple-600/30 via-indigo-600/20 to-cyan-500/25 blur-3xl" />

        {/* Paku/pengait tempat lanyard digantung */}
        <div aria-hidden="true" className="absolute left-1/2 top-0 z-30 h-2.5 w-12 -translate-x-1/2 rounded-b-lg bg-gradient-to-b from-zinc-300 to-zinc-600 shadow-[0_2px_8px_rgba(0,0,0,0.6)]" />

        <div className="absolute inset-x-0 top-0 flex justify-center">
          <motion.div
            style={{ rotate, y, transformOrigin: "50% 0%", touchAction: "pan-y" }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={(event) => release(event, false)}
            onPointerCancel={(event) => release(event, true)}
            className={`relative flex select-none flex-col items-center ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
          >
            {/* Lanyard berbentuk V yang menyatu di klip */}
            <div aria-hidden="true" className="relative h-[150px] w-[120px]">
              {([-7, 7] as const).map((angle) => (
                <div
                  key={angle}
                  className="absolute bottom-0 left-1/2 h-[172px] w-[24px] origin-bottom overflow-hidden border-x border-white/15 bg-gradient-to-b from-[#1b1f5e] via-[#2a2285] to-[#3a1d8f] shadow-[0_0_14px_rgba(99,102,241,0.35)]"
                  style={{ transform: `translateX(-50%) rotate(${angle}deg)` }}
                >
                  <span className="block whitespace-nowrap font-mono text-[9px] font-bold uppercase leading-[24px] tracking-[0.18em] text-white/60 [writing-mode:vertical-rl]">
                    DITA SETYA K. · DEVOPS ENGINEER · BRI · DITA SETYA K. · DEVOPS ENGINEER · BRI ·
                  </span>
                </div>
              ))}
            </div>

            {/* Klip logam + cincin penghubung ke lubang kartu */}
            <div aria-hidden="true" className="relative z-10 -mt-1 flex flex-col items-center">
              <div className="h-6 w-10 rounded-md border border-zinc-400 bg-gradient-to-b from-zinc-100 via-zinc-300 to-zinc-500 shadow-[0_3px_8px_rgba(0,0,0,0.55)]">
                <div className="mx-auto mt-2 h-1.5 w-5 rounded-full bg-zinc-700/70" />
              </div>
              <div className="-mt-1 h-7 w-4 rounded-full border-[3px] border-zinc-300 bg-transparent shadow-[0_2px_6px_rgba(0,0,0,0.5)]" />
            </div>

            {/* Kartu: sisi depan & belakang (klik untuk buka/tutup) */}
            <div className="relative -mt-4 h-[470px] w-[288px]" style={{ perspective: 1100 }}>
              <motion.div
                className="absolute inset-0"
                style={{ transformStyle: "preserve-3d" }}
                animate={{ rotateY: flipped ? 180 : 0 }}
                transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 110, damping: 15 }}
              >
                {/* DEPAN */}
                <div
                  className="absolute inset-0 overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-b from-[#12163a] to-[#080b22] p-4 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)]"
                  style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
                  aria-hidden={flipped}
                >
                  <div className="mx-auto mb-3 h-2.5 w-14 rounded-full border border-white/20 bg-[#030014] shadow-inner" />

                  <div className="flex items-center gap-2 border-b border-white/10 pb-2.5">
                    <div className="grid size-7 place-items-center rounded-md bg-gradient-to-tr from-purple-600 to-cyan-500 font-mono text-[10px] font-bold text-white">DK</div>
                    <div>
                      <span className="block font-mono text-[11px] font-bold tracking-wider text-white">BRI · ENTERPRISE</span>
                      <span className="block font-mono text-[9px] text-cyan-300">DEVOPS ID CARD</span>
                    </div>
                  </div>

                  <div className="relative mt-3 h-[262px] w-full overflow-hidden rounded-2xl border border-white/15 bg-[#0d0f28]">
                    <Image
                      src="/profile/dita-headroom.png"
                      alt={`Foto ${profile.name}`}
                      fill
                      sizes="260px"
                      draggable={false}
                      className="pointer-events-none object-cover object-top"
                      priority
                    />
                    <div className="absolute left-2.5 top-2.5 h-6 w-8 rounded border border-amber-300/40 bg-gradient-to-br from-amber-200/90 via-amber-400/80 to-amber-600/90 p-0.5">
                      <div className="grid h-full w-full grid-cols-2 gap-0.5 border border-amber-900/30 opacity-80">
                        <div className="border-b border-r border-amber-900/40" />
                        <div className="border-b border-amber-900/40" />
                        <div className="border-r border-amber-900/40" />
                        <div />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-950/80 px-2.5 py-0.5 font-mono text-[9px] font-semibold text-emerald-300 backdrop-blur-sm">
                      <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
                      AKTIF · BRI
                    </div>
                  </div>

                  <div className="mt-3 text-center">
                    <h4 className="text-lg font-bold tracking-tight text-white">{profile.name}</h4>
                    <p className="mt-0.5 font-mono text-[11px] font-semibold tracking-wide text-purple-300">DEVOPS &amp; PLATFORM ENGINEER</p>
                  </div>

                  <div className="mt-2.5 flex items-center justify-between border-t border-white/10 pt-2">
                    <span className="font-mono text-[10px] text-slate-400">Klik kartu untuk membuka →</span>
                    <div className="flex h-5 items-center gap-0.5 opacity-80">
                      {[1, 0.5, 1.5, 0.5, 2, 0.5, 1, 1.5, 0.5, 1].map((w, i) => (
                        <div key={i} className="h-full bg-white" style={{ width: `${w * 2}px` }} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* BELAKANG */}
                <div
                  className="absolute inset-0 overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-b from-[#14183f] to-[#080b22] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)]"
                  style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                  aria-hidden={!flipped}
                >
                  <div className="mx-auto mt-3 h-2.5 w-14 rounded-full border border-white/20 bg-[#030014] shadow-inner" />
                  <div className="mt-3 h-9 bg-black/80" />

                  <div className="px-4 pt-3">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-300">Ringkasan</p>
                    <p className="mt-1 text-[13px] font-bold leading-tight text-white">200+ microservices di BRI &amp; klaster K8s HA dari 0</p>

                    <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.18em] text-slate-400">Alur environment</p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {environments.map((env, index) => (
                        <span key={env} className="rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[9px] text-slate-200">
                          {index + 1}. {env}
                        </span>
                      ))}
                    </div>

                    <div className="mt-3 flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5">
                      <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-400">Produksi</span>
                      <span className="flex items-center gap-1.5 font-mono text-[10px] text-slate-100">
                        <BrandIcon brand="gcp" className="size-3.5" /> DC · DRC · GCP
                      </span>
                    </div>

                    <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.18em] text-slate-400">Stack utama</p>
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {stack.map((key) => (
                        <span key={key} title={brands[key].label} className="grid size-8 place-items-center rounded-lg border border-white/10 bg-[#07091e]/80">
                          <BrandIcon brand={key} className="size-[18px]" />
                        </span>
                      ))}
                    </div>

                    <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.18em] text-slate-400">Kontak</p>
                    <div className="mt-1 flex gap-1.5">
                      {contacts.map(({ brand, label, href }) => (
                        <a
                          key={label}
                          href={href}
                          target={href.startsWith("http") ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          aria-label={label}
                          title={label}
                          tabIndex={flipped ? 0 : -1}
                          className="grid size-9 place-items-center rounded-lg border border-white/10 bg-[#07091e]/80 transition-colors hover:border-white/40"
                        >
                          <BrandIcon brand={brand} className="size-[18px]" />
                        </a>
                      ))}
                    </div>
                  </div>

                  <p className="absolute inset-x-0 bottom-3 text-center font-mono text-[10px] text-slate-400">← Klik kartu untuk menutup</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="mt-2 flex flex-col items-center gap-2">
        <button
          type="button"
          aria-pressed={flipped}
          onClick={() => {
            setFlipped((value) => !value);
            settle(0);
          }}
          className="neon-button-secondary inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-[11px] text-slate-100"
        >
          <Sparkles className="size-3.5 text-cyan-300" />
          {flipped ? "Tutup ID card" : "Buka ID card"}
        </button>
        <p className="text-center font-mono text-[11px] text-purple-300/80">Tarik kartu untuk mengayun · klik kartu untuk buka / tutup</p>
      </div>
    </div>
  );
}
