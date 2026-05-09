import { Pressable, Text } from 'react-native';
import { ChevronRight } from '@/components/icons/ChevronRight';
import { colors, radius, typography } from '@/constants/theme';

type Props = {
  value?: string;
  placeholder?: string;
  onPress?: () => void;
};

export function SelectFieldSmall({ value, placeholder, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: 48,
        paddingHorizontal: 14,
        borderRadius: radius.md,
        borderWidth: 1,
        borderColor: colors.surface.divider,
        backgroundColor: colors.surface.background,
      }}
    >
      <Text
        style={{
          flex: 1,
          fontFamily: typography.fontFamily.sans,
          fontSize: typography.size.sm,
          color: value ? colors.text.primary : colors.text.tertiary,
          letterSpacing: typography.letterSpacing,
        }}
      >
        {value ?? placeholder ?? ''}
      </Text>
      <ChevronRight size={16} color={colors.text.tertiary} />
    </Pressable>
  );
}
