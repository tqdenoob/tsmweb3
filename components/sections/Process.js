"use client";

import { useRef, useState, useEffect } from "react";
import StepCard from "@/components/common/StepCard";

function AnimatedStep({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
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

export default function Process() {
  return (
    /* NOTE: Section boundaries must remain seamless — no margin between sections, use padding only */
    <section className="relative px-8 md:px-16 lg:px-24 py-20 md:py-32">
      {/* Figma: "Borealis" + "BG gradient 2" — uses only approved palette: sky-800, blue-700, fuchsia-500, cyan-400 */}
      <div className="absolute inset-0 pointer-events-none -z-10" aria-hidden="true">
        <div className="absolute left-[-5%] top-[25%] w-[70%] h-[55%] rounded-full opacity-18 blur-[170px]" style={{ background: "radial-gradient(ellipse at 40% 50%, rgba(7,89,133,0.9) 0%, rgba(29,78,216,0.6) 50%, transparent 85%)" }} />
        <div className="absolute left-[55%] top-[30%] w-[30%] h-[40%] rounded-full bg-cyan-400 opacity-12 blur-[120px]" />
      </div>
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal leading-tight">
            Marketing campaigns that
            <br />
            <span className="italic font-bold text-glow">actually work</span>
          </h2>
          <p className="mt-6 text-base md:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            Traditional ads don&rsquo;t land with Gen-Z. We build campaigns
            around the formats, platforms, and stories that this generation
            actually engages with.
          </p>
        </div>

        {/* Process steps — single row on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <AnimatedStep delay={0}>
            <StepCard
              number={1}
              title="Ideation"
              description="We learn your brand, identify what resonates with your audience, and script content built for their feeds."
            />
          </AnimatedStep>

          <AnimatedStep delay={0.15}>
            <StepCard
              number={2}
              title="Production"
              description="We produce short-form videos that are authentic, fast-paced and relatable to young people using TikTok and Instagram."
            />
          </AnimatedStep>

          <AnimatedStep delay={0.3}>
            <StepCard
              number={3}
              title="Optimisation"
              description="We track what Gen-Z responds to, double down on what works, and cut what doesn&#39;t, so you stay consistently viral."
            />
          </AnimatedStep>
        </div>
      </div>
    </section>
  );
}
