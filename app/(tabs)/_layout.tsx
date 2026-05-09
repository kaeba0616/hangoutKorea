import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { ChatBubble } from '@/components/icons/ChatBubble';
import { Globe } from '@/components/icons/Globe';
import { Heart } from '@/components/icons/Heart';
import { User } from '@/components/icons/User';
import { colors, typography } from '@/constants/theme';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: colors.text.primary,
        tabBarInactiveTintColor: colors.text.tertiary,
        tabBarStyle: {
          backgroundColor: colors.surface.background,
          borderTopColor: colors.surface.divider,
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 84 : 64,
          paddingTop: 8,
          paddingBottom: Platform.OS === 'ios' ? 24 : 8,
        },
        tabBarLabelStyle: {
          fontFamily: typography.fontFamily.sans,
          fontSize: 11,
          letterSpacing: 0,
          marginTop: 2,
          paddingHorizontal: 0,
        },
        tabBarItemStyle: {
          paddingHorizontal: 4,
        },
      }}
    >
      <Tabs.Screen
        name="chat"
        options={{
          title: '채팅',
          tabBarIcon: ({ color, focused }) => (
            <ChatBubble size={24} color={color} filled={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="match"
        options={{
          title: '매칭',
          tabBarIcon: ({ color, focused }) => (
            <Heart size={24} color={color} filled={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: '커뮤니티',
          tabBarIcon: ({ color, focused }) => (
            <Globe size={24} color={color} filled={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: '프로필',
          tabBarIcon: ({ color, focused }) => (
            <User size={24} color={color} filled={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
