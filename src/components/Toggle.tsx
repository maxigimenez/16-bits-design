import { forwardRef, useState } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../lib/cn';

export interface ToggleProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: ReactNode;
}

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  ({ checked, defaultChecked = false, onCheckedChange, label, className, disabled, onClick, ...props }, ref) => {
    const [uncontrolled, setUncontrolled] = useState(defaultChecked);
    const isControlled = checked !== undefined;
    const isChecked = isControlled ? checked : uncontrolled;

    return (
      <button
        {...props}
        ref={ref}
        type="button"
        role="switch"
        aria-checked={isChecked}
        disabled={disabled}
        className={cn('bits-component bits-toggle', className)}
        onClick={(event) => {
          onClick?.(event);
          if (event.defaultPrevented) return;
          const next = !isChecked;
          if (!isControlled) setUncontrolled(next);
          onCheckedChange?.(next);
        }}
      >
        <span aria-hidden="true" className="bits-toggle__track">
          <span className="bits-toggle__thumb" />
        </span>
        {label && <span>{label}</span>}
      </button>
    );
  },
);

Toggle.displayName = 'Toggle';
