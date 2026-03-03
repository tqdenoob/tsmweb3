const restShadow =
  "0 0 20px rgba(255,255,255,0.06), 0 0 50px rgba(255,255,255,0.04), 0 0 100px rgba(255,255,255,0.02)";

export default function StepCard({ number, title, description }) {
  return (
    <div className="relative w-full group">
      <div
        className="border border-white/10 rounded-xl p-6 transition-all duration-300 ease-out hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(255,255,255,0.09),0_0_50px_rgba(255,255,255,0.06),0_0_100px_rgba(255,255,255,0.03)]"
        style={{
          backgroundColor: "#141414",
          boxShadow: restShadow,
        }}
      >
        <h3 className="text-base font-bold text-white mb-3">
          Step {number}: {title}
        </h3>
        <p className="text-sm text-white/60 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
