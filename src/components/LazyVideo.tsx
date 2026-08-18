import React, { useState, useEffect, useRef } from 'react';

interface LazyVideoProps {
  src: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
}

export default function LazyVideo({
  src,
  poster,
  className = '',
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true
}: LazyVideoProps) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldLoad) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '250px 0px', threshold: 0.01 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [shouldLoad]);

  // Pause video when offscreen
  useEffect(() => {
    if (!shouldLoad) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (videoRef.current) {
          if (entries[0].isIntersecting) {
            videoRef.current.play().catch(() => {});
          } else {
            videoRef.current.pause();
          }
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <video
        ref={videoRef}
        poster={poster}
        muted={muted}
        playsInline={playsInline}
        loop={loop}
        autoPlay={autoPlay}
        preload="none"
        className={className}
      >
        {shouldLoad && <source src={src} type="video/mp4" />}
      </video>
    </div>
  );
}
