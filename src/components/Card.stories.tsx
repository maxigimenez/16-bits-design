import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './Card';

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  args: { variant: 'panel', tone: 'primary', accent: true },
  argTypes: {
    variant: { control: 'inline-radio', options: ['panel', 'raised', 'outline'] },
    tone: { control: 'inline-radio', options: ['primary', 'amber', 'success', 'danger'] },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Card {...args} style={{ width: 378 }}>
      <CardHeader>
        <CardTitle>workspace access</CardTitle>
        <CardDescription>Reusable card anatomy with optional accent and footer regions.</CardDescription>
      </CardHeader>
      <CardContent>Cards use the same square geometry, 2px edges, and layered surfaces as the rest of the system.</CardContent>
      <CardFooter>
        <Button variant="secondary">Cancel</Button>
        <Button>Continue</Button>
      </CardFooter>
    </Card>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="story-grid">
      <Card variant="panel" accent>
        <CardHeader><CardTitle>panel card</CardTitle><CardDescription>Default surface treatment.</CardDescription></CardHeader>
        <CardContent>Useful for forms, summaries, and grouped controls.</CardContent>
      </Card>
      <Card variant="raised" accent tone="success">
        <CardHeader><CardTitle>raised card</CardTitle><CardDescription>Hard offset shadow.</CardDescription></CardHeader>
        <CardContent>Use for elevated, transient, or highlighted content.</CardContent>
      </Card>
      <Card variant="outline" accent tone="danger">
        <CardHeader><CardTitle>outline card</CardTitle><CardDescription>Transparent background.</CardDescription></CardHeader>
        <CardContent>Fits naturally over themed canvas surfaces.</CardContent>
      </Card>
    </div>
  ),
};
