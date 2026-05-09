import { router } from 'expo-router';
import { Text, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { Screen } from '@/components/layout/Screen';
import { ButtonPrimary } from '@/components/ui/ButtonPrimary';
import { useMockAuth } from '@/hooks/useMockAuth';
import { colors, typography } from '@/constants/theme';

function Confetti() {
  return (
    <Svg width={160} height={160} viewBox="0 0 160 160">
      <Circle cx={80} cy={80} r={60} fill={colors.brand.primary} opacity={0.18} />
      <Path
        d="M40 100 L60 60 L120 80 L100 120 Z"
        fill={colors.brand.primary}
      />
      <Circle cx={50} cy={50} r={4} fill={colors.brand.secondary} />
      <Circle cx={120} cy={50} r={4} fill={colors.brand.primary} />
      <Circle cx={130} cy={110} r={4} fill={colors.brand.secondary} />
      <Circle cx={40} cy={120} r={4} fill={colors.brand.primary} />
      <Path
        d="M70 76L78 84L92 70"
        stroke="#FFFFFF"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

export default function CompleteScreen() {
  const { completeOnboarding } = useMockAuth();

  const onFinish = async () => {
    await completeOnboarding();
    router.replace('/home');
  };

  return (
    <Screen>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 }}>
        <Confetti />
        <Text
          style={{
            fontFamily: typography.fontFamily.bold,
            fontSize: typography.size['2xl'],
            lineHeight: typography.lineHeight['2xl'],
            letterSpacing: typography.letterSpacing,
            color: colors.text.primary,
            textAlign: 'center',
            marginTop: 24,
          }}
        >
          환영합니다!
        </Text>
        <Text
          style={{
            fontFamily: typography.fontFamily.sans,
            fontSize: typography.size.md,
            color: colors.text.secondary,
            textAlign: 'center',
            marginTop: 12,
            letterSpacing: typography.letterSpacing,
          }}
        >
          이제 친구를 찾아볼까요?
        </Text>
      </View>
      <View style={{ paddingHorizontal: 24, paddingBottom: 24 }}>
        <ButtonPrimary text="시작하기" onPress={onFinish} />
      </View>
    </Screen>
  );
}
