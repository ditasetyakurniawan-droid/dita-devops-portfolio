"use client";

import React, { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  enableTilt?: boolean;
}

export function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(168, 85, 247, 0.35)",
  enableTilt = true,
  ...props
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const reduceMotion = useReducedMotion();

  // 3D Tilt Motion Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 280, damping: 24 });
  const mouseYSpring = useSpring(y, { stiffness: 280, damping: 24 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current || reduceMotion) return;
      const rect = cardRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      setPosition({ x: mouseX, y: mouseY });

      if (enableTilt) {
        const xPct = mouseX / rect.width - 0.5;
        const yPct = mouseY / rect.height - 0.5;
        x.set(xPct);
        y.set(yPct);
      }
    },
    [enableTilt, reduceMotion, x, y]
  );

  const handleFocus = useCallback(() => {
    if (reduceMotion) return;
    setOpacity(0.8);
  }, [reduceMotion]);

  const handleBlur = useCallback(() => {
    if (reduceMotion) return;
    setOpacity(0);
    x.set(0);
    y.set(0);
  }, [reduceMotion, x, y]);

  const handleMouseEnter = useCallback(() => {
    if (reduceMotion) return;
    setOpacity(1);
  }, [reduceMotion]);

  const handleMouseLeave = useCallback(() => {
    if (reduceMotion) return;
    setOpacity(0);
    x.set(0);
    y.set(0);
  }, [reduceMotion, x, y]);

  return (
    <div style={{ perspective: 1000 }} className="size-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={
          reduceMotion || !enableTilt
            ? undefined
            : {
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }
        }
        className={`relative rounded-3xl border border-white/10 bg-[#090c24]/80 p-1 transition-[border-color,box-shadow] duration-300 hover:border-white/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)] ${className}`}
        {...(props as any)}
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
      </motion.div>
    </div>
  );
}
