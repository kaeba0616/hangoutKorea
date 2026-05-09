import { useEffect, useRef, useState } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { colors, radius, typography } from '@/constants/theme';

type Props = {
  visible: boolean;
  initial?: { hour: number; minute: number } | null;
  onClose: () => void;
  onConfirm: (hour: number, minute: number) => void;
};

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const MINUTES = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
const ITEM_HEIGHT = 44;
const VISIBLE_ITEMS = 5;
const PICKER_HEIGHT = ITEM_HEIGHT * VISIBLE_ITEMS;
const PAD = (PICKER_HEIGHT - ITEM_HEIGHT) / 2;

function WheelColumn({
  data,
  value,
  onChange,
  unit,
}: {
  data: number[];
  value: number;
  onChange: (v: number) => void;
  unit: string;
}) {
  const scrollRef = useRef<ScrollView>(null);
  const programmatic = useRef(false);

  useEffect(() => {
    const idx = Math.max(0, data.indexOf(value));
    programmatic.current = true;
    scrollRef.current?.scrollTo({ y: idx * ITEM_HEIGHT, animated: false });
    requestAnimationFrame(() => {
      programmatic.current = false;
    });
    // only run for initial value when component mounts; subsequent scroll-driven changes
    // come from the ScrollView itself
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (programmatic.current) return;
    const offset = e.nativeEvent.contentOffset.y;
    const idx = Math.round(offset / ITEM_HEIGHT);
    const clamped = Math.max(0, Math.min(data.length - 1, idx));
    if (data[clamped] !== value) onChange(data[clamped]);
  };

  return (
    <ScrollView
      ref={scrollRef}
      style={{ flex: 1, height: PICKER_HEIGHT }}
      showsVerticalScrollIndicator={false}
      snapToInterval={ITEM_HEIGHT}
      decelerationRate="fast"
      onMomentumScrollEnd={onMomentumScrollEnd}
      contentContainerStyle={{ paddingTop: PAD, paddingBottom: PAD }}
    >
      {data.map((n, i) => {
        const distance = Math.abs(n - value);
        const active = n === value;
        const opacity = active ? 1 : distance === 1 ? 0.6 : distance === 2 ? 0.35 : 0.2;
        return (
          <Pressable
            key={n}
            onPress={() => {
              programmatic.current = true;
              scrollRef.current?.scrollTo({ y: i * ITEM_HEIGHT, animated: true });
              onChange(n);
              setTimeout(() => {
                programmatic.current = false;
              }, 250);
            }}
            style={{ height: ITEM_HEIGHT, alignItems: 'center', justifyContent: 'center' }}
          >
            <Text
              style={{
                fontFamily: active ? typography.fontFamily.bold : typography.fontFamily.sans,
                fontSize: active ? typography.size.lg : typography.size.md,
                color: colors.text.primary,
                opacity,
                letterSpacing: typography.letterSpacing,
              }}
            >
              {`${n.toString().padStart(2, '0')}${unit}`}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

export function TimePickerSheet({ visible, initial, onClose, onConfirm }: Props) {
  const [hour, setHour] = useState(initial?.hour ?? 13);
  const [minute, setMinute] = useState(initial?.minute ?? 0);

  return (
    <BottomSheet
      visible={visible}
      title="시간 선택"
      onClose={onClose}
      onConfirm={() => {
        onConfirm(hour, minute);
        onClose();
      }}
    >
      <View style={{ paddingHorizontal: 24, paddingTop: 16, paddingBottom: 8 }}>
        <View
          style={{
            position: 'relative',
            height: PICKER_HEIGHT,
          }}
        >
          {/* center selection band */}
          <View
            pointerEvents="none"
            style={{
              position: 'absolute',
              top: PAD,
              left: 0,
              right: 0,
              height: ITEM_HEIGHT,
              borderRadius: radius.md,
              backgroundColor: colors.surface.field,
            }}
          />
          <View style={{ flexDirection: 'row', height: PICKER_HEIGHT }}>
            <WheelColumn data={HOURS} value={hour} onChange={setHour} unit="시" />
            <WheelColumn data={MINUTES} value={minute} onChange={setMinute} unit="분" />
          </View>
        </View>
      </View>
    </BottomSheet>
  );
}
