import React from 'react';
import { TrichologistVideoGrid } from './TrichologistVideoGrid';

export const ProfessionalRecommendationBlock: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-gradient-to-br from-[#4A0E19] via-[#651524] to-[#2D060C] text-cream relative overflow-hidden border-t border-cream/15" id="profissionais-protocolo">
      <div className="absolute inset-0 bg-[linear-gradient(35deg,transparent_0%,rgba(255,255,255,0.05)_52%,transparent_74%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
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
      </div>
    </section>
  );
};

export default ProfessionalRecommendationBlock;
