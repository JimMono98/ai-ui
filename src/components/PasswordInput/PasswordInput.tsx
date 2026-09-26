import React, { ReactNode, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { COLORS, CONTROL_SIZE, TYPOGRAPHY } from '../../tokens';
import {
  TextInput,
  TextInputProps,
} from '../TextInput';

export interface PasswordInputProps
  extends Omit<TextInputProps, 'secureTextEntry' | 'trailingIcon'> {
  showPasswordIcon?: ReactNode;
  hidePasswordIcon?: ReactNode;
  showPasswordLabel?: string;
  hidePasswordLabel?: string;
}

export const PasswordInput = ({
  showPasswordIcon,
  hidePasswordIcon,
  showPasswordLabel = 'Show',
  hidePasswordLabel = 'Hide',
  ...inputProps
}: PasswordInputProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const accessibilityLabel = isVisible
    ? hidePasswordLabel
    : showPasswordLabel;

  const icon = isVisible
    ? hidePasswordIcon
    : showPasswordIcon;

  const toggle = (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      hitSlop={4}
      onPress={() => setIsVisible(current => !current)}
      style={({ pressed }) => [
        styles.visibilityButton,
        pressed && styles.visibilityButtonPressed,
      ]}
    >
      {icon ? (
        <View style={styles.icon}>
          {icon}
        </View>
      ) : (
        <Text style={styles.fallbackLabel}>
          {isVisible ? hidePasswordLabel : showPasswordLabel}
        </Text>
      )}
    </Pressable>
  );

  return (
    <TextInput
      {...inputProps}
      secureTextEntry={!isVisible}
      autoCapitalize="none"
      autoCorrect={false}
      trailingIcon={toggle}
    />
  );
};

const styles = StyleSheet.create({
  visibilityButton: {
    minWidth: CONTROL_SIZE.height.sm,
    minHeight: CONTROL_SIZE.height.sm,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: CONTROL_SIZE.height.sm / 2,
  },

  visibilityButtonPressed: {
    backgroundColor: COLORS.background.muted,
  },

  icon: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  fallbackLabel: {
    ...TYPOGRAPHY.labelM,
    color: COLORS.action.primary,
  },
});
