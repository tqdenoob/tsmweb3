"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import CaseStudyCard from "@/components/common/CaseStudyCard";

const caseStudies = [
  {
    title: "grograce",
    subtitle: "an indoor vertical farm in singapore",
    thumbnails: [
      { image: null, views: "5.1M" },
      { image: null, views: "61K" },
      { image: null, views: "279K" },
    ],
    stats: [
      { type: "growth", labelBefore: "followers", valueBefore: "266", labelAfter: "followers", valueAfter: "42,000", duration: "in first 30 days" },
      { type: "growth", labelBefore: "views", valueBefore: "0", labelAfter: "views", valueAfter: "5.5M", duration: "in first 30 days" },
    ],
  },
  {
    title: "A Hot Hideout",
    subtitle: "a viral f&b campaign in singapore",
    thumbnails: [
      { image: null, views: "2.1M" },
      { image: null, views: "850K" },
      { image: null, views: "210K" },
    ],
    stats: [
      { type: "growth", labelBefore: "followers", valueBefore: "500", labelAfter: "followers", valueAfter: "15,000", duration: "in first 30 days" },
      { type: "growth", labelBefore: "views", valueBefore: "0", labelAfter: "views", valueAfter: "3.2M", duration: "in first 30 days" },
    ],
  },
  {
    title: "Brand Story",
    subtitle: "building authentic brand presence",
    thumbnails: [
      { image: null, views: "1.2M" },
      { image: null, views: "430K" },
      { image: null, views: "95K" },
    ],
    stats: [
      { type: "growth", labelBefore: "followers", valueBefore: "1,200", labelAfter: "followers", valueAfter: "28,000", duration: "in first 30 days" },
      { type: "growth", labelBefore: "views", valueBefore: "0", labelAfter: "views", valueAfter: "1.8M", duration: "in first 30 days" },
    ],
  },
];

const TOTAL = caseStudies.length;
const AUTOPLAY_MS = 5000;

export default function CaseStudyCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const variants = prefersReducedMotion
    ? { enter: {}, center: {}, exit: {} }
    : {
        enter: (direction) => ({ opacity: 0, x: direction > 0 ? 80 : -80 }),
        center: { opacity: 1, x: 0 },
        exit: (direction) => ({ opacity: 0, x: direction > 0 ? -80 : 80 }),
      };

  const [direction, setDirection] = useState(1);

  /* ── Auto-play ── */
  const startAutoPlay = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % TOTAL);
    }, AUTOPLAY_MS);
  }, []);

  const stopAutoPlay = useCallback(() => {
    clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    startAutoPlay();
    return () => clearInterval(intervalRef.current);
  }, [startAutoPlay]);

  /* ── Navigation ── */
  const goTo = useCallback(
    (dir) => {
      setDirection(dir);
      setCurrentIndex((prev) => (prev + dir + TOTAL) % TOTAL);
      startAutoPlay();
    },
    [startAutoPlay]
  );

  return (
    <section
      id="case-studies"
      className="py-16 md:py-24 overflow-hidden relative"
      role="region"
      aria-roledescription="carousel"
      aria-label="Case studies"
    >
      {/* Heading */}
      <div className="relative max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
        <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-normal leading-tight mb-12">
          Hear from what{" "}
          <span className="font-bold text-glow">others</span> have to say
        </h2>
      </div>

      {/* Carousel area */}
      <div
        className="relative max-w-6xl mx-auto"
        onMouseEnter={stopAutoPlay}
        onMouseLeave={startAutoPlay}
        onFocus={stopAutoPlay}
        onBlur={startAutoPlay}
      >
        {/* Left arrow */}
        <button
          onClick={() => goTo(-1)}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          aria-label="Previous slide"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M12 4L6 10L12 16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Slides */}
        <div className="min-h-[520px] sm:min-h-[580px] md:min-h-[640px] flex items-center justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-full"
            >
              <CaseStudyCard {...caseStudies[currentIndex]} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right arrow */}
        <button
          onClick={() => goTo(1)}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          aria-label="Next slide"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M8 4L14 10L8 16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {caseStudies.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > currentIndex ? 1 : -1);
              setCurrentIndex(i);
              startAutoPlay();
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === currentIndex ? "bg-white w-6" : "bg-white/30 w-2"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
