import Svg, { Path } from 'react-native-svg';
import { colors } from '@/constants/theme';

type Props = { size?: number; color?: string };

export function EyeOff({ size = 18, color = colors.text.tertiary }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M3 3L21 21M10.58 10.58a3 3 0 0 0 4.24 4.24M9.88 5.09A10.94 10.94 0 0 1 12 5c5 0 9.27 3.11 11 7.5-.49 1.24-1.21 2.39-2.11 3.4M6.61 6.61C4.55 7.92 2.94 9.74 2 11.5 3.73 15.89 8 19 12 19c1.62 0 3.16-.32 4.59-.9"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}
