import { Pressable, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { colors, typography } from '@/constants/theme';

type RadioProps = {
  selected: boolean;
  onPress?: () => void;
  label?: string;
  description?: string;
  size?: number;
  disabled?: boolean;
};

export function Radio({
  selected,
  onPress,
  label,
  description,
  size = 22,
  disabled = false,
}: RadioProps) {
  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      hitSlop={6}
      style={{ flexDirection: 'row', alignItems: 'center', opacity: disabled ? 0.5 : 1 }}
    >
      <Svg width={size} height={size} viewBox="0 0 22 22">
        <Circle
          cx={11}
          cy={11}
          r={10}
          fill="transparent"
          stroke={selected ? colors.brand.primary : colors.surface.divider}
          strokeWidth={1.5}
        />
        {selected ? <Circle cx={11} cy={11} r={5} fill={colors.brand.primary} /> : null}
      </Svg>
      {label || description ? (
        <View style={{ marginLeft: 10, flex: 1 }}>
          {label ? (
            <Text
              style={{
                fontFamily: typography.fontFamily.sans,
                fontSize: typography.size.md,
                lineHeight: typography.lineHeight.md,
                color: colors.text.primary,
                letterSpacing: typography.letterSpacing,
              }}
            >
              {label}
            </Text>
          ) : null}
          {description ? (
            <Text
              style={{
                marginTop: 2,
                fontFamily: typography.fontFamily.sans,
                fontSize: typography.size.xs,
                color: colors.text.secondary,
              }}
            >
              {description}
            </Text>
          ) : null}
        </View>
      ) : null}
    </Pressable>
  );
}
