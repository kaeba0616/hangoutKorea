import { useEffect, useRef } from 'react';
import { Animated, Text, View } from 'react-native';
import { typography } from '@/constants/theme';

type ToastProps = {
  visible: boolean;
  message: string;
  bottomOffset?: number;
};

export function Toast({ visible, message, bottomOffset = 120 }: ToastProps) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: visible ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [visible, opacity]);

  if (!visible) return null;

  return (
    <View
      pointerEvents="none"
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: bottomOffset,
        alignItems: 'center',
      }}
    >
      <Animated.View
        style={{
          opacity,
          backgroundColor: 'rgba(120,120,120,0.85)',
          paddingHorizontal: 24,
          paddingVertical: 14,
          borderRadius: 999,
        }}
      >
        <Text
          style={{
            fontFamily: typography.fontFamily.sans,
            fontSize: typography.size.sm,
            lineHeight: typography.lineHeight.sm,
            letterSpacing: typography.letterSpacing,
            color: '#FFFFFF',
            textAlign: 'center',
          }}
        >
          {message}
        </Text>
      </Animated.View>
    </View>
  );
}
