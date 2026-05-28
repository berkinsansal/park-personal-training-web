'use client';

interface LocationMapProps {
  latitude: number;
  longitude: number;
}

export default function LocationMap({ latitude, longitude }: LocationMapProps) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  const embedUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&hl=en&z=15&output=embed`;

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
