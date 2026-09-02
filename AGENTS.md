# 16 Bits Design agent guide

This file applies to the entire repository. It is the operating contract for agents building or changing applications with 16 Bits Design, and for agents extending the library itself.

## Objective

Create polished, accessible React interfaces that look intentionally designed as part of 16 Bits Design. Preserve the system's pixel-sharp character while prioritizing clarity, hierarchy, responsiveness, and usable interaction states.

Do not treat the library as a loose collection of styles. Components, semantic tokens, typography, themes, and interaction behavior form one system and should be used together.

## Non-negotiable rules for application code

1. Install and consume the single package `@16-bits-design/ui`.
2. Import `@16-bits-design/ui/styles.css` exactly once at the application entry point.
3. Use exported components before creating local substitutes.
4. Use `--bits-*` semantic variables for color, typography, spacing, borders, shadows, and focus treatment.
5. Consumer applications must never deep-import `dist`, `src`, component implementation files, or private `.bits-*` selectors.
6. Never modify files in `node_modules` or generated files in `dist`.
7. Do not invent component variants, sizes, tones, or props that are not part of the public API.
8. Preserve keyboard behavior, focus visibility, semantic HTML, labels, and accessible names.
9. Use solid surfaces. Do not introduce gradients, glassmorphism, blur-heavy panels, rounded cards, pill-shaped controls, or soft generic SaaS styling.
10. A screen is not complete until its loading, empty, error, disabled, success, focus, narrow-screen, and long-content states have been considered.

## Package usage

Install one dependency:

```sh
pnpm add @16-bits-design/ui
```

Prefer focused subpath imports in application code:

```tsx
import '@16-bits-design/ui/styles.css';
import { Button } from '@16-bits-design/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@16-bits-design/ui/card';
import { ThemeProvider } from '@16-bits-design/ui/theme';
```

The root barrel is valid when a consolidated import is clearer:

```tsx
import { Button, Card, ThemeProvider } from '@16-bits-design/ui';
```

Do not mix legacy package names such as `@16-bits-design/button` or `@16-bits-design/theme`. They are not part of the public API.

For applications using dialogs or toasts, establish providers near the root:

```tsx
import '@16-bits-design/ui/styles.css';
import { ThemeProvider } from '@16-bits-design/ui/theme';
import { ToastProvider } from '@16-bits-design/ui/toast';

export function AppRoot() {
  return (
    <ThemeProvider theme="ember">
      <ToastProvider>
        <App />
      </ToastProvider>
    </ThemeProvider>
  );
}
```

Keep `ToastProvider` inside `ThemeProvider` so portalled UI inherits the selected theme.

## Visual language

The core visual characteristics are:

- Square geometry and zero-radius controls.
- Crisp 2px borders and deliberate offset shadows.
- Solid, layered surfaces: `surface` → `panel` → `raised`.
- Monospaced body copy and pixel-display headings.
- Compact but readable typography.
- Stepped, restrained motion and visible press feedback.
- High-contrast semantic color used for meaning and emphasis.

Use the primary color selectively. A primary action, current selection, key metric, or focus indicator should attract attention because surrounding UI is quieter. Do not make every border, heading, icon, and control primary-colored.

Avoid decorative noise. Repeated cards, badges, borders, and accent rails weaken hierarchy when everything receives equal emphasis.

## Layout and hierarchy

- Start each page with one clear `h1` and one primary task or summary.
- Use logical heading order. `CardTitle` renders an `h3`, so cards should normally live under an `h2` section.
- Group related controls and content by proximity before adding another border.
- Use `Card` for meaningful bounded regions, not every block of content.
- Keep body-copy lines roughly 55–75 characters when practical.
- Use responsive grids with a useful minimum column width; collapse to one column before content becomes cramped.
- Avoid fixed heights for content containers. Allow localization, validation messages, and user content to grow.
- At narrow widths, stack action groups, preserve readable padding, and prevent horizontal scrolling.
- Do not shrink interactive controls or text merely to preserve a desktop layout.

Application CSS should use semantic tokens:

```css
.app-shell {
  min-height: 100vh;
  padding: var(--bits-space-6);
  background: var(--bits-surface);
  color: var(--bits-text);
  font-family: var(--bits-font-body);
}

.app-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));
  gap: var(--bits-space-4);
}
```

Pixel values are acceptable for true layout constraints such as a page max-width or breakpoint. Repeated visual values should come from tokens.

