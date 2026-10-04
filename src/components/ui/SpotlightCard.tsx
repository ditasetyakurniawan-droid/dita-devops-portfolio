"use client";

import React, { useRef, useState, useCallback } from "react";
import { useReducedMotion } from "framer-motion";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}

export function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(168, 85, 247, 0.35)",
  ...props
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const reduceMotion = useReducedMotion();

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || reduceMotion) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, [reduceMotion]);

  const handleFocus = useCallback(() => {
    if (reduceMotion) return;
    setOpacity(0.8);
  }, [reduceMotion]);

  const handleBlur = useCallback(() => {
    if (reduceMotion) return;
    setOpacity(0);
  }, [reduceMotion]);

  const handleMouseEnter = useCallback(() => {
    if (reduceMotion) return;
    setOpacity(1);
  }, [reduceMotion]);

  const handleMouseLeave = useCallback(() => {
    if (reduceMotion) return;
    setOpacity(0);
  }, [reduceMotion]);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-3xl border border-white/10 bg-[#090c24]/80 p-1 transition-all duration-300 ${className}`}
      {...props}
    >
      {/* Dynamic Cursor Spotlight Ray */}
      {!reduceMotion && (
        <div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300"
          style={{
            opacity,
            background: `radial-gradient(550px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 65%)`,
          }}
          aria-hidden="true"
        />
      )}

      {/* Inner Container */}
      <div className="relative z-10 size-full rounded-[23px] bg-[#070a20]/90 backdrop-blur-2xl">
        {children}
      </div>
    </div>
  );
}
