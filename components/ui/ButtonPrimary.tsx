import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, Text, View, ViewStyle } from 'react-native';
import { colors, layout, radius, shadow, typography } from '@/constants/theme';

type ButtonPrimaryProps = {
  text: string;
  onPress?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  testID?: string;
};

export function ButtonPrimary({
  text,
  onPress,
  disabled = false,
  fullWidth = true,
  style,
  testID,
}: ButtonPrimaryProps) {
  const labelStyle = {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.size.lg,
    lineHeight: typography.lineHeight.lg,
    letterSpacing: typography.letterSpacing,
    textAlign: 'center' as const,
  };

  if (disabled) {
    return (
      <View
        style={[
          {
            height: layout.buttonHeight,
            borderRadius: radius.full,
            width: fullWidth ? '100%' : 319,
            backgroundColor: '#E8E8E8',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 24,
          },
          style,
        ]}
        testID={testID}
      >
        <Text style={[labelStyle, { color: '#A1A1A1' }]}>{text}</Text>
      </View>
    );
  }

  return (
    <View
      style={[
        {
          height: layout.buttonHeight,
          borderRadius: radius.full,
          width: fullWidth ? '100%' : 319,
          ...shadow.primaryButton,
        },
        style,
      ]}
      testID={testID}
    >
      <View
        style={{
          flex: 1,
          borderRadius: radius.full,
          overflow: 'hidden',
        }}
      >
        <LinearGradient
          colors={[colors.brand.primary, colors.brand.secondary]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={{ flex: 1 }}
        >
          <Pressable
            onPress={onPress}
            android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 24,
            }}
          >
            <Text style={[labelStyle, { color: colors.text.primary }]}>{text}</Text>
          </Pressable>
        </LinearGradient>
      </View>
    </View>
  );
}
