type Props = {
  happyCustomers: number;
  yearsExperience: number;
  teacherCount: number;
  serviceCount: number;
};

export default function About({ happyCustomers, yearsExperience, teacherCount, serviceCount }: Props) {
  const stats = [
    { value: `${happyCustomers}+`, label: "Mutlu Üye" },
    { value: `${yearsExperience}+`, label: "Yıl Deneyim" },
    { value: String(teacherCount), label: "Uzman Eğitmen" },
    { value: String(serviceCount), label: "Program Çeşidi" },
  ];

  return (
    <section id="hakkimizda" className="py-24 bg-zinc-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-amber-400 text-sm font-semibold uppercase tracking-widest">
              Hakkımızda
            </span>
            <h2 className="mt-3 text-4xl md:text-5xl font-black text-white leading-tight">
              Seni Tanıyor,<br />
              <span className="text-amber-400">Sana Özel</span> Çalışıyoruz
            </h2>
            <p className="mt-6 text-zinc-400 text-lg leading-relaxed">
              Park Personal Training olarak her bireyin farklı olduğunu
              biliyoruz. Uzman eğitmenlerimiz, senin hedeflerini, yaşam tarzını
              ve fiziksel durumunu analiz ederek tamamen sana özel bir antrenman
              ve beslenme planı oluşturuyor.
            </p>
            <p className="mt-4 text-zinc-400 text-lg leading-relaxed">
              Küçük grup derslerinden bire bir antrenmanlarımıza kadar herkese
              uygun bir program sunuyoruz. Stüdyomuzda profesyonel ekipmanlar ve
              sıcak bir atmosfer seni bekliyor.
            </p>
            <a
              href="#iletisim"
              className="mt-8 inline-block px-6 py-3 bg-amber-400 text-zinc-950 font-bold rounded-lg hover:bg-amber-300 transition-colors text-sm uppercase tracking-wider"
            >
              Bize Ulaşın
            </a>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-zinc-800 rounded-2xl p-8 text-center border border-zinc-700 hover:border-amber-400/50 transition-colors"
              >
                <div className="text-4xl font-black text-amber-400">{s.value}</div>
                <div className="mt-2 text-zinc-400 text-sm font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
