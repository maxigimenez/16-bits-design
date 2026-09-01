import type { Preview } from '@storybook/react-vite';
import '../src/styles.css';
import '../src/stories/story.css';
import { ThemeProvider } from '../src/theme';
import type { ThemeName } from '../src/theme';

const preview: Preview = {
  parameters: {
    controls: {
      expanded: true,
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },
    options: {
      storySort: {
        order: ['Foundations', ['Overview'], 'Components'],
      },
    },
    a11y: { test: 'error' },
  },
  globalTypes: {
    designTheme: {
      description: 'Design theme',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'ember', title: 'Ember' },
          { value: 'ocean', title: 'Ocean' },
        ],
        dynamicTitle: true,
      },
    },
    canvasBackground: {
      description: 'Solid canvas background',
      toolbar: {
        icon: 'contrast',
        items: [
          { value: 'surface', title: 'Surface' },
          { value: 'panel', title: 'Panel' },
          { value: 'raised', title: 'Raised' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { designTheme: 'ember', canvasBackground: 'surface' },
  decorators: [
    (Story, context) => {
      const themeName = context.globals.designTheme as ThemeName;
      const backgroundName = context.globals.canvasBackground as string;
      return (
        <ThemeProvider
          theme={themeName}
          className="story-shell"
          data-canvas-background={backgroundName}
        >
          <Story />
        </ThemeProvider>
      );
    },
  ],
};

export default preview;
