import Link from "next/link";
import { Instagram } from "lucide-react";

function TikTokIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.18 8.18 0 0 0 4.76 1.52V6.84a4.83 4.83 0 0 1-1-.15Z" />
    </svg>
  );
}

function WhatsAppIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    /* NOTE: Section boundaries must remain seamless — no margin between sections, use padding only */
    <footer className="relative px-8 md:px-16 lg:px-24 pt-12 pb-8">
      {/* Faint glow — uses only approved palette: sky-800, blue-700 */}
      <div className="absolute inset-0 pointer-events-none -z-10" aria-hidden="true">
        <div className="absolute left-[35%] top-[10%] w-[30%] h-[50%] rounded-full bg-sky-800 opacity-10 blur-[120px]" />
        <div className="absolute left-[45%] top-[20%] w-[15%] h-[30%] rounded-full bg-blue-700 opacity-8 blur-[80px]" />
      </div>
      <div className="max-w-6xl mx-auto">
        {/* Top row: logo, links, social icons */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <Link href="/" aria-label="Third Spaces Marketing home">
            {/* TODO: Replace with actual Third Spaces logo SVG */}
            <div className="w-14 h-14">
              <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path d="M28 8C20 8 14 14 14 22C14 26 16 29 19 31L14 42H22L25 35H28C36 35 42 29 42 22C42 14 36 8 28 8ZM28 28C24 28 21 25 21 22C21 18 24 15 28 15C32 15 35 18 35 22C35 25 32 28 28 28Z" fill="white"/>
                <path d="M32 35L35 42H43L38 31C41 29 43 26 43 22" stroke="white" strokeWidth="2" fill="none"/>
              </svg>
            </div>
          </Link>

          {/* Nav links */}
          <div className="flex items-center gap-10 md:gap-14">
            <Link href="#contact" className="text-white text-sm font-normal hover:opacity-80 transition-opacity">
              Contact us
            </Link>
            <Link href="#case-studies" className="text-white text-sm font-normal hover:opacity-80 transition-opacity">
              Case Studies
            </Link>
            <Link href="#pricing" className="text-white text-sm font-normal hover:opacity-80 transition-opacity">
              Pricing
            </Link>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-6">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white hover:opacity-80 transition-opacity">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-white hover:opacity-80 transition-opacity">
              <TikTokIcon className="w-5 h-5" />
            </a>
            <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-white hover:opacity-80 transition-opacity">
              <WhatsAppIcon className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 mt-8 mb-6"></div>

        {/* Copyright */}
        <p className="text-center text-sm text-white/60">
          &copy; Copyright 2025, All Rights Reserved by Third Spaces Marketing
        </p>
      </div>
    </footer>
  );
}
