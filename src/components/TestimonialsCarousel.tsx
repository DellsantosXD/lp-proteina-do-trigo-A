import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Volume2, VolumeX, Maximize2, X } from 'lucide-react';

interface SlideItem {
  id: string;
  type: 'video' | 'image';
  src: string;
  alt: string;
}

const slides: SlideItem[] = [
  {
    id: 'v-1',
    type: 'video',
    src: '/videos/depoimentos/v1.mp4',
    alt: 'Depoimento em Vídeo - Resultado Cabelo Loiro',
  },
  {
    id: 'v-6',
    type: 'video',
    src: '/videos/depoimentos/v6.mp4',
    alt: 'Depoimento em Vídeo - Resultado Textura Fibra Capilar',
  },
  {
    id: 'v-12',
    type: 'video',
    src: '/videos/depoimentos/v12.mp4',
    alt: 'Depoimento em Vídeo - Resultado 12',
  },
  {
    id: 'v-13',
    type: 'video',
    src: '/videos/depoimentos/v13.mp4',
    alt: 'Depoimento em Vídeo - Resultado 13',
  },
  {
    id: 'v-14',
    type: 'video',
    src: '/videos/depoimentos/v14.mp4',
    alt: 'Depoimento em Vídeo - Resultado 14',
  },
  {
    id: 'v-15',
    type: 'image',
    src: '/images/depoimentos/v15.webp',
    alt: 'Depoimento em Foto - Resultado 15',
  },
];

