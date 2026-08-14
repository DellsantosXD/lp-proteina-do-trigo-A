import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import ConversionCta from './ConversionCta';
import { TrichologistVideoGrid } from './TrichologistVideoGrid';

export const TrichologistsSection: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-gradient-to-br from-[#4A0E19] via-[#651524] to-[#2D060C] text-cream relative overflow-hidden border-t border-cream/15" id="profissionais">
      <div className="absolute inset-0 bg-[linear-gradient(35deg,transparent_0%,rgba(255,255,255,0.05)_52%,transparent_74%)] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-xs font-mono text-rose uppercase font-bold tracking-[0.2em] block mb-3">
            RECOMENDAÇÃO PROFISSIONAL & CLÍNICA
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-cream font-black tracking-tight leading-tight">
            Mais do que clientes satisfeitas: profissionais que recomendam.
          </h2>
          <p className="text-base sm:text-lg font-sans text-cream/80 max-w-2xl mx-auto mt-4 leading-relaxed font-normal">
            Tricologistas e especialistas capilares que testaram a tecnologia e prescrevem a reconstrução Sweet Therapy em seus consultórios.
          </p>
        </div>

        <TrichologistVideoGrid />

        {/* Bloco de Confiança */}
        <div className="mt-16 max-w-3xl mx-auto bg-cream/10 border border-cream/20 rounded-3xl p-6 sm:p-8 backdrop-blur-md text-left shadow-2xl">
          <h3 className="font-serif font-black text-2xl sm:text-3xl text-cream mb-6 tracking-tight">
            Em mais de 11 anos
          </h3>

          <ul className="space-y-4">
            {[
              'Mais de 18 mil clientes tratados',
              'Mais de 3.500 profissionais formados',
              'Clientes em todos os estados brasileiros',
              'Primeira marca dedicada exclusivamente à terapia capilar em casa',
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-3.5 text-cream/95 font-sans font-medium text-base sm:text-lg">
                <div className="w-6 h-6 rounded-full bg-rose/30 border border-rose/60 flex items-center justify-center shrink-0 mt-0.5 text-cream">
                  <CheckCircle2 className="w-4 h-4 text-rose" />
                </div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Transition CTA Card before Offer Section */}
        <div className="mt-14 max-w-3xl mx-auto">
          <ConversionCta
            tone="dark"
            eyebrow="Seu próximo passo"
            title="Mais de uma década de pesquisa, milhares de mulheres atendidas e uma tecnologia validada na prática trouxeram você até aqui."
            description="Agora falta apenas uma decisão: escolher o protocolo ideal para o seu nível de afinamento."
            label="Escolher meu protocolo"
          />
        </div>
      </div>
    </section>
  );
};
