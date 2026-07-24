import React from 'react';
import { Package, Video, Home, MessageSquare, Heart, Sparkles } from 'lucide-react';
import ConversionCta from './ConversionCta';

interface ExperienceItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const items: ExperienceItem[] = [
  {
    icon: <Package className="w-6 h-6 text-bordo" />,
    title: 'Seu protocolo chega pronto para começar',
    description:
      'Você recebe todos os produtos organizados conforme o protocolo escolhido, sem precisar comprar itens complementares ou adaptar a rotina.',
  },
  {
    icon: <Video className="w-6 h-6 text-bordo" />,
    title: 'Aplicação simples, mesmo sem experiência',
    description:
      'Você terá acesso ao passo a passo completo de aplicação, tornando o tratamento fácil de seguir desde a primeira utilização.',
  },
  {
    icon: <Home className="w-6 h-6 text-bordo" />,
    title: 'Sem depender de salão',
    description:
      'Toda a tecnologia foi desenvolvida para entregar um protocolo clínico que pode ser realizado em casa, respeitando a sua rotina.',
  },
  {
    icon: <MessageSquare className="w-6 h-6 text-bordo" />,
    title: 'Suporte da equipe Sweet Therapy',
    description:
      'Sempre que surgir alguma dúvida durante o tratamento, nossa equipe estará disponível para orientar você sobre a melhor forma de utilizar o protocolo.',
  },
  {
    icon: <Heart className="w-6 h-6 text-bordo" />,
    title: 'Comunidade exclusiva de clientes',
    description:
      'Ao adquirir seu protocolo, você também poderá fazer parte da comunidade Sweet Lovers, onde compartilhamos conteúdos, orientações e acompanhamos milhares de mulheres que estão passando pelo mesmo processo de recuperação da fibra capilar.',
  },
  {
    icon: <Sparkles className="w-6 h-6 text-bordo" />,
    title: 'Um tratamento construído para gerar constância',
    description:
      'Os melhores resultados acontecem quando a fibra recebe reconstrução de forma contínua. Por isso, desenvolvemos uma rotina simples, prática e fácil de manter ao longo das semanas.',
  },
];

export const TreatmentExperienceSection: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-cream/35 border-t border-tan-deep/20" id="experiencia">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-xs font-mono text-bordo uppercase font-bold tracking-[0.2em] block mb-3">
            A EXPERIÊNCIA DO SEU PROTOCOLO
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-bordo font-black tracking-tight leading-tight">
            O tratamento começa quando seu protocolo chega.
          </h2>
          <p className="text-base sm:text-lg font-sans text-ink-soft max-w-2xl mx-auto mt-4 leading-relaxed font-normal">
            Você não recebe apenas um cosmético. Recebe um protocolo desenvolvido a partir de mais de uma década de experiência clínica, criado para ser realizado no conforto da sua casa, com a mesma lógica utilizada na construção dos protocolos da Sweet Therapy.
          </p>
        </div>

        {/* 6 Feature Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-tan-deep/25 rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 group"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-cream border border-tan-deep/20 flex items-center justify-center mb-5 group-hover:bg-bordo/10 transition-colors duration-300">
                  {item.icon}
                </div>
                <h3 className="font-serif font-bold text-lg sm:text-xl text-bordo mb-3 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm font-sans text-ink-soft leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Conversion CTA Card */}
        <div className="mt-14 max-w-3xl mx-auto">
          <ConversionCta
            tone="light"
            eyebrow="Seu protocolo está pronto"
            title="Seu protocolo está pronto. Agora basta dar o primeiro passo."
            description="Escolha o protocolo ideal para o seu nível de afinamento e receba o tratamento completo diretamente na sua casa com frete seguro."
            label="Quero iniciar minha Reconstrução Molecular"
          />
        </div>
      </div>
    </section>
  );
};

export default TreatmentExperienceSection;
