import Svg, { Circle, Path } from 'react-native-svg';
import { colors } from '@/constants/theme';

type Props = { size?: number; color?: string; checked?: boolean };

export function CheckCircle({ size = 20, color, checked = false }: Props) {
  const fill = checked ? color ?? colors.brand.primary : 'transparent';
  const stroke = checked ? fill : colors.surface.divider;
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20">
      <Circle cx={10} cy={10} r={9} fill={fill} stroke={stroke} strokeWidth={1.5} />
      {checked ? (
        <Path
          d="M6 10.5L9 13.5L14 7.5"
          stroke="#FFFFFF"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      ) : null}
    </Svg>
  );
}
