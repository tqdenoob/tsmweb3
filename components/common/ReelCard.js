"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, MessageCircle, Share2, Bookmark, Repeat2, Play } from "lucide-react";

// Possible engagement metrics in display order. A card only renders the ones
// its `stats` actually provides.
const METRICS = [
  ["likes", Heart],
  ["comments", MessageCircle],
  ["shares", Share2],
  ["saves", Bookmark],
  ["reposts", Repeat2],
];

/**
 * Lightweight hero reel card: a poster (or gradient placeholder) with a
 * category pill + engagement stats overlay. Clicking the front card opens the
 * thought-process modal — the real reel is embedded there, not in the orbit,
 * to keep the carousel fast.
 */
export default function ReelCard({ category, accent, poster, stats, interactive, onClick }) {
  const [posterFailed, setPosterFailed] = useState(false);

  const sidebar = METRICS.filter(([key]) => stats[key] != null).map(([key, icon]) => ({
    icon,
    count: stats[key],
  }));

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={
        interactive
          ? `See the thought process behind our ${category} reel`
          : `Bring the ${category} reel to the front`
      }
      className="group block aspect-[9/16] w-full rounded-2xl overflow-hidden relative border border-white/10 select-none text-left cursor-pointer"
    >
      {/* Poster or gradient placeholder */}
      {poster && !posterFailed ? (
        <Image
          src={poster}
          alt={`${category} reel`}
          fill
          className="object-cover"
          sizes="200px"
          onError={() => setPosterFailed(true)}
        />
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${accent}`}>
          <div className="absolute inset-0 bg-[#0a0a0a]/40" />
        </div>
      )}

      {/* View count badge */}
      <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm rounded-full px-2.5 py-1 z-10">
        <svg width="10" height="12" viewBox="0 0 10 12" fill="none" className="text-white">
          <path d="M1 1v10l8-5L1 1Z" fill="currentColor" />
        </svg>
        <span className="text-white text-xs font-semibold">{stats.views}</span>
      </div>

      {/* Category pill */}
      <div className="absolute top-3 right-3 z-10">
        <span className="inline-block bg-white/15 backdrop-blur-sm border border-white/15 rounded-full px-2.5 py-1 text-[10px] font-semibold text-white">
          {category}
        </span>
      </div>

      {/* Centre play affordance — only the interactive front card invites a tap */}
      {interactive && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm border border-white/20 transition-transform duration-300 group-hover:scale-110">
            <Play size={20} className="text-white translate-x-[1px]" fill="currentColor" />
          </span>
        </div>
      )}

      {/* Right sidebar — engagement icons */}
      <div className="absolute right-2 bottom-16 flex flex-col items-center gap-3 z-10">
        {sidebar.map(({ icon: Icon, count }, i) => (
          <div key={i} className="flex flex-col items-center gap-0.5">
            <Icon size={20} className="text-white drop-shadow-md" />
            <span className="text-white text-[10px] font-semibold drop-shadow-md">{count}</span>
          </div>
        ))}
      </div>

      {/* Bottom gradient + category label */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none" />
      <p className="absolute bottom-3 left-3 right-10 text-sm font-bold text-white z-10 drop-shadow-md">
        {category}
      </p>
    </button>
  );
}
