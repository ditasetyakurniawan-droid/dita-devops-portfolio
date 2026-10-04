"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  BAND_HEIGHT, BAND_OVERLAP, BAND_STEP, SPOTLIGHT_SIZE,
  getBandCount, getSpotlightPlacement,
} from "./atmosphere-geometry";

/** Overlapping, bounded scenes keep the same visual language at every depth. */
function AtmosphereBand({ index, enabled }: { index: number; enabled: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const active = enabled && inView;
  const alternate = index % 2 === 1;

  return (
    <div
      ref={ref}
      className="ambient-atmosphere__band"
      data-alternate={alternate ? "true" : undefined}
      style={{ top: index * BAND_STEP - BAND_OVERLAP, height: BAND_HEIGHT }}
    >
      <motion.div
        className="ambient-atmosphere__aura"
        initial={false}
        style={{ willChange: active ? "transform" : "auto" }}
        animate={active ? { x: [0, alternate ? -76 : 76, -28, 0], y: [0, -34, 22, 0], scale: [1, 1.08, 0.98, 1] } : { x: 0, y: 0, scale: 1 }}
        transition={active ? { duration: alternate ? 18 : 16, repeat: Infinity, ease: "easeInOut" } : { duration: 0 }}
      />
      <div className="ambient-atmosphere__rings" />
      <motion.div
        className="ambient-atmosphere__ring-sweep"
        initial={false}
        style={{ willChange: active ? "transform" : "auto" }}
        animate={active ? { rotate: alternate ? -360 : 360 } : { rotate: 0 }}
        transition={active ? { duration: alternate ? 26 : 23, repeat: Infinity, ease: "linear" } : { duration: 0 }}
      />
      <motion.div
        className="ambient-atmosphere__trace"
        initial={false}
        style={{ willChange: active ? "transform, opacity" : "auto" }}
        animate={active ? { y: [0, 460], opacity: [0, 0.78, 0.78, 0] } : { y: 0, opacity: 0 }}
        transition={active ? { duration: 6.5, delay: alternate ? 1.3 : 0, repeat: Infinity, repeatDelay: 0.8, ease: "easeInOut" } : { duration: 0 }}
      />
    </div>
  );
}

/** One continuous decorative surface from hero through the final expertise card. */
export function AmbientAtmosphere() {
  const rootRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef);
  const reduceMotion = useReducedMotion();
  const [bandCount, setBandCount] = useState(1);
  const [pageVisible, setPageVisible] = useState(true);
  const enabled = inView && pageVisible && !reduceMotion;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const measure = () => setBandCount(getBandCount(root.getBoundingClientRect().height));
    const visibility = () => setPageVisible(!document.hidden);
    measure();
    visibility();

    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;
    observer?.observe(root);
    window.addEventListener("resize", measure, { passive: true });
    document.addEventListener("visibilitychange", visibility);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", measure);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const spotlight = spotlightRef.current;
    const host = root?.parentElement;
    if (!root || !spotlight || !host || !enabled) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const gridSize = Number.parseFloat(getComputedStyle(root).getPropertyValue("--ambient-grid-size")) || 76;
    let frame = 0;
    let active = false;
    let clientX = 0;
    let clientY = 0;

    const hide = () => {
      active = false;
      window.cancelAnimationFrame(frame);
      frame = 0;
      spotlight.style.opacity = "0";
    };

    const place = () => {
      frame = 0;
      if (!active) return;
      const placement = getSpotlightPlacement(
        root.getBoundingClientRect(), { x: clientX, y: clientY }, SPOTLIGHT_SIZE, gridSize,
      );
      if (!placement) { hide(); return; }
      spotlight.style.transform = "translate3d(" + placement.x + "px," + placement.y + "px,0)";
      // Keep the revealed grid registered to the static grid as the halo moves.
      spotlight.style.setProperty("--spot-grid-x", placement.gridX + "px");
      spotlight.style.setProperty("--spot-grid-y", placement.gridY + "px");
      spotlight.style.opacity = "1";
    };

    const schedule = () => {
      if (active && !frame) frame = window.requestAnimationFrame(place);
    };
    const move = (event: PointerEvent) => {
      if (!finePointer.matches || event.pointerType === "touch") { hide(); return; }
      clientX = event.clientX;
      clientY = event.clientY;
      active = true;
      schedule();
    };

    host.addEventListener("pointerenter", move, { passive: true });
    host.addEventListener("pointermove", move, { passive: true });
    host.addEventListener("pointerleave", hide);
    host.addEventListener("pointercancel", hide);
    window.addEventListener("scroll", schedule, { passive: true, capture: true });
    window.addEventListener("resize", schedule, { passive: true });
    window.addEventListener("blur", hide);
    finePointer.addEventListener("change", hide);
    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(schedule) : null;
    observer?.observe(root);

    return () => {
      host.removeEventListener("pointerenter", move);
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", hide);
      host.removeEventListener("pointercancel", hide);
      window.removeEventListener("scroll", schedule, true);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("blur", hide);
      finePointer.removeEventListener("change", hide);
      observer?.disconnect();
      hide();
    };
  }, [enabled]);

  return (
    <div ref={rootRef} aria-hidden="true" className="ambient-atmosphere pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {Array.from({ length: bandCount }, (_, index) => (
        <AtmosphereBand key={index} index={index} enabled={enabled} />
      ))}
      <div className="ambient-atmosphere__veil" />
      <div className="ambient-atmosphere__grid" />
      <div className="ambient-atmosphere__routes" />
      <div className="ambient-atmosphere__rail" />
      <div className="ambient-atmosphere__grain" />
      <div className="ambient-atmosphere__fade" />
      <div ref={spotlightRef} className="ambient-atmosphere__spotlight" style={{ width: SPOTLIGHT_SIZE, height: SPOTLIGHT_SIZE }} />
    </div>
  );
}
