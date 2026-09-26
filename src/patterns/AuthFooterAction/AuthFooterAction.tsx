import React from 'react';
import {
  Pressable,
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
  SPACING,
  TYPOGRAPHY,
} from '../../tokens';

export interface AuthFooterActionProps {
  text: string;
  actionLabel: string;
  onPress: () => void;
  accessibilityLabel?: string;
  align?: 'left' | 'center';
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  actionStyle?: StyleProp<TextStyle>;
}

export const AuthFooterAction = ({
  text,
  actionLabel,
  onPress,
  accessibilityLabel,
  align = 'center',
  disabled = false,
  style,
  textStyle,
  actionStyle,
}: AuthFooterActionProps) => {
  return (
    <View
      style={[
        styles.container,
        align === 'center' && styles.centered,
        style,
      ]}
    >
      <Text style={[styles.text, textStyle]}>
        {text}
      </Text>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={
          accessibilityLabel ?? actionLabel
        }
        accessibilityState={{ disabled }}
        disabled={disabled}
        onPress={onPress}
        hitSlop={8}
        style={({ pressed }) => [
          styles.action,
          pressed && styles.actionPressed,
          disabled && styles.disabled,
        ]}
      >
        <Text style={[styles.actionText, actionStyle]}>
          {actionLabel}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: CONTROL_SIZE.height.sm,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: SPACING.SIZE_08,
  },

  centered: {
    justifyContent: 'center',
  },

  text: {
    ...TYPOGRAPHY.bodyS,
    color: COLORS.text.secondary,
  },

  action: {
    minHeight: CONTROL_SIZE.height.sm,
    justifyContent: 'center',
  },

  actionPressed: {
    opacity: 0.65,
  },

  disabled: {
    opacity: 0.5,
  },

  actionText: {
    ...TYPOGRAPHY.labelM,
    color: COLORS.action.primary,
  },
});
