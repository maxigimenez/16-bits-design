import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toggle } from './Toggle';

const meta = {
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  args: { label: 'isolate sandboxes', defaultChecked: true, disabled: false },
  argTypes: { onCheckedChange: { action: 'checked changed' } },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

function ControlledToggle() {
  const [checked, setChecked] = useState(true);
  return <Toggle checked={checked} onCheckedChange={setChecked} label={checked ? 'isolated worktree' : 'shared checkout'} />;
}

export const Controlled: Story = { render: () => <ControlledToggle /> };

export const States: Story = {
  render: () => (
    <div className="story-row">
      <Toggle label="shared sandbox" />
      <Toggle label="isolate sandboxes" defaultChecked />
      <Toggle label="disabled" disabled />
    </div>
  ),
};
