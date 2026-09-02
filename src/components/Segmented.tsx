import { forwardRef, useState } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../lib/cn';

export interface SegmentedOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface SegmentedProps extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
  label: string;
  options: readonly SegmentedOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  fullWidth?: boolean;
}

export const Segmented = forwardRef<HTMLDivElement, SegmentedProps>(
  (
    {
      label,
      options,
      value,
      defaultValue,
      onValueChange,
      disabled = false,
      fullWidth = false,
      className,
      ...props
    },
    ref,
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue ?? options[0]?.value);
    const selectedValue = value ?? uncontrolledValue;

    return (
      <div
        {...props}
        ref={ref}
        className={cn('bits-component bits-segmented', fullWidth && 'bits-segmented--full', className)}
        role="group"
        aria-label={label}
        aria-disabled={disabled || undefined}
      >
        {options.map((option) => {
          const selected = option.value === selectedValue;
          const optionDisabled = disabled || option.disabled;

          return (
            <button
              key={option.value}
              type="button"
              className="bits-segmented__option"
              aria-pressed={selected}
              disabled={optionDisabled}
              onClick={() => {
                if (value === undefined) setUncontrolledValue(option.value);
                onValueChange?.(option.value);
              }}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    );
  },
);
Segmented.displayName = 'Segmented';
