import React, { useEffect, useState } from 'react';
import { Download, BookOpen, Sparkles, Lock, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

export default function BonusPage() {
  const [isValidated, setIsValidated] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const status = params.get('status');
    const order = params.get('order');
    const access = params.get('access');

    const valid = (status === 'cliente_confirmado' || status === 'approved' || status === 'paid' ||
                   order === 'approved' || order === 'paid' ||
                   access === 'liberado' || access === 'cliente');

    setIsValidated(valid);
  }, []);

  return (
    <div className="min-h-screen bg-cream text-ink font-sans antialiased selection:bg-rose/50 flex flex-col justify-between">
      {/* HEADER */}
      <header className="border-b border-tan-deep/20 bg-cream/90 backdrop-blur-md px-4 py-5 sm:px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="h-7 sm:h-8 flex items-center justify-center">
            <a href="/">
              <img src="https://iili.io/ftbkqiv.webp" alt="Sweet Therapy Logo" className="h-full w-auto object-contain" width={140} height={32} />
            </a>
          </div>
          <span className={`text-xs sm:text-sm font-sans font-bold uppercase tracking-wider px-3.5 py-1 rounded-full ${
            isValidated ? 'bg-emerald-500/15 text-emerald-800' : 'bg-bordo/10 text-bordo'
          }`}>
            {isValidated ? '✓ Compra Confirmada' : 'Área de Bônus'}
          </span>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 py-12 px-4 sm:px-6 md:py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge Tag */}
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-sans font-bold text-xs sm:text-sm uppercase tracking-widest mb-6 ${
            isValidated ? 'bg-emerald-600/10 text-emerald-700' : 'bg-amber-600/10 text-amber-800'
          }`}>
            {isValidated ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Acesso Confirmado de Cliente
              </>
            ) : (
              <>
                <Lock className="w-4 h-4 text-amber-600" /> Acesso Não Confirmado
              </>
            )}
          </div>

          {/* Main Title */}
          <h1 className="font-serif text-bordo font-black text-3xl sm:text-5xl md:text-6xl tracking-tight leading-tight mb-5 max-w-3xl mx-auto">
            Seus bônus estão liberados
          </h1>

          {/* Subtitle */}
          <p className="font-sans text-ink font-medium text-base sm:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
            Enquanto sua Proteína do Trigo Pro Filler está a caminho, comece a se preparar para aproveitar ao máximo o seu Protocolo Essencial.
          </p>

          {/* LOCKED WARNING BANNER */}
          {!isValidated && (
            <div className="max-w-2xl mx-auto mb-12 p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 text-left">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-sans font-bold text-base text-bordo-deep mb-1">Acesso Restrito a Clientes</h3>
                  <p className="text-sm text-ink-soft leading-relaxed mb-3">
                    Esta área é exclusiva para clientes que adquiriram a Proteína do Trigo Pro Filler. Se você já realizou seu pedido, acesse a página através do link exclusivo enviado para o seu e-mail de confirmação ou redirecionado após o checkout.
                  </p>
                  <a href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-bordo underline hover:text-bordo-deep">
                    Ir para a página oficial do produto <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          )}

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
              {isValidated ? (
                <a
                  href="/bonus/guia-fios-finos-v2.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r from-bordo to-bordo-deep hover:from-bordo-deep hover:to-bordo text-cream font-sans font-bold text-sm sm:text-base px-6 py-4 rounded-full transition-all duration-300 shadow-[0_8px_20px_rgba(110,31,43,0.2)] hover:-translate-y-0.5 active:translate-y-0 text-center cursor-pointer"
                >
                  <Download className="w-5 h-5" />
                  Baixar meu guia
                </a>
              ) : (
                <button
                  disabled
                  className="inline-flex items-center justify-center gap-2 w-full bg-gray-200 text-gray-400 font-sans font-bold text-sm sm:text-base px-6 py-4 rounded-full cursor-not-allowed opacity-75"
                >
                  <Lock className="w-5 h-5" />
                  Download Bloqueado (Exige Confirmação)
                </button>
              )}
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
              {isValidated ? (
                <a
                  href="/bonus/manual-massagem-capilar-v2.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r from-bordo to-bordo-deep hover:from-bordo-deep hover:to-bordo text-cream font-sans font-bold text-sm sm:text-base px-6 py-4 rounded-full transition-all duration-300 shadow-[0_8px_20px_rgba(110,31,43,0.2)] hover:-translate-y-0.5 active:translate-y-0 text-center cursor-pointer"
                >
                  <Download className="w-5 h-5" />
                  Baixar meu manual
                </a>
              ) : (
                <button
                  disabled
                  className="inline-flex items-center justify-center gap-2 w-full bg-gray-200 text-gray-400 font-sans font-bold text-sm sm:text-base px-6 py-4 rounded-full cursor-not-allowed opacity-75"
                >
                  <Lock className="w-5 h-5" />
                  Download Bloqueado (Exige Confirmação)
                </button>
              )}
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
