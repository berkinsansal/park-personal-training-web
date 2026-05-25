type Teacher = {
  id: number;
  name: string;
  ig_handle: string;
  initials: string;
  order_index: number;
};

export default function Teachers({ teachers }: { teachers: Teacher[] }) {
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
              key={t.id}
              className="bg-zinc-800 rounded-2xl p-8 border border-zinc-700 hover:border-amber-400/40 transition-all duration-300 text-center group w-72"
            >
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center mx-auto mb-5 text-3xl font-black text-zinc-950 group-hover:scale-105 transition-transform">
                {t.initials}
              </div>
              <h3 className="text-white font-bold text-xl">{t.name}</h3>
              <a
                href={`https://instagram.com/${t.ig_handle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-3 text-zinc-400 hover:text-amber-400 transition-colors text-sm"
              >
                @{t.ig_handle}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
