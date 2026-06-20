"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReelCard from "@/components/common/ReelCard";
import ReelModal from "@/components/common/ReelModal";

// 5 hero reels. Each shows a category + stats overlay; clicking opens a modal
// with the thought process behind the video + the real embedded reel.
//
// TODO: `stats` and `thoughtProcess` below are placeholders — swap in the real
// numbers/reasoning for each reel. `poster` is optional: drop a still frame at
// the given path in /public to replace the gradient placeholder.
const CARDS = [
  {
    id: "ajoomma",
    category: "Ajoomma",
    accent: "from-fuchsia-500/40 to-sky-700/40",
    reelUrl: "https://www.instagram.com/reel/DLj6CztSgdd/",
    embedUrl: "https://www.instagram.com/reel/DLj6CztSgdd/embed",
    platform: "instagram",
    poster: "/images/hero/ajoomma.jpg",
    stats: { views: "567K", likes: "48.3K", comments: "3.4K", shares: "7.8K", saves: "4.1K" },
    thoughtProcess: [
      { label: "The hook", text: "Open on the most relatable, oddly-specific moment so the target audience sees themselves in the first second." },
      { label: "Why it worked", text: "Leaned into a shared cultural in-joke that this demographic is desperate to tag their friends in." },
      { label: "Retention trick", text: "A mid-video pattern interrupt resets attention right where the average viewer drops off." },
    ],
  },
  {
    id: "street-interviews",
    category: "Street Interviews",
    accent: "from-cyan-400/40 to-blue-700/40",
    reelUrl: "https://www.tiktok.com/@lapizzaiolasg/video/7496832077053103376",
    embedUrl: "https://www.tiktok.com/embed/v2/7496832077053103376",
    platform: "tiktok",
    poster: "/images/hero/street-interviews.jpg",
    stats: { views: "843K", likes: "72.1K", comments: "1.8K", shares: "9.6K", saves: "5.2K" },
    thoughtProcess: [
      { label: "The hook", text: "Lead with the most divisive answer of the day so viewers stay to see if anyone agrees with them." },
      { label: "Why it worked", text: "Real, unscripted reactions on a street people recognise build instant trust and shareability." },
      { label: "Retention trick", text: "Rapid-fire cuts between answers keep pace high and dead air at zero." },
    ],
  },
  {
    id: "trendjacking",
    category: "Trendjacking",
    accent: "from-blue-700/40 to-fuchsia-500/40",
    reelUrl: "https://www.tiktok.com/@thewhaletea.sg/video/7569952114768923912",
    embedUrl: "https://www.tiktok.com/embed/v2/7569952114768923912",
    platform: "tiktok",
    poster: "/images/hero/trendjacking.jpg",
    stats: { views: "1.2M", likes: "96.4K", comments: "2.1K", shares: "14.3K", saves: "8.7K" },
    thoughtProcess: [
      { label: "The hook", text: "Jumped on the trending sound/format within hours, while the algorithm was still pushing it hard." },
      { label: "Why it worked", text: "Tied the brand naturally into a moment the whole feed was already primed to engage with." },
      { label: "Retention trick", text: "Matched the exact beat the trend rewards so the video felt native, not like an ad." },
    ],
  },
  {
    id: "challenges",
    category: "Challenges",
    accent: "from-sky-700/40 to-cyan-400/40",
    reelUrl: "https://www.instagram.com/reel/DVvk6elklMP/",
    embedUrl: "https://www.instagram.com/reel/DVvk6elklMP/embed",
    platform: "instagram",
    poster: "/images/hero/challenges.jpg",
    stats: { views: "934K", likes: "81.5K", comments: "4.2K", shares: "12.1K", saves: "6.9K" },
    thoughtProcess: [
      { label: "The hook", text: "Show the stakes of the challenge up front so viewers stay to see whether it gets pulled off." },
      { label: "Why it worked", text: "A clear, repeatable format invites duets, stitches and copycats, so reach is built in." },
      { label: "Retention trick", text: "Withhold the result until the final beat to maximise watch-through." },
    ],
  },
  {
    id: "storytelling",
    category: "Storytelling",
    accent: "from-fuchsia-500/40 to-cyan-400/40",
    reelUrl: "https://www.instagram.com/reel/DWL5Rcok6l6/",
    embedUrl: "https://www.instagram.com/reel/DWL5Rcok6l6/embed",
    platform: "instagram",
    poster: "/images/hero/storytelling.jpg",
    stats: { views: "1.1M", likes: "88.2K", comments: "5.7K", shares: "10.4K", saves: "9.3K" },
    thoughtProcess: [
      { label: "The hook", text: "Open mid-story at the most tense moment, then rewind, so viewers stay to find out how we got here." },
      { label: "Why it worked", text: "An emotional arc makes the brand the backdrop to a story people genuinely want to finish." },
      { label: "Retention trick", text: "Every line ends on an open loop that the next line pays off, all the way to the end." },
    ],
  },
];

// Arc orbit positions, front-centre = index 2. Tighter spread on mobile so the
// far cards don't bleed off a narrow screen.
const POSITIONS_DESKTOP = [
  { x: -160, scale: 0.7, rotate: -10, opacity: 0.4, zIndex: 0 },   // far back-left
  { x: -90, scale: 0.84, rotate: -6, opacity: 0.7, zIndex: 10 },   // back-left
  { x: 0, scale: 1, rotate: 0, opacity: 1, zIndex: 30 },           // front-centre
  { x: 90, scale: 0.84, rotate: 6, opacity: 0.7, zIndex: 10 },     // back-right
  { x: 160, scale: 0.7, rotate: 10, opacity: 0.4, zIndex: 0 },     // far back-right
];

