import React from 'react';
import { Play } from 'lucide-react';

export function VideoCard({ video, compact, onVideoSelect }) {
  return (
    <div 
      onClick={() => onVideoSelect(video)}
      className="relative group cursor-pointer overflow-hidden rounded-xl bg-zinc-900 aspect-[9/16] transition-transform active:scale-95"
    >
      {/* Thumbnail Image */}
      <img 
        src={video.thumbnail_url || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&h=700&auto=format&fit=crop"} 
        alt={video.caption}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

      {/* Play Icon (Shows on Hover) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="bg-accent p-3 rounded-full shadow-lg shadow-accent/20">
          <Play size={24} fill="currentColor" />
        </div>
      </div>

      {/* Video Info */}
      {!compact && (
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <p className="text-xs font-bold line-clamp-2 leading-tight uppercase italic tracking-tighter">
            {video.caption}
          </p>
          <div className="flex items-center gap-1.5 mt-1">
             <div className="w-1 h-1 bg-accent rounded-full animate-pulse" />
             <p className="text-[10px] text-zinc-400 font-bold">{video.views} views</p>
          </div>
        </div>
      )}
    </div>
  );
}