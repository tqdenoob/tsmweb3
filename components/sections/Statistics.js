import StatItem from "@/components/common/StatItem";

export default function Statistics() {
  // Specific (non-round) figures that keep ticking up while the visitor is on
  // the page read as a real, live metric.
  const stats = [
    { value: "100%", label: "Of clients who stay 6+ months go viral, with videos past 500K views" },
    { value: "79,432,118", label: "Views generated for our clients", live: true, incrementPerSecond: 5 },
    { value: "3,948,205", label: "Engagements generated", live: true, incrementPerSecond: 2 },
    { value: "497,326", label: "Followers gained", live: true, incrementPerSecond: 1 },
    { value: "30+", label: "Clients who trust us for their growth" },
    { value: "1,000+", label: "Algo-optimised videos produced" },
  ];

  return (
    /* NOTE: Section boundaries must remain seamless — no margin between sections, use padding only */
    <section className="relative px-8 md:px-16 lg:px-24 pt-2 md:pt-4 pb-16 md:pb-24">
      {/* Atmospheric glow — uses only approved palette: sky-800, blue-700, cyan-400 */}
      <div className="absolute inset-0 pointer-events-none -z-10" aria-hidden="true">
        <div className="absolute left-[30%] top-[10%] w-[45%] h-[55%] rounded-full opacity-8 blur-[90px]" style={{ background: "radial-gradient(ellipse at 60% 50%, rgba(29,78,216,0.8) 0%, rgba(7,89,133,0.5) 40%, rgba(34,211,238,0.3) 70%, transparent 90%)" }} />
      </div>
      <div className="max-w-7xl mx-auto">
        {/* Heading centered on top */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal leading-tight">
            What <span className="font-bold text-glow">Gaming</span> the Algorithm Gets You
          </h2>
          <p className="mt-4 text-base md:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            Not vanity metrics, receipts. This is real growth for real brands,
            earned through relentless testing and content engineered to actually
            perform with the toughest crowd to win over: Gen Z in Singapore.
          </p>
        </div>

        {/* Stats grid */}
        <div className="flex flex-wrap justify-center gap-x-12 lg:gap-x-20 gap-y-10 text-glow">
          {stats.map((stat, index) => (
            <div key={stat.label} className="w-[calc(50%-24px)] md:w-[calc(33.333%-32px)] lg:w-[calc(33.333%-54px)] text-center">
              <StatItem
                value={stat.value}
                label={stat.label}
                index={index}
                live={stat.live}
                incrementPerSecond={stat.incrementPerSecond}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
