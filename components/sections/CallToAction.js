export default function CallToAction() {
  return (
    /* NOTE: Section boundaries must remain seamless — no margin between sections, use padding only */
    <section id="contact" className="relative px-8 md:px-16 lg:px-24 py-5">
      {/* Soft glow halo — uses only approved palette: sky-800, fuchsia-500 */}
      <div className="absolute inset-0 pointer-events-none -z-10" aria-hidden="true">
        <div className="absolute left-[25%] top-[10%] w-[40%] h-[55%] rounded-full opacity-10 blur-[120px]" style={{ background: "radial-gradient(ellipse at 45% 50%, rgba(217,70,239,0.7) 0%, rgba(7,89,133,0.5) 60%, transparent 90%)" }} />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal leading-tight whitespace-nowrap">
          Ready to grow your <span className="font-bold text-glow">brand?</span>
        </h2>
        <p className="mt-6 text-base md:text-lg text-white/60 max-w-sm mx-auto leading-relaxed">
          Tell us what you&rsquo;re looking for, and we
          will get back right away with a quote,
          ideation timeline and next steps.
        </p>
        <a
          href="https://wa.link/kiary3"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-8 px-8 py-3 text-base text-white border border-white/20 bg-white/10 backdrop-blur-sm rounded-[var(--rounded-btn)] transition-all duration-300 hover:bg-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
        >
          Get Started
        </a>
      </div>
    </section>
  );
}
