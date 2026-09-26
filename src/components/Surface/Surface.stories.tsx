import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React from 'react';
import { Text, View } from 'react-native';

import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
} from '../../tokens';
import { Surface } from './Surface';

const Content = ({ title }: { title: string }) => (
  <View style={{ gap: SPACING.SIZE_08 }}>
    <Text style={{ ...TYPOGRAPHY.headingM, color: COLORS.text.primary }}>
      {title}
    </Text>
    <Text style={{ ...TYPOGRAPHY.bodyM, color: COLORS.text.secondary }}>
      Generic grouped content can be presented inside this reusable surface.
    </Text>
  </View>
);

const meta = {
  title: 'Components/Surface',
  component: Surface,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Generic content surface with default, subtle and elevated treatments.',
      },
    },
  },
  args: {
    variant: 'default',
    children: null,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'subtle', 'elevated'],
    },
  },
  render: args => (
    <Surface
      {...args}
      style={{
        width: 360,
        padding: SPACING.SIZE_24,
      }}
    >
      <Content title="Surface" />
    </Surface>
  ),
} satisfies Meta<typeof Surface>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Default: Story = {
  args: { variant: 'default' },
};

export const Subtle: Story = {
  args: { variant: 'subtle' },
};

export const Elevated: Story = {
  args: { variant: 'elevated' },
};

export const AllVariants: Story = {
  render: () => (
    <View style={{ width: 380, gap: SPACING.SIZE_20 }}>
      <Surface
        variant="default"
        style={{ padding: SPACING.SIZE_24 }}
      >
        <Content title="Default" />
      </Surface>

      <Surface
        variant="subtle"
        style={{ padding: SPACING.SIZE_24 }}
      >
        <Content title="Subtle" />
      </Surface>

      <Surface
        variant="elevated"
        style={{ padding: SPACING.SIZE_24 }}
      >
        <Content title="Elevated" />
      </Surface>
    </View>
  ),
};
