import { motion } from 'motion/react';
import { CheckCircle2, ShieldCheck, Truck } from 'lucide-react';
import { Protocol } from '../types';

interface ExtendedProtocol extends Protocol {
  priceLabel: string;
  subtitle: string;
  installments: string;
  note?: string;
  infoBox: string;
  imageUrl?: string;
  hasFreeShipping?: boolean;
  topHeaderBadge?: string;
}

const protocols: ExtendedProtocol[] = [
  {
    id: 1,
    name: 'Protocolo Essencial',
    priceLabel: 'R$197',
    subtitle: 'Reconstrói e devolve corpo à fibra afinada.',
    price: 197,
    installments: '19,78',
    description: 'Reconstrói e devolve corpo à fibra afinada.',
    items: [
      'Proteína do Trigo Pro Filler'
    ],
    imageUrl: '/products/proteina-trigo-pro-filler-cutout.png',
    infoBox: 'Reconstrói e devolve corpo à fibra afinada.',
    checkoutUrl: 'https://pay.youshop.com.br/JN9DUO3SJMXM1OQL',
    bonuses: [
      'E-book: “Como encorpar seus cabelos em casa”',
      'E-book: “Manual completo de massagem capilar em casa”'
    ]
  },
  {
    id: 2,
    name: 'Protocolo Intensivo',
    priceLabel: 'R$267',
    subtitle: 'Além da fibra, fortalece o ambiente onde o novo fio nasce.',
    price: 267,
    installments: '26,81',
    badge: 'Recomendado',
    description: 'Além da fibra, fortalece o ambiente onde o novo fio nasce.',
    items: [
      'Proteína do Trigo Pro Filler',
      'Sérum Fortalecedor'
    ],
    imageUrl: '/products/protocolo-2-kit-cutout.png',
    infoBox: 'Além da fibra, fortalece o ambiente onde o novo fio nasce.',
    checkoutUrl: 'https://pay.youshop.com.br/KPQVFOAEEP8ZTYNL',
    bonuses: [
      'E-book: “Como encorpar seus cabelos em casa”',
      'E-book: “Manual completo de massagem capilar em casa”'
    ]
  },
  {
    id: 3,
    name: 'Protocolo Completo',
    priceLabel: 'R$327',
    subtitle: 'Para quem deseja tratar fios afinados, crescimento capilar e detox do couro cabeludo em um único tratamento.',
    topHeaderBadge: '🔥 MELHOR CUSTO-BENEFÍCIO',
    price: 327,
    installments: '32,83',
    badge: 'Mais completo',
    description: 'Para quem deseja tratar fios afinados, crescimento capilar e detox do couro cabeludo em um único tratamento.',
    items: [
      'Proteína do Trigo Pro Filler',
      'Sérum Fortalecedor',
      'Shampoo Antioxidante Mineral'
    ],
    imageUrl: '/products/protocolo-3-kit-cutout.png',
    infoBox: 'Para quem deseja tratar fios afinados, crescimento capilar e detox do couro cabeludo em um único tratamento.',
    hasFreeShipping: true,
    checkoutUrl: 'https://pay.youshop.com.br/BRFYWVIZZTWAMNB1',
    bonuses: [
      'E-book: “Como encorpar seus cabelos em casa”',
      'E-book: “Manual completo de massagem capilar em casa”'
    ]
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

            <div className="p-5 sm:p-6 md:p-7 flex flex-1 flex-col items-stretch text-center">
              <div className="mb-4">
                <h3 className="offer-card-title text-center uppercase">
                  {protocol.name}
                </h3>
                <div className="mt-2 flex items-center justify-center gap-2">
                  <span className="font-sans text-[38px] font-bold leading-none tracking-[-0.01em] text-[rgb(94,16,23)]">
                    {protocol.priceLabel}
                  </span>
                </div>
                <p className="mx-auto mt-3 max-w-[18rem] font-sans text-sm font-medium leading-relaxed text-ink-soft">
                  {protocol.subtitle}
                </p>
                {protocol.note && (
                  <span className="mt-3 inline-flex rounded-full bg-bordo/8 px-3 py-1 font-sans text-[10px] font-bold uppercase tracking-wider text-bordo/75">
                    {protocol.note}
                  </span>
                )}
              </div>

              <div className="relative my-3 flex items-center justify-center overflow-visible h-64 sm:h-72">
                <div className="absolute inset-x-8 bottom-5 h-14 rounded-full bg-bordo/12 blur-2xl" />
                {protocol.imageUrl ? (
                  <img
                    src={protocol.imageUrl}
                    alt={protocol.name}
                    className={`relative z-10 object-contain object-center drop-shadow-[0_18px_24px_rgba(78,20,28,0.18)] transition-transform duration-300 ${
                      protocol.id >= 2 ? 'h-[135%] w-[135%] scale-110' : 'h-[118%] w-[118%]'
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

              {protocol.bonuses && protocol.bonuses.length > 0 && (
                <div className="mb-4 rounded-2xl border border-amber-500/35 bg-gradient-to-br from-amber-500/10 via-cream/80 to-amber-100/30 p-4 text-left shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-1.5 mb-3 pb-2 border-b border-amber-500/20">
                    <span className="inline-flex items-center gap-1.5 bg-[#4E141C] text-cream font-sans text-[11px] font-black uppercase px-3 py-1 rounded-full tracking-wide shadow-xs whitespace-nowrap">
                      🎁 2 BÔNUS EXCLUSIVOS
                    </span>
                    <span className="text-[11px] font-sans font-black text-[#16A34A] uppercase tracking-wider bg-[#16A34A]/10 px-2.5 py-0.5 rounded-full whitespace-nowrap">
                      100% GRÁTIS
                    </span>
                  </div>
                  <ul className="space-y-2.5">
                    {protocol.bonuses.map((bonus, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2 text-xs text-ink font-bold leading-snug">
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#16A34A] text-[9px] font-black text-white mt-0.5 shadow-xs">✓</span>
                        <span className="font-sans">{bonus} <span className="text-[#16A34A] font-extrabold text-[11px]">(INCLUSO)</span></span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mb-4 text-center">
                <span className="text-xs sm:text-sm text-ink-soft block mt-1">
                  ou <span className="font-extrabold text-[#4E141C]"><span className="number-inline-small">12</span>x de R$ <span className="number-inline-small">{protocol.installments}</span></span>
                </span>
              </div>

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
        <li className="flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-bordo shrink-0 mt-0.5" />
          <span className="font-semibold text-bordo text-sm sm:text-base">Garantia de 30 dias</span>
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
