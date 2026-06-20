"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ExternalLink } from "lucide-react";

export default function ReelModal({ card, onClose }) {
  // Close on Escape + lock body scroll while open.
  useEffect(() => {
    if (!card) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [card, onClose]);

  return (
    <AnimatePresence>
      {card && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`Thought process behind our ${card.category} reel`}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          <motion.div
            className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto scrollbar-hide rounded-2xl border border-white/10 bg-[#0c0c0c] shadow-[0_0_60px_rgba(7,89,133,0.25)]"
            initial={{ scale: 0.94, y: 16 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.94, y: 16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-3 right-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-white transition-colors hover:bg-white/20"
            >
              <X size={18} />
            </button>

            <div className="flex flex-col md:flex-row">
              {/* Embedded reel */}
              <div className="md:w-[340px] shrink-0 bg-black p-4 flex justify-center">
                <iframe
                  src={card.embedUrl}
                  title={`${card.category} reel`}
                  className="w-full max-w-[320px] h-[560px] rounded-xl border-0"
                  loading="lazy"
                  allow="autoplay; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                  scrolling="no"
                />
              </div>

              {/* Thought process infographic */}
              <div className="flex-1 p-6 md:p-7">
                <span className="inline-block bg-white/10 border border-white/15 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
                  {card.category}
                </span>
                <h3 className="mt-4 text-2xl font-bold text-glow">
                  The thought process
                </h3>

                {/* Stats row */}
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                  <span className="text-white"><span className="font-bold">{card.stats.views}</span> <span className="text-white/50">views</span></span>
                  <span className="text-white"><span className="font-bold">{card.stats.likes}</span> <span className="text-white/50">likes</span></span>
                  <span className="text-white"><span className="font-bold">{card.stats.comments}</span> <span className="text-white/50">comments</span></span>
                  <span className="text-white"><span className="font-bold">{card.stats.shares}</span> <span className="text-white/50">shares</span></span>
                  <span className="text-white"><span className="font-bold">{card.stats.saves}</span> <span className="text-white/50">saves</span></span>
                </div>

                {/* Steps */}
                <ol className="mt-6 space-y-5">
                  {card.thoughtProcess.map((step, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-sm font-bold text-glow">
                        {i + 1}
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-white">{step.label}</h4>
                        <p className="mt-1 text-sm text-white/60 leading-relaxed">{step.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>

                <a
                  href={card.reelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-7 px-5 py-2.5 text-sm text-white border border-white/20 bg-white/10 backdrop-blur-sm rounded-[var(--rounded-btn)] transition-all duration-300 hover:bg-white/20"
                >
                  Watch on {card.platform === "tiktok" ? "TikTok" : "Instagram"}
                  <ExternalLink size={15} />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
