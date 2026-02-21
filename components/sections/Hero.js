export default function Hero() {
  return (
    /* NOTE: Section boundaries must remain seamless — no margin between sections, use padding only */
    <section className="relative px-8 md:px-16 lg:px-24 pt-4 pb-24">
      {/* Figma: "background type 4" — uses only approved palette: sky-800, blue-700, fuchsia-500, cyan-400 */}
      <div className="absolute inset-0 pointer-events-none -z-10" aria-hidden="true">
        <div className="absolute left-[30%] top-[5%] w-[65%] h-[70%] rounded-full bg-sky-800 opacity-25 blur-[150px]" />
        <div className="absolute left-[40%] top-[20%] w-[35%] h-[45%] rounded-full bg-blue-700 opacity-20 blur-[120px]" />
        <div className="absolute left-[55%] top-[15%] w-[30%] h-[40%] rounded-full bg-fuchsia-500 opacity-12 blur-[150px]" />
        <div className="absolute left-[60%] top-[10%] w-[20%] h-[30%] rounded-full bg-cyan-400 opacity-10 blur-[100px]" />
      </div>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
        {/* Left content */}
        <div className="flex-1 pt-8 lg:pt-16">
          <h1 className="text-5xl md:text-6xl lg:text-[68px] font-bold leading-[1.1] tracking-tight">
            We don&rsquo;t <span className="blur-[2px] decoration-white">guess</span>
            <br />
            We <span className="text-glow">engineer</span>
          </h1>
          <p className="mt-8 text-base md:text-lg text-white/60 max-w-md leading-relaxed">
            Our tried and tested methodology is guaranteed to
            give your brand the recognition it deserves.
          </p>
        </div>

        {/* Right - Video cards + caption as one aligned block */}
        <div className="flex-1 flex justify-center lg:justify-end">
          <div className="w-[320px] md:w-[400px]">
            {/* Card stack */}
            <div className="relative h-[380px] md:h-[440px]">
              {/* Left card (behind, rotated left) */}
              <div className="absolute left-0 top-10 w-[160px] h-[240px] md:w-[180px] md:h-[280px] rounded-2xl -rotate-6 overflow-hidden z-0">
                {/* TODO: Replace with actual video thumbnail */}
                <div className="w-full h-full bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a]" />
              </div>

              {/* Center card (front) */}
              <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[180px] h-[280px] md:w-[210px] md:h-[320px] rounded-2xl z-20 overflow-hidden shadow-2xl">
                {/* TODO: Replace with actual video thumbnail */}
                <div className="w-full h-full bg-gradient-to-b from-[#3a3a3a] to-[#222222] relative">
                  {/* Speech bubble placeholder */}
                  <div className="absolute top-[40%] left-1/2 -translate-x-1/2 bg-white text-black text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap">
                    $200 MALA?!?
                  </div>
                </div>
              </div>

              {/* Right card (behind, rotated right) */}
              <div className="absolute right-0 top-10 w-[160px] h-[240px] md:w-[180px] md:h-[280px] rounded-2xl rotate-6 overflow-hidden z-10">
                {/* TODO: Replace with actual video thumbnail */}
                <div className="w-full h-full bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
