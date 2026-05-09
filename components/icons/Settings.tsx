import Svg, { Circle, Path } from 'react-native-svg';
import { colors } from '@/constants/theme';

type Props = { size?: number; color?: string };

export function Settings({ size = 24, color = colors.text.primary }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle cx={12} cy={12} r={3} stroke={color} strokeWidth={1.8} fill="none" />
      <Path
        d="M19.4 15A1.65 1.65 0 0 0 19 16.83L19.06 16.89A2 2 0 1 1 16.23 19.71L16.17 19.65A1.65 1.65 0 0 0 14.34 19.25A1.65 1.65 0 0 0 13.42 20.74V20.93A2 2 0 1 1 9.42 20.93V20.83A1.65 1.65 0 0 0 8.34 19.32A1.65 1.65 0 0 0 6.5 19.65L6.43 19.71A2 2 0 1 1 3.6 16.89L3.66 16.83A1.65 1.65 0 0 0 4 15A1.65 1.65 0 0 0 2.5 14.07H2.43A2 2 0 1 1 2.43 10.07H2.5A1.65 1.65 0 0 0 4 9A1.65 1.65 0 0 0 3.66 7.17L3.6 7.11A2 2 0 1 1 6.43 4.29L6.5 4.35A1.65 1.65 0 0 0 8.34 4.69A1.65 1.65 0 0 0 9.34 3.18V3A2 2 0 1 1 13.34 3V3.09A1.65 1.65 0 0 0 14.34 4.6A1.65 1.65 0 0 0 16.17 4.27L16.23 4.21A2 2 0 1 1 19.06 7.03L19 7.09A1.65 1.65 0 0 0 18.66 8.93A1.65 1.65 0 0 0 20.16 9.86H20.34A2 2 0 1 1 20.34 13.86H20.25A1.65 1.65 0 0 0 19.4 15Z"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}
