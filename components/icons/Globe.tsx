import Svg, { Circle, Path } from 'react-native-svg';
import { colors } from '@/constants/theme';

type Props = { size?: number; color?: string; filled?: boolean };

export function Globe({ size = 24, color = colors.text.primary, filled = false }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle cx={12} cy={12} r={9} stroke={color} strokeWidth={1.8} fill={filled ? color : 'none'} />
      <Path
        d="M3 12H21M12 3C14.5 5.5 15.5 8.5 15.5 12C15.5 15.5 14.5 18.5 12 21C9.5 18.5 8.5 15.5 8.5 12C8.5 8.5 9.5 5.5 12 3Z"
        stroke={filled ? colors.surface.background : color}
        strokeWidth={1.8}
        fill="none"
      />
    </Svg>
  );
}
