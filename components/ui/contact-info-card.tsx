import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ContactInfoCardProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  icon: React.ReactNode;
  label?: string;
  value: string | React.ReactNode;
  onClick?: () => void;
  iconClassName?: string;
  asButton?: boolean;
}

const ContactInfoCard = React.forwardRef<HTMLAnchorElement, ContactInfoCardProps>(
  (
    {
      icon,
      label,
      value,
      onClick,
      iconClassName,
      asButton,
      className,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      'flex items-center gap-4 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-amber-400/50 hover:-translate-y-0.5 transition-all group';

    if (asButton) {
      return (
        <button
          type="button"
          onClick={onClick}
          className={cn(baseClasses, className)}
        >
          <div
            className={cn(
              'w-12 h-12 rounded-xl bg-zinc-700 flex items-center justify-center flex-shrink-0',
              iconClassName
            )}
          >
            {icon}
          </div>
          <div>
            {label && (
              <div className="text-white font-bold group-hover:text-amber-400 transition-colors">
                {label}
              </div>
            )}
            {typeof value === 'string' ? (
              <div className="text-zinc-400 text-sm">{value}</div>
            ) : (
              value
            )}
          </div>
        </button>
      );
    }

    return (
      <a
        ref={ref}
        className={cn(baseClasses, className)}
        {...props}
      >
        <div
          className={cn(
            'w-12 h-12 rounded-xl bg-zinc-700 flex items-center justify-center flex-shrink-0',
            iconClassName
          )}
        >
          {icon}
        </div>
        <div>
          {label && (
            <div className="text-white font-bold group-hover:text-amber-400 transition-colors">
              {label}
            </div>
          )}
          {typeof value === 'string' ? (
            <div className="text-zinc-400 text-sm">{value}</div>
          ) : (
            value
          )}
        </div>
      </a>
    );
  }
);
ContactInfoCard.displayName = 'ContactInfoCard';

export { ContactInfoCard };
