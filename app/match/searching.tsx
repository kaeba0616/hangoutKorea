import { useEffect, useRef, useState } from 'react';
import { router } from 'expo-router';
import { Animated, Easing, Text, View } from 'react-native';
import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { colors, typography } from '@/constants/theme';

export default function Searching() {
  const [tick, setTick] = useState(0);
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 500);
    const success = Math.random() < 0.7;
    const timeout = setTimeout(() => {
      router.replace(success ? '/match/result/sarah' : '/match/no-result');
    }, 4500);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.4,
          duration: 600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [opacity]);

  const dots = '.'.repeat((tick % 3) + 1);

  return (
    <Screen>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 }}>
        <Animated.View style={{ opacity }}>
          <Text
            style={{
              fontFamily: typography.fontFamily.bold,
              fontSize: typography.size['2xl'],
              color: colors.text.primary,
              letterSpacing: typography.letterSpacing,
            }}
          >
            매칭 중{dots}
          </Text>
        </Animated.View>
        <Text
          style={{
            fontFamily: typography.fontFamily.sans,
            fontSize: typography.size.sm,
            color: colors.text.secondary,
            marginTop: 12,
            textAlign: 'center',
            letterSpacing: typography.letterSpacing,
          }}
        >
          나와 잘 맞는 사람을 찾고 있어요.
        </Text>

        <View style={{ flexDirection: 'row', gap: 8, marginTop: 32 }}>
          {[0, 1, 2].map((i) => (
            <View
              key={i}
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: i === tick % 3 ? colors.brand.primary : colors.surface.divider,
              }}
            />
          ))}
        </View>
      </View>

      <View style={{ paddingHorizontal: 24, paddingBottom: 24 }}>
        <Button text="매칭 취소" variant="outline" onPress={() => router.back()} />
      </View>
    </Screen>
  );
}
