import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export default function Header() {
  const [secondsLeft, setSecondsLeft] = useState(9 * 60 + 55);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSecondsLeft((current) => (current > 0 ? current - 1 : 9 * 60 + 55));
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const seconds = String(secondsLeft % 60).padStart(2, '0');

  return (
    <div className="relative">
      {/* Sticky Countdown Urgency Top Bar that ALWAYS accompanies the visitor */}
      <div className="sticky top-0 z-50 bg-[#6E1018] px-3 py-2 text-cream shadow-md border-b border-cream/15 backdrop-blur-md">
        <div className="mx-auto flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-center">
          <span className="text-xs font-sans font-bold leading-tight sm:text-sm text-cream">
            🔥 Últimas unidades com desconto - seu desconto expira em:
          </span>
          <span className="rounded-md bg-white/20 px-2.5 py-1 font-sans text-sm sm:text-base font-black leading-none tracking-widest text-white shadow-inner shrink-0">
            {minutes}:{seconds}
          </span>
          <a
            href="#oferta"
            className="inline-flex items-center justify-center rounded-full bg-cream px-4 py-1.5 text-xs font-sans font-extrabold text-[#6E1018] shadow-[0_4px_12px_rgba(0,0,0,0.2)] transition-all duration-300 hover:bg-rose hover:text-white active:scale-95 shrink-0"
          >
            Garantir meu kit agora
          </a>
        </div>
      </div>

      {/* Main Logo Header */}
      <header className="relative z-40 border-b border-tan-deep/20 bg-cream/90 backdrop-blur-md px-4 py-4 sm:px-6 sm:py-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          {/* Brandmark */}
          <motion.div
            className="flex items-center gap-2 cursor-pointer select-none"
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="h-10 sm:h-12 flex items-center justify-center">
              <img
                src="https://iili.io/ftbkqiv.webp"
                alt="Sweet Therapy Logo"
                className="h-full w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

          {/* Minimal Navigation Buttons */}
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <a
              href="#oferta"
              className="text-[10px] sm:text-xs font-sans font-extrabold uppercase tracking-widest bg-gradient-to-r from-bordo to-bordo-deep hover:from-bordo-deep hover:to-bordo text-cream px-4 sm:px-5 py-2.5 rounded-full transition-all duration-300 shadow-sm hover:shadow-md active:scale-95 cursor-pointer whitespace-nowrap"
            >
              Quero Reconstruir
            </a>
          </motion.div>
        </div>
      </header>
    </div>
  );
}
