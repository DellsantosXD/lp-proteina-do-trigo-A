import React, { useState, useEffect } from 'react';

export default function VideoPlayer() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Automatically trigger video autoplay 1s after initial paint
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-[0_18px_40px_rgba(78,20,28,0.14)] bg-[#3D0A14] flex items-center justify-center">
      {isReady ? (
        <video
          src="/videos/hero-reconstrucao.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover rounded-3xl"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#4A0E19] via-[#651524] to-[#2D060C] text-cream">
          <div className="w-12 h-12 rounded-full bg-[#4E141C] border border-cream/30 flex items-center justify-center">
            <svg className="w-6 h-6 text-cream fill-cream ml-0.5" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
