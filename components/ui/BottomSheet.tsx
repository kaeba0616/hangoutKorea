import { ReactNode } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { ButtonPrimary } from '@/components/ui/ButtonPrimary';
import { colors, radius, typography } from '@/constants/theme';

type Props = {
  visible: boolean;
  title?: string;
  onClose: () => void;
  onConfirm?: () => void;
  confirmLabel?: string;
  confirmDisabled?: boolean;
  children: ReactNode;
  height?: number;
};

export function BottomSheet({
  visible,
  title,
  onClose,
  onConfirm,
  confirmLabel = '완료',
  confirmDisabled = false,
  children,
  height,
}: Props) {
  return (
    <Modal transparent visible={visible} animationType="slide" onRequestClose={onClose}>
      <Pressable onPress={onClose} style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' }}>
        <View style={{ flex: 1 }} />
        <Pressable
          onPress={() => {}}
          style={{
            backgroundColor: colors.surface.background,
            borderTopLeftRadius: radius['2xl'],
            borderTopRightRadius: radius['2xl'],
            paddingTop: 12,
            paddingBottom: 24,
            ...(height ? { height } : {}),
          }}
        >
          <View
            style={{
              alignSelf: 'center',
              width: 40,
              height: 4,
              borderRadius: 2,
              backgroundColor: colors.surface.divider,
              marginBottom: 12,
            }}
          />
          {title ? (
            <View
              style={{
                paddingHorizontal: 24,
                paddingBottom: 16,
                borderBottomWidth: 1,
                borderBottomColor: colors.surface.divider,
              }}
            >
              <Text
                style={{
                  fontFamily: typography.fontFamily.bold,
                  fontSize: typography.size.md,
                  color: colors.text.primary,
                  textAlign: 'center',
                  letterSpacing: typography.letterSpacing,
                }}
              >
                {title}
              </Text>
            </View>
          ) : null}
          <View style={{ flex: height ? 1 : undefined }}>{children}</View>
          {onConfirm ? (
            <View style={{ paddingHorizontal: 24, paddingTop: 12 }}>
              <ButtonPrimary
                text={confirmLabel}
                onPress={onConfirm}
                disabled={confirmDisabled}
              />
            </View>
          ) : null}
        </Pressable>
      </Pressable>
    </Modal>
  );
}
