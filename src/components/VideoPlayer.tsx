import React from 'react';

export default function VideoPlayer() {
  return (
    <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-[0_18px_40px_rgba(78,20,28,0.14)]">
      <iframe 
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
        allowFullScreen 
        height="100%" 
        src="https://player.vimeo.com/video/1210611121?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&muted=1&playsinline=1&controls=0" 
        width="100%" 
        referrerPolicy="strict-origin-when-cross-origin"
        style={{
          border: 'none',
          width: '100%',
          height: '100%',
          position: 'absolute',
          left: 0,
          top: 0,
          overflow: 'hidden'
        }}
      />
    </div>
  );
}
