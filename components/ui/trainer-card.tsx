'use client';

import Image from 'next/image';
import { getInitials } from '@/lib/utils';
import type { Trainer } from '@/lib/types';

interface Props {
  trainer: Trainer;
}

export function TrainerCard({ trainer }: Props) {
  return (
    <div className="bg-zinc-800 rounded-2xl p-8 border border-zinc-700 hover:border-amber-400/40 transition-all duration-300 text-center group w-72">
      {trainer.photo_url ? (
        <div className="relative w-24 h-24 rounded-full overflow-hidden mx-auto mb-5 group-hover:scale-120 transition-transform bg-amber-400/10 border border-amber-400/30">
          <Image
            fill
            sizes="100vw"
            src={trainer.photo_url}
            alt={trainer.name}
            className="object-cover"
          />
        </div>
      ) : (
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center mx-auto mb-5 text-3xl font-black text-zinc-950 group-hover:scale-120 transition-transform">
          {getInitials(trainer.name)}
        </div>
      )}
      <h3 className="text-white font-bold text-xl">{trainer.name}</h3>
      <a
        href={`https://instagram.com/${trainer.ig_handle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 mt-3 text-zinc-400 hover:text-amber-400 transition-colors text-sm"
      >
        @{trainer.ig_handle}
      </a>
    </div>
  );
}
