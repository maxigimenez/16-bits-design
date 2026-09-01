import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { cn } from '../lib/cn';

export type BadgeTone = 'neutral' | 'primary' | 'amber' | 'success' | 'danger' | 'outline';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(({ tone = 'neutral', className, ...props }, ref) => (
  <span {...props} ref={ref} className={cn('bits-component bits-badge', `bits-badge--${tone}`, className)} />
));

Badge.displayName = 'Badge';
