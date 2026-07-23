import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Dna, Activity, CheckCircle2 } from 'lucide-react';
import Header from './components/Header';
import InteractiveStrand from './components/InteractiveStrand';
import Timeline from './components/Timeline';
import OfferSelector, { getProtocolById } from './components/OfferSelector';
import FaqAccordion from './components/FaqAccordion';
import SocialProof from './components/SocialProof';
import ProductVisualizer from './components/ProductVisualizer';
import VideoPlayer from './components/VideoPlayer';

// Headline of Teste A
const headlineText = 'Seu rabo de cavalo virou um fiapo.<br />Seja qual for o motivo, a fibra pode ser reconstruída.';

// Lead paragraphs of Teste A
const leadParagraphs = [
  'Você já recorreu a um aplique ou até mesmo a uma peruca para esconder o quanto o seu cabelo afinou?',
  'Você se lembra de como era o seu cabelo antes?',
  'O rabo de cavalo era cheio.',
  'O coque tinha volume.',
  'Os fios eram encorpados e brilhantes.',
  'Hoje, quando você prende o cabelo, ele vira um fiapo.',
  'As pontas parecem cada vez mais finas.',
  'E o volume que antes fazia parte da sua identidade parece desaparecer um pouco mais a cada ano.',
  'Sou tricologista.',
  'Foram mais de 10 anos dedicados exclusivamente à terapia capilar, milhares de mulheres acompanhadas ao longo dessa jornada e mais de 3.500 profissionais formados.',
  'Mas existe algo que poucas pessoas sabem.',
  'Antes de ajudar milhares de mulheres a recuperarem cabelos visivelmente mais encorpados, eu precisei encontrar uma solução para o meu próprio cabelo.',
  'Foi justamente dessa busca que nasceu a tecnologia que você vai conhecer nesta página.'
];

type ConversionCtaProps = {
  eyebrow: string;
  title: string;
  description: string;
  href?: string;
  label: string;
  tone?: 'light' | 'dark';
};

