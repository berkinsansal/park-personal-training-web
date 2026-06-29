'use client';

import { AnimateIn } from './AnimateIn';

interface SectionShellProps {
  id: string;
  label: string;
  heading: React.ReactNode;
  description: React.ReactNode;
  children: React.ReactNode;
  sectionClassName?: string;
  containerClassName?: string;
  headerClassName?: string;
  descriptionContainerClassName?: string;
}

export function SectionShell({
  id,
  label,
  heading,
  description,
  children,
  sectionClassName = 'bg-zinc-950',
  containerClassName = 'max-w-6xl',
  headerClassName = 'mb-16',
  descriptionContainerClassName = 'max-w-2xl',
}: SectionShellProps) {
  return (
    <section id={id} className={`py-16 ${sectionClassName}`}>
      <div className={`${containerClassName} mx-auto px-6`}>
        <AnimateIn>
          <div className={`text-center ${headerClassName}`}>
            <span className="text-amber-400 text-sm font-semibold uppercase tracking-widest">
              {label}
            </span>
            <h2 className="mt-3 text-4xl md:text-5xl font-black text-white">
              {heading}
            </h2>
            <p className={`mt-4 text-zinc-400 text-lg ${descriptionContainerClassName} mx-auto`}>
              {description}
            </p>
          </div>
        </AnimateIn>
        {children}
      </div>
    </section>
  );
}