export const TestimonialsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [containerWidth, setContainerWidth] = useState(360);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const lightboxVideoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const lightboxTouchStartX = useRef<number | null>(null);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      } else {
        setContainerWidth(window.innerWidth);
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (isSectionVisible || !containerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsSectionVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '250px 0px' }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [isSectionVisible]);

  const cardWidth = window.innerWidth < 640 ? 280 : 340;
  const cardGap = window.innerWidth < 640 ? 12 : 24;

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches && e.touches[0]) {
      touchStartX.current = e.touches[0].clientX;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || !e.changedTouches || !e.changedTouches[0]) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 40) {
      nextSlide();
    } else if (diff < -40) {
      prevSlide();
    }
    touchStartX.current = null;
  };

  // Lightbox swipe gesture
  const handleLightboxTouchStart = (e: React.TouchEvent) => {
    if (e.touches && e.touches[0]) {
      lightboxTouchStartX.current = e.touches[0].clientX;
    }
  };

  const handleLightboxTouchEnd = (e: React.TouchEvent) => {
    if (lightboxTouchStartX.current === null || !e.changedTouches || !e.changedTouches[0]) return;
    const diff = lightboxTouchStartX.current - e.changedTouches[0].clientX;
    if (diff > 40) {
      setLightboxIndex((prev) => (prev === slides.length - 1 ? 0 : (prev ?? 0) + 1));
    } else if (diff < -40) {
      setLightboxIndex((prev) => (prev === 0 ? slides.length - 1 : (prev ?? 0) - 1));
    }
    lightboxTouchStartX.current = null;
  };

  useEffect(() => {
    const videoElem = videoRef.current;
    if (slides[currentIndex]?.type === 'video' && videoElem) {
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

  const centerOffset = (containerWidth / 2) - (cardWidth / 2) - (currentIndex * (cardWidth + cardGap));

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="w-full relative py-6 overflow-hidden touch-pan-y"
    >
      {/* PEEKING CAROUSEL SLIDER STAGE WITH PERFECT CENTERING */}
      <div className="relative w-full flex items-center min-h-[460px] sm:min-h-[580px]">
        <div
          className="flex transition-transform duration-500 ease-out items-center will-change-transform transform-gpu"
          style={{
            transform: `translateX(${centerOffset}px)`,
          }}
        >
          {slides.map((slide, idx) => {
            const isActive = currentIndex === idx;

            return (
              <div
                key={slide.id}
                style={{ width: `${cardWidth}px`, marginRight: `${cardGap}px` }}
                onClick={() => {
                  if (isActive) {
                    setLightboxIndex(idx);
                  } else {
                    setCurrentIndex(idx);
                  }
                }}
                className={`shrink-0 cursor-pointer transition-all duration-500 rounded-3xl overflow-hidden bg-white border shadow-lg relative group ${
                  isActive
                    ? 'scale-100 opacity-100 z-20 border-bordo/50 ring-4 ring-bordo/15 shadow-2xl'
                    : 'scale-90 opacity-55 z-10 border-tan-deep/20 hover:opacity-85'
                }`}
              >
                <div className="relative w-full h-[450px] sm:h-[560px] bg-gradient-to-br from-[#4A0E19] via-[#651524] to-[#2D060C] flex items-center justify-center p-2 sm:p-3">
                  {slide.type === 'video' ? (
                    <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-2xl bg-black/30">
                      {isSectionVisible && isActive ? (
                        <>
                          <video
                            ref={videoRef}
                            src={slide.src}
                            loop
                            muted={isMuted}
                            playsInline
                            preload="metadata"
                            autoPlay
                            className="w-full h-full object-contain rounded-2xl"
                          />
                          {/* Audio Mute/Unmute Badge Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsMuted(!isMuted);
                            }}
                            className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-md transition-all shadow-md active:scale-90"
                            aria-label={isMuted ? 'Ativar som' : 'Desativar som'}
                          >
                            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                          </button>

                          {/* Full Screen Expand Hint */}
                          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-bordo-deep/90 text-cream px-3.5 py-1.5 rounded-full text-xs font-sans font-bold shadow-lg flex items-center gap-1.5 backdrop-blur-sm pointer-events-none transition-transform group-hover:scale-105">
                            <Maximize2 className="w-3.5 h-3.5" />
                            <span>Abrir em Tela Cheia</span>
                          </div>
                        </>
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-[#3A0A13]/90 text-cream/80 p-4 rounded-2xl text-center">
                          <div className="w-14 h-14 rounded-full bg-bordo/80 border border-cream/30 flex items-center justify-center shadow-lg">
                            <Play className="w-6 h-6 text-cream fill-cream ml-1" />
                          </div>
                          <span className="text-xs font-sans font-bold uppercase tracking-wider text-cream/70">
                            Clique para assistir
                          </span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <img
                        src={slide.src}
                        alt={slide.alt}
                        loading="lazy"
                        className="w-full h-full object-contain rounded-2xl"
                      />
                      {isActive && (
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-bordo-deep/90 text-cream px-3.5 py-1.5 rounded-full text-xs font-sans font-bold shadow-lg flex items-center gap-1.5 backdrop-blur-sm pointer-events-none">
                          <Maximize2 className="w-3.5 h-3.5" />
                          <span>Ampliar Depoimento</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* EXTERNAL CONTROL BAR OUTSIDE VIDEO AREA */}
      <div className="max-w-md mx-auto px-4 mt-4 flex flex-col items-center gap-4">
        <div className="flex items-center justify-between w-full bg-white/90 border border-tan-deep/30 rounded-full p-1.5 shadow-md backdrop-blur-sm">
          <button
            onClick={prevSlide}
            className="flex items-center gap-1 px-4 py-2 rounded-full bg-cream hover:bg-bordo hover:text-cream text-bordo font-sans font-bold text-xs transition-all active:scale-95 shadow-sm"
            aria-label="Vídeo Anterior"
          >
            <ChevronLeft className="w-4 h-4 stroke-[3]" />
            <span>Anterior</span>
          </button>

          <span className="text-xs font-mono font-bold text-bordo px-2">
            {currentIndex + 1} / {slides.length}
          </span>

          <button
            onClick={nextSlide}
            className="flex items-center gap-1 px-4 py-2 rounded-full bg-cream hover:bg-bordo hover:text-cream text-bordo font-sans font-bold text-xs transition-all active:scale-95 shadow-sm"
            aria-label="Próximo Vídeo"
          >
            <span>Próximo</span>
            <ChevronRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-1.5">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === idx
                  ? 'w-6 bg-bordo'
                  : 'w-2 bg-bordo/25 hover:bg-bordo/50'
              }`}
              aria-label={`Ir para o depoimento ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* FULL SCREEN LIGHTBOX MODAL FOR VIDEOS & PHOTOS (z-[9999] HIGHEST PRIORITY OVERLAY) */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 animate-fadeIn"
          onClick={() => setLightboxIndex(null)}
          onTouchStart={handleLightboxTouchStart}
          onTouchEnd={handleLightboxTouchEnd}
        >
          {/* Lightbox Header */}
          <div className="w-full max-w-4xl mx-auto flex items-center justify-between text-white z-[9999] pt-2 px-2" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold bg-white/15 px-3 py-1 rounded-full text-cream">
                Depoimento {lightboxIndex + 1} de {slides.length}
              </span>
            </div>
            <button
              onClick={() => setLightboxIndex(null)}
              className="p-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all active:scale-90 flex items-center justify-center shadow-lg"
              aria-label="Fechar vídeo"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Lightbox Media Stage */}
          <div
            className="flex-1 w-full max-w-3xl mx-auto flex items-center justify-center p-2 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {slides[lightboxIndex].type === 'video' ? (
              <video
                ref={lightboxVideoRef}
                src={slides[lightboxIndex].src}
                controls
                autoPlay
                playsInline
                className="max-w-full max-h-[75vh] sm:max-h-[80vh] rounded-2xl shadow-2xl bg-black"
              />
            ) : (
              <img
                src={slides[lightboxIndex].src}
                alt={slides[lightboxIndex].alt}
                className="max-w-full max-h-[75vh] sm:max-h-[80vh] object-contain rounded-2xl shadow-2xl"
              />
            )}
          </div>

          {/* Lightbox Bottom Controls (Positioned high above sticky bar) */}
          <div className="w-full max-w-md mx-auto flex items-center justify-between gap-4 pb-12 sm:pb-6 z-[9999]" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setLightboxIndex((prev) => (prev === 0 ? slides.length - 1 : (prev ?? 0) - 1))}
              className="flex-1 py-3.5 px-5 rounded-full bg-white/20 hover:bg-white/30 text-white font-sans font-bold text-sm flex items-center justify-center gap-2 border border-white/30 backdrop-blur-md transition-all active:scale-95 shadow-xl"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
              <span>Anterior</span>
            </button>
            <button
              onClick={() => setLightboxIndex((prev) => (prev === slides.length - 1 ? 0 : (prev ?? 0) + 1))}
              className="flex-1 py-3.5 px-5 rounded-full bg-white/20 hover:bg-white/30 text-white font-sans font-bold text-sm flex items-center justify-center gap-2 border border-white/20 backdrop-blur-md transition-all active:scale-95 shadow-xl"
            >
              <span>Próximo</span>
              <ChevronRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestimonialsCarousel;
