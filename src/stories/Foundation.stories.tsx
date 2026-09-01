import type { Meta, StoryObj } from '@storybook/react-vite';
import { colors } from '../tokens';

const meta = {
  title: 'Foundations/Overview',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const DesignTokens: Story = {
  render: () => (
    <div>
      <section className="story-section">
        <h2 className="story-label">01 · palette</h2>
        <div className="story-grid">
          {Object.entries(colors).map(([name, value]) => (
            <div className="story-swatch" key={name}>
              <span className="story-swatch__color" style={{ background: value }} />
              <span className="story-swatch__name">{name}</span>
              <span className="story-swatch__hex">{value}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="story-section">
        <h2 className="story-label">02 · type</h2>
        <div className="story-row" style={{ alignItems: 'flex-end', gap: 26 }}>
          <div className="story-card"><p className="story-heading">display 24</p><span className="story-caption">Silkscreen · numerals, titles</span></div>
          <div className="story-card"><p className="story-subheading">heading 13</p><span className="story-caption">Silkscreen · page titles</span></div>
          <div className="story-card"><p className="story-body">body 12 — routes run locally</p><span className="story-caption">JetBrains Mono 400</span></div>
          <div className="story-card"><p className="story-label">label 9 / 0.18em</p><span className="story-caption">JetBrains Mono · all caps</span></div>
        </div>
      </section>
    </div>
  ),
};
