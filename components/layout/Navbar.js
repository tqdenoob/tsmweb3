"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "/services", label: "Services" },
  { href: "/#case-studies", label: "Case Studies" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-0 z-100 isolate flex justify-center px-4 py-4 pointer-events-none">
      <nav className="pointer-events-auto relative w-full max-w-3xl md:w-auto flex items-center justify-between gap-6 md:gap-12 bg-white/10 backdrop-blur-xl border border-white/10 rounded-full pl-5 pr-3 md:pr-8 py-2.5 shadow-[0_4px_30px_rgba(7,89,133,0.12),0_8px_40px_rgba(29,78,216,0.06)]">
        {/* Full logo (black source recoloured to white for the dark bar) */}
        <Link href="/#top" aria-label="Third Spaces Marketing home" className="shrink-0" onClick={() => setOpen(false)}>
          <Image
            src="/tsm-logo-full.png"
            alt="Third Spaces Marketing"
            width={1697}
            height={425}
            priority
            className="h-7 md:h-9 w-auto"
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-9">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-white text-sm font-normal hover:opacity-80 transition-opacity"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="md:hidden flex h-9 w-9 items-center justify-center rounded-full text-white hover:bg-white/10 transition-colors"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Mobile dropdown */}
        {open && (
          <div className="md:hidden absolute right-0 top-[calc(100%+8px)] min-w-44 flex flex-col gap-1 bg-[#0c0c0c]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="px-4 py-2.5 rounded-xl text-white text-sm hover:bg-white/10 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </div>
  );
}
