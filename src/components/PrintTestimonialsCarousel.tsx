import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PrintSlideItem {
  id: string;
  src: string;
  alt: string;
}

const printSlides: PrintSlideItem[] = [
  {
    id: 'print-1',
    src: '/testimonials/feedback-1.jpg',
    alt: 'Resultado WhatsApp - Roberta Mazoni',
  },
  {
    id: 'print-2',
    src: '/testimonials/feedback-2.jpg',
    alt: 'Depoimento Comentário - Eleneide',
  },
  {
    id: 'print-3',
    src: '/testimonials/feedback-3.jpg',
    alt: 'Depoimento WhatsApp - Loirrana Moura',
  },
  {
    id: 'print-4',
    src: '/testimonials/feedback-4.jpg',
    alt: 'Depoimento Instagram DM',
  },
  {
    id: 'print-5',
    src: '/testimonials/feedback-5.jpg',
    alt: 'Relato Unboxing - Rosi Oliveira',
  },
  {
    id: 'print-6',
    src: '/testimonials/feedback-6.jpg',
    alt: 'Relato Gratidão Madeixas WhatsApp',
  },
  {
    id: 'print-7',
    src: '/testimonials/feedback-7.jpg',
    alt: 'Relato Cheiro Surreal WhatsApp',
  },
  {
    id: 'print-8',
    src: '/testimonials/feedback-8.jpg',
    alt: 'Relato Madeixas Lindas WhatsApp',
  },
  {
    id: 'print-9',
    src: '/testimonials/feedback-9.jpg',
    alt: 'Relato Couro Cabeludo Preenchido - Tatiana Macedo',
  },
  {
    id: 'print-10',
    src: '/testimonials/feedback-10.jpg',
    alt: 'Relato Cabelo Chupou a Proteína WhatsApp',
  },
  {
    id: 'print-11',
    src: '/testimonials/feedback-11.jpg',
    alt: 'Relato Unboxing Meus Queridinhos WhatsApp',
  },
  {
    id: 'print-12',
    src: '/testimonials/drive_feedback_7.png',
    alt: 'Relato Resultado Capilar Drive',
  },
  {
    id: 'print-13',
    src: '/testimonials/drive_feedback_12.png',
    alt: 'Relato Resultado Capilar Drive 2',
  },
];

export const PrintTestimonialsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideWidth, setSlideWidth] = useState(330);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? printSlides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === printSlides.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const updateWidth = () => {
      if (window.innerWidth < 640) {
        setSlideWidth(280);
      } else {
        setSlideWidth(330);
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

  return (
    <div className="w-full mt-12 pt-8 border-t border-tan-deep/15">
      <div className="text-center mb-8">
        <span className="text-xs font-mono text-bordo uppercase font-bold tracking-[0.2em] block mb-2">
          FEEDBACKS & PRINTS REAIS
        </span>
        <h3 className="font-serif font-black text-2xl sm:text-3xl text-bordo">
          O que dizem as clientes no WhatsApp e redes sociais
        </h3>
      </div>

      <div
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="w-full relative py-4 overflow-hidden touch-pan-y"
      >
        {/* Carousel Stage */}
        <div className="relative w-full max-w-6xl mx-auto flex items-center justify-center min-h-[380px] sm:min-h-[480px]">
          <div
            className="flex transition-transform duration-500 ease-out items-center will-change-transform transform-gpu"
            style={{
              transform: `translateX(calc(50% - ${(currentIndex * slideWidth) + (slideWidth / 2)}px))`,
            }}
          >
            {printSlides.map((slide, idx) => {
              const isActive = currentIndex === idx;

              return (
                <div
                  key={slide.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`shrink-0 w-[260px] sm:w-[300px] mx-2 sm:mx-3 cursor-pointer transition-all duration-500 rounded-3xl overflow-hidden bg-white border shadow-md ${
                    isActive
                      ? 'scale-100 opacity-100 z-20 border-bordo/40 ring-4 ring-bordo/10 shadow-xl'
                      : 'scale-90 opacity-60 z-10 border-tan-deep/20 hover:opacity-85'
                  }`}
                >
                  <div className="relative w-full h-[360px] sm:h-[450px] bg-white flex items-center justify-center p-2">
                    <img
                      src={slide.src}
                      alt={slide.alt}
                      loading="lazy"
                      className="w-full h-full object-contain rounded-2xl"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/95 hover:bg-white text-bordo border border-tan-deep/30 flex items-center justify-center shadow-lg backdrop-blur-md transition-all hover:scale-110 active:scale-95"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/95 hover:bg-white text-bordo border border-tan-deep/30 flex items-center justify-center shadow-lg backdrop-blur-md transition-all hover:scale-110 active:scale-95"
            aria-label="Próximo"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-1.5 mt-6 flex-wrap max-w-md mx-auto px-4">
          {printSlides.map((_, idx) => (
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
        </div>
      </div>
    </div>
  );
};

export default PrintTestimonialsCarousel;
