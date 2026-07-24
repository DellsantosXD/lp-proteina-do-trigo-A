import React, { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface VideoTestimonialCardProps {
  videoSrc: string;
  title: string;
  badge: string;
  subtitle: string;
  quote: string;
}

export const VideoTestimonialCard: React.FC<VideoTestimonialCardProps> = ({
  videoSrc,
  title,
  badge,
  subtitle,
  quote,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const videoElem = videoRef.current;
    const containerElem = containerRef.current;
    if (!videoElem || !containerElem) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoElem
              .play()
              .then(() => setIsPlaying(true))
              .catch(() => setIsPlaying(false));
          } else {
            videoElem.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.35 }
    );

    observer.observe(containerElem);

    return () => {
      observer.disconnect();
    };
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  return (
    <div
      ref={containerRef}
      className="bg-white border border-tan-deep/25 rounded-3xl p-4 sm:p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between md:col-span-2 max-w-3xl mx-auto w-full"
    >
      <div className="relative overflow-hidden rounded-2xl border border-tan-deep/20 mb-5 bg-black aspect-[9/16] max-h-[600px] w-full mx-auto flex items-center justify-center">
        <video
          ref={videoRef}
          src={videoSrc}
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover rounded-2xl"
        />

        {/* Audio Mute / Unmute Floating Toggle Button */}
        <button
          onClick={toggleMute}
          className="absolute bottom-4 right-4 z-20 flex items-center gap-2 bg-bordo/80 hover:bg-bordo text-cream border border-cream/30 px-3.5 py-2 rounded-full backdrop-blur-md text-xs font-sans font-semibold shadow-lg transition-all active:scale-95"
          aria-label={isMuted ? 'Ativar Áudio' : 'Silenciar Áudio'}
        >
          {isMuted ? (
            <>
              <VolumeX className="w-4 h-4 text-cream/70" />
              <span>Ativar Som</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 text-rose animate-pulse" />
              <span>Som Ativado</span>
            </>
          )}
        </button>
      </div>

      <div className="space-y-2 px-2 pb-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-bordo bg-bordo/10 px-3 py-1 rounded-full">
            {badge}
          </span>
          <div className="flex text-amber-500 text-xs">★★★★★</div>
        </div>
        <h3 className="font-serif font-bold text-xl text-bordo pt-1">
          {title}
        </h3>
        <p className="text-xs font-mono text-bordo/70 uppercase font-semibold">
          {subtitle}
        </p>
        <p className="text-sm font-sans text-ink-soft italic leading-relaxed pt-1">
          "{quote}"
        </p>
      </div>
    </div>
  );
};
