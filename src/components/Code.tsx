import { forwardRef, useId } from 'react';
import type { ForwardedRef, HTMLAttributes, ReactNode } from 'react';
import { cn } from '../lib/cn';

export type CodeVariant = 'block' | 'inline';

export type CodeBlockProps = Omit<
  HTMLAttributes<HTMLPreElement>,
  'children' | 'role' | 'tabIndex'
> & {
  variant?: 'block';
  label: string;
  children: ReactNode;
  containerClassName?: string;
};

export type CodeInlineProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
  variant: 'inline';
  label?: string;
  children: ReactNode;
  containerClassName?: never;
};

export type CodeProps = CodeBlockProps | CodeInlineProps;

export const Code = forwardRef<HTMLPreElement | HTMLElement, CodeProps>(
  (props, ref) => {
    const labelId = useId();

    if (props.variant === 'inline') {
      const {
        variant: _variant,
        label,
        children,
        className,
        'aria-label': ariaLabel,
        ...inlineProps
      } = props;
      void _variant;

      return (
        <code
          {...inlineProps}
          ref={ref as ForwardedRef<HTMLElement>}
          className={cn('bits-component bits-code bits-code--inline', className)}
          aria-label={ariaLabel ?? label}
        >
          {children}
        </code>
      );
    }

    const {
      variant: _variant,
      label,
      children,
      containerClassName,
      className,
      'aria-label': ariaLabel,
      ...blockProps
    } = props;
    void _variant;

    return (
      <div className={cn('bits-component bits-code-block', containerClassName)}>
        <span id={labelId} className="bits-code-block__label">{label}</span>
        <pre
          {...blockProps}
          ref={ref as ForwardedRef<HTMLPreElement>}
          className={cn('bits-code bits-code--block', className)}
          role="region"
          aria-label={ariaLabel}
          aria-labelledby={ariaLabel ? undefined : labelId}
          tabIndex={0}
        >
          <code className="bits-code-block__content">{children}</code>
        </pre>
      </div>
    );
  },
);
Code.displayName = 'Code';
