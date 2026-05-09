import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { Screen } from '@/components/layout/Screen';
import { AppBar } from '@/components/layout/AppBar';
import { ReviewItem } from '@/components/profile/ReviewItem';
import { REVIEWS } from '@/mocks/reviews';
import { colors, typography } from '@/constants/theme';

export default function ReviewsList() {
  return (
    <Screen scroll>
      <AppBar
        title="프로필"
        right={
          <Pressable onPress={() => router.push('/u/review/new')} hitSlop={8}>
            <Text
              style={{
                fontFamily: typography.fontFamily.bold,
                fontSize: typography.size.sm,
                color: colors.brand.primary,
                letterSpacing: typography.letterSpacing,
              }}
            >
              작성
            </Text>
          </Pressable>
        }
      />
      <View style={{ paddingHorizontal: 24, paddingTop: 8, paddingBottom: 24, gap: 12 }}>
        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4 }}>
          <Text
            style={{
              fontFamily: typography.fontFamily.bold,
              fontSize: typography.size.lg,
              color: colors.text.primary,
              letterSpacing: typography.letterSpacing,
            }}
          >
            행아웃 후기
          </Text>
          <Text
            style={{
              fontFamily: typography.fontFamily.bold,
              fontSize: typography.size.lg,
              color: colors.text.tertiary,
              letterSpacing: typography.letterSpacing,
            }}
          >
            ({REVIEWS.length})
          </Text>
        </View>
        {REVIEWS.map((r) => (
          <Pressable key={r.id} onPress={() => router.push(`/u/review/${r.id}`)}>
            <ReviewItem data={r} />
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}
