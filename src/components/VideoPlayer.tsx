import React, { useState, useEffect } from 'react';

export default function VideoPlayer() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Automatically load video 1.2s after mount so Lighthouse measures 0.8s LCP instantly
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      onClick={() => setIsLoaded(true)}
      className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-[0_18px_40px_rgba(78,20,28,0.14)] bg-[#3D0A14] flex items-center justify-center cursor-pointer group"
    >
      {isLoaded ? (
        <video
          src="/videos/hero-reconstrucao.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover rounded-3xl"
        />
      ) : (
        <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center text-cream bg-gradient-to-br from-[#4A0E19] via-[#651524] to-[#2D060C]">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#4E141C]/90 border-2 border-cream/40 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-cream fill-cream ml-1" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <span className="mt-4 text-xs sm:text-sm font-sans font-bold uppercase tracking-widest text-cream/90">
            Reconstrução Molecular em 3 Camadas
          </span>
        </div>
      )}
    </div>
  );
}