## Themes and tokens

Built-in themes are:

- `ember`: warm orange, the default.
- `ocean`: blue/cyan.

Use the provider for application-level or scoped React themes:

```tsx
<ThemeProvider theme="ocean">
  <Application />
</ThemeProvider>
```

Plain HTML may use `data-bits-theme="ember"` or `data-bits-theme="ocean"` on a containing element.

Custom themes are CSS-first. Partial overrides inherit the remaining defaults. A complete portable color theme should define:

- Surfaces: `--bits-surface`, `--bits-panel`, `--bits-raised`, `--bits-muted`.
- Borders: `--bits-line`, `--bits-line-strong`.
- Foreground: `--bits-ink`, `--bits-text`, `--bits-text-soft`, `--bits-text-dim`, `--bits-text-muted`, `--bits-text-faint`.
- Brand: `--bits-primary`, `--bits-primary-soft`, `--bits-primary-shadow`.
- Status: `--bits-amber`, `--bits-success`, `--bits-danger`, `--bits-danger-soft`, `--bits-danger-shadow`.
- Effects: `--bits-shadow`, `--bits-backdrop`.

Typography, spacing, borders, and focus styles are also configurable through `--bits-font-*`, `--bits-font-size-*`, `--bits-space-1` through `--bits-space-6`, `--bits-border-width`, and `--bits-focus-ring`.

When defining a custom theme:

- Test primary text against every surface.
- Test `--bits-ink` against primary, amber, success, and danger fills.
- Keep muted text readable; do not use faint text for essential information.
- Verify focus rings remain visible against surface, panel, and raised backgrounds.
- Keep status colors semantically stable across themes.

Do not hardcode theme colors inside application components. Hardcoded colors are acceptable only for user-provided data such as an explicit avatar color, and should still have an accessible foreground.

## Component selection and API guardrails

### Button

Use `Button` for actions. Variants are `primary`, `secondary`, `danger`, and `ghost`; sizes are `sm`, `md`, and `lg`.

- Prefer one primary action per action group.
- Use `secondary` for an alternative, `ghost` for low-emphasis actions, and `danger` only for destructive actions.
- Use `loading` and a concise `loadingLabel`; do not build a second spinner over the button.
- Use `leadingIcon` and `trailingIcon` instead of manually changing internal spacing.
- Use `fullWidth` intentionally on narrow layouts, forms, or singular calls to action.
- Preserve the built-in pressed, hover, focus, disabled, and loading behavior.
- Do not use a Badge, styled `div`, or clickable text when the action is a button.

### Card

