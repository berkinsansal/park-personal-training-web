'use client';

import { useCountUp } from '@/lib/hooks/use-count-up';

interface Props {
  target: number;
  suffix?: string;
  label: string;
  active: boolean;
}

export function StatCounter({ target, suffix = '', label, active }: Props) {
  const counted = useCountUp(target, 1400, active);

  return (
    <div className="bg-zinc-800 rounded-2xl p-8 text-center border border-zinc-700 hover:border-amber-400/50 transition-colors">
      <div className="text-4xl font-black text-amber-400">
        {counted}
        {suffix}
      </div>
      <div className="mt-2 text-zinc-400 text-sm font-medium">{label}</div>
    </div>
  );
}
