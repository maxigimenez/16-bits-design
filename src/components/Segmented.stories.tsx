import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Segmented } from './Segmented';

const filterOptions = [
  { value: 'all', label: 'All' },
  { value: 'running', label: 'Running' },
  { value: 'failed', label: 'Failed' },
  { value: 'complete', label: 'Complete' },
] as const;

const meta = {
  title: 'Components/Segmented',
  component: Segmented,
  tags: ['autodocs'],
  args: {
    label: 'Filter deployments by status',
    options: filterOptions,
    defaultValue: 'all',
  },
  argTypes: {
    options: { control: false },
    value: { control: false },
    onValueChange: { control: false },
  },
} satisfies Meta<typeof Segmented>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

function ControlledExample() {
  const [filter, setFilter] = useState('running');

  return (
    <div className="story-stack">
      <Segmented
        label="Filter deployments by status"
        options={filterOptions}
        value={filter}
        onValueChange={setFilter}
      />
      <div className="story-caption" aria-live="polite">Current filter: {filter}</div>
    </div>
  );
}

export const Controlled: Story = {
  render: () => <ControlledExample />,
};

export const FullWidth: Story = {
  render: () => (
    <Segmented
      label="View time range"
      options={[
        { value: 'day', label: '24 hours' },
        { value: 'week', label: '7 days' },
        { value: 'month', label: '30 days' },
      ]}
      defaultValue="week"
      fullWidth
      style={{ maxWidth: 620 }}
    />
  ),
};

export const DisabledOptions: Story = {
  render: () => (
    <div className="story-stack">
      <Segmented
        label="Filter deployments"
        options={[
          ...filterOptions.slice(0, 2),
          { value: 'failed', label: 'Failed', disabled: true },
          filterOptions[3],
        ]}
        defaultValue="all"
      />
      <Segmented label="Unavailable filter" options={filterOptions} defaultValue="all" disabled />
    </div>
  ),
};

export const NarrowViewport: Story = {
  render: () => (
    <div style={{ maxWidth: 280 }}>
      <Segmented label="Filter deployments by status" options={filterOptions} defaultValue="running" />
    </div>
  ),
};
