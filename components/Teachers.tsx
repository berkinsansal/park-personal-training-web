const teachers = [
  {
    name: "Kemal Bilge",
    ig: "kemalbilge14",
    initials: "KB",
  },
  {
    name: "Kadir Özdemir",
    ig: "kadrozdemirr",
    initials: "KÖ",
  },
  {
    name: "Kutlu Olatunji",
    ig: "kutluolatunjii",
    initials: "KO",
  },
];

export default function Teachers() {
  return (
    <section id="egitmenler" className="py-24 bg-zinc-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-amber-400 text-sm font-semibold uppercase tracking-widest">
            Ekibimiz
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-black text-white">
            Uzman Eğitmenlerimiz
          </h2>
          <p className="mt-4 text-zinc-400 text-lg max-w-2xl mx-auto">
            Sertifikalı ve deneyimli eğitmenlerimiz, seni hedeflerine ulaştırmak
            için burada.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {teachers.map((t) => (
            <div
              key={t.name}
              className="bg-zinc-800 rounded-2xl p-8 border border-zinc-700 hover:border-amber-400/40 transition-all duration-300 text-center group w-72"
            >
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center mx-auto mb-5 text-3xl font-black text-zinc-950 group-hover:scale-105 transition-transform">
                {t.initials}
              </div>
              <h3 className="text-white font-bold text-xl">{t.name}</h3>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </div>
              <a
                href={`https://instagram.com/${t.ig}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-3 text-zinc-400 hover:text-amber-400 transition-colors text-sm"
              >
                @{t.ig}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
