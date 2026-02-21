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
    <div className="min-h-screen bg-grid overflow-x-clip">
      <Navbar />
      {/* isolate creates one stacking context for all glow elements — prevents them from
           falling behind the body background. DO NOT add isolate/overflow-clip to individual
           sections — that creates black seams at section boundaries. */}
      <main className="isolate">
        <Hero />
        <Statistics />
        <Process />
        <div className="relative">
          <div
            className="absolute -inset-x-[20%] -top-[5%] -bottom-[10%] pointer-events-none"
            aria-hidden="true"
          >
            <div className="absolute left-[3%] top-[30%] w-[65%] h-[45%] rounded-full bg-sky-800 opacity-35 blur-[150px]" />
            <div className="absolute left-[40%] top-[40%] w-[24%] h-[20%] rounded-full bg-teal-400 opacity-25 blur-[120px]" />
            <div className="absolute left-[53%] top-[35%] w-[33%] h-[28%] rounded-full bg-fuchsia-500 opacity-30 blur-[150px]" />
            <div className="absolute left-[57%] top-[42%] w-[26%] h-[20%] rounded-full bg-pink-300 opacity-20 blur-[100px]" />
            <div className="absolute left-[45%] top-[33%] w-[40%] h-[25%] rounded-full bg-blue-700 opacity-25 blur-[200px]" />
            <div className="absolute left-[76%] top-[30%] w-[16%] h-[18%] rounded-full bg-cyan-400 opacity-35 blur-[100px]" />
            <div className="absolute left-[78%] top-[22%] w-[17%] h-[20%] rounded-full bg-cyan-400 opacity-30 blur-[100px]" />
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
