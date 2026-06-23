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
    stats: { views: "4.4M", likes: "138K", shares: "5.5K", reposts: "420" },
    whatWeDid:
      "Here's what we did for Ajoomma, a Korean BBQ spot. We set up a blind date between two strangers and filmed it right there at the table. The format does a lot of quiet work for us: a date is the kind of low-stakes drama people will happily watch to the end, and because everyone is eating, the food and the restaurant carry every shot without it ever feeling like an ad. When the first one landed we turned it into a series and started splitting each date across two videos, so anyone invested had to come back for the ending. That return habit is what compounded into **4.4M views** and **138K likes**, and it is why most Gen Z in Singapore now recognise the place, the kind of awareness that actually fills tables.",
    whyItWorks:
      "Serialised content is one of our signature formats at Third Spaces. We use it to turn a one-off hit into a habit. Each episode builds on the last, so the audience comes back on its own, and splitting a story across two parts is one of the strongest ways to hold attention: people sit through the promo to reach the payoff. That's how this format builds a genuine community around a brand and keeps the sales coming long after the first video.",
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
    whatWeDid:
      "Here's what we did for La Pizzaiola: a prank video. Pranks are some of the most naturally shareable content out there, they run on a reaction you can't fake, and that is exactly what a Gen Z feed rewards, something genuinely funny rather than polished. We built the gag around the brand so the pizza was part of the joke instead of an ad stapled to the end. It pulled **1M organic views** and **56.6K likes** with nothing spent on promotion, putting La Pizzaiola in front of a whole new crowd and turning them into people who actually walk in for a slice.",
    whyItWorks:
      "Pranks and street content are our go-to awareness play. They're made to be shared, so they reach people who'd never sit through an ad, and the format itself makes them stop and watch. The brand rides along inside something genuinely fun, which is how we put a name in front of a massive new audience fast. It's what we reach for when a brand needs to get known.",
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
    whatWeDid:
      "Here's what we did for Whale Tea. The K-pop band Cortis had just debuted and their sound was taking over the feed, and a trend like that has a short shelf life, so we moved within a day or two. We recreated a clip that was already blowing up: staff dancing as they passed a drink across the counter, then a customer catching on and joining in, all caught on the shop's own CCTV. Getting on it early meant the algorithm was still pushing the sound hard, and it dropped the brand straight into a fandom that loves to rally behind anything that gets their group right. They ran with it, to **1.2M views**, **318K likes** and **2,000 new followers**, a young K-pop crowd that now buys and keeps coming back.",
    whyItWorks:
      "Trendjacking is a signature move in our playbook. It borrows attention that already exists: the algorithm is busy pushing the trend, so we ride that momentum instead of building it from scratch. Speed is the whole game, we move within a day or two before it goes stale. Done right it's a massive jolt of awareness, and when there's a community behind the trend like a K-pop fandom, the brand inherits their energy and walks away with real followers.",
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
    whatWeDid:
      "Here's what we did for A Hot Hideout: an interactive game. Interactive content is one of the strongest retention plays going, the moment you ask viewers to join in they stay to the end and jump into the comments, which is exactly the behaviour the algorithm rewards. We built the game around the menu, so all that attention quietly educated people on the product at the same time. It came to **4.8M views** and **168K likes**, and an audience that now knows what to order before they even walk in.",
    whyItWorks:
      "Interactive challenges are one of our signature formats because they win on the two things the algorithm rewards most, watch time and comments. Getting the viewer to play along keeps them watching to the end and gets them replying, which pushes the video further. And because the game is built around the actual product, all that attention doubles as product education, the kind that moves people from just watching to wanting to come in and buy.",
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
    whatWeDid:
      "Here's what we did for Sweet Dots: we showed its story. It is a Chinese dessert shop built on a grandmother's recipes, reopened by two daughters helping their mum, and a brand like that does not need a gimmick, it needs its story told properly. So we put the heritage and the family front and centre and let the realness carry it, because an honest story is what a younger audience genuinely rallies behind rather than scrolls past. They did not just watch it, they showed up: off **380K+ views**, **footfall tripled in the first week**, real people through the door instead of numbers on a screen.",
    whyItWorks:
      "Storytelling is where our whole approach pays off, it's how we turn viewers into customers. Reach and trends get a brand seen, but a real story is what makes people care, and caring is what gets them through the door. It's the format that carries a brand from a first impression all the way to a sale. For a heritage F&B brand like this, the story is the product.",
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

            {/* Manual navigation, flanking the cards */}
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Previous reel"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-40 flex h-9 w-9 lg:h-10 lg:w-10 items-center justify-center rounded-full bg-black/40 backdrop-blur-xl border border-white/15 text-white transition-colors hover:bg-white/20"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Next reel"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-40 flex h-9 w-9 lg:h-10 lg:w-10 items-center justify-center rounded-full bg-black/40 backdrop-blur-xl border border-white/15 text-white transition-colors hover:bg-white/20"
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
