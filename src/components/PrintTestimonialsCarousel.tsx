import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, X } from 'lucide-react';

interface PrintSlideItem {
  id: string;
  src: string;
  alt: string;
}

const printSlides: PrintSlideItem[] = Array.from({ length: 35 }, (_, i) => ({
  id: `print-${i + 1}`,
  src: `/prints/print-${i + 1}.webp`,
  alt: `Relato de Cliente WhatsApp - Print ${i + 1}`,
}));

export const PrintTestimonialsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(360);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  // Responsive container width measurement for 100% exact card centering
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

  const cardWidth = window.innerWidth < 640 ? 280 : 340;
  const cardGap = window.innerWidth < 640 ? 12 : 24;

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? printSlides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === printSlides.length - 1 ? 0 : prev + 1));
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

  // Calculate exact translation to keep the current active card 100% in the middle
  const centerOffset = (containerWidth / 2) - (cardWidth / 2) - (currentIndex * (cardWidth + cardGap));

  return (
    <div className="w-full mt-12 pt-8 border-t border-tan-deep/15">
      {/* SECTION HEADER */}
      <div className="text-center mb-6 px-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-bordo/10 text-bordo font-sans font-bold text-xs uppercase tracking-widest mb-3">
          💬 Depoimentos Reais
        </span>
        <h3 className="font-serif font-black text-2xl sm:text-3xl md:text-4xl text-bordo max-w-2xl mx-auto">
          O que dizem as clientes no WhatsApp e redes sociais
        </h3>
        <p className="font-sans text-ink-soft text-xs sm:text-sm mt-2">
          Toque no print para ampliar e ler em tela cheia 🔍
        </p>
      </div>

      {/* CAROUSEL STAGE CONTAINER */}
      <div
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="w-full relative py-2 overflow-hidden touch-pan-y"
      >
        <div className="relative w-full flex items-center min-h-[400px] sm:min-h-[500px]">
          <div
            className="flex transition-transform duration-500 ease-out items-center will-change-transform transform-gpu"
            style={{
              transform: `translateX(${centerOffset}px)`,
            }}
          >
            {printSlides.map((slide, idx) => {
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
                  className={`shrink-0 cursor-pointer transition-all duration-500 rounded-3xl overflow-hidden bg-white border shadow-md relative group ${
                    isActive
                      ? 'scale-100 opacity-100 z-20 border-bordo/50 ring-4 ring-bordo/15 shadow-2xl'
                      : 'scale-90 opacity-50 z-10 border-tan-deep/20 hover:opacity-80'
                  }`}
                >
                  <div className="relative w-full h-[380px] sm:h-[480px] bg-white flex items-center justify-center p-2">
                    <img
                      src={slide.src}
                      alt={slide.alt}
                      loading="lazy"
                      className="w-full h-full object-contain rounded-2xl"
                    />

                    {/* TAP TO ZOOM OVERLAY HINT ON ACTIVE CARD */}
                    {isActive && (
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-bordo-deep/90 text-cream px-3 py-1.5 rounded-full text-xs font-sans font-bold shadow-lg flex items-center gap-1.5 backdrop-blur-sm pointer-events-none transition-transform group-hover:scale-105">
                        <ZoomIn className="w-3.5 h-3.5" />
                        <span>Toque para ampliar</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* EXTERNAL CAROUSEL CONTROLS & PAGINATION (NO OVERLAP ON PRINT TEXT) */}
      <div className="max-w-md mx-auto px-4 mt-4 flex flex-col items-center gap-4">
        {/* Navigation buttons pill */}
        <div className="flex items-center justify-between w-full bg-white/90 border border-tan-deep/30 rounded-full p-1.5 shadow-md backdrop-blur-sm">
          <button
            onClick={prevSlide}
            className="flex items-center gap-1 px-4 py-2 rounded-full bg-cream hover:bg-bordo hover:text-cream text-bordo font-sans font-bold text-xs transition-all active:scale-95 shadow-sm"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-4 h-4 stroke-[3]" />
            <span>Anterior</span>
          </button>

          <span className="text-xs font-mono font-bold text-bordo px-2">
            {currentIndex + 1} / {printSlides.length}
          </span>

          <button
            onClick={nextSlide}
            className="flex items-center gap-1 px-4 py-2 rounded-full bg-cream hover:bg-bordo hover:text-cream text-bordo font-sans font-bold text-xs transition-all active:scale-95 shadow-sm"
            aria-label="Próximo"
          >
            <span>Próximo</span>
            <ChevronRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-1.5 flex-wrap max-w-xs mx-auto">
          {printSlides.slice(0, 15).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === idx
                  ? 'w-6 bg-bordo'
                  : 'w-2 bg-bordo/25 hover:bg-bordo/50'
              }`}
              aria-label={`Ir para o print ${idx + 1}`}
            />
          ))}
          {printSlides.length > 15 && (
            <span className="text-[10px] font-mono text-ink-soft">+{printSlides.length - 15}</span>
          )}
        </div>
      </div>

      {/* FULL SCREEN LIGHTBOX ZOOM MODAL */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 animate-fadeIn"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Lightbox Top Header */}
          <div className="w-full max-w-4xl mx-auto flex items-center justify-between text-white z-50 pt-2 px-2" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold bg-white/10 px-3 py-1 rounded-full text-cream">
                Print {lightboxIndex + 1} de {printSlides.length}
              </span>
              <span className="text-xs text-cream/70 hidden sm:inline">
                🔍 Use dois dedos para dar zoom no celular
              </span>
            </div>
            <button
              onClick={() => setLightboxIndex(null)}
              className="p-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all active:scale-90 flex items-center justify-center"
              aria-label="Fechar ampliação"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Lightbox Main Image Container */}
          <div
            className="flex-1 w-full max-w-4xl mx-auto flex items-center justify-center p-2 overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={printSlides[lightboxIndex].src}
              alt={printSlides[lightboxIndex].alt}
              className="max-w-full max-h-[82vh] object-contain rounded-xl shadow-2xl touch-manipulation cursor-zoom-in"
            />
          </div>

          {/* Lightbox Bottom Controls */}
          <div className="w-full max-w-md mx-auto flex items-center justify-between gap-4 pb-4 z-50" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setLightboxIndex((prev) => (prev === 0 ? printSlides.length - 1 : (prev ?? 0) - 1))}
              className="flex-1 py-3 px-4 rounded-full bg-white/15 hover:bg-white/25 text-white font-sans font-bold text-sm flex items-center justify-center gap-2 border border-white/20 backdrop-blur-md transition-all active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Anterior</span>
            </button>
            <button
              onClick={() => setLightboxIndex((prev) => (prev === printSlides.length - 1 ? 0 : (prev ?? 0) + 1))}
              className="flex-1 py-3 px-4 rounded-full bg-white/15 hover:bg-white/25 text-white font-sans font-bold text-sm flex items-center justify-center gap-2 border border-white/20 backdrop-blur-md transition-all active:scale-95"
            >
              <span>Próximo</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrintTestimonialsCarousel;
