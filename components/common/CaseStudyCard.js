"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function CaseStudyCard({
  title,
  tag,
  description,
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="rounded-2xl overflow-hidden flex-shrink-0 w-[260px] sm:w-[320px] md:w-[420px] lg:w-[520px] h-[200px] sm:h-[250px] md:h-[320px] lg:h-[380px]"
      whileHover="hover"
      initial="rest"
    >
      {/* TODO: Replace with actual case study image using next/image */}
      <div className="w-full h-full bg-[#c8c8c8] relative overflow-hidden rounded-2xl">
        {/* Subtle bottom gradient for title legibility */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent pointer-events-none z-[1]" />

        {/* Default title — visible at rest, hides on hover */}
        {title && (
          <motion.p
            className="absolute bottom-4 left-5 text-white text-base font-medium z-10"
            variants={{
              rest: { opacity: 1 },
              hover: { opacity: 0 },
            }}
            transition={{ duration: 0.2 }}
          >
            {title}
          </motion.p>
        )}

        {/* Hover reveal overlay — slides up from bottom */}
        <motion.div
          className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-5 flex flex-col justify-end pointer-events-none z-20"
          variants={
            prefersReducedMotion
              ? {
                  rest: { opacity: 0 },
                  hover: { opacity: 1 },
                }
              : {
                  rest: { y: "100%", opacity: 0 },
                  hover: { y: 0, opacity: 1 },
                }
          }
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {tag && (
            <span className="text-xs text-white/50 uppercase tracking-wider mb-1">
              {tag}
            </span>
          )}
          {title && (
            <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
          )}
          {description && (
            <p className="text-sm text-white/60 mb-3 leading-relaxed">
              {description}
            </p>
          )}
          <span className="text-sm text-[#3B82F6] font-medium pointer-events-auto">
            Read more &rarr;
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
