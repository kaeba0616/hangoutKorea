import Svg, { Path, Rect } from 'react-native-svg';
import { colors } from '@/constants/theme';

type Props = { size?: number; color?: string };

export function Calendar({ size = 18, color = colors.text.primary }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Rect
        x={3}
        y={5}
        width={18}
        height={16}
        rx={2}
        stroke={color}
        strokeWidth={1.8}
        fill="none"
      />
      <Path d="M3 9H21" stroke={color} strokeWidth={1.8} />
      <Path d="M8 3V7" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      <Path d="M16 3V7" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}