function ConversionCta({ eyebrow, title, description, href = '#oferta', label, tone = 'light' }: ConversionCtaProps) {
  const isDark = tone === 'dark';

  return (
    <motion.div
      className={`relative overflow-hidden rounded-3xl border p-6 sm:p-8 text-center shadow-[0_18px_44px_rgba(78,20,28,0.12)] ${
        isDark
          ? 'border-cream/20 bg-cream/10 text-cream'
          : 'border-tan-deep/30 bg-gradient-to-br from-cream to-white text-ink'
      }`}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,rgba(255,255,255,0.24)_48%,transparent_70%)] pointer-events-none" />
      <div className="relative z-10">
        <span className={`mb-3 block text-[11px] font-mono font-bold uppercase tracking-widest ${isDark ? 'text-rose' : 'text-bordo'}`}>
          {eyebrow}
        </span>
        <h3 className={`mx-auto max-w-2xl font-serif text-2xl font-black leading-tight sm:text-3xl ${isDark ? 'text-cream' : 'text-bordo'}`}>
          {title}
        </h3>
        <p className={`mx-auto mt-3 max-w-xl text-sm leading-relaxed sm:text-base ${isDark ? 'text-cream/78' : 'text-ink-soft'}`}>
          {description}
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={href}
            className={`inline-flex w-full max-w-sm items-center justify-center rounded-full px-7 py-4 text-sm font-sans font-extrabold shadow-[0_10px_24px_rgba(78,20,28,0.22)] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 sm:w-auto ${
              isDark
                ? 'bg-cream text-bordo hover:bg-rose'
                : 'bg-gradient-to-r from-bordo to-bordo-deep text-cream hover:from-bordo-deep hover:to-bordo'
            }`}
          >
            {label}
          </a>
          <span className={`text-[10px] font-mono uppercase tracking-widest ${isDark ? 'text-cream/55' : 'text-ink-soft/60'}`}>
            Compra segura · Envio rápido
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [selectedProtocolId, setSelectedProtocolId] = useState<number>(3); // Default to protocol 3 (most popular)
  const [showStickyBar, setShowStickyBar] = useState<boolean>(false);
  const [hasVisiblePageCta, setHasVisiblePageCta] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(true); // Default to expanded so it matches the image perfectly on load!

  // Monitor scroll height to trigger sticky bottom checkout bar after Hero
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = document.getElementById('hero-section')?.offsetHeight || 600;
      if (window.scrollY > heroHeight - 100) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const visibleCtas = new Set<Element>();
    const pageCtas = Array.from(
      document.querySelectorAll<HTMLAnchorElement>('a[href="#oferta"], a[href="#checkout"]')
    ).filter((cta) => !cta.closest('[data-floating-cta]'));

    if (!pageCtas.length || !('IntersectionObserver' in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
            visibleCtas.add(entry.target);
          } else {
            visibleCtas.delete(entry.target);
          }
        });

        setHasVisiblePageCta(visibleCtas.size > 0);
      },
      {
        threshold: [0, 0.35, 0.65],
        rootMargin: '-12% 0px -18% 0px',
      }
    );

    pageCtas.forEach((cta) => observer.observe(cta));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const target = document.getElementById('ra-verified-seal');
    if (!target || document.getElementById('ra-embed-verified-seal')) return;

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.id = 'ra-embed-verified-seal';
    script.src = 'https://s3.amazonaws.com/raichu-beta/ra-verified/bundle.js';
    script.dataset.id = 'NDRPc042QUtuT1VBYWNBazpzd2VldC10aGVyYXB5';
    script.dataset.target = 'ra-verified-seal';
    script.dataset.model = 'horizontal_2';
    target.appendChild(script);
  }, []);

  const activeProtocol = getProtocolById(selectedProtocolId);
  const activeInstallment =
    activeProtocol.price === 179 ? '17,97' :
    activeProtocol.price === 297 ? '29,82' :
    activeProtocol.price === 397 ? '39,86' :
    (activeProtocol.price / 12).toFixed(2).replace('.', ',');

  return (
    <div className="min-h-screen bg-cream selection:bg-rose/50 relative pb-20 sm:pb-24">
      <Header />

      {/* HERO SECTION */}
      <section id="hero-section" className="relative pt-16 pb-20 px-6 overflow-hidden">
        {/* Shimmer Ambient Background */}
        <div className="absolute inset-0 bg-radial-[circle_at_15%_0%] from-rose/20 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-radial-[circle_at_100%_20%] from-tan/25 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Headline */}
          <div className="flex items-center justify-center mb-6">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-serif text-bordo font-black tracking-tight leading-tight text-3xl sm:text-5xl md:text-6xl max-w-4xl text-balance"
            >
              Seu rabo de cavalo virou um fiapo.
            </motion.h1>
          </div>

          <div className="max-w-2xl mx-auto mb-10 space-y-3">
            <p className="text-base sm:text-lg text-ink-soft leading-relaxed">
              O afinamento pode ter diferentes causas. A boa notícia é que a fibra capilar pode recuperar estrutura quando recebe a tecnologia certa.
            </p>
            <p className="text-base sm:text-lg text-ink font-medium leading-relaxed">
              A Reconstrução Molecular em 3 Camadas foi desenvolvida para restaurar a estrutura da fibra afinada, devolvendo corpo, densidade e resistência aos fios, sem depender de salão.
            </p>
          </div>

          {/* Premium Video Showcase representing clinical hair reconstruction in loop */}
          <div className="mx-auto mb-12 max-w-5xl">
            <VideoPlayer />
          </div>

          <div className="max-w-lg mx-auto">
            <a
              href="#oferta"
              className="inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r from-bordo to-bordo-deep hover:from-bordo-deep hover:to-bordo text-cream font-sans font-bold text-base md:text-lg px-8 py-5 rounded-full transition-all duration-300 shadow-[0_10px_25px_rgba(110,31,43,0.25)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              Quero minha Reconstrução Molecular em 3 Camadas
            </a>
            <span className="text-xxs font-mono text-ink-soft uppercase tracking-widest mt-3 block">
              Compra 100% Segura · Satisfação Garantida
            </span>
          </div>
        </div>
      </section>

      {/* LEAD SECTION - PROBLEM OUTLINE */}
      <section className="py-20 px-6 border-t border-tan-deep/25 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center md:text-left mb-10">
            <span className="inline-block px-3 py-1 bg-bordo/10 text-bordo font-mono text-xs font-bold uppercase tracking-widest rounded-full mb-3">
              Análise Especializada
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-bordo font-black tracking-tight">
              O Diagnóstico Clínico
            </h2>
          </div>

          {/* Structured Storytelling Cards */}
          <div className="space-y-6 mb-12">
            {/* Card 1: Memória & Identificação */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-cream/30 border border-tan-deep/20 rounded-2xl p-6 sm:p-8"
            >
              <p className="text-base sm:text-lg text-ink font-semibold leading-relaxed mb-4">
                {leadParagraphs[0]}
              </p>
              <p className="text-sm sm:text-base text-ink-soft leading-relaxed mb-4">
                {leadParagraphs[1]}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
                <div className="flex items-center gap-3 bg-white border border-bordo/30 px-4 py-3.5 rounded-xl shadow-[0_4px_14px_rgba(78,20,28,0.08)] hover:border-bordo/60 transition-all duration-300">
                  <div className="w-8 h-8 rounded-full bg-bordo/10 border border-bordo/20 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 text-bordo" />
                  </div>
                  <span className="text-xs sm:text-sm font-sans font-bold text-bordo leading-snug">
                    {leadParagraphs[2]}
                  </span>
                </div>
                <div className="flex items-center gap-3 bg-white border border-bordo/30 px-4 py-3.5 rounded-xl shadow-[0_4px_14px_rgba(78,20,28,0.08)] hover:border-bordo/60 transition-all duration-300">
                  <div className="w-8 h-8 rounded-full bg-bordo/10 border border-bordo/20 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 text-bordo" />
                  </div>
                  <span className="text-xs sm:text-sm font-sans font-bold text-bordo leading-snug">
                    {leadParagraphs[3]}
                  </span>
                </div>
                <div className="flex items-center gap-3 bg-white border border-bordo/30 px-4 py-3.5 rounded-xl shadow-[0_4px_14px_rgba(78,20,28,0.08)] hover:border-bordo/60 transition-all duration-300">
                  <div className="w-8 h-8 rounded-full bg-bordo/10 border border-bordo/20 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 text-bordo" />
                  </div>
                  <span className="text-xs sm:text-sm font-sans font-bold text-bordo leading-snug">
                    {leadParagraphs[4]}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Card 2: A Realidade Atual */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gradient-to-br from-rose/30 via-rose/15 to-transparent border border-rose/60 rounded-2xl p-6 sm:p-8 relative overflow-hidden"
            >
              <div className="relative z-10 space-y-3">
                <p className="text-base sm:text-lg text-bordo-deep font-bold leading-relaxed">
                  {leadParagraphs[5]}
                </p>
                <p className="text-sm sm:text-base text-ink-soft leading-relaxed">
                  {leadParagraphs[6]}
                </p>
                <p className="text-sm sm:text-base text-ink-soft leading-relaxed font-medium">
                  {leadParagraphs[7]}
                </p>
              </div>
            </motion.div>

            {/* Card 3: A Jornada da Tricologista */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-bordo text-cream rounded-2xl p-6 sm:p-8 shadow-lg relative"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cream/15 border border-cream/20 flex items-center justify-center text-cream">
                  <Activity className="w-5 h-5 text-cream" />
                </div>
                <div>
                  <span className="block font-serif text-lg font-bold text-cream">{leadParagraphs[8]}</span>
                  <span className="text-xs text-cream/70 font-mono uppercase tracking-wider">10+ Anos de Prática Clínica</span>
                </div>
              </div>
              <p className="text-sm sm:text-base text-cream/90 leading-relaxed mb-4">
                {leadParagraphs[9]}
              </p>
              <p className="text-sm sm:text-base text-cream/90 leading-relaxed font-semibold mb-2">
                {leadParagraphs[10]} {leadParagraphs[11]}
              </p>
              <p className="text-sm sm:text-base text-rose font-semibold leading-relaxed">
                {leadParagraphs[12]}
              </p>
            </motion.div>
          </div>

          {/* Transition text */}
          <div className="space-y-4 mb-10 text-center md:text-left">
            <p className="text-base sm:text-lg text-ink-soft leading-relaxed">
              Se você se identificou com essa história, existe uma explicação científica. E entender como a fibra perde estrutura é o primeiro passo para restaurar cabelos mais encorpados.
            </p>
            <p className="text-base sm:text-lg text-bordo font-bold leading-relaxed">
              Antes de conhecer a Reconstrução Molecular em 3 Camadas, vale entender por que tantos tratamentos falham:
            </p>
          </div>

          {/* Failure Boxes 01 & 02 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Box 01 */}
            <div className="bg-cream/40 border border-tan-deep/30 rounded-2xl p-6 sm:p-8 relative">
              <span className="font-serif text-3xl font-black text-bordo block mb-4">01</span>
              <h3 className="text-base sm:text-lg font-sans font-bold text-ink mb-3 leading-snug">
                Tratam o fio inteiro como se todo cabelo tivesse o mesmo nível de dano.
              </h3>
              <p className="text-sm sm:text-base text-ink-soft leading-relaxed">
                As proteínas se acumulam também nas áreas saudáveis da fibra, deixando o cabelo rígido, pesado e mais suscetível à quebra, em vez de restaurar apenas onde realmente existe perda estrutural.
              </p>
            </div>

            {/* Box 02 */}
            <div className="bg-cream/40 border border-tan-deep/30 rounded-2xl p-6 sm:p-8 relative">
              <span className="font-serif text-3xl font-black text-bordo block mb-4">02</span>
              <h3 className="text-base sm:text-lg font-sans font-bold text-ink mb-3 leading-snug">
                Não conseguem manter os ativos dentro da fibra por tempo suficiente.
              </h3>
              <p className="text-sm sm:text-base text-ink-soft leading-relaxed mb-4">
                Sem uma etapa de blindagem molecular, parte dos ativos é perdida já nas primeiras lavagens, reduzindo rapidamente a sensação de fios mais encorpados.
              </p>
              <p className="text-xs sm:text-sm font-medium text-bordo leading-relaxed pt-2 border-t border-tan-deep/20">
                Isso prepara perfeitamente a etapa 3 da tecnologia.
              </p>
            </div>
          </div>

          <div className="text-center">
            <a
              href="#mecanismo"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-bordo to-bordo-deep hover:from-bordo-deep hover:to-bordo text-cream font-sans font-bold text-sm px-8 py-4 rounded-full transition-all duration-300 shadow-[0_8px_20px_rgba(110,31,43,0.2)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              Entender a Reconstrução Molecular em 3 Camadas
            </a>
          </div>
        </div>
      </section>

      {/* HISTÓRIA SECTION */}
      <section className="relative overflow-hidden py-16 sm:py-24 px-6 bg-gradient-to-br from-[#3C0A14] via-[#651524] to-[#7A2636] border-t border-cream/15" id="historia">
        <div className="absolute inset-0 bg-[linear-gradient(125deg,transparent_0%,rgba(255,255,255,0.07)_48%,transparent_70%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-10 sm:mb-16">
            <span className="text-xs font-mono text-rose uppercase font-bold tracking-widest block mb-3">
              A Jornada Clínica
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif text-cream font-black tracking-tight leading-tight px-2 sm:px-0">
              Antes de tratar o cabelo das outras,<br className="hidden sm:inline" /> eu precisei salvar o meu.
            </h2>
          </div>

          <Timeline />

          <div className="relative z-20 mt-12">
            <ConversionCta
              tone="dark"
              eyebrow="Reconstrução Molecular em 3 Camadas"
              title="Agora você entende por que essa tecnologia entrega um resultado diferente."
              description="A Reconstrução Molecular em 3 Camadas foi desenvolvida para restaurar corpo, densidade e resistência da fibra de forma inteligente, atuando exatamente onde o fio perdeu estrutura."
              label="Quero iniciar meu protocolo"
            />
          </div>
        </div>
      </section>

      {/* MECANISMO SECTION - SIGNATURE VISUAL & STEPPER */}
      <section className="py-24 px-6 bg-white text-ink border-t border-tan-deep/20" id="mecanismo">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-mono text-bordo uppercase font-bold tracking-widest block mb-3">
              A Ciência por Trás da Reconstrução
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-bordo font-black tracking-tight leading-tight">
              O Mecanismo de Ação em 3 Camadas
            </h2>
            <p className="text-ink-soft max-w-xl mx-auto mt-4 text-sm md:text-base leading-relaxed">
              Diferente de máscaras comuns, o Pro Filler atua de forma seletiva na estrutura da fibra por meio de atração estática seletiva.
            </p>
          </div>

          {/* Interactive complex SVG animation container */}
          <InteractiveStrand />

          {/* Conceptual hair scientific breakdown */}
          <div className="mt-16 space-y-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
              <div className="bg-cream/40 border border-tan-deep/20 rounded-2xl p-7 md:p-8 shadow-sm hover:shadow-md transition-all duration-300">
                <h3 className="text-xl font-serif font-bold text-bordo mb-3 italic">
                  O brilho não significa que a fibra foi restaurada.
                </h3>
                <p className="text-base text-ink-soft leading-relaxed">
                  Muitas máscaras hidratam apenas a superfície do fio, criando uma sensação temporária de maciez e brilho. Sem recuperar a estrutura interna da fibra, o cabelo continua afinando, perdendo resistência e quebrando com facilidade.
                </p>
              </div>
              <div className="bg-cream/40 border border-tan-deep/20 rounded-2xl p-7 md:p-8 shadow-sm hover:shadow-md transition-all duration-300">
                <h3 className="text-xl font-serif font-bold text-bordo mb-3 italic">
                  A tecnologia reconhece exatamente onde o fio precisa de reparo.
                </h3>
                <p className="text-base text-ink-soft leading-relaxed">
                  Nosso Complexo TriMolecular utiliza afinidade seletiva por porosidade para direcionar as proteínas hidrolisadas às regiões mais fragilizadas da fibra, restaurando apenas onde existe perda estrutural, sem sobrecarregar as áreas saudáveis.
                </p>
              </div>
              <div className="bg-cream/40 border border-tan-deep/20 rounded-2xl p-7 md:p-8 shadow-sm hover:shadow-md transition-all duration-300">
                <h3 className="text-xl font-serif font-bold text-bordo mb-3 italic">
                  O verdadeiro encorpamento acontece quando a fibra recupera sua densidade.
                </h3>
                <p className="text-base text-ink-soft leading-relaxed">
                  O NV Redensifier atua no interior da fibra, aumentando seu diâmetro e devolvendo massa onde o cabelo perdeu estrutura. O resultado são fios mais encorpados, resistentes e com maior sensação de densidade desde as primeiras aplicações.
                </p>
              </div>
              <div className="bg-cream/40 border border-tan-deep/20 rounded-2xl p-7 md:p-8 shadow-sm hover:shadow-md transition-all duration-300">
                <h3 className="text-xl font-serif font-bold text-bordo mb-3 italic">
                  Depois de reconstruir, é preciso proteger esse resultado.
                </h3>
                <p className="text-base text-ink-soft leading-relaxed">
                  Após preencher e redensificar a fibra, a terceira camada cria uma blindagem cuticular que ajuda a manter os ativos protegidos no interior do fio por mais tempo, preservando corpo, resistência e durabilidade da reconstrução.
                </p>
              </div>
            </div>

            <div className="p-5 md:p-6 bg-bordo/10 border-l-4 border-bordo rounded-r-xl text-center md:text-left">
              <p className="text-sm text-ink leading-relaxed font-serif">
                <strong>Nota Científica:</strong> Este teste interativo demonstra o preenchimento gradual da fibra. Ao passar para a etapa 3, observe a blindagem polimérica bloqueando a porosidade interna do fio de cabelo.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* PRODUTO SECTION - 3 ATIVOS */}
      <section className="py-24 px-6 bg-white border-t border-tan-deep/20" id="produto">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-mono text-bordo uppercase font-bold tracking-widest block mb-3">
              AGORA QUE VOCÊ ENTENDE O MECANISMO
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-bordo font-black tracking-tight leading-tight max-w-3xl mx-auto">
              Toda essa tecnologia só é possível porque cada ativo desempenha uma função específica.
            </h2>
            <p className="text-base text-ink-soft max-w-2xl mx-auto mt-4 leading-relaxed">
              A Reconstrução Molecular em 3 Camadas não depende de um único ingrediente. Ela combina três tecnologias que trabalham em sequência para preencher, devolver densidade e proteger a fibra capilar.
            </p>
          </div>

          <div className="relative mx-auto mb-12 max-w-3xl">
            <div className="absolute inset-x-8 -top-8 h-24 bg-rose/20 blur-3xl pointer-events-none" />
            <ProductVisualizer type="hair-gif" variant="floating" className="relative z-10" />
          </div>

          <div className="text-center mb-10 max-w-3xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-serif text-bordo font-black tracking-tight leading-tight">
              Os três ativos que tornam a Reconstrução Molecular em 3 Camadas possível.
            </h3>
            <p className="text-base text-ink-soft max-w-xl mx-auto mt-3 leading-relaxed">
              Cada ativo foi selecionado para cumprir uma função específica dentro da fibra. Juntos, eles atuam em sequência para preencher, devolver densidade e proteger o resultado por muito mais tempo.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 gap-5">
              <div className="flex gap-4 items-start bg-cream/30 border border-tan-deep/30 rounded-2xl p-5">
                <div className="w-10 h-10 rounded-full bg-bordo text-cream flex items-center justify-center font-sans font-bold shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base md:text-lg text-bordo mb-1">
                    Complexo TriMolecular Inteligente®️
                  </h3>
                  <p className="text-sm text-ink-soft leading-relaxed">
                    Três proteínas hidrolisadas com pesos moleculares diferentes trabalham em conjunto para alcançar as regiões mais fragilizadas da fibra. Em vez de se acumularem na superfície, atuam exatamente onde o fio perdeu estrutura.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start bg-cream/30 border border-tan-deep/30 rounded-2xl p-5">
                <div className="w-10 h-10 rounded-full bg-bordo text-cream flex items-center justify-center font-sans font-bold shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base md:text-lg text-bordo mb-1">
                    NV Redensifier de Alta Performance
                  </h3>
                  <p className="text-sm text-ink-soft leading-relaxed">
                    Nanoestruturas inteligentes expandem-se no interior da fibra, aumentando seu diâmetro e devolvendo massa onde houve afinamento. O resultado é um cabelo visivelmente mais encorpado, com mais corpo e resistência.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start bg-cream/30 border border-tan-deep/30 rounded-2xl p-5">
                <div className="w-10 h-10 rounded-full bg-bordo text-cream flex items-center justify-center font-sans font-bold shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base md:text-lg text-bordo mb-1">
                    Cera de Farelo de Arroz Hidrofóbica
                  </h3>
                  <p className="text-sm text-ink-soft leading-relaxed">
                    Forma uma blindagem protetora ao redor da fibra, ajudando a preservar o preenchimento e reduzindo a perda dos ativos durante as lavagens, para que o resultado permaneça por muito mais tempo.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <ConversionCta
              eyebrow="Leve essa tecnologia para sua rotina"
              title="Agora é sua vez de devolver corpo, densidade e resistência aos seus fios."
              description="A mesma tecnologia desenvolvida para restaurar a estrutura da fibra agora está disponível para você realizar a Reconstrução Molecular em 3 Camadas no conforto da sua casa."
              label="Quero iniciar meu tratamento"
            />
          </div>
        </div>
      </section>

      {/* TECNOLOGIA EM SUA FORMA MAIS PURA SECTION */}
      <section className="relative overflow-hidden py-24 px-6 bg-gradient-to-br from-[#4A0E19] via-[#651524] to-[#2D060C] border-t border-cream/15" id="pro-filler">
        <div className="absolute inset-0 bg-[linear-gradient(35deg,transparent_0%,rgba(255,255,255,0.06)_52%,transparent_74%)] pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <span className="text-xs font-mono text-rose uppercase font-bold tracking-widest block mb-3">
              A TECNOLOGIA EM SUA FORMA MAIS PURA
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif text-cream font-black tracking-tight leading-tight">
              Conheça o Pro Filler:
            </h2>
            <p className="text-xl sm:text-2xl font-serif text-cream/90 italic font-semibold mt-2 max-w-3xl mx-auto leading-relaxed">
              a tecnologia que tornou a Reconstrução Molecular em 3 Camadas possível.
            </p>
          </div>

          {/* Pro Filler Video Container - Google Drive URL 19w8IgBnAPW0oy9MWyN3eQjoKEfiP8QhZ */}
          <div className="max-w-4xl mx-auto relative overflow-hidden rounded-[28px] border border-cream/25 bg-black shadow-[0_28px_70px_rgba(0,0,0,0.6)] backdrop-blur-md">
            <div className="aspect-[16/9] w-full relative">
              <iframe
                src="https://drive.google.com/file/d/19w8IgBnAPW0oy9MWyN3eQjoKEfiP8QhZ/preview"
                className="absolute inset-0 w-full h-full rounded-[28px]"
                allow="encrypted-media; picture-in-picture"
                allowFullScreen
                title="Demonstração Pro Filler"
              />
            </div>
          </div>

          {/* Premium Benefits Grid below Video */}
          <div className="max-w-4xl sm:max-w-5xl mx-auto mt-10 bg-cream/10 border border-cream/15 rounded-3xl p-6 sm:p-8 backdrop-blur-md text-center">
            <h3 className="font-serif italic text-2xl sm:text-3xl font-bold text-cream mb-6">
              Mais do que uma reconstrução.
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 justify-center items-center">
              {[
                'Preenche a fibra',
                'Devolve densidade',
                'Blinda o resultado',
                'Sem pesar os fios',
                'Uso em casa'
              ].map((benefit, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 p-3 sm:p-4 rounded-2xl bg-cream/5 border border-cream/10">
                  <div className="w-8 h-8 rounded-full bg-rose/30 border border-rose/50 flex items-center justify-center shrink-0 text-cream">
                    <CheckCircle2 className="w-4 h-4 text-rose" />
                  </div>
                  <span className="text-xs sm:text-sm font-sans font-semibold text-cream/95 leading-tight">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14 max-w-3xl mx-auto">
            <ConversionCta
              tone="dark"
              eyebrow="Garantia de Qualidade & Tecnologia"
              title="Pronta para restaurar a espessura e densidade dos seus fios?"
              description="Escolha abaixo o protocolo ideal para o seu nível de afinamento e receba o tratamento na sua casa."
              label="Quero iniciar meu tratamento"
            />
          </div>
        </div>
      </section>

      {/* OFERTA SECTION */}
      <section className="py-24 px-6 bg-white border-t border-tan-deep/20" id="oferta">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-mono text-bordo uppercase font-bold tracking-widest block mb-3">
              Tabela de Protocolos
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-bordo font-black tracking-tight leading-tight">
              Escolha Seu Protocolo Clínico
            </h2>
            <p className="text-sm md:text-base text-ink-soft mt-3 max-w-xl mx-auto leading-relaxed">
              Tratamentos desenvolvidos pela Dra. Cris de acordo com o nível e as causas do seu afinamento capilar.
            </p>
          </div>

          {/* Guide description box */}
          <div className="bg-tan/20 border border-tan-deep/45 rounded-3xl p-6 md:p-8 mb-10">
            <h4 className="font-serif font-bold text-bordo text-base md:text-lg mb-2">
              Qual Protocolo é o Ideal Para Você?
            </h4>
            <p className="text-sm text-ink-soft leading-relaxed">
              A aplicação isolada da <strong>Proteína Pro Filler (Protocolo 1)</strong> reconstrói a estrutura do fio em toda a sua extensão. Porém, se você sente o afinamento surgindo já desde o couro cabeludo, o <strong>Protocolo 2</strong> soma o Sérum que cuida do bulbo do fio. Caso o seu cabelo apresente oleosidade excessiva, dando o aspecto grudado e reduzindo o balanço natural, o <strong>Protocolo 3 (Completo)</strong> prepara perfeitamente o terreno folicular.
            </p>
          </div>

          {/* Protocol interactive pricing blocks */}
          <OfferSelector selectedId={selectedProtocolId} onSelect={setSelectedProtocolId} />

          {/* Trust assurances badges */}
          <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
            <div className="flex items-center justify-center gap-3 rounded-2xl border border-bordo/18 bg-gradient-to-br from-cream to-white px-4 py-4 text-center font-sans text-sm font-bold text-ink shadow-[0_12px_28px_rgba(78,20,28,0.08)]">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-verde text-sm font-black text-cream shadow-[0_8px_18px_rgba(30,61,44,0.18)]">✓</span>
              <span>Cabelo encorpado na <span className="number-inline-small">1</span>ª aplicação</span>
            </div>
            <div className="flex items-center justify-center gap-3 rounded-2xl border border-bordo/18 bg-gradient-to-br from-cream to-white px-4 py-4 text-center font-sans text-sm font-bold text-ink shadow-[0_12px_28px_rgba(78,20,28,0.08)]">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-verde text-sm font-black text-cream shadow-[0_8px_18px_rgba(30,61,44,0.18)]">✓</span>
              <span><span className="number-inline-small">30</span> Dias de Garantia Científica</span>
            </div>
            <div className="flex items-center justify-center gap-3 rounded-2xl border border-bordo/18 bg-gradient-to-br from-cream to-white px-4 py-4 text-center font-sans text-sm font-bold text-ink shadow-[0_12px_28px_rgba(78,20,28,0.08)]">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-verde text-sm font-black text-cream shadow-[0_8px_18px_rgba(30,61,44,0.18)]">✓</span>
              <span>Despacho Prioritário em <span className="number-inline-small">24</span>h</span>
            </div>
          </div>
          <p className="text-center text-[11px] text-ink-soft/70 mt-4 leading-none">
            *Os resultados estruturais capilares são cumulativos e variam de pessoa para pessoa.
          </p>

          <div className="mt-12 max-w-sm mx-auto">
            <a
              href="#checkout"
              onClick={(e) => {
                e.preventDefault();
                alert(`Direcionando para o gateway de pagamento seguro para o ${activeProtocol.name} (R$${activeProtocol.price})`);
              }}
              className="inline-flex items-center justify-center w-full bg-gradient-to-r from-bordo to-bordo-deep hover:from-bordo-deep hover:to-bordo text-cream text-base font-sans font-bold py-5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              Comprar Protocolo Selecionado
            </a>
          </div>
        </div>
      </section>

      {/* DECISION CROSSROADS SECTION */}
      <section className="py-20 px-6 bg-tan/15 border-t border-tan-deep/20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-mono text-bordo uppercase font-bold tracking-widest block mb-2">
              A Decisão Inteligente
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-bordo font-black">
              Por que iniciar o preenchimento agora?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-tan-deep/30 rounded-2xl p-6 md:p-8">
              <span className="text-xs font-mono text-verde font-bold block mb-3 uppercase tracking-wider">
                ● Se você decidir tratar hoje
              </span>
              <p className="text-sm md:text-base text-ink-soft leading-relaxed">
                Você interrompe de imediato o ciclo de enfraquecimento e quebra. Em poucas lavagens, as camadas se sobrepõem e as fibras preenchem, garantindo pontas pesadas e resistentes para crescer com saúde.
              </p>
            </div>
            <div className="bg-white border border-tan-deep/30 rounded-2xl p-6 md:p-8">
              <span className="text-xs font-mono text-bordo font-bold block mb-3 uppercase tracking-wider">
                ● Se você adiar a decisão
              </span>
              <p className="text-sm md:text-base text-ink-soft leading-relaxed">
                O córtex continua perdendo massa estrutural a cada banho quente, secador ou escovação. O cabelo afina cada vez mais, quebrando antes mesmo de passar dos ombros, mantendo você presa ao ciclo do coque murcho.
              </p>
            </div>
          </div>

          <div className="mt-10">
            <ConversionCta
              eyebrow="Não deixe a ponta decidir por você"
              title="Trate enquanto ainda há fibra para recuperar."
              description="Quanto antes o preenchimento começa, menor a chance de continuar perdendo comprimento por quebra."
              label="Voltar para escolher protocolo"
            />
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-24 px-6 bg-cream border-t border-tan-deep/20" id="faq">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-mono text-bordo uppercase font-bold tracking-widest block mb-3">
              Suporte Clínico
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-bordo font-black tracking-tight leading-tight">
              Perguntas Frequentes
            </h2>
            <p className="text-sm md:text-base text-ink-soft mt-3 max-w-md mx-auto leading-relaxed">
              Tire todas as suas dúvidas sobre o mecanismo de ação TriMolecular do Pro Filler.
            </p>
          </div>

          <FaqAccordion />
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="py-24 px-6 bg-gradient-to-b from-bordo to-bordo-deep text-cream text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-[circle_at_center] from-white/5 to-transparent pointer-events-none" />
        <div className="max-w-2xl mx-auto relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-cream font-black tracking-tight leading-tight mb-6">
            Chega de esconder as pontas.<br />Dê o primeiro passo científico.
          </h2>
          <p className="text-cream/80 text-sm sm:text-base md:text-lg mb-10 max-w-lg mx-auto leading-relaxed">
            Deixe no passado o coque murcho ou o rabo de cavalo sem volume. Sinta novamente a densidade e o balanço natural de um cabelo verdadeiramente seu.
          </p>
          <div className="max-w-md mx-auto">
            <a
              href="#oferta"
              className="inline-flex items-center justify-center w-full bg-cream text-bordo font-sans font-bold text-base md:text-lg px-8 py-5 rounded-full hover:bg-rose transition-all shadow-xl hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              Garantir Minha Reconstrução Molecular
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER - REFLEXO EXATO DA IMAGEM */}
      <footer className="bg-[#220205] text-cream/80 py-16 px-6 sm:px-12 border-t border-tan-deep/20">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start mb-12">
            {/* Left Column: Logo & Description */}
            <div className="flex flex-col gap-4 text-left">
              <div className="flex items-center gap-3">
                {/* Elegant monogram emblem */}
                <div className="w-10 h-10 rounded-full border border-cream/30 flex items-center justify-center shrink-0">
                  <span className="font-serif font-black text-lg text-cream tracking-tighter">ST</span>
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-lg font-serif font-black text-cream tracking-tight leading-none">Sweet Therapy</span>
                  <span className="text-[9px] font-mono tracking-[0.2em] text-cream/60 uppercase mt-1">Terapia Capilar</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-cream/70 font-sans tracking-wide leading-relaxed max-w-sm">
                Tecnologia avançada para saúde capilar. Tratamentos desenvolvidos com rigor científico para resultados reais.
              </p>
            </div>

            {/* Center Column: Payment Methods & Security */}
            <div className="flex flex-col gap-4 text-left">
              <span className="text-sm font-sans font-bold text-cream tracking-wide">
                Formas de Pagamento
              </span>
              <div className="flex flex-wrap gap-2">
                <span className="bg-white text-[#220205] text-[10px] font-mono font-black tracking-wider px-2.5 py-1 rounded select-none shadow-sm">
                  VISA
                </span>
                <span className="bg-white text-[#220205] text-[10px] font-mono font-black tracking-wider px-2.5 py-1 rounded select-none shadow-sm">
                  MC
                </span>
                <span className="bg-white text-[#220205] text-[10px] font-mono font-black tracking-wider px-2.5 py-1 rounded select-none shadow-sm">
                  ELO
                </span>
                <span className="bg-white text-[#220205] text-[10px] font-mono font-black tracking-wider px-2.5 py-1 rounded select-none shadow-sm">
                  PIX
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-cream/75 select-none font-sans">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.5h5c-.47 3.53-2.61 6.51-5 7.5v-7.5z" />
                </svg>
                Ambiente 100% Seguro
              </div>
            </div>

            {/* Right Column: ReclameAQUI official seal */}
            <div className="flex md:justify-end text-left w-full">
              <div className="ra-seal-wrapper min-h-[56px] w-full max-w-[260px] md:ml-auto flex items-center justify-start md:justify-end">
                <div id="ra-verified-seal" />
              </div>
            </div>
          </div>

          {/* Divider line and bottom details */}
          <div className="border-t border-cream/15 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-cream/50 font-sans tracking-wide">
            <div>
              © 2026 Sweet Therapy Cosmetics. Todos os direitos reservados.
            </div>
            <div className="font-mono text-[10px]">
              CNPJ: 40.334.646/0001-20
            </div>
          </div>
        </div>
      </footer>

      {/* Floating checkout bar */}
      <AnimatePresence>
        {showStickyBar && !hasVisiblePageCta && (
          <motion.div
            data-floating-cta
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 20 }}
            className="fixed inset-x-3 bottom-3 z-50 sm:inset-x-6 sm:bottom-5"
          >
            <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 rounded-full border border-tan-deep/30 bg-cream/78 px-4 py-2 shadow-[0_12px_34px_rgba(78,20,28,0.12)] backdrop-blur-xl sm:px-5">
              <div className="min-w-0 text-left">
                <span className="block truncate font-sans text-[10px] font-extrabold uppercase tracking-[0.18em] text-bordo sm:text-[11px]">
                  Protocolo ideal para reconstrução
                </span>
                <span className="hidden font-sans text-xs font-semibold text-ink-soft sm:block">
                  Compare os protocolos e escolha a melhor opção para o seu fio.
                </span>
              </div>

              <div className="shrink-0">
                <a
                  href="#oferta"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-gradient-to-r from-[#4E141C] to-[#6E1F2B] px-5 py-2.5 text-center font-sans text-xs font-extrabold text-cream shadow-[0_4px_12px_rgba(78,20,28,0.2)] transition-all duration-300 hover:from-[#6E1F2B] hover:to-[#4E141C] hover:shadow-[0_6px_16px_rgba(78,20,28,0.3)] active:scale-[0.97] sm:px-7"
                >
                  Ver ofertas
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
