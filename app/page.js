import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Statistics from "@/components/sections/Statistics";
import Process from "@/components/sections/Process";
import BrandCarousel from "@/components/sections/BrandCarousel";
import CaseStudyCarousel from "@/components/sections/CaseStudyCarousel";
import CallToAction from "@/components/sections/CallToAction";

export default function Home() {
  return (
    <div id="top" className="min-h-screen bg-grid overflow-x-clip">
      <Navbar />
      {/* isolate creates one stacking context for all glow elements — prevents them from
           falling behind the body background. DO NOT add isolate/overflow-clip to individual
           sections — that creates black seams at section boundaries. */}
      <main className="isolate relative z-0">
        <Hero />
        <Statistics />
        <Process />
        <div className="relative overflow-hidden">
          <div
            className="absolute -inset-x-[20%] -top-[5%] bottom-0 pointer-events-none"
            aria-hidden="true"
          >
            <div className="absolute left-[3%] top-[28%] w-[60%] h-[50%] rounded-full opacity-30 blur-[150px]" style={{ background: "radial-gradient(ellipse at center, rgba(7,89,133,0.9) 0%, rgba(29,78,216,0.6) 50%, transparent 80%)" }} />
            <div className="absolute left-[40%] top-[30%] w-[45%] h-[40%] rounded-full opacity-25 blur-[150px]" style={{ background: "radial-gradient(ellipse at center, rgba(217,70,239,0.8) 0%, rgba(249,168,212,0.4) 50%, transparent 80%)" }} />
            <div className="absolute left-[65%] top-[22%] w-[30%] h-[35%] rounded-full opacity-30 blur-[120px]" style={{ background: "radial-gradient(ellipse at center, rgba(34,211,238,0.9) 0%, rgba(45,212,191,0.5) 50%, transparent 80%)" }} />
          </div>
        <BrandCarousel />
        {/* Gradient background spanning case studies + CTA + footer */}
        <CaseStudyCarousel />
        <CallToAction />
          <Footer />
        </div>
      </main>
    </div>
  );
}
