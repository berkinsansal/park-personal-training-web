const services = [
  {
    icon: "💪",
    title: "Fitness",
    desc: "Kişisel hedeflerine uygun, uzman eğitmen gözetiminde yoğun ve verimli fitness antrenmanları. Vücudunu güçlendir, sağlıklı yaşamı keşfet.",
  },
  {
    icon: "🧘",
    title: "Pilates",
    desc: "Derin kas gruplarını çalıştıran, duruşunu düzelten ve esnekliğini artıran pilates dersleri. Hem zihin hem beden için mükemmel bir denge.",
  },
  {
    icon: "🥊",
    title: "Boks & Kickboks & Muay Thai",
    desc: "Dövüş sporlarının gücünü fitness ile buluşturan dinamik dersler. Kondisyon, koordinasyon ve öz savunma becerilerini aynı anda geliştir.",
  },
  {
    icon: "🎀",
    title: "Pole Dance",
    desc: "Akrobasi ve dansı bir araya getiren, üst vücut gücünü ve esnekliği geliştiren pole dance dersleri. Her seviyeye uygun, eğlenceli bir antrenman.",
  },
  {
    icon: "🏋️",
    title: "Condition & Strength",
    desc: "Kondisyonunu zirveye taşıyan ve kas gücünü sistematik şekilde artıran özel programlar. Performansını bir üst seviyeye çıkar.",
  },
];

export default function Services() {
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
              key={s.title}
              className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800 hover:border-amber-400/40 hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="text-4xl mb-4">{s.icon}</div>
              <h3 className="text-white font-bold text-lg mb-3 group-hover:text-amber-400 transition-colors">
                {s.title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
