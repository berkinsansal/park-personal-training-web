const teachers = [
  {
    name: "Ahmet Yilmaz",
    title: "Bas Egitmen & Kurucu",
    specialties: ["Kuvvet Antrenmanı", "Vucut Sekillendirme", "Sporcu Performansi"],
    exp: "10 yil",
    initials: "AY",
  },
  {
    name: "Selin Kaya",
    title: "Personal Trainer",
    specialties: ["Kilo Yonetimi", "Beslenme", "Kadin Sagligi"],
    exp: "7 yil",
    initials: "SK",
  },
  {
    name: "Mehmet Demir",
    title: "Spor Performans Uzmani",
    specialties: ["Fonksiyonel Antrenman", "Mobility", "Rehabilitasyon"],
    exp: "8 yil",
    initials: "MD",
  },
  {
    name: "Zeynep Arslan",
    title: "Group Fitness Lideri",
    specialties: ["Grup Dersleri", "Pilates", "Esneklik"],
    exp: "5 yil",
    initials: "ZA",
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
            Uzman Egitmenlerimiz
          </h2>
          <p className="mt-4 text-zinc-400 text-lg max-w-2xl mx-auto">
            Sertifikali ve deneyimli egitmenlerimiz, seni hedeflerine ulastirmak
            icin burada.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teachers.map((t) => (
            <div
              key={t.name}
              className="bg-zinc-800 rounded-2xl p-6 border border-zinc-700 hover:border-amber-400/40 transition-all duration-300 text-center group"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center mx-auto mb-4 text-2xl font-black text-zinc-950 group-hover:scale-105 transition-transform">
                {t.initials}
              </div>
              <h3 className="text-white font-bold text-lg">{t.name}</h3>
              <p className="text-amber-400 text-sm font-medium mt-1">{t.title}</p>
              <p className="text-zinc-500 text-xs mt-1">{t.exp} deneyim</p>
              <div className="mt-4 flex flex-wrap gap-2 justify-center">
                {t.specialties.map((sp) => (
                  <span
                    key={sp}
                    className="px-2 py-1 bg-zinc-700 text-zinc-300 text-xs rounded-full"
                  >
                    {sp}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
