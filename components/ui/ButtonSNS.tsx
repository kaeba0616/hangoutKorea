import { Pressable, Text, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { colors, layout, radius, typography } from '@/constants/theme';

type SnsProvider = 'line' | 'apple' | 'kakao';

type ButtonSNSProps = {
  provider: SnsProvider;
  onPress?: () => void;
  fullWidth?: boolean;
  style?: ViewStyle;
};

const providerConfig: Record<
  SnsProvider,
  { background: string; textColor: string; label: string }
> = {
  line: {
    background: colors.sns.line,
    textColor: colors.sns.lineText,
    label: 'LINE으로 계속하기',
  },
  apple: {
    background: colors.sns.apple,
    textColor: colors.sns.appleText,
    label: 'Apple로 계속하기',
  },
  kakao: {
    background: colors.sns.kakao,
    textColor: colors.sns.kakaoText,
    label: 'Kakao로 계속하기',
  },
};

function SnsIcon({ provider, color }: { provider: SnsProvider; color: string }) {
  if (provider === 'line') {
    return (
      <Svg width={20} height={20} viewBox="0 0 20 20">
        <Path
          d="M10 2.5c-4.42 0-8 2.85-8 6.36 0 3.15 2.84 5.78 6.68 6.27.26.06.61.17.7.4.08.21.05.53.03.74l-.11.68c-.04.2-.16.79.69.43.85-.36 4.59-2.7 6.27-4.63 1.16-1.27 1.74-2.56 1.74-3.89 0-3.51-3.58-6.36-8-6.36zm-3.16 8.42H5.26c-.23 0-.42-.19-.42-.42V7.34c0-.23.19-.42.42-.42.23 0 .42.19.42.42v2.74h1.16c.23 0 .42.19.42.42 0 .23-.19.42-.42.42zm1.65-.42c0 .23-.19.42-.42.42s-.42-.19-.42-.42V7.34c0-.23.19-.42.42-.42s.42.19.42.42v3.16zm3.81 0c0 .18-.12.34-.29.4-.05.02-.1.02-.13.02-.13 0-.25-.06-.34-.17l-1.62-2.21v1.96c0 .23-.19.42-.42.42-.23 0-.42-.19-.42-.42V7.34c0-.18.11-.34.29-.4.04-.01.09-.02.13-.02.13 0 .25.06.33.17l1.63 2.21V7.34c0-.23.19-.42.42-.42.23 0 .42.19.42.42v3.16zm2.66-2c.23 0 .42.19.42.42 0 .23-.19.42-.42.42h-1.16v.74h1.16c.23 0 .42.19.42.42 0 .23-.19.42-.42.42h-1.58c-.23 0-.42-.19-.42-.42V7.34c0-.23.19-.42.42-.42h1.58c.23 0 .42.19.42.42 0 .23-.19.42-.42.42h-1.16v.74h1.16z"
          fill={color}
        />
      </Svg>
    );
  }
  if (provider === 'apple') {
    return (
      <Svg width={20} height={20} viewBox="0 0 20 20">
        <Path
          d="M14.49 10.62c-.02-2.04 1.67-3.02 1.74-3.07-.95-1.39-2.43-1.58-2.95-1.6-1.26-.13-2.45.74-3.09.74-.65 0-1.62-.72-2.66-.7-1.37.02-2.63.79-3.34 2.02-1.42 2.46-.36 6.1 1.03 8.1.68.98 1.49 2.08 2.55 2.04 1.03-.04 1.42-.66 2.66-.66 1.24 0 1.59.66 2.67.64 1.1-.02 1.8-1 2.47-1.99.78-1.14 1.1-2.25 1.12-2.31-.02-.01-2.15-.83-2.17-3.27zM12.6 4.74c.56-.69.94-1.65.84-2.6-.81.03-1.79.54-2.37 1.22-.52.6-.97 1.58-.85 2.51.9.07 1.82-.46 2.38-1.13z"
          fill={color}
        />
      </Svg>
    );
  }
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20">
      <Path
        d="M10 3C5.58 3 2 5.74 2 9.12c0 2.18 1.49 4.09 3.74 5.18-.16.59-.6 2.21-.69 2.55-.11.43.16.42.33.31.14-.09 2.18-1.48 3.06-2.08.51.07 1.04.11 1.56.11 4.42 0 8-2.74 8-6.07S14.42 3 10 3z"
        fill={color}
      />
    </Svg>
  );
}

export function ButtonSNS({ provider, onPress, fullWidth = true, style }: ButtonSNSProps) {
  const cfg = providerConfig[provider];
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
      style={[
        {
          height: layout.buttonHeight,
          borderRadius: radius.full,
          width: fullWidth ? '100%' : 319,
          backgroundColor: cfg.background,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          paddingHorizontal: 24,
        },
        style,
      ]}
    >
      <SnsIcon provider={provider} color={cfg.textColor} />
      <Text
        style={{
          fontFamily: typography.fontFamily.bold,
          fontSize: typography.size.lg,
          lineHeight: typography.lineHeight.lg,
          letterSpacing: typography.letterSpacing,
          color: cfg.textColor,
        }}
      >
        {cfg.label}
      </Text>
    </Pressable>
  );
}
