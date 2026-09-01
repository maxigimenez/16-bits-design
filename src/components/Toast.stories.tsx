import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';
import { Toast, ToastProvider, useToast } from './Toast';

const meta = {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
  args: { title: 'Syncing tickets', message: '18 tickets pulled from your tracker.', tone: 'info' },
  argTypes: { tone: { control: 'inline-radio', options: ['success', 'danger', 'warning', 'info'] }, onClose: { action: 'closed' } },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Tones: Story = {
  render: () => (
    <div className="story-stack">
      <Toast tone="success" title="Route created" message="triage → patch is live on the local daemon." onClose={() => undefined} />
      <Toast tone="danger" title="Run failed" message="hermes-delta exited 137 — sandbox out of memory." onClose={() => undefined} />
      <Toast tone="warning" title="Sandbox slots full" message="TCK-486 is queued until a worker frees up." onClose={() => undefined} />
      <Toast tone="info" title="Syncing tickets" message="18 tickets pulled from your tracker." onClose={() => undefined} />
    </div>
  ),
};

function ToastDemo() {
  const { toast, dismissAll } = useToast();
  return (
    <div className="story-row">
      <Button variant="secondary" onClick={() => toast({ tone: 'success', title: 'Route created', message: 'The workflow is now live.' })}>Fire success</Button>
      <Button variant="secondary" onClick={() => toast({ tone: 'danger', title: 'Run failed', message: 'The agent exited with code 137.' })}>Fire error</Button>
      <Button variant="ghost" onClick={dismissAll}>Dismiss all</Button>
    </div>
  );
}

export const Provider: Story = {
  render: () => <ToastProvider><ToastDemo /></ToastProvider>,
};
