import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FaqItem } from '../types';

const faqItems: FaqItem[] = [
  {
    id: 1,
    question: '1. Funciona para o meu tipo de afinamento?',
    answer:
      'Sim. O Pro Filler foi desenvolvido para restaurar a estrutura da fibra capilar afinada, independentemente da causa do afinamento. Seja por química, calor excessivo, menopausa, pós-parto, envelhecimento natural ou danos acumulados, a tecnologia atua diretamente na fibra existente, devolvendo corpo, densidade e resistência.',
  },
  {
    id: 2,
    question: '2. Meu cabelo está muito fino. Ainda dá tempo de recuperar?',
    answer:
      'Na maioria dos casos, sim. Quanto antes a reconstrução estrutural começa, maior a quantidade de fibra preservada. O objetivo do tratamento é recuperar a massa da fibra existente e reduzir a progressão do afinamento.',
  },
  {
    id: 3,
    question: '3. Já usei cronograma capilar, máscaras caras e reconstruções. Por que esse seria diferente?',
    answer:
      'Porque o Pro Filler não foi desenvolvido apenas para "hidratar" ou "depositar proteína". A tecnologia de Reconstrução Molecular em 3 Camadas atua de forma sequencial: primeiro preenche as regiões fragilizadas, depois devolve densidade e, por fim, sela esse preenchimento para prolongar o resultado.',
  },
  {
    id: 4,
    question: '4. Vou sentir diferença logo na primeira aplicação?',
    answer:
      'Muitas clientes relatam perceber mais corpo, peso e resistência já na primeira aplicação. Porém, a recuperação estrutural da fibra é cumulativa. Quanto maior a constância no tratamento, mais consistente tende a ser o resultado.',
  },
  {
    id: 5,
    question: '5. Preciso ir ao salão para aplicar?',
    answer:
      'Não. O protocolo foi desenvolvido justamente para reproduzir, em casa, uma tecnologia antes restrita ao ambiente clínico.',
  },
  {
    id: 6,
    question: '6. Como escolher o protocolo ideal?',
    answer:
      '• Protocolo 1 é indicado para quem deseja recuperar apenas a fibra.\n• Protocolo 2 adiciona o Sérum Fortalecedor para cuidar também do ambiente onde o fio nasce.\n• Protocolo 3 é o protocolo mais completo, combinando reconstrução da fibra com preparo do couro cabeludo para potencializar o tratamento.',
  },
  {
    id: 7,
    question: '7. O tratamento pesa ou endurece o cabelo?',
    answer:
      'Não quando utilizado conforme o protocolo. A tecnologia foi desenvolvida para atuar preferencialmente nas áreas mais fragilizadas da fibra, evitando o aspecto rígido comum em reconstruções convencionais.',
  },
  {
    id: 8,
    question: '8. Meu cabelo é loiro, colorido ou com química. Posso usar?',
    answer:
      'Sim. Inclusive cabelos descoloridos, com progressiva ou coloração costumam apresentar perda estrutural importante da fibra, sendo excelentes candidatos para a Reconstrução Molecular.',
  },
  {
    id: 9,
    question: '9. Em quanto tempo devo repetir a aplicação?',
    answer:
      'A frequência depende do nível de afinamento e dano estrutural. No protocolo você recebe toda a orientação para realizar as aplicações de forma segura e obter o melhor resultado.',
  },
  {
    id: 10,
    question: '10. Existe garantia?',
    answer:
      'Sim.\nVocê tem 30 dias de garantia para comprar com tranquilidade. Caso o protocolo não faça mais sentido para você dentro desse período, basta devolver os cosméticos 100% lacrados e sem uso que devolvemos seu dinheiro.',
  },
  {
    id: 11,
    question: '11. Em quanto tempo meu pedido é enviado?',
    answer:
      'Os pedidos são preparados rapidamente pela nossa equipe e despachados em até 24 horas úteis após a confirmação do pagamento.',
  },
  {
    id: 12,
    question: '12. Posso parcelar?',
    answer:
      'Sim. Você pode escolher a forma de pagamento disponível no checkout e parcelar conforme as condições apresentadas no momento da compra.',
  },
  {
    id: 13,
    question: '13. O tratamento substitui medicamentos para queda capilar?',
    answer:
      'Não. O Pro Filler é um cosmético desenvolvido para restaurar a fibra capilar. Caso você esteja tratando uma condição clínica relacionada à queda, ele pode ser utilizado como parte da sua rotina de cuidados, respeitando sempre a orientação do seu profissional de saúde.',
  },
  {
    id: 14,
    question: '14. Quem desenvolveu essa tecnologia?',
    answer:
      'O Pro Filler foi desenvolvido pela Sweet Therapy, marca fundada por Cris Mendanha, pioneira na criação da primeira clínica exclusiva de tricologia do Brasil e da primeira marca brasileira dedicada exclusivamente à terapia capilar em casa.',
  },
  {
    id: 15,
    question: '15. Ainda estou em dúvida. Vale a pena começar?',
    answer:
      'Se o seu cabelo já perdeu corpo, espessura e movimento, adiar o cuidado significa permitir que a fibra continue sofrendo agressões diárias. Quanto antes a reconstrução estrutural começa, maiores são as chances de preservar e recuperar a massa da fibra capilar.',
  },
];

export default function FaqAccordion() {
  const [openId, setOpenId] = useState<number | null>(1); // default open item 1

  const toggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="max-w-3xl mx-auto divide-y divide-tan-deep/25">
      {faqItems.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id} className="py-4">
            <button
              onClick={() => toggle(item.id)}
              className="w-full flex items-center justify-between text-left py-2.5 font-serif font-bold text-base md:text-lg text-bordo hover:text-bordo-deep transition-colors cursor-pointer"
              aria-expanded={isOpen}
            >
              <span className="pr-4 leading-snug">{item.question}</span>
              <motion.span
                className="text-xl font-mono text-bordo shrink-0 w-8 h-8 rounded-full bg-bordo/8 flex items-center justify-center"
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.25 }}
              >
                +
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="text-sm md:text-base text-ink-soft leading-relaxed pt-2 pb-4 px-1 whitespace-pre-line space-y-2">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
