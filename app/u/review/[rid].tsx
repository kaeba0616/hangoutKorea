import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';
import { Screen } from '@/components/layout/Screen';
import { AppBar } from '@/components/layout/AppBar';
import { REVIEW_DETAILS } from '@/mocks/reviews';
import { colors, radius, typography } from '@/constants/theme';

export default function ReviewDetail() {
  const { rid } = useLocalSearchParams<{ rid: string }>();
  const review = (rid && REVIEW_DETAILS[rid]) || REVIEW_DETAILS.r1;

  return (
    <Screen>
      <AppBar title="후기 상세" />
      <View style={{ paddingHorizontal: 24, paddingTop: 8 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <View
            style={{
              width: 48,
              height: 48,
              borderRadius: radius.full,
              backgroundColor: review.color,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                fontFamily: typography.fontFamily.bold,
                fontSize: typography.size.md,
                color: colors.text.inverse,
              }}
            >
              {review.initial}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontFamily: typography.fontFamily.bold,
                fontSize: typography.size.md,
                color: colors.text.primary,
                letterSpacing: typography.letterSpacing,
              }}
            >
              {review.reviewer}
            </Text>
            <Text
              style={{
                fontFamily: typography.fontFamily.sans,
                fontSize: typography.size.xs,
                color: colors.text.tertiary,
                marginTop: 2,
              }}
            >
              {review.date}
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', gap: 4, marginBottom: 16 }}>
          {[1, 2, 3, 4, 5].map((i) => (
            <Text
              key={i}
              style={{
                fontSize: 18,
                color: i <= review.rating ? '#FFC93C' : colors.surface.divider,
              }}
            >
              ★
            </Text>
          ))}
        </View>

        <Text
          style={{
            fontFamily: typography.fontFamily.bold,
            fontSize: typography.size.lg,
            color: colors.text.primary,
            letterSpacing: typography.letterSpacing,
            marginBottom: 12,
          }}
        >
          {review.title}
        </Text>
        <Text
          style={{
            fontFamily: typography.fontFamily.sans,
            fontSize: typography.size.md,
            color: colors.text.primary,
            lineHeight: typography.lineHeight.lg,
            letterSpacing: typography.letterSpacing,
          }}
        >
          {review.text}
        </Text>
      </View>
    </Screen>
  );
}
