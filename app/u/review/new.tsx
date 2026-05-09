import { useState } from 'react';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { Screen } from '@/components/layout/Screen';
import { AppBar } from '@/components/layout/AppBar';
import { ButtonPrimary } from '@/components/ui/ButtonPrimary';
import { TextareaField } from '@/components/form/TextareaField';
import { colors, radius, typography } from '@/constants/theme';

const TARGET = {
  name: 'Sarah',
  initial: 'S',
  color: '#E07BC4',
  meetingDate: '2026.05.18',
  meetingPlace: '강남역 8번 출구',
};

export default function ReviewNew() {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');

  const isValid = rating > 0 && text.trim().length >= 10;

  return (
    <Screen scroll avoidKeyboard contentContainerStyle={{ flexGrow: 1 }}>
      <AppBar title="후기 작성" />
      <View style={{ paddingHorizontal: 24, paddingTop: 8, flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
            padding: 12,
            borderRadius: radius.lg,
            backgroundColor: colors.surface.field,
            marginBottom: 24,
          }}
        >
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: radius.full,
              backgroundColor: TARGET.color,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                fontFamily: typography.fontFamily.bold,
                fontSize: typography.size.md,
                color: colors.text.inverse,
              }}
            >
              {TARGET.initial}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontFamily: typography.fontFamily.bold,
                fontSize: typography.size.sm,
                color: colors.text.primary,
                letterSpacing: typography.letterSpacing,
              }}
            >
              {TARGET.name}님과의 만남
            </Text>
            <Text
              style={{
                fontFamily: typography.fontFamily.sans,
                fontSize: typography.size.xs,
                color: colors.text.secondary,
                marginTop: 2,
              }}
            >
              {`${TARGET.meetingDate} · ${TARGET.meetingPlace}`}
            </Text>
          </View>
        </View>

        <Text
          style={{
            fontFamily: typography.fontFamily.bold,
            fontSize: typography.size.md,
            color: colors.text.primary,
            marginBottom: 12,
            letterSpacing: typography.letterSpacing,
          }}
        >
          만남은 어떠셨나요?
        </Text>
        <View style={{ flexDirection: 'row', gap: 8, marginBottom: 24 }}>
          {[1, 2, 3, 4, 5].map((i) => (
            <Pressable key={i} onPress={() => setRating(i)} hitSlop={6}>
              <Text
                style={{
                  fontSize: 36,
                  color: i <= rating ? '#FFC93C' : colors.surface.divider,
                }}
              >
                ★
              </Text>
            </Pressable>
          ))}
        </View>

        <TextareaField
          label="자세한 후기"
          placeholder="다른 사람들에게 도움이 될 만한 후기를 남겨 주세요. (10자 이상)"
          value={text}
          onChangeText={setText}
          maxLength={500}
          showCount
        />

        <View style={{ flex: 1, minHeight: 24 }} />
        <View style={{ paddingTop: 16, paddingBottom: 24 }}>
          <ButtonPrimary text="등록" onPress={() => router.back()} disabled={!isValid} />
        </View>
      </View>
    </Screen>
  );
}
