import React from 'react';
import {
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import Svg, {
  Circle,
  Defs,
  Ellipse,
  LinearGradient,
  Path,
  RadialGradient,
  Stop,
} from 'react-native-svg';

import { COLORS } from '../../tokens';

export type AIOrbSize = 'avatar' | 'medium' | 'hero';

export type AIOrbState =
  | 'idle'
  | 'ready'
  | 'thinking'
  | 'success'
  | 'error';

export interface AIOrbProps {
  size?: AIOrbSize;
  state?: AIOrbState;
  showFace?: boolean;
  showOrbit?: boolean;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

const SIZE_MAP: Record<AIOrbSize, number> = {
  avatar: 36,
  medium: 96,
  hero: 180,
};

const getStateAccent = (state: AIOrbState) => {
  switch (state) {
    case 'success':
      return COLORS.status.success;

    case 'error':
      return COLORS.status.error;

    case 'thinking':
      return COLORS.brand.secondary;

    case 'ready':
      return COLORS.brand.accentGreen;

    case 'idle':
    default:
      return COLORS.brand.primary;
  }
};

export const AIOrb = ({
  size = 'medium',
  state = 'idle',
  showFace = true,
  showOrbit = true,
  accessibilityLabel,
  style,
}: AIOrbProps) => {
  const dimension = SIZE_MAP[size];
  const accent = getStateAccent(state);

  return (
    <View
      accessible={Boolean(accessibilityLabel)}
      accessibilityRole={accessibilityLabel ? 'image' : undefined}
      accessibilityLabel={accessibilityLabel}
      style={[
        styles.container,
        {
          width: dimension,
          height: dimension,
        },
        style,
      ]}
    >
      <Svg
        width="100%"
        height="100%"
        viewBox="0 0 120 120"
      >
        <Defs>
          <RadialGradient
            id="halo"
            cx="50%"
            cy="45%"
            r="55%"
          >
            <Stop
              offset="0%"
              stopColor={COLORS.brand.secondary}
              stopOpacity={0.22}
            />

            <Stop
              offset="55%"
              stopColor={COLORS.brand.primary}
              stopOpacity={0.1}
            />

            <Stop
              offset="100%"
              stopColor={COLORS.brand.primary}
              stopOpacity={0}
            />
          </RadialGradient>

          <LinearGradient
            id="orb"
            x1="10%"
            y1="10%"
            x2="90%"
            y2="90%"
          >
            <Stop
              offset="0%"
              stopColor={COLORS.brand.softBlue}
            />

            <Stop
              offset="38%"
              stopColor={COLORS.brand.secondary}
            />

            <Stop
              offset="68%"
              stopColor={COLORS.brand.primary}
            />

            <Stop
              offset="100%"
              stopColor={COLORS.brand.accentGreen}
            />
          </LinearGradient>

          <RadialGradient
            id="shine"
            cx="30%"
            cy="25%"
            r="65%"
          >
            <Stop
              offset="0%"
              stopColor="#FFFFFF"
              stopOpacity={0.72}
            />

            <Stop
              offset="40%"
              stopColor="#FFFFFF"
              stopOpacity={0.18}
            />

            <Stop
              offset="100%"
              stopColor="#FFFFFF"
              stopOpacity={0}
            />
          </RadialGradient>
        </Defs>

        <Circle
          cx="60"
          cy="60"
          r="55"
          fill="url(#halo)"
        />

        {showOrbit ? (
          <>
            <Ellipse
              cx="60"
              cy="60"
              rx="53"
              ry="29"
              fill="none"
              stroke={accent}
              strokeWidth="1.2"
              strokeOpacity="0.3"
              transform="rotate(-18 60 60)"
            />

            <Circle
              cx="102"
              cy="47"
              r="2.6"
              fill={COLORS.brand.accentGreen}
              opacity="0.9"
            />

            <Circle
              cx="21"
              cy="73"
              r="1.8"
              fill={COLORS.brand.secondary}
              opacity="0.65"
            />
          </>
        ) : null}

        <Circle
          cx="60"
          cy="60"
          r="36"
          fill="url(#orb)"
        />

        <Circle
          cx="60"
          cy="60"
          r="35"
          fill="url(#shine)"
        />

        <Circle
          cx="60"
          cy="60"
          r="36"
          fill="none"
          stroke="#FFFFFF"
          strokeOpacity="0.34"
          strokeWidth="1"
        />

        {showFace ? (
          <>
            <Path
              d="M45 58 Q49 62 53 58"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2.4"
              strokeLinecap="round"
              opacity="0.9"
            />

            <Path
              d="M67 58 Q71 62 75 58"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2.4"
              strokeLinecap="round"
              opacity="0.9"
            />

            <Path
              d="M53 70 Q60 75 67 70"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.72"
            />
          </>
        ) : null}

        <Circle
          cx="91"
          cy="23"
          r="2"
          fill={accent}
          opacity="0.75"
        />

        <Circle
          cx="28"
          cy="31"
          r="1.4"
          fill={COLORS.brand.softBlue}
          opacity="0.85"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
