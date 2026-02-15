"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function StepCard({
  number,
  title,
  description,
  variant = "default",
}) {
  const borderClass =
    variant === "blue" ? "border-[#3B82F6]" : "border-white/10";
  const glowColor =
    variant === "blue"
      ? "rgba(59, 130, 246, 0.20)"
      : "rgba(255, 255, 255, 0.12)";
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="relative w-full max-w-[320px]"
      whileHover="hover"
      initial="rest"
    >
      {/* Glow element behind the card */}
      <motion.div
        className="absolute -inset-4 rounded-2xl -z-10 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
        }}
        variants={
          prefersReducedMotion
            ? {}
            : {
                rest: { opacity: 0 },
                hover: { opacity: 1 },
              }
        }
        transition={{ duration: 0.3 }}
      />

      {/* Card body */}
      <motion.div
        className={`bg-[#141414] border ${borderClass} rounded-xl p-6`}
        variants={
          prefersReducedMotion
            ? {}
            : {
                rest: { scale: 1 },
                hover: { scale: 1.03 },
              }
        }
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-base font-bold text-white mb-3">
          Step {number}: {title}
        </h3>
        <p className="text-sm text-white/60 leading-relaxed">{description}</p>
      </motion.div>
    </motion.div>
  );
}
