import React, { ReactNode, useState } from 'react';
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import {
  COLORS,
  CONTROL_SIZE,
  RADIUS,
} from '../../tokens';

export type IconButtonVariant = 'default' | 'ghost' | 'primary';
export type IconButtonSize = 'medium' | 'large';

export interface IconButtonProps
  extends Omit<PressableProps, 'children' | 'disabled' | 'style'> {
  icon: ReactNode;
  accessibilityLabel: string;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

const getSize = (size: IconButtonSize) =>
  size === 'large'
    ? CONTROL_SIZE.height.lg
    : CONTROL_SIZE.height.sm;

export const IconButton = ({
  icon,
  accessibilityLabel,
  variant = 'default',
  size = 'medium',
  disabled = false,
  style,
  onHoverIn,
  onHoverOut,
  onFocus,
  onBlur,
  ...pressableProps
}: IconButtonProps) => {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleHoverIn: NonNullable<PressableProps['onHoverIn']> = event => {
    setHovered(true);
    onHoverIn?.(event);
  };

  const handleHoverOut: NonNullable<PressableProps['onHoverOut']> = event => {
    setHovered(false);
    onHoverOut?.(event);
  };

  const handleFocus: NonNullable<PressableProps['onFocus']> = event => {
    setFocused(true);
    onFocus?.(event);
  };

  const handleBlur: NonNullable<PressableProps['onBlur']> = event => {
    setFocused(false);
    onBlur?.(event);
  };

  const dimension = getSize(size);

  return (
    <Pressable
      {...pressableProps}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onHoverIn={handleHoverIn}
      onHoverOut={handleHoverOut}
      onFocus={handleFocus}
      onBlur={handleBlur}
      style={({ pressed }) => [
        styles.base,
        {
          width: dimension,
          height: dimension,
          borderRadius: dimension / 2,
        },
        getVariantStyle({
          variant,
          pressed,
          hovered,
          focused,
          disabled,
        }),
        style,
      ]}
    >
      <View style={styles.icon}>
        {icon}
      </View>
    </Pressable>
  );
};

interface VariantStyleParams {
  variant: IconButtonVariant;
  pressed: boolean;
  hovered: boolean;
  focused: boolean;
  disabled: boolean;
}

const getVariantStyle = ({
  variant,
  pressed,
  hovered,
  focused,
  disabled,
}: VariantStyleParams): ViewStyle => {
  if (disabled) {
    return {
      backgroundColor: COLORS.background.muted,
      borderColor: COLORS.border.default,
      opacity: 0.55,
    };
  }

  if (variant === 'primary') {
    return {
      backgroundColor: pressed
        ? COLORS.action.primaryPressed
        : hovered
          ? COLORS.action.primaryHover
          : COLORS.action.primary,
      borderColor: focused
        ? COLORS.border.focus
        : 'transparent',
    };
  }

  if (variant === 'ghost') {
    return {
      backgroundColor: pressed
        ? COLORS.background.muted
        : hovered
          ? COLORS.background.subtle
          : 'transparent',
      borderColor: focused
        ? COLORS.border.focus
        : 'transparent',
    };
  }

  return {
    backgroundColor: pressed
      ? COLORS.background.muted
      : hovered
        ? COLORS.background.subtle
        : COLORS.surface.default,
    borderColor: focused
      ? COLORS.border.focus
      : COLORS.border.default,
  };
};

const styles = StyleSheet.create({
  base: {
    minWidth: CONTROL_SIZE.height.sm,
    minHeight: CONTROL_SIZE.height.sm,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },

  icon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
