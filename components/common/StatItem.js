"use client";

import { useEffect, useRef, useCallback } from "react";
import { animate, useInView, useMotionValue, useReducedMotion } from "framer-motion";

function parseStatValue(value) {
  const match = value.match(/^(\d+)(.*)/);
  return {
    number: parseInt(match[1], 10),
    suffix: match[2] || "",
  };
}

function formatNumber(n, suffix) {
  if (suffix) return Math.floor(n) + suffix;
  return Math.floor(n).toLocaleString();
}

export default function StatItem({ value, label, index = 0, live = false, incrementPerSecond = 0 }) {
  const { number, suffix } = parseStatValue(value);
  const count = useMotionValue(0);
  const ref = useRef(null);
  const numberRef = useRef(null);
  const currentValue = useRef(number);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const updateDisplay = useCallback((n) => {
    if (numberRef.current) {
      numberRef.current.textContent = formatNumber(n, suffix);
    }
  }, [suffix]);

  useEffect(() => {
    const unsubscribe = count.on("change", (latest) => {
      updateDisplay(latest);
    });
    return unsubscribe;
  }, [count, updateDisplay]);

  useEffect(() => {
    if (!isInView) return;

    const delay = prefersReducedMotion ? 0 : index * 200;
    const duration = prefersReducedMotion ? 0 : 2;

    let controls;
    const timeoutId = setTimeout(() => {
      controls = animate(count, number, {
        duration,
        ease: "easeOut",
        onComplete: () => {
          currentValue.current = number;
        },
      });
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      controls?.stop();
    };
  }, [isInView, number, index, prefersReducedMotion, count]);

  // Live continuous incrementing after initial animation
  useEffect(() => {
    if (!live || !isInView || !incrementPerSecond) return;

    const startDelay = (prefersReducedMotion ? 0 : 2000) + index * 200;
    let intervalId;

    const delayId = setTimeout(() => {
      const intervalMs = 50;
      const baseIncrement = incrementPerSecond * (intervalMs / 1000);

      intervalId = setInterval(() => {
        // Randomize slightly for organic feel (±30%)
        const jitter = 0.7 + Math.random() * 0.6;
        currentValue.current += baseIncrement * jitter;
        updateDisplay(currentValue.current);
      }, intervalMs);
    }, startDelay);

    return () => {
      clearTimeout(delayId);
      clearInterval(intervalId);
    };
  }, [live, isInView, incrementPerSecond, index, prefersReducedMotion, updateDisplay]);

  return (
    <div ref={ref}>
      <p ref={numberRef} className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
        0{suffix}
      </p>
      <p className="text-sm text-white/50 mt-1">{label}</p>
    </div>
  );
}
