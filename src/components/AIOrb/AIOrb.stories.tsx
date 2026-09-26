import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React from 'react';
import { Text, View } from 'react-native';

import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
} from '../../tokens';
import { AIOrb } from './AIOrb';

const meta = {
  title: 'AI/AIOrb',
  component: AIOrb,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Reusable AI visual identity primitive with semantic sizes and generic visual states.',
      },
    },
  },
  args: {
    size: 'medium',
    state: 'idle',
    showFace: true,
    showOrbit: true,
    accessibilityLabel: 'AI assistant',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['avatar', 'medium', 'hero'],
    },
    state: {
      control: 'select',
      options: ['idle', 'ready', 'thinking', 'success', 'error'],
    },
    showFace: { control: 'boolean' },
    showOrbit: { control: 'boolean' },
  },
} satisfies Meta<typeof AIOrb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Avatar: Story = {
  args: { size: 'avatar' },
};

export const Medium: Story = {
  args: { size: 'medium' },
};

export const Hero: Story = {
  args: { size: 'hero' },
};

export const Idle: Story = {
  args: { state: 'idle' },
};

export const Ready: Story = {
  args: { state: 'ready' },
};

export const Thinking: Story = {
  args: { state: 'thinking' },
};

export const Success: Story = {
  args: { state: 'success' },
};

export const Error: Story = {
  args: { state: 'error' },
};

const states = ['idle', 'ready', 'thinking', 'success', 'error'] as const;

export const AllStates: Story = {
  render: () => (
    <View
      style={{
        maxWidth: 720,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: SPACING.SIZE_32,
        justifyContent: 'center',
      }}
    >
      {states.map(state => (
        <View
          key={state}
          style={{
            alignItems: 'center',
            gap: SPACING.SIZE_08,
          }}
        >
          <AIOrb
            size="medium"
            state={state}
            accessibilityLabel={`AI ${state}`}
          />
          <Text
            style={{
              ...TYPOGRAPHY.labelM,
              color: COLORS.text.secondary,
            }}
          >
            {state}
          </Text>
        </View>
      ))}
    </View>
  ),
};
