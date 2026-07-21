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
    <header className="relative z-40 border-b border-tan-deep/20 bg-cream/90 backdrop-blur-md">
      <div className="bg-[#6E1018] px-3 py-2 text-cream">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-2 text-center sm:flex-row sm:gap-4">
          <span className="text-xs font-sans font-bold leading-tight sm:text-sm">
            🔥 Últimas unidades com desconto - seu desconto expira em:
          </span>
          <span className="rounded-md bg-white/18 px-3 py-1 font-sans text-lg font-black leading-none tracking-widest text-white shadow-inner">
            {minutes}:{seconds}
          </span>
          <a
            href="#oferta"
            className="inline-flex items-center justify-center rounded-full bg-cream px-5 py-2 text-xs font-sans font-extrabold text-[#6E1018] shadow-[0_8px_18px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-rose active:translate-y-0 sm:text-sm"
          >
            Garantir meu kit agora
          </a>
        </div>
      </div>

      <div className="px-4 py-4 sm:px-6 sm:py-6">
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

        {/* Minimal Navigation Buttons or badges */}
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
      </div>
    </header>
  );
}
