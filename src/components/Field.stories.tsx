import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input, Textarea } from './Field';

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  args: { label: 'Text input', placeholder: 'type here', status: 'default', disabled: false },
  argTypes: { status: { control: 'inline-radio', options: ['default', 'error', 'success'] } },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const States: Story = {
  render: () => (
    <div className="story-grid">
      <Input label="Default" placeholder="type here" />
      <Input label="With hint" defaultValue="localhost:7333" hint="The local daemon endpoint." />
      <Input label="Error state" defaultValue="pxl_bad_key" error="key rejected" />
      <Input label="Success state" defaultValue="pxl_live_9f2a" status="success" />
      <Input label="Disabled" defaultValue="unavailable" disabled />
    </div>
  ),
};

export const TextareaStates: Story = {
  render: () => (
    <div className="story-grid">
      <Textarea label="Textarea" placeholder="multi-line notes" rows={3} />
      <Textarea label="Error" defaultValue="Not enough detail." error="Add a little more context." rows={3} />
      <Textarea label="Disabled" defaultValue="Read only content" disabled rows={3} />
    </div>
  ),
};
