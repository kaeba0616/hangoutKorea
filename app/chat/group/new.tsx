import { useMemo, useState } from 'react';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { Screen } from '@/components/layout/Screen';
import { AppBar } from '@/components/layout/AppBar';
import { SearchBar } from '@/components/form/SearchBar';
import { CheckboxRow } from '@/components/form/CheckboxRow';
import { GROUP_CHAT_CANDIDATE_IDS, getUser } from '@/mocks/users';
import { colors, radius, typography } from '@/constants/theme';

const MEMBERS = GROUP_CHAT_CANDIDATE_IDS.map((id) => getUser(id));

export default function GroupChatNew() {
  const [query, setQuery] = useState('');
  const [picked, setPicked] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? MEMBERS.filter((m) => m.name.toLowerCase().includes(q)) : MEMBERS;
  }, [query]);

  const toggle = (id: string) => {
    setPicked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const onConfirm = () => {
    if (picked.size === 0) return;
    router.replace('/chat');
  };

  return (
    <Screen>
      <AppBar
        title="그룹채팅"
        right={
          <Pressable
            hitSlop={8}
            onPress={onConfirm}
            disabled={picked.size === 0}
            style={{ opacity: picked.size === 0 ? 0.4 : 1 }}
          >
            <Text
              style={{
                fontFamily: typography.fontFamily.bold,
                fontSize: typography.size.sm,
                color: colors.brand.primary,
                letterSpacing: typography.letterSpacing,
              }}
            >
              {picked.size > 0 ? `완료 (${picked.size})` : '완료'}
            </Text>
          </Pressable>
        }
      />

      <View style={{ paddingHorizontal: 16, paddingTop: 8 }}>
        <SearchBar value={query} onChangeText={setQuery} placeholder="이메일 또는 이름 검색" />
      </View>

      <View style={{ flex: 1, marginTop: 8 }}>
        {filtered.length === 0 ? (
          <View style={{ paddingVertical: 48, alignItems: 'center' }}>
            <Text
              style={{
                fontFamily: typography.fontFamily.sans,
                fontSize: typography.size.sm,
                color: colors.text.tertiary,
              }}
            >
              결과가 없어요.
            </Text>
          </View>
        ) : (
          filtered.map((m) => {
            const checked = picked.has(m.id);
            return (
              <Pressable
                key={m.id}
                onPress={() => toggle(m.id)}
                style={({ pressed }) => ({
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  gap: 12,
                  backgroundColor: pressed ? colors.surface.field : 'transparent',
                })}
              >
                <View
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: radius.full,
                    backgroundColor: m.color,
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
                    {m.initial}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontFamily: typography.fontFamily.bold,
                      fontSize: typography.size.sm,
                      color: colors.text.primary,
                      letterSpacing: typography.letterSpacing,
                    }}
                  >
                    {m.name}
                  </Text>
                  <Text
                    style={{
                      fontFamily: typography.fontFamily.sans,
                      fontSize: typography.size.xs,
                      color: colors.text.secondary,
                      marginTop: 2,
                      letterSpacing: typography.letterSpacing,
                    }}
                  >
                    {`${m.age}세, ${m.flag} ${m.country}`}
                  </Text>
                </View>
                <CheckboxRow checked={checked} onPress={() => toggle(m.id)} />
              </Pressable>
            );
          })
        )}
      </View>
    </Screen>
  );
}
