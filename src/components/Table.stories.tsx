import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties } from 'react';
import { Avatar } from './Avatar';
import { Badge } from './Badge';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableCellContent,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './Table';

const meta = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
  args: {
    scrollLabel: 'Deployment history',
    minWidth: '44rem',
  },
  argTypes: {
    minWidth: { control: 'text' },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const deployments = [
  { name: 'Gateway API', detail: 'api/gateway', owner: 'Maya Chen', initials: 'MC', status: 'running', tone: 'primary', duration: '02:18' },
  { name: 'Billing worker', detail: 'jobs/billing', owner: 'Theo Park', initials: 'TP', status: 'complete', tone: 'success', duration: '01:43' },
  { name: 'Search index', detail: 'jobs/search', owner: 'Iris Cole', initials: 'IC', status: 'failed', tone: 'danger', duration: '00:31' },
] as const;

function DeploymentTable({
  scrollLabel = 'Deployment history',
  minWidth = '44rem',
}: {
  scrollLabel?: string;
  minWidth?: CSSProperties['minWidth'];
}) {
  return (
    <Table scrollLabel={scrollLabel} minWidth={minWidth}>
      <TableCaption>Recent deployments and their current runtime status.</TableCaption>
      <TableHead>
        <TableRow>
          <TableHeader>Deployment</TableHeader>
          <TableHeader>Owner</TableHeader>
          <TableHeader>Status</TableHeader>
          <TableHeader align="end">Duration</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {deployments.map((deployment) => (
          <TableRow key={deployment.name}>
            <TableCell>
              <TableCellContent primary={deployment.name} secondary={deployment.detail} />
            </TableCell>
            <TableCell>
              <div className="story-table-person">
                <Avatar name={deployment.owner} size="sm" aria-hidden="true">{deployment.initials}</Avatar>
                {deployment.owner}
              </div>
            </TableCell>
            <TableCell><Badge tone={deployment.tone}>{deployment.status}</Badge></TableCell>
            <TableCell align="end">{deployment.duration}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export const Playground: Story = {
  render: (args) => <DeploymentTable scrollLabel={args.scrollLabel} minWidth={args.minWidth} />,
};

export const AlignmentAndFooter: Story = {
  render: () => (
    <Table scrollLabel="Monthly usage" minWidth="32rem">
      <TableHead>
        <TableRow>
          <TableHeader>Service</TableHeader>
          <TableHeader align="center">Region</TableHeader>
          <TableHeader align="end">Requests</TableHeader>
          <TableHeader align="end">Errors</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Edge gateway</TableCell>
          <TableCell align="center">eu-west</TableCell>
          <TableCell align="end">128,420</TableCell>
          <TableCell align="end">19</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Queue worker</TableCell>
          <TableCell align="center">us-east</TableCell>
          <TableCell align="end">84,901</TableCell>
          <TableCell align="end">7</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell align="end">213,321</TableCell>
          <TableCell align="end">26</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};

export const NarrowViewport: Story = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  render: () => <div style={{ maxWidth: 320 }}><DeploymentTable /></div>,
};
