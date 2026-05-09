import { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { Screen } from '@/components/layout/Screen';
import { AppBar } from '@/components/layout/AppBar';
import { ButtonPrimary } from '@/components/ui/ButtonPrimary';
import { Radio } from '@/components/form/Radio';
import { TextareaField } from '@/components/form/TextareaField';
import { colors, typography } from '@/constants/theme';

const REASONS = [
  { value: 'spam', label: '스팸 / 광고' },
  { value: 'fake', label: '가짜 프로필 / 사칭' },
  { value: 'harassment', label: '괴롭힘 / 욕설' },
  { value: 'inappropriate', label: '부적절한 콘텐츠' },
  { value: 'other', label: '기타' },
];

export default function Report() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [reason, setReason] = useState<string | null>(null);
  const [detail, setDetail] = useState('');

  const isValid = reason !== null && (reason !== 'other' || detail.trim().length >= 10);

  return (
    <Screen scroll avoidKeyboard contentContainerStyle={{ flexGrow: 1 }}>
      <AppBar title="신고하기" />
      <View style={{ paddingHorizontal: 24, flex: 1 }}>
        <Text
          style={{
            fontFamily: typography.fontFamily.bold,
            fontSize: typography.size.xl,
            color: colors.text.primary,
            marginTop: 4,
            marginBottom: 8,
            letterSpacing: typography.letterSpacing,
          }}
        >
          어떤 점이 문제인가요?
        </Text>
        <Text
          style={{
            fontFamily: typography.fontFamily.sans,
            fontSize: typography.size.sm,
            color: colors.text.secondary,
            marginBottom: 24,
            lineHeight: typography.lineHeight.md,
            letterSpacing: typography.letterSpacing,
          }}
        >
          신고는 익명으로 처리되며, 검토 후 24시간 내에 안내드립니다.
        </Text>

        <View style={{ gap: 12 }}>
          {REASONS.map((r) => (
            <Pressable
              key={r.value}
              onPress={() => setReason(r.value)}
              style={{ flexDirection: 'row', alignItems: 'center' }}
            >
              <Radio selected={reason === r.value} label={r.label} onPress={() => setReason(r.value)} />
            </Pressable>
          ))}
        </View>

        {reason ? (
          <View style={{ marginTop: 24 }}>
            <TextareaField
              label={reason === 'other' ? '자세한 내용 (필수, 10자 이상)' : '자세한 내용 (선택)'}
              placeholder="구체적인 상황을 설명해주세요"
              value={detail}
              onChangeText={setDetail}
              maxLength={500}
            />
          </View>
        ) : null}

        <View style={{ flex: 1, minHeight: 24 }} />
      </View>

      <View style={{ paddingHorizontal: 24, paddingBottom: 24 }}>
        <ButtonPrimary
          text="신고 제출"
          onPress={() => {
            console.log('report', { id, reason, detail });
            router.back();
          }}
          disabled={!isValid}
        />
      </View>
    </Screen>
  );
}
