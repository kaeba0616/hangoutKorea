export const colors = {
  brand: {
    primary: '#81E2C9',
    secondary: '#C3E956',
  },
  text: {
    primary: '#000000',
    secondary: '#797979',
    tertiary: '#B0B0B0',
    inverse: '#FFFFFF',
  },
  surface: {
    background: '#FFFFFF',
    muted: '#F5F5F5',
    divider: '#E5E7EB',
    field: '#F7F7F7',
  },
  state: {
    success: '#22C55E',
    error: '#EF4444',
    warning: '#F59E0B',
    info: '#3B82F6',
  },
  sns: {
    line: '#06C755',
    lineText: '#FFFFFF',
    apple: '#000000',
    appleText: '#FFFFFF',
    kakao: '#FEE500',
    kakaoText: '#000000',
  },
  effect: {
    primaryButtonShadow: 'rgba(129, 226, 201, 0.5)',
  },
} as const;

export const spacing = {
  '0': 0,
  '2': 2,
  '4': 4,
  '6': 6,
  '8': 8,
  '12': 12,
  '16': 16,
  '20': 20,
  '24': 24,
  '32': 32,
  '40': 40,
  '48': 48,
  '56': 56,
  '64': 64,
  '80': 80,
} as const;

export const radius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  full: 999,
} as const;

export const typography = {
  fontFamily: {
    sans: 'Pretendard-Regular',
    bold: 'Pretendard-Bold',
  },
  size: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 22,
    '2xl': 28,
    '3xl': 32,
    '4xl': 38,
  },
  lineHeight: {
    xs: 16,
    sm: 18,
    md: 20,
    lg: 22,
    xl: 28,
    '2xl': 32,
    '3xl': 36,
    '4xl': 42,
  },
  letterSpacing: -0.15,
} as const;

export const shadow = {
  primaryButton: {
    shadowColor: colors.brand.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 6,
  },
  card: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
} as const;

export const layout = {
  screenWidth: 375,
  screenPaddingX: 16,
  contentPaddingX: 24,
  buttonHeight: 56,
  appBarHeight: 64,
} as const;

export const theme = {
  colors,
  spacing,
  radius,
  typography,
  shadow,
  layout,
} as const;

export type AppTheme = typeof theme;
