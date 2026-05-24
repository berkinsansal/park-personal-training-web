import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-zinc-900 border-t border-zinc-800 py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="Park PT Logo" width={48} height={48} />
          <span className="text-amber-400 font-black text-xl tracking-wide">PARK PT</span>
        </div>
        <p className="text-zinc-500 text-sm text-center">
          &copy; {new Date().getFullYear()} Park Personal Training. Tum haklari saklidir.
        </p>
        <a
          href="https://instagram.com/parkpersonaltraining"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-400 hover:text-amber-400 transition-colors text-sm"
        >
          @parkpersonaltraining
        </a>
      </div>
    </footer>
  );
}
