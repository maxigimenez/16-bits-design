import type { Meta, StoryObj } from '@storybook/react-vite';
import { Meter } from './Meter';

const meta = {
  title: 'Components/Meter',
  component: Meter,
  tags: ['autodocs'],
  args: { value: 8, max: 12, segments: 12, tone: 'primary', label: '8 of 12 tasks complete' },
  argTypes: { tone: { control: 'inline-radio', options: ['primary', 'amber', 'success', 'danger'] } },
} satisfies Meta<typeof Meter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>] };

export const Tones: Story = {
  render: () => (
    <div className="story-stack" style={{ width: 360 }}>
      <Meter value={8} max={12} tone="primary" label="Primary meter" />
      <Meter value={4} max={12} tone="amber" label="Amber meter" />
      <Meter value={10} max={12} tone="success" label="Success meter" />
      <Meter value={3} max={12} tone="danger" label="Danger meter" />
    </div>
  ),
};
