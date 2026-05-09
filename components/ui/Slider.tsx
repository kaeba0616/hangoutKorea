import { useState } from 'react';
import { LayoutChangeEvent, PanResponder, View } from 'react-native';
import { colors, radius } from '@/constants/theme';

type Props = {
  value: number;
  min: number;
  max: number;
  onChange: (next: number) => void;
};

export function Slider({ value, min, max, onChange }: Props) {
  const [width, setWidth] = useState(1);
  const pct = Math.max(0, Math.min(1, (value - min) / (max - min)));

  const setFromX = (x: number) => {
    const ratio = Math.max(0, Math.min(1, x / width));
    const next = Math.round(min + ratio * (max - min));
    onChange(next);
  };

  const responder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (e) => setFromX(e.nativeEvent.locationX),
    onPanResponderMove: (e) => setFromX(e.nativeEvent.locationX),
  });

  const handleLayout = (e: LayoutChangeEvent) => {
    setWidth(e.nativeEvent.layout.width);
  };

  return (
    <View
      onLayout={handleLayout}
      {...responder.panHandlers}
      style={{ height: 32, justifyContent: 'center' }}
    >
      <View
        style={{
          height: 4,
          borderRadius: radius.full,
          backgroundColor: colors.surface.divider,
        }}
      />
      <View
        style={{
          position: 'absolute',
          left: 0,
          height: 4,
          width: `${pct * 100}%`,
          borderRadius: radius.full,
          backgroundColor: colors.brand.primary,
        }}
      />
      <View
        style={{
          position: 'absolute',
          left: `${pct * 100}%`,
          marginLeft: -10,
          width: 20,
          height: 20,
          borderRadius: radius.full,
          backgroundColor: '#FFFFFF',
          borderWidth: 2,
          borderColor: colors.brand.primary,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.15,
          shadowRadius: 2,
          elevation: 2,
        }}
      />
    </View>
  );
}
