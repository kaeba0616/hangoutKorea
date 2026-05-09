import { useState } from 'react';
import { router } from 'expo-router';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppBar } from '@/components/layout/AppBar';
import { BottomNav } from '@/components/layout/BottomNav';
import { UserListItem, UserListData } from '@/components/profile/UserListItem';
import { SegmentedTabs } from '@/components/ui/SegmentedTabs';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { EmptyState } from '@/components/ui/EmptyState';
import { User } from '@/components/icons/User';
import { FOLLOWER_IDS, FOLLOWING_IDS, MUTUAL_IDS, getUser } from '@/mocks/users';
import { useFollowsStore } from '@/hooks/useFollowsStore';
import { colors } from '@/constants/theme';

const TABS = [
  { key: 'followers', label: '팔로워' },
  { key: 'following', label: '팔로잉' },
];

function toListData(id: string): UserListData {
  const u = getUser(id);
  const meta = [
    u.age ? `${u.age}세` : null,
    u.gender,
    u.country,
  ]
    .filter(Boolean)
    .join(', ');
  return {
    id: u.id,
    name: u.name,
    initial: u.initial,
    color: u.color,
    photo: u.photo,
    meta,
    verified: u.verified,
    mutual: MUTUAL_IDS.has(u.id),
  };
}

export default function FollowersList() {
  const [active, setActive] = useState<'followers' | 'following'>('followers');
  const [target, setTarget] = useState<UserListData | null>(null);
  const isRemoved = useFollowsStore((s) => s.removed);
  const remove = useFollowsStore((s) => s.remove);

  const ids = (active === 'followers' ? FOLLOWER_IDS : FOLLOWING_IDS).filter(
    (id) => !isRemoved.has(id),
  );
  const data = ids.map(toListData);

  const confirmRemove = () => {
    if (target) remove(target.id);
    setTarget(null);
  };

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.surface.background }}>
      <AppBar title="행아코" />
      <SegmentedTabs
        tabs={TABS}
        active={active}
        onChange={(k) => setActive(k as 'followers' | 'following')}
      />
      <ScrollView style={{ flex: 1 }}>
        <View style={{ marginTop: 8, paddingBottom: 24 }}>
          {data.length === 0 ? (
            <EmptyState
              icon={<User size={28} color={colors.text.tertiary} />}
              title={active === 'followers' ? '아직 팔로워가 없어요' : '아직 팔로잉하는 사람이 없어요'}
              description={
                active === 'followers'
                  ? '프로필을 다듬고 매칭을 시작해 보세요.'
                  : '관심있는 사람을 만나서 팔로우해 보세요.'
              }
            />
          ) : (
            data.map((u) => (
              <UserListItem
                key={u.id}
                data={u}
                onPress={() => router.push(`/u/${u.id}`)}
                actionLabel={
                  active === 'followers' ? (u.mutual ? '맞팔로우' : '팔로우') : '팔로잉'
                }
                onAction={() => {
                  if (active === 'following') setTarget(u);
                }}
                onRemove={() => setTarget(u)}
              />
            ))
          )}
        </View>
      </ScrollView>

      <BottomNav active="profile" />

      <ConfirmDialog
        visible={target !== null}
        title={
          target
            ? `${target.name}님을 ${active === 'followers' ? '팔로워' : '팔로잉'}에서 삭제할까요?`
            : ''
        }
        description="삭제하면 다시 신청을 해야 해요."
        confirmLabel="삭제"
        destructive
        onCancel={() => setTarget(null)}
        onConfirm={confirmRemove}
      />
    </SafeAreaView>
  );
}
