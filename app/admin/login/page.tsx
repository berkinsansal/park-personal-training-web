import { loginAction } from '../actions';

export default function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black text-white">Park PT</h1>
          <p className="text-zinc-400 text-sm mt-1">Admin Paneli</p>
        </div>

        <form
          action={loginAction}
          className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex flex-col gap-4"
        >
          <div>
            <label className="block text-zinc-400 text-sm mb-2">E-posta</label>
            <input
              type="email"
              name="email"
              required
              defaultValue="admin@parkpt.com"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors text-sm"
            />
          </div>

          <div>
            <label className="block text-zinc-400 text-sm mb-2">Şifre</label>
            <input
              type="password"
              name="password"
              required
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-amber-400 text-zinc-950 font-bold rounded-lg hover:bg-amber-300 transition-colors text-sm uppercase tracking-wider mt-2"
          >
            Giriş Yap
          </button>
        </form>
      </div>
    </div>
  );
}
