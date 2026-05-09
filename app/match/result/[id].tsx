import { router, useLocalSearchParams } from 'expo-router';
import { Image, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { ButtonPrimary } from '@/components/ui/ButtonPrimary';
import { CheckCircle } from '@/components/icons/CheckCircle';
import { LanguageChip } from '@/components/profile/LanguageChip';
import { ExpandableBio } from '@/components/profile/ExpandableBio';
import { MonthCalendar } from '@/components/match/MonthCalendar';
import { SectionTitle } from '@/components/match/SectionTitle';
import { EventListItem } from '@/components/profile/EventListItem';
import { ReviewItem } from '@/components/profile/ReviewItem';
import { getUser } from '@/mocks/users';
import { OTHER_DOTS, RECENT_EVENTS_OTHER } from '@/mocks/events';
import { REVIEWS } from '@/mocks/reviews';
import { colors, radius, typography } from '@/constants/theme';

const SHARED_DATES = [
  new Date(2026, 4, 17),
  new Date(2026, 4, 20),
];

export default function MatchResult() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const user = getUser(id ?? 'sarah');

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.surface.background }}>
      <View style={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: 8 }}>
        <View
          style={{
            backgroundColor: '#F2FBF7',
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderRadius: radius.md,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <Text style={{ fontSize: 22 }}>🎉</Text>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontFamily: typography.fontFamily.bold,
                fontSize: typography.size.sm,
                color: colors.text.primary,
                letterSpacing: typography.letterSpacing,
              }}
            >
              {`${user.name}님과 매칭됐어요!`}
            </Text>
            <Text
              style={{
                fontFamily: typography.fontFamily.sans,
                fontSize: typography.size.xs,
                color: colors.text.secondary,
                marginTop: 2,
              }}
            >
              프로필을 확인하고 채팅을 시작해 보세요.
            </Text>
          </View>
        </View>
      </View>

      <Screen scroll edges={[]} contentContainerStyle={{ paddingBottom: 120 }}>
        <View style={{ paddingHorizontal: 24, paddingTop: 8 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 16,
              marginBottom: 16,
            }}
          >
            {user.photo ? (
              <Image
                source={user.photo}
                style={{ width: 80, height: 80, borderRadius: 40 }}
              />
            ) : (
              <View
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  backgroundColor: user.color ?? colors.surface.divider,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{
                    fontFamily: typography.fontFamily.bold,
                    fontSize: typography.size.xl,
                    color: '#FFFFFF',
                  }}
                >
                  {user.initial ?? user.name.charAt(0)}
                </Text>
              </View>
            )}
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Text
                  style={{
                    fontFamily: typography.fontFamily.bold,
                    fontSize: typography.size.lg,
                    color: colors.text.primary,
                    letterSpacing: typography.letterSpacing,
                  }}
                >
                  {user.name}
                </Text>
                {user.verified ? (
                  <CheckCircle size={14} color={colors.brand.primary} checked />
                ) : null}
              </View>
              <Text
                style={{
                  fontFamily: typography.fontFamily.sans,
                  fontSize: typography.size.sm,
                  color: colors.text.secondary,
                  marginTop: 4,
                }}
              >
                {[
                  user.age ? `${user.age}세` : null,
                  user.gender,
                  user.flag && user.country ? `${user.flag} ${user.country}` : user.country,
                ]
                  .filter(Boolean)
                  .join(', ')}
              </Text>
              <View style={{ flexDirection: 'row', gap: 16, marginTop: 8 }}>
                <Text
                  style={{
                    fontFamily: typography.fontFamily.sans,
                    fontSize: typography.size.xs,
                    color: colors.text.secondary,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: typography.fontFamily.bold,
                      color: colors.text.primary,
                    }}
                  >
                    {user.following ?? 0}
                  </Text>
                  {' Following'}
                </Text>
                <Text
                  style={{
                    fontFamily: typography.fontFamily.sans,
                    fontSize: typography.size.xs,
                    color: colors.text.secondary,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: typography.fontFamily.bold,
                      color: colors.text.primary,
                    }}
                  >
                    {user.followers ?? 0}
                  </Text>
                  {' Followers'}
                </Text>
              </View>
            </View>
          </View>

          {user.languages && user.languages.length > 0 ? (
            <View style={{ flexDirection: 'row', gap: 8, marginBottom: 12 }}>
              {user.languages.map((l) => (
                <LanguageChip key={l.code} code={l.code} phrase={l.phrase} />
              ))}
            </View>
          ) : null}

          {user.bio ? (
            <View style={{ marginBottom: 24 }}>
              <ExpandableBio text={user.bio} />
            </View>
          ) : null}

          <View style={{ marginBottom: 24 }}>
            <SectionTitle title="겹치는 일정" />
            <View
              style={{
                backgroundColor: colors.surface.field,
                borderRadius: radius.md,
                paddingHorizontal: 12,
                paddingVertical: 8,
                marginBottom: 12,
              }}
            >
              <Text
                style={{
                  fontFamily: typography.fontFamily.sans,
                  fontSize: typography.size.xs,
                  color: colors.text.secondary,
                  letterSpacing: typography.letterSpacing,
                }}
              >
                {`${user.name}님과 일정이 ${SHARED_DATES.length}개 겹쳐요.`}
              </Text>
            </View>
            <MonthCalendar
              selected={SHARED_DATES}
              dotDates={OTHER_DOTS}
              highlightToday={false}
            />
          </View>

          <View style={{ marginBottom: 24 }}>
            <SectionTitle title="다가오는 일정" count={RECENT_EVENTS_OTHER.length} />
            <View style={{ gap: 12 }}>
              {RECENT_EVENTS_OTHER.map((e) => (
                <EventListItem key={e.id} data={e} variant="card" />
              ))}
            </View>
          </View>

          <View>
            <SectionTitle title="행아웃 후기" />
            <View style={{ gap: 12 }}>
              {REVIEWS.slice(0, 2).map((r) => (
                <ReviewItem key={r.id} data={r} />
              ))}
            </View>
          </View>
          {/* spacer for fixed bottom */}
          <View style={{ height: 24 }} />
        </View>
      </Screen>

      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          paddingHorizontal: 24,
          paddingTop: 12,
          paddingBottom: 24,
          flexDirection: 'row',
          gap: 8,
          backgroundColor: colors.surface.background,
          borderTopWidth: 1,
          borderTopColor: colors.surface.divider,
        }}
      >
        <Pressable style={{ flex: 1 }} onPress={() => router.replace('/match')}>
          <Button text="넘기기" variant="outline" onPress={() => router.replace('/match')} />
        </Pressable>
        <View style={{ flex: 1 }}>
          <ButtonPrimary
            text="채팅하기"
            onPress={() => router.replace(`/chat/${id ?? 'sarah'}`)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
