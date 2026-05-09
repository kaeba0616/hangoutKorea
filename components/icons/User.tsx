import Svg, { Circle, Path } from 'react-native-svg';
import { colors } from '@/constants/theme';

type Props = { size?: number; color?: string; filled?: boolean };

export function User({ size = 24, color = colors.text.primary, filled = false }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle cx={12} cy={8} r={4} stroke={color} strokeWidth={1.8} fill={filled ? color : 'none'} />
      <Path
        d="M4 21C4 16.5 7.5 14 12 14C16.5 14 20 16.5 20 21"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        fill={filled ? color : 'none'}
      />
    </Svg>
  );
}
