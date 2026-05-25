type Service = {
  id: number;
  icon: string;
  title: string;
  description: string;
  order_index: number;
};

export default function Services({ services }: { services: Service[] }) {
  return (
    <section id="hizmetler" className="py-24 bg-zinc-950">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-amber-400 text-sm font-semibold uppercase tracking-widest">
            Hizmetlerimiz
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-black text-white">
            Ne Sunuyoruz?
          </h2>
          <p className="mt-4 text-zinc-400 text-lg max-w-2xl mx-auto">
            Her seviyeye ve hedefe uygun programlarla seni en iyi şekilde
            destekliyoruz.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div
              key={s.id}
              className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800 hover:border-amber-400/40 hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="text-4xl mb-4">{s.icon}</div>
              <h3 className="text-white font-bold text-lg mb-3 group-hover:text-amber-400 transition-colors">
                {s.title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
