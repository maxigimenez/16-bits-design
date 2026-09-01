import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  args: { children: 'Primary', variant: 'primary', size: 'md', loading: false, disabled: false },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'danger', 'ghost'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="story-stack">
      <div className="story-row">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
      <div className="story-row">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
      <div className="story-row">
        <Button loading loadingLabel="Working">With loader</Button>
        <Button disabled>Disabled</Button>
      </div>
    </div>
  ),
};

export const LoadingStates: Story = {
  render: () => (
    <div className="story-stack" style={{ width: 280, alignItems: 'flex-start' }}>
      <Button size="sm" loading loadingLabel="Loading small">Small</Button>
      <Button loading loadingLabel="Loading medium">Medium</Button>
      <Button size="lg" loading loadingLabel="Loading large">Large</Button>
      <div style={{ width: '100%' }}><Button fullWidth loading loadingLabel="Loading full width">Full width</Button></div>
    </div>
  ),
};

export const PressFeedback: Story = {
  render: () => (
    <div className="story-stack">
      <p className="story-caption">Press and hold each enabled button to inspect its active feedback.</p>
      <div className="story-row">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
    </div>
  ),
};
