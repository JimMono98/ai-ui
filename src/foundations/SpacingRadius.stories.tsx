import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React from 'react';
import { Text, View } from 'react-native';

import {
  COLORS,
  RADIUS,
  SPACING,
  TYPOGRAPHY,
} from '../tokens';

const meta = {
  title: 'Foundations/Spacing & Radius',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Tokens: Story = {
  render: () => (
    <View style={{ gap: SPACING.SIZE_48 }}>
      <View style={{ gap: SPACING.SIZE_16 }}>
        <Text
          style={{
            ...TYPOGRAPHY.headingL,
            color: COLORS.text.primary,
          }}
        >
          Spacing
        </Text>

        {Object.entries(SPACING).map(([name, value]) => (
          <View
            key={name}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: SPACING.SIZE_16,
            }}
          >
            <Text
              style={{
                ...TYPOGRAPHY.labelM,
                width: 90,
                color: COLORS.text.secondary,
              }}
            >
              {name}
            </Text>

            <View
              style={{
                width: value,
                height: SPACING.SIZE_16,
                backgroundColor: COLORS.brand.primary,
                borderRadius: RADIUS.SIZE_04,
              }}
            />

            <Text
              style={{
                ...TYPOGRAPHY.caption,
                color: COLORS.text.tertiary,
              }}
            >
              {value}px
            </Text>
          </View>
        ))}
      </View>

      <View style={{ gap: SPACING.SIZE_16 }}>
        <Text
          style={{
            ...TYPOGRAPHY.headingL,
            color: COLORS.text.primary,
          }}
        >
          Radius
        </Text>

        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: SPACING.SIZE_20,
          }}
        >
          {Object.entries(RADIUS).map(([name, value]) => (
            <View
              key={name}
              style={{
                alignItems: 'center',
                gap: SPACING.SIZE_08,
              }}
            >
              <View
                style={{
                  width: 72,
                  height: 72,
                  backgroundColor: COLORS.brand.softBlue,
                  borderRadius: value,
                  borderWidth: 1,
                  borderColor: COLORS.border.default,
                }}
              />

              <Text
                style={{
                  ...TYPOGRAPHY.labelM,
                  color: COLORS.text.secondary,
                }}
              >
                {name}
              </Text>

              <Text
                style={{
                  ...TYPOGRAPHY.caption,
                  color: COLORS.text.tertiary,
                }}
              >
                {value}px
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  ),
};
