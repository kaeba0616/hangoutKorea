import { Modal, Pressable, Text, View } from 'react-native';
import { typography } from '@/constants/theme';

type AlertButton = {
  text: string;
  onPress: () => void;
  variant?: 'default' | 'preferred';
};

type AlertDialogProps = {
  visible: boolean;
  title: string;
  description: string;
  buttons: AlertButton[];
  onRequestClose?: () => void;
};

export function AlertDialog({
  visible,
  title,
  description,
  buttons,
  onRequestClose,
}: AlertDialogProps) {
  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onRequestClose}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.2)',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 40,
        }}
      >
        <View
          style={{
            width: 270,
            backgroundColor: 'rgba(255,255,255,0.96)',
            borderRadius: 14,
            overflow: 'hidden',
          }}
        >
          <View style={{ paddingTop: 19, paddingHorizontal: 16, paddingBottom: 15, gap: 8 }}>
            <Text
              style={{
                fontFamily: typography.fontFamily.bold,
                fontSize: 18,
                lineHeight: 22,
                letterSpacing: typography.letterSpacing,
                color: '#000000',
                textAlign: 'center',
              }}
            >
              {title}
            </Text>
            <Text
              style={{
                fontFamily: typography.fontFamily.sans,
                fontSize: 14,
                lineHeight: 18,
                letterSpacing: typography.letterSpacing,
                color: '#000000',
                textAlign: 'center',
              }}
            >
              {description}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              borderTopWidth: 0.5,
              borderTopColor: 'rgba(128,128,128,0.55)',
            }}
          >
            {buttons.map((btn, i) => (
              <View key={btn.text} style={{ flex: 1, flexDirection: 'row' }}>
                {i > 0 ? (
                  <View style={{ width: 0.5, backgroundColor: 'rgba(128,128,128,0.55)' }} />
                ) : null}
                <Pressable
                  onPress={btn.onPress}
                  style={{ flex: 1, height: 44, alignItems: 'center', justifyContent: 'center' }}
                >
                  <Text
                    style={{
                      fontFamily: typography.fontFamily.sans,
                      fontSize: 14,
                      lineHeight: 18,
                      letterSpacing: typography.letterSpacing,
                      color: btn.variant === 'preferred' ? '#34C759' : '#000000',
                      fontWeight: btn.variant === 'preferred' ? '600' : '400',
                    }}
                  >
                    {btn.text}
                  </Text>
                </Pressable>
              </View>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
}
