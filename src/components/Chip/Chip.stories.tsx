import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React from 'react';
import { View } from 'react-native';

import { SPACING } from '../../tokens';
import { Chip } from './Chip';

const meta = {
  title: 'Components/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Compact reusable action or selection primitive for suggestions and lightweight choices.',
      },
    },
  },
  args: {
    label: 'Example option',
    variant: 'neutral',
    state: 'default',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['neutral', 'accent'],
    },
    state: {
      control: 'select',
      options: ['default', 'selected'],
    },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Neutral: Story = {
  args: {
    label: 'Neutral',
  },
};

export const Accent: Story = {
  args: {
    label: 'Accent',
    variant: 'accent',
  },
};

export const Selected: Story = {
  args: {
    label: 'Selected',
    state: 'selected',
  },
};

export const LongLabel: Story = {
  args: {
    label: 'This is a longer translated or descriptive option',
  },
};

export const AllVariants: Story = {
  render: () => (
    <View
      style={{
        maxWidth: 560,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: SPACING.SIZE_12,
      }}
    >
      <Chip label="Neutral" />
      <Chip label="Accent" variant="accent" />
      <Chip label="Selected" state="selected" />
      <Chip
        label="Accent selected"
        variant="accent"
        state="selected"
      />
      <Chip label="A considerably longer option that can safely wrap" />
    </View>
  ),
};
