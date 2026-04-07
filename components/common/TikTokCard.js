import Image from "next/image";
import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react";

function formatStat(value) {
  return value;
}

export default function TikTokCard({ title, image, stats }) {
  const sidebar = [
    { icon: Heart, count: stats.likes },
    { icon: MessageCircle, count: stats.comments },
    { icon: Share2, count: stats.shares },
    { icon: Bookmark, count: stats.saves },
  ];

  return (
    <div className="aspect-[9/16] w-full rounded-2xl overflow-hidden relative border border-white/10 select-none">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
        sizes="200px"
        priority
      />

      {/* View count badge */}
      <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm rounded-full px-2.5 py-1 z-10">
        <svg width="10" height="12" viewBox="0 0 10 12" fill="none" className="text-white">
          <path d="M1 1v10l8-5L1 1Z" fill="currentColor" />
        </svg>
        <span className="text-white text-xs font-semibold">{stats.views}</span>
      </div>

      {/* Right sidebar — engagement icons */}
      <div className="absolute right-2 bottom-16 flex flex-col items-center gap-3 z-10">
        {sidebar.map(({ icon: Icon, count }, i) => (
          <div key={i} className="flex flex-col items-center gap-0.5">
            <Icon size={20} className="text-white drop-shadow-md" />
            <span className="text-white text-[10px] font-semibold drop-shadow-md">
              {formatStat(count)}
            </span>
          </div>
        ))}
      </div>

      {/* Bottom gradient + title */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none" />
      <p className="absolute bottom-3 left-3 right-10 text-sm font-bold text-white z-10 drop-shadow-md">
        {title}
      </p>
    </div>
  );
}
