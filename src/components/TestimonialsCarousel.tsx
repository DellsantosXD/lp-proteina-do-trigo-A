import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';

interface SlideItem {
  id: string;
  type: 'video' | 'image';
  src: string;
  alt: string;
  aspect: 'landscape' | 'portrait' | 'square';
}

const slides: SlideItem[] = [
  {
    id: 'video-1',
    type: 'video',
    src: '/videos/depoimento-video-1.mp4',
    alt: 'Depoimento em Vídeo de Paciente',
    aspect: 'portrait',
  },
  {
    id: 'img-1',
    type: 'image',
    src: '/results/resultado-1.jpg',
    alt: 'Resultado Capilar 1 - Roberta Mazoni',
    aspect: 'portrait',
  },
  {
    id: 'img-2',
    type: 'image',
    src: '/results/resultado-2.jpg',
    alt: 'Resultado Capilar 2 - Mari',
    aspect: 'portrait',
  },
  {
    id: 'img-3',
    type: 'image',
    src: '/results/resultado-3.jpg',
    alt: 'Relato WhatsApp 1',
    aspect: 'landscape',
  },
  {
    id: 'img-4',
    type: 'image',
    src: '/results/resultado-4.jpg',
    alt: 'Relato WhatsApp 2',
    aspect: 'landscape',
  },
  {
    id: 'img-5',
    type: 'image',
    src: '/results/resultado-5.jpg',
    alt: 'Relato WhatsApp 3 - Caixa Unboxing',
    aspect: 'portrait',
  },
  {
    id: 'img-6',
    type: 'image',
    src: '/results/resultado-6.jpg',
    alt: 'Relato WhatsApp 4 - Experiência do Cliente',
    aspect: 'square',
  },
  {
    id: 'img-7',
    type: 'image',
    src: '/results/resultado-7.jpg',
    alt: 'Relato WhatsApp 5 - Madeixas Lindas',
    aspect: 'square',
  },
  {
    id: 'img-8',
    type: 'image',
    src: '/results/resultado-8.jpg',
    alt: 'Relato WhatsApp 6 - Marli Medeiros Avaliação Tricologista',
    aspect: 'square',
  },
];

export const TestimonialsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
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
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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

  const getItemSlotWidth = (item: SlideItem) => {
    if (isMobile) {
      if (item.aspect === 'landscape') return 340; // 324px card + 16px mx
      if (item.aspect === 'square') return 310;   // 294px card + 16px mx
      return 290;                                 // 274px card + 16px mx
    } else {
      if (item.aspect === 'landscape') return 512; // 480px card + 32px mx
      if (item.aspect === 'square') return 412;   // 380px card + 32px mx
      return 372;                                 // 340px card + 32px mx
    }
  };

  const calculateTranslateX = () => {
    let offset = 0;
    for (let i = 0; i < currentIndex; i++) {
      offset += getItemSlotWidth(slides[i]);
    }
    const currentSlotWidth = getItemSlotWidth(slides[currentIndex]);
    const centerPoint = offset + currentSlotWidth / 2;
    return `calc(50% - ${centerPoint}px)`;
  };

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="w-full relative py-4 sm:py-6 overflow-hidden touch-pan-y"
    >
      {/* Peeking Carousel Slider Stage */}
      <div className="relative w-full max-w-6xl mx-auto flex items-center justify-center min-h-[300px] sm:min-h-[600px]">
        <div
          className="flex transition-transform duration-500 ease-out items-center"
          style={{
            transform: calculateTranslateX(),
          }}
        >
          {slides.map((slide, idx) => {
            const isActive = currentIndex === idx;

            // Width class mapping based on aspect
            const cardWidthClass =
              slide.aspect === 'landscape'
                ? 'w-[324px] sm:w-[480px]'
                : slide.aspect === 'square'
                ? 'w-[294px] sm:w-[380px]'
                : 'w-[274px] sm:w-[340px]';

            // Container height mapping
            const containerHeightClass =
              slide.aspect === 'landscape'
                ? 'h-auto py-2.5 sm:py-4 min-h-[140px] sm:min-h-[220px]'
                : slide.aspect === 'square'
                ? 'h-[320px] sm:h-[440px]'
                : 'h-[440px] sm:h-[580px]';

            return (
              <div
                key={slide.id}
                onClick={() => setCurrentIndex(idx)}
                className={`shrink-0 ${cardWidthClass} mx-2 sm:mx-4 cursor-pointer transition-all duration-500 rounded-3xl overflow-hidden bg-white border shadow-lg ${
                  isActive
                    ? 'scale-100 opacity-100 z-20 border-bordo/40 ring-4 ring-bordo/10 shadow-2xl'
                    : 'scale-90 opacity-55 z-10 border-tan-deep/20 hover:opacity-85'
                }`}
              >
                <div className={`relative w-full ${containerHeightClass} bg-gradient-to-br from-[#4A0E19] via-[#651524] to-[#2D060C] flex items-center justify-center p-2 sm:p-3`}>
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
                      className={`w-full ${slide.aspect === 'landscape' ? 'h-auto max-h-[260px] sm:max-h-[360px]' : 'h-full'} object-contain rounded-2xl shadow-sm`}
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
          className="absolute left-1 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white text-bordo border border-tan-deep/30 flex items-center justify-center shadow-xl backdrop-blur-md transition-all hover:scale-110 active:scale-95"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-1 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white text-bordo border border-tan-deep/30 flex items-center justify-center shadow-xl backdrop-blur-md transition-all hover:scale-110 active:scale-95"
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
