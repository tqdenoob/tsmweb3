"use client";

import { motion, useReducedMotion } from "framer-motion";

const restShadow =
  "0 0 20px rgba(255,255,255,0.06), 0 0 50px rgba(255,255,255,0.04), 0 0 100px rgba(255,255,255,0.02)";
const hoverShadow =
  "0 0 20px rgba(255,255,255,0.09), 0 0 50px rgba(255,255,255,0.06), 0 0 100px rgba(255,255,255,0.03)";

export default function StepCard({ number, title, description }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="relative w-full max-w-[320px]"
      whileHover="hover"
      initial="rest"
    >
      <motion.div
        className="border border-white/10 rounded-xl p-6"
        variants={
          prefersReducedMotion
            ? {}
            : {
                rest: { scale: 1, boxShadow: restShadow },
                hover: { scale: 1.03, boxShadow: hoverShadow },
              }
        }
        style={{
          backgroundColor: "#141414",
          ...(prefersReducedMotion ? { boxShadow: restShadow } : {}),
        }}
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
