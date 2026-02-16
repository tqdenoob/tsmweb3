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
      <div className="w-[2032.52px] h-[942.17px] relative blur-3xl">
    <div className="w-[814.12px] h-96 left-[1154.87px] top-[408.13px] absolute origin-top-left rotate-[-6.88deg] bg-blue-700 rounded-full blur-[200px]" />
    <div className="w-72 h-64 left-[1510.41px] top-[373.05px] absolute bg-cyan-400 rounded-full blur-[100px]" />
    <div className="w-80 h-72 left-[1555.51px] top-[227.30px] absolute origin-top-left rotate-[-10.82deg] bg-cyan-400 rounded-full blur-[100px]" />
    <div className="w-[1281.12px] h-[514.76px] left-[59.28px] top-[204.81px] absolute bg-sky-800 rounded-full blur-[150px]" />
    <div className="w-[617.02px] h-64 left-[1073.53px] top-[457.31px] absolute origin-top-left rotate-[6.51deg] bg-fuchsia-500 rounded-full blur-[150px]" />
    <div className="w-[489.34px] h-52 left-[1136.50px] top-[506.34px] absolute origin-top-left rotate-[9deg] bg-pink-300 rounded-full blur-[100px]" />
    <div className="w-[458.79px] h-64 left-[830.63px] top-[500.90px] absolute bg-teal-400 rounded-full blur-[150px]" />
    <div className="w-64 h-40 left-[1114.15px] top-[558.61px] absolute bg-orange-200 rounded-full blur-[100px]" />
    </div>
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
