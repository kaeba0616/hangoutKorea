import { Pressable, Text, View } from 'react-native';
import { colors, typography } from '@/constants/theme';

type Props = {
  title: string;
  count?: number;
  actionLabel?: string;
  onAction?: () => void;
};

export function SectionTitle({ title, count, actionLabel, onAction }: Props) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4 }}>
        <Text
          style={{
            fontFamily: typography.fontFamily.bold,
            fontSize: typography.size.md,
            color: colors.text.primary,
            letterSpacing: typography.letterSpacing,
          }}
        >
          {title}
        </Text>
        {typeof count === 'number' ? (
          <Text
            style={{
              fontFamily: typography.fontFamily.sans,
              fontSize: typography.size.sm,
              color: colors.text.tertiary,
              letterSpacing: typography.letterSpacing,
            }}
          >
            ({count})
          </Text>
        ) : null}
      </View>
      {actionLabel ? (
        <Pressable onPress={onAction} hitSlop={8}>
          <Text
            style={{
              fontFamily: typography.fontFamily.sans,
              fontSize: typography.size.sm,
              color: colors.text.secondary,
              letterSpacing: typography.letterSpacing,
            }}
          >
            {actionLabel}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}
