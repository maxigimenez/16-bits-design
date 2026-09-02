import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';
import { EmptyState } from './EmptyState';

const meta = {
  title: 'Components/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  args: {
    title: 'No deployments yet',
    headingLevel: 3,
    children: 'Create a deployment to connect a repository and start tracking releases.',
  },
  argTypes: {
    headingLevel: { control: 'inline-radio', options: [2, 3, 4] },
    action: { control: false },
    illustration: { control: false },
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => <EmptyState {...args} action={<Button size="sm">Create deployment</Button>} />,
};

export const FilteredResults: Story = {
  render: () => (
    <EmptyState title="No matching deployments">
      No deployments match the current owner and status filters. Adjust the filters to see more results.
    </EmptyState>
  ),
};

export const CustomIllustration: Story = {
  render: () => (
    <EmptyState
      title="Inbox cleared"
      illustration={<span className="story-empty-glyph" aria-hidden="true">✓</span>}
      action={<Button variant="secondary" size="sm">View archive</Button>}
    >
      There are no pending review requests. Completed reviews remain available in the archive.
    </EmptyState>
  ),
};

export const InContext: Story = {
  render: () => (
    <section className="story-section" style={{ width: 'min(100%, 620px)' }}>
      <p className="story-label">Deployment history</p>
      <EmptyState
        title="No deployments yet"
        action={<Button size="sm">Create deployment</Button>}
      >
        Create a deployment to connect a repository and start tracking releases.
      </EmptyState>
    </section>
  ),
};

export const NarrowViewport: Story = {
  render: () => (
    <div style={{ maxWidth: 280 }}>
      <EmptyState
        title="No matching deployments were found"
        action={<Button size="sm" fullWidth>Clear filters</Button>}
      >
        Adjust the owner and status filters to see deployments from the rest of the workspace.
      </EmptyState>
    </div>
  ),
};
