import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';

interface SlideItem {
  id: string;
  type: 'video' | 'image';
  src: string;
  alt: string;
}

const slides: SlideItem[] = [
  {
    id: 'drive-1',
    type: 'image',
    src: '/testimonials/drive_feedback_1.jpg',
    alt: 'Resultado Capilar 1 - Antes e Depois',
  },
  {
    id: 'drive-2',
    type: 'video',
    src: '/testimonials/drive_feedback_2.mp4',
    alt: 'Depoimento em Vídeo 2',
  },
  {
    id: 'drive-3',
    type: 'video',
    src: '/testimonials/drive_feedback_3.mp4',
    alt: 'Depoimento em Vídeo 3',
  },
  {
    id: 'drive-4',
    type: 'video',
    src: '/testimonials/drive_feedback_4.mp4',
    alt: 'Depoimento em Vídeo 4',
  },
  {
    id: 'drive-5',
    type: 'video',
    src: '/testimonials/drive_feedback_5.mp4',
    alt: 'Depoimento em Vídeo 5',
  },
  {
    id: 'drive-6',
    type: 'video',
    src: '/testimonials/drive_feedback_6.mp4',
    alt: 'Depoimento em Vídeo 6',
  },
  {
    id: 'drive-7',
    type: 'image',
    src: '/testimonials/drive_feedback_7.png',
    alt: 'Resultado Capilar 7',
  },
  {
    id: 'drive-8',
    type: 'video',
    src: '/testimonials/drive_feedback_8.mp4',
    alt: 'Depoimento em Vídeo 8',
  },
  {
    id: 'drive-9',
    type: 'video',
    src: '/testimonials/drive_feedback_9.mp4',
    alt: 'Depoimento em Vídeo 9',
  },
  {
    id: 'drive-10',
    type: 'video',
    src: '/testimonials/drive_feedback_10.mp4',
    alt: 'Depoimento em Vídeo 10',
  },
  {
    id: 'drive-11',
    type: 'video',
    src: '/testimonials/drive_feedback_11.mp4',
    alt: 'Depoimento em Vídeo 11',
  },
  {
    id: 'drive-12',
    type: 'image',
    src: '/testimonials/drive_feedback_12.png',
    alt: 'Resultado Capilar 12',
  },
  {
    id: 'drive-13',
    type: 'video',
    src: '/testimonials/drive_feedback_13.mp4',
    alt: 'Depoimento em Vídeo 13',
  },
];

export const TestimonialsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [slideWidth, setSlideWidth] = useState(372);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const updateWidth = () => {
      if (window.innerWidth < 640) {
        setSlideWidth(296); // 280px + 16px mx
      } else {
        setSlideWidth(372); // 340px + 32px mx
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 40) {
      nextSlide();
    } else if (diff < -40) {
      prevSlide();
    }
    touchStartX.current = null;
  };

  useEffect(() => {
    const videoElem = videoRef.current;
    if (slides[currentIndex].type === 'video' && videoElem) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              videoElem.play().catch(() => {});
            } else {
              videoElem.pause();
            }
          });
        },
        { threshold: 0.3 }
      );

      if (containerRef.current) {
        observer.observe(containerRef.current);
      }

      return () => observer.disconnect();
    }
  }, [currentIndex]);

  const toggleMute = () => {
    if (videoRef.current) {
      const nextState = !isMuted;
      videoRef.current.muted = nextState;
      setIsMuted(nextState);
    }
  };

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="w-full relative py-6 overflow-hidden touch-pan-y"
    >
      {/* Peeking Carousel Slider Stage */}
      <div className="relative w-full max-w-6xl mx-auto flex items-center justify-center min-h-[460px] sm:min-h-[620px]">
        <div
          className="flex transition-transform duration-500 ease-out items-center"
          style={{
            transform: `translateX(calc(50% - ${(currentIndex * slideWidth) + (slideWidth / 2)}px))`,
          }}
        >
          {slides.map((slide, idx) => {
            const isActive = currentIndex === idx;

            return (
              <div
                key={slide.id}
                onClick={() => setCurrentIndex(idx)}
                className={`shrink-0 w-[280px] sm:w-[340px] mx-2 sm:mx-4 cursor-pointer transition-all duration-500 rounded-3xl overflow-hidden bg-white border shadow-lg ${
                  isActive
                    ? 'scale-100 opacity-100 z-20 border-bordo/40 ring-4 ring-bordo/10 shadow-2xl'
                    : 'scale-90 opacity-55 z-10 border-tan-deep/20 hover:opacity-85'
                }`}
              >
                <div className="relative w-full h-[450px] sm:h-[580px] bg-gradient-to-br from-[#4A0E19] via-[#651524] to-[#2D060C] flex items-center justify-center p-2 sm:p-3">
                  {slide.type === 'video' ? (
                    <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-2xl bg-black/30">
                      <video
                        ref={isActive ? videoRef : null}
                        src={slide.src}
                        loop
                        muted={isMuted}
                        playsInline
                        autoPlay={isActive}
                        className="w-full h-full object-contain rounded-2xl"
                      />

                      {isActive && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleMute();
                          }}
                          className="absolute bottom-4 right-4 z-30 flex items-center gap-2 bg-bordo/90 hover:bg-bordo text-cream border border-cream/30 px-3.5 py-2 rounded-full backdrop-blur-md text-xs font-sans font-semibold shadow-lg transition-all active:scale-95"
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
                      )}
                    </div>
                  ) : (
                    <img
                      src={slide.src}
                      alt={slide.alt}
                      className="w-full h-full object-contain rounded-2xl"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating Navigation Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/95 hover:bg-white text-bordo border border-tan-deep/30 flex items-center justify-center shadow-xl backdrop-blur-md transition-all hover:scale-110 active:scale-95"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/95 hover:bg-white text-bordo border border-tan-deep/30 flex items-center justify-center shadow-xl backdrop-blur-md transition-all hover:scale-110 active:scale-95"
          aria-label="Próximo"
        >
          <ChevronRight className="w-6 h-6 stroke-[2.5]" />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex items-center justify-center gap-2.5 mt-6">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              currentIndex === idx
                ? 'w-8 bg-bordo'
                : 'w-2.5 bg-bordo/25 hover:bg-bordo/50'
            }`}
            aria-label={`Ir para depoimento ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
