export default function Hero() {
  return (
    /* NOTE: Section boundaries must remain seamless — no margin between sections, use padding only */
    <section className="relative px-8 md:px-16 lg:px-24 pt-4 pb-4">
      {/* Figma: "background type 4" — uses only approved palette: sky-800, blue-700, fuchsia-500, cyan-400 */}
      <div className="absolute inset-0 pointer-events-none -z-10" aria-hidden="true">
        <div className="absolute left-[30%] top-[5%] w-[65%] h-[70%] rounded-full bg-sky-800 opacity-25 blur-[150px]" />
        <div className="absolute left-[40%] top-[20%] w-[35%] h-[45%] rounded-full bg-blue-700 opacity-20 blur-[120px]" />
        <div className="absolute left-[55%] top-[15%] w-[30%] h-[40%] rounded-full bg-fuchsia-500 opacity-12 blur-[150px]" />
        <div className="absolute left-[60%] top-[10%] w-[20%] h-[30%] rounded-full bg-cyan-400 opacity-10 blur-[100px]" />
      </div>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-8 lg:gap-10">
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
          <div className="w-[380px] md:w-[480px]">
            {/* Card stack */}
            <div className="relative h-[440px] md:h-[520px]">
              {/* Left card (behind, rotated left) */}
              <div className="absolute left-0 top-10 w-[190px] h-[290px] md:w-[220px] md:h-[340px] rounded-2xl -rotate-6 overflow-hidden z-0">
                <img src="/images/thumbnails/recap.jpg" alt="2025 Recap" className="w-full h-full object-cover" />
              </div>

              {/* Center card (front) */}
              <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[210px] h-[330px] md:w-[250px] md:h-[390px] rounded-2xl z-20 overflow-hidden shadow-2xl">
                <img src="/images/thumbnails/mala.jpg" alt="$200 Mala" className="w-full h-full object-cover" />
              </div>

              {/* Right card (behind, rotated right) */}
              <div className="absolute right-0 top-10 w-[190px] h-[290px] md:w-[220px] md:h-[340px] rounded-2xl rotate-6 overflow-hidden z-10">
                <img src="/images/thumbnails/dating.jpg" alt="CBD Dating Blind Date" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
