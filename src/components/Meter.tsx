import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { cn } from '../lib/cn';

export type MeterTone = 'primary' | 'amber' | 'success' | 'danger';

export interface MeterProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  segments?: number;
  tone?: MeterTone;
  label?: string;
}

export const Meter = forwardRef<HTMLDivElement, MeterProps>(function Meter(
  { value, max = 100, segments = 12, tone = 'primary', label, className, ...props },
  ref,
) {
  const safeMax = max > 0 ? max : 100;
  const safeSegments = Math.max(1, Math.round(segments));
  const clamped = Math.min(Math.max(value, 0), safeMax);
  const active = Math.round((clamped / safeMax) * safeSegments);

  return (
    <div
      {...props}
      ref={ref}
      className={cn('bits-component bits-meter', `bits-meter--${tone}`, className)}
      role="progressbar"
      aria-label={label ?? props['aria-label']}
      aria-valuemin={0}
      aria-valuemax={safeMax}
      aria-valuenow={clamped}
    >
      {Array.from({ length: safeSegments }, (_, index) => (
        <span key={index} aria-hidden="true" className="bits-meter__segment" data-active={index < active} />
      ))}
    </div>
  );
});
