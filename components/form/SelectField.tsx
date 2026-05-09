import { Pressable, Text, View } from 'react-native';
import { ArrowRight } from '@/components/icons/ArrowRight';
import { colors, radius, typography } from '@/constants/theme';

type SelectFieldProps = {
  label?: string;
  value?: string;
  placeholder?: string;
  onPress?: () => void;
  error?: string;
};

export function SelectField({ label, value, placeholder, onPress, error }: SelectFieldProps) {
  return (
    <View style={{ width: '100%' }}>
      {label ? (
        <Text
          style={{
            fontFamily: typography.fontFamily.sans,
            fontSize: typography.size.sm,
            lineHeight: typography.lineHeight.sm,
            color: colors.text.secondary,
            marginBottom: 6,
          }}
        >
          {label}
        </Text>
      ) : null}
      <Pressable
        onPress={onPress}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: 52,
          borderRadius: radius.md,
          borderWidth: 1,
          borderColor: error ? colors.state.error : colors.surface.divider,
          paddingHorizontal: 16,
          backgroundColor: colors.surface.background,
        }}
      >
        <Text
          style={{
            flex: 1,
            fontFamily: typography.fontFamily.sans,
            fontSize: typography.size.md,
            color: value ? colors.text.primary : colors.text.tertiary,
            letterSpacing: typography.letterSpacing,
          }}
        >
          {value ?? placeholder ?? ''}
        </Text>
        <ArrowRight size={18} />
      </Pressable>
      {error ? (
        <Text
          style={{
            marginTop: 6,
            fontFamily: typography.fontFamily.sans,
            fontSize: typography.size.xs,
            color: colors.state.error,
          }}
        >
          {error}
        </Text>
      ) : null}
    </View>
  );
}
