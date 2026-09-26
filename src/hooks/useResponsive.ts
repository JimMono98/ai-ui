import { Platform, useWindowDimensions } from 'react-native';

import { BREAKPOINTS, LAYOUT } from '../tokens';

export type ResponsiveBreakpoint = 'mobile' | 'tablet' | 'desktop';

export const useResponsive = () => {
  const { width, height, fontScale } = useWindowDimensions();

  const isMobile = width < BREAKPOINTS.tablet;
  const isTablet =
    width >= BREAKPOINTS.tablet && width < BREAKPOINTS.desktop;
  const isDesktop = width >= BREAKPOINTS.desktop;

  const isWeb = Platform.OS === 'web';
  const isNative = !isWeb;

  const isWebMobile = isWeb && isMobile;
  const isWebTablet = isWeb && isTablet;
  const isWebDesktop = isWeb && isDesktop;

  const breakpoint: ResponsiveBreakpoint = isDesktop
    ? 'desktop'
    : isTablet
      ? 'tablet'
      : 'mobile';

  const horizontalPadding = isDesktop
    ? LAYOUT.desktop.horizontalPadding
    : isTablet
      ? LAYOUT.tablet.horizontalPadding
      : LAYOUT.mobile.horizontalPadding;

  return {
    width,
    height,
    fontScale,

    breakpoint,

    isMobile,
    isTablet,
    isDesktop,

    isWeb,
    isNative,

    isWebMobile,
    isWebTablet,
    isWebDesktop,

    horizontalPadding,
  } as const;
};
