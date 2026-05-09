import Svg, { Path, Rect } from 'react-native-svg';
import { colors } from '@/constants/theme';

type Props = { size?: number; color?: string };

export function Mail({ size = 18, color = colors.text.tertiary }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Rect x={3} y={5} width={18} height={14} rx={2} stroke={color} strokeWidth={1.6} fill="none" />
      <Path d="M3 7L12 13L21 7" stroke={color} strokeWidth={1.6} strokeLinejoin="round" fill="none" />
    </Svg>
  );
}
