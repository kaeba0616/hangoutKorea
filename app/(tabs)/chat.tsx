import { useState } from 'react';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Screen } from '@/components/layout/Screen';
import { SearchBar } from '@/components/form/SearchBar';
import { MoreHorizontal } from '@/components/icons/MoreHorizontal';
import { ChatListItem, ChatListItemData } from '@/components/chat/ChatListItem';
import { PopoverMenu } from '@/components/ui/PopoverMenu';
import { EmptyState } from '@/components/ui/EmptyState';
import { ChatBubble } from '@/components/icons/ChatBubble';
import { ACTIVE_CHATS, SCHEDULED_CHATS } from '@/mocks/chats';
import { colors, typography } from '@/constants/theme';

export default function ChatTab() {
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const filter = (rows: ChatListItemData[]) =>
    query.trim().length === 0
      ? rows
      : rows.filter(
          (r) => r.name.toLowerCase().includes(query.toLowerCase()) || r.preview.includes(query),
        );

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
        <View style={{ width: 32 }} />
        <Text
          style={{
            fontFamily: typography.fontFamily.bold,
            fontSize: typography.size.md,
            color: colors.text.primary,
            letterSpacing: typography.letterSpacing,
          }}
        >
          채팅
        </Text>
        <Pressable hitSlop={8} onPress={() => setMenuOpen(true)}>
          <MoreHorizontal size={22} color={colors.text.primary} />
        </Pressable>
      </View>

      <PopoverMenu
        visible={menuOpen}
        onClose={() => setMenuOpen(false)}
        items={[
          { label: '그룹채팅 만들기', onPress: () => router.push('/chat/group/new') },
        ]}
      />

      <Screen scroll edges={[]}>
        <View style={{ paddingHorizontal: 16, paddingTop: 8 }}>
          <SearchBar value={query} onChangeText={setQuery} placeholder="검색" />
        </View>

        {filter(ACTIVE_CHATS).length === 0 && filter(SCHEDULED_CHATS).length === 0 ? (
          <EmptyState
            icon={<ChatBubble size={28} color={colors.text.tertiary} />}
            title={query.trim() ? '검색 결과가 없어요' : '아직 채팅이 없어요'}
            description={
              query.trim()
                ? '다른 키워드로 검색해 보세요.'
                : '매칭으로 새 친구를 만나 보세요.'
            }
            size="lg"
          />
        ) : null}

        {filter(ACTIVE_CHATS).length > 0 ? (
          <View style={{ marginTop: 16 }}>
            <Text
              style={{
                fontFamily: typography.fontFamily.bold,
                fontSize: typography.size.sm,
                color: colors.text.secondary,
                paddingHorizontal: 16,
                paddingVertical: 8,
                letterSpacing: typography.letterSpacing,
              }}
            >
              대화 중인 채팅
            </Text>
            {filter(ACTIVE_CHATS).map((c) => (
              <ChatListItem key={c.id} data={c} onPress={() => router.push(`/chat/${c.id}`)} />
            ))}
          </View>
        ) : null}

        {filter(SCHEDULED_CHATS).length > 0 ? (
          <View style={{ marginTop: 16, paddingBottom: 24 }}>
            <Text
              style={{
                fontFamily: typography.fontFamily.bold,
                fontSize: typography.size.sm,
                color: colors.text.secondary,
                paddingHorizontal: 16,
                paddingVertical: 8,
                letterSpacing: typography.letterSpacing,
              }}
            >
              내가 가는 약속
            </Text>
            {filter(SCHEDULED_CHATS).map((c) => (
              <ChatListItem key={c.id} data={c} onPress={() => router.push(`/chat/${c.id}`)} />
            ))}
          </View>
        ) : null}
      </Screen>
    </SafeAreaView>
  );
}
