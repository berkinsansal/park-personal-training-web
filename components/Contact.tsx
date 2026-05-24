export default function Contact() {
  return (
    <section id="iletisim" className="py-24 bg-zinc-950">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-amber-400 text-sm font-semibold uppercase tracking-widest">
            İletişim
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-black text-white">
            Harekete Geç
          </h2>
          <p className="mt-4 text-zinc-400 text-lg max-w-xl mx-auto">
            Sormak istediğin bir şey mi var? Bize Instagram üzerinden ulaşabilir
            ya da aşağıdaki formu doldurabilirsin.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="flex flex-col gap-6">
            <a
              href="https://instagram.com/parkpersonaltraining"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-amber-400/50 hover:-translate-y-0.5 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </div>
              <div>
                <div className="text-white font-bold group-hover:text-amber-400 transition-colors">
                  Instagram
                </div>
                <div className="text-zinc-400 text-sm">@parkpersonaltraining</div>
              </div>
            </a>

            <a
              href="tel:05412368206"
              className="flex items-center gap-4 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-amber-400/50 hover:-translate-y-0.5 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-zinc-700 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <div className="text-white font-bold group-hover:text-amber-400 transition-colors">Telefon</div>
                <div className="text-zinc-400 text-sm">0541 236 82 06</div>
              </div>
            </a>

            <div className="flex items-center gap-4 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <div className="w-12 h-12 rounded-xl bg-zinc-700 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <div className="text-white font-bold">Adres</div>
                <div className="text-zinc-400 text-sm">Park Caddesi 19/A-3</div>
                <div className="text-zinc-400 text-sm">Çankaya / Ankara</div>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <div className="w-12 h-12 rounded-xl bg-zinc-700 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div className="text-white font-bold">Çalışma Saatleri</div>
                <div className="text-zinc-400 text-sm">Pzt - Cmt: 07:00 - 21:00</div>
                <div className="text-zinc-400 text-sm">Pazar: 09:00 - 17:00</div>
              </div>
            </div>
          </div>

          <form className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex flex-col gap-4">
            <div>
              <label className="block text-zinc-400 text-sm mb-2">Adınız Soyadınız</label>
              <input
                type="text"
                placeholder="Ali Veli"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors text-sm"
              />
            </div>
            <div>
              <label className="block text-zinc-400 text-sm mb-2">Telefon veya E-posta</label>
              <input
                type="text"
                placeholder="0555 000 00 00"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors text-sm"
              />
            </div>
            <div>
              <label className="block text-zinc-400 text-sm mb-2">Mesajınız</label>
              <textarea
                rows={4}
                placeholder="Merhaba, bilgi almak istiyorum..."
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors text-sm resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-amber-400 text-zinc-950 font-bold rounded-lg hover:bg-amber-300 transition-colors text-sm uppercase tracking-wider"
            >
              Mesaj Gönder
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
