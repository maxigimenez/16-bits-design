import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';
import { Dialog } from './Dialog';

const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  args: {
    open: true,
    title: 'restart daemon',
    description: 'Running work pauses while the local daemon restarts. Queued tickets are kept.',
    meta: 'localhost:7333',
    tone: 'primary',
    confirmLabel: 'restart',
    cancelLabel: 'not now',
    onOpenChange: () => undefined,
  },
  argTypes: { tone: { control: 'inline-radio', options: ['primary', 'danger'] }, onConfirm: { action: 'confirmed' } },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

function DialogDemo({ tone }: { tone: 'primary' | 'danger' }) {
  const [open, setOpen] = useState(false);
  const danger = tone === 'danger';
  return (
    <>
      <Button variant={danger ? 'danger' : 'secondary'} onClick={() => setOpen(true)}>{danger ? 'open delete' : 'open confirm'}</Button>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        tone={tone}
        title={danger ? 'delete route' : 'restart daemon'}
        description={danger ? 'This removes spec → patch → test and every run it produced. There is no undo.' : 'Running work pauses while the local daemon restarts. Queued tickets are kept.'}
        meta={danger ? 'spec → patch → test' : 'localhost:7333'}
        confirmLabel={danger ? 'delete route' : 'restart'}
        cancelLabel={danger ? 'keep it' : 'not now'}
      />
    </>
  );
}

export const Interactive: Story = {
  args: { open: false },
  render: () => <div className="story-row"><DialogDemo tone="primary" /><DialogDemo tone="danger" /></div>,
};
