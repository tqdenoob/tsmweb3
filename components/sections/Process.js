"use client";

import { useRef, useState, useEffect } from "react";
import { RotateCw } from "lucide-react";

function AnimatedStep({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion. Reveal immediately, async to avoid a sync
    // setState within the effect body.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = requestAnimationFrame(() => setIsVisible(true));
      return () => cancelAnimationFrame(id);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { rootMargin: "-80px" }
    );

    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.5s ease-out ${delay}s, transform 0.5s ease-out ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// Overarching 6-month journey. Social media is iterative, not a one-month job.
const PHASES = [
  {
    months: "Months 1-2",
    title: "Testing",
    description:
      "We start with formats we already know convert, then test variety around them. Even in testing, every video is engineered for a high chance of going viral. We learn fast, we don't play safe.",
  },
  {
    months: "Months 3-4",
    title: "Optimisation",
    description:
      "We double down on what's working and tweak the content formats themselves to optimise for growth: sharper hooks, faster pacing, higher retention.",
  },
  {
    months: "Months 5-6",
    title: "Retention & Conversion",
    description:
      "With a proven engine running, we build a loyal community that keeps coming back, and start turning that audience into real conversions for your business.",
  },
];

// The 9-step cycle that repeats inside every single month.
const MONTHLY_STEPS = [
  {
    n: 1,
    title: "Overall strategy",
    description:
      "We align every move with your business goals and account direction, built on what last month's analysis told us.",
  },
  {
    n: 2,
    title: "Video ideation",
    description:
      "Deep trend research to pick ideas that fit the strategy and carry the highest chance of going viral.",
  },
  {
    n: 3,
    title: "Script writing",
    description:
      "Optimised scripts designed to foster audience engagement and keep viewers watching to the end.",
  },
  {
    n: 4,
    title: "Talent sourcing",
    description:
      "We cast from our exclusive community of energetic, camera-savvy creators who know how to perform for the feed.",
  },
  {
    n: 5,
    title: "Filming",
    description:
      "Shot on professional equipment for a clean, scroll-stopping look that still feels native to the platform.",
  },
  {
    n: 6,
    title: "Editing",
    description:
      "Fast, ruthless editing run against our 30+ point checklist so every video meets our company standard.",
  },
  {
    n: 7,
    title: "Uploading",
    description: "Published on optimised posting schedules built for maximum reach.",
  },
  {
    n: 8,
    title: "Engagement",
    description:
      "We actively engage your audience to push the algorithm further and strengthen your brand image.",
  },
  {
    n: 9,
    title: "Reporting & analysis",
    description:
      "There's always room to grow. Data-driven analysis of what worked and what didn't, the backbone of compounding growth over time.",
  },
];

function MonthlyLoop() {
  const R = 41; // ring radius as a % of the container
  const [hovered, setHovered] = useState(null);
  const active = hovered != null ? MONTHLY_STEPS[hovered] : null;

  return (
    <>
      {/* Desktop / tablet: a circular loop. Hover a node to reveal its detail. */}
      <div className="relative mx-auto hidden h-[460px] w-[460px] md:block">
        {/* Loop path */}
        <div className="absolute inset-[9%] rounded-full border border-dashed border-white/15" />

        {/* Centre: default label, or the hovered step's explanation */}
        <div className="absolute left-1/2 top-1/2 flex w-[210px] -translate-x-1/2 -translate-y-1/2 flex-col items-center px-2 text-center">
          {active ? (
            <>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-glow">
                Step {active.n}
              </span>
              <h4 className="mt-1 text-base font-bold text-white">{active.title}</h4>
              <p className="mt-2 text-xs leading-snug text-white/70">{active.description}</p>
            </>
          ) : (
            <>
              <RotateCw className="text-glow" size={28} />
              <p className="mt-2 text-sm font-bold text-white">Every month,</p>
              <p className="text-sm font-bold text-glow">on repeat</p>
              <p className="mt-2 text-[11px] text-white/40">Hover a step for detail</p>
            </>
          )}
        </div>

        {/* Nodes */}
        {MONTHLY_STEPS.map((step, i) => {
          // Start at the top (-90deg) and go clockwise.
          const angle = (-90 + i * (360 / MONTHLY_STEPS.length)) * (Math.PI / 180);
          const left = 50 + R * Math.cos(angle);
          const top = 50 + R * Math.sin(angle);
          const isActive = hovered === i;
          return (
            <div
              key={step.n}
              className="absolute flex w-28 -translate-x-1/2 -translate-y-1/2 cursor-default flex-col items-center text-center"
              style={{ left: `${left}%`, top: `${top}%` }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-full border bg-[#141414] text-sm font-bold text-glow transition-all duration-200 ${
                  isActive
                    ? "scale-110 border-white/70 shadow-[0_0_18px_rgba(255,255,255,0.25)]"
                    : "border-white/15"
                }`}
              >
                {step.n}
              </span>
              <span
                className={`mt-2 text-[11px] font-semibold leading-tight transition-colors ${
                  isActive ? "text-white" : "text-white/80"
                }`}
              >
                {step.title}
              </span>
            </div>
          );
        })}
      </div>

      {/* Mobile: a vertical list that loops back, with detail inline */}
      <div className="mx-auto max-w-sm md:hidden">
        <ol className="relative space-y-5 border-l border-dashed border-white/15 pl-6">
          {MONTHLY_STEPS.map((step) => (
            <li key={step.n} className="relative">
              <span className="absolute -left-[33px] flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-[#141414] text-xs font-bold text-glow">
                {step.n}
              </span>
              <h4 className="text-sm font-semibold text-white">{step.title}</h4>
              <p className="mt-1 text-xs leading-relaxed text-white/60">{step.description}</p>
            </li>
          ))}
        </ol>
        <div className="mt-5 flex items-center gap-2 pl-6 text-sm font-bold text-glow">
          <RotateCw size={16} />
          Then repeat, every month
        </div>
      </div>
    </>
  );
}

export default function Process() {
  return (
    /* NOTE: Section boundaries must remain seamless. No margin between sections, use padding only */
    <section id="process" className="relative px-8 md:px-16 lg:px-24 py-16 md:py-24">
      {/* Figma: "Borealis" + "BG gradient 2". Uses only approved palette: sky-800, blue-700, fuchsia-500, cyan-400 */}
      <div className="absolute inset-0 pointer-events-none -z-10" aria-hidden="true">
        <div className="absolute left-[-5%] top-[25%] w-[70%] h-[55%] rounded-full opacity-10 blur-[100px]" style={{ background: "radial-gradient(ellipse at 40% 50%, rgba(7,89,133,0.9) 0%, rgba(29,78,216,0.6) 50%, transparent 85%)" }} />
        <div className="absolute left-[55%] top-[30%] w-[30%] h-[40%] rounded-full bg-cyan-400 opacity-8 blur-[80px]" />
      </div>
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal leading-tight">
            The system behind
            <br />
            <span className="italic font-bold text-glow">going viral</span>
          </h2>
          <p className="mt-6 text-base md:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            No posting and praying. We run your content as a data-driven engine:
            a tight monthly production cycle inside a longer growth journey,
            where every video is a test and each result sharpens the next.
          </p>
        </div>

        {/* Two harmonic halves: the macro journey beside the micro loop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-14 items-center max-w-6xl mx-auto">
          {/* Left: the 6-month journey as a vertical timeline */}
          <div>
            <span className="inline-block text-xs md:text-sm uppercase tracking-[0.2em] text-white/40">
              The 6-month journey
            </span>
            <p className="mt-3 text-sm md:text-base text-white/60 leading-relaxed">
              Going viral isn&rsquo;t a one-month job. Real growth comes from
              months of iteration: testing, refining, then scaling what wins.
            </p>

            <div className="mt-8 relative border-l border-white/15 pl-8 space-y-7">
              {PHASES.map((phase, i) => (
                <AnimatedStep key={phase.title} delay={i * 0.12}>
                  <div className="relative">
                    <span className="absolute -left-[46px] top-0 flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-[#141414] text-xs font-bold text-glow">
                      {i + 1}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-glow">
                      {phase.months}
                    </span>
                    <h3 className="mt-1 text-lg font-bold text-white">{phase.title}</h3>
                    <p className="mt-2 text-sm text-white/60 leading-relaxed">
                      {phase.description}
                    </p>
                  </div>
                </AnimatedStep>
              ))}
            </div>
          </div>

          {/* Right: what one month looks like, as a loop */}
          <div>
            <span className="inline-block text-xs md:text-sm uppercase tracking-[0.2em] text-white/40">
              Inside every month
            </span>
            <p className="mt-3 text-sm md:text-base text-white/60 leading-relaxed">
              Every month runs the same end-to-end loop: nine steps that take
              your content from strategy to published, then straight back into
              the data.
            </p>

            <AnimatedStep className="mt-8">
              <MonthlyLoop />
            </AnimatedStep>
          </div>
        </div>
      </div>
    </section>
  );
}
