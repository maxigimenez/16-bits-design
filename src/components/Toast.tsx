import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useTheme } from '@16-bits-design/ui/theme';
import { cn } from '../lib/cn';

export type ToastTone = 'success' | 'danger' | 'warning' | 'info';

const toastIcons: Record<ToastTone, string> = {
  success: '✓',
  danger: '✕',
  warning: '!',
  info: '›',
};

export interface ToastProps {
  title: ReactNode;
  message?: ReactNode;
  tone?: ToastTone;
  icon?: ReactNode;
  onClose?: () => void;
  closeLabel?: string;
  className?: string;
  style?: CSSProperties;
}

export function Toast({ title, message, tone = 'info', icon, onClose, closeLabel = 'Dismiss notification', className, style }: ToastProps) {
  return (
    <div className={cn('bits-component bits-toast', `bits-toast--${tone}`, className)} style={style} role={tone === 'danger' ? 'alert' : 'status'}>
      <span aria-hidden="true" className="bits-toast__rail" />
      <span aria-hidden="true" className="bits-toast__icon">{icon ?? toastIcons[tone]}</span>
      <span className="bits-toast__content">
        <span className="bits-toast__title">{title}</span>
        {message && <span className="bits-toast__message">{message}</span>}
      </span>
      {onClose && (
        <button type="button" className="bits-toast__close" aria-label={closeLabel} onClick={onClose}>✕</button>
      )}
    </div>
  );
}

export interface ToastInput {
  title: ReactNode;
  message?: ReactNode;
  tone?: ToastTone;
  duration?: number;
}

interface ToastRecord extends ToastInput {
  id: number;
}

export interface ToastContextValue {
  toast: (input: ToastInput) => number;
  dismiss: (id: number) => void;
  dismissAll: () => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export interface ToastProviderProps {
  children: ReactNode;
  defaultDuration?: number;
  maxVisible?: number;
  portalContainer?: Element | DocumentFragment | null;
}

export function ToastProvider({ children, defaultDuration = 4200, maxVisible = 3, portalContainer }: ToastProviderProps) {
  const themeContext = useTheme();
  const [items, setItems] = useState<ToastRecord[]>([]);
  const timers = useRef(new Map<number, ReturnType<typeof setTimeout>>());
  const nextId = useRef(0);

  const dismiss = useCallback((id: number) => {
    const timer = timers.current.get(id);
    if (timer) clearTimeout(timer);
    timers.current.delete(id);
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);

  const dismissAll = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current.clear();
    setItems([]);
  }, []);

  const toast = useCallback((input: ToastInput) => {
    const id = ++nextId.current;
    setItems((current) => [...current, { ...input, id }].slice(-Math.max(1, maxVisible)));
    const duration = input.duration ?? defaultDuration;
    if (duration > 0) timers.current.set(id, setTimeout(() => dismiss(id), duration));
    return id;
  }, [defaultDuration, dismiss, maxVisible]);

  useEffect(() => () => {
    timers.current.forEach(clearTimeout);
    timers.current.clear();
  }, []);

  const contextValue = useMemo(() => ({ toast, dismiss, dismissAll }), [toast, dismiss, dismissAll]);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {typeof document !== 'undefined' && createPortal(
        <div className="bits-theme bits-reset" data-bits-portal="toast" data-bits-theme={themeContext.theme}>
          <div className="bits-toast-viewport" aria-label="Notifications">
            {items.map((item) => (
              <Toast key={item.id} {...item} onClose={() => dismiss(item.id)} />
            ))}
          </div>
        </div>,
        portalContainer ?? themeContext.portalContainer ?? document.body,
      )}
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context;
}
