"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
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

export default function CaseStudyCarousel() {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(
      el.scrollLeft < el.scrollWidth - el.clientWidth - 10
    );

    /* Determine which card is closest to center */
    const containerCenter = el.scrollLeft + el.clientWidth / 2;
    const cards = el.querySelectorAll("[data-card]");
    let closestIndex = 0;
    let closestDist = Infinity;

    cards.forEach((card, i) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const dist = Math.abs(containerCenter - cardCenter);
      if (dist < closestDist) {
        closestDist = dist;
        closestIndex = i;
      }
    });

    setActiveIndex(closestIndex);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    updateScrollState();
    return () => el.removeEventListener("scroll", updateScrollState);
  }, [updateScrollState]);

  const scrollTo = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector("[data-card]");
    if (!card) return;
    const scrollAmount = card.offsetWidth + 24; /* gap-6 = 24px */
    el.scrollBy({
      left: direction === "right" ? scrollAmount : -scrollAmount,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  const scrollToIndex = (index) => {
    const el = scrollRef.current;
    if (!el) return;
    const cards = el.querySelectorAll("[data-card]");
    if (!cards[index]) return;
    const card = cards[index];
    const scrollLeft =
      card.offsetLeft - el.clientWidth / 2 + card.offsetWidth / 2;
    el.scrollTo({
      left: scrollLeft,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <section
      id="case-studies"
      className="py-16 md:py-24 bg-gradient-blue-top"
    >
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
        {/* Heading */}
        <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-normal leading-tight mb-12">
          Hear from what{" "}
          <span className="font-bold text-glow">others</span>
          <br />
          have to say
        </h2>
      </div>

      {/* Carousel wrapper */}
      <div className="relative max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
        {/* Left arrow */}
        {canScrollLeft && (
          <button
            onClick={() => scrollTo("left")}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
            aria-label="Previous case study"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
        )}

        {/* Right arrow */}
        {canScrollRight && (
          <button
            onClick={() => scrollTo("right")}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
            aria-label="Next case study"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        )}

        {/* Scroll container */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide pb-4 px-[calc(50%-160px)] md:px-[calc(50%-210px)]"
        >
          {caseStudies.map((study, i) => (
            <div key={i} data-card className="snap-center flex-shrink-0">
              <CaseStudyCard
                title={study.title}
                tag={study.tag}
                description={study.description}
                isFocused={i === activeIndex}
              />
            </div>
          ))}
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {caseStudies.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "bg-white w-6"
                  : "bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to case study ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
