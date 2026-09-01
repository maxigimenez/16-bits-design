import { forwardRef } from 'react';
import type { CSSProperties, HTMLAttributes } from 'react';
import { cn } from '../lib/cn';

export type CardVariant = 'panel' | 'raised' | 'outline';
export type CardTone = 'primary' | 'amber' | 'success' | 'danger';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  tone?: CardTone;
  accent?: boolean;
}

const toneVariables: Record<CardTone, string> = {
  primary: 'var(--bits-primary)',
  amber: 'var(--bits-amber)',
  success: 'var(--bits-success)',
  danger: 'var(--bits-danger)',
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'panel', tone = 'primary', accent = false, className, style, ...props }, ref) => (
    <div
      {...props}
      ref={ref}
      className={cn('bits-component bits-card', `bits-card--${variant}`, className)}
      data-accent={accent || undefined}
      style={{ '--bits-card-accent': toneVariables[tone], ...style } as CSSProperties}
    />
  ),
);

Card.displayName = 'Card';

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div {...props} ref={ref} className={cn('bits-component bits-card__header', className)} />
));
CardHeader.displayName = 'CardHeader';

export const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => (
  <h3 {...props} ref={ref} className={cn('bits-component bits-card__title', className)} />
));
CardTitle.displayName = 'CardTitle';

export const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => (
  <p {...props} ref={ref} className={cn('bits-component bits-card__description', className)} />
));
CardDescription.displayName = 'CardDescription';

export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div {...props} ref={ref} className={cn('bits-component bits-card__content', className)} />
));
CardContent.displayName = 'CardContent';

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div {...props} ref={ref} className={cn('bits-component bits-card__footer', className)} />
));
CardFooter.displayName = 'CardFooter';
