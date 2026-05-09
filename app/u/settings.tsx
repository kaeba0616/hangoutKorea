import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { Screen } from '@/components/layout/Screen';
import { AppBar } from '@/components/layout/AppBar';
import { ChevronRight } from '@/components/icons/ChevronRight';
import { Switch } from '@/components/ui/Switch';
import { useState } from 'react';
import { useMockAuth } from '@/hooks/useMockAuth';
import { useOnboardingStore } from '@/hooks/useOnboardingStore';
import { colors, typography } from '@/constants/theme';

type Section = {
  title: string;
  items: {
    label: string;
    type: 'link' | 'toggle';
    value?: boolean;
    onPress?: () => void;
    onToggle?: (next: boolean) => void;
    danger?: boolean;
  }[];
};

export default function Settings() {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [marketingEnabled, setMarketingEnabled] = useState(false);
  const { signOut } = useMockAuth();

  const handleLogout = async () => {
    await signOut();
    useOnboardingStore.getState().reset();
    router.replace('/onboarding-splash');
  };

  const sections: Section[] = [
    {
      title: '알림',
      items: [
        { label: '푸시 알림', type: 'toggle', value: pushEnabled, onToggle: setPushEnabled },
        { label: '이메일 알림', type: 'toggle', value: emailEnabled, onToggle: setEmailEnabled },
        { label: '마케팅 정보 수신', type: 'toggle', value: marketingEnabled, onToggle: setMarketingEnabled },
      ],
    },
    {
      title: '계정',
      items: [
        { label: '비밀번호 변경', type: 'link', onPress: () => {} },
        { label: '연결된 계정', type: 'link', onPress: () => {} },
        { label: '본인 인증', type: 'link', onPress: () => {} },
      ],
    },
    {
      title: '약관',
      items: [
        { label: '서비스 이용약관', type: 'link', onPress: () => {} },
        { label: '개인정보 처리방침', type: 'link', onPress: () => {} },
        { label: '오픈소스 라이선스', type: 'link', onPress: () => {} },
      ],
    },
    {
      title: '기타',
      items: [
        { label: '로그아웃', type: 'link', onPress: handleLogout, danger: true },
      ],
    },
  ];

  return (
    <Screen scroll>
      <AppBar title="설정" />
      <View style={{ paddingBottom: 32 }}>
        {sections.map((section) => (
          <View key={section.title} style={{ marginTop: 16 }}>
            <Text
              style={{
                fontFamily: typography.fontFamily.bold,
                fontSize: typography.size.xs,
                color: colors.text.secondary,
                paddingHorizontal: 24,
                paddingVertical: 8,
                letterSpacing: typography.letterSpacing,
              }}
            >
              {section.title}
            </Text>
            {section.items.map((item, i) => (
              <Pressable
                key={item.label}
                onPress={item.type === 'link' ? item.onPress : undefined}
                style={({ pressed }) => ({
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: 24,
                  paddingVertical: 14,
                  backgroundColor: pressed ? colors.surface.field : 'transparent',
                  borderTopWidth: i === 0 ? 1 : 0,
                  borderBottomWidth: 1,
                  borderColor: colors.surface.divider,
                })}
              >
                <Text
                  style={{
                    fontFamily: typography.fontFamily.sans,
                    fontSize: typography.size.sm,
                    color: item.danger ? colors.state.error : colors.text.primary,
                    letterSpacing: typography.letterSpacing,
                  }}
                >
                  {item.label}
                </Text>
                {item.type === 'toggle' ? (
                  <Switch value={item.value ?? false} onChange={item.onToggle ?? (() => {})} />
                ) : (
                  <ChevronRight size={18} />
                )}
              </Pressable>
            ))}
          </View>
        ))}
        <View style={{ paddingHorizontal: 24, paddingTop: 24 }}>
          <Text
            style={{
              fontFamily: typography.fontFamily.sans,
              fontSize: typography.size.xs,
              color: colors.text.tertiary,
              textAlign: 'center',
            }}
          >
            HangKo · 버전 0.1.0
          </Text>
        </View>
      </View>
    </Screen>
  );
}
