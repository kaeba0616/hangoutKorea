import { Platform, Pressable, Text, View } from 'react-native';
import { Href, useRouter } from 'expo-router';
import { ChatBubble } from '@/components/icons/ChatBubble';
import { Globe } from '@/components/icons/Globe';
import { Heart } from '@/components/icons/Heart';
import { User } from '@/components/icons/User';
import { colors, typography } from '@/constants/theme';

type TabKey = 'chat' | 'match' | 'community' | 'profile';

const TABS: {
  key: TabKey;
  label: string;
  href: Href;
  icon: (color: string, focused: boolean) => React.ReactNode;
}[] = [
  {
    key: 'chat',
    label: '채팅',
    href: '/chat',
    icon: (color, focused) => <ChatBubble size={24} color={color} filled={focused} />,
  },
  {
    key: 'match',
    label: '매칭',
    href: '/match',
    icon: (color, focused) => <Heart size={24} color={color} filled={focused} />,
  },
  {
    key: 'community',
    label: '커뮤니티',
    href: '/community',
    icon: (color, focused) => <Globe size={24} color={color} filled={focused} />,
  },
  {
    key: 'profile',
    label: '프로필',
    href: '/profile',
    icon: (color, focused) => <User size={24} color={color} filled={focused} />,
  },
];

export function BottomNav({ active }: { active: TabKey }) {
  const router = useRouter();
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: colors.surface.background,
        borderTopColor: colors.surface.divider,
        borderTopWidth: 1,
        height: Platform.OS === 'ios' ? 84 : 64,
        paddingTop: 8,
        paddingBottom: Platform.OS === 'ios' ? 24 : 8,
      }}
    >
      {TABS.map((t) => {
        const focused = active === t.key;
        const tint = focused ? colors.text.primary : colors.text.tertiary;
        return (
          <Pressable
            key={t.key}
            onPress={() => router.push(t.href)}
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4 }}
          >
            {t.icon(tint, focused)}
            <Text
              style={{
                fontFamily: typography.fontFamily.sans,
                fontSize: 11,
                color: tint,
                marginTop: 2,
                letterSpacing: 0,
              }}
            >
              {t.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
