import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Video, Camera, Palette, Box, Scissors, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Our Services | Third Spaces Marketing",
  description:
    "End-to-end social media production, event coverage, graphic design, 3D design, and editing infrastructure for brands and PR firms.",
};

const SERVICES = [
  {
    icon: Camera,
    title: "Event Coverage",
    description:
      "Launches, activations and pop-ups turned into scroll-stopping content. We show up, capture the moment, and cut it into clips built for the feed.",
  },
  {
    icon: Palette,
    title: "Graphic Design",
    description:
      "Brand visuals, thumbnails, carousels and static assets that look native to every platform and instantly recognisable as you.",
  },
  {
    icon: Box,
    title: "3D Design",
    description:
      "Eye-catching 3D visuals and motion that make your brand stand out in a feed full of flat, forgettable content.",
  },
  {
    icon: Scissors,
    title: "Editing Contracts",
    description:
      "Our editors are seriously good. So good that multiple PR firms run us as their editing infrastructure. Hand us the footage and we hand back content that performs.",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-grid overflow-x-clip">
      <Navbar />
      <main className="isolate relative z-0">
        {/* Hero */}
        <section className="relative px-8 md:px-16 lg:px-24 pt-16 md:pt-24 pb-8">
          <div className="absolute inset-0 pointer-events-none -z-10" aria-hidden="true">
            <div className="absolute left-[20%] top-[0%] w-[60%] h-[70%] rounded-full opacity-12 blur-[90px]" style={{ background: "radial-gradient(ellipse at center, rgba(7,89,133,0.9) 0%, rgba(29,78,216,0.6) 40%, rgba(217,70,239,0.2) 70%, transparent 90%)" }} />
            <div className="absolute left-[55%] top-[10%] w-[30%] h-[40%] rounded-full bg-cyan-400 opacity-6 blur-[80px]" />
          </div>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
              Our <span className="text-glow">Services</span>
            </h1>
            <p className="mt-6 text-base md:text-lg text-white/60 max-w-xl mx-auto leading-relaxed">
              From a full-blown social media growth engine to the editing
              infrastructure behind other agencies. Here&rsquo;s how we help
              brands win attention.
            </p>
          </div>
        </section>

        {/* Signature offering */}
        <section className="relative px-8 md:px-16 lg:px-24 py-12">
          <div className="max-w-5xl mx-auto">
            <div
              className="relative overflow-hidden rounded-2xl border border-white/10 p-8 md:p-12"
              style={{ backgroundColor: "#0f0f0f" }}
            >
              <div className="absolute inset-0 pointer-events-none -z-0" aria-hidden="true">
                <div className="absolute left-[60%] top-[-20%] w-[50%] h-[120%] rounded-full opacity-12 blur-[80px]" style={{ background: "radial-gradient(ellipse at center, rgba(217,70,239,0.6) 0%, rgba(29,78,216,0.4) 60%, transparent 90%)" }} />
              </div>
              <div className="relative z-10">
                <span className="inline-block bg-white/10 border border-white/15 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
                  Signature Offering
                </span>
                <h2 className="mt-5 flex items-center gap-3 text-3xl md:text-4xl font-bold">
                  <Video className="text-glow" size={32} />
                  End-to-End Social Media Production
                </h2>
                <p className="mt-5 text-base md:text-lg text-white/65 max-w-2xl leading-relaxed">
                  Our flagship service. We run your entire short-form presence as
                  a long-term growth engine, not a handful of one-off posts.
                  Every month moves through the full cycle: overall strategy,
                  video ideation, script writing, talent sourcing, filming,
                  editing, uploading, engagement and reporting.
                </p>
                <p className="mt-4 text-base md:text-lg text-white/65 max-w-2xl leading-relaxed">
                  And because virality is iterative, we run it over months:
                  testing what works, optimising relentlessly, then building a
                  loyal community around your brand.
                </p>
                <Link
                  href="/#process"
                  className="inline-flex items-center gap-2 mt-7 px-6 py-3 text-sm text-white border border-white/20 bg-white/10 backdrop-blur-sm rounded-[var(--rounded-btn)] transition-all duration-300 hover:bg-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                >
                  See how the process works
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Other services grid */}
        <section className="relative px-8 md:px-16 lg:px-24 py-12 md:py-20">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {SERVICES.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="group h-full rounded-2xl border border-white/10 p-7 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,255,255,0.08),0_0_50px_rgba(255,255,255,0.05)]"
                  style={{ backgroundColor: "#141414" }}
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 bg-white/5">
                    <Icon className="text-white" size={22} />
                  </span>
                  <h3 className="mt-5 text-xl font-bold text-white">{title}</h3>
                  <p className="mt-3 text-sm text-white/60 leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative px-8 md:px-16 lg:px-24 py-12 md:py-20">
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal leading-tight">
              Not sure what you need? <span className="font-bold text-glow">Let&rsquo;s figure it out.</span>
            </h2>
            <p className="mt-5 text-base md:text-lg text-white/60 max-w-md mx-auto leading-relaxed">
              Tell us about your brand and goals, and we&rsquo;ll recommend the
              right mix, then send a strategy, timeline, and quote.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 mt-8 px-8 py-3 text-base text-white border border-white/20 bg-white/10 backdrop-blur-sm rounded-[var(--rounded-btn)] transition-all duration-300 hover:bg-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
            >
              Get in touch
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
