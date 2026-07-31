import React from 'react';
import { Download, BookOpen, Sparkles } from 'lucide-react';

export default function BonusPage() {
  return (
    <div className="min-h-screen bg-cream text-ink font-sans antialiased selection:bg-rose/50 flex flex-col justify-between">
      {/* HEADER */}
      <header className="border-b border-tan-deep/20 bg-cream/90 backdrop-blur-md px-4 py-5 sm:px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="h-10 sm:h-12 flex items-center justify-center">
            <img src="https://iili.io/ftbkqiv.webp" alt="Sweet Therapy Logo" className="h-full w-auto object-contain" width={160} height={48} />
          </div>
          <span className="text-xs sm:text-sm font-sans font-bold text-bordo uppercase tracking-wider bg-bordo/10 px-3 py-1 rounded-full">
            Área de Bônus
          </span>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 py-12 px-4 sm:px-6 md:py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-bordo/10 text-bordo font-sans font-bold text-xs sm:text-sm uppercase tracking-widest mb-6">
            <Sparkles className="w-4 h-4" /> Bônus Especiais Liberados
          </div>

          {/* Main Title */}
          <h1 className="font-serif text-bordo font-black text-3xl sm:text-5xl md:text-6xl tracking-tight leading-tight mb-5 max-w-3xl mx-auto">
            Seus bônus estão liberados
          </h1>

          {/* Subtitle */}
          <p className="font-sans text-ink font-medium text-base sm:text-xl leading-relaxed max-w-2xl mx-auto mb-12 sm:mb-16">
            Enquanto sua Proteína do Trigo Pro Filler está a caminho, comece a se preparar para aproveitar ao máximo o seu Protocolo Essencial.
          </p>

          {/* BONUS CARDS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-3xl mx-auto">
            {/* CARD 1 */}
            <div className="bg-white rounded-[28px] border border-tan-deep/30 p-6 sm:p-8 shadow-[0_16px_36px_rgba(78,20,28,0.08)] hover:border-bordo/50 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-sans font-black uppercase tracking-widest bg-bordo-deep text-cream px-3 py-1 rounded-full">
                    Bônus 01
                  </span>
                  <BookOpen className="w-6 h-6 text-bordo" />
                </div>
                <h2 className="font-serif text-bordo font-bold text-xl sm:text-2xl leading-snug mb-3 group-hover:text-bordo-deep transition-colors">
                  Guia: Como Encorpar Fios Finos em Casa
                </h2>
                <p className="font-sans text-ink-soft text-sm sm:text-base leading-relaxed mb-6">
                  Passo a passo completo com técnicas práticas e rotinas diárias para devolver volume, densidade e corpo aos cabelos finos e raleados.
                </p>
              </div>
              <a
                href="/bonus/guia-fios-finos.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r from-bordo to-bordo-deep hover:from-bordo-deep hover:to-bordo text-cream font-sans font-bold text-sm sm:text-base px-6 py-4 rounded-full transition-all duration-300 shadow-[0_8px_20px_rgba(110,31,43,0.2)] hover:-translate-y-0.5 active:translate-y-0 text-center cursor-pointer"
              >
                <Download className="w-5 h-5" />
                Baixar meu guia
              </a>
            </div>

            {/* CARD 2 */}
            <div className="bg-white rounded-[28px] border border-tan-deep/30 p-6 sm:p-8 shadow-[0_16px_36px_rgba(78,20,28,0.08)] hover:border-bordo/50 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-sans font-black uppercase tracking-widest bg-bordo-deep text-cream px-3 py-1 rounded-full">
                    Bônus 02
                  </span>
                  <span className="text-2xl">💆‍♀️</span>
                </div>
                <h2 className="font-serif text-bordo font-bold text-xl sm:text-2xl leading-snug mb-3 group-hover:text-bordo-deep transition-colors">
                  Manual de Massagem Capilar
                </h2>
                <p className="font-sans text-ink-soft text-sm sm:text-base leading-relaxed mb-6">
                  Técnicas de estímulo microcirculatório no couro cabeludo para potencializar a absorção da Proteína do Trigo e acelerar o crescimento forte.
                </p>
              </div>
              <a
                href="/bonus/manual-massagem-capilar.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r from-bordo to-bordo-deep hover:from-bordo-deep hover:to-bordo text-cream font-sans font-bold text-sm sm:text-base px-6 py-4 rounded-full transition-all duration-300 shadow-[0_8px_20px_rgba(110,31,43,0.2)] hover:-translate-y-0.5 active:translate-y-0 text-center cursor-pointer"
              >
                <Download className="w-5 h-5" />
                Baixar meu manual
              </a>
            </div>
          </div>

          {/* Trust Note */}
          <div className="mt-12 text-center">
            <p className="text-xs font-mono text-ink-soft uppercase tracking-widest">
              🔒 Acesso Exclusivo para Clientes Sweet Therapy
            </p>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-tan-deep/20 py-6 text-center text-xs text-ink-soft">
        <div className="max-w-4xl mx-auto px-4">
          <p>© 2026 Sweet Therapy · Proteína do Trigo Pro Filler. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
