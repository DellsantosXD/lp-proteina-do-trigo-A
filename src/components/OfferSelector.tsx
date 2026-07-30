import { motion } from 'motion/react';
import { CheckCircle2, ShieldCheck, Truck } from 'lucide-react';
import { Protocol } from '../types';

interface BonusItem {
  title: string;
  subtext?: string;
}

interface BonusSection {
  title: string;
  itemCountLabel: string;
  items: BonusItem[];
}

interface ExtendedProtocol extends Protocol {
  originalPrice?: string;
  priceLabel: string;
  subtitle: string;
  installments: string;
  note?: string;
  infoBox: string;
  imageUrl?: string;
  hasFreeShipping?: boolean;
  topHeaderBadge?: string;
  bonusSection: BonusSection;
}

const protocols: ExtendedProtocol[] = [
  {
    id: 1,
    name: 'Protocolo Essencial',
    priceLabel: '169,00',
    subtitle: 'Para começar',
    price: 169,
    installments: '16,98',
    description: 'Para começar',
    items: [
      'Proteína do Trigo Pro Filler (100g)'
    ],
    imageUrl: '/products/proteina-trigo-pro-filler-cutout.png',
    infoBox: 'Para começar',
    checkoutUrl: 'https://pay.youshop.com.br/JN9DUO3SJMXM1OQL',
    bonusSection: {
      title: 'BÔNUS',
      itemCountLabel: '2 itens',
      items: [
        {
          title: 'Guia: Como Encorpar Fios Finos em Casa',
          subtext: 'Hábitos e técnicas para aumentar volume e densidade.'
        },
        {
          title: 'Manual de Massagem Capilar',
          subtext: 'Passo a passo para potencializar a absorção dos ativos.'
        }
      ]
    }
  },
  {
    id: 2,
    name: 'Protocolo Intensivo',
    originalPrice: '348,00',
    priceLabel: '267,00',
    subtitle: 'Mais escolhido',
    price: 267,
    installments: '26,81',
    badge: 'Recomendado',
    description: 'Mais escolhido',
    items: [
      'Proteína do Trigo Pro Filler (100g)',
      'Sérum Fortalecedor (60 ml)'
    ],
    imageUrl: '/products/protocolo-2-kit-cutout.png',
    infoBox: 'Mais escolhido',
    checkoutUrl: 'https://pay.youshop.com.br/KPQVFOAEEP8ZTYNL',
    bonusSection: {
      title: 'BÔNUS',
      itemCountLabel: '5 itens',
      items: [
        {
          title: 'Guia: Como Encorpar Fios Finos em Casa'
        },
        {
          title: 'Manual de Massagem Capilar'
        },
        {
          title: 'Cronograma Terapêutico Sweet Therapy',
          subtext: 'Como organizar reconstrução, hidratação e nutrição.'
        },
        {
          title: 'Guia de Alimentação e Hábitos para Fortalecer os Fios',
          subtext: 'Como sono, alimentação e rotina influenciam a saúde capilar.'
        },
        {
          title: 'Vídeo aula ensinando a massagear o couro cabeludo com Cris Mendanha',
          subtext: 'Passo a passo em vídeo para potencializar os resultados.'
        }
      ]
    }
  },
  {
    id: 3,
    name: 'Protocolo Completo',
    originalPrice: '490,00',
    priceLabel: '327,00',
    subtitle: 'Melhor experiência de cuidado',
    topHeaderBadge: '🔥 MELHOR CUSTO-BENEFÍCIO',
    price: 327,
    installments: '32,83',
    badge: 'Mais completo',
    description: 'Melhor experiência de cuidado',
    items: [
      'Proteína do Trigo Pro Filler (100g)',
      'Sérum Fortalecedor (60 ml)',
      'Shampoo Antioxidante Mineral (250 ml)'
    ],
    imageUrl: '/products/protocolo-3-kit-cutout.png',
    infoBox: 'Melhor experiência de cuidado',
    hasFreeShipping: true,
    checkoutUrl: 'https://pay.youshop.com.br/BRFYWVIZZTWAMNB1',
    bonusSection: {
      title: 'KIT EXCLUSIVO',
      itemCountLabel: '6 itens',
      items: [
        {
          title: 'Guia: Como Encorpar Fios Finos em Casa'
        },
        {
          title: 'Manual de Massagem Capilar'
        },
        {
          title: 'Cronograma Terapêutico Sweet Therapy'
        },
        {
          title: 'Guia de Alimentação e Hábitos para Fortalecer os Fios',
          subtext: 'Como sono, alimentação e rotina influenciam a saúde capilar.'
        },
        {
          title: 'Vídeo aula ensinando a massagear o couro cabeludo com Cris Mendanha',
          subtext: 'Passo a passo em vídeo para potencializar os resultados.'
        },
        {
          title: 'Calendário de Aplicação dos Protocolos',
          subtext: 'Quando usar cada produto para melhor desempenho.'
        }
      ]
    }
  }
];

