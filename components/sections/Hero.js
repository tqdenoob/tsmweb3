"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReelCard from "@/components/common/ReelCard";
import ReelModal from "@/components/common/ReelModal";

// 5 hero reels. Each shows a category + stats overlay; clicking opens a modal
// with the thought process behind the video + the real embedded reel.
//
// `poster` is optional: drop a still frame at the given path in /public to
// replace the gradient placeholder.
const CARDS = [
  {
    id: "serialised",
    category: "Serialised content",
    accent: "from-fuchsia-500/40 to-sky-700/40",
    reelUrl: "https://www.instagram.com/reel/DLj6CztSgdd/",
    embedUrl: "https://www.instagram.com/reel/DLj6CztSgdd/embed",
    platform: "instagram",
    poster: "/images/hero/serialised.jpg",
    stats: { views: "380K+", likes: "11.4K", comments: "90", shares: "5.5K", saves: "3.6K" },
    thoughtProcess: [
      { label: "The format", text: "A blind date between two strangers, filmed live in the Ajoomma KBBQ restaurant. It landed, so we doubled down and turned it into a two-part series people kept coming back for." },
      { label: "Why it worked", text: "The series format builds a loyal community that follows the account purely for the entertainment, while the setting quietly showcases the food and promotions and drives real sales." },
      { label: "The reach", text: "It became staple content. By view count, an estimated 95% of Singapore's TikTok audience has seen it, putting the brand in front of almost everyone." },
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
    stats: { views: "1M", likes: "56.6K", comments: "74", shares: "1K+", saves: "2K" },
    thoughtProcess: [
      { label: "The hook", text: "A prank on an unsuspecting target, exactly the kind of unscripted moment Gen-Z stops scrolling for." },
      { label: "Why it worked", text: "Genuinely entertaining, up-to-date content keeps people watching, while the promotion sits in the captions so reach never comes at the cost of the message." },
      { label: "The result", text: "Over a million organic views. A few percent engagement on a million beats a high rate on a few thousand, and the scale is the point." },
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
    stats: { views: "1.2M", likes: "318K", comments: "1K", shares: "34K", saves: "45K" },
    thoughtProcess: [
      { label: "The trend", text: "We jumped on the newly launched Cortis sound the moment it broke, recreating a video already going viral: staff dancing as they passed drinks, with a customer joining in on the CCTV." },
      { label: "Why it worked", text: "Riding a fresh K-pop trend plugged the brand straight into a highly engaged fan community that rallied behind it." },
      { label: "The result", text: "1.2M views and 2,000 new followers, many of them K-pop fans now following the brand." },
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
    stats: { views: "4.8M", likes: "168K", comments: "4.2K", shares: "6K", saves: "9.1K" },
    thoughtProcess: [
      { label: "The challenge", text: "Viewers pick a number and we 'guess' their mala order, a simple interactive game built to keep people watching all the way to the reveal." },
      { label: "Why it worked", text: "The format is optimised for retention while quietly educating viewers on the menu and pushing the signature products." },
      { label: "The payoff", text: "4.8M views, and an audience that follows the account waiting for the next challenge." },
    ],
  },
  {
    id: "storytelling",
    category: "Storytelling",
    accent: "from-fuchsia-500/40 to-cyan-400/40",
    reelUrl: "https://www.instagram.com/reel/DJrGu1TTLrg/",
    embedUrl: "https://www.instagram.com/reel/DJrGu1TTLrg/embed",
    platform: "instagram",
    poster: "/images/hero/storytelling.jpg",
    stats: { views: "380K+", likes: "11.4K", comments: "90", shares: "3.6K", saves: "1.2K" },
    thoughtProcess: [
      { label: "The hook", text: "A compelling hook that pulls you straight into the brand's story." },
      { label: "Why it worked", text: "Telling a genuine, unique brand story earns real support, not just passive views." },
      { label: "The result", text: "Footfall tripled in the first week after posting." },
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
