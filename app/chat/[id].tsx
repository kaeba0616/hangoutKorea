import { useMemo, useRef, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Image, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppBar } from '@/components/layout/AppBar';
import { EmptyState } from '@/components/ui/EmptyState';
import { ChatBubble } from '@/components/icons/ChatBubble';
import { MoreHorizontal } from '@/components/icons/MoreHorizontal';
import { Plus } from '@/components/icons/Plus';
import { Send } from '@/components/icons/Send';
import { getChatMessages, getChatName, ChatMessage } from '@/mocks/chats';
import { getUser } from '@/mocks/users';
import { colors, radius, typography } from '@/constants/theme';

function nowTime() {
  const d = new Date();
  const h = d.getHours();
  const m = d.getMinutes();
  const ampm = h < 12 ? '오전' : '오후';
  const hh = h % 12 === 0 ? 12 : h % 12;
  return `${ampm} ${hh}:${String(m).padStart(2, '0')}`;
}

export default function ChatRoom() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const initialMessages = useMemo(() => getChatMessages(id), [id]);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [text, setText] = useState('');
  const scrollRef = useRef<ScrollView>(null);
  const name = getChatName(id);
  const sarah = getUser('sarah');

  const canSend = text.trim().length > 0;
  const handleSend = () => {
    if (!canSend) return;
    setMessages((prev) => [
      ...prev,
      {
        id: `local-${Date.now()}`,
        from: 'me',
        text: text.trim(),
        time: nowTime(),
      },
    ]);
    setText('');
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 50);
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1, backgroundColor: colors.surface.background }}>
      <AppBar
        title={name}
        right={
          <Pressable hitSlop={8} onPress={() => router.push(`/u/${id ?? 'sarah'}`)}>
            <MoreHorizontal size={22} color={colors.text.primary} />
          </Pressable>
        }
      />

      <ScrollView
        ref={scrollRef}
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingVertical: 12,
          flexGrow: 1,
        }}
      >
        {messages.length === 0 ? (
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <EmptyState
              icon={<ChatBubble size={28} color={colors.text.tertiary} />}
              title={`${name}님과의 첫 채팅이에요`}
              description="가볍게 인사를 건네 보세요."
              size="lg"
            />
          </View>
        ) : null}
        {messages.length > 0 ? (
          <View style={{ alignItems: 'center', marginBottom: 12 }}>
            <Text
              style={{
                fontFamily: typography.fontFamily.sans,
                fontSize: typography.size.xs,
                color: colors.text.tertiary,
              }}
            >
              2026.12.23 월
            </Text>
          </View>
        ) : null}

        {messages.map((msg) => {
          const mine = msg.from === 'me';
          if (msg.type === 'appointment' && msg.appointment) {
            return (
              <View key={msg.id} style={{ alignItems: mine ? 'flex-end' : 'flex-start', marginBottom: 12 }}>
                <View
                  style={{
                    maxWidth: '82%',
                    backgroundColor: '#F2FBF7',
                    borderRadius: radius.lg,
                    padding: 14,
                    gap: 6,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: typography.fontFamily.bold,
                      fontSize: typography.size.sm,
                      color: colors.text.primary,
                      letterSpacing: typography.letterSpacing,
                    }}
                  >
                    {msg.appointment.title}
                  </Text>
                  <Text
                    style={{
                      fontFamily: typography.fontFamily.sans,
                      fontSize: typography.size.xs,
                      color: colors.text.secondary,
                    }}
                  >
                    {`날짜: ${msg.appointment.date}\n시간: ${msg.appointment.time}\n장소: ${msg.appointment.place}`}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 6,
                      marginTop: 4,
                    }}
                  >
                    <View style={{ flexDirection: 'row' }}>
                      {sarah.photo ? (
                        <Image
                          source={sarah.photo}
                          style={{
                            width: 22,
                            height: 22,
                            borderRadius: 11,
                            borderWidth: 2,
                            borderColor: '#F2FBF7',
                          }}
                        />
                      ) : null}
                      <View
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: 11,
                          marginLeft: -8,
                          backgroundColor: '#A6D26A',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderWidth: 2,
                          borderColor: '#F2FBF7',
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: typography.fontFamily.bold,
                            fontSize: 10,
                            color: colors.text.inverse,
                          }}
                        >
                          나
                        </Text>
                      </View>
                    </View>
                    <Text
                      style={{
                        fontFamily: typography.fontFamily.sans,
                        fontSize: typography.size.xs,
                        color: colors.text.secondary,
                        letterSpacing: typography.letterSpacing,
                      }}
                    >
                      {`${sarah.name}, 나`}
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
                    <Pressable
                      onPress={() => router.push(`/event/${msg.id}`)}
                      style={{
                        flex: 1,
                        height: 36,
                        borderRadius: radius.md,
                        backgroundColor: colors.surface.background,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: typography.fontFamily.bold,
                          fontSize: typography.size.xs,
                          color: colors.text.primary,
                        }}
                      >
                        장소 보기
                      </Text>
                    </Pressable>
                    <Pressable
                      onPress={() =>
                        router.push(
                          `/chat/new-appointment?edit=${msg.id}&title=${encodeURIComponent(msg.appointment?.title ?? '')}&date=${encodeURIComponent(msg.appointment?.date.split(' ')[0] ?? '')}&time=${encodeURIComponent(msg.appointment?.time ?? '')}&place=${encodeURIComponent(msg.appointment?.place ?? '')}`,
                        )
                      }
                      style={{
                        flex: 1,
                        height: 36,
                        borderRadius: radius.md,
                        backgroundColor: colors.brand.primary,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: typography.fontFamily.bold,
                          fontSize: typography.size.xs,
                          color: colors.text.primary,
                        }}
                      >
                        수정하기
                      </Text>
                    </Pressable>
                  </View>
                </View>
                <Text
                  style={{
                    fontFamily: typography.fontFamily.sans,
                    fontSize: 11,
                    color: colors.text.tertiary,
                    marginTop: 4,
                  }}
                >
                  {msg.time}
                </Text>
              </View>
            );
          }
          return (
            <View
              key={msg.id}
              style={{
                flexDirection: mine ? 'row-reverse' : 'row',
                alignItems: 'flex-end',
                gap: 8,
                marginBottom: 12,
              }}
            >
              {!mine ? (
                sarah.photo ? (
                  <Image
                    source={sarah.photo}
                    style={{ width: 32, height: 32, borderRadius: 16 }}
                  />
                ) : (
                  <View
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 16,
                      backgroundColor: colors.surface.divider,
                    }}
                  />
                )
              ) : null}
              <View style={{ maxWidth: '78%', alignItems: mine ? 'flex-end' : 'flex-start' }}>
                <View
                  style={{
                    backgroundColor: mine ? colors.brand.primary : colors.surface.field,
                    borderRadius: radius.lg,
                    paddingHorizontal: 14,
                    paddingVertical: 10,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: typography.fontFamily.sans,
                      fontSize: typography.size.sm,
                      color: colors.text.primary,
                      lineHeight: typography.lineHeight.md,
                      letterSpacing: typography.letterSpacing,
                    }}
                  >
                    {msg.text}
                  </Text>
                </View>
                <Text
                  style={{
                    fontFamily: typography.fontFamily.sans,
                    fontSize: 11,
                    color: colors.text.tertiary,
                    marginTop: 4,
                  }}
                >
                  {msg.time}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          paddingHorizontal: 12,
          paddingVertical: 10,
          borderTopWidth: 1,
          borderTopColor: colors.surface.divider,
        }}
      >
        <Pressable onPress={() => router.push('/chat/new-appointment')} hitSlop={8}>
          <Plus size={24} color={colors.text.secondary} />
        </Pressable>
        <View
          style={{
            flex: 1,
            backgroundColor: colors.surface.field,
            borderRadius: radius.full,
            paddingHorizontal: 14,
            height: 40,
            justifyContent: 'center',
          }}
        >
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="어디든 좋아요!:)"
            placeholderTextColor={colors.text.tertiary}
            onSubmitEditing={handleSend}
            returnKeyType="send"
            blurOnSubmit={false}
            style={{
              fontFamily: typography.fontFamily.sans,
              fontSize: typography.size.sm,
              color: colors.text.primary,
              padding: 0,
            }}
          />
        </View>
        <Pressable hitSlop={8} onPress={handleSend} disabled={!canSend}>
          <Send size={22} color={canSend ? colors.brand.primary : colors.text.tertiary} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