const GlassBottle = ({ className = "w-24 h-32" }: { className?: string }) => (
  <svg className={`${className} drop-shadow-[0_8px_16px_rgba(78,20,28,0.18)] relative`} viewBox="0 0 160 220" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Shadow */}
    <ellipse cx="80" cy="205" rx="38" ry="5" fill="rgba(42,33,27,0.08)" />
    
    {/* Glass Bottle Body */}
    <path d="M40 70 C40 60, 45 55, 60 55 L100 55 C115 55, 120 60, 120 70 L120 180 C120 195, 110 200, 80 200 C50 200, 40 195, 40 180 Z" fill="url(#glassGradOffer)" />
    
    {/* Liquid inside */}
    <path d="M44 85 C44 75, 48 72, 60 72 L100 72 C112 72, 116 75, 116 85 L116 175 C116 188, 108 193, 80 193 C52 193, 44 188, 44 175 Z" fill="url(#liquidGradOffer)" opacity="0.85" />
    
    {/* Creamy Label */}
    <path d="M40 95 H120 V165 H40 Z" fill="#FBF8F2" />
    <rect x="42" y="97" width="76" height="66" rx="2" stroke="#DFC796" strokeWidth="0.75" fill="none" />
    
    {/* Label Typography */}
    <text x="80" y="112" fill="#6E1F2B" fontSize="6" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle" letterSpacing="0.05em">Sweet Therapy</text>
    <line x1="60" y1="116" x2="100" y2="116" stroke="#B08D4F" strokeWidth="0.5" />
    <text x="80" y="125" fill="#2A211B" fontSize="5.5" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" letterSpacing="0.05em">SÉRUM</text>
    <text x="80" y="132" fill="#2A211B" fontSize="5" fontWeight="800" fontFamily="sans-serif" textAnchor="middle" letterSpacing="0.05em">FORTALECEDOR</text>
    <text x="80" y="141" fill="#4E141C" fontSize="3.8" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">detox metais tóxicos</text>
    <line x1="60" y1="145" x2="100" y2="145" stroke="#B08D4F" strokeWidth="0.5" />
    <text x="80" y="156" fill="#5B4F45" fontSize="4" fontStyle="italic" fontFamily="serif" textAnchor="middle">60ml</text>
    
    {/* Glass Shine */}
    <path d="M46 75 C46 70, 50 67, 60 67 H65 C55 67, 48 72, 48 80 V175 C48 185, 52 190, 60 190 C50 190, 46 183, 46 175 Z" fill="white" opacity="0.2" />
    <rect x="110" y="65" width="4" height="110" rx="2" fill="white" opacity="0.12" />
    
    {/* Cap Threading */}
    <rect x="62" y="47" width="36" height="8" rx="1.5" fill="#DFC796" />
    
    {/* Squeeze Bulb */}
    <path d="M66 47 C66 32, 94 32, 94 47 Z" fill="#222" />
    {/* Cap */}
    <rect x="60" y="42" width="40" height="5" fill="#111" />
    
    {/* Pipette */}
    <rect x="77" y="180" width="6" height="25" rx="1" fill="white" fillOpacity="0.4" stroke="rgba(255,255,255,0.7)" strokeWidth="0.5" />
    
    <defs>
      <linearGradient id="glassGradOffer" x1="0" y1="0" x2="160" y2="220">
        <stop offset="0%" stopColor="#4A3B32" />
        <stop offset="50%" stopColor="#2A1F18" />
        <stop offset="100%" stopColor="#150F0B" />
      </linearGradient>
      <linearGradient id="liquidGradOffer" x1="0" y1="0" x2="0" y2="220">
        <stop offset="0%" stopColor="#DFC796" stopOpacity="0.6" />
        <stop offset="60%" stopColor="#B08D4F" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#6E1F2B" stopOpacity="0.9" />
      </linearGradient>
    </defs>
  </svg>
);

