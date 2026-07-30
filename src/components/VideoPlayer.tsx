import React, { useState, useEffect, useRef } from 'react';

export default function VideoPlayer() {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Check saveData or prefers-reduced-motion
    const nav = navigator as unknown as { connection?: { saveData?: boolean } };
    const isSaveData = nav.connection?.saveData === true;
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isSaveData || isReducedMotion) {
      return; // Do not load video if saveData or reduced motion is active
    }

    const loadVideo = () => {
      const scheduleTask = window.requestIdleCallback || ((cb: () => void) => setTimeout(cb, 1000));
      scheduleTask(() => {
        setVideoSrc('/videos/pro-filler-video.mp4'); // 917 KB ultra-optimized video
      }, { timeout: 2000 });
    };

    if (document.readyState === 'complete') {
      loadVideo();
    } else {
      window.addEventListener('load', loadVideo, { once: true });
    }
  }, []);

  // Pause video when tab is hidden
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (videoRef.current) {
        if (document.hidden) {
          videoRef.current.pause();
        } else if (isVideoLoaded) {
          videoRef.current.play().catch(() => {});
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isVideoLoaded]);

  return (
    <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-[0_18px_40px_rgba(78,20,28,0.14)] bg-[#3D0A14] flex items-center justify-center">
      {/* Instant WebP Poster Image (20 KB) */}
      <img
        src="/videos/hero-poster.webp"
        alt="Reconstrução Molecular em 3 Camadas"
        width={1280}
        height={720}
        loading="eager"
        decoding="async"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 z-10 ${
          isVideoLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      />

      {/* Progressive Video Element */}
      {videoSrc && (
        <video
          ref={videoRef}
          muted
          playsInline
          loop
          preload="none"
          onCanPlay={() => {
            setIsVideoLoaded(true);
            videoRef.current?.play().catch(() => {});
          }}
          className="w-full h-full object-cover rounded-3xl z-0"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
