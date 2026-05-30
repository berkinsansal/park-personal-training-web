import type { Dict } from "@/lib/i18n";
import type { GalleryPhoto } from "@/lib/types";

type Props = {
  dict: Dict;
  happyCustomers: number;
  yearsExperience: number;
  teacherCount: number;
  serviceCount: number;
  gallery: GalleryPhoto[];
};

export default function About({ dict, happyCustomers, yearsExperience, teacherCount, serviceCount, gallery }: Props) {
  const t = dict.about;
  const stats = [
    { value: `${happyCustomers}+`, label: t.statHappyCustomers },
    { value: `${yearsExperience}+`, label: t.statYearsExperience },
    { value: `${teacherCount}+`, label: t.statTeachers },
    { value: String(serviceCount), label: t.statServices },
  ];

  return (
    <section id="hakkimizda" className="py-24 bg-zinc-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start mb-16">
          <div>
            <span className="text-amber-400 text-sm font-semibold uppercase tracking-widest">
              {t.label}
            </span>
            <h2 className="mt-3 text-4xl md:text-5xl font-black text-white leading-tight">
              {t.heading1}<br />
              <span className="text-amber-400">{t.heading2}</span> {t.heading3}
            </h2>
            <p className="mt-6 text-zinc-400 text-lg leading-relaxed">
              {t.p1}
            </p>
            <p className="mt-4 text-zinc-400 text-lg leading-relaxed">
              {t.p2}
            </p>
            <a
              href="#iletisim"
              className="mt-8 inline-block px-6 py-3 bg-amber-400 text-zinc-950 font-bold rounded-lg hover:bg-amber-300 transition-colors text-sm uppercase tracking-wider"
            >
              {t.cta}
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

        {gallery.length > 0 && (
          <div className="mt-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {gallery.map((photo) => (
                <div
                  key={photo.id}
                  className="group relative overflow-hidden rounded-2xl bg-zinc-800 border border-zinc-700 hover:border-amber-400/50 transition-all duration-300 aspect-video"
                >
                  <img
                    src={photo.image_url}
                    alt={photo.alt_text}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    {photo.alt_text && (
                      <p className="text-white text-sm font-medium">{photo.alt_text}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
