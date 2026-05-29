import type { Playlist } from '@/lib/types';
import type { Dict } from '@/lib/i18n';

export default function Playlists({ playlists, dict }: { playlists: Playlist[]; dict: Dict }) {
  const strings = dict.playlists;
  return (
    <section className="py-16 bg-green-500/20">
      <div className="max-w-7xl mx-auto px-6">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {playlists.map((playlist) => (
            <div key={playlist.id} className="flex justify-center overflow-hidden">
              <iframe
                style={{ borderRadius: '12px' }}
                src={`https://open.spotify.com/embed/playlist/${playlist.spotify_id}?utm_source=generator&theme=0`}
                width="100%"
                height="352"
                className="h-[120px] sm:h-[200px] md:h-[352px]"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
