import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { Alert } from './Alert';
import { Avatar } from './Avatar';
import { Badge } from './Badge';
import { Button } from './Button';
import { Card, CardContent, CardTitle } from './Card';
import { Dialog } from './Dialog';
import { Input } from './Field';
import { Meter } from './Meter';
import { Select } from './Select';
import { ToastProvider, useToast } from './Toast';
import { Toggle } from './Toggle';
import { Heading, Text } from './Typography';
import { builtInThemes, ThemeProvider } from '../theme';
import { colors } from '../tokens';

describe('Button', () => {
  it('prevents interaction and announces progress while loading', () => {
    render(<Button loading loadingLabel="Saving">Save</Button>);
    expect(screen.getByRole('button', { name: 'Saving' })).toBeDisabled();
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
    expect(document.querySelector('.bits-button__loader')).toHaveAttribute('aria-hidden', 'true');
  });
});

describe('form controls', () => {
  it('links an input error to its field', () => {
    render(<Input label="Access key" error="key rejected" />);
    const input = screen.getByLabelText('Access key');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('key rejected');
  });

  it('supports an uncontrolled toggle', async () => {
    const user = userEvent.setup();
    render(<Toggle label="Isolate sandboxes" />);
    const toggle = screen.getByRole('switch');
    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-checked', 'true');
  });

  it('selects an option using the listbox', async () => {
    const user = userEvent.setup();
    render(<Select label="Route" options={[{ value: 'triage', label: 'triage' }, { value: 'patch', label: 'patch' }]} />);
    await user.click(screen.getByRole('button', { name: /select an option/i }));
    await user.click(screen.getByRole('option', { name: 'patch' }));
    expect(screen.getByRole('button', { name: /patch/i })).toBeInTheDocument();
  });
});

describe('display components', () => {
  it('announces danger alerts assertively and advisory alerts politely', () => {
    const { rerender } = render(<Alert tone="danger" title="Request failed">Try again.</Alert>);
    expect(screen.getByRole('alert')).toHaveTextContent('Request failedTry again.');

    rerender(<Alert tone="warning" title="Limit approaching">Review usage.</Alert>);
    expect(screen.getByRole('status')).toHaveTextContent('Limit approachingReview usage.');
  });

  it('renders an explicit alert recovery action', () => {
    render(<Alert tone="danger" title="Request failed" action={<button>Retry request</button>}>Try again.</Alert>);
    expect(screen.getByRole('button', { name: 'Retry request' })).toBeEnabled();
  });

  it('exposes only live Ember and Ocean theme tokens', () => {
    expect(builtInThemes).toEqual(['ember', 'ocean']);
    expect(colors.primary).toBe('var(--bits-primary)');
  });

  it('exposes semantic progress values', () => {
    render(<Meter value={8} max={12} label="tasks" />);
    expect(screen.getByRole('progressbar', { name: 'tasks' })).toHaveAttribute('aria-valuenow', '8');
  });

  it('derives accessible avatar initials', () => {
    render(<Avatar name="Hermes Alpha" color="#ff7a1a" />);
    expect(screen.getByText('HA')).toBeInTheDocument();
    expect(screen.getByText('Hermes Alpha')).toHaveClass('bits-sr-only');
  });

  it('renders a badge tone', () => {
    render(<Badge tone="success">done</Badge>);
    expect(screen.getByText('done')).toHaveClass('bits-badge--success');
  });

  it('composes a card with accent and content regions', () => {
    render(<Card accent tone="success"><CardTitle>Status</CardTitle><CardContent>Ready</CardContent></Card>);
    expect(screen.getByText('Status').parentElement).toHaveAttribute('data-accent', 'true');
    expect(screen.getByText('Ready')).toHaveClass('bits-card__content');
  });

  it('renders semantic typography', () => {
    render(<><Heading level={3}>Section</Heading><Text tone="muted">Supporting copy</Text></>);
    expect(screen.getByRole('heading', { level: 3 })).toHaveClass('bits-heading--3');
    expect(screen.getByText('Supporting copy')).toHaveClass('bits-text--muted');
  });

  it('applies custom theme colors as CSS variables', () => {
    render(<ThemeProvider style={{ '--bits-primary': '#57d7ff' }}>themed content</ThemeProvider>);
    expect(screen.getByText('themed content')).toHaveStyle({ '--bits-primary': '#57d7ff' });
  });
});

function ToastHarness() {
  const { toast } = useToast();
  return <button onClick={() => toast({ title: 'Route created', tone: 'success', duration: 0 })}>notify</button>;
}

describe('overlays', () => {
  it('publishes and dismisses provider toasts', async () => {
    const user = userEvent.setup();
    render(<ToastProvider><ToastHarness /></ToastProvider>);
    await user.click(screen.getByRole('button', { name: 'notify' }));
    expect(screen.getByRole('status')).toHaveTextContent('Route created');
    await user.click(screen.getByRole('button', { name: 'Dismiss notification' }));
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('closes a dialog with Escape', async () => {
    const user = userEvent.setup();
    function Harness() {
      const [open, setOpen] = useState(true);
      return <Dialog open={open} onOpenChange={setOpen} title="Restart daemon" description="Queued tickets are kept." />;
    }
    render(<Harness />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await user.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('carries a custom theme into portalled UI', async () => {
    const user = userEvent.setup();

    function Harness() {
      const { toast } = useToast();
      return (
        <>
          <Dialog open onOpenChange={() => undefined} title="Themed dialog" />
          <button onClick={() => toast({ title: 'Themed toast', duration: 0 })}>notify themed</button>
        </>
      );
    }

    render(<ThemeProvider style={{ '--bits-primary': '#57d7ff' }}><ToastProvider><Harness /></ToastProvider></ThemeProvider>);
    await user.click(screen.getByRole('button', { name: 'notify themed' }));

    const themeRoot = screen.getByRole('button', { name: 'notify themed' }).closest('[data-bits-theme]');
    expect(themeRoot).toHaveStyle({ '--bits-primary': '#57d7ff' });
    expect(themeRoot).toContainElement(screen.getByRole('dialog'));
    expect(themeRoot).toContainElement(screen.getByRole('status'));
  });
});
