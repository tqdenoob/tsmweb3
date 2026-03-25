"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import CaseStudyCard from "@/components/common/CaseStudyCard";

const caseStudies = [
  {
    title: "Beans&Beats",
    subtitle: "How we turned a new events brand into Gen-Z's go-to for DJ nights and specialty coffee",
    thumbnails: [
      { image: "/images/casestudies/bnb1.jpg", views: "724K" },
      { image: "/images/casestudies/bnb2.jpg", views: "424K" },
      { image: "/images/casestudies/bnb3.jpg", views: "721K" },
    ],
    stats: [
      { type: "growth", labelBefore: "followers", valueBefore: "143", labelAfter: "followers", valueAfter: "3159", duration: "in first 90 days" },
      { type: "growth", labelBefore: "engagement", valueBefore: "51", labelAfter: "engagement", valueAfter: "18,624", duration: "in first 90 days" },
    ],
  },
  {
    title: "A Hot Hideout",
    subtitle: "A mala chain that went viral with Gen-Z through organic content — no paid ads needed",
    thumbnails: [
      { image: "/images/casestudies/ahothideout1.jpg", views: "559K" },
      { image: "/images/casestudies/ahothideout2.jpg", views: "393K" },
      { image: "/images/casestudies/ahothideout3.jpg", views: "460K" },
    ],
    stats: [
      { type: "growth", labelBefore: "engagement", valueBefore: "655", labelAfter: "engagement", valueAfter: "18,264", duration: "in 2 months" },
      { type: "growth", labelBefore: "views", valueBefore: "24k", labelAfter: "views", valueAfter: "412k", duration: "in 2 months" },
    ],
  },
  {
    title: "Genki Sushi",
    subtitle: "How we put a major sushi chain on Gen-Z's radar and drove them through the door",
    thumbnails: [
      { image: "/images/casestudies/genki1.jpg", views: "109K" },
      { image: "/images/casestudies/genki2.jpg", views: "110K" },
      { image: "/images/casestudies/genki3.jpg", views: "136K" },
    ],
    stats: [
      { type: "growth", labelBefore: "engagement rate", valueBefore: "0.075%", labelAfter: "engagement rate", valueAfter: "4.39%", duration: "in first 30 days" },
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
        <h2 className="text-center text-4xl md:text-5xl lg:text-6xl font-normal leading-tight mb-12">
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
