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
  const carouselRef = useRef<HTMLDivElement>(null);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // Video Autoplay Observer on active slide
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

      if (carouselRef.current) {
        observer.observe(carouselRef.current);
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
    <div ref={carouselRef} className="max-w-3xl mx-auto relative px-4 sm:px-12 py-4">
      {/* Carousel Main Stage Container */}
      <div className="relative overflow-hidden rounded-3xl bg-white border border-tan-deep/25 shadow-xl transition-all duration-300">
        <div className="w-full flex items-center justify-center p-2 sm:p-4 bg-neutral-900/5 min-h-[420px] sm:min-h-[560px] max-h-[75vh]">
          {slides[currentIndex].type === 'video' ? (
            <div className="relative w-full h-full max-h-[70vh] flex items-center justify-center overflow-hidden rounded-2xl bg-black">
              <video
                ref={videoRef}
                src={slides[currentIndex].src}
                loop
                muted={isMuted}
                playsInline
                autoPlay
                className="w-full h-full object-contain rounded-2xl max-h-[70vh]"
              />

              {/* Floating Mute/Unmute Audio Toggle Button */}
              <button
                onClick={toggleMute}
                className="absolute bottom-4 right-4 z-20 flex items-center gap-2 bg-bordo/90 hover:bg-bordo text-cream border border-cream/30 px-3.5 py-2 rounded-full backdrop-blur-md text-xs font-sans font-semibold shadow-lg transition-all active:scale-95"
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
          ) : (
            <div className="w-full h-full max-h-[70vh] flex items-center justify-center overflow-hidden rounded-2xl">
              <img
                src={slides[currentIndex].src}
                alt={slides[currentIndex].alt}
                className="w-full h-auto max-h-[70vh] object-contain rounded-2xl shadow-sm"
              />
            </div>
          )}
        </div>

        {/* Carousel Navigation Arrow Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-bordo border border-tan-deep/30 flex items-center justify-center shadow-lg backdrop-blur-md transition-all hover:scale-105 active:scale-95"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-bordo border border-tan-deep/30 flex items-center justify-center shadow-lg backdrop-blur-md transition-all hover:scale-105 active:scale-95"
          aria-label="Próximo"
        >
          <ChevronRight className="w-6 h-6 stroke-[2.5]" />
        </button>
      </div>

      {/* Carousel Pagination Dots */}
      <div className="flex items-center justify-center gap-2 mt-6">
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
