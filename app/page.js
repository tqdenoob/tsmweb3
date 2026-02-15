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
    <div className="min-h-screen bg-grid">
      <Navbar />
      <main>
        <Hero />
        <Statistics />
        <Process />
        <BrandCarousel />
        <CaseStudyCarousel />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
