import React, { ReactNode, useState } from 'react';
import {
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

export type ChipVariant = 'neutral' | 'accent';
export type ChipState = 'default' | 'selected';

export interface ChipProps
  extends Omit<PressableProps, 'children' | 'style'> {
  label: string;
  variant?: ChipVariant;
  state?: ChipState;
  leadingIcon?: ReactNode;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

export const Chip = ({
  label,
  variant = 'neutral',
  state = 'default',
  leadingIcon,
  style,
  labelStyle,
  accessibilityLabel,
  onHoverIn,
  onHoverOut,
  onFocus,
  onBlur,
  ...pressableProps
}: ChipProps) => {
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

  return (
    <Pressable
      {...pressableProps}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      onHoverIn={handleHoverIn}
      onHoverOut={handleHoverOut}
      onFocus={handleFocus}
      onBlur={handleBlur}
      style={({ pressed }) => [
        styles.base,
        getChipStyle({
          variant,
          state,
          pressed,
          hovered,
          focused,
        }),
        style,
      ]}
    >
      {leadingIcon ? (
        <View style={styles.icon}>
          {leadingIcon}
        </View>
      ) : null}

      <Text
        numberOfLines={2}
        style={[
          styles.label,
          getLabelStyle({
            variant,
            state,
          }),
          labelStyle,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
};

interface ChipStyleParams {
  variant: ChipVariant;
  state: ChipState;
  pressed: boolean;
  hovered: boolean;
  focused: boolean;
}

const getChipStyle = ({
  variant,
  state,
  pressed,
  hovered,
  focused,
}: ChipStyleParams): ViewStyle => {
  const selected = state === 'selected';

  if (variant === 'accent') {
    return {
      backgroundColor: pressed
        ? COLORS.chat.assistantAccent
        : selected
          ? COLORS.brand.softBlue
          : hovered
            ? COLORS.background.muted
            : COLORS.background.subtle,
      borderColor: focused || selected
        ? COLORS.border.focus
        : COLORS.border.default,
    };
  }

  return {
    backgroundColor: pressed
      ? COLORS.background.muted
      : selected
        ? COLORS.action.secondary
        : hovered
          ? COLORS.background.subtle
          : COLORS.surface.default,
    borderColor: focused || selected
      ? COLORS.border.focus
      : COLORS.border.default,
  };
};

interface LabelStyleParams {
  variant: ChipVariant;
  state: ChipState;
}

const getLabelStyle = ({
  variant,
  state,
}: LabelStyleParams): TextStyle => {
  if (variant === 'accent' || state === 'selected') {
    return {
      color: COLORS.action.primary,
    };
  }

  return {
    color: COLORS.text.primary,
  };
};

const styles = StyleSheet.create({
  base: {
    minHeight: CONTROL_SIZE.height.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.SIZE_08,
    paddingHorizontal: SPACING.SIZE_16,
    paddingVertical: SPACING.SIZE_08,
    borderRadius: RADIUS.FULL,
    borderWidth: 1,
  },

  icon: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  label: {
    ...TYPOGRAPHY.labelM,
    flexShrink: 1,
    textAlign: 'center',
  },
});
