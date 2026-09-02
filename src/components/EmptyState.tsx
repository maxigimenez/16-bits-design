import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../lib/cn';

export type EmptyStateHeadingLevel = 2 | 3 | 4;

export type EmptyStateProps = Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
  title: ReactNode;
  headingLevel?: EmptyStateHeadingLevel;
  illustration?: ReactNode;
  action?: ReactNode;
};

function PixelMotif() {
  return (
    <span className="bits-empty-state__motif" aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
      <span />
    </span>
  );
}

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      title,
      headingLevel = 3,
      illustration,
      action,
      children,
      className,
      ...props
    },
    ref,
  ) => {
    const Heading = `h${headingLevel}` as const;

    return (
      <div {...props} ref={ref} className={cn('bits-component bits-empty-state', className)}>
        <div className="bits-empty-state__illustration">
          {illustration ?? <PixelMotif />}
        </div>
        <div className="bits-empty-state__copy">
          <Heading className="bits-empty-state__title">{title}</Heading>
          {children === undefined ? null : (
            <div className="bits-empty-state__description">{children}</div>
          )}
        </div>
        {action === undefined ? null : <div className="bits-empty-state__action">{action}</div>}
      </div>
    );
  },
);
EmptyState.displayName = 'EmptyState';
