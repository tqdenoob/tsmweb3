export default function CallToAction() {
  return (
    <section id="contact" className="px-8 md:px-16 lg:px-24 py-20 md:py-28 bg-gradient-orbs">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-start gap-12 lg:gap-24">
        {/* Left content */}
        <div className="lg:w-[40%]">
          <h2 className="text-4xl md:text-5xl font-normal leading-tight">
            Ready to grow
            <br />
            your <span className="font-bold text-glow">brand?</span>
          </h2>
          <p className="mt-6 text-sm text-white/50 max-w-sm leading-relaxed">
            Tell us what you&rsquo;re looking for, and we
            will get back right away with a quote,
            ideation timeline and next steps,
          </p>
        </div>

        {/* Right: Contact form */}
        <div className="flex-1 w-full lg:w-auto">
          <form className="flex flex-col gap-6">
            <input
              type="text"
              placeholder="Name"
              className="bg-transparent border-b border-white/30 pb-3 text-white text-base placeholder-white/40 outline-none focus:border-white/60 transition-colors"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="bg-transparent border-b border-white/30 pb-3 text-white text-base placeholder-white/40 outline-none focus:border-white/60 transition-colors"
            />
            <input
              type="tel"
              placeholder="Contact Number"
              className="bg-transparent border-b border-white/30 pb-3 text-white text-base placeholder-white/40 outline-none focus:border-white/60 transition-colors"
            />
            <input
              type="text"
              placeholder="Goals"
              className="bg-transparent border-b border-white/30 pb-3 text-white text-base placeholder-white/40 outline-none focus:border-white/60 transition-colors"
            />
          </form>
        </div>
      </div>
    </section>
  );
}
