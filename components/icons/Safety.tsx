import Svg, { Path } from 'react-native-svg';
import { colors } from '@/constants/theme';

type Props = { size?: number; color?: string };

export function Safety({ size = 20, color = colors.brand.primary }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20">
      <Path
        d="M10 2L3.5 4.5V9.5C3.5 13.4 6.3 17 10 18C13.7 17 16.5 13.4 16.5 9.5V4.5L10 2Z"
        fill={color}
      />
      <Path
        d="M8.5 10.5L7 9L6 10L8.5 12.5L14 7L13 6L8.5 10.5Z"
        fill="#FFFFFF"
      />
    </Svg>
  );
}
