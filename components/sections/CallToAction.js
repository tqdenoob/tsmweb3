export default function CallToAction() {
  return (
    /* NOTE: Section boundaries must remain seamless — no margin between sections, use padding only */
    <section id="contact" className="relative px-8 md:px-16 lg:px-24 py-5">
      {/* Soft glow halo — uses only approved palette: sky-800, fuchsia-500 */}
      <div className="absolute inset-0 pointer-events-none -z-10" aria-hidden="true">
        <div className="absolute left-[25%] top-[10%] w-[35%] h-[50%] rounded-full bg-fuchsia-500 opacity-10 blur-[120px]" />
        <div className="absolute left-[40%] top-[20%] w-[30%] h-[45%] rounded-full bg-sky-800 opacity-12 blur-[100px]" />
      </div>
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-normal leading-tight">
          Ready to grow
          <br />
          your <span className="font-bold text-glow">brand?</span>
        </h2>
        <p className="mt-6 text-sm text-white/50 max-w-sm mx-auto leading-relaxed">
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
