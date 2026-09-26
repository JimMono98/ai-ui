import React, { ReactNode, useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
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

export interface TextInputProps
  extends Omit<RNTextInputProps, 'style'> {
  label?: string;
  helperText?: string;
  error?: string;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
}

export const TextInput = ({
  label,
  helperText,
  error,
  leadingIcon,
  trailingIcon,
  editable = true,
  containerStyle,
  inputContainerStyle,
  inputStyle,
  onFocus,
  onBlur,
  accessibilityLabel,
  placeholderTextColor = COLORS.text.tertiary,
  ...inputProps
}: TextInputProps) => {
  const [focused, setFocused] = useState(false);

  const hasError = Boolean(error);
  const isDisabled = !editable;

  const handleFocus: NonNullable<RNTextInputProps['onFocus']> = event => {
    setFocused(true);
    onFocus?.(event);
  };

  const handleBlur: NonNullable<RNTextInputProps['onBlur']> = event => {
    setFocused(false);
    onBlur?.(event);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? (
        <Text style={styles.label}>
          {label}
        </Text>
      ) : null}

      <View
        style={[
          styles.inputContainer,
          focused && styles.focused,
          hasError && styles.error,
          isDisabled && styles.disabled,
          inputContainerStyle,
        ]}
      >
        {leadingIcon ? (
          <View style={styles.iconContainer}>
            {leadingIcon}
          </View>
        ) : null}

        <RNTextInput
          {...inputProps}
          accessibilityLabel={accessibilityLabel ?? label}
          accessibilityState={{
            disabled: isDisabled,
          }}
          editable={editable}
          placeholderTextColor={placeholderTextColor}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={[
            styles.input,
            isDisabled && styles.disabledInput,
            inputStyle,
          ]}
        />

        {trailingIcon ? (
          <View style={styles.iconContainer}>
            {trailingIcon}
          </View>
        ) : null}
      </View>

      {hasError ? (
        <Text
          accessibilityLiveRegion="polite"
          style={styles.errorText}
        >
          {error}
        </Text>
      ) : helperText ? (
        <Text style={styles.helperText}>
          {helperText}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: SPACING.SIZE_08,
  },

  label: {
    ...TYPOGRAPHY.labelM,
    color: COLORS.text.primary,
  },

  inputContainer: {
    width: '100%',
    minHeight: CONTROL_SIZE.height.input,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.SIZE_16,
    borderWidth: 1,
    borderColor: COLORS.border.default,
    borderRadius: RADIUS.SIZE_16,
    backgroundColor: COLORS.surface.default,
  },

  focused: {
    borderColor: COLORS.border.focus,
  },

  error: {
    borderColor: COLORS.border.error,
  },

  disabled: {
    backgroundColor: COLORS.background.muted,
    borderColor: COLORS.border.default,
  },

  input: {
    ...TYPOGRAPHY.bodyM,
    flex: 1,
    minWidth: 0,
    minHeight: CONTROL_SIZE.height.input - 2,
    paddingVertical: 0,
    color: COLORS.text.primary,
  },

  disabledInput: {
    color: COLORS.text.tertiary,
  },

  iconContainer: {
    width: CONTROL_SIZE.height.sm,
    minHeight: CONTROL_SIZE.height.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },

  helperText: {
    ...TYPOGRAPHY.bodyS,
    color: COLORS.text.secondary,
  },

  errorText: {
    ...TYPOGRAPHY.bodyS,
    color: COLORS.status.error,
  },
});
