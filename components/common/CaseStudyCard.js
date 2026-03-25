import Image from "next/image";

function Thumbnail({ image, views }) {
  return (
    <div className="aspect-[9/16] w-[140px] sm:w-[160px] md:w-[180px] lg:w-[200px] rounded-2xl overflow-hidden relative flex-shrink-0">
      {image ? (
        <Image
          src={image}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 640px) 140px, (max-width: 768px) 160px, (max-width: 1024px) 180px, 200px"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]" />
      )}
      {/* Bottom gradient for legibility */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
      {/* View count pill */}
      {views && (
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm rounded-full px-2.5 py-1">
          <svg
            width="10"
            height="12"
            viewBox="0 0 10 12"
            fill="none"
            className="text-white"
          >
            <path d="M1 1v10l8-5L1 1Z" fill="currentColor" />
          </svg>
          <span className="text-white text-xs font-semibold">{views}</span>
        </div>
      )}
    </div>
  );
}

function StatBlock({ valueBefore, labelBefore, valueAfter, labelAfter, duration }) {
  return (
    <div className="flex items-end gap-3 md:gap-4">
      {/* Before */}
      <div className="flex flex-col items-center">
        <span className="text-white/70 text-lg md:text-xl font-semibold">{valueBefore}</span>
        <span className="text-white/40 text-xs mt-0.5">{labelBefore}</span>
      </div>

      {/* Arrow connector */}
      <div className="flex flex-col items-center gap-0.5 pb-4">
        <span className="text-white/40 text-[10px] md:text-xs whitespace-nowrap">{duration}</span>
        <svg width="60" height="12" viewBox="0 0 60 12" fill="none" className="md:w-[80px]">
          <line
            x1="0"
            y1="6"
            x2="50"
            y2="6"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          <path d="M48 2l6 4-6 4" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="none" />
        </svg>
      </div>

      {/* After */}
      <div className="flex flex-col items-center">
        <span className="text-white text-2xl md:text-3xl font-bold text-glow">{valueAfter}</span>
        <span className="text-white/40 text-xs mt-0.5">{labelAfter}</span>
      </div>
    </div>
  );
}

export default function CaseStudyCard({ title, subtitle, thumbnails, stats }) {
  return (
    <div className="w-full flex flex-col items-center px-4">
      {/* Title */}
      <h3 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white text-center text-glow">
        {title}
      </h3>

      {/* Subtitle */}
      <p className="text-base md:text-lg text-white/50 text-center mt-2">
        {subtitle}
      </p>

      {/* Thumbnails row */}
      <div className="flex justify-center gap-3 md:gap-4 mt-8 md:mt-12">
        {thumbnails?.map((thumb, i) => (
          <Thumbnail key={i} image={thumb.image} views={thumb.views} />
        ))}
      </div>

      {/* Stats row */}
      {stats && stats.length > 0 && (
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-8 md:mt-12">
          {stats.map((stat, i) => (
            <StatBlock
              key={i}
              valueBefore={stat.valueBefore}
              labelBefore={stat.labelBefore}
              valueAfter={stat.valueAfter}
              labelAfter={stat.labelAfter}
              duration={stat.duration}
            />
          ))}
        </div>
      )}
    </div>
  );
}