const POSITIONS_MOBILE = [
  { x: -94, scale: 0.62, rotate: -8, opacity: 0.35, zIndex: 0 },
  { x: -50, scale: 0.8, rotate: -5, opacity: 0.65, zIndex: 10 },
  { x: 0, scale: 1, rotate: 0, opacity: 1, zIndex: 30 },
  { x: 50, scale: 0.8, rotate: 5, opacity: 0.65, zIndex: 10 },
  { x: 94, scale: 0.62, rotate: 8, opacity: 0.35, zIndex: 0 },
];

export default function Hero() {
  const [positionOffset, setPositionOffset] = useState(0);
  const [paused, setPaused] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const intervalRef = useRef(null);
  const guessRef = useRef(null);

  const POSITIONS = isMobile ? POSITIONS_MOBILE : POSITIONS_DESKTOP;

  useEffect(() => {
    // Below the lg breakpoint, use the tighter mobile orbit.
    const mq = window.matchMedia("(max-width: 1023px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    // Drive the scroll-blur by writing to the DOM directly inside a rAF instead
    // of setState — this avoids re-rendering the 5 animated cards on every
    // scroll tick.
    let raf = 0;
    const handleScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const blur = Math.min(window.scrollY / 75, 2);
        if (guessRef.current) guessRef.current.style.filter = `blur(${blur}px)`;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    // Pause the slow orbit while a modal is open, on hover, or reduced motion.
    if (prefersReducedMotion || paused || activeCard) {
      clearInterval(intervalRef.current);
      return;
    }

    // Slow orbit — one step every 5s.
    intervalRef.current = setInterval(() => {
      setPositionOffset((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(intervalRef.current);
  }, [paused, prefersReducedMotion, activeCard]);

  // Manual navigation through the reels. +1 brings the left neighbour to front.
  const step = (dir) => setPositionOffset((prev) => prev + dir + CARDS.length);

  return (
    <section className="relative px-8 md:px-16 lg:px-24 pt-4 pb-4">
      {/* Background gradient */}
      {/* Perf: kept to 3 glow layers with smaller blur radii — large CSS blurs
           are the most expensive thing to paint. */}
      <div className="absolute inset-0 pointer-events-none -z-10" aria-hidden="true">
        <div className="absolute left-[30%] top-[5%] w-[60%] h-[70%] rounded-full opacity-12 blur-[90px]" style={{ background: "radial-gradient(ellipse at center, rgba(7,89,133,0.9) 0%, rgba(29,78,216,0.6) 40%, rgba(217,70,239,0.2) 70%, transparent 90%)" }} />
        <div className="absolute left-[3%] top-[28%] w-[60%] h-[50%] rounded-full opacity-16 blur-[90px]" style={{ background: "radial-gradient(ellipse at center, rgba(7,89,133,0.9) 0%, rgba(29,78,216,0.6) 50%, transparent 80%)" }} />
        <div className="absolute left-[65%] top-[22%] w-[30%] h-[35%] rounded-full opacity-16 blur-[80px]" style={{ background: "radial-gradient(ellipse at center, rgba(34,211,238,0.9) 0%, rgba(45,212,191,0.5) 50%, transparent 80%)" }} />
      </div>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-10">
        {/* Left content */}
        <div className="flex-1 pt-8 lg:pt-0">
          <h1 className="text-5xl md:text-6xl lg:text-[68px] font-bold leading-[1.1] tracking-tight">
            We don&rsquo;t <span ref={guessRef} className="decoration-white transition-[filter] duration-300" style={{ filter: "blur(0px)" }}>guess.</span>
            <br />
            We <span className="text-glow">engineer</span> virality.
          </h1>
          <p className="mt-8 text-base md:text-lg text-white/60 max-w-md leading-relaxed">
            Dinosaur agencies post and pray. Our Gen-Z team uses retention graphs, psychological hooks, and relentless editing to build content that performs. Oh, and we have a 100% virality rate across our long-term clients.
          </p>
        </div>

        {/* Right - reel card carousel orbit */}
        <div className="flex-1 flex flex-col items-center">
          <div
            className="relative w-[330px] h-[330px] lg:w-[560px] lg:h-[420px]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {CARDS.map((card, i) => {
              const posIndex = (i + positionOffset) % CARDS.length;
              const pos = POSITIONS[posIndex];
              const isFront = posIndex === 2;

              return (
                <motion.div
                  key={card.id}
                  className="absolute top-0 left-1/2 w-[150px] lg:w-[210px]"
                  animate={{
                    x: `calc(-50% + ${pos.x}px)`,
                    scale: pos.scale,
                    rotate: pos.rotate,
                    opacity: pos.opacity,
                  }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : { duration: 1.1, ease: "easeInOut" }
                  }
                  style={{ zIndex: pos.zIndex }}
                >
                  <ReelCard
                    category={card.category}
                    accent={card.accent}
                    poster={card.poster}
                    stats={card.stats}
                    interactive={isFront}
                    onClick={
                      isFront
                        ? () => setActiveCard(card)
                        : () => step(2 - posIndex)
                    }
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Manual navigation */}
          <div className="flex items-center gap-4 mt-4">
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Previous reel"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-xl border border-white/10 text-white transition-colors hover:bg-white/20"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Next reel"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-xl border border-white/10 text-white transition-colors hover:bg-white/20"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <p className="text-[11px] text-white/30 text-center mt-3 max-w-xs">
            *Tap the front reel for the thought process, or use the arrows to
            browse. Stats are combined organic totals across Instagram and
            TikTok. No paid promotion.
          </p>
        </div>
      </div>

      <ReelModal card={activeCard} onClose={() => setActiveCard(null)} />
    </section>
  );
}
