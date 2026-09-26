import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React from 'react';
import { Text, View } from 'react-native';

import {
  COLORS,
  RADIUS,
  SPACING,
  TYPOGRAPHY,
} from '../tokens';

const groups = Object.entries(COLORS);

const meta = {
  title: 'Foundations/Colors',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Palette: Story = {
  render: () => (
    <View style={{ gap: SPACING.SIZE_32 }}>
      {groups.map(([groupName, values]) => (
        <View
          key={groupName}
          style={{ gap: SPACING.SIZE_12 }}
        >
          <Text
            style={{
              ...TYPOGRAPHY.headingM,
              color: COLORS.text.primary,
            }}
          >
            {groupName}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: SPACING.SIZE_16,
            }}
          >
            {Object.entries(values).map(([name, value]) => (
              <View
                key={`${groupName}.${name}`}
                style={{
                  width: 180,
                  gap: SPACING.SIZE_08,
                }}
              >
                <View
                  style={{
                    width: '100%',
                    height: 72,
                    borderRadius: RADIUS.SIZE_16,
                    backgroundColor: value,
                    borderWidth: 1,
                    borderColor: COLORS.border.default,
                  }}
                />

                <Text
                  style={{
                    ...TYPOGRAPHY.labelM,
                    color: COLORS.text.primary,
                  }}
                >
                  {groupName}.{name}
                </Text>

                <Text
                  style={{
                    ...TYPOGRAPHY.caption,
                    color: COLORS.text.secondary,
                  }}
                >
                  {value}
                </Text>
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  ),
};
