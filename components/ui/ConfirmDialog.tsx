import { Modal, Pressable, Text, View } from 'react-native';
import { colors, radius, typography } from '@/constants/theme';

type Props = {
  visible: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmDialog({
  visible,
  title,
  description,
  confirmLabel = '확인',
  cancelLabel = '취소',
  destructive = false,
  onConfirm,
  onCancel,
}: Props) {
  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onCancel}>
      <Pressable
        onPress={onCancel}
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.4)',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 32,
        }}
      >
        <Pressable
          onPress={() => {}}
          style={{
            width: '100%',
            backgroundColor: colors.surface.background,
            borderRadius: radius.lg,
            paddingHorizontal: 24,
            paddingTop: 24,
            paddingBottom: 16,
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
          {description ? (
            <Text
              style={{
                marginTop: 8,
                fontFamily: typography.fontFamily.sans,
                fontSize: typography.size.sm,
                color: colors.text.secondary,
                textAlign: 'center',
                lineHeight: typography.lineHeight.md,
                letterSpacing: typography.letterSpacing,
              }}
            >
              {description}
            </Text>
          ) : null}
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 20 }}>
            <Pressable
              onPress={onCancel}
              style={{
                flex: 1,
                height: 44,
                borderRadius: radius.full,
                backgroundColor: colors.surface.field,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  fontFamily: typography.fontFamily.bold,
                  fontSize: typography.size.sm,
                  color: colors.text.primary,
                  letterSpacing: typography.letterSpacing,
                }}
              >
                {cancelLabel}
              </Text>
            </Pressable>
            <Pressable
              onPress={onConfirm}
              style={{
                flex: 1,
                height: 44,
                borderRadius: radius.full,
                backgroundColor: destructive ? colors.state.error : colors.brand.primary,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  fontFamily: typography.fontFamily.bold,
                  fontSize: typography.size.sm,
                  color: destructive ? colors.text.inverse : colors.text.primary,
                  letterSpacing: typography.letterSpacing,
                }}
              >
                {confirmLabel}
              </Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
