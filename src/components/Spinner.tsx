import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../lib/cn';

export type SpinnerSize = 'sm' | 'md' | 'lg';

export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  label: ReactNode;
  size?: SpinnerSize;
  hideLabel?: boolean;
}

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ label, size = 'md', hideLabel = false, className, ...props }, ref) => (
    <div
      {...props}
      ref={ref}
      className={cn('bits-component bits-spinner', `bits-spinner--${size}`, className)}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <span className="bits-spinner__track" aria-hidden="true">
        <span className="bits-spinner__bar" />
      </span>
      <span className={cn('bits-spinner__label', hideLabel && 'bits-sr-only')}>{label}</span>
    </div>
  ),
);
Spinner.displayName = 'Spinner';
