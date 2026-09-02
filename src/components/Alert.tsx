import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../lib/cn';

export type AlertTone = 'info' | 'warning' | 'success' | 'danger';

const alertIcons: Record<AlertTone, string> = {
  info: 'i',
  warning: '!',
  success: '✓',
  danger: '✕',
};

export type AlertProps = Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
  tone?: AlertTone;
  title: ReactNode;
  icon?: ReactNode;
  action?: ReactNode;
};

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      tone = 'info',
      title,
      icon,
      action,
      children,
      className,
      role,
      ...props
    },
    ref,
  ) => (
    <div
      {...props}
      ref={ref}
      className={cn('bits-component bits-alert', `bits-alert--${tone}`, className)}
      role={role ?? (tone === 'danger' ? 'alert' : 'status')}
    >
      <span className="bits-alert__icon" aria-hidden="true">{icon ?? alertIcons[tone]}</span>
      <div className="bits-alert__content">
        <div className="bits-alert__copy">
          <div className="bits-alert__title">{title}</div>
          {children === undefined ? null : <div className="bits-alert__message">{children}</div>}
        </div>
        {action === undefined ? null : <div className="bits-alert__action">{action}</div>}
      </div>
    </div>
  ),
);
Alert.displayName = 'Alert';
