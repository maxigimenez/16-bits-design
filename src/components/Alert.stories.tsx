import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert } from './Alert';
import { Button } from './Button';

const meta = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  args: {
    tone: 'info',
    title: 'Maintenance window scheduled',
    children: 'Requests may be delayed for up to two minutes while the edge nodes restart.',
  },
  argTypes: {
    tone: { control: 'inline-radio', options: ['info', 'warning', 'success', 'danger'] },
    action: { control: false },
    icon: { control: false },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Tones: Story = {
  render: () => (
    <div className="story-stack" style={{ maxWidth: 640 }}>
      <Alert tone="info" title="New runtime available">
        Version 4.8 can be enabled from workspace settings.
      </Alert>
      <Alert tone="warning" title="Usage is nearing its limit">
        86% of this month&apos;s execution allowance has been used.
      </Alert>
      <Alert tone="success" title="Access key created">
        Copy the key now. It will not be shown again.
      </Alert>
      <Alert tone="danger" title="Could not load deployments" action={<Button size="sm" variant="danger">Retry</Button>}>
        The service returned an unexpected response. Your filters are unchanged.
      </Alert>
    </div>
  ),
};

export const WithRecoveryAction: Story = {
  render: () => (
    <Alert
      tone="danger"
      title="Could not load deployments"
      action={<Button size="sm" variant="danger">Retry request</Button>}
      style={{ maxWidth: 640 }}
    >
      The service returned an unexpected response. Check the connection and try again.
    </Alert>
  ),
};

export const NarrowViewport: Story = {
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <Alert tone="warning" title="Usage is nearing its monthly limit" action={<Button size="sm" variant="secondary">View usage</Button>}>
        Some new executions may be held if the remaining allowance is consumed.
      </Alert>
    </div>
  ),
};
