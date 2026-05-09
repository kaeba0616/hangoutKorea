import { router } from 'expo-router';
import { useEffect } from 'react';
import { Image, Text, View } from 'react-native';
import { Screen } from '@/components/layout/Screen';
import { AppBar } from '@/components/layout/AppBar';
import { colors, typography } from '@/constants/theme';

const checkImage = require('@/assets/illustrations/check.png');

export default function VerifyComplete() {
  useEffect(() => {
    const t = setTimeout(() => {
      router.replace('/(auth)/password');
    }, 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <Screen>
      <AppBar showBack />
      <View style={{ flex: 1, paddingHorizontal: 16, alignItems: 'center', justifyContent: 'center', gap: 24 }}>
        <View style={{ alignItems: 'center', gap: 8 }}>
          <Text
            style={{
              fontFamily: typography.fontFamily.bold,
              fontSize: typography.size['2xl'],
              lineHeight: typography.lineHeight['2xl'],
              letterSpacing: typography.letterSpacing,
              color: colors.text.primary,
              textAlign: 'center',
            }}
          >
            이메일 인증 완료!
          </Text>
          <Text
            style={{
              fontFamily: typography.fontFamily.sans,
              fontSize: typography.size.sm,
              lineHeight: typography.lineHeight.sm,
              letterSpacing: typography.letterSpacing,
              color: colors.text.secondary,
              textAlign: 'center',
            }}
          >
            이제 비밀번호 설정과 약관 동의를 진행합니다.
          </Text>
        </View>

        <Image source={checkImage} style={{ width: 148, height: 148 }} resizeMode="contain" />
      </View>
    </Screen>
  );
}
