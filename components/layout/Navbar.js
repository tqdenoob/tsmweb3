import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar px-8 md:px-16 lg:px-24 py-8">
      <div className="navbar-start">
        <Link href="/" aria-label="Third Spaces Marketing home">
          {/* TODO: Replace with actual Third Spaces logo SVG */}
          <div className="w-14 h-14">
            <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path d="M28 8C20 8 14 14 14 22C14 26 16 29 19 31L14 42H22L25 35H28C36 35 42 29 42 22C42 14 36 8 28 8ZM28 28C24 28 21 25 21 22C21 18 24 15 28 15C32 15 35 18 35 22C35 25 32 28 28 28Z" fill="white"/>
              <path d="M32 35L35 42H43L38 31C41 29 43 26 43 22" stroke="white" strokeWidth="2" fill="none"/>
            </svg>
          </div>
        </Link>
      </div>
      <div className="navbar-end gap-10 md:gap-16">
        <Link
          href="#case-studies"
          className="text-white text-base font-normal hover:opacity-80 transition-opacity"
        >
          Case Studies
        </Link>
        <Link
          href="#pricing"
          className="text-white text-base font-normal hover:opacity-80 transition-opacity"
        >
          Pricing
        </Link>
        <Link
          href="#contact"
          className="text-white text-base font-normal hover:opacity-80 transition-opacity"
        >
          Contact
        </Link>
      </div>
    </nav>
  );
}
