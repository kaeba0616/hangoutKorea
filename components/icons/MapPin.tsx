import Svg, { Circle, Path } from 'react-native-svg';
import { colors } from '@/constants/theme';

type Props = { size?: number; color?: string };

export function MapPin({ size = 20, color = colors.brand.primary }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M12 22S4 15.5 4 10C4 5.6 7.6 2 12 2C16.4 2 20 5.6 20 10C20 15.5 12 22 12 22Z"
        fill={color}
      />
      <Circle cx={12} cy={10} r={3} fill="#FFFFFF" />
    </Svg>
  );
}
