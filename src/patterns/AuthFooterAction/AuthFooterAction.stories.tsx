import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { fn } from 'storybook/test';

import { AuthFooterAction } from './AuthFooterAction';

const meta = {
  title: 'Patterns/AuthFooterAction',
  component: AuthFooterAction,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Generic wrapping text-plus-action pattern. Navigation and business behavior remain application-owned.',
      },
    },
  },
  args: {
    text: 'Need another option?',
    actionLabel: 'Continue here',
    onPress: fn(),
    align: 'center',
    disabled: false,
  },
  argTypes: {
    align: {
      control: 'select',
      options: ['left', 'center'],
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof AuthFooterAction>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Centered: Story = {};

export const LeftAligned: Story = {
  args: { align: 'left' },
};

export const LongTranslationExample: Story = {
  args: {
    text: 'Αν χρειάζεστε διαφορετική επιλογή για να συνεχίσετε στη διαδικασία,',
    actionLabel: 'χρησιμοποιήστε αυτή την ενέργεια',
  },
};

export const Disabled: Story = {
  args: { disabled: true },
};
