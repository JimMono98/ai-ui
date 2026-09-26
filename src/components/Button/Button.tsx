import React, { ReactNode, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import {
  COLORS,
  CONTROL_SIZE,
  RADIUS,
  SPACING,
  TYPOGRAPHY,
} from '../../tokens';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'medium' | 'large';

export interface ButtonProps
  extends Omit<PressableProps, 'children' | 'disabled' | 'style'> {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

const getButtonHeight = (size: ButtonSize) =>
  size === 'large' ? CONTROL_SIZE.height.lg : CONTROL_SIZE.height.md;

export const Button = ({
  label,
  variant = 'primary',
  size = 'large',
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  style,
  labelStyle,
  accessibilityLabel,
  onHoverIn,
  onHoverOut,
  onFocus,
  onBlur,
  ...pressableProps
}: ButtonProps) => {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  const isDisabled = disabled || loading;

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

  return (
    <Pressable
      {...pressableProps}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{
        disabled: isDisabled,
        busy: loading,
      }}
      disabled={isDisabled}
      onHoverIn={handleHoverIn}
      onHoverOut={handleHoverOut}
      onFocus={handleFocus}
      onBlur={handleBlur}
      style={({ pressed }) => [
        styles.base,
        {
          minHeight: getButtonHeight(size),
        },
        fullWidth && styles.fullWidth,
        getVariantStyle({
          variant,
          pressed,
          hovered,
          focused,
          disabled: isDisabled,
        }),
        style,
      ]}
    >
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator
            size="small"
            color={
              variant === 'primary'
                ? COLORS.text.inverse
                : COLORS.action.primary
            }
          />
        ) : (
          <>
            {leftIcon ? <View style={styles.icon}>{leftIcon}</View> : null}

            <Text
              numberOfLines={2}
              style={[
                styles.label,
                variant === 'primary'
                  ? styles.primaryLabel
                  : styles.secondaryLabel,
                isDisabled && styles.disabledLabel,
                labelStyle,
              ]}
            >
              {label}
            </Text>

            {rightIcon ? <View style={styles.icon}>{rightIcon}</View> : null}
          </>
        )}
      </View>
    </Pressable>
  );
};

interface VariantStyleParams {
  variant: ButtonVariant;
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
    return variant === 'ghost'
      ? {
          backgroundColor: 'transparent',
          borderColor: 'transparent',
        }
      : {
          backgroundColor: COLORS.action.disabled,
          borderColor: COLORS.action.disabled,
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
        : pressed
          ? COLORS.action.primaryPressed
          : hovered
            ? COLORS.action.primaryHover
            : COLORS.action.primary,
    };
  }

  if (variant === 'secondary') {
    return {
      backgroundColor: pressed
        ? COLORS.background.muted
        : hovered
          ? COLORS.background.subtle
          : COLORS.action.secondary,
      borderColor: focused ? COLORS.border.focus : COLORS.border.default,
    };
  }

  return {
    backgroundColor: pressed
      ? COLORS.background.muted
      : hovered
        ? COLORS.background.subtle
        : 'transparent',
    borderColor: focused ? COLORS.border.focus : 'transparent',
  };
};

const styles = StyleSheet.create({
  base: {
    minWidth: CONTROL_SIZE.height.sm,
    paddingHorizontal: SPACING.SIZE_24,
    borderRadius: RADIUS.SIZE_16,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  fullWidth: {
    width: '100%',
  },

  content: {
    minHeight: CONTROL_SIZE.height.sm,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.SIZE_08,
  },

  label: {
    ...TYPOGRAPHY.labelL,
    textAlign: 'center',
    flexShrink: 1,
  },

  primaryLabel: {
    color: COLORS.text.inverse,
  },

  secondaryLabel: {
    color: COLORS.text.primary,
  },

  disabledLabel: {
    opacity: 0.7,
  },

  icon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
