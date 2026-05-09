import { router, useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';
import { Screen } from '@/components/layout/Screen';
import { AppBar } from '@/components/layout/AppBar';
import { Button } from '@/components/ui/Button';
import { ButtonPrimary } from '@/components/ui/ButtonPrimary';
import { MapPin } from '@/components/icons/MapPin';
import { Calendar } from '@/components/icons/Calendar';
import { getEvent } from '@/mocks/events';
import { colors, radius, typography } from '@/constants/theme';

export default function EventDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const event = getEvent(id);

  return (
    <Screen scroll>
      <AppBar title="약속 정보" />
      <View style={{ paddingHorizontal: 24, paddingTop: 8, paddingBottom: 24, gap: 24 }}>
        <View>
          <Text
            style={{
              fontFamily: typography.fontFamily.bold,
              fontSize: typography.size['2xl'],
              color: colors.text.primary,
              letterSpacing: typography.letterSpacing,
              lineHeight: typography.lineHeight['2xl'],
            }}
          >
            {event.title}
          </Text>
        </View>

        <View
          style={{
            backgroundColor: colors.surface.field,
            borderRadius: radius.lg,
            padding: 16,
            gap: 12,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Calendar size={18} color={colors.text.secondary} />
            <Text
              style={{
                fontFamily: typography.fontFamily.bold,
                fontSize: typography.size.sm,
                color: colors.text.primary,
                letterSpacing: typography.letterSpacing,
              }}
            >
              {`${event.date} · ${event.time}`}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 10 }}>
            <MapPin size={18} />
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: typography.fontFamily.bold,
                  fontSize: typography.size.sm,
                  color: colors.text.primary,
                  letterSpacing: typography.letterSpacing,
                }}
              >
                {event.place}
              </Text>
              <Text
                style={{
                  fontFamily: typography.fontFamily.sans,
                  fontSize: typography.size.xs,
                  color: colors.text.secondary,
                  marginTop: 2,
                }}
              >
                {event.address}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            height: 160,
            borderRadius: radius.lg,
            backgroundColor: '#E8F4EF',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
              backgroundColor: colors.surface.background,
              paddingHorizontal: 14,
              paddingVertical: 8,
              borderRadius: radius.full,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.06,
              shadowRadius: 6,
              elevation: 2,
            }}
          >
            <MapPin size={16} />
            <Text
              style={{
                fontFamily: typography.fontFamily.bold,
                fontSize: typography.size.xs,
                color: colors.text.primary,
                letterSpacing: typography.letterSpacing,
              }}
            >
              {event.place}
            </Text>
          </View>
        </View>

        <View>
          <Text
            style={{
              fontFamily: typography.fontFamily.bold,
              fontSize: typography.size.md,
              color: colors.text.primary,
              marginBottom: 12,
              letterSpacing: typography.letterSpacing,
            }}
          >
            {`참가자 (${event.participants.length})`}
          </Text>
          <View style={{ gap: 12 }}>
            {event.participants.map((p) => (
              <View key={p.name} style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: radius.full,
                    backgroundColor: p.color,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontFamily: typography.fontFamily.bold,
                      fontSize: typography.size.sm,
                      color: colors.text.inverse,
                    }}
                  >
                    {p.initial}
                  </Text>
                </View>
                <Text
                  style={{
                    fontFamily: typography.fontFamily.bold,
                    fontSize: typography.size.sm,
                    color: colors.text.primary,
                    letterSpacing: typography.letterSpacing,
                  }}
                >
                  {p.name}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={{ flexDirection: 'row', gap: 8 }}>
          <View style={{ flex: 1 }}>
            <Button
              text="채팅방 가기"
              variant="outline"
              onPress={() => router.push(`/chat/${event.chatId}`)}
            />
          </View>
          <View style={{ flex: 1 }}>
            <ButtonPrimary
              text="수정하기"
              onPress={() =>
                router.push(
                  `/chat/new-appointment?edit=${id ?? 'default'}&title=${encodeURIComponent(event.title)}&place=${encodeURIComponent(event.place)}`,
                )
              }
            />
          </View>
        </View>
      </View>
    </Screen>
  );
}
