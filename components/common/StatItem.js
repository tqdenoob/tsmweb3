"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

function parseStatValue(value) {
  const match = value.match(/^(\d+)(.*)/);
  return {
    number: parseInt(match[1], 10),
    suffix: match[2],
  };
}

export default function StatItem({ value, label, index = 0 }) {
  const { number, suffix } = parseStatValue(value);
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;

    const delay = prefersReducedMotion ? 0 : index * 200;
    const duration = prefersReducedMotion ? 0 : 2;

    let controls;
    const timeoutId = setTimeout(() => {
      controls = animate(0, number, {
        duration,
        ease: "easeOut",
        onUpdate: (v) => setDisplayValue(Math.floor(v)),
      });
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      controls?.stop();
    };
  }, [isInView, number, index, prefersReducedMotion]);

  return (
    <div ref={ref}>
      <p className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
        {displayValue}
        {suffix}
      </p>
      <p className="text-sm text-white/50 mt-1">{label}</p>
    </div>
  );
}
