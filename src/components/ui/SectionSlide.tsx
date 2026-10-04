"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface SectionSlideProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

export function SectionSlide({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: SectionSlideProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const getInitialOffsets = () => {
    switch (direction) {
      case "up":
        return { y: 60, x: 0 };
      case "down":
        return { y: -60, x: 0 };
      case "left":
        return { x: 60, y: 0 };
      case "right":
        return { x: -60, y: 0 };
      default:
        return { y: 60, x: 0 };
    }
  };

  const offsets = getInitialOffsets();

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: offsets.y,
        x: offsets.x,
        scale: 0.98,
        filter: "blur(6px)",
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        filter: "blur(0px)",
      }}
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
      transition={{
        duration: 0.85,
        delay,
        ease: [0.16, 1, 0.3, 1], // easeOutExpo
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
