import { useMemo, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { ChevronRight } from '@/components/icons/ChevronRight';
import { colors, radius, typography } from '@/constants/theme';

type Props = {
  selected?: Date[];
  dotDates?: Date[];
  onSelectDate?: (date: Date) => void;
  highlightToday?: boolean;
};

const WEEK_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

function buildMonthMatrix(year: number, month: number): (Date | null)[] {
  const first = new Date(year, month, 1);
  const startWeekday = first.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (Date | null)[] = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function MonthCalendar({ selected = [], dotDates = [], onSelectDate, highlightToday = true }: Props) {
  const today = useMemo(() => new Date(), []);
  const [cursor, setCursor] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));

  const cells = useMemo(
    () => buildMonthMatrix(cursor.getFullYear(), cursor.getMonth()),
    [cursor],
  );

  const goPrev = () => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1));
  const goNext = () => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1));

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 12,
        }}
      >
        <Text
          style={{
            fontFamily: typography.fontFamily.bold,
            fontSize: typography.size.md,
            color: colors.text.primary,
            letterSpacing: typography.letterSpacing,
          }}
        >
          {`${cursor.getFullYear()}년 ${cursor.getMonth() + 1}월`}
        </Text>
        <View style={{ flexDirection: 'row', gap: 4 }}>
          <Pressable onPress={goPrev} hitSlop={12} style={{ transform: [{ rotate: '180deg' }] }}>
            <ChevronRight size={20} color={colors.text.secondary} />
          </Pressable>
          <Pressable onPress={goNext} hitSlop={12}>
            <ChevronRight size={20} color={colors.text.secondary} />
          </Pressable>
        </View>
      </View>

      <View style={{ flexDirection: 'row' }}>
        {WEEK_LABELS.map((label, idx) => (
          <View key={`${label}-${idx}`} style={{ flex: 1, alignItems: 'center', paddingVertical: 6 }}>
            <Text
              style={{
                fontFamily: typography.fontFamily.sans,
                fontSize: typography.size.xs,
                color: colors.text.tertiary,
                letterSpacing: typography.letterSpacing,
              }}
            >
              {label}
            </Text>
          </View>
        ))}
      </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {cells.map((date, idx) => {
          const isSelected = !!date && selected.some((s) => isSameDay(s, date));
          const hasDot = !!date && !isSelected && dotDates.some((d) => isSameDay(d, date));
          const isToday = !!date && highlightToday && isSameDay(today, date);
          return (
            <View
              key={idx}
              style={{ width: `${100 / 7}%`, alignItems: 'center', paddingVertical: 4 }}
            >
              {date ? (
                <Pressable
                  onPress={() => onSelectDate?.(date)}
                  style={{
                    width: 36,
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <View
                    style={{
                      width: 36,
                      height: 36,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: radius.full,
                      backgroundColor: isSelected ? colors.brand.primary : 'transparent',
                    }}
                  >
                    <Text
                      style={{
                        fontFamily:
                          isSelected || isToday
                            ? typography.fontFamily.bold
                            : typography.fontFamily.sans,
                        fontSize: typography.size.sm,
                        color: isSelected
                          ? colors.text.primary
                          : isToday
                            ? colors.brand.primary
                            : colors.text.primary,
                      }}
                    >
                      {date.getDate()}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: 4,
                      height: 4,
                      borderRadius: 2,
                      marginTop: 2,
                      backgroundColor: hasDot ? colors.brand.primary : 'transparent',
                    }}
                  />
                </Pressable>
              ) : (
                <View style={{ width: 36, height: 40 }} />
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
}
