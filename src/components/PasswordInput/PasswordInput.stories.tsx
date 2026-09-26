import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React from 'react';
import { View } from 'react-native';

import { SPACING } from '../../tokens';
import { PasswordInput } from './PasswordInput';

const meta = {
  title: 'Components/PasswordInput',
  component: PasswordInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Password input built on the shared TextInput contract with show/hide interaction.',
      },
    },
  },
  args: {
    label: 'Password',
    placeholder: 'Enter a password',
    editable: true,
    showPasswordLabel: 'Show',
    hidePasswordLabel: 'Hide',
  },
} satisfies Meta<typeof PasswordInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Default: Story = {};

export const Filled: Story = {
  args: {
    defaultValue: 'example-password',
  },
};

export const Error: Story = {
  args: {
    defaultValue: '123',
    error: 'The value does not meet the requirements.',
  },
};

export const Disabled: Story = {
  args: {
    value: 'example-password',
    editable: false,
  },
};

export const AllStates: Story = {
  render: () => (
    <View style={{ width: 360, gap: SPACING.SIZE_20 }}>
      <PasswordInput
        label="Default"
        placeholder="Enter a password"
      />
      <PasswordInput
        label="Filled"
        defaultValue="example-password"
      />
      <PasswordInput
        label="Error"
        defaultValue="123"
        error="The value does not meet the requirements."
      />
      <PasswordInput
        label="Disabled"
        value="example-password"
        editable={false}
      />
    </View>
  ),
};
