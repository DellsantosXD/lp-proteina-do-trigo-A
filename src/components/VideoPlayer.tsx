import React, { useState, useEffect } from 'react';
import { Play } from 'lucide-react';

export default function VideoPlayer() {
  const [shouldLoadIframe, setShouldLoadIframe] = useState(false);

  useEffect(() => {
    // Defer Vimeo iframe to unblock FCP & LCP rendering
    const timer = setTimeout(() => {
      setShouldLoadIframe(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      onClick={() => setShouldLoadIframe(true)}
      className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-[0_18px_40px_rgba(78,20,28,0.14)] bg-gradient-to-br from-[#4A0E19] via-[#651524] to-[#2D060C] flex items-center justify-center cursor-pointer group"
    >
      {shouldLoadIframe ? (
        <iframe 
          title="Reconstrução Molecular em 3 Camadas - Vídeo Demonstrativo"
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
      ) : (
        <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center text-cream">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-bordo-deep/90 border-2 border-cream/40 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
            <Play className="w-8 h-8 sm:w-10 sm:h-10 text-cream fill-cream ml-1" />
          </div>
          <span className="mt-4 text-xs sm:text-sm font-sans font-bold uppercase tracking-widest text-cream/90">
            Assistir Reconstrução Molecular em 3 Camadas
          </span>
        </div>
      )}
    </div>
  );
}
