'use client';

import { useLayoutEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import type { Playlist } from '@/lib/types';
import { AnimateIn } from '@/app/[locale]/_components/AnimateIn';
import { SectionShell } from '@/app/[locale]/_components/SectionShell';

export default function Playlists({ playlists }: { playlists: Playlist[] }) {
  const t = useTranslations('playlists');
  const defaultPlaylistId = playlists[0]?.id ?? '';
  const [selectedId, setSelectedId] = useState(defaultPlaylistId);

  const selectedPlaylist = playlists.find((p) => p.id === selectedId);

  useLayoutEffect(() => {
    return () => {
      // Runs when Next.js hides the route
      setSelectedId(defaultPlaylistId);
    };
  }, [defaultPlaylistId]);

  return (
    <SectionShell
      label={t('label')}
      heading={t('heading')}
      description={`${t('p1')} ${t('p2')}`}
      sectionClassName="bg-green-950"
    >
      <div className="flex flex-col gap-8">
        <AnimateIn delay={0}>
          {playlists.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3">
              {playlists.map((playlist) => (
                <button
                  key={playlist.id}
                  className={`px-2 py-2 rounded-lg font-medium transition-all ${
                    selectedId === playlist.id
                      ? 'bg-amber-400 text-black'
                      : 'bg-zinc-700 text-white hover:bg-zinc-600'
                  }`}
                  type="button"
                  onClick={() => setSelectedId(playlist.id)}
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
                key={selectedPlaylist.spotify_id}
                allowFullScreen
                style={{ borderRadius: '12px' }}
                src={`https://open.spotify.com/embed/playlist/${selectedPlaylist.spotify_id}?utm_source=generator&theme=0`}
                width=""
                height="352"
                className="h-[360px] w-full md:h-[360px] md:w-[50%]"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                loading="lazy"
              />
            </div>
          )}
        </AnimateIn>
      </div>
    </SectionShell>
  );
}
