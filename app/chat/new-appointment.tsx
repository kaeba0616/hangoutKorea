import { useMemo, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, Text, TextInput, View } from 'react-native';
import { Screen } from '@/components/layout/Screen';
import { AppBar } from '@/components/layout/AppBar';
import { ButtonPrimary } from '@/components/ui/ButtonPrimary';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { ChevronRight } from '@/components/icons/ChevronRight';
import { DatePickerSheet } from '@/components/picker/DatePickerSheet';
import { TimePickerSheet } from '@/components/picker/TimePickerSheet';
import { PlacePickerSheet, Place } from '@/components/picker/PlacePickerSheet';
import { colors, radius, typography } from '@/constants/theme';

function FieldRow({
  label,
  value,
  placeholder,
  onChangeText,
  pressable,
  onPress,
}: {
  label: string;
  value: string;
  placeholder: string;
  onChangeText?: (t: string) => void;
  pressable?: boolean;
  onPress?: () => void;
}) {
  const inner = (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        height: 48,
        paddingHorizontal: 14,
        backgroundColor: colors.surface.field,
        borderRadius: radius.md,
      }}
    >
      {pressable ? (
        <Text
          style={{
            flex: 1,
            fontFamily: typography.fontFamily.sans,
            fontSize: typography.size.sm,
            color: value ? colors.text.primary : colors.text.tertiary,
            letterSpacing: typography.letterSpacing,
          }}
        >
          {value || placeholder}
        </Text>
      ) : (
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.text.tertiary}
          style={{
            flex: 1,
            fontFamily: typography.fontFamily.sans,
            fontSize: typography.size.sm,
            color: colors.text.primary,
            padding: 0,
            letterSpacing: typography.letterSpacing,
          }}
        />
      )}
      {pressable ? <ChevronRight size={18} /> : null}
    </View>
  );

  return (
    <View style={{ marginBottom: 16 }}>
      <Text
        style={{
          fontFamily: typography.fontFamily.bold,
          fontSize: typography.size.sm,
          color: colors.text.primary,
          marginBottom: 6,
          letterSpacing: typography.letterSpacing,
        }}
      >
        {label}
      </Text>
      {pressable && onPress ? <Pressable onPress={onPress}>{inner}</Pressable> : inner}
    </View>
  );
}

function formatDate(d: Date | null): string {
  if (!d) return '';
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}

function formatTime(t: { hour: number; minute: number } | null): string {
  if (!t) return '';
  return `${String(t.hour).padStart(2, '0')}:${String(t.minute).padStart(2, '0')}`;
}

function parseDate(s?: string): Date | null {
  if (!s) return null;
  const m = /^(\d{4})\.(\d{2})\.(\d{2})$/.exec(s);
  if (!m) return null;
  return new Date(Number.parseInt(m[1], 10), Number.parseInt(m[2], 10) - 1, Number.parseInt(m[3], 10));
}

function parseTime(s?: string): { hour: number; minute: number } | null {
  if (!s) return null;
  const m = /^(\d{2}):(\d{2})$/.exec(s);
  if (!m) return null;
  return { hour: Number.parseInt(m[1], 10), minute: Number.parseInt(m[2], 10) };
}

export default function NewAppointment() {
  const params = useLocalSearchParams<{
    edit?: string;
    title?: string;
    date?: string;
    time?: string;
    place?: string;
  }>();
  const isEdit = params.edit === 'true' || Boolean(params.edit);

  const [title, setTitle] = useState(params.title ?? '');
  const [date, setDate] = useState<Date | null>(useMemo(() => parseDate(params.date), [params.date]));
  const [time, setTime] = useState<{ hour: number; minute: number } | null>(
    useMemo(() => parseTime(params.time), [params.time]),
  );
  const [place, setPlace] = useState<Place | null>(
    params.place ? { id: 'init', name: params.place, address: '' } : null,
  );

  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [timePickerOpen, setTimePickerOpen] = useState(false);
  const [placePickerOpen, setPlacePickerOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const isValid = title && date && time && place;

  return (
    <Screen edges={['top', 'bottom']}>
      <AppBar
        title={isEdit ? '약속 수정' : ''}
        right={
          isEdit ? (
            <Pressable hitSlop={8} onPress={() => setDeleteOpen(true)}>
              <Text
                style={{
                  fontFamily: typography.fontFamily.bold,
                  fontSize: typography.size.sm,
                  color: colors.state.error,
                  letterSpacing: typography.letterSpacing,
                }}
              >
                삭제
              </Text>
            </Pressable>
          ) : null
        }
      />
      <View style={{ paddingHorizontal: 24, flex: 1 }}>
        {!isEdit ? (
          <Text
            style={{
              fontFamily: typography.fontFamily.bold,
              fontSize: typography.size.xl,
              color: colors.text.primary,
              marginTop: 4,
              marginBottom: 24,
              letterSpacing: typography.letterSpacing,
            }}
          >
            어떤 약속을 잡을까요?
          </Text>
        ) : (
          <View style={{ height: 8 }} />
        )}

        <FieldRow
          label="모임명"
          value={title}
          placeholder="제목을 적어 주세요"
          onChangeText={setTitle}
        />
        <FieldRow
          label="날짜"
          value={formatDate(date)}
          placeholder="날짜를 선택하세요"
          pressable
          onPress={() => setDatePickerOpen(true)}
        />
        <FieldRow
          label="시간"
          value={formatTime(time)}
          placeholder="시간을 선택하세요"
          pressable
          onPress={() => setTimePickerOpen(true)}
        />
        <FieldRow
          label="장소"
          value={place?.name ?? ''}
          placeholder="만날 장소를 선택해주세요"
          pressable
          onPress={() => setPlacePickerOpen(true)}
        />
      </View>

      <View style={{ paddingHorizontal: 24, paddingBottom: 24 }}>
        <ButtonPrimary
          text={isEdit ? '수정 완료' : '완료'}
          onPress={() => router.back()}
          disabled={!isValid}
        />
      </View>

      <DatePickerSheet
        visible={datePickerOpen}
        initialDate={date}
        onClose={() => setDatePickerOpen(false)}
        onConfirm={setDate}
      />
      <TimePickerSheet
        visible={timePickerOpen}
        initial={time}
        onClose={() => setTimePickerOpen(false)}
        onConfirm={(h, m) => setTime({ hour: h, minute: m })}
      />
      <PlacePickerSheet
        visible={placePickerOpen}
        onClose={() => setPlacePickerOpen(false)}
        onConfirm={setPlace}
      />
      <ConfirmDialog
        visible={deleteOpen}
        title="이 약속을 삭제할까요?"
        description="삭제하면 되돌릴 수 없으며 참가자에게도 알림이 갑니다."
        confirmLabel="삭제"
        destructive
        onCancel={() => setDeleteOpen(false)}
        onConfirm={() => {
          setDeleteOpen(false);
          router.back();
        }}
      />
    </Screen>
  );
}
