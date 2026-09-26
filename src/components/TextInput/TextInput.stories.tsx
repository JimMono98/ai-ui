import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React from 'react';
import { View } from 'react-native';

import { SPACING } from '../../tokens';
import { TextInput } from './TextInput';

const meta = {
  title: 'Components/TextInput',
  component: TextInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Generic text input with label, helper text, error and disabled states.',
      },
    },
  },
  args: {
    label: 'Field label',
    placeholder: 'Enter a value',
    helperText: '',
    error: '',
    editable: true,
  },
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Default: Story = {
  args: {
    label: 'Field label',
    placeholder: 'Enter a value',
  },
};

export const Filled: Story = {
  args: {
    label: 'Field label',
    defaultValue: 'Example value',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Field label',
    placeholder: 'Enter a value',
    helperText: 'Helpful supporting information.',
  },
};

export const Error: Story = {
  args: {
    label: 'Field label',
    defaultValue: 'Invalid value',
    error: 'Something needs your attention.',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Field label',
    value: 'Unavailable value',
    editable: false,
  },
};

export const AllStates: Story = {
  render: () => (
    <View style={{ width: 360, gap: SPACING.SIZE_20 }}>
      <TextInput label="Default" placeholder="Enter a value" />
      <TextInput label="Filled" defaultValue="Example value" />
      <TextInput
        label="Helper text"
        placeholder="Enter a value"
        helperText="Additional information can appear here."
      />
      <TextInput
        label="Error"
        defaultValue="Invalid value"
        error="Something needs your attention."
      />
      <TextInput
        label="Disabled"
        value="Unavailable value"
        editable={false}
      />
    </View>
  ),
};
