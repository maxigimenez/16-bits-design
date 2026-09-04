import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert } from './Alert';
import { Button } from './Button';
import type { ThemeCSSProperties } from '../theme';

const authoredDangerZoneTheme: ThemeCSSProperties = {
  '--bits-alert-surface': '#170d0b',
  '--bits-alert-border': '#4a231c',
};

const meta = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  args: {
    tone: 'info',
    variant: 'default',
    title: 'Maintenance window scheduled',
    children: 'Requests may be delayed for up to two minutes while the edge nodes restart.',
  },
  argTypes: {
    tone: { control: 'inline-radio', options: ['info', 'warning', 'success', 'danger'] },
    variant: { control: 'inline-radio', options: ['default', 'subtle'] },
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

export const SubtleTones: Story = {
  args: { variant: 'subtle' },
  render: () => (
    <div className="story-stack" style={{ maxWidth: 640 }}>
      <Alert variant="subtle" tone="info" title="New runtime available">
        Version 4.8 can be enabled from workspace settings.
      </Alert>
      <Alert variant="subtle" tone="warning" title="Usage is nearing its limit">
        86% of this month&apos;s execution allowance has been used.
      </Alert>
      <Alert variant="subtle" tone="success" title="Access key is ready">
        The key remains available until you leave this page.
      </Alert>
      <Alert variant="subtle" tone="danger" title="Danger zone">
        Destructive organization controls are grouped below.
      </Alert>
    </div>
  ),
};

export const EmphasisComparison: Story = {
  render: () => (
    <div className="story-stack" style={{ maxWidth: 720 }}>
      <Alert tone="danger" title="Could not delete organization">
        No changes were made. Check your connection and try again.
      </Alert>
      <Alert
        variant="subtle"
        tone="danger"
        title="Delete this organization"
        action={<Button size="sm" variant="danger">Delete organization</Button>}
      >
        Permanently removes the organization and all of its projects.
      </Alert>
    </div>
  ),
};

export const ThemeOverride: Story = {
  args: { variant: 'subtle', tone: 'danger' },
  render: () => (
    <div style={{ ...authoredDangerZoneTheme, maxWidth: 720 }}>
      <Alert
        variant="subtle"
        tone="danger"
        title="Delete this organization"
        action={<Button size="sm" variant="danger">Delete organization</Button>}
      >
        Permanently removes the organization and all of its projects.
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
      <Alert variant="subtle" tone="danger" title="Delete this organization" action={<Button size="sm" variant="danger">Delete organization</Button>}>
        Permanently removes the organization and all of its projects.
      </Alert>
    </div>
  ),
};
