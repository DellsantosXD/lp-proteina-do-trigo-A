import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FaqItem } from '../types';

const faqItems: FaqItem[] = [
  {
    id: 1,
    question: 'Funciona para o meu tipo de afinamento, seja por idade, hormônio ou química?',
    answer: 'Sim, funciona perfeitamente independente da causa. A Proteína do Trigo Pro Filler atua preenchendo as falhas de porosidade da estrutura física do fio. Quer o seu afinamento tenha sido causado por processos químicos acumulados (progressivas, descolorações), quer por alterações hormonais naturais ou envelhecimento capilar, a fibra danificada será reconstruída em camadas moleculares.'
  },
  {
    id: 2,
    question: 'Já tentei hidratação e reconstrutor comum. Por que o Pro Filler seria diferente?',
    answer: 'Porque a maioria dos reconstrutores de prateleira ou salão peca por dois motivos: 1) espalham-se de forma uniforme pela fibra, acumulando queratina pesada onde o fio já está saudável, causando enrijecimento e quebra; 2) não possuem agentes de ancoragem, fazendo o resultado escorrer pelo ralo na primeira lavagem. O nosso Complexo TriMolecular possui pesos seletivos que penetram apenas nas microfissuras e a cera de farelo de arroz sela essa massa para que ela continue dentro do córtex por muito mais tempo.'
  },
  {
    id: 3,
    question: 'Preciso de salão de beleza ou fórmula manipulada para aplicar?',
    answer: 'Não. Todo o protocolo foi desenhado para ser aplicado de forma simples e rápida no conforto da sua casa, dispensando o custo de idas frequentes ao salão ou a complexidade de encomendar fórmulas manipuladas em farmácias.'
  },
  {
    id: 4,
    question: 'Como saber qual o protocolo de tratamento ideal para mim?',
    answer: 'Se você sente apenas o comprimento e as pontas do cabelo finas, ralas e sem vida, o Protocolo 1 (Proteína) é suficiente. Se você percebe que o afinamento começa desde o nascimento do fio e nota queda capilar, o Protocolo 2 soma o Sérum Fortalecedor para tratar diretamente o bulbo capilar. Se o seu cabelo também sofre com oleosidade excessiva no couro cabeludo, o que deixa os fios grudados e acentua a sensação de cabelo fino, o Protocolo 3 com o Shampoo Antioxidante Mineral prepara o couro perfeitamente para absorver todo o tratamento.'
  },
  {
    id: 5,
    question: 'Como funciona a garantia de 30 dias?',
    answer: 'Acreditamos tanto na ciência do nosso produto que oferecemos uma Garantia Incondicional de Satisfação de 30 dias. Se por qualquer motivo você aplicar o protocolo e achar que não obteve resultado expressivo no encorpamento do fio, basta entrar em contato conosco e faremos a devolução integral do seu dinheiro sem burocracia ou justificativas.'
  },
  {
    id: 6,
    question: 'Em quanto tempo vejo os primeiros resultados?',
    answer: 'A sensação de cabelo encorpado, denso e com balanço já pode ser sentida logo após a primeira aplicação do produto devido à deposição imediata da primeira camada do Complexo TriMolecular. Os resultados acumulativos aumentam o diâmetro real e permanente do fio ao longo de 4 semanas de uso contínuo.'
  },
  {
    id: 7,
    question: 'Posso parcelar a compra?',
    answer: 'Sim, a sua compra pode ser realizada à vista via Pix ou parcelada em até 12x no cartão de crédito através do nosso gateway seguro de pagamento.'
  },
  {
    id: 8,
    question: 'Qual o prazo de envio e de entrega?',
    answer: 'Seu pedido é processado e despachado de Brasília em até 1 dia útil após a confirmação do pagamento. O prazo médio de entrega para as capitais é de 5 a 8 dias úteis, e para o interior de até 12 dias úteis, contando com código de rastreamento enviado via e-mail.'
  }
];

export default function FaqAccordion() {
  const [openId, setOpenId] = useState<number | null>(4); // default open item 4 like the original HTML mockup

  const toggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="max-w-2xl mx-auto divide-y divide-tan-deep/30">
      {faqItems.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id} className="py-4">
            <button
              onClick={() => toggle(item.id)}
              className="w-full flex items-center justify-between text-left py-2 font-serif font-semibold text-base md:text-lg text-bordo hover:text-bordo-deep transition-colors cursor-pointer"
              aria-expanded={isOpen}
            >
              <span>{item.question}</span>
              <motion.span
                className="text-lg font-mono text-bordo ml-4"
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
                  <p className="text-sm md:text-base text-ink-soft leading-relaxed pt-2 pb-4 px-1">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
