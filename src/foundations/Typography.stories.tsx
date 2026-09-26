import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React from 'react';
import { Text, View } from 'react-native';

import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
} from '../tokens';

const meta = {
  title: 'Foundations/Typography',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Scale: Story = {
  render: () => (
    <View style={{ gap: SPACING.SIZE_24 }}>
      {Object.entries(TYPOGRAPHY).map(([name, style]) => (
        <View
          key={name}
          style={{ gap: SPACING.SIZE_04 }}
        >
          <Text
            style={{
              ...TYPOGRAPHY.caption,
              color: COLORS.text.tertiary,
            }}
          >
            {name}
          </Text>

          <Text
            style={{
              ...style,
              color: COLORS.text.primary,
            }}
          >
            Think clearer. Build better experiences.
          </Text>
        </View>
      ))}
    </View>
  ),
};
