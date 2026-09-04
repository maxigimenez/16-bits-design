import { useEffect, useId, useRef } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useTheme } from '@16-bits-design/ui/theme';
import { Button } from './Button';
import { cn } from '../lib/cn';

export type DialogTone = 'primary' | 'danger';
export type DialogSize = 'sm' | 'md';

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: ReactNode;
  description?: ReactNode;
  meta?: ReactNode;
  children?: ReactNode;
  icon?: ReactNode;
  tone?: DialogTone;
  size?: DialogSize;
  confirmLabel?: ReactNode;
  confirmDisabled?: boolean;
  confirmLoading?: boolean;
  confirmLoadingLabel?: string;
  cancelLabel?: ReactNode;
  onConfirm?: () => void;
  closeOnConfirm?: boolean;
  closeOnBackdrop?: boolean;
  className?: string;
  portalContainer?: Element | DocumentFragment | null;
}

export function Dialog({
  open,
  onOpenChange,
  title,
  description,
  meta,
  children,
  icon,
  tone = 'primary',
  size = 'sm',
  confirmLabel = 'Confirm',
  confirmDisabled = false,
  confirmLoading = false,
  confirmLoadingLabel,
  cancelLabel = 'Cancel',
  onConfirm,
  closeOnConfirm = true,
  closeOnBackdrop = true,
  className,
  portalContainer,
}: DialogProps) {
  const themeContext = useTheme();
  const titleId = useId();
  const descriptionId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    previousFocus.current = document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panelRef.current?.querySelector<HTMLButtonElement>('button')?.focus();

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape' && !event.defaultPrevented) onOpenChange(false);
      if (event.key !== 'Tab' || !panelRef.current) return;
      const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>([
        'a[href]:not([hidden])',
        'button:not(:disabled):not([hidden])',
        'input:not(:disabled):not([type="hidden"]):not([hidden])',
        'select:not(:disabled):not([hidden])',
        'textarea:not(:disabled):not([hidden])',
        '[contenteditable="true"]:not([hidden])',
        '[tabindex]:not([tabindex="-1"]):not(:disabled):not([hidden])',
      ].join(', ')));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', onKeyDown);
      previousFocus.current?.focus();
    };
  }, [onOpenChange, open]);

  if (!open || typeof document === 'undefined') return null;

  return createPortal(
    <div
      className="bits-theme bits-reset"
      data-bits-portal="dialog"
      data-bits-theme={themeContext.theme}
    >
      <div className={cn('bits-component bits-dialog', `bits-dialog--${tone}`)}>
      <button
        type="button"
        className="bits-dialog__backdrop"
        aria-label="Close dialog"
        tabIndex={-1}
        onClick={() => closeOnBackdrop && onOpenChange(false)}
      />
      <div
        ref={panelRef}
        className={cn('bits-dialog__panel', `bits-dialog__panel--${size}`, className)}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
      >
        <div className="bits-dialog__tone" />
        <div className="bits-dialog__body">
          <div className="bits-dialog__header">
            <span aria-hidden="true" className="bits-dialog__icon">{icon ?? (tone === 'danger' ? '!' : '?')}</span>
            <h2 id={titleId} className="bits-dialog__title">{title}</h2>
            <button type="button" className="bits-dialog__close" aria-label="Close dialog" onClick={() => onOpenChange(false)}>✕</button>
          </div>
          {description && <p id={descriptionId} className="bits-dialog__description">{description}</p>}
          {meta && <div className="bits-dialog__meta">{meta}</div>}
          {children != null && <div className="bits-dialog__content">{children}</div>}
        </div>
        <div className="bits-dialog__footer">
          <Button variant="secondary" onClick={() => onOpenChange(false)}>{cancelLabel}</Button>
          <Button
            variant={tone === 'danger' ? 'danger' : 'primary'}
            disabled={confirmDisabled}
            loading={confirmLoading}
            loadingLabel={confirmLoadingLabel}
            onClick={() => {
              onConfirm?.();
              if (closeOnConfirm) onOpenChange(false);
            }}
          >
            {confirmLabel}
          </Button>
        </div>
        </div>
      </div>
    </div>,
    portalContainer ?? themeContext.portalContainer ?? document.body,
  );
}
