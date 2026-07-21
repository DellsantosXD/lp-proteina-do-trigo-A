import { motion } from 'motion/react';

interface ProductVisualizerProps {
  type: 'bottle' | 'texture' | 'hair-gif' | 'before-after';
  className?: string;
  variant?: 'card' | 'floating';
}

export default function ProductVisualizer({ type, className = '', variant = 'card' }: ProductVisualizerProps) {
  if (type === 'bottle') {
    return (
      <div className={`relative flex flex-col items-center justify-center bg-cream/30 rounded-2xl border border-tan-deep/50 overflow-hidden group p-6 select-none ${className}`}>
        {/* Soft background glow */}
        <div className="absolute inset-0 bg-radial from-rose/10 via-transparent to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-700" />
        
        <svg className="w-48 h-64 drop-shadow-[0_10px_20px_rgba(110,31,43,0.15)] relative z-10" viewBox="0 0 160 220" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Shadows */}
          <ellipse cx="80" cy="205" rx="45" ry="8" fill="rgba(42,33,27,0.12)" />
          
          {/* Glass Bottle Body */}
          <path d="M40 70 C40 60, 45 55, 60 55 L100 55 C115 55, 120 60, 120 70 L120 180 C120 195, 110 200, 80 200 C50 200, 40 195, 40 180 Z" fill="url(#glassGrad)" />
          
          {/* Golden/Rose Liquid Reflection inside bottle */}
          <path d="M44 85 C44 75, 48 72, 60 72 L100 72 C112 72, 116 75, 116 85 L116 175 C116 188, 108 193, 80 193 C52 193, 44 188, 44 175 Z" fill="url(#liquidGrad)" opacity="0.85" />
          
          {/* Premium Cream Label */}
          <path d="M40 95 H120 V165 H40 Z" fill="#FBF8F2" />
          <rect x="42" y="97" width="76" height="66" rx="2" stroke="#DFC796" strokeWidth="0.75" fill="none" />
          
          {/* Label Typography */}
          <text x="80" y="115" fill="#6E1F2B" fontSize="9" fontWeight="bold" fontFamily="Fraunces" textAnchor="middle" letterSpacing="0.05em">SWEET THERAPY</text>
          <line x1="60" y1="122" x2="100" y2="122" stroke="#B08D4F" strokeWidth="0.5" />
          <text x="80" y="134" fill="#2A211B" fontSize="6.5" fontWeight="600" fontFamily="Work Sans" textAnchor="middle" letterSpacing="0.1em">PROTEÍNA DO TRIGO</text>
          <text x="80" y="142" fill="#B08D4F" fontSize="8" fontStyle="italic" fontFamily="Fraunces" textAnchor="middle">Pro Filler</text>
          <text x="80" y="156" fill="#5B4F45" fontSize="4.5" fontFamily="Work Sans" textAnchor="middle" letterSpacing="0.05em">RECONSTRUÇÃO MOLECULAR</text>
          
          {/* Glass Shine */}
          <path d="M46 75 C46 70, 50 67, 60 67 H65 C55 67, 48 72, 48 80 V175 C48 185, 52 190, 60 190 C50 190, 46 183, 46 175 Z" fill="white" opacity="0.25" />
          <rect x="110" y="65" width="4" height="110" rx="2" fill="white" opacity="0.15" />
          
          {/* Dropper Cap Threading */}
          <rect x="62" y="47" width="36" height="8" rx="1.5" fill="#DFC796" />
          <line x1="66" y1="47" x2="66" y2="55" stroke="#B08D4F" strokeWidth="1" />
          <line x1="73" y1="47" x2="73" y2="55" stroke="#B08D4F" strokeWidth="1" />
          <line x1="80" y1="47" x2="80" y2="55" stroke="#B08D4F" strokeWidth="1" />
          <line x1="87" y1="47" x2="87" y2="55" stroke="#B08D4F" strokeWidth="1" />
          <line x1="94" y1="47" x2="94" y2="55" stroke="#B08D4F" strokeWidth="1" />

          {/* Squeeze Bulb */}
          <path d="M66 47 C66 32, 94 32, 94 47 Z" fill="#6E1F2B" />
          {/* Cap */}
          <rect x="60" y="42" width="40" height="5" fill="#4E141C" />
          
          {/* Pipette / Glass tube sticking down */}
          <rect x="77" y="180" width="6" height="25" rx="1" fill="white" fillOpacity="0.4" stroke="rgba(255,255,255,0.7)" strokeWidth="0.5" />
          <path d="M77 205 L80 209 L83 205 Z" fill="white" fillOpacity="0.4" />
          
          {/* Gradients */}
          <defs>
            <linearGradient id="glassGrad" x1="0" y1="0" x2="160" y2="220">
              <stop offset="0%" stopColor="#8c2f3d" />
              <stop offset="50%" stopColor="#4e141c" />
              <stop offset="100%" stopColor="#25060b" />
            </linearGradient>
            <linearGradient id="liquidGrad" x1="0" y1="0" x2="0" y2="220">
              <stop offset="0%" stopColor="#E7C9C2" stopOpacity="0.6" />
              <stop offset="60%" stopColor="#B08D4F" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#6E1F2B" stopOpacity="0.9" />
            </linearGradient>
          </defs>
        </svg>

        {/* Floating dropping animation */}
        <div className="absolute bottom-12 flex flex-col items-center">
          <motion.div 
            className="w-2.5 h-2.5 rounded-full bg-rose shadow-md"
            initial={{ y: -20, opacity: 0, scale: 0.5 }}
            animate={{ 
              y: [0, 40], 
              opacity: [0, 1, 1, 0], 
              scale: [0.6, 1, 1, 0.4] 
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeIn"
            }}
          />
          <motion.div 
            className="w-4 h-1 bg-rose/40 rounded-full mt-10 blur-[1px]"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 1.2, 0.3], 
              opacity: [0, 0.8, 0] 
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeIn",
              delay: 1.8
            }}
          />
        </div>

        {/* Luxury details */}
        <span className="text-xxs font-mono tracking-widest text-bordo mt-6 uppercase opacity-80 group-hover:opacity-100 transition-opacity">AEROSSOL / ATIVO PURO</span>
        <span className="text-xs font-serif italic text-bordo font-medium mt-1">Proteína do Trigo Pro Filler</span>
      </div>
    );
  }

  if (type === 'texture') {
    return (
      <div className={`relative bg-cream overflow-hidden rounded-2xl border border-tan-deep/40 h-64 flex flex-col justify-end p-5 ${className}`}>
        {/* Wavy shimmery background simulating cream-serum */}
        <div className="absolute inset-0 bg-gradient-to-tr from-rose/20 via-cream to-tan/30" />
        
        {/* Animated fluid ripples */}
        <svg className="absolute inset-0 w-full h-full opacity-60" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <motion.path 
            d="M-50,150 C100,100 150,220 250,140 C350,60 300,180 450,130 L450,350 L-50,350 Z" 
            fill="url(#rippleGrad1)"
            animate={{
              d: [
                "M-50,150 C100,100 150,220 250,140 C350,60 300,180 450,130 L450,350 L-50,350 Z",
                "M-50,130 C120,130 140,190 270,160 C400,130 280,200 450,150 L450,350 L-50,350 Z",
                "M-50,150 C100,100 150,220 250,140 C350,60 300,180 450,130 L450,350 L-50,350 Z",
              ]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.path 
            d="M-50,180 C80,140 180,240 280,180 C380,120 320,220 450,170 L450,350 L-50,350 Z" 
            fill="url(#rippleGrad2)"
            animate={{
              d: [
                "M-50,180 C80,140 180,240 280,180 C380,120 320,220 450,170 L450,350 L-50,350 Z",
                "M-50,160 C90,170 160,200 290,190 C420,180 340,240 450,190 L450,350 L-50,350 Z",
                "M-50,180 C80,140 180,240 280,180 C380,120 320,220 450,170 L450,350 L-50,350 Z",
              ]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          {/* Shiny bubbles */}
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.circle
              key={i}
              cx={80 * i + (i % 2 === 0 ? 10 : -15)}
              cy={120 + i * 15}
              r={3 + (i % 3)}
              fill="white"
              fillOpacity="0.7"
              stroke="#B08D4F"
              strokeWidth="0.5"
              strokeOpacity="0.3"
              animate={{
                y: [0, -15, 0],
                x: [0, 5, 0],
                scale: [1, 1.15, 1]
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.4
              }}
            />
          ))}
          <defs>
            <linearGradient id="rippleGrad1" x1="0" y1="150" x2="400" y2="300" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#DFC796" stopOpacity="0.15" />
              <stop offset="60%" stopColor="#E7C9C2" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#6E1F2B" stopOpacity="0.25" />
            </linearGradient>
            <linearGradient id="rippleGrad2" x1="0" y1="180" x2="400" y2="300" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#DFC796" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#E7C9C2" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#6E1F2B" stopOpacity="0.4" />
            </linearGradient>
          </defs>
        </svg>

        {/* Floating molecular particles (simulating proteins) */}
        <div className="absolute inset-0 flex justify-around items-center h-40">
          {[...Array(6)].map((_, idx) => (
            <motion.div
              key={idx}
              className="w-1.5 h-1.5 rounded-full bg-bordo/40"
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.3, 0.9, 0.3],
                y: [0, -20 - (idx * 5), 0]
              }}
              transition={{
                duration: 3 + idx,
                repeat: Infinity,
                delay: idx * 0.5,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center">
          <span className="text-xxs font-mono tracking-widest text-bordo uppercase font-bold block mb-1">Toque Viscoso Premium</span>
          <p className="text-sm text-ink-soft italic font-serif">"Textura leve, com absorção molecular instantânea. Penetra no fio úmido sem deixar pesado ou rígido."</p>
        </div>
      </div>
    );
  }

  if (type === 'hair-gif') {
    const isFloating = variant === 'floating';

    return (
      <div
        className={`relative text-ink overflow-hidden ${
          isFloating
            ? 'bg-transparent p-0'
            : 'bg-white rounded-2xl border border-tan-deep/30 p-4 sm:p-5 shadow-sm'
        } ${className}`}
      >
        {!isFloating && (
          <div className="absolute inset-0 bg-radial-[circle_at_0%_0%] from-rose/15 via-transparent to-transparent pointer-events-none" />
        )}

        {!isFloating && (
          <div className="relative">
            <span className="text-xxs font-mono tracking-widest text-bordo uppercase font-bold block mb-1">Visualização microscópica</span>
            <h4 className="text-lg font-serif italic text-bordo">Reconstrução em 3 camadas</h4>
          </div>
        )}

        <div
          className={`relative aspect-[16/9] min-h-[190px] sm:min-h-[300px] overflow-hidden rounded-[28px] ${
            isFloating
              ? 'bg-transparent shadow-[0_28px_70px_rgba(110,31,43,0.16)]'
              : 'mt-4 bg-[#F5EFEB] border border-tan-deep/20 shadow-inner'
          }`}
        >
          <img
            src="/process-demo/molecular-cortex-empty.png"
            alt="Corte microscópico da fibra capilar com microfissuras abertas"
            className="absolute inset-0 h-full w-full object-cover contrast-[1.18] saturate-[1.1]"
          />
          <motion.img
            src="/process-demo/molecular-cortex-sealed.png"
            alt="Fibra capilar reconstruída e selada"
            className="absolute inset-0 h-full w-full object-cover contrast-[1.18] saturate-[1.1]"
            animate={{
              opacity: [0, 0, 0.42, 0.82, 0.82, 0],
              clipPath: ['inset(0 100% 0 0)', 'inset(0 100% 0 0)', 'inset(0 44% 0 0)', 'inset(0 0% 0 0)', 'inset(0 0% 0 0)', 'inset(0 100% 0 0)']
            }}
            transition={{ duration: 12, times: [0, 0.22, 0.48, 0.62, 0.78, 1], repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/35 via-transparent to-bordo/15 pointer-events-none" />
          {isFloating && (
            <>
              <div className="absolute inset-0 rounded-[28px] ring-1 ring-white/45 pointer-events-none" />
              <div className="absolute inset-x-8 bottom-0 h-16 bg-bordo/18 blur-3xl pointer-events-none" />
            </>
          )}

          {[0, 1, 2, 3, 4, 5, 6].map((particle) => {
            const targetX = [38, 43, 47, 41, 50, 45, 39][particle];
            const startY = [22, 50, 68, 36, 76, 44, 58][particle];
            const targetY = [31, 52, 63, 42, 69, 46, 57][particle];

            return (
              <motion.span
              key={particle}
              className="absolute z-20 block rounded-full border border-white/90 bg-[#F9DDAE] shadow-[0_0_8px_#fff,0_0_18px_rgba(255,211,143,0.95)]"
              style={{
                left: '-8%',
                top: `${startY}%`,
                width: `${[8, 6, 10, 7, 6, 9, 5][particle]}px`,
                height: `${[8, 6, 10, 7, 6, 9, 5][particle]}px`
              }}
              animate={{
                left: ['-8%', `${targetX - 8}%`, `${targetX}%`, `${targetX}%`],
                top: [`${startY}%`, `${(startY + targetY) / 2}%`, `${targetY}%`, `${targetY}%`],
                opacity: [0, 1, 1, 0],
                scale: [0.5, 1, 1.25, 0.35]
              }}
              transition={{
                duration: 4.8,
                times: [0, 0.62, 0.78, 1],
                delay: particle * 0.52,
                repeat: Infinity,
                repeatDelay: 0.3,
                ease: 'easeOut'
              }}
            />
            );
          })}

          {[0, 1, 2].map((ring) => (
            <motion.span
              key={ring}
              className="absolute z-10 block h-7 w-7 rounded-full border border-[#F9DDAE]/90 shadow-[0_0_18px_rgba(255,211,143,0.7)]"
              style={{ left: `${[37, 42, 47][ring]}%`, top: `${[38, 54, 44][ring]}%` }}
              animate={{ opacity: [0, 0.8, 0], scale: [0.25, 1.45, 2.1] }}
              transition={{ duration: 1.7, delay: 2.8 + ring * 0.85, repeat: Infinity, repeatDelay: 3.2, ease: 'easeOut' }}
            />
          ))}
          <motion.div
            className="absolute left-[35%] top-[31%] h-[43%] w-[20%] rounded-full bg-rose/20 blur-xl pointer-events-none"
            animate={{ opacity: [0.08, 0.4, 0.08], scale: [0.85, 1.05, 0.85] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute inset-y-0 z-30 w-[18%] bg-gradient-to-r from-transparent via-white/45 to-transparent pointer-events-none mix-blend-screen"
            animate={{ left: ['20%', '82%', '82%', '20%'], opacity: [0, 0.7, 0.7, 0] }}
            transition={{ duration: 12, times: [0, 0.58, 0.78, 1], repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="absolute bottom-2 right-3 rounded bg-white/85 px-2 py-1 text-[9px] font-mono uppercase tracking-wider text-bordo">
            Ativos em penetração
          </div>
        </div>

        {!isFloating && (
          <div className="relative mt-3 flex items-center justify-between border-t border-tan-deep/15 pt-3 text-[10px] font-mono uppercase tracking-wider text-ink-soft">
            <span>Microfissuras preenchidas e cutícula selada</span>
            <span className="text-bordo font-bold">Reconstrução ativa</span>
          </div>
        )}
      </div>
    );
  }

  // Before After Hair Structure Visualization
  return (
    <div className={`grid grid-cols-2 gap-4 bg-cream rounded-2xl border border-tan-deep/40 p-4 ${className}`}>
      <div className="flex flex-col items-center p-3 bg-white/40 rounded-xl border border-tan-deep/20 text-center relative overflow-hidden">
        <span className="text-xxs font-mono tracking-wider text-ink-soft uppercase font-bold bg-tan-deep/20 px-2 py-0.5 rounded-full mb-3">CABELO COMUM / AFINADO</span>
        
        {/* Damaged real strand image */}
        <div className="w-full h-16 flex items-center justify-center mb-2 overflow-hidden rounded-lg bg-cream/40 border border-tan-deep/15">
          <img 
            src="https://iili.io/ChNqUnn.jpg" 
            alt="Fio Comum Real" 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 opacity-80 filter grayscale"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <p className="text-xs font-serif text-bordo font-semibold">Microfissuras Abertas</p>
        <p className="text-xxs text-ink-soft mt-1">Fios murchos, quebradiços, que perdem massa na 1ª lavagem</p>
      </div>

      <div className="flex flex-col items-center p-3 bg-white/40 rounded-xl border border-tan-deep/20 text-center relative overflow-hidden">
        <span className="text-xxs font-mono tracking-wider text-rose uppercase font-bold bg-rose/25 px-2 py-0.5 rounded-full mb-3">RECONSTRUÇÃO 3 CAMADAS</span>
        
        {/* Reconstructed real strand image */}
        <div className="w-full h-16 flex items-center justify-center mb-2 overflow-hidden rounded-lg bg-cream/40 border border-tan-deep/15">
          <img 
            src="https://iili.io/ChNqUnn.jpg" 
            alt="Fio Reconstruído Real" 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <p className="text-xs font-serif text-bordo font-semibold">Fibra Encorpada e Selada</p>
        <p className="text-xxs text-ink-soft mt-1">Massa retida no interior, aumentando diâmetro em até 3x</p>
      </div>
    </div>
  );
}
