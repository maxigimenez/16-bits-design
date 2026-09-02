# 16 Bits Design

A reusable, themeable React component library with a dark, pixel-sharp visual language. It combines square geometry, stepped motion, 2px borders, offset shadows, a high-contrast signal palette, JetBrains Mono body type, and Silkscreen display type.

## Install

Install one package:

```sh
pnpm add @16-bits-design/ui
```

Import the stylesheet once at your application entry point, then import components from the root barrel or focused subpaths:

```tsx
import '@16-bits-design/ui/styles.css';
import { ThemeProvider } from '@16-bits-design/ui/theme';
import { Button } from '@16-bits-design/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@16-bits-design/ui/card';

export function App() {
  return (
    <ThemeProvider theme="ocean">
      <Card accent>
        <CardHeader><CardTitle>Ready</CardTitle></CardHeader>
        <CardContent><Button>Create route</Button></CardContent>
      </Card>
    </ThemeProvider>
  );
}
```

The root barrel is available when a consolidated import is preferable:

```tsx
import { Button, Card, ThemeProvider } from '@16-bits-design/ui';
```

All JavaScript entry points ship ESM, CommonJS, and TypeScript declarations. Explicit component subpaths keep the public API stable and allow consumers to include only the component modules they use.

## Public entry points

- `@16-bits-design/ui`
- `@16-bits-design/ui/alert`
- `@16-bits-design/ui/avatar`
- `@16-bits-design/ui/badge`
- `@16-bits-design/ui/button`
- `@16-bits-design/ui/card`
- `@16-bits-design/ui/code`
- `@16-bits-design/ui/dialog`
- `@16-bits-design/ui/empty-state`
- `@16-bits-design/ui/input`
- `@16-bits-design/ui/meter`
- `@16-bits-design/ui/select`
- `@16-bits-design/ui/spinner`
- `@16-bits-design/ui/segmented`
- `@16-bits-design/ui/table`
- `@16-bits-design/ui/textarea`
- `@16-bits-design/ui/theme`
- `@16-bits-design/ui/toast`
- `@16-bits-design/ui/toggle`
- `@16-bits-design/ui/typography`
- `@16-bits-design/ui/styles.css`

### Code

Use block `Code` for logs, JSON, prompts, and other preformatted machine text. The required label names its keyboard-focusable horizontal scroll region so long lines remain inside the component. Use the inline variant for identifiers and short fragments.

```tsx
import { Code } from '@16-bits-design/ui/code';

<Code label="Route definition">{JSON.stringify(route, null, 2)}</Code>

<p>Deployment <Code variant="inline">dpl_8f32c1</Code> is ready.</p>
```

### EmptyState

Use `EmptyState` to explain an absence and offer the next useful action. Descriptions stay within a readable measure, the default pixel motif follows the active theme, and `headingLevel` preserves the surrounding document hierarchy.

```tsx
import { EmptyState } from '@16-bits-design/ui/empty-state';
import { Button } from '@16-bits-design/ui/button';

<EmptyState
  title="No deployments yet"
  headingLevel={3}
  action={<Button size="sm">Create deployment</Button>}
>
  Create a deployment to connect a repository and start tracking releases.
</EmptyState>
```

### Spinner

Use `Spinner` for indeterminate waits. Its required label is announced through a polite live region, can remain visible or be visually hidden, and the stepped animation becomes a static bar when reduced motion is requested.

```tsx
import { Spinner } from '@16-bits-design/ui/spinner';

<Spinner label="Loading deployments" />
```

### Segmented

Use `Segmented` for a small set of mutually exclusive filters or views that apply immediately. Each option is an individually Tab-reachable button with `aria-pressed`; the component supports controlled and uncontrolled state.

```tsx
import { Segmented } from '@16-bits-design/ui/segmented';

<Segmented
  label="Filter deployments by status"
  value={filter}
  onValueChange={setFilter}
  options={[
    { value: 'all', label: 'All' },
    { value: 'running', label: 'Running' },
    { value: 'failed', label: 'Failed' },
  ]}
/>
```

### Alert

Use `Alert` for persistent inline feedback that must remain available in the page. Danger alerts use `role="alert"`; info, warning, and success alerts use the quieter `role="status"`. Actions remain explicit composable controls.

```tsx
import { Alert } from '@16-bits-design/ui/alert';
import { Button } from '@16-bits-design/ui/button';

<Alert
  tone="danger"
  title="Could not load deployments"
  action={<Button size="sm">Retry</Button>}
>
  The service returned an unexpected response.
</Alert>
```

### Table

Use the composable table primitives for genuinely tabular data. `Table` keeps wide content inside a keyboard-focusable horizontal scroll region; give that region a context-specific `scrollLabel`. End-aligned cells use tabular numerals automatically.

```tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@16-bits-design/ui/table';

<Table scrollLabel="Deployment history">
  <TableHead>
    <TableRow>
      <TableHeader>Deployment</TableHeader>
      <TableHeader align="end">Duration</TableHeader>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow>
      <TableCell>Gateway API</TableCell>
      <TableCell align="end">02:18</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

## Theming

The stylesheet bundles Latin JetBrains Mono and Silkscreen font files. CSS custom properties are the theming API; JavaScript configuration is not required. Override variables globally or on any scoped container:

```css
:root {
  --bits-primary: #57d7ff;
  --bits-primary-soft: #a8ecff;
  --bits-primary-shadow: #15576b;
  --bits-surface: #081015;
  --bits-panel: #0c1820;
}
```

Built-in themes are `ember` (the warm, orange original) and `ocean` (blue/cyan). Apply one with `data-bits-theme="ocean"` on ordinary HTML, or use `ThemeProvider` when scoped themes and portalled components are needed.

The public variables cover surfaces, borders, text, semantic colors, shadows and backdrops, typography, font sizes, spacing, border width, and focus rings. Every public variable is prefixed with `--bits-`.

The styling is fully custom CSS built on namespaced classes and CSS custom properties. It has no Tailwind dependency, CSS-in-JS runtime, or consumer build-plugin requirement.

## Development

```sh
nvm use
pnpm install
pnpm storybook
pnpm check
```

The workspace is pinned to Node 24.13.1 through `.nvmrc` and `engines`. `pnpm check` runs ESLint, TypeScript, unit tests, the distributable package build, and the static Storybook build.