interface OfferSelectorProps {
  selectedId: number;
  onSelect: (id: number) => void;
}

const renderNumberedText = (text: string, numberClassName = 'number-inline') =>
  text.split(/(\d+(?:[,.]\d+)?)/g).map((part, index) =>
    /\d/.test(part) ? (
      <span key={index} className={numberClassName}>
        {part}
      </span>
    ) : (
      part
    )
  );

export default function OfferSelector({ selectedId, onSelect }: OfferSelectorProps) {
  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch max-w-6xl mx-auto">
      {protocols.map((protocol) => {
        const isSelected = selectedId === protocol.id;

        return (
          <motion.div
            key={protocol.id}
            id={`protocol-card-${protocol.id}`}
            onClick={() => onSelect(protocol.id)}
            className={`relative h-full rounded-[28px] border cursor-pointer select-none transition-all duration-300 flex flex-col overflow-hidden ${
              isSelected
                ? 'border-bordo ring-4 ring-bordo/80 bg-gradient-to-b from-[#FFF9F9] to-white shadow-[0_26px_52px_rgba(78,20,28,0.24)] scale-[1.02] z-20'
                : 'border-tan-deep/30 bg-white opacity-90 shadow-[0_14px_30px_rgba(42,33,27,0.10)] hover:border-bordo/45 hover:opacity-100 hover:scale-[1.01]'
            }`}
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', stiffness: 220, damping: 18 }}
          >
            {/* Top Badge Ribbon */}
            {(isSelected || protocol.topHeaderBadge) && (
              <div className={`text-cream text-[11px] font-extrabold tracking-widest uppercase py-2 text-center w-full flex items-center justify-center gap-1.5 transition-colors duration-300 ${
                isSelected ? 'bg-[#4E141C]' : 'bg-[#6E1F2B]/90'
              }`}>
                {isSelected ? '✓ SEU PROTOCOLO SELECIONADO' : protocol.topHeaderBadge}
              </div>
            )}

            <div className="p-4 sm:p-6 md:p-7 flex flex-1 flex-col items-stretch text-center">
              <div className="mb-2">
                <h3 className="offer-card-title text-center uppercase">
                  {protocol.name}
                </h3>
                <div className="mt-3 flex flex-col items-center justify-center">
                  {protocol.originalPrice && (
                    <span className="font-sans text-xs sm:text-sm font-semibold text-ink-soft/75 line-through mb-1">
                      De {protocol.originalPrice} por:
                    </span>
                  )}
                  <span className="font-sans text-[36px] sm:text-[46px] font-black leading-none tracking-tight text-[rgb(94,16,23)]">
                    {protocol.priceLabel}
                  </span>
                  <span className="font-sans text-xs sm:text-sm font-semibold text-bordo/80 whitespace-nowrap mt-1.5">
                    ou <strong className="font-bold text-[#4E141C]">12x de {protocol.installments}</strong>
                  </span>
                </div>
                {protocol.note && (
                  <span className="mt-3 inline-flex rounded-full bg-bordo/8 px-3 py-1 font-sans text-[10px] font-bold uppercase tracking-wider text-bordo/75">
                    {protocol.note}
                  </span>
                )}
              </div>

              <div className={`relative my-2 sm:my-3 flex items-center justify-center w-full px-2 py-1 ${
                protocol.id === 2 ? 'h-[330px] sm:h-[375px]' : protocol.id === 3 ? 'h-[320px] sm:h-[370px]' : 'h-[260px] sm:h-[300px]'
              }`}>
                <div className="absolute inset-x-6 bottom-2 h-12 rounded-full bg-bordo/10 blur-xl" />
                {protocol.imageUrl ? (
                  <img
                    src={protocol.imageUrl}
                    alt={protocol.name}
                    className={`relative z-10 max-h-full object-contain object-center drop-shadow-[0_18px_30px_rgba(78,20,28,0.24)] transition-transform duration-300 hover:scale-105 ${
                      protocol.id === 1
                        ? 'max-w-[88%] sm:max-w-[92%]'
                        : protocol.id === 2
                        ? 'max-w-[98%] scale-122'
                        : 'max-w-[96%] scale-115'
                    }`}
                  />
                ) : (
                  <div className="relative flex justify-center items-center w-full">
                    {/* Back Row (3 Bottles) */}
                    <div className="absolute left-1/2 -translate-x-16 scale-75 opacity-70 mt-3 z-0">
                      <GlassBottle className="w-18 h-26" />
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2 scale-75 opacity-70 mt-4 z-0">
                      <GlassBottle className="w-18 h-26" />
                    </div>
                    <div className="absolute left-1/2 translate-x-6 scale-75 opacity-70 mt-3 z-0">
                      <GlassBottle className="w-18 h-26" />
                    </div>

                    {/* Front Row (2 Bottles) */}
                    <div className="absolute left-1/2 -translate-x-10 scale-95 z-10 mt-1">
                      <GlassBottle className="w-22 h-30" />
                    </div>
                    <div className="absolute left-1/2 translate-x-0 scale-95 z-10 mt-1">
                      <GlassBottle className="w-22 h-30" />
                    </div>
                  </div>
                )}
              </div>

              <p className="mx-auto my-3 max-w-[18rem] font-sans text-sm font-semibold leading-relaxed text-ink-soft">
                {protocol.subtitle}
              </p>

              {protocol.hasFreeShipping && (
                <div className="my-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-[#16A34A]/15 border border-[#16A34A]/30 px-3.5 py-1.5 font-sans text-xs font-black uppercase text-[#16A34A] tracking-wider shadow-xs">
                  <Truck className="w-4 h-4 text-[#16A34A]" /> FRETE GRÁTIS INCLUSO
                </div>
              )}

              <div className="my-4 rounded-2xl border border-tan-deep/15 bg-cream/55 p-4 sm:p-5">
                <ul className="space-y-3">
                  {protocol.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-2.5 text-sm text-ink leading-snug text-left">
                      <CheckCircle2 className="w-4 h-4 text-bordo shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="font-sans font-semibold">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {protocol.bonusSection && (
                <div className="mb-5 rounded-2xl sm:rounded-3xl border border-[#ECE0CE] bg-[#FAF3E8] p-4 sm:p-5 text-left shadow-xs">
                  <div className="flex items-center justify-between gap-2 mb-3.5 pb-2.5 border-b border-[#ECE0CE]">
                    <span className="flex items-center gap-2 font-sans font-extrabold text-sm text-[#4E141C] uppercase tracking-wider">
                      🎁 {protocol.bonusSection.title}
                    </span>
                    <span className="bg-white text-[#4E141C] font-sans font-extrabold text-xs px-3 py-1 rounded-full shadow-xs border border-[#ECE0CE]/70 whitespace-nowrap shrink-0">
                      {protocol.bonusSection.itemCountLabel}
                    </span>
                  </div>
                  <div className="space-y-3.5">
                    {protocol.bonusSection.items.map((bonus, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-3 text-left">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#5C1D24] text-xs font-bold text-white mt-0.5 shadow-xs">
                          {bIdx + 1}
                        </span>
                        <div>
                          <p className="font-sans font-bold text-sm text-[#2A1D1A] leading-snug">
                            {bonus.title}
                          </p>
                          {bonus.subtext && (
                            <p className="font-sans text-xs text-[#6B5E57] leading-relaxed mt-0.5">
                              {bonus.subtext}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className={`${protocol.hasFreeShipping ? 'mt-auto' : 'mt-1'} pt-1`}>
                {/* CTA Button matching image style */}
                <a
                  href={protocol.checkoutUrl}
                  className={`min-h-[58px] w-full inline-flex items-center justify-center font-sans font-extrabold text-sm sm:text-base py-3.5 px-6 rounded-full transition-all duration-300 cursor-pointer text-center ${
                    isSelected
                      ? 'bg-[#4E141C] hover:bg-[#6E1F2B] text-white shadow-[0_8px_20px_rgba(78,20,28,0.35)] scale-[1.02]'
                      : 'bg-[#4E141C]/90 hover:bg-[#4E141C] text-white/90 shadow-[0_4px_12px_rgba(78,20,28,0.18)]'
                  }`}
                >
                  {protocol.id === 1
                    ? 'Quero começar meu tratamento'
                    : protocol.id === 2
                    ? 'Quero resultados mais completos'
                    : 'Quero o tratamento completo'}
                </a>

                {/* Trust badges below button */}
                <div className="min-h-[18px] flex flex-wrap justify-center gap-x-4 gap-y-1 text-[10px] font-sans text-ink-soft/65 mt-3 select-none">
                  <span className="flex items-center gap-1"><ShieldCheck size={13} aria-hidden="true" /> Compra segura</span>
                  <span className="flex items-center gap-1"><Truck size={13} aria-hidden="true" /> Envio rápido</span>
                </div>
              </div>
            </div>

            {/* Bottom green banner for free shipping */}
            {protocol.hasFreeShipping && (
              <div className="bg-[#16A34A] text-white font-sans font-black text-sm uppercase py-2.5 text-center w-full tracking-wider mt-auto select-none flex items-center justify-center gap-2">
                <Truck size={18} aria-hidden="true" /> FRETE GRÁTIS
              </div>
            )}
          </motion.div>
        );
      })}
    </div>

    {/* Guarantees & Features List from Image 2 */}
    <div className="max-w-xl mx-auto mt-12 bg-cream/40 border border-tan-deep/20 rounded-2xl p-6 sm:p-7 text-left shadow-sm">
      <ul className="space-y-3 font-sans font-medium text-ink">
        <li className="flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-bordo shrink-0 mt-0.5" />
          <span className="font-semibold text-bordo text-sm sm:text-base">Resultado visível desde as primeiras aplicações*</span>
        </li>
        <li className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-bordo shrink-0 mt-0.5" />
            <span className="font-semibold text-bordo text-sm sm:text-base">Garantia de 30 dias</span>
          </div>
          <p className="pl-8 text-xs sm:text-sm italic text-ink-soft/90 leading-relaxed font-normal">
            *Se por qualquer motivo você desistir do tratamento basta nos devolver o seu tratamento 100% lacrado que devolvemos o seu dinheiro.
          </p>
        </li>
        <li className="flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-bordo shrink-0 mt-0.5" />
          <span className="font-semibold text-bordo text-sm sm:text-base">Envio prioritário</span>
        </li>
      </ul>
      <p className="text-xs font-sans text-ink-soft/75 mt-4 border-t border-tan-deep/15 pt-3 italic">
        *Resultados podem variar de acordo com cada tipo de fibra e nível de afinamento capilar.
      </p>
    </div>
    </>
  );
}

// Helper to easily get protocol by ID
export function getProtocolById(id: number) {
  return protocols.find((p) => p.id === id) || protocols[2];
}
