import { ReactNode } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/constants/theme';

type ScreenProps = {
  children: ReactNode;
  scroll?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
  background?: string;
  avoidKeyboard?: boolean;
};

export function Screen({
  children,
  scroll = false,
  contentContainerStyle,
  edges = ['top', 'bottom'],
  background = colors.surface.background,
  avoidKeyboard = false,
}: ScreenProps) {
  const inner = scroll ? (
    <ScrollView
      contentContainerStyle={[{ flexGrow: 1 }, contentContainerStyle]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[{ flex: 1 }, contentContainerStyle]}>{children}</View>
  );

  const wrapped = avoidKeyboard ? (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      {inner}
    </KeyboardAvoidingView>
  ) : (
    inner
  );

  return (
    <SafeAreaView edges={edges} style={{ flex: 1, backgroundColor: background }}>
      {wrapped}
    </SafeAreaView>
  );
}
