import type { Meta, StoryObj } from '@storybook/react-vite';
import { Spinner } from './Spinner';

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  args: {
    label: 'Loading deployments',
    size: 'md',
    hideLabel: false,
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="story-stack">
      <Spinner size="sm" label="Checking connection" />
      <Spinner size="md" label="Loading deployments" />
      <Spinner size="lg" label="Preparing workspace" />
    </div>
  ),
};

export const VisuallyHiddenLabel: Story = {
  render: () => <Spinner label="Refreshing deployment status" hideLabel />,
};

export const InContext: Story = {
  render: () => (
    <section className="story-section" style={{ width: 'min(100%, 440px)', minHeight: 160, justifyContent: 'center' }}>
      <Spinner label="Loading deployment history" />
    </section>
  ),
};
