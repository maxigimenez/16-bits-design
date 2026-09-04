import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';
import { Dialog } from './Dialog';
import { Textarea } from './Field';
import { Select } from './Select';

const agentOptions = [
  { value: 'reviewer', label: 'reviewer · local' },
  { value: 'builder', label: 'builder · runner-02' },
  { value: 'researcher', label: 'researcher · remote' },
];

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
  argTypes: {
    tone: { control: 'inline-radio', options: ['primary', 'danger'] },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
    onConfirm: { action: 'confirmed' },
  },
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

function FormDialogDemo() {
  const [agent, setAgent] = useState('');
  const [prompt, setPrompt] = useState('');

  return (
    <Dialog
      open
      onOpenChange={() => undefined}
      title="run an agent"
      description="Choose an agent and describe the work to start a new run."
      size="md"
      confirmLabel="start run"
      confirmDisabled={!agent || !prompt.trim()}
      closeOnConfirm={false}
    >
      <Select
        label="Agent"
        options={agentOptions}
        value={agent}
        onValueChange={setAgent}
        placeholder="choose an agent"
      />
      <Textarea
        label="Prompt"
        value={prompt}
        onChange={(event) => setPrompt(event.target.value)}
        placeholder="Describe the task and expected outcome"
        rows={5}
      />
    </Dialog>
  );
}

export const Form: Story = {
  args: { open: true, size: 'md' },
  render: () => <FormDialogDemo />,
};

export const ConfirmLoading: Story = {
  args: {
    open: true,
    title: 'run an agent',
    description: 'The run is being created on runner-02.',
    size: 'md',
    confirmLabel: 'start run',
    confirmLoading: true,
    confirmLoadingLabel: 'starting run',
    closeOnBackdrop: false,
  },
};
