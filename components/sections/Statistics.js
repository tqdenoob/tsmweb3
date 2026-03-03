import StatItem from "@/components/common/StatItem";

export default function Statistics() {
  const stats = [
    { value: "30576893", label: "Views", live: true, incrementPerSecond: 12 },
    { value: "2668%", label: "Monthly engagement growth" },
    { value: "50462", label: "Followers gained", live: true, incrementPerSecond: 2 },
    { value: "10+", label: "Clients" },
    { value: "100+", label: "Videos produced" },
  ];

  return (
    /* NOTE: Section boundaries must remain seamless — no margin between sections, use padding only */
    <section className="relative px-8 md:px-16 lg:px-24 pt-2 md:pt-4 pb-16 md:pb-24">
      {/* Atmospheric glow — uses only approved palette: sky-800, blue-700, cyan-400 */}
      <div className="absolute inset-0 pointer-events-none -z-10" aria-hidden="true">
        <div className="absolute left-[50%] top-[10%] w-[40%] h-[50%] rounded-full bg-blue-700 opacity-12 blur-[150px]" />
        <div className="absolute left-[60%] top-[25%] w-[20%] h-[30%] rounded-full bg-cyan-400 opacity-12 blur-[100px]" />
        <div className="absolute left-[30%] top-[20%] w-[30%] h-[35%] rounded-full bg-sky-800 opacity-10 blur-[120px]" />
      </div>
      <div className="max-w-7xl mx-auto">
        {/* Heading centered on top */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal leading-tight">
            We <span className="font-bold text-glow">deliver.</span>
          </h2>
          <p className="mt-4 text-base md:text-lg text-white/60 mx-auto leading-relaxed whitespace-nowrap">
            We&rsquo;re data driven. We only produce what gives you real results.
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
