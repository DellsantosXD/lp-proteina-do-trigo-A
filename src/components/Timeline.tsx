import { motion, useScroll, useSpring } from 'motion/react';
import { useRef } from 'react';
import { TimelineItem } from '../types';

const items: TimelineItem[] = [
  {
    id: 1,
    title: 'Durante anos eu acompanhei milhares de histórias de afinamento.',
    description:
      'Durante mais de uma década acompanhei milhares de mulheres enfrentando afinamento, queda e quebra capilar. Vi tratamentos funcionarem por algumas semanas e depois perderem efeito. Foi ali que comecei a entender que o problema não era apenas tratar os fios, mas restaurar sua estrutura interna.'
  },
  {
    id: 2,
    title: 'Eu escondia o afinamento em vez de resolver.',
    description:
      'Não era vaidade. Era a tentativa de disfarçar um cabelo que perdia cada vez mais corpo. Quanto mais química eu fazia para esconder o problema, mais fina e frágil a fibra ficava.'
  },
  {
    id: 3,
    title: 'Fiz tudo o que diziam que funcionava.',
    description:
      'Máscaras caras. Cronogramas rigorosos. Produtos importados. O brilho aparecia por alguns dias, mas o corpo do cabelo nunca voltava. Era um ciclo que sempre recomeçava.'
  },
  {
    id: 4,
    title: 'No ensaio do nascimento do meu segundo filho olhei aquelas fotos e tomei uma decisão: eu precisava encontrar uma resposta científica para o meu próprio cabelo.',
    description:
      'Eu não queria apenas esconder o afinamento. Queria entender por que ele acontecia.'
  },
  {
    id: 5,
    title: 'Foi estudando a estrutura da fibra que encontrei a resposta.',
    description:
      'O problema não era falta de proteína. Era a forma como ela chegava ao fio. A maioria permanecia apenas na superfície, sem restaurar as regiões realmente danificadas.'
  },
  {
    id: 6,
    title: 'Foi assim que nasceu a Reconstrução Molecular em 3 Camadas.',
    description:
      'Depois de entender por que tantas reconstruções falhavam, desenvolvi um protocolo que atua em sequência. A primeira camada preenche as regiões fragilizadas da fibra, a segunda devolve densidade ao córtex e a terceira blinda a cutícula para preservar o resultado por muito mais tempo.'
  },
  {
    id: 7,
    title: 'Quando vi que funcionava, decidi levar essa tecnologia para milhares de mulheres.',
    description:
      'Pela primeira vez em muitos anos, vi meu cabelo recuperar corpo, densidade e movimento. Quando confirmei que aquela tecnologia entregava resultados de forma consistente, percebi que ela não poderia ficar restrita à clínica. Foi assim que nasceu o projeto que deu origem à primeira marca brasileira dedicada exclusivamente à terapia capilar em casa, permitindo que milhares de mulheres restaurassem a fibra capilar com a mesma tecnologia, no conforto de casa.'
  }
];

const labels = ['Autoridade', 'Dano', 'Frustração', 'Virada', 'Pesquisa', 'Protocolo', 'Resultado'];

const visuals: Record<number, { src: string; alt: string; position: string; height?: string }> = {
  1: {
    src: '/timeline/card-1.jpg',
    alt: 'Durante anos eu acompanhei milhares de histórias de afinamento',
    position: 'object-[center_45%]',
    height: 'h-80 sm:h-[420px]'
  },
  2: {
    src: '/timeline/card-2.jpg',
    alt: 'Eu escondia o afinamento em vez de resolver',
    position: 'object-[center_15%]',
    height: 'h-64 sm:h-80'
  },
  3: {
    src: '/timeline/card-3.jpg',
    alt: 'Fiz tudo o que diziam que funcionava',
    position: 'object-[left_bottom]',
    height: 'h-64 sm:h-80'
  },
  4: {
    src: '/timeline/card-4.jpg',
    alt: 'No ensaio do nascimento do meu segundo filho',
    position: 'object-center',
    height: 'h-60 sm:h-72'
  },
  5: {
    src: '/timeline/card-5.jpg',
    alt: 'Foi estudando a estrutura da fibra que encontrei a resposta',
    position: 'object-[left_bottom]',
    height: 'h-64 sm:h-80'
  },
  6: {
    src: '/timeline/card-6.jpg',
    alt: 'Foi assim que nasceu a Reconstrução Molecular em 3 Camadas',
    position: 'object-[center_35%]',
    height: 'h-80 sm:h-[400px]'
  },
  7: {
    src: '/timeline/card-7.jpg',
    alt: 'Quando vi que funcionava, decidi levar essa tecnologia para milhares de mulheres',
    position: 'object-[center_20%]',
    height: 'h-80 sm:h-[400px]'
  }
};

