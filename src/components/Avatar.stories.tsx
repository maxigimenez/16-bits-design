import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './Avatar';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  args: { name: 'Hermes Alpha', initials: 'HA', size: 'md', color: 'var(--bits-primary)', ink: 'var(--bits-ink)' },
  argTypes: { size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] }, color: { control: 'color' }, ink: { control: 'color' } },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="story-row">
      <Avatar name="Hermes Alpha" initials="HA" color="var(--bits-primary)" />
      <Avatar name="Jae Okafor" initials="JO" color="var(--bits-success)" ink="var(--bits-ink)" />
      <Avatar name="Northwind Core" initials="NC" color="var(--bits-amber)" />
      <Avatar name="Unassigned" initials="—" />
      <Avatar name="Small avatar" size="sm" color="var(--bits-primary)" />
      <Avatar name="Large avatar" size="lg" color="var(--bits-primary)" />
    </div>
  ),
};
