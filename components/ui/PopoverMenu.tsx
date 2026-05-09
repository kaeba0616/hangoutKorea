import { Modal, Pressable, Text, View } from 'react-native';
import { colors, radius, typography } from '@/constants/theme';

export type PopoverItem = {
  label: string;
  onPress: () => void;
  danger?: boolean;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  items: PopoverItem[];
  anchorTop?: number;
  anchorRight?: number;
};

export function PopoverMenu({ visible, onClose, items, anchorTop = 56, anchorRight = 16 }: Props) {
  return (
    <Modal transparent visible={visible} onRequestClose={onClose} animationType="fade">
      <Pressable style={{ flex: 1 }} onPress={onClose}>
        <View
          style={{
            position: 'absolute',
            top: anchorTop,
            right: anchorRight,
            minWidth: 160,
            borderRadius: radius.lg,
            backgroundColor: colors.surface.background,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.12,
            shadowRadius: 12,
            elevation: 8,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: colors.surface.divider,
          }}
        >
          {items.map((item, i) => (
            <Pressable
              key={item.label}
              onPress={() => {
                onClose();
                item.onPress();
              }}
              style={({ pressed }) => ({
                paddingHorizontal: 16,
                paddingVertical: 12,
                borderTopWidth: i > 0 ? 1 : 0,
                borderTopColor: colors.surface.divider,
                backgroundColor: pressed ? colors.surface.field : 'transparent',
              })}
            >
              <Text
                style={{
                  fontFamily: typography.fontFamily.sans,
                  fontSize: typography.size.sm,
                  color: item.danger ? colors.state.error : colors.text.primary,
                  letterSpacing: typography.letterSpacing,
                }}
              >
                {item.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </Pressable>
    </Modal>
  );
}
