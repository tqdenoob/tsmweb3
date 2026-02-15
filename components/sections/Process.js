import StepCard from "@/components/common/StepCard";

/* L-shaped arrow: goes DOWN then RIGHT → */
function ArrowDownRight() {
  return (
    <div className="relative w-20 h-12">
      <div className="absolute top-0 left-0 h-full w-0 border-l border-white/30" />
      <div className="absolute bottom-0 left-0 w-full h-0 border-t border-white/30" />
      {/* Arrowhead → */}
      <svg
        className="absolute bottom-[-4px] right-[-6px] text-white/30"
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="currentColor"
      >
        <path d="M0 0 L10 5 L0 10 Z" />
      </svg>
    </div>
  );
}

/* L-shaped arrow: goes RIGHT then DOWN ↓ */
function ArrowRightDown() {
  return (
    <div className="relative w-20 h-12">
      <div className="absolute top-0 left-0 w-full h-0 border-t border-white/30" />
      <div className="absolute top-0 right-0 h-full w-0 border-l border-white/30" />
      {/* Arrowhead ↓ */}
      <svg
        className="absolute bottom-[-6px] right-[-4px] text-white/30"
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="currentColor"
      >
        <path d="M0 0 L5 10 L10 0 Z" />
      </svg>
    </div>
  );
}

export default function Process() {
  return (
    <section className="px-8 md:px-16 lg:px-24 py-20 md:py-32">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal leading-tight">
            Marketing campaigns that
            <br />
            <span className="italic font-bold text-glow">actually work</span>
          </h2>
          <p className="mt-6 text-sm md:text-base text-white/50 max-w-2xl mx-auto leading-relaxed">
            We got sick of dinosaur-aged companies using outdated marketing
            strategies from their textbooks, so we created our own process to
            share real stories that resonate with the new generation.
          </p>
        </div>

        {/* Staircase steps - centered layout */}
        <div className="flex flex-col max-w-3xl mx-auto">
          {/* Step 1 - left */}
          <div className="self-start">
            <StepCard
              number={1}
              title="Ideation"
              description="We meet up with you to discuss your campaign goals, and ideate and script content."
            />
          </div>

          {/* Arrow 1: ↓ then → */}
          <div className="self-start ml-12 my-2">
            <ArrowDownRight />
          </div>

          {/* Step 2 - center */}
          <div className="self-center">
            <StepCard
              number={2}
              title="Production"
              description="We meet your team to produce personalised videos that grab people&#39;s attention."
            />
          </div>

          {/* Arrow 2: → then ↓ */}
          <div className="self-center ml-48 my-2">
            <ArrowRightDown />
          </div>

          {/* Step 3 - right */}
          <div className="self-end">
            <StepCard
              number={3}
              title="Optimisation"
              description="We analyse our campaigns and identify areas of improvement to increase long-term engagement."
              variant="blue"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
