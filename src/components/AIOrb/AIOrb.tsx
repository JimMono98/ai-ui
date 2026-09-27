import React, {
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import {
  AccessibilityInfo,
  Animated,
  Easing,
  Platform,
  StyleProp,
  StyleSheet,
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

import {
  COLORS,
  MOTION,
} from '../../tokens';

export type AIOrbSize =
  | 'avatar'
  | 'medium'
  | 'hero';

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

  /**
   * Enables ambient personality motion.
   *
   * Defaults to true for medium / hero
   * and false for avatar.
   */
  animated?: boolean;

  /**
   * Explicitly overrides the operating-system
   * reduced-motion preference when supplied.
   */
  reduceMotion?: boolean;

  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

const SIZE_MAP: Record<AIOrbSize, number> = {
  avatar: 40,
  medium: 112,
  hero: 200,
};

const getStateAccent = (
  state: AIOrbState,
) => {
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

const getMouthPath = (
  state: AIOrbState,
) => {
  switch (state) {
    case 'thinking':
      return 'M55 71 Q60 73 65 71';

    case 'error':
      return 'M53 74 Q60 68 67 74';

    case 'success':
      return 'M50 67 Q60 81 70 67';

    case 'ready':
      return 'M51 68 Q60 79 69 68';

    case 'idle':
    default:
      return 'M52 69 Q60 77 68 69';
  }
};

const useReducedMotion = (
  explicitValue?: boolean,
) => {
  const [
    systemReducedMotion,
    setSystemReducedMotion,
  ] = useState(false);

  useEffect(() => {
    if (explicitValue !== undefined) {
      return;
    }

    let active = true;

    AccessibilityInfo
      .isReduceMotionEnabled()
      .then(enabled => {
        if (active) {
          setSystemReducedMotion(enabled);
        }
      })
      .catch(() => {
        // Reduced-motion detection is best effort.
      });

    const subscription =
      AccessibilityInfo.addEventListener?.(
        'reduceMotionChanged',
        enabled => {
          if (active) {
            setSystemReducedMotion(enabled);
          }
        },
      );

    return () => {
      active = false;
      subscription?.remove?.();
    };
  }, [explicitValue]);

  return explicitValue ??
    systemReducedMotion;
};

export const AIOrb = ({
  size = 'medium',
  state = 'idle',
  showFace = true,
  showOrbit = true,
  animated,
  reduceMotion,
  accessibilityLabel,
  style,
}: AIOrbProps) => {
  const dimension = SIZE_MAP[size];
  const accent = getStateAccent(state);

  const prefersReducedMotion =
    useReducedMotion(reduceMotion);

  const motionRequested =
    animated ?? size !== 'avatar';

  const shouldAnimate =
    motionRequested &&
    !prefersReducedMotion;

  const svgId = useId()
    .replace(/:/g, '');

  const haloGradientId =
    `ai-orb-halo-${svgId}`;

  const bodyGradientId =
    `ai-orb-body-${svgId}`;

  const shineGradientId =
    `ai-orb-shine-${svgId}`;

  const sway = useRef(
    new Animated.Value(0),
  ).current;

  const float = useRef(
    new Animated.Value(0),
  ).current;

  const breath = useRef(
    new Animated.Value(0),
  ).current;

  const morph = useRef(
    new Animated.Value(0),
  ).current;

  const orbit = useRef(
    new Animated.Value(0),
  ).current;

  const [
    isBlinking,
    setIsBlinking,
  ] = useState(false);

  useEffect(() => {
    sway.setValue(0);
    float.setValue(0);
    breath.setValue(0);
    morph.setValue(0);
    orbit.setValue(0);

    if (!shouldAnimate) {
      return;
    }

    const useNativeDriver =
      Platform.OS !== 'web';

    const softEase =
      Easing.inOut(Easing.ease);

    const swayAnimation =
      Animated.loop(
        Animated.sequence([
          Animated.timing(sway, {
            toValue: 1,
            duration:
              MOTION.ambient + 800,
            easing: softEase,
            useNativeDriver,
          }),

          Animated.timing(sway, {
            toValue: -1,
            duration:
              MOTION.ambient + 1600,
            easing: softEase,
            useNativeDriver,
          }),

          Animated.timing(sway, {
            toValue: 0,
            duration:
              MOTION.ambient + 800,
            easing: softEase,
            useNativeDriver,
          }),
        ]),
      );

    const floatAnimation =
      Animated.loop(
        Animated.sequence([
          Animated.timing(float, {
            toValue: 1,
            duration:
              MOTION.ambient,
            easing: softEase,
            useNativeDriver,
          }),

          Animated.timing(float, {
            toValue: 0,
            duration:
              MOTION.ambient,
            easing: softEase,
            useNativeDriver,
          }),
        ]),
      );

    const breathAnimation =
      Animated.loop(
        Animated.sequence([
          Animated.timing(breath, {
            toValue: 1,
            duration:
              MOTION.ambient + 400,
            easing: softEase,
            useNativeDriver,
          }),

          Animated.timing(breath, {
            toValue: 0,
            duration:
              MOTION.ambient + 400,
            easing: softEase,
            useNativeDriver,
          }),
        ]),
      );

    const morphAnimation =
      Animated.loop(
        Animated.sequence([
          Animated.timing(morph, {
            toValue: 1,
            duration:
              MOTION.ambient + 1000,
            easing: softEase,
            useNativeDriver,
          }),

          Animated.timing(morph, {
            toValue: -1,
            duration:
              MOTION.ambient + 1800,
            easing: softEase,
            useNativeDriver,
          }),

          Animated.timing(morph, {
            toValue: 0,
            duration:
              MOTION.ambient + 1000,
            easing: softEase,
            useNativeDriver,
          }),
        ]),
      );

    const orbitAnimation =
      Animated.loop(
        Animated.timing(orbit, {
          toValue: 1,
          duration:
            MOTION.ambient * 4,
          easing: Easing.linear,
          useNativeDriver,
        }),
      );

    const animations = [
      swayAnimation,
      floatAnimation,
      breathAnimation,
      morphAnimation,
      orbitAnimation,
    ];

    animations.forEach(
      animation => animation.start(),
    );

    return () => {
      animations.forEach(
        animation => animation.stop(),
      );

      sway.setValue(0);
      float.setValue(0);
      breath.setValue(0);
      morph.setValue(0);
      orbit.setValue(0);
    };
  }, [
    shouldAnimate,
    sway,
    float,
    breath,
    morph,
    orbit,
  ]);

  useEffect(() => {
    if (
      !showFace ||
      !shouldAnimate
    ) {
      setIsBlinking(false);
      return;
    }

    let nextBlink:
      | ReturnType<typeof setTimeout>
      | undefined;

    let reopen:
      | ReturnType<typeof setTimeout>
      | undefined;

    const blink = () => {
      setIsBlinking(true);

      reopen = setTimeout(() => {
        setIsBlinking(false);

        nextBlink = setTimeout(
          blink,
          3600,
        );
      }, 130);
    };

    nextBlink = setTimeout(
      blink,
      2400,
    );

    return () => {
      if (nextBlink) {
        clearTimeout(nextBlink);
      }

      if (reopen) {
        clearTimeout(reopen);
      }

      setIsBlinking(false);
    };
  }, [
    showFace,
    shouldAnimate,
  ]);

  const swayAmplitude =
    size === 'hero'
      ? 10
      : size === 'medium'
        ? 6
        : 2;

  const floatAmplitude =
    size === 'hero'
      ? 8
      : size === 'medium'
        ? 5
        : 1;

  const translateX =
    sway.interpolate({
      inputRange: [-1, 0, 1],
      outputRange: [
        -swayAmplitude,
        0,
        swayAmplitude,
      ],
    });

  const translateY =
    float.interpolate({
      inputRange: [0, 1],
      outputRange: [
        0,
        -floatAmplitude,
      ],
    });

  const breathingScale =
    breath.interpolate({
      inputRange: [0, 1],
      outputRange: [
        1,
        size === 'avatar'
          ? 1.01
          : 1.025,
      ],
    });

  const morphScaleX =
    morph.interpolate({
      inputRange: [-1, 0, 1],
      outputRange: [
        0.97,
        1,
        1.045,
      ],
    });

  const morphScaleY =
    morph.interpolate({
      inputRange: [-1, 0, 1],
      outputRange: [
        1.035,
        1,
        0.965,
      ],
    });

  const morphRotation =
    morph.interpolate({
      inputRange: [-1, 0, 1],
      outputRange: [
        '-2.5deg',
        '0deg',
        '2deg',
      ],
    });

  const orbitRotation =
    orbit.interpolate({
      inputRange: [0, 1],
      outputRange: [
        '0deg',
        '360deg',
      ],
    });

  const auraScale =
    breath.interpolate({
      inputRange: [0, 1],
      outputRange: [
        0.96,
        1.06,
      ],
    });

  const auraOpacity =
    breath.interpolate({
      inputRange: [0, 1],
      outputRange: [
        0.72,
        1,
      ],
    });

  const happyEyes =
    state === 'idle' ||
    state === 'ready' ||
    state === 'success';

  const leftEyePath =
    isBlinking
      ? 'M45 60 L53 60'
      : happyEyes
        ? 'M45 60 Q49 54 53 60'
        : 'M45 58 Q49 62 53 58';

  const rightEyePath =
    isBlinking
      ? 'M67 60 L75 60'
      : happyEyes
        ? 'M67 60 Q71 54 75 60'
        : 'M67 58 Q71 62 75 58';

  const mouthPath =
    getMouthPath(state);

  return (
    <Animated.View
      accessible={
        Boolean(accessibilityLabel)
      }
      accessibilityRole={
        accessibilityLabel
          ? 'image'
          : undefined
      }
      accessibilityLabel={
        accessibilityLabel
      }
      style={[
        styles.container,
        {
          width: dimension,
          height: dimension,
        },
        style,
        {
          transform: [
            {
              translateX,
            },
            {
              translateY,
            },
            {
              scale:
                breathingScale,
            },
          ],
        },
      ]}
    >
      <Animated.View
        pointerEvents="none"
        style={[
          styles.layer,
          {
            opacity:
              auraOpacity,
            transform: [
              {
                scale:
                  auraScale,
              },
              {
                scaleX:
                  morphScaleX,
              },
              {
                scaleY:
                  morphScaleY,
              },
              {
                rotate:
                  morphRotation,
              },
            ],
          },
        ]}
      >
        <Svg
          width="100%"
          height="100%"
          viewBox="0 0 120 120"
        >
          <Defs>
            <RadialGradient
              id={haloGradientId}
              cx="50%"
              cy="48%"
              r="56%"
            >
              <Stop
                offset="0%"
                stopColor={
                  COLORS.brand.secondary
                }
                stopOpacity={0.28}
              />

              <Stop
                offset="50%"
                stopColor={
                  COLORS.brand.primary
                }
                stopOpacity={0.14}
              />

              <Stop
                offset="100%"
                stopColor={
                  COLORS.brand.primary
                }
                stopOpacity={0}
              />
            </RadialGradient>
          </Defs>

          <Path
            d="
              M60 5
              C83 4 106 20 111 43
              C117 68 103 95 79 108
              C57 120 28 112 13 90
              C-1 69 4 39 24 20
              C34 11 47 6 60 5
              Z
            "
            fill={`url(#${haloGradientId})`}
          />
        </Svg>
      </Animated.View>

      {showOrbit ? (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.layer,
            {
              transform: [
                {
                  rotate:
                    orbitRotation,
                },
              ],
            },
          ]}
        >
          <Svg
            width="100%"
            height="100%"
            viewBox="0 0 120 120"
          >
            <Ellipse
              cx="60"
              cy="60"
              rx="53"
              ry="29"
              fill="none"
              stroke={accent}
              strokeWidth="1.2"
              strokeOpacity="0.36"
              transform="
                rotate(-18 60 60)
              "
            />

            <Ellipse
              cx="60"
              cy="60"
              rx="47"
              ry="34"
              fill="none"
              stroke={
                COLORS.brand.softBlue
              }
              strokeWidth="0.8"
              strokeOpacity="0.22"
              transform="
                rotate(28 60 60)
              "
            />

            <Circle
              cx="103"
              cy="47"
              r="2.8"
              fill={
                COLORS.brand.accentGreen
              }
              opacity="0.95"
            />

            <Circle
              cx="21"
              cy="73"
              r="2"
              fill={
                COLORS.brand.secondary
              }
              opacity="0.75"
            />

            <Circle
              cx="76"
              cy="100"
              r="1.5"
              fill={
                COLORS.brand.softBlue
              }
              opacity="0.9"
            />
          </Svg>
        </Animated.View>
      ) : null}

      <Animated.View
        pointerEvents="none"
        style={[
          styles.layer,
          {
            transform: [
              {
                scaleX:
                  morphScaleX,
              },
              {
                scaleY:
                  morphScaleY,
              },
              {
                rotate:
                  morphRotation,
              },
            ],
          },
        ]}
      >
        <Svg
          width="100%"
          height="100%"
          viewBox="0 0 120 120"
        >
          <Defs>
            <LinearGradient
              id={bodyGradientId}
              x1="8%"
              y1="8%"
              x2="92%"
              y2="92%"
            >
              <Stop
                offset="0%"
                stopColor={
                  COLORS.brand.softBlue
                }
              />

              <Stop
                offset="34%"
                stopColor={
                  COLORS.brand.secondary
                }
              />

              <Stop
                offset="68%"
                stopColor={
                  COLORS.brand.primary
                }
              />

              <Stop
                offset="100%"
                stopColor={
                  COLORS.brand.accentGreen
                }
              />
            </LinearGradient>

            <RadialGradient
              id={shineGradientId}
              cx="29%"
              cy="23%"
              r="68%"
            >
              <Stop
                offset="0%"
                stopColor="#FFFFFF"
                stopOpacity={0.82}
              />

              <Stop
                offset="36%"
                stopColor="#FFFFFF"
                stopOpacity={0.22}
              />

              <Stop
                offset="100%"
                stopColor="#FFFFFF"
                stopOpacity={0}
              />
            </RadialGradient>
          </Defs>

          <Path
            d="
              M60 22
              C79 20 96 32 98 52
              C101 73 85 94 64 98
              C42 102 23 86 21 64
              C19 43 36 25 60 22
              Z
            "
            fill={`url(#${bodyGradientId})`}
          />

          <Path
            d="
              M60 23
              C78 22 94 33 96 52
              C98 71 84 91 64 95
              C44 99 26 84 24 64
              C22 45 38 27 60 23
              Z
            "
            fill={`url(#${shineGradientId})`}
          />

          <Path
            d="
              M60 22
              C79 20 96 32 98 52
              C101 73 85 94 64 98
              C42 102 23 86 21 64
              C19 43 36 25 60 22
              Z
            "
            fill="none"
            stroke="#FFFFFF"
            strokeOpacity="0.38"
            strokeWidth="1"
          />

          {showFace ? (
            <>
              <Path
                d={leftEyePath}
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.94"
              />

              <Path
                d={rightEyePath}
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.94"
              />

              <Path
                d={mouthPath}
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2.2"
                strokeLinecap="round"
                opacity="0.9"
              />

              {happyEyes ? (
                <>
                  <Circle
                    cx="39"
                    cy="68"
                    r="3.2"
                    fill="#FFFFFF"
                    opacity="0.1"
                  />

                  <Circle
                    cx="81"
                    cy="68"
                    r="3.2"
                    fill="#FFFFFF"
                    opacity="0.1"
                  />
                </>
              ) : null}
            </>
          ) : null}

          <Circle
            cx="46"
            cy="38"
            r="5"
            fill="#FFFFFF"
            opacity="0.18"
          />

          <Circle
            cx="42"
            cy="34"
            r="2"
            fill="#FFFFFF"
            opacity="0.34"
          />

          <Circle
            cx="91"
            cy="24"
            r="2"
            fill={accent}
            opacity="0.8"
          />
        </Svg>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },

  layer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
