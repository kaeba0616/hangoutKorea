import { Pressable, Text, ViewStyle } from 'react-native';
import { colors, layout, radius, typography } from '@/constants/theme';

type ButtonVariant = 'secondary' | 'ghost' | 'outline';

type ButtonProps = {
  text: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  testID?: string;
};

const variantStyles: Record<
  ButtonVariant,
  { background: string; border?: string; textColor: string }
> = {
  secondary: {
    background: colors.surface.muted,
    textColor: colors.text.primary,
  },
  outline: {
    background: 'transparent',
    border: colors.surface.divider,
    textColor: colors.text.primary,
  },
  ghost: {
    background: 'transparent',
    textColor: colors.text.secondary,
  },
};

export function Button({
  text,
  onPress,
  variant = 'secondary',
  disabled = false,
  fullWidth = true,
  style,
  testID,
}: ButtonProps) {
  const v = variantStyles[variant];
  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      testID={testID}
      android_ripple={{ color: 'rgba(0,0,0,0.06)' }}
      style={[
        {
          height: layout.buttonHeight,
          borderRadius: radius.full,
          width: fullWidth ? '100%' : 319,
          backgroundColor: v.background,
          borderWidth: v.border ? 1 : 0,
          borderColor: v.border,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 24,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      <Text
        style={{
          fontFamily: typography.fontFamily.bold,
          fontSize: typography.size.lg,
          lineHeight: typography.lineHeight.lg,
          letterSpacing: typography.letterSpacing,
          color: v.textColor,
        }}
      >
        {text}
      </Text>
    </Pressable>
  );
}
