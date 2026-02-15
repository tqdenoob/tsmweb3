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
    <section className="px-8 md:px-16 lg:px-24 py-16 md:py-24">
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
