import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  'Você já recorreu a aplique ou lace pra disfarçar o quanto seu cabelo afinou?',
  'Lembra do seu rabo de cavalo de antes, aquele que enchia a mão inteira? Hoje ele vira um fiapo. Solto, dá pra ver a orelha entre os fios. O coque não enche mais. Fica pequeno, murcho, sem volume nenhum.',
  'Sou tricologista. Dez anos de clínica em Brasília, mais de dez mil pacientes, mais de três mil e quinhentos profissionais formados.',
  'E mesmo assim, por anos, não conseguia resolver o meu próprio afinamento. O que poucas das minhas pacientes sabem é que essa história começa comigo. Antes de resolver o afinamento de qualquer uma delas, eu precisei resolver o meu primeiro.'
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
          {/* Static Headline (Teste A) */}
          <div className="flex items-center justify-center mb-6">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-serif text-bordo font-black tracking-tight leading-tight text-2xl sm:text-4xl md:text-5xl max-w-3xl text-balance"
            >
              Seu rabo de cavalo virou um fiapo.{' '}
              <br className="hidden md:inline" />
              Seja qual for o motivo, a fibra pode ser reconstruída.
            </motion.h1>
          </div>

          <p className="text-base sm:text-lg md:text-xl text-ink-soft max-w-xl mx-auto mb-10 leading-relaxed">
            A Reconstrução Molecular em 3 Camadas devolve corpo e espessura ao fio fino, de dentro pra fora, sem depender de salão.
          </p>

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
          <div className="flex items-center mb-6 select-none justify-center md:justify-start">
            <span className="text-xl sm:text-2xl font-serif text-bordo font-black">O Diagnóstico Clínico</span>
          </div>

          {/* Static Lead paragraphs (Teste A) */}
          <div className="prose prose-ink max-w-none mb-10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {leadParagraphs.map((paragraph, index) => (
                <p key={index} className="text-base sm:text-lg text-ink-soft leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </motion.div>
          </div>

          {/* Callout box */}
          <motion.div 
            className="bg-rose/40 border border-rose rounded-2xl p-6 mb-12 text-center"
            initial={{ scale: 0.98, opacity: 0.9 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-serif text-lg md:text-xl font-bold text-bordo-deep italic">
              "Se você se identificou com essa cena, existe um motivo científico. E a sua fibra capilar pode ser reconstruída."
            </p>
          </motion.div>

          <p className="text-base sm:text-lg text-ink font-bold mb-6 text-center md:text-left">
            A maioria das fórmulas de reconstrução falha por dois motivos clássicos:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-cream/40 border border-tan-deep/30 rounded-2xl p-6 relative">
              <span className="number-display block mb-3">01</span>
              <p className="text-sm md:text-base text-ink-soft leading-relaxed">
                Se espalham por igual em todo o comprimento, acumulando excesso de queratina mesmo onde a fibra não precisa, gerando enrijecimento e quebra.
              </p>
            </div>
            <div className="bg-cream/40 border border-tan-deep/30 rounded-2xl p-6 relative">
              <span className="number-display block mb-3">02</span>
              <p className="text-sm md:text-base text-ink-soft leading-relaxed">
                Mesmo quando penetram as áreas porosas, não possuem ancoragem. O resultado escorre pelo ralo já na primeira lavagem pós-tratamento.
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
              eyebrow="Se essa história parece a sua"
              title="Comece pelo protocolo que reconstrói a fibra antes que ela continue quebrando."
              description="Você não precisa esperar o cabelo afinar ainda mais para agir. O tratamento foi pensado para recuperar corpo, peso e resistência no comprimento."
              label="Ver protocolos disponíveis"
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
              Diferente de máscaras comuns, o Pro Filler atua de forma cirúrgica na estrutura do fio por meio de atração estática seletiva.
            </p>
          </div>

          {/* Interactive complex SVG animation container */}
          <InteractiveStrand />

          {/* Conceptual hair scientific breakdown */}
          <div className="mt-16 space-y-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
              <div className="bg-cream/40 border border-tan-deep/20 rounded-2xl p-7 md:p-8 shadow-sm hover:shadow-md transition-all duration-300">
                <h3 className="text-xl font-serif font-bold text-bordo mb-3 italic">
                  Fio bonito por fora não é fio forte por dentro
                </h3>
                <p className="text-base text-ink-soft leading-relaxed">
                  O brilho instantâneo da hidratação comum dura poucas horas porque atua somente na maciez externa. Sem repor massa cortical, o fio continua fino e frágil.
                </p>
              </div>
              <div className="bg-cream/40 border border-tan-deep/20 rounded-2xl p-7 md:p-8 shadow-sm hover:shadow-md transition-all duration-300">
                <h3 className="text-xl font-serif font-bold text-bordo mb-3 italic">
                  Afinidade seletiva por porosidade capilar
                </h3>
                <p className="text-base text-ink-soft leading-relaxed">
                  Nosso Complexo TriMolecular é inteligente: as cargas magnéticas das microfissuras atraem as proteínas hidrolisadas exatamente onde o fio precisa, sem pesar as áreas sadias.
                </p>
              </div>
              <div className="bg-cream/40 border border-tan-deep/20 rounded-2xl p-7 md:p-8 shadow-sm hover:shadow-md transition-all duration-300">
                <h3 className="text-xl font-serif font-bold text-bordo mb-3 italic">
                  Nem toda reconstrução constrói, algumas apenas empilham
                </h3>
                <p className="text-base text-ink-soft leading-relaxed">
                  A queratina tradicional é muito grande e só se acumula do lado de fora do cabelo, provocando o efeito rebote de enrijecimento que leva à quebra em fios finos.
                </p>
              </div>
              <div className="bg-cream/40 border border-tan-deep/20 rounded-2xl p-7 md:p-8 shadow-sm hover:shadow-md transition-all duration-300">
                <h3 className="text-xl font-serif font-bold text-bordo mb-3 italic">
                  Suficiente para encorpar, blindado para durar
                </h3>
                <p className="text-base text-ink-soft leading-relaxed">
                  O NV Redensifier incha e aumenta o diâmetro da fibra. Em seguida, a cera de farelo de arroz envelopa a cutícula, sustentando o preenchimento por lavagens seguidas.
                </p>
              </div>
            </div>

            <div className="p-5 md:p-6 bg-bordo/10 border-l-4 border-bordo rounded-r-xl text-center md:text-left">
              <p className="text-sm text-ink leading-relaxed font-serif">
                <strong>Nota Científica:</strong> Este teste interativo demonstra o preenchimento gradual da fibra. Ao passar para a etapa 3, observe a blindagem polimérica bloqueando a porosidade interna do fio de cabelo.
              </p>
            </div>

            <ConversionCta
              eyebrow="Agora que você viu o mecanismo"
              title="Escolha o protocolo para iniciar a reconstrução molecular em casa."
              description="A próxima etapa é selecionar a duração ideal do tratamento para o seu nível de afinamento e constância."
              label="Escolher meu protocolo"
            />
          </div>
        </div>
      </section>

      {/* PRODUTO SECTION */}
      <section className="py-24 px-6 bg-white border-t border-tan-deep/20" id="produto">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-mono text-bordo uppercase font-bold tracking-widest block mb-3">
              O Produto Oficial
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-bordo font-black tracking-tight leading-tight">
              A Fórmula Clínica Transposta em Frasco:<br />Proteína do Trigo Pro Filler
            </h2>
            <p className="text-base text-ink-soft max-w-xl mx-auto mt-4 leading-relaxed">
              Não criamos apenas mais uma linha comercial. Desenvolvemos um ativo puro capaz de reverter o histórico de afinamento das pontas de forma contínua.
            </p>
          </div>

          <div className="relative mx-auto mb-14 max-w-3xl">
            <div className="absolute inset-x-8 -top-8 h-24 bg-rose/20 blur-3xl pointer-events-none" />
            <ProductVisualizer type="hair-gif" variant="floating" className="relative z-10" />
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 gap-5">
              <div className="flex gap-4 items-start bg-cream/30 border border-tan-deep/30 rounded-2xl p-5">
                <div className="w-10 h-10 rounded-full bg-bordo text-cream flex items-center justify-center font-sans font-bold shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base md:text-lg text-bordo mb-1">
                    Complexo TriMolecular Inteligente
                  </h3>
                  <p className="text-sm text-ink-soft leading-relaxed">
                    Proteínas hidrolisadas de trigo, ervilha e arroz calibradas com pesos moleculares reduzidos para infiltrar com facilidade em poros microscópicos.
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
                    Ativos encapsulados em nanoestruturas que se expandem em contato com a umidade cortical do fio, devolvendo a espessura física original de imediato.
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
                    Cria uma película impermeabilizante suave que protege o preenchimento, retendo as proteínas no núcleo do fio mesmo após repetidos enxágues.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <ConversionCta
              eyebrow="Fórmula pura, aplicação simples"
              title="Leve o protocolo clínico para sua rotina antes da próxima lavagem."
              description="O Pro Filler foi criado para atuar no ponto crítico da fibra: preenchimento, redensificação e selagem."
              label="Garantir meu tratamento"
            />
          </div>
        </div>
      </section>

      {/* PROVA SOCIAL / TESTIMONIALS SECTION */}
      <section className="relative overflow-hidden py-24 px-6 bg-gradient-to-br from-[#4A0E19] via-[#651524] to-[#2D060C] border-t border-cream/15" id="prova">
        <div className="absolute inset-0 bg-[linear-gradient(35deg,transparent_0%,rgba(255,255,255,0.06)_52%,transparent_74%)] pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="text-xs font-mono text-rose uppercase font-bold tracking-widest block mb-3">
              Resultados Clínicos Reais
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-cream font-black tracking-tight leading-tight">
              Quem Já Encorpou o Fio com Pro Filler
            </h2>
            <p className="text-sm md:text-base text-cream/85 mt-3 max-w-xl mx-auto leading-relaxed">
              Veja depoimentos espontâneos de clientes reais que deixaram de lado os apliques e recuperaram a saúde do próprio cabelo.
            </p>
          </div>

          <SocialProof />

          <div className="mt-14">
            <ConversionCta
              tone="dark"
              eyebrow="Resultados reais"
              title="Se outras mulheres já recuperaram corpo no fio, o próximo passo é escolher seu protocolo."
              description="Use os depoimentos como validação. A decisão prática acontece na tabela de protocolos logo abaixo."
              label="Ver ofertas com desconto"
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
