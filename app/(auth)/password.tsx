import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, Text, View } from 'react-native';
import { z } from 'zod';
import { Screen } from '@/components/layout/Screen';
import { AppBar } from '@/components/layout/AppBar';
import { ButtonPrimary } from '@/components/ui/ButtonPrimary';
import { Checkbox } from '@/components/form/Checkbox';
import { InputField } from '@/components/form/InputField';
import { ChevronRight } from '@/components/icons/ChevronRight';
import { EyeOff } from '@/components/icons/EyeOff';
import { useOnboardingStore } from '@/hooks/useOnboardingStore';
import { colors, typography } from '@/constants/theme';

const passwordSchema = z
  .object({
    password: z.string().min(8, '비밀번호는 8자 이상이어야 합니다.'),
    confirm: z.string(),
  })
  .superRefine((val, ctx) => {
    if (val.confirm.length > 0 && val.confirm !== val.password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['confirm'],
        message: '비밀번호가 일치하지 않습니다.',
      });
    }
  });

type FormValues = z.infer<typeof passwordSchema>;

type TermKey = 'tos' | 'privacy' | 'location' | 'age' | 'marketing';
type Term = { key: TermKey; label: string; required: boolean; hasDetail: boolean };

const TERMS: Term[] = [
  { key: 'tos', label: '[필수] 이용약관', required: true, hasDetail: true },
  { key: 'privacy', label: '[필수] 개인정보처리방침', required: true, hasDetail: true },
  { key: 'location', label: '[필수] 위치 기반 서비스 이용약관', required: true, hasDetail: true },
  { key: 'age', label: '[필수] 만 18세 이상입니다.', required: true, hasDetail: false },
  { key: 'marketing', label: '[선택] 프로모션 정보 수신', required: false, hasDetail: true },
];

export default function PasswordStep() {
  const setPassword = useOnboardingStore((s) => s.setPassword);
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState<Record<TermKey, boolean>>({
    tos: false,
    privacy: false,
    location: false,
    age: false,
    marketing: false,
  });

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(passwordSchema),
    mode: 'onChange',
    defaultValues: { password: '', confirm: '' },
  });

  const allRequiredAgreed = useMemo(
    () => TERMS.filter((t) => t.required).every((t) => agreed[t.key]),
    [agreed],
  );
  const allAgreed = useMemo(() => TERMS.every((t) => agreed[t.key]), [agreed]);

  const toggleAll = (next: boolean) => {
    setAgreed({
      tos: next,
      privacy: next,
      location: next,
      age: next,
      marketing: next,
    });
  };

  const toggleOne = (key: TermKey) => {
    setAgreed((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const onSubmit = (values: FormValues) => {
    setPassword(values.password);
    router.push('/(auth)/signup-complete');
  };

  const submittable = isValid && allRequiredAgreed;

  return (
    <Screen scroll avoidKeyboard contentContainerStyle={{ flexGrow: 1 }}>
      <AppBar showBack />
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        <Text
          style={{
            fontFamily: typography.fontFamily.bold,
            fontSize: typography.size['2xl'],
            lineHeight: typography.lineHeight['2xl'],
            letterSpacing: typography.letterSpacing,
            color: colors.text.primary,
            marginTop: 32,
            marginBottom: 32,
          }}
        >
          어서오세요.
        </Text>

        <View style={{ gap: 16, marginBottom: 24 }}>
          <Text
            style={{
              fontFamily: typography.fontFamily.bold,
              fontSize: typography.size.lg,
              lineHeight: typography.lineHeight.lg,
              letterSpacing: typography.letterSpacing,
              color: colors.text.primary,
            }}
          >
            비밀번호 설정
          </Text>

          <Controller
            control={control}
            name="password"
            render={({ field, fieldState }) => (
              <InputField
                label="비밀번호 입력"
                placeholder="비밀번호 입력"
                secureTextEntry={!showPw}
                autoCapitalize="none"
                autoCorrect={false}
                value={field.value}
                onChangeText={field.onChange}
                onBlur={field.onBlur}
                error={fieldState.error?.message}
                rightAccessory={
                  <Pressable onPress={() => setShowPw((v) => !v)} hitSlop={8}>
                    <EyeOff size={18} />
                  </Pressable>
                }
              />
            )}
          />

          <Controller
            control={control}
            name="confirm"
            render={({ field, fieldState }) => (
              <InputField
                label="비밀번호 확인"
                placeholder="비밀번호 다시 입력"
                secureTextEntry={!showConfirm}
                autoCapitalize="none"
                autoCorrect={false}
                value={field.value}
                onChangeText={field.onChange}
                onBlur={field.onBlur}
                error={fieldState.error?.message}
                rightAccessory={
                  <Pressable onPress={() => setShowConfirm((v) => !v)} hitSlop={8}>
                    <EyeOff size={18} />
                  </Pressable>
                }
              />
            )}
          />
        </View>

        <View style={{ gap: 16 }}>
          <Text
            style={{
              fontFamily: typography.fontFamily.bold,
              fontSize: typography.size.lg,
              lineHeight: typography.lineHeight.lg,
              letterSpacing: typography.letterSpacing,
              color: colors.text.primary,
            }}
          >
            약관 동의
          </Text>

          <View
            style={{
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: '#E8E8E8',
              paddingVertical: 24,
            }}
          >
            <Checkbox
              checked={allAgreed}
              onPress={() => toggleAll(!allAgreed)}
              label="이용 약관에 모두 동의합니다."
            />
          </View>

          <View style={{ gap: 4 }}>
            {TERMS.map((term) => (
              <View
                key={term.key}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 12,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Checkbox
                    checked={agreed[term.key]}
                    onPress={() => toggleOne(term.key)}
                    label={term.label}
                  />
                </View>
                {term.hasDetail ? (
                  <Pressable
                    onPress={() => router.push(`/(auth)/terms/${term.key}`)}
                    hitSlop={8}
                  >
                    <ChevronRight size={16} />
                  </Pressable>
                ) : null}
              </View>
            ))}
          </View>
        </View>

        <View style={{ flex: 1, minHeight: 24 }} />
        <View style={{ paddingVertical: 24 }}>
          <ButtonPrimary
            text="프로필 만들기"
            onPress={handleSubmit(onSubmit)}
            disabled={!submittable}
          />
        </View>
      </View>
    </Screen>
  );
}
