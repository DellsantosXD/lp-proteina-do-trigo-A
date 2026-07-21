import { useEffect, useMemo, useRef, useState, type PointerEvent } from 'react';

type Step = {
  step: number;
  caption: string;
};

const steps: Step[] = [
  {
    step: 0,
    caption:
      '<strong>Estrutura Danificada (Córtex Exposto):</strong> O afinamento capilar cria microfissuras e lacunas profundas na fibra. É por onde o fio perde proteínas essenciais e água, ficando quebradiço, opaco e sem força.'
  },
  {
    step: 1,
    caption:
      '<strong>Etapa 1 · Preenchimento Molecular:</strong> O Complexo TriMolecular penetra as fissuras. Proteínas hidrolisadas de trigo, ervilha e arroz ligam-se às falhas por atração magnética, restabelecendo a massa cortical.'
  },
  {
    step: 2,
    caption:
      '<strong>Etapa 2 · Redensificação do Diâmetro:</strong> O NV Redensifier penetra e incha as células do córtex de forma tridimensional. A fibra recupera sua espessura, aumentando o diâmetro do fio de imediato ao toque.'
  },
  {
    step: 3,
    caption:
      '<strong>Etapa 3 · Selagem Cuticular e Blindagem:</strong> A cera de farelo de arroz envelopa a cutícula por completo, assentando as escamas e criando uma película protetora que ajuda a manter os ativos dentro do córtex por mais tempo.'
  }
];

const stageProgress = [0, 33, 69, 100];

export default function InteractiveStrand() {
  const [activeStep, setActiveStep] = useState(1);
  const [hasStarted, setHasStarted] = useState(false);
  const [isManual, setIsManual] = useState(false);
  const [manualProgress, setManualProgress] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progress = manualProgress ?? stageProgress[activeStep];

  useEffect(() => {
    const container = containerRef.current;
    if (!container || hasStarted) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.55 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted || isManual) return;

    setActiveStep(1);
    const redensifyTimer = window.setTimeout(() => setActiveStep(2), 8000);
    const sealTimer = window.setTimeout(() => setActiveStep(3), 16000);

    return () => {
      window.clearTimeout(redensifyTimer);
      window.clearTimeout(sealTimer);
    };
  }, [hasStarted, isManual]);

  const setManualStage = (nextProgress: number) => {
    const boundedProgress = Math.max(2, Math.min(100, nextProgress));
    const nextStep = boundedProgress < 34 ? 1 : boundedProgress < 69 ? 2 : 3;

    setHasStarted(true);
    setIsManual(true);
    setManualProgress(boundedProgress);
    setActiveStep(nextStep);
  };

  const handlePointerPosition = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const pointerProgress = ((event.clientX - bounds.left) / bounds.width) * 100;
    setManualStage(pointerProgress);
  };

  const current = steps[activeStep];
  const zones = useMemo(
    () => [
      { className: 'left-[1%] w-[33%]', active: activeStep === 1, upcoming: false },
      { className: 'left-[34%] w-[35%]', active: activeStep === 2, upcoming: activeStep < 2 },
      { className: 'left-[69%] w-[30%]', active: activeStep === 3, upcoming: activeStep < 3 }
    ],
    [activeStep]
  );

  return (
    <div
      ref={containerRef}
      className="bg-white text-ink rounded-3xl p-4 sm:p-6 md:p-8 border border-tan-deep/20 shadow-xl relative overflow-hidden"
      id="interactive-strand-container"
    >
      <div className="absolute inset-0 bg-radial-[circle_at_18%_0%] from-rose/20 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10">
        <div
          className="w-full aspect-[1150/606] min-h-[190px] sm:min-h-[260px] bg-[#F5EFEB] rounded-2xl border border-tan-deep/20 overflow-hidden relative mb-5 shadow-inner cursor-ew-resize touch-pan-y focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bordo"
          role="slider"
          aria-label="Etapas da reconstrução molecular"
          aria-valuemin={1}
          aria-valuemax={3}
          aria-valuenow={activeStep}
          tabIndex={0}
          onPointerDown={(event) => {
            event.currentTarget.setPointerCapture(event.pointerId);
            handlePointerPosition(event);
          }}
          onPointerEnter={handlePointerPosition}
          onPointerMove={handlePointerPosition}
          onKeyDown={(event) => {
            if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
              event.preventDefault();
              setManualStage(stageProgress[Math.min(3, activeStep + 1)]);
            }
            if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
              event.preventDefault();
              setManualStage(stageProgress[Math.max(1, activeStep - 1)]);
            }
          }}
        >
          <img
            src="/process-demo/base.png"
            alt=""
            className="absolute inset-0 w-full h-full object-contain sm:object-cover select-none pointer-events-none saturate-[0.62] brightness-[0.76] opacity-70"
          />
          <img
            src="/process-demo/treated.png"
            alt=""
            className="absolute inset-0 w-full h-full object-contain sm:object-cover select-none pointer-events-none saturate-[1.08] contrast-[1.04] brightness-[1.02]"
            style={{ clipPath: `inset(0 ${100 - progress}% 0 0)` }}
          />

          <div
            className="absolute z-40 top-[20%] h-[70%] w-1 -translate-x-1/2 pointer-events-none bg-gradient-to-b from-transparent via-cream/95 to-transparent shadow-[0_0_10px_#fff,0_0_26px_rgba(110,31,43,0.9)]"
            style={{ left: `${progress}%`, opacity: progress > 0 ? 0.95 : 0 }}
          >
            <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-bordo bg-cream shadow-[0_0_0_3px_rgba(255,255,255,0.5),0_0_18px_rgba(110,31,43,0.55)]" />
          </div>

          {zones.map((zone, index) => (
            <div
              key={index}
              className={`absolute z-10 top-[29%] bottom-[12%] rounded-[18px] border-2 pointer-events-none transition-all duration-500 ${zone.className} ${
                zone.active
                  ? 'border-cream/80 shadow-[0_0_34px_rgba(223,199,150,0.45),inset_0_0_30px_rgba(255,250,245,0.16)]'
                  : 'border-transparent'
              } ${zone.upcoming ? 'bg-ink/10 backdrop-blur-sm' : 'bg-transparent backdrop-blur-none'}`}
            />
          ))}

          {activeStep === 1 && (
            <div className="absolute z-30 left-[7%] top-[54%] h-[22%] w-[23%] pointer-events-none">
              {[0, 1, 2, 3, 4].map((particle) => (
                <span
                  key={particle}
                  className="absolute block h-2 w-2 rounded-full bg-[#FFE2BD] shadow-[0_0_10px_#fff] animate-[fillParticle_1.3s_ease-in-out_infinite]"
                  style={{
                    left: `${[8, 30, 63, 82, 46][particle]}%`,
                    top: `${[12, 55, 22, 70, 78][particle]}%`,
                    animationDelay: `${particle * 0.18}s`
                  }}
                />
              ))}
            </div>
          )}

        </div>

        <div className="mb-6 flex gap-2" aria-hidden="true">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${
                step <= activeStep ? 'bg-bordo' : 'bg-tan-deep/20'
              }`}
            />
          ))}
        </div>

        <div className="min-h-[96px] bg-cream/40 border border-tan-deep/20 rounded-2xl p-4 md:p-5 flex flex-col justify-center">
          <p
            className="text-sm sm:text-base md:text-lg text-ink-soft leading-relaxed font-sans"
            dangerouslySetInnerHTML={{ __html: current.caption }}
          />
        </div>
      </div>
    </div>
  );
}
