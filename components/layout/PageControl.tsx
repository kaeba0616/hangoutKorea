import { View } from 'react-native';
import { colors } from '@/constants/theme';

type Props = {
  total: number;
  current: number;
  activeColor?: string;
  inactiveColor?: string;
};

export function PageControl({
  total,
  current,
  activeColor = colors.text.primary,
  inactiveColor = colors.surface.divider,
}: Props) {
  return (
    <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center', justifyContent: 'center' }}>
      {Array.from({ length: total }).map((_, i) => {
        const isActive = i === current;
        return (
          <View
            key={i}
            style={{
              width: isActive ? 16 : 6,
              height: 6,
              borderRadius: 3,
              backgroundColor: isActive ? activeColor : inactiveColor,
            }}
          />
        );
      })}
    </View>
  );
}
