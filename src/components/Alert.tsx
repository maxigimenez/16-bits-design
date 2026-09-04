import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../lib/cn';

export type AlertTone = 'info' | 'warning' | 'success' | 'danger';
export type AlertVariant = 'default' | 'subtle';

const alertIcons: Record<AlertTone, string> = {
  info: 'i',
  warning: '!',
  success: '✓',
  danger: '✕',
};

export type AlertProps = Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
  tone?: AlertTone;
  variant?: AlertVariant;
  title: ReactNode;
  icon?: ReactNode;
  action?: ReactNode;
};

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      tone = 'info',
      variant = 'default',
      title,
      icon,
      action,
      children,
      className,
      role,
      ...props
    },
    ref,
  ) => {
    const defaultMarker = variant === 'subtle' ? null : alertIcons[tone];

    return (
      <div
        {...props}
        ref={ref}
        className={cn('bits-component bits-alert', `bits-alert--${tone}`, `bits-alert--${variant}`, className)}
        role={role ?? (tone === 'danger' && variant === 'default' ? 'alert' : 'status')}
      >
        {icon === null ? null : (
          <span
            className={cn('bits-alert__icon', variant === 'subtle' && icon === undefined && 'bits-alert__icon--marker')}
            aria-hidden="true"
          >
            {icon ?? defaultMarker}
          </span>
        )}
        <div className="bits-alert__content">
          <div className="bits-alert__copy">
            <div className="bits-alert__title">{title}</div>
            {children === undefined ? null : <div className="bits-alert__message">{children}</div>}
          </div>
          {action === undefined ? null : <div className="bits-alert__action">{action}</div>}
        </div>
      </div>
    );
  },
);
Alert.displayName = 'Alert';
