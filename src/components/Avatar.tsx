import { forwardRef } from 'react';
import type { CSSProperties, HTMLAttributes } from 'react';
import { cn } from '../lib/cn';

export type AvatarSize = 'sm' | 'md' | 'lg';

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  name: string;
  initials?: string;
  src?: string;
  alt?: string;
  size?: AvatarSize;
  color?: string;
  ink?: string;
}

function getInitials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  return (words.length > 1 ? `${words[0][0]}${words.at(-1)?.[0]}` : words[0]?.slice(0, 2) || '—').toUpperCase();
}

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  ({ name, initials, src, alt, size = 'md', color, ink, className, style, title, ...props }, ref) => {
    const customStyle = {
      ...style,
      ...(color ? { '--bits-avatar-color': color } : {}),
      ...(ink ? { '--bits-avatar-ink': ink } : {}),
    } as CSSProperties;

    return (
      <span
        {...props}
        ref={ref}
        className={cn('bits-component bits-avatar', `bits-avatar--${size}`, !src && !color && 'bits-avatar--fallback', className)}
        style={customStyle}
        title={title ?? name}
      >
        {src ? <img src={src} alt={alt ?? name} /> : <span aria-hidden="true">{initials ?? getInitials(name)}</span>}
        {!src && <span className="bits-sr-only">{name}</span>}
      </span>
    );
  },
);

Avatar.displayName = 'Avatar';
