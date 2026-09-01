import { createContext, useContext, useMemo, useState } from 'react';
import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { cn } from './lib/cn';

export const builtInThemes = ['ember', 'ocean'] as const;

export type BuiltInTheme = (typeof builtInThemes)[number];
export type ThemeName = BuiltInTheme | (string & Record<never, never>);
export type ThemeCSSProperties = CSSProperties & Partial<Record<`--bits-${string}`, string | number>>;

export interface ThemeContextValue {
  theme: ThemeName;
  portalContainer: HTMLDivElement | null;
}

const ThemeContext = createContext<ThemeContextValue>({ theme: 'ember', portalContainer: null });

export interface ThemeProviderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'style'> {
  theme?: ThemeName;
  children: ReactNode;
  style?: ThemeCSSProperties;
}

export function ThemeProvider({ theme = 'ember', children, className, style, ...props }: ThemeProviderProps) {
  const [portalContainer, setPortalContainer] = useState<HTMLDivElement | null>(null);
  const contextValue = useMemo(() => ({ theme, portalContainer }), [portalContainer, theme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <div
        {...props}
        className={cn('bits-theme bits-reset', className)}
        data-bits-theme={theme}
        style={style}
      >
        {children}
        <div ref={setPortalContainer} data-bits-portal-root="" />
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}
