import { motion } from 'motion/react';

export default function Header() {
  return (
    <div className="relative">
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
