import React from 'react';
import { motion } from 'motion/react';

interface ConversionCtaProps {
  title: string;
  description: string;
  label: string;
  href?: string;
  tone?: 'light' | 'dark';
  eyebrow?: string;
}

export const ConversionCta: React.FC<ConversionCtaProps> = ({
  title,
  description,
  label,
  href = '#oferta',
  tone = 'light',
  eyebrow = 'Garantia de Qualidade & Tecnologia',
}) => {
  const isDark = tone === 'dark';

  return (
    <motion.div
      className={`relative overflow-hidden rounded-3xl p-7 text-center shadow-[0_16px_40px_rgba(42,12,18,0.18)] backdrop-blur-md border ${
        isDark
          ? 'border-cream/20 bg-cream/10 text-cream'
          : 'border-tan-deep/30 bg-gradient-to-br from-cream to-white text-ink'
      }`}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,rgba(255,255,255,0.24)_48%,transparent_70%)] pointer-events-none" />
      <div className="relative z-10">
        <span className={`mb-3 block text-[11px] font-mono font-bold uppercase tracking-widest ${isDark ? 'text-rose' : 'text-bordo'}`}>
          {eyebrow}
        </span>
        <h3 className={`mx-auto max-w-2xl font-serif text-2xl font-black leading-tight sm:text-3xl ${isDark ? 'text-cream' : 'text-bordo'}`}>
          {title}
        </h3>
        <p className={`mx-auto mt-3 max-w-xl text-sm leading-relaxed sm:text-base ${isDark ? 'text-cream/78' : 'text-ink-soft'}`}>
          {description}
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={href}
            className={`inline-flex w-full max-w-sm items-center justify-center rounded-full px-7 py-4 text-sm font-sans font-extrabold shadow-[0_10px_24px_rgba(78,20,28,0.22)] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 sm:w-auto ${
              isDark
                ? 'bg-cream text-bordo hover:bg-rose'
                : 'bg-gradient-to-r from-bordo to-bordo-deep text-cream hover:from-bordo-deep hover:to-bordo'
            }`}
          >
            {label}
          </a>
          <span className={`text-[10px] font-mono uppercase tracking-widest ${isDark ? 'text-cream/55' : 'text-ink-soft/60'}`}>
            Compra segura · Envio rápido
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ConversionCta;
