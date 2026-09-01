import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../components/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';
import { ThemeProvider } from '../theme';

const meta = {
  title: 'Foundations/Theming',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const BuiltInThemes: Story = {
  render: () => (
    <div className="story-theme-grid">
      {(['ember', 'ocean'] as const).map((theme) => (
        <ThemeProvider className="story-theme-preview" key={theme} theme={theme}>
          <Card accent>
            <CardHeader><CardTitle>{theme}</CardTitle></CardHeader>
            <CardContent>
              <div className="story-stack">
                <p>Surface, content, border, and interaction tokens update together.</p>
                <div className="story-row">
                  <Button>Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </ThemeProvider>
      ))}
    </div>
  ),
};

export const CustomColors: Story = {
  render: () => (
    <ThemeProvider className="story-custom-theme" style={{ minHeight: 360, padding: 32, background: 'var(--bits-surface)' }}>
      <Card accent style={{ maxWidth: 420 }}>
        <CardHeader><CardTitle>custom theme</CardTitle></CardHeader>
        <CardContent>
          <div className="story-stack">
            <p>This theme is defined only with CSS custom properties.</p>
            <div className="story-row"><Button>Primary</Button><Button variant="secondary">Secondary</Button></div>
          </div>
        </CardContent>
      </Card>
    </ThemeProvider>
  ),
};
