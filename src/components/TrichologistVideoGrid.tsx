import React, { useState } from 'react';
import { Play } from 'lucide-react';

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
    name: 'Marisa',
    coverUrl: 'https://img.youtube.com/vi/5dX-Ct2Gsos/maxresdefault.jpg',
  },
];

export const TrichologistVideoGrid: React.FC = () => {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  return (
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
                <img
                  src={t.coverUrl}
                  alt={`Tricologista ${t.name}`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${t.youtubeId}/hqdefault.jpg`;
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20 group-hover:from-black/95 transition-all duration-300" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/20 group-hover:bg-rose/90 text-white border border-white/40 flex items-center justify-center backdrop-blur-md transition-all duration-300 group-hover:scale-110 shadow-lg">
                    <Play className="w-6 h-6 fill-white ml-0.5" />
                  </div>
                </div>

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
  );
};

export default TrichologistVideoGrid;
