import type { HTMLAttributes } from 'react';

export default function Section({
  children,
  className = '',
  ...props
}: HTMLAttributes<HTMLElement>) {
  return (
    <section className={`panel ${className}`} {...props}>
      {children}
    </section>
  );
}
