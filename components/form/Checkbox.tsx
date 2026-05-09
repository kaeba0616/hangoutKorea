import { Pressable, Text } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';
import { colors, typography } from '@/constants/theme';

type CheckboxProps = {
  checked: boolean;
  onPress?: () => void;
  label?: string;
  size?: number;
  disabled?: boolean;
  validating?: boolean;
};

export function Checkbox({
  checked,
  onPress,
  label,
  size = 20,
  disabled = false,
  validating = false,
}: CheckboxProps) {
  const fillColor = validating
    ? checked
      ? colors.brand.primary
      : 'transparent'
    : checked
      ? colors.brand.primary
      : 'transparent';

  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      hitSlop={6}
      style={{ flexDirection: 'row', alignItems: 'center', opacity: disabled ? 0.5 : 1 }}
    >
      <Svg width={size} height={size} viewBox="0 0 20 20">
        <Rect
          x={1}
          y={1}
          width={18}
          height={18}
          rx={4}
          fill={fillColor}
          stroke={checked ? colors.brand.primary : colors.surface.divider}
          strokeWidth={1.5}
        />
        {checked ? (
          <Path
            d="M5.5 10.5L8.5 13.5L14.5 7"
            stroke="#FFFFFF"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        ) : null}
      </Svg>
      {label ? (
        <Text
          style={{
            marginLeft: 10,
            fontFamily: typography.fontFamily.sans,
            fontSize: typography.size.sm,
            lineHeight: typography.lineHeight.sm,
            color: validating
              ? checked
                ? colors.state.success
                : colors.text.secondary
              : colors.text.primary,
            letterSpacing: typography.letterSpacing,
          }}
        >
          {label}
        </Text>
      ) : null}
    </Pressable>
  );
}
