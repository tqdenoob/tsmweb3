import Image from "next/image";

export default function Hero() {
  return (
    /* NOTE: Section boundaries must remain seamless — no margin between sections, use padding only */
    <section className="relative px-8 md:px-16 lg:px-24 pt-4 pb-4">
      {/* Figma: "background type 4" — uses only approved palette: sky-800, blue-700, fuchsia-500, cyan-400 */}
      <div className="absolute inset-0 pointer-events-none -z-10" aria-hidden="true">
        <div className="absolute left-[30%] top-[5%] w-[60%] h-[70%] rounded-full opacity-22 blur-[150px]" style={{ background: "radial-gradient(ellipse at center, rgba(7,89,133,0.9) 0%, rgba(29,78,216,0.6) 40%, rgba(217,70,239,0.2) 70%, transparent 90%)" }} />
        <div className="absolute left-[55%] top-[10%] w-[25%] h-[35%] rounded-full bg-cyan-400 opacity-10 blur-[120px]" />
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
                <Image src="/images/thumbnails/recap.jpg" alt="2025 Recap" fill className="object-cover" sizes="(max-width: 768px) 190px, 220px" priority />
              </div>

              {/* Center card (front) */}
              <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[210px] h-[330px] md:w-[250px] md:h-[390px] rounded-2xl z-20 overflow-hidden shadow-2xl">
                <Image src="/images/thumbnails/mala.jpg" alt="$200 Mala" fill className="object-cover" sizes="(max-width: 768px) 210px, 250px" priority />
              </div>

              {/* Right card (behind, rotated right) */}
              <div className="absolute right-0 top-10 w-[190px] h-[290px] md:w-[220px] md:h-[340px] rounded-2xl rotate-6 overflow-hidden z-10">
                <Image src="/images/thumbnails/dating.jpg" alt="CBD Dating Blind Date" fill className="object-cover" sizes="(max-width: 768px) 190px, 220px" priority />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
