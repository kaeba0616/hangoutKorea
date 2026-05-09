import Svg, { Circle, Path } from 'react-native-svg';
import { colors } from '@/constants/theme';

type Props = { size?: number; color?: string };

export function Search({ size = 20, color = colors.text.tertiary }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20">
      <Circle cx={9} cy={9} r={6} stroke={color} strokeWidth={1.5} fill="none" />
      <Path
        d="M14 14L17 17"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
}
