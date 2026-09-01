import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: { children: 'running', tone: 'primary' },
  argTypes: { tone: { control: 'select', options: ['neutral', 'primary', 'amber', 'success', 'danger', 'outline'] } },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Tones: Story = {
  render: () => (
    <div className="story-row">
      <Badge tone="primary">running</Badge>
      <Badge tone="amber">queued</Badge>
      <Badge tone="success">done</Badge>
      <Badge tone="danger">failed</Badge>
      <Badge tone="neutral">paused</Badge>
      <Badge tone="outline">draft</Badge>
    </div>
  ),
};
