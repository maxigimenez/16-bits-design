import type { Meta, StoryObj } from '@storybook/react-vite';
import { Heading, Text } from './Typography';

const meta = {
  title: 'Components/Typography',
  component: Heading,
  tags: ['autodocs'],
  args: { level: 2, children: 'Heading' },
  argTypes: { level: { control: 'inline-radio', options: [1, 2, 3, 4, 5, 6] } },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Scale: Story = {
  args: {
    level: 5
  },

  render: () => (
    <div className="story-stack">
      <Heading level={1}>heading one · 24</Heading>
      <Heading level={2}>heading two · 18</Heading>
      <Heading level={3}>heading three · 15</Heading>
      <Heading level={4}>heading four · 13</Heading>
      <Heading level={5}>heading five · 11</Heading>
      <Heading level={6}>heading six · label</Heading>
      <Text>Body text uses JetBrains Mono with a readable 1.65 line height.</Text>
      <Text size="small" tone="soft">Small supporting copy.</Text>
      <Text size="small" tone="dim">Readable subordinate interface text.</Text>
      <Text size="caption" tone="muted">Caption and metadata copy.</Text>
      <Text as="span" size="label" tone="muted">uppercase label</Text>
    </div>
  )
};

export const ToneRamp: Story = {
  render: () => (
    <div className="story-stack">
      <Text tone="default">Default · primary content</Text>
      <Text tone="soft">Soft · secondary readable content</Text>
      <Text tone="dim">Dim · subordinate navigation and interface text</Text>
      <Text tone="muted">Muted · supporting metadata and placeholders</Text>
      <Text tone="faint">Faint · lowest-emphasis decorative text</Text>
    </div>
  ),
};

export const NativeElements: Story = {
  render: () => (
    <div className="story-stack">
      <h1>Native h1</h1><h2>Native h2</h2><h3>Native h3</h3>
      <h4>Native h4</h4><h5>Native h5</h5><h6>Native h6</h6>
      <p>Native paragraphs inherit the body font and rhythm inside ThemeProvider.</p>
      <small>Native small text uses the caption scale.</small>
      <p><strong>Strong text</strong>, <em>emphasized text</em>, and <code>inline code</code> are predefined.</p>
      <ul><li>Unordered list item</li><li>Second list item</li></ul>
      <blockquote>Native blockquotes use a primary signal edge.</blockquote>
    </div>
  ),
};

export const ConsumerOverrides: Story = {
  render: () => (
    <div className="story-stack">
      <h2 className="story-consumer-heading">A single consumer class controls this heading</h2>
      <a className="story-consumer-link" href="#consumer-override">A consumer-styled link</a>
      <Text size="caption" tone="muted">
        Theme defaults stay underneath application classes without !important.
      </Text>
    </div>
  ),
};
