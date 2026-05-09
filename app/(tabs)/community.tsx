import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Screen } from '@/components/layout/Screen';
import { Globe } from '@/components/icons/Globe';
import { colors, typography } from '@/constants/theme';

export default function CommunityTab() {
  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.surface.background }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          height: 56,
        }}
      >
        <Text
          style={{
            fontFamily: typography.fontFamily.bold,
            fontSize: typography.size.md,
            color: colors.text.primary,
            letterSpacing: typography.letterSpacing,
          }}
        >
          커뮤니티
        </Text>
      </View>

      <Screen edges={[]}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 }}>
          <Globe size={48} color={colors.text.tertiary} />
          <Text
            style={{
              fontFamily: typography.fontFamily.bold,
              fontSize: typography.size.lg,
              color: colors.text.primary,
              marginTop: 16,
              letterSpacing: typography.letterSpacing,
            }}
          >
            커뮤니티 준비 중
          </Text>
          <Text
            style={{
              fontFamily: typography.fontFamily.sans,
              fontSize: typography.size.sm,
              color: colors.text.secondary,
              marginTop: 8,
              textAlign: 'center',
              lineHeight: typography.lineHeight.md,
              letterSpacing: typography.letterSpacing,
            }}
          >
            여행자와 로컬이 모이는 공간을{'\n'}곧 열어드릴게요.
          </Text>
        </View>
      </Screen>
    </SafeAreaView>
  );
}
