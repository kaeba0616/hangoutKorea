const { colors, spacing, radius, typography } = require('./constants/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        'brand-primary': colors.brand.primary,
        'brand-secondary': colors.brand.secondary,
        'text-primary': colors.text.primary,
        'text-secondary': colors.text.secondary,
        'text-tertiary': colors.text.tertiary,
        'text-inverse': colors.text.inverse,
        'surface-bg': colors.surface.background,
        'surface-muted': colors.surface.muted,
        'surface-divider': colors.surface.divider,
        'surface-field': colors.surface.field,
        success: colors.state.success,
        error: colors.state.error,
        warning: colors.state.warning,
        info: colors.state.info,
        'sns-naver': colors.sns.naver,
        'sns-apple': colors.sns.apple,
        'sns-kakao': colors.sns.kakao,
      },
      spacing: spacing,
      borderRadius: {
        sm: `${radius.sm}px`,
        md: `${radius.md}px`,
        lg: `${radius.lg}px`,
        xl: `${radius.xl}px`,
        '2xl': `${radius['2xl']}px`,
        full: `${radius.full}px`,
      },
      fontFamily: {
        sans: [typography.fontFamily.sans],
        bold: [typography.fontFamily.bold],
      },
      fontSize: {
        xs: [`${typography.size.xs}px`, `${typography.lineHeight.xs}px`],
        sm: [`${typography.size.sm}px`, `${typography.lineHeight.sm}px`],
        md: [`${typography.size.md}px`, `${typography.lineHeight.md}px`],
        lg: [`${typography.size.lg}px`, `${typography.lineHeight.lg}px`],
        xl: [`${typography.size.xl}px`, `${typography.lineHeight.xl}px`],
        '2xl': [`${typography.size['2xl']}px`, `${typography.lineHeight['2xl']}px`],
        '3xl': [`${typography.size['3xl']}px`, `${typography.lineHeight['3xl']}px`],
        '4xl': [`${typography.size['4xl']}px`, `${typography.lineHeight['4xl']}px`],
      },
    },
  },
  plugins: [],
};
