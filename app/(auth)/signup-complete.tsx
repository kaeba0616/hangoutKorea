import { router } from 'expo-router';
import { Text, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { Screen } from '@/components/layout/Screen';
import { AppBar } from '@/components/layout/AppBar';
import { ButtonPrimary } from '@/components/ui/ButtonPrimary';
import { useMockAuth } from '@/hooks/useMockAuth';
import { colors, typography } from '@/constants/theme';

function SuccessCheck() {
  return (
    <Svg width={120} height={120} viewBox="0 0 120 120">
      <Circle cx={60} cy={60} r={56} fill={colors.brand.primary} />
      <Path
        d="M40 62L54 76L82 48"
        stroke="#FFFFFF"
        strokeWidth={6}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

export default function SignupComplete() {
  const { issueToken } = useMockAuth();

  const handleNext = async () => {
    await issueToken();
    router.replace('/(onboarding)/setup');
  };

  return (
    <Screen>
      <AppBar showBack={false} />
      <View style={{ flex: 1, paddingHorizontal: 24, alignItems: 'center' }}>
        <Text
          style={{
            fontFamily: typography.fontFamily.bold,
            fontSize: typography.size['2xl'],
            lineHeight: typography.lineHeight['2xl'],
            letterSpacing: typography.letterSpacing,
            color: colors.text.primary,
            alignSelf: 'flex-start',
            marginTop: 16,
          }}
        >
          이메일 인증 완료!
        </Text>
        <Text
          style={{
            fontFamily: typography.fontFamily.sans,
            fontSize: typography.size.md,
            color: colors.text.secondary,
            alignSelf: 'flex-start',
            marginTop: 12,
            letterSpacing: typography.letterSpacing,
          }}
        >
          이제 프로필을 설정하고 친구를 만나보세요.
        </Text>

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <SuccessCheck />
        </View>

        <View style={{ width: '100%', paddingBottom: 24 }}>
          <ButtonPrimary text="프로필 만들기" onPress={handleNext} />
        </View>
      </View>
    </Screen>
  );
}
