import { forwardRef, useId } from 'react';
import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from 'react';
import { cn } from '../lib/cn';

export type FieldStatus = 'default' | 'error' | 'success';

interface FieldFrameProps {
  id: string;
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  children: ReactNode;
  className?: string;
}

function FieldFrame({ id, label, hint, error, children, className }: FieldFrameProps) {
  return (
    <div className={cn('bits-component bits-field', className)}>
      {label && <label className="bits-field__label" htmlFor={id}>{label}</label>}
      {children}
      {error ? (
        <div id={`${id}-message`} className="bits-field__message" role="alert">
          <span aria-hidden="true" className="bits-field__message-icon">!</span>
          <span>{error}</span>
        </div>
      ) : hint ? (
        <div id={`${id}-hint`} className="bits-field__hint">{hint}</div>
      ) : null}
    </div>
  );
}

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  status?: FieldStatus;
  fieldClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id: providedId, label, hint, error, status = 'default', fieldClassName, className, ...props }, ref) => {
    const generatedId = useId();
    const id = providedId ?? generatedId;
    const resolvedStatus = error ? 'error' : status;
    const describedBy = [props['aria-describedby'], error ? `${id}-message` : hint ? `${id}-hint` : undefined]
      .filter(Boolean)
      .join(' ') || undefined;

    return (
      <FieldFrame id={id} label={label} hint={hint} error={error} className={fieldClassName}>
        <input
          {...props}
          ref={ref}
          id={id}
          className={cn('bits-component bits-input', className)}
          data-status={resolvedStatus}
          aria-invalid={resolvedStatus === 'error' || undefined}
          aria-describedby={describedBy}
        />
      </FieldFrame>
    );
  },
);

Input.displayName = 'Input';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  status?: FieldStatus;
  fieldClassName?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ id: providedId, label, hint, error, status = 'default', fieldClassName, className, ...props }, ref) => {
    const generatedId = useId();
    const id = providedId ?? generatedId;
    const resolvedStatus = error ? 'error' : status;
    const describedBy = [props['aria-describedby'], error ? `${id}-message` : hint ? `${id}-hint` : undefined]
      .filter(Boolean)
      .join(' ') || undefined;

    return (
      <FieldFrame id={id} label={label} hint={hint} error={error} className={fieldClassName}>
        <textarea
          {...props}
          ref={ref}
          id={id}
          className={cn('bits-component bits-textarea', className)}
          data-status={resolvedStatus}
          aria-invalid={resolvedStatus === 'error' || undefined}
          aria-describedby={describedBy}
        />
      </FieldFrame>
    );
  },
);

Textarea.displayName = 'Textarea';
