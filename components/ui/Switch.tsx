import { Pressable, View } from 'react-native';
import { colors, radius } from '@/constants/theme';

type Props = {
  value: boolean;
  onChange: (next: boolean) => void;
};

export function Switch({ value, onChange }: Props) {
  return (
    <Pressable
      onPress={() => onChange(!value)}
      hitSlop={6}
      style={{
        width: 44,
        height: 26,
        borderRadius: radius.full,
        backgroundColor: value ? colors.brand.primary : colors.surface.divider,
        padding: 3,
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          width: 20,
          height: 20,
          borderRadius: radius.full,
          backgroundColor: '#FFFFFF',
          alignSelf: value ? 'flex-end' : 'flex-start',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.15,
          shadowRadius: 2,
          elevation: 2,
        }}
      />
    </Pressable>
  );
}
