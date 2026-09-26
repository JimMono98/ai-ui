import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { AuthHeader } from './AuthHeader';

const meta = {
  title: 'Patterns/AuthHeader',
  component: AuthHeader,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Generic title and supporting-copy pattern for account-entry and authentication-style flows.',
      },
    },
  },
  args: {
    title: 'Continue to your account',
    subtitle: 'Enter your details to continue.',
    align: 'left',
  },
  argTypes: {
    align: {
      control: 'select',
      options: ['left', 'center'],
    },
  },
} satisfies Meta<typeof AuthHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const LeftAligned: Story = {};

export const Centered: Story = {
  args: { align: 'center' },
};

export const WithEyebrow: Story = {
  args: {
    eyebrow: 'WELCOME',
  },
};

export const LongSubtitle: Story = {
  args: {
    subtitle:
      'This longer supporting message demonstrates how the reusable header behaves when translated or when additional context is required.',
  },
};
