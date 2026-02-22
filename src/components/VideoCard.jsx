import React from 'react';
import { Play } from 'lucide-react';

export const VideoCard = ({ video, compact, onVideoSelect }) => {
  return (
    <div 
      onClick={() => onVideoSelect(video)}
      className="aspect-[9/16] bg-zinc-900 rounded-xl relative overflow-hidden group border border-zinc-800 active:scale-95 transition-transform cursor-pointer"
    >
      <img 
        src={video.thumbnail_url} 
        alt="" 
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />
      
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className={`bg-accent/20 backdrop-blur-sm p-3 rounded-full ${compact ? 'scale-75' : ''}`}>
          <Play className="text-accent fill-accent" size={compact ? 20 : 28} />
        </div>
      </div>

      {!compact && (
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/90 to-transparent pointer-events-none">
          <p className="text-[10px] font-bold text-white truncate uppercase italic">{video.caption}</p>
          <p className="text-[8px] text-zinc-400">{video.views} views</p>
        </div>
      )}
    </div>
  );
};