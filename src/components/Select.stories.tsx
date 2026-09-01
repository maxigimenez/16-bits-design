import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './Select';

const routeOptions = [
  { value: 'triage', label: 'triage → patch' },
  { value: 'spec', label: 'spec → patch → test' },
  { value: 'plan', label: 'plan → apply' },
];

const meta = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  args: { label: 'Dropdown', options: routeOptions, defaultValue: 'triage', disabled: false },
  argTypes: { onValueChange: { action: 'value changed' } },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>] };

function ControlledSelect() {
  const [value, setValue] = useState('triage');
  return <div style={{ width: 320 }}><Select label="Workflow" options={routeOptions} value={value} onValueChange={setValue} /></div>;
}

export const Controlled: Story = { render: () => <ControlledSelect /> };

export const States: Story = {
  render: () => (
    <div className="story-grid">
      <Select label="Selected" options={routeOptions} defaultValue="triage" />
      <Select label="Placeholder" options={routeOptions} />
      <Select label="Disabled" options={routeOptions} defaultValue="spec" disabled />
    </div>
  ),
};
