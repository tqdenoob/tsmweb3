export default function Hero() {
  return (
    <section className="px-8 md:px-16 lg:px-24 pt-4 pb-24">
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

            {/* Caption - same container width, so it stays centered under the cards */}
            <p className="mt-4 text-base text-white/60 text-center">
              Here are some of our videos!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
