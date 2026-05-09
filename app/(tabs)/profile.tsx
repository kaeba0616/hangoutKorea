import { useState } from 'react';
import { router } from 'expo-router';
import { Image, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { SegmentedTabs } from '@/components/ui/SegmentedTabs';
import { PopoverMenu } from '@/components/ui/PopoverMenu';
import { Bell } from '@/components/icons/Bell';
import { Calendar } from '@/components/icons/Calendar';
import { CheckCircle } from '@/components/icons/CheckCircle';
import { MoreHorizontal } from '@/components/icons/MoreHorizontal';
import { Smile } from '@/components/icons/Smile';
import { MonthCalendar } from '@/components/match/MonthCalendar';
import { SectionTitle } from '@/components/match/SectionTitle';
import { EventListItem } from '@/components/profile/EventListItem';
import { ExpandableBio } from '@/components/profile/ExpandableBio';
import { LanguageChip } from '@/components/profile/LanguageChip';
import { ReviewItem } from '@/components/profile/ReviewItem';
import { useMockAuth } from '@/hooks/useMockAuth';
import { useOnboardingStore } from '@/hooks/useOnboardingStore';
import { COUNTRIES } from '@/constants/countries';
import { REVIEWS } from '@/mocks/reviews';
import { MY_DOTS, MY_SCHEDULED, RECENT_EVENTS } from '@/mocks/events';
import { colors, radius, typography } from '@/constants/theme';

const TABS = [
  { key: 'schedule', label: '일정', icon: (c: string) => <Calendar size={16} color={c} /> },
  { key: 'review', label: '후기', icon: (c: string) => <Smile size={16} color={c} /> },
];

export default function ProfileTab() {
  const profile = useOnboardingStore();
  const { signOut } = useMockAuth();
  const [activeTab, setActiveTab] = useState<'schedule' | 'review'>('schedule');
  const [menuOpen, setMenuOpen] = useState(false);

  const country = profile.nationality
    ? COUNTRIES.find((c) => c.code === profile.nationality)
    : undefined;

  const handleReset = async () => {
    await signOut();
    useOnboardingStore.getState().reset();
    router.replace('/onboarding-splash');
  };

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.surface.background }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          height: 56,
        }}
      >
        <View style={{ width: 64 }} />
        <Text
          style={{
            fontFamily: typography.fontFamily.bold,
            fontSize: typography.size.md,
            color: colors.text.primary,
            letterSpacing: typography.letterSpacing,
          }}
        >
          프로필
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <Pressable hitSlop={8} onPress={() => router.push('/notifications')}>
            <Bell size={22} color={colors.text.primary} hasBadge />
          </Pressable>
          <Pressable hitSlop={8} onPress={() => setMenuOpen(true)}>
            <MoreHorizontal size={22} color={colors.text.primary} />
          </Pressable>
        </View>
      </View>

      <PopoverMenu
        visible={menuOpen}
        onClose={() => setMenuOpen(false)}
        items={[
          { label: '프로필 수정하기', onPress: () => router.push('/u/edit') },
          { label: '설정', onPress: () => router.push('/u/settings') },
        ]}
      />

      <Screen scroll edges={[]}>
        <View style={{ paddingHorizontal: 24, paddingTop: 8 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 16,
              marginBottom: 20,
            }}
          >
            <Image
              source={
                profile.photoUri
                  ? { uri: profile.photoUri }
                  : require('@/assets/images/figma/self-avatar.png')
              }
              style={{ width: 72, height: 72, borderRadius: radius.full }}
            />
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
                  {profile.name || '맹키리'}
                </Text>
                <CheckCircle size={14} color={colors.brand.primary} checked />
              </View>
              <Text
                style={{
                  fontFamily: typography.fontFamily.sans,
                  fontSize: typography.size.sm,
                  color: colors.text.secondary,
                  marginTop: 4,
                  letterSpacing: typography.letterSpacing,
                }}
              >
                {[
                  profile.age ? `${profile.age}대` : null,
                  profile.gender === 'male' ? '남성' : profile.gender === 'female' ? '여성' : null,
                  country?.nameKo ?? '대한민국',
                ]
                  .filter(Boolean)
                  .join(', ')}
              </Text>
              <View style={{ flexDirection: 'row', gap: 16, marginTop: 8 }}>
                <Pressable hitSlop={4} onPress={() => router.push('/u/followers')}>
                  <Text
                    style={{
                      fontFamily: typography.fontFamily.sans,
                      fontSize: typography.size.xs,
                      color: colors.text.secondary,
                    }}
                  >
                    <Text style={{ fontFamily: typography.fontFamily.bold, color: colors.text.primary }}>
                      124
                    </Text>
                    {' Following'}
                  </Text>
                </Pressable>
                <Pressable hitSlop={4} onPress={() => router.push('/u/followers')}>
                  <Text
                    style={{
                      fontFamily: typography.fontFamily.sans,
                      fontSize: typography.size.xs,
                      color: colors.text.secondary,
                    }}
                  >
                    <Text style={{ fontFamily: typography.fontFamily.bold, color: colors.text.primary }}>
                      89
                    </Text>
                    {' Followers'}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>

          <View style={{ flexDirection: 'row', gap: 8, marginBottom: 16 }}>
            <LanguageChip code="KR" phrase="원어민이에요" />
            <LanguageChip code="EN" phrase="잘해요" />
          </View>

          {profile.bio ? (
            <View style={{ marginBottom: 8 }}>
              <ExpandableBio text={profile.bio} />
            </View>
          ) : (
            <View style={{ marginBottom: 8 }}>
              <ExpandableBio text="안녕하세요! 서울 거주 중인 직장인입니다. 맛있는 음식과 풍경 보러 다니는 것을 좋아해요. 같이 서울 구석구석 다녀보실 분 환영합니다." />
            </View>
          )}
        </View>

        <View style={{ marginTop: 16 }}>
          <SegmentedTabs
            tabs={TABS}
            active={activeTab}
            onChange={(key) => setActiveTab(key as 'schedule' | 'review')}
          />
        </View>

        <View style={{ paddingHorizontal: 24, paddingTop: 24, paddingBottom: 32 }}>
          {activeTab === 'schedule' ? (
            <>
              <View style={{ marginBottom: 24 }}>
                <SectionTitle title="최근 일정" />
                <MonthCalendar
                  selected={MY_SCHEDULED}
                  dotDates={MY_DOTS}
                  highlightToday={false}
                  onSelectDate={(d) => router.push(`/event/${d.getMonth() + 1}-${d.getDate()}`)}
                />
              </View>
              <View>
                <SectionTitle title="다가오는 일정" count={RECENT_EVENTS.length} />
                <View style={{ gap: 12 }}>
                  {RECENT_EVENTS.map((e) => (
                    <EventListItem key={e.id} data={e} variant="card" />
                  ))}
                </View>
              </View>
            </>
          ) : (
            <View>
              <SectionTitle
                title="행아웃 후기"
                actionLabel="자세히 ›"
                onAction={() => router.push('/u/reviews')}
              />
              <View style={{ gap: 12 }}>
                {REVIEWS.map((r) => (
                  <ReviewItem key={r.id} data={r} />
                ))}
              </View>
            </View>
          )}

          <View style={{ marginTop: 32 }}>
            <Button text="처음으로 돌아가기 (DEV)" variant="outline" onPress={handleReset} />
          </View>
        </View>
      </Screen>
    </SafeAreaView>
  );
}
