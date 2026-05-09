import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ImageBackground, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ButtonPrimary } from '@/components/ui/ButtonPrimary';
import { colors, typography } from '@/constants/theme';

const heroAsset = require('../assets/images/hero-splash.png');

export default function OnboardingSplash() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.surface.background }}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 529,
          overflow: 'hidden',
        }}
      >
        <ImageBackground
          source={heroAsset}
          resizeMode="cover"
          style={{ width: '100%', height: '100%' }}
        >
          <LinearGradient
            colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0)', 'rgba(255,255,255,0)', '#FFFFFF']}
            locations={[0, 0.32, 0.5, 0.95]}
            style={{ flex: 1 }}
          />
        </ImageBackground>
      </View>

      <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1 }}>
        <View style={{ flex: 1 }} />
        <View
          style={{
            paddingHorizontal: 24,
            paddingBottom: 24,
            gap: 40,
            alignItems: 'center',
          }}
        >
          <View style={{ alignItems: 'center', gap: 16 }}>
            <Text
              style={{
                fontFamily: typography.fontFamily.bold,
                fontSize: typography.size['4xl'],
                lineHeight: typography.lineHeight['4xl'],
                letterSpacing: typography.letterSpacing,
                color: colors.text.primary,
                textAlign: 'center',
              }}
            >
              {'Let’s Hang out\nin Korea'}
            </Text>
            <Text
              style={{
                fontFamily: typography.fontFamily.sans,
                fontSize: typography.size.md,
                lineHeight: typography.lineHeight.md,
                letterSpacing: typography.letterSpacing,
                color: colors.text.secondary,
                textAlign: 'center',
              }}
            >
              {'낯설고 막막한 여행이 아닌,\n새롭고 설레는 즐거움을 발견하세요.'}
            </Text>
          </View>
          <ButtonPrimary
            text="시작하기"
            onPress={() => router.push('/(auth)/entry')}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}
