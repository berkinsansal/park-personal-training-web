import type { Playlist } from '@/lib/types';
import type { Dict } from '@/lib/i18n';

export default function Playlists({ playlists, dict }: { playlists: Playlist[]; dict: Dict }) {
  return (
    <section className="py-24 bg-zinc-950">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-amber-400 text-sm font-semibold uppercase tracking-widest">
            Spotify
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-black text-white">
            Çalma Listeleri
          </h2>
          <p className="mt-4 text-zinc-400 text-lg max-w-2xl mx-auto">
            Antrenmanlarınız sırasında size eşlik edecek müzik
          </p>
        </div>
        <div className="flex flex-col gap-8 max-w-2xl mx-auto">
          {playlists.map((playlist) => (
            <div key={playlist.id} className="flex flex-col items-center">
              <p className="text-white font-semibold text-lg mb-4">{playlist.title}</p>
              <iframe
                style={{ borderRadius: '12px' }}
                src={`https://open.spotify.com/embed/playlist/${playlist.spotify_id}?utm_source=generator&theme=0`}
                width="100%"
                height="352"
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
