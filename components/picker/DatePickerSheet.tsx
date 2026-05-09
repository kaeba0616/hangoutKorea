import { useState } from 'react';
import { View } from 'react-native';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { MonthCalendar } from '@/components/match/MonthCalendar';

type Props = {
  visible: boolean;
  initialDate?: Date | null;
  onClose: () => void;
  onConfirm: (date: Date) => void;
};

export function DatePickerSheet({ visible, initialDate, onClose, onConfirm }: Props) {
  const [selected, setSelected] = useState<Date | null>(initialDate ?? null);

  return (
    <BottomSheet
      visible={visible}
      title="날짜 선택"
      onClose={onClose}
      onConfirm={() => {
        if (selected) {
          onConfirm(selected);
          onClose();
        }
      }}
      confirmDisabled={!selected}
    >
      <View style={{ paddingHorizontal: 24, paddingTop: 16 }}>
        <MonthCalendar
          selected={selected ? [selected] : []}
          onSelectDate={(d) => setSelected(d)}
        />
      </View>
    </BottomSheet>
  );
}
