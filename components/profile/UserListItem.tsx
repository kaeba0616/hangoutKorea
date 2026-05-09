import { Image, ImageSourcePropType, Pressable, Text, View } from 'react-native';
import { CheckCircle } from '@/components/icons/CheckCircle';
import { colors, radius, typography } from '@/constants/theme';

export type UserListData = {
  id: string;
  name: string;
  initial?: string;
  color?: string;
  photo?: ImageSourcePropType;
  meta?: string;
  bio?: string;
  verified?: boolean;
  followed?: boolean;
  mutual?: boolean;
};

type Props = {
  data: UserListData;
  onPress?: () => void;
  onAction?: () => void;
  actionLabel?: string;
  onRemove?: () => void;
};

export function UserListItem({ data, onPress, onAction, actionLabel, onRemove }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        gap: 12,
        backgroundColor: pressed ? colors.surface.field : 'transparent',
      })}
    >
      {data.photo ? (
        <Image
          source={data.photo}
          style={{ width: 48, height: 48, borderRadius: radius.full }}
        />
      ) : (
        <View
          style={{
            width: 48,
            height: 48,
            borderRadius: radius.full,
            backgroundColor: data.color ?? colors.surface.divider,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              fontFamily: typography.fontFamily.bold,
              fontSize: typography.size.md,
              color: colors.text.inverse,
            }}
          >
            {data.initial ?? data.name.charAt(0)}
          </Text>
        </View>
      )}
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <Text
            style={{
              fontFamily: typography.fontFamily.bold,
              fontSize: typography.size.sm,
              color: colors.text.primary,
              letterSpacing: typography.letterSpacing,
            }}
            numberOfLines={1}
          >
            {data.name}
          </Text>
          {data.verified ? <CheckCircle size={14} color={colors.brand.primary} checked /> : null}
        </View>
        {data.meta ? (
          <Text
            style={{
              fontFamily: typography.fontFamily.sans,
              fontSize: typography.size.xs,
              color: colors.text.secondary,
              marginTop: 2,
              letterSpacing: typography.letterSpacing,
            }}
            numberOfLines={1}
          >
            {data.meta}
          </Text>
        ) : data.bio ? (
          <Text
            style={{
              fontFamily: typography.fontFamily.sans,
              fontSize: typography.size.xs,
              color: colors.text.secondary,
              marginTop: 2,
              letterSpacing: typography.letterSpacing,
            }}
            numberOfLines={1}
          >
            {data.bio}
          </Text>
        ) : null}
      </View>
      {actionLabel ? (
        <Pressable
          onPress={onAction}
          style={{
            height: 32,
            paddingHorizontal: 14,
            borderRadius: radius.full,
            borderWidth: 1,
            borderColor: data.followed ? colors.surface.divider : colors.brand.primary,
            backgroundColor: data.followed ? 'transparent' : colors.brand.primary,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              fontFamily: typography.fontFamily.bold,
              fontSize: typography.size.xs,
              color: colors.text.primary,
              letterSpacing: typography.letterSpacing,
            }}
          >
            {actionLabel}
          </Text>
        </Pressable>
      ) : null}
      {onRemove ? (
        <Pressable
          onPress={onRemove}
          hitSlop={8}
          style={{
            width: 32,
            height: 32,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              fontFamily: typography.fontFamily.sans,
              fontSize: typography.size.lg,
              color: colors.text.tertiary,
              lineHeight: typography.size.lg,
            }}
          >
            ×
          </Text>
        </Pressable>
      ) : null}
    </Pressable>
  );
}
