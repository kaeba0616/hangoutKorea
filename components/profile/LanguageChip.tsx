import { Text, View } from 'react-native';
import { colors, radius, typography } from '@/constants/theme';

type Props = {
  code: string;
  phrase: string;
};

export function LanguageChip({ code, phrase }: Props) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: radius.full,
        backgroundColor: colors.surface.field,
      }}
    >
      <View
        style={{
          paddingHorizontal: 6,
          paddingVertical: 1,
          borderRadius: radius.sm,
          backgroundColor: colors.surface.background,
        }}
      >
        <Text
          style={{
            fontFamily: typography.fontFamily.bold,
            fontSize: 10,
            color: colors.text.primary,
            letterSpacing: 0,
          }}
        >
          {code}
        </Text>
      </View>
      <Text
        style={{
          fontFamily: typography.fontFamily.sans,
          fontSize: typography.size.xs,
          color: colors.text.secondary,
          letterSpacing: typography.letterSpacing,
        }}
      >
        {phrase}
      </Text>
    </View>
  );
}
