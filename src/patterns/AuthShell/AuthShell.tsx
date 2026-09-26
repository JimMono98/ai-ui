import React, { ReactNode } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import { useResponsive } from '../../hooks';
import {
  COLORS,
  LAYOUT,
  SPACING,
} from '../../tokens';

export interface AuthShellProps {
  children: ReactNode;
  visual?: ReactNode;
  contentStyle?: StyleProp<ViewStyle>;
  visualStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  keyboardVerticalOffset?: number;
}

export const AuthShell = ({
  children,
  visual,
  contentStyle,
  visualStyle,
  style,
  keyboardVerticalOffset = 0,
}: AuthShellProps) => {
  const {
    isMobile,
    isTablet,
    isDesktop,
    horizontalPadding,
  } = useResponsive();

  const contentMaxWidth = isDesktop
    ? LAYOUT.desktop.authFormMaxWidth
    : isTablet
      ? LAYOUT.tablet.contentMaxWidth
      : LAYOUT.mobile.maxWidth;

  if (isDesktop) {
    return (
      <View style={[styles.desktopRoot, style]}>
        <View style={[styles.desktopVisual, visualStyle]}>
          {visual}
        </View>

        <View style={styles.desktopFunctionalPanel}>
          <View
            style={[
              styles.desktopContent,
              {
                maxWidth: contentMaxWidth,
              },
              contentStyle,
            ]}
          >
            {children}
          </View>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={[styles.mobileRoot, style]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingHorizontal: horizontalPadding,
          },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.stackedContent,
            {
              maxWidth: contentMaxWidth,
            },
          ]}
        >
          {visual ? (
            <View
              style={[
                styles.mobileVisual,
                isMobile && styles.mobileVisualCompact,
                visualStyle,
              ]}
            >
              {visual}
            </View>
          ) : null}

          <View
            style={[
              styles.mobileContent,
              contentStyle,
            ]}
          >
            {children}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  mobileRoot: {
    flex: 1,
    backgroundColor: COLORS.background.base,
  },

  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.SIZE_32,
  },

  stackedContent: {
    width: '100%',
    alignItems: 'center',
    gap: SPACING.SIZE_24,
  },

  mobileVisual: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 180,
  },

  mobileVisualCompact: {
    minHeight: 150,
  },

  mobileContent: {
    width: '100%',
    gap: SPACING.SIZE_24,
  },

  desktopRoot: {
    flex: 1,
    minHeight: '100%',
    flexDirection: 'row',
    backgroundColor: COLORS.background.base,
  },

  desktopVisual: {
    flex: 1.35,
    minWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.SIZE_48,
    backgroundColor: COLORS.background.subtle,
    overflow: 'hidden',
  },

  desktopFunctionalPanel: {
    flex: 1,
    minWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.SIZE_48,
    paddingVertical: SPACING.SIZE_48,
    backgroundColor: COLORS.surface.default,
  },

  desktopContent: {
    width: '100%',
    gap: SPACING.SIZE_24,
  },
});
