import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
} from '../../tokens';

export interface AuthHeaderProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  align?: 'left' | 'center';
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  subtitleStyle?: StyleProp<TextStyle>;
}

export const AuthHeader = ({
  title,
  subtitle,
  eyebrow,
  align = 'left',
  style,
  titleStyle,
  subtitleStyle,
}: AuthHeaderProps) => {
  const centered = align === 'center';

  return (
    <View
      style={[
        styles.container,
        centered && styles.centered,
        style,
      ]}
    >
      {eyebrow ? (
        <Text
          style={[
            styles.eyebrow,
            centered && styles.centerText,
          ]}
        >
          {eyebrow}
        </Text>
      ) : null}

      <Text
        style={[
          styles.title,
          centered && styles.centerText,
          titleStyle,
        ]}
      >
        {title}
      </Text>

      {subtitle ? (
        <Text
          style={[
            styles.subtitle,
            centered && styles.centerText,
            subtitleStyle,
          ]}
        >
          {subtitle}
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

  centered: {
    alignItems: 'center',
  },

  eyebrow: {
    ...TYPOGRAPHY.labelM,
    color: COLORS.action.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },

  title: {
    ...TYPOGRAPHY.headingXL,
    color: COLORS.text.primary,
  },

  subtitle: {
    ...TYPOGRAPHY.bodyM,
    color: COLORS.text.secondary,
    maxWidth: 520,
  },

  centerText: {
    textAlign: 'center',
  },
});
