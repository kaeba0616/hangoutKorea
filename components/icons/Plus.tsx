import Svg, { Path } from 'react-native-svg';
import { colors } from '@/constants/theme';

type Props = { size?: number; color?: string };

export function Plus({ size = 24, color = colors.text.primary }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M12 5V19M5 12H19"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}
