export const colors = {
  surface: 'var(--bits-surface)',
  panel: 'var(--bits-panel)',
  raised: 'var(--bits-raised)',
  muted: 'var(--bits-muted)',
  line: 'var(--bits-line)',
  lineStrong: 'var(--bits-line-strong)',
  ink: 'var(--bits-ink)',
  primary: 'var(--bits-primary)',
  primarySoft: 'var(--bits-primary-soft)',
  primaryShadow: 'var(--bits-primary-shadow)',
  amber: 'var(--bits-amber)',
  success: 'var(--bits-success)',
  danger: 'var(--bits-danger)',
  dangerSoft: 'var(--bits-danger-soft)',
  text: 'var(--bits-text)',
  textSoft: 'var(--bits-text-soft)',
  textDim: 'var(--bits-text-dim)',
  textMuted: 'var(--bits-text-muted)',
  textFaint: 'var(--bits-text-faint)',
} as const;

export const typography = {
  body: 'var(--bits-font-body)',
  display: 'var(--bits-font-display)',
} as const;

export const spacing = {
  1: 'var(--bits-space-1)',
  2: 'var(--bits-space-2)',
  3: 'var(--bits-space-3)',
  4: 'var(--bits-space-4)',
  5: 'var(--bits-space-5)',
  6: 'var(--bits-space-6)',
} as const;

export const tokens = { colors, typography, spacing } as const;

export type ColorToken = keyof typeof colors;
