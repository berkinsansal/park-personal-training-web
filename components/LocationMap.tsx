'use client';

interface LocationMapProps {
  lat: number;
  lon: number;
}

export default function LocationMap({ lat, lon }: LocationMapProps) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;
  // Zoom level: lower !1d value = higher zoom. 1200 gives good detail view with marker visible
  const embedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1200!2d${lon}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0:0x0!2z${lat},${lon}!5e0!3m2!1str!2str!4v${Date.now()}`;

  return (
    <section className="py-24 bg-zinc-900">
      <div className="max-w-6xl mx-auto px-6">
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block group rounded-2xl overflow-hidden border border-zinc-700 hover:border-amber-400/50 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-amber-400/10"
        >
          <div style={{ filter: 'invert(0.93) hue-rotate(180deg)' }}>
            <iframe
              width="100%"
              height="450"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={embedUrl}
            />
          </div>
        </a>
      </div>
    </section>
  );
}
