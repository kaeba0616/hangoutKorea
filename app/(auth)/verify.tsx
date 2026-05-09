import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { Screen } from '@/components/layout/Screen';
import { AppBar } from '@/components/layout/AppBar';
import { ButtonPrimary } from '@/components/ui/ButtonPrimary';
import { AlertDialog } from '@/components/ui/AlertDialog';
import { Toast } from '@/components/ui/Toast';
import { useOnboardingStore } from '@/hooks/useOnboardingStore';
import { colors, typography } from '@/constants/theme';

const mailImage = require('@/assets/illustrations/mail.png');

export default function VerifyEmail() {
  const email = useOnboardingStore((s) => s.email);
  const [alertOpen, setAlertOpen] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  const showToast = () => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToastVisible(true);
    toastTimer.current = setTimeout(() => setToastVisible(false), 2200);
  };

  const handleVerify = () => {
    setAlertOpen(true);
  };

  const handleResend = () => {
    setAlertOpen(false);
    showToast();
  };

  const handleConfirmAlert = () => {
    setAlertOpen(false);
  };

  const handleSkip = () => {
    router.push('/(auth)/verify-complete');
  };

  return (
    <Screen>
      <AppBar showBack />
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 32 }}>
          <View style={{ alignItems: 'center', gap: 12 }}>
            <Text
              style={{
                fontFamily: typography.fontFamily.bold,
                fontSize: typography.size['2xl'],
                lineHeight: typography.lineHeight['2xl'],
                letterSpacing: typography.letterSpacing,
                color: colors.text.primary,
                textAlign: 'center',
              }}
            >
              {'인증 메일이\n발송되었어요.'}
            </Text>
            <Text
              style={{
                fontFamily: typography.fontFamily.sans,
                fontSize: typography.size.md,
                lineHeight: typography.lineHeight.md,
                letterSpacing: typography.letterSpacing,
                color: colors.text.secondary,
                textAlign: 'center',
              }}
            >
              <Text style={{ fontFamily: typography.fontFamily.bold, color: '#5CA08F' }}>
                {email ?? 'abc@gmail.com'}
              </Text>
              {'으로\n이메일 인증이 발송되었습니다.\n메일함을 확인해 주세요.'}
            </Text>
          </View>

          <Image source={mailImage} style={{ width: 150, height: 150 }} resizeMode="contain" />
        </View>

        <View style={{ paddingBottom: 24, gap: 12 }}>
          <ButtonPrimary text="인증 확인" onPress={handleVerify} />
          {__DEV__ ? (
            <Pressable onPress={handleSkip} hitSlop={12} style={{ alignSelf: 'center' }}>
              <Text
                style={{
                  fontFamily: typography.fontFamily.sans,
                  fontSize: typography.size.xs,
                  color: colors.text.tertiary,
                }}
              >
                [DEV] 인증 건너뛰기
              </Text>
            </Pressable>
          ) : null}
        </View>
      </View>

      <Toast visible={toastVisible} message="인증 메일을 다시 보냈어요. 📩" />

      <AlertDialog
        visible={alertOpen}
        title="인증 미확인"
        description={'아직 인증이 완료되지 않았습니다.\n메일함에 도착한 인증 버튼을 클릭해 주세요.'}
        buttons={[
          { text: '재발송', onPress: handleResend },
          { text: '확인', onPress: handleConfirmAlert, variant: 'preferred' },
        ]}
        onRequestClose={() => setAlertOpen(false)}
      />
    </Screen>
  );
}
