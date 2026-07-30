import React, { useState, useEffect, useRef } from 'react';

export default function VideoPlayer() {
  const [videoSrcs, setVideoSrcs] = useState<{ webm: string; mp4: string } | null>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Check saveData or prefers-reduced-motion
    const nav = navigator as unknown as { connection?: { saveData?: boolean } };
    const isSaveData = nav.connection?.saveData === true;
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isSaveData || isReducedMotion) {
      return;
    }

    const loadVideo = () => {
      const scheduleTask = window.requestIdleCallback || ((cb: () => void) => setTimeout(cb, 1500));
      scheduleTask(() => {
        setVideoSrcs({
          webm: '/videos/pro-filler-video-mobile.webm',
          mp4: '/videos/pro-filler-video.mp4'
        });
      }, { timeout: 3000 });
    };

    if (document.readyState === 'complete') {
      loadVideo();
    } else {
      window.addEventListener('load', loadVideo, { once: true });
    }
  }, []);

  useEffect(() => {
    if (videoSrcs && videoRef.current) {
      const vid = videoRef.current;
      vid.load();
      const playVideo = () => {
        vid.play().then(() => {
          setIsVideoLoaded(true);
        }).catch(() => {});
      };

      vid.addEventListener('canplay', playVideo, { once: true });
      return () => vid.removeEventListener('canplay', playVideo);
    }
  }, [videoSrcs]);

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
      <video
        ref={videoRef}
        muted
        playsInline
        loop
        preload="none"
        aria-label="Demonstração da Reconstrução Molecular em 3 Camadas"
        className="w-full h-full object-cover rounded-3xl z-0"
      >
        {videoSrcs && (
          <>
            <source src={videoSrcs.webm} type="video/webm" />
            <source src={videoSrcs.mp4} type="video/mp4" />
          </>
        )}
      </video>
    </div>
  );
}
