export default function BrandCarousel() {
  /*
    TODO: Replace placeholder brand logos with actual exported images.
    Place brand logo files in public/images/brands/ as SVG or PNG.
  */

  const brands = [
    { name: "Disney On Ice", width: 120 },
    { name: "COACH", width: 100 },
    { name: "Jewel Changi Airport", width: 120 },
    { name: "Hitachi Vantara", width: 120 },
    { name: "Mandai Wildlife Reserve", width: 100 },
    { name: "Honda", width: 50 },
    { name: "Mala", width: 60 },
  ];

  return (
    <section className="px-8 md:px-16 lg:px-24 py-16 md:py-24">
      <div className="max-w-5xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal leading-tight mb-12">
          Trusted by{" "}
          <span className="font-bold text-5xl md:text-6xl align-baseline text-glow">
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
        <div className="flex items-center gap-16 animate-marquee w-max">
          {/* First set */}
          {brands.map((brand, i) => (
            <div
              key={`a-${i}`}
              className="h-10 md:h-12 flex items-center justify-center opacity-80 flex-shrink-0"
              style={{ width: brand.width }}
            >
              {/* TODO: Replace with <Image> once brand logo assets are exported */}
              <span className="text-white text-xs font-medium text-center leading-tight whitespace-nowrap">
                {brand.name}
              </span>
            </div>
          ))}

          {/* Duplicate set for seamless loop */}
          {brands.map((brand, i) => (
            <div
              key={`b-${i}`}
              className="h-10 md:h-12 flex items-center justify-center opacity-80 flex-shrink-0"
              style={{ width: brand.width }}
              aria-hidden="true"
            >
              <span className="text-white text-xs font-medium text-center leading-tight whitespace-nowrap">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
