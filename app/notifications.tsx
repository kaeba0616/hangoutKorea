import { Href, useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { Screen } from '@/components/layout/Screen';
import { AppBar } from '@/components/layout/AppBar';
import { EmptyState } from '@/components/ui/EmptyState';
import { Bell } from '@/components/icons/Bell';
import { NOTIFICATIONS } from '@/mocks/notifications';
import { colors, typography } from '@/constants/theme';

export default function Notifications() {
  const router = useRouter();

  if (NOTIFICATIONS.length === 0) {
    return (
      <Screen>
        <AppBar title="알림" />
        <EmptyState
          icon={<Bell size={28} color={colors.text.tertiary} />}
          title="아직 알림이 없어요"
          description="새로운 매칭이나 약속이 생기면 여기에서 알려드려요."
          size="lg"
        />
      </Screen>
    );
  }

  return (
    <Screen scroll>
      <AppBar title="알림" />
      <View style={{ paddingTop: 8, paddingBottom: 24 }}>
        {NOTIFICATIONS.map((n, i) => (
          <Pressable
            key={n.id}
            onPress={() => {
              if (n.linkTo) router.push(n.linkTo as Href);
            }}
            style={({ pressed }) => ({
              flexDirection: 'row',
              gap: 12,
              paddingHorizontal: 16,
              paddingVertical: 14,
              borderBottomWidth: i < NOTIFICATIONS.length - 1 ? 1 : 0,
              borderBottomColor: colors.surface.divider,
              backgroundColor: pressed ? colors.surface.field : 'transparent',
            })}
          >
            <View
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: '#F2FBF7',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Bell size={18} color={colors.brand.primary} />
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
                {n.title}
              </Text>
              <Text
                style={{
                  fontFamily: typography.fontFamily.sans,
                  fontSize: typography.size.xs,
                  color: colors.text.secondary,
                  marginTop: 4,
                  lineHeight: typography.lineHeight.md,
                  letterSpacing: typography.letterSpacing,
                }}
              >
                {n.body}
              </Text>
              <Text
                style={{
                  fontFamily: typography.fontFamily.sans,
                  fontSize: typography.size.xs,
                  color: colors.text.tertiary,
                  marginTop: 4,
                }}
              >
                {n.time}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}
