import StatItem from "@/components/common/StatItem";

export default function Statistics() {
  const stats = [
    { value: "30M+", label: "Views and counting" },
    { value: "25+", label: "Success stories" },
    { value: "83%", label: "Conversion Rates" },
    { value: "50k+", label: "Followers gained" },
    { value: "200k+", label: "Engagement on posts" },
    { value: "50+", label: "Creative Projects" },
  ];

  return (
    /* NOTE: Section boundaries must remain seamless — no margin between sections, use padding only */
    <section className="relative px-8 md:px-16 lg:px-24 py-16 md:py-24">
      {/* Atmospheric glow — uses only approved palette: sky-800, blue-700, cyan-400 */}
      <div className="absolute inset-0 pointer-events-none -z-10" aria-hidden="true">
        <div className="absolute left-[50%] top-[10%] w-[40%] h-[50%] rounded-full bg-blue-700 opacity-12 blur-[150px]" />
        <div className="absolute left-[60%] top-[25%] w-[20%] h-[30%] rounded-full bg-cyan-400 opacity-12 blur-[100px]" />
        <div className="absolute left-[30%] top-[20%] w-[30%] h-[35%] rounded-full bg-sky-800 opacity-10 blur-[120px]" />
      </div>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
        {/* Left: "We deliver." */}
        <div className="lg:w-[30%] shrink-0">
          <h2 className="text-4xl md:text-5xl font-normal leading-tight">
            We <span className="font-bold text-glow">deliver.</span>
          </h2>
          <p className="mt-4 text-sm text-white/50 max-w-xs leading-relaxed">
            We&rsquo;re data driven. We only
            produce what gives you real
            results.
          </p>
        </div>

        {/* Right: Stats grid */}
        <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-x-12 lg:gap-x-20 gap-y-10 text-glow">
          {stats.map((stat, index) => (
            <StatItem
              key={stat.label}
              value={stat.value}
              label={stat.label}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
