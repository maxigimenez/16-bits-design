import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from './Field';

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  args: { label: 'Textarea', placeholder: 'multi-line notes', rows: 3, status: 'default', disabled: false },
  argTypes: { status: { control: 'inline-radio', options: ['default', 'error', 'success'] } },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const States: Story = {
  render: () => (
    <div className="story-grid">
      <Textarea label="Textarea" placeholder="multi-line notes" rows={3} />
      <Textarea label="With hint" defaultValue="Local-first orchestration." hint="Up to 240 characters." rows={3} />
      <Textarea label="Error" defaultValue="Not enough detail." error="Add a little more context." rows={3} />
      <Textarea label="Success" defaultValue="Ready to save." status="success" rows={3} />
      <Textarea label="Disabled" defaultValue="Read only content" disabled rows={3} />
    </div>
  ),
};
