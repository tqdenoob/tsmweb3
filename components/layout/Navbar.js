import Image from "next/image";

export default function Navbar() {
  return (
    <div className="sticky top-0 z-100 isolate flex justify-center py-4 pointer-events-none">
      <nav className="pointer-events-auto inline-flex items-center gap-8 md:gap-12 bg-white/10 backdrop-blur-xl border border-white/10 rounded-full px-6 md:px-8 py-3 shadow-[0_4px_30px_rgba(7,89,133,0.12),0_8px_40px_rgba(29,78,216,0.06)]">
        {/* Logo */}
        <a href="#top" aria-label="Third Spaces Marketing home">
          <Image
            src="/tsm-logo.png"
            alt="TSM Logo"
            width={72}
            height={72}
            className="w-10 h-10 object-contain"
          />
        </a>

        {/* Links */}
        <a
          href="#case-studies"
          className="text-white text-sm font-normal hover:opacity-80 transition-opacity"
        >
          Case Studies
        </a>
        <a
          href="#contact"
          className="text-white text-sm font-normal hover:opacity-80 transition-opacity"
        >
          Contact
        </a>
      </nav>
    </div>
  );
}
