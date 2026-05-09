import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { Screen } from '@/components/layout/Screen';
import { ButtonPrimary } from '@/components/ui/ButtonPrimary';
import { colors, typography } from '@/constants/theme';

export default function NoResult() {
  return (
    <Screen>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 }}>
        <Text style={{ fontSize: 64 }}>😢</Text>
        <Text
          style={{
            fontFamily: typography.fontFamily.bold,
            fontSize: typography.size.xl,
            color: colors.text.primary,
            marginTop: 16,
            letterSpacing: typography.letterSpacing,
          }}
        >
          매칭 결과가 없어요.
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
          조건을 변경하거나 다시 시도해 보세요.
        </Text>
      </View>

      <View style={{ paddingHorizontal: 24, paddingBottom: 24 }}>
        <ButtonPrimary text="다시 찾기" onPress={() => router.replace('/(tabs)/match')} />
      </View>
    </Screen>
  );
}