Use `Card` with `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, and `CardFooter`. Variants are `panel`, `raised`, and `outline`; tones are `primary`, `amber`, `success`, and `danger`.

- Use `raised` only when the region genuinely needs more depth.
- Use `outline` for quiet grouping on an existing surface.
- Use `accent` and `tone` to communicate meaning, not decoration.
- Put actions in `CardFooter` when they affect the whole card.
- Do not make an entire card clickable when a clear link or button is more accessible.

### Code

Use block `Code` for preformatted machine text and inline `Code` for short identifiers or fragments.

- Always provide `label` for block code; it names the keyboard-focusable scroll region.
- Preserve whitespace in logs, JSON, prompts, and configuration instead of manually inserting line breaks.
- Let long lines scroll inside the block; do not enable wrapping that changes machine text.
- Use the inline variant inside prose and compact cells, not for multiline content.
- Never add syntax color that hardcodes palette values or makes meaning depend on color alone.

### Typography

Use `Heading` with levels 1–6 and `Text` with sizes `body`, `small`, `caption`, or `label`. Text tones are `default`, `soft`, `dim`, `muted`, and `faint`.

- Choose heading levels by document structure, not desired visual size.
- Use `label` for compact metadata and control labels, not paragraphs.
- Use `dim` for readable subordinate interface text such as inactive navigation.
- Use `muted` for metadata and placeholders, and `faint` only for nonessential decorative text.
- Do not apply display typography to long body copy.

### Input and Textarea

Use exported `Input` and `Textarea` for text entry. They support `label`, `hint`, `error`, `status`, and `fieldClassName`, plus appropriate native attributes.

- Always provide a visible label unless the surrounding UI supplies an unambiguous accessible name.
- Use `error` for actionable validation feedback; it automatically establishes the error state.
- Use `hint` for stable help, not errors or transient status.
- Keep validation near the field and preserve user input after failure.
- Do not encode validation with color alone.

### Select

Use `Select` with `options`, `value`/`defaultValue`, and `onValueChange`.

- Supply a visible `label` for forms.
- Use disabled options only when showing an unavailable choice is useful.
- Do not replace it with a clickable `div`; the component already supplies keyboard listbox behavior.
- For native form submission, provide `name`.

### Segmented

Use `Segmented` for a small mutually exclusive set that applies immediately, such as a status filter or view switcher.

- Give the group a concise, context-specific `label`.
- Use `value` and `onValueChange` when application state owns the selection; use `defaultValue` otherwise.
- Keep option labels short and visible without truncation.
- Use disabled options only when showing the unavailable choice is useful.
- Do not use Segmented for form submission, multiple selections, or more choices than fit comfortably in a compact row.

### Toggle

Use `Toggle` for an immediately applied binary setting through `checked`/`defaultChecked` and `onCheckedChange`.

- Provide `label` unless an external accessible label exists.
- Do not use a toggle for mutually exclusive choices or an action that still requires form submission.

### Table

Use `Table` and its semantic section, row, header, and cell primitives for genuinely tabular data.

- Provide a context-specific `scrollLabel` for the keyboard-focusable overflow region.
- Use `align="end"` for numeric values and durations; it also enables tabular numerals.
- Use `TableCellContent` for a common primary-plus-secondary text cell.
- Keep row actions explicit and keyboard reachable; do not make the row itself impersonate a link.
- Do not replace native table semantics with a grid of `div` elements.

### Badge

Badge tones are `neutral`, `primary`, `amber`, `success`, `danger`, and `outline`.

- Use badges for concise status or category metadata.
- Keep labels short and pair unfamiliar status wording with explanatory copy.
- Badges are not buttons and should not receive click behavior.

### Avatar

Use `Avatar` with a required `name`; sizes are `sm`, `md`, and `lg`. Supply `src` and meaningful `alt` when an image conveys identity. Prefer semantic token values for `color` and `ink`.

### Alert

Use `Alert` for persistent inline feedback. Tones are `info`, `warning`, `success`, and `danger`.

- Use `danger` for failures that need immediate attention; it uses `role="alert"`.
- Use quieter tones for advisory state; they use `role="status"`.
- Provide a concrete recovery control through `action` when the user can resolve the condition.
- Do not use Alert for transient confirmation that is better handled by Toast.
- Do not use Toast as the only record of a blocking error.

### Meter

Use `Meter` for bounded progress with `value`, optional `max`, `segments`, `tone`, and an accessible `label`.

- Always provide `label` when visible text does not name the progress value.
- Do not use Meter for unbounded loading.
- Do not rely on color alone to communicate success or failure.

### Spinner

Use `Spinner` for indeterminate loading when completion cannot be expressed as a bounded value.

- Always provide a concise `label`; use `hideLabel` only when equivalent visible context is already present.
- Use `sm`, `md`, or `lg` to match the surrounding density, not to imply progress.
- Keep the loading region in place when practical so content does not jump when data arrives.
- Use Meter for bounded progress; never animate a Meter toward an unknown finish.
- Do not add a second live region around Spinner.

### Toast

Use `ToastProvider` and `useToast` for transient feedback. Tones are `success`, `danger`, `warning`, and `info`.

- Keep titles concise and messages actionable.
- Do not use a toast as the only record of a blocking error.
- Avoid success toasts for every ordinary action; reserve them for meaningful confirmation.
- Use `duration: 0` only when dismissal must be manual.

### Dialog

Use `Dialog` for focused confirmation or interruption. Tones are `primary` and `danger`.

- Use `danger` only for destructive or difficult-to-reverse actions.
- Make the title name the decision and the description explain the consequence.
- Use `meta` for the specific resource or identifier being affected.
- Keep confirmation labels explicit, such as “Delete workspace,” not “Yes.”
- Do not open dialogs for information that can remain inline.
- Do not add a second focus trap, backdrop, escape listener, or portal layer.

### EmptyState

Use `EmptyState` to explain an absence and offer the next useful action.

- Distinguish the reason for absence in the copy: no data yet, no filtered matches, or no configuration.
- Set `headingLevel` to preserve the surrounding document hierarchy.
- Keep the description concrete and within the component's readable measure.
- Provide one focused action when the user can resolve the absence.
- Use Alert for failures; an error is not an empty state.

## Content quality

- Prefer concrete labels: “Create project” over “Submit,” “Delete report” over “Confirm.”
- Use sentence case in source text; components apply visual casing where appropriate.
- Keep button labels short and verb-led.
- Explain errors in plain language and include a recovery path.
- Avoid placeholder metrics, meaningless charts, and decorative dashboard cards.
- Use realistic content lengths while developing so layouts are tested rather than staged.
- Never use random emoji as the primary icon language. Use one consistent icon set already present in the application, mark decorative icons `aria-hidden`, and give icon-only controls an accessible label.

## Accessibility requirements

- Use semantic landmarks: `header`, `nav`, `main`, `section`, `aside`, and `footer` where appropriate.
- Every interactive element must be keyboard reachable and visibly focused.
- Preserve the library's `:focus-visible` treatment; never remove outlines without an equivalent token-based replacement.
- Ensure icon-only buttons have `aria-label`.
- Connect form labels, descriptions, and errors programmatically.
- Announce asynchronous loading and errors where necessary; do not depend only on animation.
- Respect `prefers-reduced-motion`; do not add essential meaning through motion.
- Use links for navigation and buttons for actions.
- Verify contrast in both Ember and Ocean, plus every custom theme.
- Test overlays with keyboard-only navigation, Escape, focus return, and narrow viewports.

## Responsive and state-quality checklist

Before considering a screen complete, verify:

- 320px-wide layout without horizontal overflow.
- Typical mobile, tablet, and desktop widths.
- Keyboard focus order and visible focus indicators.
- Hover, active, disabled, loading, error, success, and empty states.
- Long titles, long identifiers, validation messages, and translated-length text.
- Slow or failed data loading without layout collapse.
- Dialogs and toast viewports at narrow widths.
- Both Ember and Ocean themes.
- Reduced-motion behavior.

## Extending the library

When working in this repository, use Node 24.13.1 and pnpm 10.29.2. Start with:

```sh
nvm use
pnpm install
```

The consumer import restrictions above do not prohibit normal relative imports between library source files or Storybook stories. Public-facing examples and application code must still use the published package entry points.

Before adding a component, confirm that composition of existing primitives cannot solve the use case cleanly. New library components must be generic enough for multiple application contexts.

For every new public component or public API change:

1. Implement the component under `src/components` using namespaced `.bits-*` classes.
2. Add a focused entry under `src/entries`.
3. Add the explicit subpath to `package.json#exports` and `tsup.config.ts`.
4. Re-export it from `src/index.ts` if it belongs in the root barrel.
5. Style it in `src/styles.css` using semantic variables.
6. Add Storybook stories for every variant, size, state, and important composition.
7. Add interaction and accessibility tests.
8. Update README and theming documentation when the public contract changes.
9. Update `scripts/verify-package.mjs` when export verification needs new assertions.
10. Run the complete verification command.

