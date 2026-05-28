import type { Playlist } from '@/lib/types';
import type { Dict } from '@/lib/i18n';

export default function Playlists({ playlists, dict }: { playlists: Playlist[]; dict: Dict }) {
  // Use teachers translation as fallback since playlists translations might not be in public dict
  return (
    <section className="py-24 bg-zinc-950">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-amber-400 text-sm font-semibold uppercase tracking-widest">
            Spotify
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-black text-white">
            Eğitmenlerin Müzik Seçkisi
          </h2>
          <p className="mt-4 text-zinc-400 text-lg max-w-2xl mx-auto">
            Antrenmanlarınız sırasında size eşlik edecek playlists
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800 hover:border-amber-400/40 transition-all duration-300 text-center group w-72"
            >
              <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mx-auto mb-5 text-5xl group-hover:scale-105 transition-transform">
                🎵
              </div>
              <h3 className="text-white font-bold text-xl">{playlist.trainer_name}</h3>
              <p className="text-zinc-400 text-sm mt-3 mb-4">
                {playlist.spotify_id}
              </p>
              <a
                href={`https://open.spotify.com/playlist/${playlist.spotify_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors text-sm"
              >
                Spotify'da Dinle
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
