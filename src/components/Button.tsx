import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../lib/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  loadingLabel?: string;
  fullWidth?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      loadingLabel,
      fullWidth = false,
      leadingIcon,
      trailingIcon,
      disabled,
      type = 'button',
      ...props
    },
    ref,
  ) => (
    <button
      {...props}
      ref={ref}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      data-loading={loading || undefined}
      className={cn(
        'bits-component bits-button',
        `bits-button--${variant}`,
        `bits-button--${size}`,
        fullWidth && 'bits-button--full',
        className,
      )}
    >
      {leadingIcon}
      <span>{loading && loadingLabel ? loadingLabel : children}</span>
      {trailingIcon}
      {loading && <span aria-hidden="true" className="bits-button__loader" />}
    </button>
  ),
);

Button.displayName = 'Button';
