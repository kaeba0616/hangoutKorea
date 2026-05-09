import Svg, { Path } from 'react-native-svg';
import { colors } from '@/constants/theme';

type Props = { size?: number; color?: string; filled?: boolean };

export function ChatBubble({ size = 24, color = colors.text.primary, filled = false }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M4 5C4 3.9 4.9 3 6 3H18C19.1 3 20 3.9 20 5V14C20 15.1 19.1 16 18 16H10L6 20V16H6C4.9 16 4 15.1 4 14V5Z"
        stroke={color}
        strokeWidth={1.8}
        strokeLinejoin="round"
        fill={filled ? color : 'none'}
      />
    </Svg>
  );
}
