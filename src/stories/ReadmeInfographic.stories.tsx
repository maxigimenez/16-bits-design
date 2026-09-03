import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert } from '../components/Alert';
import { Avatar } from '../components/Avatar';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/Card';
import { Code } from '../components/Code';
import { Input } from '../components/Field';
import { Meter } from '../components/Meter';
import { Segmented } from '../components/Segmented';
import { Select } from '../components/Select';
import { Spinner } from '../components/Spinner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/Table';
import { ThemeProvider } from '../theme';
import type { BuiltInTheme } from '../theme';
import { Toast } from '../components/Toast';
import { Toggle } from '../components/Toggle';
import { Heading, Text } from '../components/Typography';

const componentNames = [
  'Alert',
  'Avatar',
  'Badge',
  'Button',
  'Card',
  'Code',
  'Dialog',
  'Empty state',
  'Input',
  'Meter',
  'Segmented',
  'Select',
  'Spinner',
  'Table',
  'Textarea',
  'Toast',
  'Toggle',
  'Typography',
];

function ThemeAtlas({ theme, number }: { theme: BuiltInTheme; number: string }) {
  const isEmber = theme === 'ember';

  return (
    <ThemeProvider theme={theme} className="readme-atlas">
      <header className="readme-atlas__header">
        <div>
          <Text size="label" tone="muted">Theme {number}</Text>
          <Heading level={2}>{theme}</Heading>
        </div>
        <Badge tone="primary">{isEmber ? 'Warm signal' : 'Cool signal'}</Badge>
      </header>

      <Card variant="raised" accent>
        <CardHeader className="readme-atlas__card-header">
          <div className="readme-atlas__identity">
            <Avatar name={isEmber ? 'Ember operator' : 'Ocean operator'} initials={isEmber ? 'E' : 'O'} size="lg" />
            <div>
              <CardTitle>System online</CardTitle>
              <CardDescription>All interface checks are passing.</CardDescription>
            </div>
          </div>
          <Badge tone="success">Stable</Badge>
        </CardHeader>
        <CardContent className="readme-atlas__card-content">
          <div className="readme-atlas__metric">
            <Text size="label" tone="muted">Build health</Text>
            <Text as="span" size="small">92%</Text>
          </div>
          <Meter value={92} segments={16} label="Build health: 92 percent" />
        </CardContent>
      </Card>

      <div className="readme-atlas__split">
        <section className="readme-atlas__module" aria-labelledby={`${theme}-actions`}>
          <Text id={`${theme}-actions`} size="label" tone="muted">Actions + choice</Text>
          <div className="readme-atlas__buttons">
            <Button size="sm" trailingIcon={<span aria-hidden="true">→</span>}>Deploy</Button>
            <Button size="sm" variant="secondary">Preview</Button>
            <Button size="sm" variant="ghost">Cancel</Button>
          </div>
          <Segmented
            label="Environment"
            defaultValue="preview"
            fullWidth
            options={[
              { value: 'local', label: 'Local' },
              { value: 'preview', label: 'Preview' },
              { value: 'live', label: 'Live' },
            ]}
          />
          <Toggle defaultChecked label="Auto deploy" />
        </section>

        <section className="readme-atlas__module" aria-labelledby={`${theme}-fields`}>
          <Text id={`${theme}-fields`} size="label" tone="muted">Fields</Text>
          <Input label="Project name" defaultValue="sixteen-bits" status="success" />
          <Select
            label="Region"
            defaultValue="dub"
            options={[
              { value: 'dub', label: 'Dublin / EU' },
              { value: 'iad', label: 'Virginia / US' },
            ]}
          />
        </section>
      </div>

      <Alert tone="success" title="Release ready">
        Accessibility, types, and package checks passed.
      </Alert>

      <div className="readme-atlas__split readme-atlas__split--lower">
        <Table scrollLabel={`${theme} release history`} minWidth="0">
          <TableHead>
            <TableRow>
              <TableHeader>Version</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader align="end">Size</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>v0.2.0</TableCell>
              <TableCell><Badge tone="success">Live</Badge></TableCell>
              <TableCell align="end">14.2 kb</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>v0.1.4</TableCell>
              <TableCell><Badge tone="outline">Saved</Badge></TableCell>
              <TableCell align="end">13.8 kb</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div className="readme-atlas__feedback">
          <Code label="Install">pnpm add @16-bits-design/ui</Code>
          <Toast
            tone="success"
            title="Published successfully"
            message={`The ${theme} release is live.`}
          />
          <Spinner size="sm" label="Syncing registry" />
        </div>
      </div>
    </ThemeProvider>
  );
}

const meta = {
  title: 'Marketing/Readme infographic',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
    toolbar: { hidden: true },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const ComponentAtlas: Story = {
  render: () => (
    <main className="readme-infographic">
      <header className="readme-infographic__hero">
        <div className="readme-infographic__eyebrow">
          <span className="readme-infographic__mark" aria-hidden="true">16</span>
          <span>16 Bits Design / React UI</span>
        </div>
        <div className="readme-infographic__title-row">
          <div>
            <h1>Interfaces with signal.</h1>
            <p>Themeable, accessible components with a pixel-sharp point of view.</p>
          </div>
          <dl className="readme-infographic__stats">
            <div><dt>Components</dt><dd>18</dd></div>
            <div><dt>Themes</dt><dd>02</dd></div>
            <div><dt>Radius</dt><dd>00</dd></div>
          </dl>
        </div>
      </header>

      <section className="readme-infographic__themes" aria-label="Built-in theme comparison">
        <ThemeAtlas theme="ember" number="01" />
        <ThemeAtlas theme="ocean" number="02" />
      </section>

      <footer className="readme-infographic__catalog">
        <div>
          <span className="readme-infographic__catalog-index">01—18</span>
          <span>Public component set</span>
        </div>
        <div className="readme-infographic__badges">
          {componentNames.map((name) => <Badge key={name} tone="outline">{name}</Badge>)}
        </div>
      </footer>
    </main>
  ),
};
