import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React from 'react';
import { Text, View } from 'react-native';

import { COLORS, SPACING, TYPOGRAPHY } from '../../tokens';
import { IconButton } from './IconButton';

const DemoIcon = ({ inverse = false }: { inverse?: boolean }) => (
  <Text
    style={{
      ...TYPOGRAPHY.headingM,
      color: inverse ? COLORS.text.inverse : COLORS.text.primary,
    }}
  >
    +
  </Text>
);

const meta = {
  title: 'Components/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Accessible icon-only action primitive with reusable visual variants.',
      },
    },
  },
  args: {
    icon: <DemoIcon />,
    accessibilityLabel: 'Example action',
    variant: 'default',
    size: 'medium',
    disabled: false,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'ghost', 'primary'],
    },
    size: {
      control: 'select',
      options: ['medium', 'large'],
    },
    disabled: {
      control: 'boolean',
    },
    icon: {
      control: false,
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Default: Story = {};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    icon: <DemoIcon inverse />,
  },
};

export const Large: Story = {
  args: {
    size: 'large',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <View
      style={{
        flexDirection: 'row',
        gap: SPACING.SIZE_16,
        alignItems: 'center',
      }}
    >
      <IconButton
        icon={<DemoIcon />}
        accessibilityLabel="Default action"
      />
      <IconButton
        icon={<DemoIcon />}
        accessibilityLabel="Ghost action"
        variant="ghost"
      />
      <IconButton
        icon={<DemoIcon inverse />}
        accessibilityLabel="Primary action"
        variant="primary"
      />
      <IconButton
        icon={<DemoIcon />}
        accessibilityLabel="Disabled action"
        disabled
      />
    </View>
  ),
};
