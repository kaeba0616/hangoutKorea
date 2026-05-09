import Svg, { Circle, Path } from 'react-native-svg';

type Props = { size?: number; color?: string };

export function Camera({ size = 20, color = '#FFFFFF' }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20">
      <Path
        d="M3 7C3 6.4 3.4 6 4 6H6L7 4H13L14 6H16C16.6 6 17 6.4 17 7V15C17 15.6 16.6 16 16 16H4C3.4 16 3 15.6 3 15V7Z"
        fill={color}
      />
      <Circle cx={10} cy={11} r={3} fill="rgba(0,0,0,0.2)" />
    </Svg>
  );
}
