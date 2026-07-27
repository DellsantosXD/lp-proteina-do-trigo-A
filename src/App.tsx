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
import { TestimonialsCarousel } from './components/TestimonialsCarousel';
import { TrichologistsSection } from './components/TrichologistsSection';
import ConversionCta from './components/ConversionCta';
import TreatmentExperienceSection from './components/TreatmentExperienceSection';
import ProtocolOverviewCards from './components/ProtocolOverviewCards';

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
  'Sou tricologista, meu nome é Cris Mendanha.',
  'Foram mais de 10 anos dedicados exclusivamente à terapia capilar, milhares de mulheres acompanhadas ao longo dessa jornada e mais de 3.500 profissionais formados.',
  'Mas existe algo que poucas pessoas sabem.',
  'Antes de ajudar milhares de mulheres a recuperarem cabelos visivelmente mais encorpados, eu precisei encontrar uma solução para o meu próprio cabelo.',
  'Foi justamente dessa busca que nasceu a tecnologia que você vai conhecer nesta página.'
];

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
    activeProtocol.price === 197 ? '19,78' :
    activeProtocol.price === 267 ? '26,81' :
    activeProtocol.price === 327 ? '32,83' :
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
              className="font-serif text-bordo font-black tracking-tight leading-tight text-4xl sm:text-6xl md:text-7xl max-w-4xl text-balance"
            >
              Seu rabo de cavalo virou um fiapo.
            </motion.h1>
          </div>

          <div className="max-w-2xl mx-auto mb-10 space-y-4">
            <p className="text-base sm:text-xl text-ink font-semibold leading-relaxed">
              O afinamento pode ter diferentes causas. A boa notícia é que a fibra capilar pode recuperar estrutura quando recebe a tecnologia certa.
            </p>
            <p className="text-base sm:text-xl text-ink font-semibold leading-relaxed">
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
              <p className="text-base sm:text-xl text-ink font-extrabold leading-relaxed mb-4">
                {leadParagraphs[0]}
              </p>
              <p className="text-sm sm:text-lg text-ink font-semibold leading-relaxed mb-4">
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

            {/* Card Unificado com Foto Framed da Expert Cris Mendanha */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-[#4A0E19] text-cream rounded-3xl p-6 sm:p-9 shadow-2xl border border-cream/15 flex flex-col lg:flex-row items-center lg:items-start gap-8"
            >
              {/* Moldura da Foto da Expert no lado esquerdo com bordas arredondadas elegantes */}
              <div className="w-full lg:w-4/12 max-w-[280px] lg:max-w-none shrink-0">
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-white/20 shadow-xl group bg-[#3D0A14] aspect-[3/4]">
                  <img
                    src="/images/cris-mendanha-portrait.jpg"
                    alt="Cris Mendanha - Tricologista"
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl text-center border border-white/15">
                    <span className="font-serif text-xs font-bold text-cream block">Cris Mendanha</span>
                    <span className="text-[10px] font-sans font-bold text-rose uppercase tracking-wider block mt-0.5">Tricologista · Mais de 10 Anos de Clínica</span>
                  </div>
                </div>
              </div>

              {/* Coluna dos Textos da Expert no lado direito */}
              <div className="w-full lg:w-8/12 text-left space-y-6 flex flex-col justify-between">
                {/* Parte 1: A Identificação */}
                <div className="space-y-3 pb-5 border-b border-cream/15">
                  <p className="text-xl sm:text-2xl font-serif font-bold text-cream leading-snug">
                    Hoje, quando você prende o cabelo, ele vira um fiapo.
                  </p>
                  <p className="text-sm sm:text-base text-cream/90 font-medium leading-relaxed">
                    As pontas parecem cada vez mais finas.
                  </p>
                  <p className="text-sm sm:text-base text-cream/90 font-medium leading-relaxed">
                    E o volume que antes fazia parte da sua identidade parece desaparecer um pouco mais a cada ano.
                  </p>
                </div>

                {/* Parte 2: Nome Maior como Título e Subtítulo sem ícone */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-serif text-3xl sm:text-4xl font-black text-cream tracking-tight">
                      Cris Mendanha
                    </h3>
                    <span className="text-xs sm:text-sm font-sans font-bold text-rose uppercase tracking-widest block mt-1">
                      TRICOLOGISTA · MAIS DE 10 ANOS DE PRÁTICA CLÍNICA
                    </span>
                  </div>

                  <p className="text-sm sm:text-base text-cream/95 font-medium leading-relaxed">
                    Meu nome é Cris Mendanha, sou tricologista, e até aqui já foram mais de 10 anos dedicados exclusivamente à terapia capilar, milhares de mulheres acompanhadas ao longo dessa jornada e mais de 3.500 profissionais formados com meu método.
                  </p>
                  
                  <p className="text-sm sm:text-base text-cream/95 font-medium leading-relaxed">
                    Mas existe algo que poucas pessoas sabem. Antes de ajudar milhares de mulheres a recuperarem cabelos visivelmente mais encorpados, eu precisei encontrar uma solução para o meu próprio cabelo.
                  </p>

                  <p className="text-sm sm:text-base text-amber-200 font-semibold leading-relaxed">
                    Hoje estou assim, mas nem sempre tive este cabelo. E foi justamente dessa busca que nasceu a tecnologia que você vai conhecer nesta página.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Transition text */}
          <div className="space-y-4 mb-10 text-center md:text-left mt-8">
            <p className="text-base sm:text-xl text-ink font-semibold leading-relaxed">
              Se você se identificou com essa história, existe uma explicação científica. E entender como a fibra perde estrutura é o primeiro passo para restaurar cabelos mais encorpados.
            </p>
            <p className="text-base sm:text-xl text-bordo font-black leading-relaxed">
              Antes de conhecer a Reconstrução Molecular em 3 Camadas, vale entender por que tantos tratamentos falham:
            </p>
          </div>

          {/* Failure Boxes 01 & 02 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Box 01 */}
            <div className="bg-cream/40 border border-tan-deep/30 rounded-2xl p-6 sm:p-8 relative">
              <span className="font-serif text-4xl font-black text-bordo block mb-4">01</span>
              <h3 className="text-lg sm:text-xl font-sans font-black text-ink mb-3 leading-snug">
                Tratam o fio inteiro como se todo cabelo tivesse o mesmo nível de dano.
              </h3>
              <p className="text-base sm:text-lg text-ink font-semibold leading-relaxed">
                As proteínas se acumulam também nas áreas saudáveis da fibra, deixando o cabelo rígido, pesado e mais suscetível à quebra, em vez de restaurar apenas onde realmente existe perda estrutural.
              </p>
            </div>

            {/* Box 02 */}
            <div className="bg-cream/40 border border-tan-deep/30 rounded-2xl p-6 sm:p-8 relative">
              <span className="font-serif text-4xl font-black text-bordo block mb-4">02</span>
              <h3 className="text-lg sm:text-xl font-sans font-black text-ink mb-3 leading-snug">
                Não conseguem manter os ativos dentro da fibra por tempo suficiente.
              </h3>
              <p className="text-base sm:text-lg text-ink font-semibold leading-relaxed">
                Sem uma etapa de blindagem molecular, parte dos ativos é perdida já nas primeiras lavagens, reduzindo rapidamente a sensação de fios mais encorpados.
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
                <h3 className="text-lg sm:text-xl font-serif font-black text-bordo mb-3 uppercase tracking-wider leading-snug">
                  O BRILHO NÃO SIGNIFICA QUE A FIBRA FOI RESTAURADA.
                </h3>
                <p className="text-sm sm:text-base text-ink font-semibold leading-relaxed">
                  Muitas máscaras hidratam apenas a superfície do fio, criando uma sensação temporária de maciez e brilho. Sem recuperar a estrutura interna da fibra, o cabelo continua afinando, perdendo resistência e quebrando com facilidade.
                </p>
              </div>
              <div className="bg-cream/40 border border-tan-deep/20 rounded-2xl p-7 md:p-8 shadow-sm hover:shadow-md transition-all duration-300">
                <h3 className="text-lg sm:text-xl font-serif font-black text-bordo mb-3 uppercase tracking-wider leading-snug">
                  A TECNOLOGIA RECONHECE EXATAMENTE ONDE O FIO PRECISA DE REPARO.
                </h3>
                <p className="text-sm sm:text-base text-ink font-semibold leading-relaxed">
                  Nosso Complexo TriMolecular utiliza afinidade seletiva por porosidade para direcionar as proteínas hidrolisadas às regiões mais fragilizadas da fibra, restaurando apenas onde existe perda estrutural, sem sobrecarregar as áreas saudáveis.
                </p>
              </div>
              <div className="bg-cream/40 border border-tan-deep/20 rounded-2xl p-7 md:p-8 shadow-sm hover:shadow-md transition-all duration-300">
                <h3 className="text-lg sm:text-xl font-serif font-black text-bordo mb-3 uppercase tracking-wider leading-snug">
                  O VERDADEIRO ENCORPAMENTO ACONTECE QUANDO A FIBRA RECUPERA SUA DENSIDADE.
                </h3>
                <p className="text-sm sm:text-base text-ink font-semibold leading-relaxed">
                  O NV Redensifier atua no interior da fibra, aumentando seu diâmetro e devolvendo massa onde o cabelo perdeu estrutura. O resultado são fios mais encorpados, resistentes e com maior sensação de densidade desde as primeiras aplicações.
                </p>
              </div>
              <div className="bg-cream/40 border border-tan-deep/20 rounded-2xl p-7 md:p-8 shadow-sm hover:shadow-md transition-all duration-300">
                <h3 className="text-lg sm:text-xl font-serif font-black text-bordo mb-3 uppercase tracking-wider leading-snug">
                  DEPOIS DE RECONSTRUIR, É PRECISO PROTEGER ESSE RESULTADO.
                </h3>
                <p className="text-sm sm:text-base text-ink font-semibold leading-relaxed">
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

          {/* Transition Block matching reference image */}
          <div className="mt-10 p-5 md:p-6 bg-cream/40 border-l-4 border-bordo rounded-r-2xl border-y border-r border-tan-deep/25 max-w-3xl mx-auto shadow-sm text-left">
            <p className="text-base sm:text-lg font-sans font-semibold text-ink leading-relaxed">
              Toda essa ciência precisava ganhar uma forma simples de chegar até a casa das mulheres. Foi assim que nasceu o Pro Filler.
            </p>
          </div>
        </div>
      </section>

      {/* TECNOLOGIA EM SUA FORMA MAIS PURA SECTION */}
      <section className="relative overflow-hidden py-24 px-6 bg-gradient-to-br from-[#4A0E19] via-[#651524] to-[#2D060C] border-t border-cream/15" id="pro-filler">
        <div className="absolute inset-0 bg-[linear-gradient(35deg,transparent_0%,rgba(255,255,255,0.06)_52%,transparent_74%)] pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <span className="text-xs font-mono text-rose uppercase font-bold tracking-[0.2em] block mb-3">
              A TECNOLOGIA EM SUA FORMA MAIS PURA
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif text-cream font-black tracking-tight leading-tight">
              Conheça o Pro Filler:
            </h2>
            <p className="text-lg sm:text-2xl font-serif text-cream/90 italic font-semibold mt-2 leading-snug">
              a tecnologia que tornou a Reconstrução Molecular em 3 Camadas possível.
            </p>
          </div>

          {/* Pro Filler Video Container - Native 100% Autoplay Loop HTML5 Video */}
          <div className="max-w-4xl mx-auto relative overflow-hidden rounded-[28px] border border-cream/25 bg-black shadow-[0_28px_70px_rgba(0,0,0,0.6)] backdrop-blur-md">
            <div className="aspect-[16/9] w-full relative overflow-hidden rounded-[28px]">
              <video
                src="/videos/pro-filler-texture.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover rounded-[28px]"
              />
              <div className="absolute inset-0 pointer-events-none rounded-[28px] ring-1 ring-white/20" />
            </div>
          </div>

          {/* Paragraph right after the jar/video and before the bullets */}
          <div className="max-w-3xl mx-auto mt-8 text-center px-4">
            <p className="text-base sm:text-lg font-sans text-cream/90 leading-relaxed font-medium">
              O Pro Filler foi desenvolvido para restaurar a estrutura da fibra através da combinação exclusiva do Complexo TriMolecular Inteligente, do NV Redensifier e da Cera de Farelo de Arroz Hidrofóbica. Em poucos minutos de aplicação, os três ativos atuam em sequência para preencher, devolver densidade e proteger os fios, proporcionando um cabelo visivelmente mais encorpado, resistente e saudável.
            </p>
          </div>

          {/* Premium Benefits Grid below Video */}
          <div className="max-w-4xl sm:max-w-5xl mx-auto mt-10 bg-cream/10 border border-cream/15 rounded-3xl p-6 sm:p-8 backdrop-blur-md text-center">
            <h3 className="font-serif text-2xl sm:text-4xl font-black text-cream mb-6 uppercase tracking-wide">
              MAIS DO QUE UMA RECONSTRUÇÃO.
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-4 justify-center items-center">
              {[
                'PREENCHE A FIBRA',
                'DEVOLVE DENSIDADE',
                'BLINDA O RESULTADO',
                'SEM PESAR OS FIOS',
                'USO EM CASA',
                'ENCORPA OS FIOS'
              ].map((benefit, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 p-3 sm:p-4 rounded-2xl bg-cream/5 border border-cream/10 hover:border-rose/40 transition-all duration-300">
                  <div className="w-8 h-8 rounded-full bg-rose/30 border border-rose/50 flex items-center justify-center shrink-0 text-cream">
                    <CheckCircle2 className="w-4 h-4 text-rose" />
                  </div>
                  <span className="text-xs sm:text-sm font-sans font-extrabold uppercase tracking-wider text-cream leading-tight">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>

            {/* 3 Active Ingredient Cards Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8 text-left border-t border-cream/15 pt-8">
              {/* Active 1 */}
              <div className="bg-cream/5 border border-cream/10 rounded-2xl p-5 backdrop-blur-sm flex flex-col justify-between hover:border-rose/40 transition-colors duration-300">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-rose bg-rose/20 px-2.5 py-1 rounded-full font-bold inline-block mb-3">
                    Preenchimento Inteligente
                  </span>
                  <h4 className="font-serif font-bold text-lg sm:text-xl text-cream mb-2">
                    Complexo TriMolecular Inteligente
                  </h4>
                  <p className="text-xs sm:text-sm font-sans text-cream/80 leading-relaxed">
                    Proteínas hidrolisadas de trigo, ervilha e arroz penetram seletivamente nas regiões fragilizadas da fibra para iniciar a reconstrução estrutural.
                  </p>
                </div>
              </div>

              {/* Active 2 */}
              <div className="bg-cream/5 border border-cream/10 rounded-2xl p-5 backdrop-blur-sm flex flex-col justify-between hover:border-rose/40 transition-colors duration-300">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-rose bg-rose/20 px-2.5 py-1 rounded-full font-bold inline-block mb-3">
                    Devolve Corpo e Densidade
                  </span>
                  <h4 className="font-serif font-bold text-lg sm:text-xl text-cream mb-2">
                    NV Redensifier
                  </h4>
                  <p className="text-xs sm:text-sm font-sans text-cream/80 leading-relaxed">
                    Nanoestruturas inteligentes aumentam o diâmetro da fibra e devolvem massa aos fios afinados, proporcionando maior sensação de volume e resistência.
                  </p>
                </div>
              </div>

              {/* Active 3 */}
              <div className="bg-cream/5 border border-cream/10 rounded-2xl p-5 backdrop-blur-sm flex flex-col justify-between hover:border-rose/40 transition-colors duration-300">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-rose bg-rose/20 px-2.5 py-1 rounded-full font-bold inline-block mb-3">
                    Protege o Resultado
                  </span>
                  <h4 className="font-serif font-bold text-lg sm:text-xl text-cream mb-2">
                    Cera de Farelo de Arroz
                  </h4>
                  <p className="text-xs sm:text-sm font-sans text-cream/80 leading-relaxed">
                    Forma uma blindagem leve sobre a fibra, ajudando a preservar os ativos e prolongando o efeito da reconstrução por muito mais tempo.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-14 max-w-3xl mx-auto">
            <ConversionCta
              tone="dark"
              eyebrow="Seu novo ritual começa aqui"
              title="Sua fibra já sabe o que precisa. Agora só falta começar."
              description="O primeiro passo para recuperar corpo, densidade e resistência é iniciar uma rotina consistente com a tecnologia desenvolvida pela Sweet Therapy."
              label="Quero começar meu tratamento"
            />
          </div>
        </div>
      </section>

      {/* ANTES E DEPOIS / RESULTADOS REAIS SECTION */}
      <section className="pt-20 pb-28 sm:py-24 px-4 sm:px-6 bg-cream/40 border-t border-tan-deep/20" id="resultados">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 sm:mb-14 max-w-3xl mx-auto">
            <span className="text-xs font-mono text-bordo uppercase font-bold tracking-[0.2em] block mb-3">
              TRANSFORMAÇÃO REAL DA FIBRA
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif text-bordo font-black tracking-tight leading-tight">
              Veja o que acontece quando a fibra recupera sua estrutura.
            </h2>
            <p className="text-base sm:text-lg font-sans text-ink-soft max-w-2xl mx-auto mt-4 leading-relaxed font-normal">
              Relatos espontâneos e resultados reais enviados por clientes que restauraram o corpo, o brilho e a densidade dos fios.
            </p>
          </div>

          {/* Clean Carousel Showcase (Showing Full Frame Media & Full Text) */}
          <TestimonialsCarousel />
        </div>
      </section>

      {/* RECOMENDAÇÃO DE TRICOLOGISTAS SECTION */}
      <TrichologistsSection />

      {/* OFERTA SECTION */}
      <section className="py-24 px-6 bg-white border-t border-tan-deep/20" id="oferta">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <span className="text-xs font-mono text-bordo uppercase font-bold tracking-[0.2em] block mb-3">
              TABELA DE PROTOCOLOS
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-bordo font-black tracking-tight leading-tight">
              Qual protocolo foi desenvolvido para o estágio atual do seu cabelo?
            </h2>
            <p className="text-sm sm:text-base text-ink-soft mt-3 max-w-2xl mx-auto leading-relaxed font-normal">
              Os protocolos utilizam a mesma tecnologia de Reconstrução Molecular em 3 Camadas. O que muda é o nível de tratamento recomendado para cada necessidade.
            </p>
          </div>

          {/* Guide description box */}
          <div className="bg-tan/20 border border-tan-deep/45 rounded-3xl p-6 md:p-8 mb-10">
            <h4 className="font-serif font-bold text-bordo text-base md:text-lg mb-2">
              Qual Protocolo é o Ideal Para Você?
            </h4>
            <p className="text-sm sm:text-base text-ink font-medium leading-relaxed">
              A aplicação isolada da <strong>Proteína Pro Filler (Protocolo Essencial)</strong> reconstrói a estrutura do fio em toda a sua extensão. Porém, se você sente o afinamento surgindo já desde o couro cabeludo, o <strong>Protocolo Intensivo</strong> soma o Sérum que cuida do bulbo do fio. Caso o seu cabelo apresente oleosidade excessiva, dando o aspecto grudado e reduzindo o balanço natural, o <strong>Protocolo Completo</strong> prepara perfeitamente o terreno folicular.
            </p>
          </div>

          {/* Quick Protocol Overview Selection Cards */}
          <ProtocolOverviewCards onSelectProtocol={setSelectedProtocolId} />

          {/* Protocol interactive pricing blocks */}
          <OfferSelector selectedId={selectedProtocolId} onSelect={setSelectedProtocolId} />

          {/* Trust assurances badges */}
          <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
            <div className="flex items-center justify-center gap-3 rounded-2xl border border-bordo/18 bg-gradient-to-br from-cream to-white px-4 py-4 text-center font-sans text-sm font-bold text-ink shadow-[0_12px_28px_rgba(78,20,28,0.08)]">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-verde text-sm font-black text-cream shadow-[0_8px_18px_rgba(30,61,44,0.18)]">✓</span>
              <span>Tecnologia desenvolvida por tricologistas</span>
            </div>
            <div className="flex items-center justify-center gap-3 rounded-2xl border border-bordo/18 bg-gradient-to-br from-cream to-white px-4 py-4 text-center font-sans text-sm font-bold text-ink shadow-[0_12px_28px_rgba(78,20,28,0.08)]">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-verde text-sm font-black text-cream shadow-[0_8px_18px_rgba(30,61,44,0.18)]">✓</span>
              <span><span className="number-inline-small">30</span> dias de garantia</span>
            </div>
            <div className="flex items-center justify-center gap-3 rounded-2xl border border-bordo/18 bg-gradient-to-br from-cream to-white px-4 py-4 text-center font-sans text-sm font-bold text-ink shadow-[0_12px_28px_rgba(78,20,28,0.08)]">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-verde text-sm font-black text-cream shadow-[0_8px_18px_rgba(30,61,44,0.18)]">✓</span>
              <span>Despacho em até <span className="number-inline-small">24</span> horas</span>
            </div>
          </div>
          <p className="text-center text-[11px] text-ink-soft/70 mt-4 leading-none">
            *Os resultados estruturais capilares são cumulativos e variam de pessoa para pessoa.
          </p>

          <div className="mt-12 max-w-sm mx-auto">
            <a
              href={(activeProtocol as any).checkoutUrl || 'https://pay.youshop.com.br/BRFYWVIZZTWAMNB1'}
              className="inline-flex items-center justify-center w-full bg-gradient-to-r from-bordo to-bordo-deep hover:from-bordo-deep hover:to-bordo text-cream text-base font-sans font-bold py-5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              Comprar Protocolo Selecionado
            </a>
          </div>
        </div>
      </section>

      {/* EXPERIÊNCIA DO SEU PROTOCOLO SECTION */}
      <TreatmentExperienceSection />

      {/* DECISION CROSSROADS SECTION - VIBRANT HIGH IMPACT */}
      <section className="py-24 px-6 bg-gradient-to-b from-[#2D060C] via-[#4A0E19] to-[#2D060C] text-cream border-t border-cream/15 relative overflow-hidden" id="decisao">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_0%,rgba(255,255,255,0.04)_50%,transparent_100%)] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-14 max-w-3xl mx-auto">
            <span className="text-xs font-mono text-rose uppercase font-bold tracking-[0.25em] block mb-3">
              O MOMENTO DA DECISÃO
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif text-cream font-black tracking-tight leading-tight">
              Quanto antes você começar, maior a chance de preservar a estrutura do fio.
            </h2>
            <p className="text-sm sm:text-base font-sans text-cream/80 max-w-xl mx-auto mt-4 leading-relaxed font-normal">
              O tempo joga a favor ou contra a densidade do seu cabelo. Veja o que muda dependendo do seu próximo passo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Card 1: Se você começar agora */}
            <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-[0_20px_50px_rgba(16,185,129,0.15)] flex flex-col justify-between hover:border-emerald-400/70 transition-all duration-300">
              <div>
                <div className="flex items-center gap-2.5 mb-6">
                  <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                  <h3 className="font-serif font-black text-xl sm:text-2xl text-emerald-300">
                    Se você começar agora
                  </h3>
                </div>

                <ul className="space-y-4">
                  {[
                    'interrompe o ciclo contínuo de afinamento',
                    'começa a devolver corpo à fibra',
                    'recupera densidade progressivamente',
                    'protege os fios das próximas agressões',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-cream/95 font-sans font-medium text-sm sm:text-base">
                      <div className="w-6 h-6 rounded-full bg-emerald-500/25 border border-emerald-400/50 flex items-center justify-center shrink-0 mt-0.5 text-emerald-300">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-5 border-t border-emerald-500/20 text-xs font-mono uppercase tracking-wider text-emerald-300/90 font-bold flex items-center gap-2">
                <span>✓ Proteção ativa da fibra</span>
              </div>
            </div>

            {/* Card 2: Se continuar adiando */}
            <div className="bg-rose-950/30 border border-rose-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-[0_20px_50px_rgba(244,63,94,0.1)] flex flex-col justify-between hover:border-rose-400/60 transition-all duration-300">
              <div>
                <div className="flex items-center gap-2.5 mb-6">
                  <span className="w-3 h-3 rounded-full bg-rose-500" />
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-rose-300">
                    Se continuar adiando
                  </h3>
                </div>

                <p className="text-sm sm:text-base font-sans text-cream/85 leading-relaxed font-normal">
                  A fibra continua perdendo massa estrutural a cada lavagem, calor e processos químicos. Quanto mais afinado o fio fica, maior o esforço necessário para recuperar sua estrutura.
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-rose-500/20 text-xs font-mono uppercase tracking-wider text-rose-300/80 font-semibold flex items-center gap-2">
                <span>⚠️ Perda progressiva de massa</span>
              </div>
            </div>
          </div>

          <div className="mt-14 max-w-2xl mx-auto">
            <ConversionCta
              tone="dark"
              eyebrow="Não deixe a ponta decidir por você"
              title="Trate enquanto ainda há fibra para recuperar."
              description="Quanto antes o preenchimento começa, menor a chance de continuar perdendo comprimento por quebra."
              label="Escolher meu protocolo agora"
            />
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-24 px-6 bg-cream border-t border-tan-deep/20" id="faq">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="text-xs font-mono text-bordo uppercase font-bold tracking-[0.2em] block mb-3">
              PERGUNTAS FREQUENTES
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-bordo font-black tracking-tight leading-tight">
              Tire todas as suas dúvidas antes de iniciar sua Reconstrução Molecular.
            </h2>
          </div>

          <FaqAccordion />
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="py-24 px-6 bg-gradient-to-b from-[#4A0E19] to-[#2D060C] text-cream text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-[circle_at_center] from-white/5 to-transparent pointer-events-none" />
        <div className="max-w-3xl mx-auto relative z-10">
          <span className="text-xs font-mono text-rose uppercase font-bold tracking-[0.2em] block mb-3">
            SUA FIBRA MERECE CORPO E DENSIDADE
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-cream font-black tracking-tight leading-tight mb-6">
            Seu cabelo não precisa parecer mais fino do que realmente é.
          </h2>
          <p className="text-cream/85 text-sm sm:text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed font-normal">
            A Reconstrução Molecular em 3 Camadas foi desenvolvida para devolver corpo, densidade e resistência à fibra capilar, diretamente da sua casa.
          </p>
          <div className="max-w-md mx-auto">
            <a
              href="#oferta"
              className="inline-flex items-center justify-center w-full bg-cream text-bordo font-sans font-extrabold text-base md:text-lg px-8 py-5 rounded-full hover:bg-rose hover:text-white transition-all duration-300 shadow-xl hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              Quero iniciar minha Reconstrução Molecular
            </a>
          </div>
        </div>
      </section>

      {/* WHATSAPP CONSULTATION & SUPPORT SECTION */}
      <section className="py-16 px-6 bg-cream/60 border-t border-tan-deep/20" id="atendimento-whatsapp">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-[#25D366]/15 text-[#16A34A] mb-4">
            <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
          </div>
          
          <h3 className="text-2xl sm:text-3xl font-serif font-black text-bordo mb-4 leading-tight">
            Ainda ficou com alguma dúvida sobre sua queda ou afinamento?
          </h3>
          
          <p className="text-base sm:text-lg text-ink font-medium leading-relaxed max-w-2xl mx-auto mb-4">
            Fale agora com alguém da equipe da Cris (tricologista), que vai te orientar gratuitamente sobre o melhor protocolo para o seu caso — sem compromisso.
          </p>

          <p className="text-sm sm:text-base text-ink-soft leading-relaxed max-w-2xl mx-auto mb-8">
            Você pode enviar uma foto do couro cabeludo, se quiser, para receber uma análise rápida. Isso normalmente já ajuda a entender o que está causando sua queda e qual o melhor caminho para reverter.
          </p>

          <div className="max-w-md mx-auto">
            <a
              href="https://wa.me/5561998817427?text=Ol%C3%A1!%20Gostaria%20de%20tirar%20d%C3%BAvidas%20sobre%20o%20tratamento%20para%20queda%20e%20afinamento."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 w-full bg-[#25D366] hover:bg-[#1DA851] text-white font-sans font-extrabold text-base sm:text-lg px-6 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <svg className="w-6 h-6 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              <span>Quero tirar minhas dúvidas no WhatsApp</span>
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
                <img
                  src="https://iili.io/ftbkqiv.webp"
                  alt="Sweet Therapy Logo"
                  className="h-10 w-auto object-contain filter brightness-0 invert opacity-90"
                  referrerPolicy="no-referrer"
                />
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
