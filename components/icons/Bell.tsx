import Svg, { Circle, Path } from 'react-native-svg';
import { colors } from '@/constants/theme';

type Props = { size?: number; color?: string; hasBadge?: boolean };

export function Bell({ size = 24, color = colors.text.primary, hasBadge = false }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M6 8C6 4.7 8.7 2 12 2C15.3 2 18 4.7 18 8V13L20 16H4L6 13V8Z"
        stroke={color}
        strokeWidth={1.8}
        strokeLinejoin="round"
        fill="none"
      />
      <Path
        d="M10 19C10.5 20 11.2 20.5 12 20.5C12.8 20.5 13.5 20 14 19"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        fill="none"
      />
      {hasBadge ? <Circle cx={18} cy={5} r={3} fill={colors.state.error} /> : null}
    </Svg>
  );
}
