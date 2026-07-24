import React, { useState } from 'react';
import { Play, CheckCircle2 } from 'lucide-react';
import ConversionCta from './ConversionCta';

interface Trichologist {
  id: string;
  youtubeId: string;
  role: string;
  name: string;
  city?: string;
  coverUrl: string;
}

const trichologists: Trichologist[] = [
  {
    id: '1',
    youtubeId: 'Zd1bC5EFXSI',
    role: 'Tricologista',
    name: 'Amanda Esperancin',
    coverUrl: 'https://img.youtube.com/vi/Zd1bC5EFXSI/maxresdefault.jpg',
  },
  {
    id: '2',
    youtubeId: 'nxdQw51Pu_M',
    role: 'Tricologista',
    name: 'Cristina Marques',
    coverUrl: 'https://img.youtube.com/vi/nxdQw51Pu_M/maxresdefault.jpg',
  },
  {
    id: '3',
    youtubeId: 'd49i_hQbUE0',
    role: 'Tricologista',
    name: 'Tayana Vieira',
    coverUrl: 'https://img.youtube.com/vi/d49i_hQbUE0/maxresdefault.jpg',
  },
  {
    id: '4',
    youtubeId: 'IZtzZJ8hKYI',
    role: 'Tricologista',
    name: 'Bia Miranda',
    coverUrl: 'https://img.youtube.com/vi/IZtzZJ8hKYI/maxresdefault.jpg',
  },
  {
    id: '5',
    youtubeId: '5dX-Ct2Gsos',
    role: 'Tricologista',
    name: 'Dra. Marisa',
    coverUrl: 'https://img.youtube.com/vi/5dX-Ct2Gsos/maxresdefault.jpg',
  },
];

export const TrichologistsSection: React.FC = () => {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  return (
    <section className="py-24 px-6 bg-gradient-to-br from-[#4A0E19] via-[#651524] to-[#2D060C] text-cream relative overflow-hidden border-t border-cream/15" id="profissionais">
      <div className="absolute inset-0 bg-[linear-gradient(35deg,transparent_0%,rgba(255,255,255,0.05)_52%,transparent_74%)] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-xs font-mono text-rose uppercase font-bold tracking-[0.2em] block mb-3">
            RECOMENDAÇÃO PROFISSIONAL & CLÍNICA
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-cream font-black tracking-tight leading-tight">
            Mais do que clientes satisfeitas: profissionais que recomendam.
          </h2>
          <p className="text-base sm:text-lg font-sans text-cream/80 max-w-2xl mx-auto mt-4 leading-relaxed font-normal">
            Tricologistas e especialistas capilares que testaram a tecnologia e prescrevem a reconstrução Sweet Therapy em seus consultórios.
          </p>
        </div>

        {/* Responsive Grid of Vertical Video Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {trichologists.map((t) => {
            const isPlaying = activeVideoId === t.id;

            return (
              <div
                key={t.id}
                className="group relative overflow-hidden rounded-3xl border border-cream/20 bg-black/40 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col aspect-[9/16]"
              >
                {isPlaying ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${t.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                    title={`Vídeo Tricologista ${t.name}`}
                    className="w-full h-full rounded-3xl"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div
                    onClick={() => setActiveVideoId(t.id)}
                    className="w-full h-full relative cursor-pointer group flex flex-col justify-between"
                  >
                    {/* Thumbnail Image */}
                    <img
                      src={t.coverUrl}
                      alt={`Tricologista ${t.name}`}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        // Fallback thumbnail if maxresdefault is missing
                        (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${t.youtubeId}/hqdefault.jpg`;
                      }}
                    />

                    {/* Gradient Overlay for Text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20 group-hover:from-black/95 transition-all duration-300" />

                    {/* Play Button Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-white/20 group-hover:bg-rose/90 text-white border border-white/40 flex items-center justify-center backdrop-blur-md transition-all duration-300 group-hover:scale-110 shadow-lg">
                        <Play className="w-6 h-6 fill-white ml-0.5" />
                      </div>
                    </div>

                    {/* Bottom Info Overlay */}
                    <div className="relative z-10 p-5 mt-auto text-left space-y-0.5">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-rose/90 block">
                        {t.role}
                      </span>
                      <h3 className="font-serif font-bold text-lg text-cream leading-tight">
                        {t.name}
                      </h3>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bloco de Confiança */}
        <div className="mt-16 max-w-3xl mx-auto bg-cream/10 border border-cream/20 rounded-3xl p-6 sm:p-8 backdrop-blur-md text-left shadow-2xl">
          <h3 className="font-serif font-black text-2xl sm:text-3xl text-cream mb-6 tracking-tight">
            Em mais de 11 anos
          </h3>

          <ul className="space-y-4">
            {[
              'Mais de 18 mil clientes tratados',
              'Mais de 3.500 profissionais formados',
              'Clientes em todos os estados brasileiros',
              'Primeira marca dedicada exclusivamente à terapia capilar em casa',
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-3.5 text-cream/95 font-sans font-medium text-base sm:text-lg">
                <div className="w-6 h-6 rounded-full bg-rose/30 border border-rose/60 flex items-center justify-center shrink-0 mt-0.5 text-cream">
                  <CheckCircle2 className="w-4 h-4 text-rose" />
                </div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Transition CTA Card before Offer Section */}
        <div className="mt-14 max-w-3xl mx-auto">
          <ConversionCta
            tone="dark"
            eyebrow="Seu próximo passo"
            title="Mais de uma década de pesquisa, milhares de mulheres atendidas e uma tecnologia validada na prática trouxeram você até aqui."
            description="Agora falta apenas uma decisão: escolher o protocolo ideal para o seu nível de afinamento."
            label="Escolher meu protocolo"
          />
        </div>
      </div>
    </section>
  );
};
