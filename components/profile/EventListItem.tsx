import { Text, View } from 'react-native';
import { colors, radius, typography } from '@/constants/theme';

export type EventItemData = {
  id: string;
  title: string;
  participants: string;
  location: string;
  time: string;
  date: string;
  dotColor?: string;
};

type Props = { data: EventItemData; variant?: 'plain' | 'card' };

export function EventListItem({ data, variant = 'plain' }: Props) {
  const card = variant === 'card';
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 16,
        ...(card
          ? {
              padding: 16,
              borderRadius: radius.md,
              borderWidth: 1,
              borderColor: colors.surface.divider,
              backgroundColor: colors.surface.background,
            }
          : { paddingVertical: 16 }),
      }}
    >
      <View
        style={{
          width: 8,
          height: 8,
          marginTop: 8,
          borderRadius: radius.full,
          backgroundColor: data.dotColor ?? colors.brand.primary,
        }}
      />
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontFamily: typography.fontFamily.bold,
            fontSize: typography.size.sm,
            color: colors.text.primary,
            letterSpacing: typography.letterSpacing,
          }}
        >
          {data.title}
        </Text>
        <Text
          style={{
            fontFamily: typography.fontFamily.sans,
            fontSize: typography.size.xs,
            color: colors.text.secondary,
            marginTop: 4,
            letterSpacing: typography.letterSpacing,
          }}
        >
          {data.participants}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4, gap: 8 }}>
          <Text
            style={{
              fontFamily: typography.fontFamily.sans,
              fontSize: typography.size.xs,
              color: colors.text.tertiary,
            }}
          >
            {data.location}
          </Text>
          <View style={{ width: 1, height: 10, backgroundColor: colors.surface.divider }} />
          <Text
            style={{
              fontFamily: typography.fontFamily.sans,
              fontSize: typography.size.xs,
              color: colors.text.tertiary,
            }}
          >
            {data.time}
          </Text>
          <View style={{ width: 1, height: 10, backgroundColor: colors.surface.divider }} />
          <Text
            style={{
              fontFamily: typography.fontFamily.sans,
              fontSize: typography.size.xs,
              color: colors.text.tertiary,
            }}
          >
            {data.date}
          </Text>
        </View>
      </View>
    </View>
  );
}
