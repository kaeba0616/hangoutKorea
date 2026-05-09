import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { Screen } from '@/components/layout/Screen';
import { AppBar } from '@/components/layout/AppBar';
import { ButtonSNS } from '@/components/ui/ButtonSNS';
import { colors, layout, radius, typography } from '@/constants/theme';

export default function AuthEntry() {
  return (
    <Screen>
      <AppBar showBack />
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        <View style={{ flex: 1, justifyContent: 'center', gap: 32 }}>
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
            {'즐거운 여행을\n시작하세요.'}
          </Text>

          <View style={{ gap: 16, alignItems: 'center', paddingHorizontal: 12 }}>
            <ButtonSNS provider="line" onPress={() => router.push('/(auth)/email')} />
            <ButtonSNS provider="apple" onPress={() => router.push('/(auth)/email')} />
            <ButtonSNS provider="kakao" onPress={() => router.push('/(auth)/email')} />
            <Pressable
              onPress={() => router.push('/(auth)/email')}
              android_ripple={{ color: 'rgba(0,0,0,0.06)' }}
              style={{
                height: layout.buttonHeight,
                width: '100%',
                borderRadius: radius.full,
                borderWidth: 1,
                borderColor: '#CACACA',
                backgroundColor: colors.surface.background,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  fontFamily: typography.fontFamily.bold,
                  fontSize: typography.size.lg,
                  lineHeight: typography.lineHeight.lg,
                  letterSpacing: typography.letterSpacing,
                  color: colors.text.primary,
                }}
              >
                이메일로 계속하기
              </Text>
            </Pressable>

            <View
              style={{
                width: '100%',
                borderTopWidth: 1,
                borderTopColor: '#E8E8E8',
                marginTop: 8,
                paddingTop: 24,
                alignItems: 'center',
              }}
            >
              <Pressable hitSlop={12}>
                <Text
                  style={{
                    fontFamily: typography.fontFamily.sans,
                    fontSize: typography.size.xs,
                    lineHeight: typography.lineHeight.xs,
                    letterSpacing: typography.letterSpacing,
                    color: '#5CA08F',
                  }}
                >
                  로그인에 문제가 있나요?
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </Screen>
  );
}
