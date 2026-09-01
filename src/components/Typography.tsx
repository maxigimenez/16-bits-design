import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import { cn } from '../lib/cn';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingProps extends ComponentPropsWithoutRef<'h2'> {
  level?: HeadingLevel;
}

export function Heading({ level = 2, className, ...props }: HeadingProps) {
  const Component = `h${level}` as ElementType;
  return <Component {...props} className={cn('bits-component bits-heading', `bits-heading--${level}`, className)} />;
}

export type TextSize = 'body' | 'small' | 'caption' | 'label';
export type TextElement = 'p' | 'span' | 'div' | 'label' | 'code';

export interface TextProps extends ComponentPropsWithoutRef<'p'> {
  as?: TextElement;
  size?: TextSize;
  tone?: 'default' | 'soft' | 'muted' | 'faint';
  children?: ReactNode;
}

export function Text({ as = 'p', size = 'body', tone = 'default', className, ...props }: TextProps) {
  const Component = as as ElementType;
  return <Component {...props} className={cn('bits-component bits-text', `bits-text--${size}`, `bits-text--${tone}`, className)} />;
}
