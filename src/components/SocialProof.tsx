import { motion } from 'motion/react';
import { Testimonial } from '../types';

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Mariana Azevedo',
    role: 'Paciente de Brasília, DF',
    text: 'Meu rabo de cavalo estava tão fino que eu tinha vergonha de prender. Parecia que tinha sobrado um terço do meu cabelo de antes. Com três semanas usando a proteína do trigo Pro Filler, sinto que ele enche de novo a mão. Dá gosto de pegar no cabelo.',
    rating: 5,
    type: 'photo',
    tag: 'Fio Encorpado'
  },
  {
    id: 2,
    name: 'Carolina G. Mendonça',
    role: 'São Paulo, SP',
    text: 'Já tinha gasto rios de dinheiro em cronogramas caríssimos importados e o resultado sumia na primeira lavada. A tecnologia de 3 camadas da Sweet Therapy realmente fixa no fio. Meu cabelo ganhou peso e um brilho espelhado que nunca tinha visto.',
    rating: 5,
    type: 'video',
    tag: 'Resultado de Salão'
  },
  {
    id: 3,
    name: 'Dra. Beatriz Santos',
    role: 'Terapêuta Capilar, Curitiba',
    text: 'Como profissional da área, pesquiso muito a composição antes de indicar. O Complexo TriMolecular com pesos de penetração seletiva por porosidade é genial. Ele reconstrói os vazios da fibra sem sobrecarregar ou endurecer o restante do cabelo.',
    rating: 5,
    type: 'text',
    tag: 'Aprovação Clínica'
  },
  {
    id: 4,
    name: 'Renata Vasconcellos',
    role: 'Belo Horizonte, MG',
    text: 'Eu usei o Protocolo 3 pois meu cabelo costumava ficar muito grudado no couro pela oleosidade, o que piorava o aspecto ralo. O shampoo de minerais preparou o couro e o trio devolveu a densidade que eu perdi após a gestação. Recomendo muito!',
    rating: 5,
    type: 'video',
    tag: 'Gestante/Pós-Parto'
  },
  {
    id: 5,
    name: 'Juliana Paes Coimbra',
    role: 'Recife, PE',
    text: 'Meu cabelo não passava da linha do sutiã por causa do afinamento e quebra constante provocados pela progressiva. Pela primeira vez em anos consegui deixar crescer. Ele está encorpado até as pontas, sem aquele aspecto ralo de antes.',
    rating: 5,
    type: 'photo',
    tag: 'Livre de Quebra'
  },
  {
    id: 6,
    name: 'Camila Albuquerque',
    role: 'Rio de Janeiro, RJ',
    text: 'Incrível como o cabelo ganha balanço e encorpamento já na primeira aplicação. A textura do creme é maravilhosa e não pesa nada nos fios finos. Minha autoestima voltou 100%. Vale cada centavo investir no protocolo!',
    rating: 5,
    type: 'text',
    tag: 'Autoestima Renovada'
  }
];

export default function SocialProof() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {testimonials.map((t, idx) => (
        <motion.div
          key={t.id}
          className="bg-cream hover:bg-cream-soft rounded-2xl border border-tan-deep/30 p-6 flex flex-col justify-between shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: idx * 0.08 }}
        >
          {/* Tag */}
          <span className="absolute top-4 right-4 bg-bordo/10 text-bordo font-mono text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
            {t.tag}
          </span>

          <div>
            {/* Stars */}
            <div className="flex gap-0.5 mb-4 text-bordo">
              {[...Array(t.rating)].map((_, i) => (
                <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>

            {/* Quote content */}
            <p className="text-sm md:text-base text-ink leading-relaxed mb-6 italic font-serif">
              "{t.text}"
            </p>
          </div>

          {/* User information */}
          <div className="flex items-center gap-3 border-t border-tan-deep/20 pt-4 mt-auto">
            {/* Elegant avatar fallback */}
            <div className="w-10 h-10 rounded-full bg-tan/50 flex items-center justify-center text-bordo font-bold font-serif text-sm border border-tan-deep/40 select-none">
              {t.name.split(' ').map((n) => n[0]).join('')}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs md:text-sm font-bold text-ink leading-none">
                  {t.name}
                </span>
                {/* Verified Buyer Badge */}
                <span className="inline-flex text-[9px] text-verde bg-verde/10 px-1.5 py-0.2 rounded-md font-mono uppercase tracking-wider font-semibold">
                  ✓ Verificada
                </span>
              </div>
              <span className="text-[11px] text-ink-soft mt-0.5 block font-mono">
                {t.role}
              </span>
            </div>
          </div>

          {/* Subtle decoration for media type testimonials */}
          {t.type === 'video' && (
            <div className="absolute bottom-4 right-4 text-bordo/60 group-hover:text-bordo transition-colors duration-300">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
              </svg>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
