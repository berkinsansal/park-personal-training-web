import { cn } from '@/lib/utils';

interface ItemRowProps extends React.HTMLAttributes<HTMLDivElement> {
  isPending?: boolean;
  children: React.ReactNode;
}

export function ItemRow({ isPending, className, children, ...props }: ItemRowProps) {
  return (
    <div
      className={cn(
        'bg-zinc-900 border border-zinc-800 rounded-xl p-4',
        isPending && 'opacity-50 pointer-events-none',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
