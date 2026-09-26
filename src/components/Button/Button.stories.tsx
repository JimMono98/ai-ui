import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React from 'react';
import { View } from 'react-native';

import { SPACING } from '../../tokens';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Reusable cross-platform action button with primary, secondary and ghost variants.',
      },
    },
  },
  args: {
    label: 'Continue',
    variant: 'primary',
    size: 'large',
    loading: false,
    disabled: false,
    fullWidth: false,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['medium', 'large'],
    },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Primary: Story = {
  args: { label: 'Primary action', variant: 'primary' },
};

export const Secondary: Story = {
  args: { label: 'Secondary action', variant: 'secondary' },
};

export const Ghost: Story = {
  args: { label: 'Ghost action', variant: 'ghost' },
};

export const Loading: Story = {
  args: { label: 'Loading', loading: true },
};

export const Disabled: Story = {
  args: { label: 'Disabled', disabled: true },
};

export const AllVariants: Story = {
  render: () => (
    <View style={{ width: 320, gap: SPACING.SIZE_16 }}>
      <Button label="Primary" variant="primary" fullWidth />
      <Button label="Secondary" variant="secondary" fullWidth />
      <Button label="Ghost" variant="ghost" fullWidth />
      <Button label="Loading" loading fullWidth />
      <Button label="Disabled" disabled fullWidth />
    </View>
  ),
};
