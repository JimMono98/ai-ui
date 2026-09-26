export const BREAKPOINTS = {
  mobile: 0,
  tablet: 768,
  desktop: 1200,
} as const;

export const LAYOUT = {
  mobile: {
    horizontalPadding: 24,
    maxWidth: 480,
  },
  tablet: {
    horizontalPadding: 32,
    contentMaxWidth: 560,
  },
  desktop: {
    horizontalPadding: 48,
    authFormMaxWidth: 440,
    chatContentMaxWidth: 820,
    sidebarWidth: 280,
  },
} as const;

export const CONTROL_SIZE = {
  height: {
    sm: 44,
    md: 48,
    lg: 54,
    input: 54,
  },
  icon: {
    sm: 16,
    md: 20,
    lg: 24,
  },
} as const;
