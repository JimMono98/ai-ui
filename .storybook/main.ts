import type { StorybookConfig } from '@storybook/react-native-web-vite';
import { fileURLToPath } from 'node:url';
import { mergeConfig } from 'vite';

const assetRegistryShim = fileURLToPath(
  new URL('./assetsRegistryShim.ts', import.meta.url),
);

const config: StorybookConfig = {
  stories: [
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],

  addons: [
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
  ],

  framework: {
    name: '@storybook/react-native-web-vite',
    options: {
      modulesToTranspile: [
        'react-native-svg',
      ],
    },
  },

  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@react-native/assets-registry/registry': assetRegistryShim,
        },
      },
    });
  },
};

export default config;
