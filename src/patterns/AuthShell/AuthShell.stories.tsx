import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React from 'react';
import { Text, View } from 'react-native';

import { AIOrb } from '../../components/AIOrb';
import { Button } from '../../components/Button';
import { PasswordInput } from '../../components/PasswordInput';
import { TextInput } from '../../components/TextInput';
import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
} from '../../tokens';
import { AuthFooterAction } from '../AuthFooterAction';
import { AuthHeader } from '../AuthHeader';
import { AuthShell } from './AuthShell';

const DemoVisual = () => (
  <View
    style={{
      alignItems: 'center',
      gap: SPACING.SIZE_16,
      maxWidth: 420,
    }}
  >
    <AIOrb
      size="hero"
      accessibilityLabel="AI visual"
    />
    <Text
      style={{
        ...TYPOGRAPHY.headingL,
        color: COLORS.text.primary,
        textAlign: 'center',
      }}
    >
      Think clearly. Build confidently.
    </Text>
    <Text
      style={{
        ...TYPOGRAPHY.bodyM,
        color: COLORS.text.secondary,
        textAlign: 'center',
      }}
    >
      A generic visual slot can contain reusable brand or product content.
    </Text>
  </View>
);

const DemoContent = ({ long = false }: { long?: boolean }) => (
  <>
    <AuthHeader
      title="Continue to your account"
      subtitle={
        long
          ? 'This intentionally longer supporting message demonstrates how the generic shell behaves when content grows or translations require additional room.'
          : 'Enter your details to continue.'
      }
    />

    <View style={{ gap: SPACING.SIZE_16 }}>
      <TextInput
        label="Email"
        placeholder="you@example.com"
      />
      <PasswordInput
        label="Password"
        placeholder="Enter your password"
      />
    </View>

    <Button
      label="Continue"
      fullWidth
    />

    <AuthFooterAction
      text="Need another option?"
      actionLabel="Continue here"
      onPress={() => undefined}
    />
  </>
);

const meta = {
  title: 'Patterns/AuthShell',
  component: AuthShell,
  args: {
    children: null,
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Responsive presentation-only shell for generic authentication or account-entry flows.',
      },
    },
  },
} satisfies Meta<typeof AuthShell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => (
    <AuthShell visual={<DemoVisual />}>
      <DemoContent />
    </AuthShell>
  ),
};

export const MobileLike: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: () => (
    <AuthShell visual={<AIOrb size="medium" accessibilityLabel="AI visual" />}>
      <DemoContent />
    </AuthShell>
  ),
};

export const TabletLike: Story = {
  render: () => (
    <View style={{ width: 768, minHeight: 800 }}>
      <AuthShell visual={<AIOrb size="medium" accessibilityLabel="AI visual" />}>
        <DemoContent />
      </AuthShell>
    </View>
  ),
};

export const DesktopSplit: Story = {
  render: () => (
    <View style={{ width: 1280, height: 800 }}>
      <AuthShell visual={<DemoVisual />}>
        <DemoContent />
      </AuthShell>
    </View>
  ),
};

export const WithoutVisual: Story = {
  render: () => (
    <AuthShell>
      <DemoContent />
    </AuthShell>
  ),
};

export const LongContent: Story = {
  render: () => (
    <AuthShell visual={<DemoVisual />}>
      <DemoContent long />
    </AuthShell>
  ),
};
