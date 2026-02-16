"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import {
  motion,
  useMotionValue,
  animate,
  useReducedMotion,
} from "framer-motion";
import CaseStudyCard from "@/components/common/CaseStudyCard";

const caseStudies = [
  {
    title: "A Hot Hideout",
    tag: "F&B",
    description:
      "Viral campaign generating 2M+ views for a local restaurant chain.",
  },
  {
    title: "Brand Story",
    tag: "Lifestyle",
    description:
      "Building authentic brand presence through short-form storytelling.",
  },
  {
    title: "Social Campaign",
    tag: "Tech",
    description:
      "Driving 200k+ engagement through targeted social media content.",
  },
];

const TOTAL = caseStudies.length;
const GAP = 16;
const DRIFT_SPEED = 0.4; // px per frame — continuous auto-scroll

export default function CaseStudyCarousel() {
  const trackRef = useRef(null);
  const x = useMotionValue(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [step, setStep] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  // Auto-scroll state
  const isPaused = useRef(false);
  const rafId = useRef(null);
  const offsetRef = useRef(0);
  const resumeTimer = useRef(null);
  const isSnapping = useRef(false);

  // Three identical sets: set1 = left buffer, set2 = main visible, set3 = right buffer.
  // Needed because center-padding means cards must exist on BOTH sides of viewport.
  const tripled = [...caseStudies, ...caseStudies, ...caseStudies];

  /* ── Measure card width + init offset at middle set ── */
  useEffect(() => {
    const measure = () => {
      const card = trackRef.current?.querySelector("[data-card]");
      if (card) {
        const newStep = card.offsetWidth + GAP;
        setStep(newStep);
        // Start at the beginning of the middle set
        const w = TOTAL * newStep;
        offsetRef.current = -w;
        x.set(-w);
      }
    };
    requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [x]);

  /* ── Track active card index from x position ── */
  useEffect(() => {
    if (!step) return;
    const unsubscribe = x.on("change", (latest) => {
      const idx = Math.round(-latest / step);
      setActiveIndex(((idx % TOTAL) + TOTAL) % TOTAL);
    });
    return unsubscribe;
  }, [x, step]);

  /* ── Normalize offset into middle set range (-2w, -w] ── */
  const normalizeToMiddle = useCallback(
    (val) => {
      if (!step) return val;
      const w = TOTAL * step;
      let n = val % w;
      if (n > 0) n -= w;
      // n is in (-w, 0], shift into middle set range (-2w, -w]
      return n - w;
    },
    [step]
  );

  /* ── Continuous auto-drift via RAF ── */
  useEffect(() => {
    if (!step || prefersReducedMotion) return;
    const w = TOTAL * step;

    const tick = () => {
      if (!isPaused.current && !isSnapping.current) {
        offsetRef.current -= DRIFT_SPEED;
        // Seamless wrap: when scrolled past the end of the middle set,
        // jump back by one set width (visually identical position)
        if (offsetRef.current <= -2 * w) {
          offsetRef.current += w;
        }
        x.set(offsetRef.current);
      }
      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, [x, step, prefersReducedMotion]);

  /* ── Resume auto-scroll after a delay (only used by arrow/dot/drag) ── */
  const scheduleResume = useCallback(
    (delay = 2000) => {
      clearTimeout(resumeTimer.current);
      resumeTimer.current = setTimeout(() => {
        // Wrap offset back into middle set range so it never accumulates
        offsetRef.current = normalizeToMiddle(x.get());
        x.set(offsetRef.current);
        isSnapping.current = false;
        isPaused.current = false;
      }, delay);
    },
    [x, normalizeToMiddle]
  );

  /* ── Card hover: pause on enter, resume on leave ── */
  const handleCardEnter = useCallback(() => {
    isPaused.current = true;
    clearTimeout(resumeTimer.current);
  }, []);

  const handleCardLeave = useCallback(() => {
    // Resume from exactly where we stopped — no normalize, no snap, no adjustment.
    // offsetRef.current still holds the exact position from the last RAF tick.
    isPaused.current = false;
  }, []);

  /* ── Drag handlers ── */
  const handleDragStart = useCallback(() => {
    isPaused.current = true;
    isSnapping.current = false;
    clearTimeout(resumeTimer.current);
  }, []);

  const handleDragEnd = useCallback(
    (_, info) => {
      if (!step) return;
      isSnapping.current = true;

      const current = x.get();
      const velocity = info.velocity.x;
      const projected = current + velocity * 0.35;
      const nearestIndex = Math.round(-projected / step);
      const snapTarget = -(nearestIndex * step);

      animate(x, snapTarget, {
        type: "spring",
        stiffness: 80,
        damping: 40,
        mass: 2,
        velocity,
        restSpeed: 0.3,
        onComplete: () => scheduleResume(2000),
      });
    },
    [x, step, scheduleResume]
  );

  /* ── Arrow navigation ── */
  const goToCard = useCallback(
    (direction) => {
      if (!step) return;
      isPaused.current = true;
      isSnapping.current = true;
      clearTimeout(resumeTimer.current);

      const current = x.get();
      const currentIdx = Math.round(-current / step);
      const snapTarget = -((currentIdx + direction) * step);

      animate(x, snapTarget, {
        type: "spring",
        stiffness: 80,
        damping: 40,
        mass: 2,
        restSpeed: 0.3,
        onComplete: () => scheduleResume(2000),
      });
    },
    [x, step, scheduleResume]
  );

  /* ── Dot navigation ── */
  const scrollToDot = useCallback(
    (dotIndex) => {
      if (!step) return;
      isPaused.current = true;
      isSnapping.current = true;
      clearTimeout(resumeTimer.current);

      // Find shortest path to target dot from current position
      const current = x.get();
      const currentIdx = Math.round(-current / step);
      const currentReal = ((currentIdx % TOTAL) + TOTAL) % TOTAL;
      let diff = dotIndex - currentReal;
      if (diff > TOTAL / 2) diff -= TOTAL;
      if (diff < -TOTAL / 2) diff += TOTAL;

      animate(x, -((currentIdx + diff) * step), {
        type: "spring",
        stiffness: 80,
        damping: 40,
        mass: 2,
        onComplete: () => scheduleResume(2000),
      });
    },
    [x, step, scheduleResume]
  );

  /* ── Cleanup ── */
  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafId.current);
      clearTimeout(resumeTimer.current);
    };
  }, []);

  const cardWidth = step ? step - GAP : 400;
  const sidePadding = `calc(50vw - ${cardWidth / 2}px)`;

  return (
    <section
      id="case-studies"
      className="py-16 md:py-24 overflow-hidden relative"
    >
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 inset-x-0 h-1/3 bg-gradient-to-b from-[#1a3a5c]/20 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[400px] rounded-full bg-purple-500/10 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] rounded-full bg-teal-500/8 blur-[100px]" />
      </div>

      {/* Heading */}
      <div className="relative max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
        <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-normal leading-tight mb-12">
          Hear from what{" "}
          <span className="font-bold text-glow">others</span>
          <br />
          have to say
        </h2>
      </div>

      {/* Carousel with arrows */}
      <div className="relative">
        {/* Left arrow */}
        <button
          onClick={() => goToCard(-1)}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          aria-label="Previous card"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12 4L6 10L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Track — no wheel listeners, no overflow scroll */}
        <div className="select-none">
          <motion.div
            ref={trackRef}
            className="flex cursor-grab active:cursor-grabbing"
            style={{
              x,
              gap: `${GAP}px`,
              paddingLeft: sidePadding,
              paddingRight: sidePadding,
              touchAction: "pan-y",
            }}
            drag={step > 0 ? "x" : false}
            dragElastic={0.03}
            dragMomentum={false}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            {tripled.map((study, i) => (
              <div
                key={i}
                data-card
                className="flex-shrink-0"
                onMouseEnter={handleCardEnter}
                onMouseLeave={handleCardLeave}
              >
                <CaseStudyCard
                  title={study.title}
                  tag={study.tag}
                  description={study.description}
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right arrow */}
        <button
          onClick={() => goToCard(1)}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          aria-label="Next card"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M8 4L14 10L8 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Dot indicators */}
      <div className="relative flex justify-center gap-2 mt-8">
        {caseStudies.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToDot(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === activeIndex
                ? "bg-white w-6"
                : "bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Go to case study ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
