import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface ProtocolOverviewCardsProps {
  onSelectProtocol: (id: number) => void;
}

interface OverviewItem {
  id: number;
  name: string;
  badge?: string;
  description: string;
  tag: string;
}

const items: OverviewItem[] = [
  {
    id: 1,
    name: 'Protocolo 1',
    tag: 'ESSENCIAL',
    description: 'Para começar',
  },
  {
    id: 2,
    name: 'Protocolo 2',
    tag: 'INTENSIVO',
    badge: 'Recomendado',
    description: 'Mais escolhido',
  },
  {
    id: 3,
    name: 'Protocolo 3',
    tag: 'COMPLETO',
    badge: '🔥 Mais Completo',
    description: 'Melhor experiência de cuidado',
  },
];

export const ProtocolOverviewCards: React.FC<ProtocolOverviewCardsProps> = ({ onSelectProtocol }) => {
  const handleClick = (id: number) => {
    onSelectProtocol(id);
    setTimeout(() => {
      const element = document.getElementById(`protocol-card-${id}`) || document.getElementById('oferta');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 50);
  };

  return (
    <div className="my-12 max-w-5xl mx-auto px-4">
      <div className="text-center mb-8">
        <span className="text-xs font-mono text-bordo uppercase font-bold tracking-[0.2em] block mb-2">
          GUIA RÁPIDO DE ESCOLHA
        </span>
        <h3 className="font-serif font-black text-2xl sm:text-3xl text-bordo">
          Escolha o nível de cuidado ideal para o seu cabelo
        </h3>
        <p className="text-sm sm:text-base font-sans text-ink-soft max-w-2xl mx-auto mt-3 leading-relaxed font-normal">
          Do encorpamento dos fios ao cuidado completo do couro cabeludo: compare os protocolos e encontre a opção mais adequada para o seu momento.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => handleClick(item.id)}
            className={`relative rounded-3xl p-6 border transition-all duration-300 cursor-pointer flex flex-col justify-between group shadow-md hover:shadow-xl ${
              item.id === 3
                ? 'bg-gradient-to-b from-[#FFF9F9] to-white border-bordo ring-2 ring-bordo/15'
                : 'bg-white border-tan-deep/30 hover:border-bordo/50'
            }`}
          >
            {item.badge && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-bordo text-cream font-mono font-bold text-[10px] uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
                {item.badge}
              </span>
            )}

            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-bordo/70 block mb-1.5">
                {item.tag}
              </span>
              <h4 className="font-serif font-bold text-xl text-bordo mb-3">
                {item.name}
              </h4>
              <p className="text-sm font-sans text-ink-soft leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-tan-deep/15 flex items-center justify-between text-bordo group-hover:text-bordo-deep">
              <span className="text-xs font-sans font-extrabold uppercase tracking-wider">
                Ver detalhes do {item.name}
              </span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProtocolOverviewCards;
