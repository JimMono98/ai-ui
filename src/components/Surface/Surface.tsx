import React, { ReactNode } from 'react';
import {
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';

import {
  COLORS,
  RADIUS,
  SHADOWS,
} from '../../tokens';

export type SurfaceVariant = 'default' | 'subtle' | 'elevated';

export interface SurfaceProps
  extends Omit<ViewProps, 'children' | 'style'> {
  children: ReactNode;
  variant?: SurfaceVariant;
  radius?: number;
  style?: StyleProp<ViewStyle>;
}

export const Surface = ({
  children,
  variant = 'default',
  radius = RADIUS.SIZE_24,
  style,
  ...viewProps
}: SurfaceProps) => {
  return (
    <View
      {...viewProps}
      style={[
        styles.base,
        { borderRadius: radius },
        variant === 'default' && styles.default,
        variant === 'subtle' && styles.subtle,
        variant === 'elevated' && styles.elevated,
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    overflow: 'hidden',
  },

  default: {
    backgroundColor: COLORS.surface.default,
    borderWidth: 1,
    borderColor: COLORS.border.default,
  },

  subtle: {
    backgroundColor: COLORS.surface.subtle,
    borderWidth: 1,
    borderColor: 'transparent',
  },

  elevated: {
    backgroundColor: COLORS.surface.elevated,
    borderWidth: 1,
    borderColor: COLORS.border.default,

    shadowColor: COLORS.text.primary,
    shadowOffset: {
      width: SHADOWS.card.x,
      height: SHADOWS.card.y,
    },
    shadowOpacity: SHADOWS.card.opacity,
    shadowRadius: SHADOWS.card.blur / 2,

    elevation: 4,
  },
});
