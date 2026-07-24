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
    id: 'video-1',
    type: 'video',
    src: '/videos/depoimento-video-1.mp4',
    alt: 'Depoimento em Vídeo de Paciente',
  },
  {
    id: 'img-1',
    type: 'image',
    src: '/results/resultado-1.jpg',
    alt: 'Resultado Capilar 1 - Roberta Mazoni',
  },
  {
    id: 'img-2',
    type: 'image',
    src: '/results/resultado-2.jpg',
    alt: 'Resultado Capilar 2 - Mari',
  },
  {
    id: 'img-3',
    type: 'image',
    src: '/results/resultado-3.jpg',
    alt: 'Relato WhatsApp 1',
  },
  {
    id: 'img-4',
    type: 'image',
    src: '/results/resultado-4.jpg',
    alt: 'Relato WhatsApp 2',
  },
];

export const TestimonialsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
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
    <div ref={containerRef} className="w-full relative py-6 overflow-hidden">
      {/* Peeking Carousel Slider Stage */}
      <div className="relative w-full max-w-6xl mx-auto flex items-center justify-center min-h-[460px] sm:min-h-[620px]">
        <div
          className="flex transition-transform duration-500 ease-out items-center"
          style={{
            transform: `translateX(calc(50% - ${(currentIndex * 340) + 170}px))`,
          }}
        >
          {slides.map((slide, idx) => {
            const isActive = currentIndex === idx;

            return (
              <div
                key={slide.id}
                onClick={() => setCurrentIndex(idx)}
                className={`shrink-0 w-[290px] sm:w-[340px] mx-3 sm:mx-4 cursor-pointer transition-all duration-500 rounded-3xl overflow-hidden bg-white border shadow-lg ${
                  isActive
                    ? 'scale-100 opacity-100 z-20 border-bordo/40 ring-4 ring-bordo/10 shadow-2xl'
                    : 'scale-90 opacity-55 z-10 border-tan-deep/20 hover:opacity-85'
                }`}
              >
                <div className="relative w-full h-[450px] sm:h-[580px] bg-neutral-950 flex items-center justify-center p-2">
                  {slide.type === 'video' ? (
                    <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-2xl">
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
