export default function BrandCarousel() {
  const brands = [
    { name: "Disney On Ice", image: "/images/brands/Disney.png", width: 120 },
    { name: "Coach", image: "/images/brands/coach.png", width: 100 },
    { name: "A Hot Hideout", image: "/images/brands/ahothideout.png", width: 120 },
    { name: "Genki Sushi", image: "/images/brands/genki.png", width: 120 },
    { name: "Beans & Beats", image: "/images/brands/bnb.png", width: 120 },
    { name: "Aramco", image: "/images/brands/aramco.png", width: 120 },
    { name: "Mediacorp", image: "/images/brands/mediacorp.png", width: 120 },
    { name: "Guzman y Gomez", image: "/images/brands/guzman.png", width: 120 },
    { name: "Texas Chicken", image: "/images/brands/texaschicken.png", width: 120 },
    { name: "Ajoomma", image: "/images/brands/ajoomma.png", width: 100 },
    { name: "Nova", image: "/images/brands/nova.png", width: 100 },
    { name: "Music House", image: "/images/brands/musichouse.png", width: 120 },
    { name: "Whale Tea", image: "/images/brands/whaletea.png", width: 100 },
    { name: "Yakiniku", image: "/images/brands/yakiniku.png", width: 120 },
  ];

  return (
    <section className="px-8 md:px-16 lg:px-24 py-16 md:py-24">
      <div className="max-w-5xl lg:max-w-none mx-auto text-center">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal leading-tight mb-12">
          Trusted by{" "}
          <span className="font-bold text-5xl md:text-6xl lg:text-7xl align-baseline text-glow">
            100+
          </span>{" "}
          of{" "}
          <span className="font-bold text-glow">
            Singapore&rsquo;s top brands
          </span>
        </h2>
      </div>

      {/* Marquee container */}
      <div className="relative overflow-hidden">
        {/* Fade mask — left */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        {/* Fade mask — right */}
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        {/* Scrolling track: two identical sets for seamless loop */}
        <div className="flex animate-marquee w-max">
          {/* First set */}
          <div className="flex items-center gap-16 shrink-0 pr-16">
            {brands.map((brand, i) => (
              <div
                key={`a-${i}`}
                className="h-10 md:h-12 flex items-center justify-center opacity-80 flex-shrink-0"
                style={{ width: brand.width }}
              >
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ))}
          </div>

          {/* Duplicate set for seamless loop */}
          <div className="flex items-center gap-16 shrink-0 pr-16" aria-hidden="true">
            {brands.map((brand, i) => (
              <div
                key={`b-${i}`}
                className="h-10 md:h-12 flex items-center justify-center opacity-80 flex-shrink-0"
                style={{ width: brand.width }}
              >
                <img
                  src={brand.image}
                  alt=""
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
