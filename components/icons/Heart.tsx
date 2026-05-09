import Svg, { Path } from 'react-native-svg';
import { colors } from '@/constants/theme';

type Props = { size?: number; color?: string; filled?: boolean };

export function Heart({ size = 24, color = colors.text.primary, filled = false }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M12 21s-7-4.5-9.5-9C0.5 8 3 4 6.5 4c2 0 3.5 1 5.5 3 2-2 3.5-3 5.5-3C21 4 23.5 8 21.5 12 19 16.5 12 21 12 21z"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={filled ? color : 'none'}
      />
    </Svg>
  );
}
