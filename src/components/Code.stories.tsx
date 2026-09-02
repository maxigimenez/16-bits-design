import type { Meta, StoryObj } from '@storybook/react-vite';
import { Code } from './Code';

const routeDefinition = `{
  "path": "/deployments/:deploymentId",
  "method": "GET",
  "timeoutMs": 12000,
  "permissions": ["deployments:read"]
}`;

const meta = {
  title: 'Components/Code',
  component: Code,
  tags: ['autodocs'],
  args: {
    label: 'Route definition',
    children: routeDefinition,
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['block', 'inline'] },
    containerClassName: { control: false },
  },
} satisfies Meta<typeof Code>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Code label={args.label ?? 'Route definition'}>{args.children}</Code>
  ),
};

export const Blocks: Story = {
  render: () => (
    <div className="story-stack" style={{ maxWidth: 680 }}>
      <Code label="Route definition">{routeDefinition}</Code>
      <Code label="Request failure">{`HTTP 502 BAD_GATEWAY\nUpstream service did not respond within 12000ms.`}</Code>
    </div>
  ),
};

export const Inline: Story = {
  render: () => (
    <p className="story-body">
      Deployment <Code variant="inline">dpl_8f32c1</Code> is using key prefix{' '}
      <Code variant="inline" label="Access key prefix">bits_live_4e91</Code>.
    </p>
  ),
};

export const LongUnbrokenLine: Story = {
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <Code label="Request identifier">
        req_01JQ3R7KQ9Y2E8W6T4M1N5B0C7X9Z3A8F6D2S4G1H7J5K0L9P8O6I4U2Y1T3R5E7W9Q0
      </Code>
    </div>
  ),
};
