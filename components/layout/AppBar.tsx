import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { ArrowLeft } from '@/components/icons/ArrowLeft';
import { colors, layout, typography } from '@/constants/theme';

type AppBarProps = {
  title?: string;
  showBack?: boolean;
  onBackPress?: () => void;
  right?: React.ReactNode;
};

export function AppBar({ title, showBack = true, onBackPress, right }: AppBarProps) {
  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
      return;
    }
    if (router.canGoBack()) {
      router.back();
    }
  };

  return (
    <View
      style={{
        height: layout.appBarHeight,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 8,
      }}
    >
      <View style={{ width: 48, alignItems: 'flex-start' }}>
        {showBack ? (
          <Pressable
            onPress={handleBack}
            hitSlop={12}
            style={{
              width: 44,
              height: 44,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            accessibilityRole="button"
            accessibilityLabel="뒤로 가기"
          >
            <ArrowLeft size={24} color={colors.text.primary} />
          </Pressable>
        ) : null}
      </View>
      <Text
        style={{
          flex: 1,
          textAlign: 'center',
          fontFamily: typography.fontFamily.bold,
          fontSize: typography.size.md,
          lineHeight: typography.lineHeight.md,
          letterSpacing: typography.letterSpacing,
          color: colors.text.primary,
        }}
        numberOfLines={1}
      >
        {title ?? ''}
      </Text>
      <View style={{ width: 48, alignItems: 'flex-end' }}>{right ?? null}</View>
    </View>
  );
}
