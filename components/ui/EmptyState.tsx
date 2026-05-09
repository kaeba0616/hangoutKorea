import { ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';
import { colors, radius, typography } from '@/constants/theme';

type Props = {
  icon?: ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  size?: 'sm' | 'md' | 'lg';
};

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  size = 'md',
}: Props) {
  const verticalPad = size === 'sm' ? 32 : size === 'lg' ? 80 : 56;

  return (
    <View
      style={{
        alignItems: 'center',
        paddingVertical: verticalPad,
        paddingHorizontal: 24,
      }}
    >
      {icon ? (
        <View
          style={{
            width: 56,
            height: 56,
            borderRadius: radius.full,
            backgroundColor: colors.surface.field,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 16,
          }}
        >
          {icon}
        </View>
      ) : null}
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
            marginTop: 6,
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
      {actionLabel && onAction ? (
        <Pressable
          onPress={onAction}
          style={{
            marginTop: 16,
            paddingHorizontal: 18,
            height: 40,
            borderRadius: radius.full,
            borderWidth: 1,
            borderColor: colors.surface.divider,
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
            {actionLabel}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}
