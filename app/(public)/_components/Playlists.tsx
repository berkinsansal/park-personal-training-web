'use client';

import { useState } from 'react';
import type { Playlist } from '@/lib/types';
import type { Dict } from '@/lib/i18n';
import { AnimateIn } from './AnimateIn';

export default function Playlists({ playlists, dict }: { playlists: Playlist[]; dict: Dict }) {
  const strings = dict.playlists;
  const [selectedId, setSelectedId] = useState(playlists[0]?.id || '');

  const selectedPlaylist = playlists.find((p) => p.id === selectedId);

  return (
    <section id="music" className="py-16 bg-green-500/20">
      <div className="max-w-7xl mx-auto px-6">
        <AnimateIn>
          <div className="text-center mb-12">
            <span className="text-amber-400 text-sm font-semibold uppercase tracking-widest">
              {strings.label}
            </span>
            <h2 className="mt-3 text-4xl md:text-5xl font-black text-white">
              {strings.heading}
            </h2>
            <p className="mt-4 text-zinc-400 text-lg max-w-2xl mx-auto">
              {strings.description}
            </p>
          </div>
        </AnimateIn>

        <div className="flex flex-col gap-8">
          <AnimateIn delay={0}>
            {playlists.length > 0 && (
              <div className="flex flex-wrap justify-center gap-3">
                {playlists.map((playlist) => (
                  <button
                    key={playlist.id}
                    onClick={() => setSelectedId(playlist.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedId === playlist.id
                        ? 'bg-amber-400 text-black'
                        : 'bg-zinc-700 text-white hover:bg-zinc-600'
                    }`}
                  >
                    {playlist.title}
                  </button>
                ))}
              </div>
            )}
          </AnimateIn>

          <AnimateIn delay={150}>
            {selectedPlaylist && (
              <div className="flex justify-center overflow-hidden">
                <iframe
                  style={{ borderRadius: '12px' }}
                  src={`https://open.spotify.com/embed/playlist/${selectedPlaylist.spotify_id}?utm_source=generator&theme=0`}
                  width=""
                  height="352"
                  className="h-[360px] w-full md:h-[360px] md:w-[50%]"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
              </div>
            )}
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
