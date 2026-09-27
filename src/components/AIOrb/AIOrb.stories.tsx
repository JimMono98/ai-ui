import type {
  Meta,
  StoryObj,
} from '@storybook/react-native-web-vite';
import React from 'react';
import {
  Text,
  View,
} from 'react-native';

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
          'Living AI identity primitive with organic shape, ambient motion, semantic states, orbiting particles, facial micro-interactions, and reduced-motion support.',
      },
    },
  },

  args: {
    size: 'medium',
    state: 'idle',
    showFace: true,
    showOrbit: true,
    animated: true,
    accessibilityLabel:
      'AI assistant',
  },

  argTypes: {
    size: {
      control: 'select',
      options: [
        'avatar',
        'medium',
        'hero',
      ],
    },

    state: {
      control: 'select',
      options: [
        'idle',
        'ready',
        'thinking',
        'success',
        'error',
      ],
    },

    showFace: {
      control: 'boolean',
    },

    showOrbit: {
      control: 'boolean',
    },

    animated: {
      control: 'boolean',
    },

    reduceMotion: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof AIOrb>;

export default meta;

type Story =
  StoryObj<typeof meta>;

export const Playground: Story = {};

export const LivingHero: Story = {
  args: {
    size: 'hero',
    state: 'ready',
    animated: true,
  },
};

export const Thinking: Story = {
  args: {
    size: 'hero',
    state: 'thinking',
  },
};

export const Success: Story = {
  args: {
    size: 'hero',
    state: 'success',
  },
};

export const Error: Story = {
  args: {
    size: 'hero',
    state: 'error',
  },
};

export const Static: Story = {
  args: {
    size: 'hero',
    state: 'ready',
    animated: false,
  },
};

export const ReducedMotion: Story = {
  args: {
    size: 'hero',
    state: 'ready',
    animated: true,
    reduceMotion: true,
  },
};

const states = [
  'idle',
  'ready',
  'thinking',
  'success',
  'error',
] as const;

export const AllStates: Story = {
  render: () => (
    <View
      style={{
        maxWidth: 900,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: SPACING.SIZE_40,
      }}
    >
      {states.map(state => (
        <View
          key={state}
          style={{
            alignItems: 'center',
            gap: SPACING.SIZE_12,
          }}
        >
          <AIOrb
            size="medium"
            state={state}
            animated={false}
            accessibilityLabel={
              `AI ${state}`
            }
          />

          <Text
            style={{
              ...TYPOGRAPHY.labelM,
              color:
                COLORS.text.secondary,
            }}
          >
            {state}
          </Text>
        </View>
      ))}
    </View>
  ),
};

export const SizeScale: Story = {
  render: () => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.SIZE_48,
      }}
    >
      <AIOrb
        size="avatar"
        state="ready"
        accessibilityLabel="Avatar AI orb"
      />

      <AIOrb
        size="medium"
        state="ready"
        accessibilityLabel="Medium AI orb"
      />

      <AIOrb
        size="hero"
        state="ready"
        accessibilityLabel="Hero AI orb"
      />
    </View>
  ),
};
