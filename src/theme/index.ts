import {
  BREAKPOINTS,
  COLORS,
  CONTROL_SIZE,
  FONT_FAMILY,
  LAYOUT,
  MOTION,
  RADIUS,
  SHADOWS,
  SPACING,
  TYPOGRAPHY,
} from '../tokens';

export const THEME = {
  colors: COLORS,
  spacing: SPACING,
  radius: RADIUS,
  typography: TYPOGRAPHY,
  fontFamily: FONT_FAMILY,
  layout: LAYOUT,
  breakpoints: BREAKPOINTS,
  controlSize: CONTROL_SIZE,
  motion: MOTION,
  shadows: SHADOWS,
} as const;

export type Theme = typeof THEME;