export default function Timeline() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 72%', 'end 38%']
  });
  const lineProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });
  return (
    <div ref={timelineRef} className="relative isolate overflow-hidden pb-2">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute bottom-3 left-[22px] top-3 w-[2px] bg-gradient-to-b from-cream/10 via-tan-deep/55 to-cream/10 sm:left-1/2 sm:-translate-x-1/2" />
        <motion.div
          className="absolute left-[22px] top-3 w-[3px] origin-top rounded-full bg-gradient-to-b from-tan-deep via-tan-deep to-transparent sm:left-1/2 sm:-translate-x-1/2"
          style={{ scaleY: lineProgress, height: 'calc(100% - 24px)' }}
        />
      </div>

      <div className="relative z-10 space-y-7 sm:space-y-8">
        {items.map((item, index) => {
          const visual = visuals[item.id];
          const alignRight = index % 2 === 0;

          return (
            <motion.article
              key={item.id}
              className={`relative grid grid-cols-[44px_1fr] gap-3 sm:grid-cols-[1fr_48px_1fr] sm:gap-7 ${
                alignRight ? '' : 'sm:[&_.timeline-card]:col-start-1'
              }`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-90px' }}
              transition={{ duration: 0.65, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative z-10 col-start-1 flex justify-center sm:col-start-2">
                <motion.div
                  className="number-badge mt-1 hidden h-8 w-8 items-center justify-center rounded-full border border-cream/45 bg-cream text-bordo shadow-[0_0_0_4px_rgba(251,248,242,0.08),0_12px_24px_rgba(0,0,0,0.18)] sm:flex sm:h-10 sm:w-10 sm:shadow-[0_0_0_6px_rgba(251,248,242,0.08),0_12px_24px_rgba(0,0,0,0.18)]"
                  initial={{ scale: 0.86, opacity: 0 }}
                  whileInView={{
                    scale: [0.86, 1.12, 1],
                    opacity: [0, 1, 1],
                    boxShadow: [
                      '0 0 0 0 rgba(251,248,242,0), 0 12px 24px rgba(0,0,0,0.18)',
                      '0 0 0 14px rgba(251,248,242,0.14), 0 0 22px rgba(251,248,242,0.62), 0 12px 24px rgba(0,0,0,0.18)',
                      '0 0 0 6px rgba(251,248,242,0.08), 0 12px 24px rgba(0,0,0,0.18)',
                    ],
                  }}
                  viewport={{ once: true, margin: '-46% 0px -46% 0px' }}
                  transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="relative z-10">
                  {String(item.id).padStart(2, '0')}
                  </span>
                </motion.div>
              </div>

              <div className={`timeline-card col-start-2 sm:row-start-1 ${alignRight ? 'sm:col-start-3' : 'sm:col-start-1'}`}>
                <motion.div
                  className="group relative overflow-hidden rounded-[22px] border border-cream/18 bg-cream/[0.96] p-5 text-ink shadow-[0_18px_44px_rgba(18,3,7,0.22)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(18,3,7,0.3)] sm:p-6"
                  whileHover={{ y: -4, rotateX: 1.5 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-tan-deep via-rose to-bordo" />
                  <motion.div
                    className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/45 to-transparent"
                    initial={{ x: '-120%', opacity: 0 }}
                    whileInView={{ x: '340%', opacity: [0, 1, 0] }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 1.2, delay: index * 0.08 + 0.25, ease: 'easeInOut' }}
                  />

                  {/* Mobile step badge */}
                  <div className="mb-3 sm:hidden">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-bordo font-sans text-[10px] font-extrabold text-cream">
                      {String(item.id).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="mb-3 font-serif text-xl font-black leading-tight text-bordo sm:text-2xl">
                    {item.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-ink-soft sm:text-base">
                    {item.description}
                  </p>

                  {visual && (
                    <div className="mt-5 overflow-hidden rounded-2xl border border-tan-deep/25 bg-white shadow-inner">
                      <motion.img
                        src={visual.src}
                        alt={visual.alt}
                        className={`w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] ${visual.height || 'h-48 sm:h-52'} ${visual.position}`}
                        referrerPolicy="no-referrer"
                        initial={{ scale: 1.06, opacity: 0.82 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}
