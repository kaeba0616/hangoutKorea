import { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Image, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { ButtonPrimary } from '@/components/ui/ButtonPrimary';
import { SegmentedTabs } from '@/components/ui/SegmentedTabs';
import { PopoverMenu } from '@/components/ui/PopoverMenu';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { AppBar } from '@/components/layout/AppBar';
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
import { getUser } from '@/mocks/users';
import { REVIEWS } from '@/mocks/reviews';
import { OTHER_DOTS, OTHER_SCHEDULED, RECENT_EVENTS_OTHER } from '@/mocks/events';
import { useBlocksStore } from '@/hooks/useBlocksStore';
import { useFollowsStore } from '@/hooks/useFollowsStore';
import { colors, typography } from '@/constants/theme';

const TABS = [
  { key: 'schedule', label: '일정', icon: (c: string) => <Calendar size={16} color={c} /> },
  { key: 'review', label: '후기', icon: (c: string) => <Smile size={16} color={c} /> },
];

export default function OtherUserProfile() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'schedule' | 'review'>('schedule');
  const [menuOpen, setMenuOpen] = useState(false);
  const [blockOpen, setBlockOpen] = useState(false);
  const blocked = useBlocksStore((s) => s.blocked.has(id ?? ''));
  const toggleBlock = useBlocksStore((s) => s.toggle);
  const isFollowing = useFollowsStore((s) => s.following.has(id ?? ''));
  const toggleFollow = useFollowsStore((s) => s.toggle);

  const user = getUser(id);

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.surface.background }}>
      <AppBar
        title=""
        right={
          <Pressable hitSlop={8} onPress={() => setMenuOpen(true)}>
            <MoreHorizontal size={22} color={colors.text.primary} />
          </Pressable>
        }
      />

      <PopoverMenu
        visible={menuOpen}
        onClose={() => setMenuOpen(false)}
        items={[
          { label: '신고하기', onPress: () => router.push(`/u/report?id=${id ?? ''}`) },
          {
            label: blocked ? '차단 해제' : '차단하기',
            onPress: () => setBlockOpen(true),
            danger: !blocked,
          },
        ]}
      />

      <ConfirmDialog
        visible={blockOpen}
        title={blocked ? `${user.name}님 차단을 해제할까요?` : `${user.name}님을 차단할까요?`}
        description={
          blocked
            ? '차단 해제 후 다시 매칭/대화가 가능해요.'
            : '차단 후에는 서로의 프로필과 채팅이 보이지 않아요.'
        }
        confirmLabel={blocked ? '해제' : '차단'}
        destructive={!blocked}
        onCancel={() => setBlockOpen(false)}
        onConfirm={() => {
          if (id) toggleBlock(id);
          setBlockOpen(false);
        }}
      />
      <Screen scroll edges={[]}>
        <View style={{ paddingHorizontal: 24, paddingTop: 8 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 16 }}>
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
                  letterSpacing: typography.letterSpacing,
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
                  <Text style={{ fontFamily: typography.fontFamily.bold, color: colors.text.primary }}>
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
                  <Text style={{ fontFamily: typography.fontFamily.bold, color: colors.text.primary }}>
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
            <View style={{ marginBottom: 16 }}>
              <ExpandableBio text={user.bio} />
            </View>
          ) : null}

          <View style={{ flexDirection: 'row', gap: 12, marginBottom: 8 }}>
            <View style={{ flex: 1 }}>
              <Button
                text={isFollowing ? '팔로잉' : '팔로우'}
                variant={isFollowing ? 'outline' : 'secondary'}
                onPress={() => {
                  if (id) toggleFollow(id);
                }}
              />
            </View>
            <View style={{ flex: 1 }}>
              <ButtonPrimary text="메시지" onPress={() => router.push(`/chat/${id ?? 'sarah'}`)} />
            </View>
          </View>
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
                  selected={OTHER_SCHEDULED}
                  dotDates={OTHER_DOTS}
                  highlightToday={false}
                  onSelectDate={(d) => router.push(`/event/${d.getMonth() + 1}-${d.getDate()}`)}
                />
              </View>
              <View>
                <SectionTitle title="다가오는 일정" count={RECENT_EVENTS_OTHER.length} />
                <View style={{ gap: 12 }}>
                  {RECENT_EVENTS_OTHER.map((e) => (
                    <EventListItem key={e.id} data={e} variant="card" />
                  ))}
                </View>
              </View>
            </>
          ) : (
            <View>
              <SectionTitle
                title="행아웃 후기"
                actionLabel="후기 작성 ›"
                onAction={() => router.push('/u/review/new')}
              />
              <View style={{ gap: 12 }}>
                {REVIEWS.map((r) => (
                  <ReviewItem key={r.id} data={r} />
                ))}
              </View>
            </View>
          )}
        </View>
      </Screen>
    </SafeAreaView>
  );
}
