"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import StepCard from "@/components/common/StepCard";

function AnimatedStep({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function Process() {
  return (
    /* NOTE: Section boundaries must remain seamless — no margin between sections, use padding only */
    <section className="relative px-8 md:px-16 lg:px-24 py-20 md:py-32">
      {/* Figma: "Borealis" + "BG gradient 2" — uses only approved palette: sky-800, blue-700, fuchsia-500, cyan-400 */}
      <div className="absolute inset-0 pointer-events-none -z-10" aria-hidden="true">
        <div className="absolute left-[-5%] top-[30%] w-[45%] h-[50%] rounded-full bg-sky-800 opacity-20 blur-[150px]" />
        <div className="absolute left-[15%] top-[35%] w-[35%] h-[45%] rounded-full bg-blue-700 opacity-20 blur-[180px]" />
        <div className="absolute left-[40%] top-[25%] w-[35%] h-[50%] rounded-full bg-sky-800 opacity-18 blur-[150px]" />
        <div className="absolute left-[60%] top-[30%] w-[25%] h-[35%] rounded-full bg-cyan-400 opacity-12 blur-[120px]" />
      </div>
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal leading-tight">
            Marketing campaigns that
            <br />
            <span className="italic font-bold text-glow">actually work</span>
          </h2>
          <p className="mt-6 text-sm md:text-base text-white/50 max-w-2xl mx-auto leading-relaxed">
            We got sick of dinosaur-aged companies using outdated marketing
            strategies from their textbooks, so we created our own process to
            share real stories that resonate with the new generation.
          </p>
        </div>

        {/* Staircase steps */}
        <div className="flex flex-col gap-8 max-w-3xl mx-auto">
          {/* Step 1 - left */}
          <AnimatedStep delay={0} className="self-center lg:self-start">
            <StepCard
              number={1}
              title="Ideation"
              description="We meet up with you to discuss your campaign goals, and ideate and script content."
            />
          </AnimatedStep>

          {/* Step 2 - center */}
          <AnimatedStep delay={0.15} className="self-center">
            <StepCard
              number={2}
              title="Production"
              description="We meet your team to produce personalised videos that grab people&#39;s attention."
            />
          </AnimatedStep>

          {/* Step 3 - right */}
          <AnimatedStep delay={0.3} className="self-center lg:self-end">
            <StepCard
              number={3}
              title="Optimisation"
              description="We analyse our campaigns and identify areas of improvement to increase long-term engagement."
            />
          </AnimatedStep>
        </div>
      </div>
    </section>
  );
}