```sh
pnpm check
```

`dist` and `storybook-static` are generated output. Never edit them manually. Keep React and ReactDOM as peer dependencies, avoid runtime styling dependencies, and do not introduce Tailwind or CSS-in-JS into the library.

## Git workflow

- Use Conventional Commits, for example `feat(card): add an interactive variant`, `fix(button): contain the loading indicator`, or `docs(theme): document custom tokens`.
- Keep commits cohesive and describe the user-visible or package-level outcome.
- Do not rewrite shared history, force-push, or discard unrelated work.
- After completing and verifying an in-scope change, commit and push the current branch unless the user explicitly asks not to.
- Never commit generated `dist`, `storybook-static`, coverage, package tarballs, logs, secrets, or local environment files.

## Definition of done

An application or component is done only when it:

- Uses the documented package entry points and existing primitives.
- Looks coherent in Ember and Ocean.
- Uses semantic variables instead of copied colors or component internals.
- Has a clear visual hierarchy and restrained emphasis.
- Works with keyboard, screen-reader semantics, reduced motion, and narrow screens.
- Includes honest loading, empty, error, success, and disabled states.
- Passes the repository's lint, type, test, package, and Storybook checks.

When visual polish conflicts with clarity or accessibility, clarity and accessibility win. Preserve the distinctive design through tokens, typography, geometry, and composition—not through decorative excess.
