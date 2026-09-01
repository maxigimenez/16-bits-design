import type { StorybookConfig } from '@storybook/react-vite';
import { fileURLToPath, URL } from 'node:url';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: { autodocs: 'tag' },
  viteFinal: (config) => mergeConfig(config, {
    resolve: {
      alias: {
        '@16-bits-design/ui/theme': fileURLToPath(new URL('../src/entries/theme.ts', import.meta.url)),
      },
    },
  }),
};

export default config;
