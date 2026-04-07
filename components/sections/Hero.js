"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import TikTokCard from "@/components/common/TikTokCard";

const CARDS = [
  {
    title: "2025 Recap",
    image: "/images/thumbnails/recap.jpg",
    href: "https://www.instagram.com/reel/DS7J2qMkqM1/",
    stats: { views: "1.2M", likes: "96.4K", comments: "2.1K", shares: "14.3K", saves: "8.7K" },
  },
  {
    title: "$200 Mala",
    image: "/images/thumbnails/mala.jpg",
    href: "https://www.instagram.com/reel/DLubpm2zecj/",
    stats: { views: "843K", likes: "72.1K", comments: "1.8K", shares: "9.6K", saves: "5.2K" },
  },
  {
    title: "CBD Dating",
    image: "/images/thumbnails/dating.jpg",
    href: "https://www.instagram.com/reel/DLj6CztSgdd/",
    stats: { views: "567K", likes: "48.3K", comments: "3.4K", shares: "7.8K", saves: "4.1K" },
  },
];

const POSITIONS = [
  { x: -90, scale: 0.85, rotate: -8, opacity: 0.6, zIndex: 0 },   // back-left
  { x: 0, scale: 1, rotate: 0, opacity: 1, zIndex: 20 },           // front-center
  { x: 90, scale: 0.85, rotate: 8, opacity: 0.6, zIndex: 10 },     // back-right
];

export default function Hero() {
  const [blurAmount, setBlurAmount] = useState(0);
  const [positionOffset, setPositionOffset] = useState(0);
  const [paused, setPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const intervalRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const blur = Math.min(scrollY / 75, 2);
      setBlurAmount(blur);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || paused) {
      clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setPositionOffset((prev) => prev + 1);
    }, 3500);

    return () => clearInterval(intervalRef.current);
  }, [paused, prefersReducedMotion]);

  return (
    <section className="relative px-8 md:px-16 lg:px-24 pt-4 pb-4">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none -z-10" aria-hidden="true">
        <div className="absolute left-[30%] top-[5%] w-[60%] h-[70%] rounded-full opacity-22 blur-[150px]" style={{ background: "radial-gradient(ellipse at center, rgba(7,89,133,0.9) 0%, rgba(29,78,216,0.6) 40%, rgba(217,70,239,0.2) 70%, transparent 90%)" }} />
        <div className="absolute left-[55%] top-[10%] w-[25%] h-[35%] rounded-full bg-cyan-400 opacity-10 blur-[120px]" />
        <div className="absolute left-[3%] top-[28%] w-[60%] h-[50%] rounded-full opacity-30 blur-[150px]" style={{ background: "radial-gradient(ellipse at center, rgba(7,89,133,0.9) 0%, rgba(29,78,216,0.6) 50%, transparent 80%)" }} />
        <div className="absolute left-[40%] top-[30%] w-[45%] h-[40%] rounded-full opacity-25 blur-[150px]" style={{ background: "radial-gradient(ellipse at center, rgba(217,70,239,0.8) 0%, rgba(249,168,212,0.4) 50%, transparent 80%)" }} />
        <div className="absolute left-[65%] top-[22%] w-[30%] h-[35%] rounded-full opacity-30 blur-[120px]" style={{ background: "radial-gradient(ellipse at center, rgba(34,211,238,0.9) 0%, rgba(45,212,191,0.5) 50%, transparent 80%)" }} />
      </div>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-8 lg:gap-10">
        {/* Left content */}
        <div className="flex-1 pt-8 lg:pt-16">
          <h1 className="text-5xl md:text-6xl lg:text-[68px] font-bold leading-[1.1] tracking-tight">
            We don&rsquo;t <span className="decoration-white transition-[filter] duration-300" style={{ filter: `blur(${blurAmount}px)` }}>guess.</span>
            <br />
            We <span className="text-glow">engineer</span> virality.
          </h1>
          <p className="mt-8 text-base md:text-lg text-white/60 max-w-md leading-relaxed">
            Dinosaur agencies post and pray. Our Gen-Z team uses retention graphs, psychological hooks, and relentless editing to build content that performs. Oh, and we have a 100% virality rate across our long-term clients.
          </p>
        </div>

        {/* Right - TikTok card carousel orbit */}
        <div className="flex-1 flex flex-col items-center lg:items-end">
          <div
            className="relative w-[320px] h-[270px] lg:w-[420px] lg:h-[335px]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {CARDS.map((card, i) => {
              const posIndex = (i + positionOffset) % 3;
              const pos = POSITIONS[posIndex];

              return (
                <motion.div
                  key={card.title}
                  className="absolute top-0 left-1/2 w-[150px] lg:w-[185px]"
                  animate={{
                    x: `calc(-50% + ${pos.x}px)`,
                    scale: pos.scale,
                    rotate: pos.rotate,
                    opacity: pos.opacity,
                  }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : { duration: 0.8, ease: "easeInOut" }
                  }
                  style={{ zIndex: pos.zIndex }}
                >
                  <a href={card.href} target="_blank" rel="noopener noreferrer" className="block">
                    <TikTokCard
                      title={card.title}
                      image={card.image}
                      stats={card.stats}
                    />
                  </a>
                </motion.div>
              );
            })}
          </div>
          <p className="text-[11px] text-white/30 text-center mt-2 lg:mt-4">
            *Stats are combined organic totals across Instagram and TikTok. No paid promotion.
          </p>
        </div>
      </div>
    </section>
  );
}
