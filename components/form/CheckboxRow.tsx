import { Pressable, View } from 'react-native';
import { colors, radius } from '@/constants/theme';

type Props = {
  checked: boolean;
  onPress?: () => void;
  size?: number;
};

export function CheckboxRow({ checked, onPress, size = 22 }: Props) {
  return (
    <Pressable onPress={onPress} hitSlop={6}>
      <View
        style={{
          width: size,
          height: size,
          borderRadius: radius.sm,
          borderWidth: 1.5,
          borderColor: checked ? colors.brand.primary : colors.surface.divider,
          backgroundColor: checked ? colors.brand.primary : 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {checked ? (
          <View
            style={{
              width: size * 0.5,
              height: size * 0.3,
              borderLeftWidth: 2,
              borderBottomWidth: 2,
              borderColor: colors.text.primary,
              transform: [{ rotate: '-45deg' }, { translateY: -2 }],
            }}
          />
        ) : null}
      </View>
    </Pressable>
  );
}
