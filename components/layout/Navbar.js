import Link from "next/link";

export default function Navbar() {
  return (
    <div className="sticky top-0 z-100 flex justify-center py-4 pointer-events-none">
      <nav className="pointer-events-auto inline-flex items-center gap-8 md:gap-12 bg-white/10 backdrop-blur-xl border border-white/10 rounded-full px-6 md:px-8 py-3 shadow-[0_4px_30px_rgba(7,89,133,0.12),0_8px_40px_rgba(29,78,216,0.06)]">
        {/* Logo */}
        <Link href="/" aria-label="Third Spaces Marketing home">
          <div className="w-9 h-9">
            <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path d="M28 8C20 8 14 14 14 22C14 26 16 29 19 31L14 42H22L25 35H28C36 35 42 29 42 22C42 14 36 8 28 8ZM28 28C24 28 21 25 21 22C21 18 24 15 28 15C32 15 35 18 35 22C35 25 32 28 28 28Z" fill="white"/>
              <path d="M32 35L35 42H43L38 31C41 29 43 26 43 22" stroke="white" strokeWidth="2" fill="none"/>
            </svg>
          </div>
        </Link>

        {/* Links */}
        <Link
          href="#case-studies"
          className="text-white text-sm font-normal hover:opacity-80 transition-opacity"
        >
          Case Studies
        </Link>
        <Link
          href="#pricing"
          className="text-white text-sm font-normal hover:opacity-80 transition-opacity"
        >
          Pricing
        </Link>
        <Link
          href="#contact"
          className="text-white text-sm font-normal hover:opacity-80 transition-opacity"
        >
          Contact
        </Link>
      </nav>
    </div>
  );
}
