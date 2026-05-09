import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Modal, Pressable, Text, View } from 'react-native';
import { z } from 'zod';
import { Screen } from '@/components/layout/Screen';
import { AppBar } from '@/components/layout/AppBar';
import { ButtonPrimary } from '@/components/ui/ButtonPrimary';
import { InputField } from '@/components/form/InputField';
import { Mail } from '@/components/icons/Mail';
import { CloseCircle } from '@/components/icons/CloseCircle';
import { useOnboardingStore } from '@/hooks/useOnboardingStore';
import { colors, layout, radius, typography } from '@/constants/theme';

const schema = z.object({
  email: z
    .string()
    .min(1, '이메일을 입력하세요.')
    .email('올바른 이메일 형식이 아닙니다.'),
});

type FormValues = z.infer<typeof schema>;

export default function EmailStep() {
  const setEmail = useOnboardingStore((s) => s.setEmail);
  const initialEmail = useOnboardingStore((s) => s.email);
  const [confirming, setConfirming] = useState(false);
  const [pendingEmail, setPendingEmail] = useState('');

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: { email: initialEmail ?? '' },
  });

  const openConfirm = (values: FormValues) => {
    setPendingEmail(values.email.trim());
    setConfirming(true);
  };

  const handleConfirm = () => {
    setEmail(pendingEmail);
    setConfirming(false);
    router.push('/(auth)/verify');
  };

  const handleEdit = () => {
    setConfirming(false);
  };

  return (
    <Screen avoidKeyboard>
      <AppBar showBack title="이메일로 계속하기" />
      <View style={{ flex: 1, paddingHorizontal: 24 }}>
        <Text
          style={{
            fontFamily: typography.fontFamily.bold,
            fontSize: typography.size['2xl'],
            lineHeight: typography.lineHeight['2xl'],
            letterSpacing: typography.letterSpacing,
            color: colors.text.primary,
            marginTop: 16,
            marginBottom: 32,
          }}
        >
          이메일을 입력하세요.
        </Text>

        <Controller
          control={control}
          name="email"
          render={({ field, fieldState }) => (
            <InputField
              label="이메일"
              placeholder="example@email.com"
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
              autoCorrect={false}
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
              rightAccessory={
                field.value ? (
                  <Pressable onPress={() => field.onChange('')} hitSlop={8}>
                    <CloseCircle size={18} />
                  </Pressable>
                ) : (
                  <Mail size={16} />
                )
              }
            />
          )}
        />

        <View style={{ flex: 1 }} />
        <View style={{ paddingBottom: 24 }}>
          <ButtonPrimary text="다음" onPress={handleSubmit(openConfirm)} disabled={!isValid} />
        </View>
      </View>

      <Modal
        transparent
        visible={confirming}
        animationType="slide"
        onRequestClose={handleEdit}
      >
        <Pressable
          onPress={handleEdit}
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.4)',
            justifyContent: 'flex-end',
          }}
        >
          <Pressable
            onPress={() => {}}
            style={{
              backgroundColor: colors.surface.background,
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              paddingHorizontal: 24,
              paddingTop: 32,
              paddingBottom: 32,
              gap: 12,
            }}
          >
            <Text
              style={{
                fontFamily: typography.fontFamily.bold,
                fontSize: typography.size.xl,
                lineHeight: typography.lineHeight.xl,
                letterSpacing: typography.letterSpacing,
                color: colors.text.primary,
              }}
            >
              처음 오셨네요!
            </Text>
            <Text
              style={{
                fontFamily: typography.fontFamily.sans,
                fontSize: typography.size.md,
                lineHeight: typography.lineHeight.md,
                letterSpacing: typography.letterSpacing,
                color: colors.text.secondary,
              }}
            >
              이 주소가 맞나요? 입력하신{' '}
              <Text style={{ fontFamily: typography.fontFamily.bold, color: '#5CA08F' }}>
                {pendingEmail}
              </Text>
              으로 가입을 위한 인증 메일을 발송합니다.
            </Text>

            <View style={{ marginTop: 12, gap: 12 }}>
              <ButtonPrimary text="확인" onPress={handleConfirm} />
              <Pressable
                onPress={handleEdit}
                style={{
                  height: layout.buttonHeight,
                  borderRadius: radius.full,
                  borderWidth: 1,
                  borderColor: '#CACACA',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: colors.surface.background,
                }}
              >
                <Text
                  style={{
                    fontFamily: typography.fontFamily.bold,
                    fontSize: typography.size.lg,
                    lineHeight: typography.lineHeight.lg,
                    letterSpacing: typography.letterSpacing,
                    color: colors.text.tertiary,
                  }}
                >
                  수정
                </Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </Screen>
  );
}
