const services = [
  {
    icon: "🏋️",
    title: "Bire Bir Personal Training",
    desc: "Tamamen sana ozel, egitmenin gozetiminde yoğun ve verimli antrenman seansları. Hedeflerine en hizli sekilde ulasmanin yolu.",
  },
  {
    icon: "👥",
    title: "Kucuk Grup Dersleri",
    desc: "3-6 kisilik gruplarla dinamik ve motive edici antrenman deneyimi. Hem sosyal hem de etkili bir calisma ortami.",
  },
  {
    icon: "🥗",
    title: "Beslenme Danismanligi",
    desc: "Antrenman programinla uyumlu, kisisellestirilmis beslenme planlari. Yediklerinle performansinizi ve sonuclari maksimize edin.",
  },
  {
    icon: "📊",
    title: "Vucut Analizi ve Takip",
    desc: "Duzenli vucut olcumu ve ilerleme takibi ile motivasyonunu canli tut. Sonuclari gorunce devam etmek kolaylasiyor.",
  },
  {
    icon: "🧘",
    title: "Mobility ve Esneklik",
    desc: "Gunluk hayatini kolaylastiracak hareket kalitesi ve esneklik calismalari. Sakatliklari onle, daha rahat hisset.",
  },
  {
    icon: "💪",
    title: "Online Koçluk",
    desc: "Studyoya gelemesen bile durma. Uzaktan antrenman takibi, video analizi ve destek ile hedeflerine ulasmayi surdurebilirsin.",
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
            Her seviyeye ve hedefe uygun programlarla seni en iyi sekilde
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
