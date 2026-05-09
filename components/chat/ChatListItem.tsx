import { Pressable, Text, View } from 'react-native';
import { colors, radius, typography } from '@/constants/theme';

export type ChatListItemData = {
  id: string;
  name: string;
  preview: string;
  time: string;
  unread?: number;
  avatarColor?: string;
  initial?: string;
};

type Props = {
  data: ChatListItemData;
  onPress?: () => void;
};

export function ChatListItem({ data, onPress }: Props) {
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
      <View
        style={{
          width: 48,
          height: 48,
          borderRadius: radius.full,
          backgroundColor: data.avatarColor ?? colors.surface.divider,
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
      <View style={{ flex: 1 }}>
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
          {data.preview}
        </Text>
      </View>
      <View style={{ alignItems: 'flex-end', gap: 4 }}>
        <Text
          style={{
            fontFamily: typography.fontFamily.sans,
            fontSize: typography.size.xs,
            color: colors.text.tertiary,
          }}
        >
          {data.time}
        </Text>
        {data.unread ? (
          <View
            style={{
              minWidth: 20,
              paddingHorizontal: 6,
              height: 20,
              borderRadius: radius.full,
              backgroundColor: colors.brand.primary,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                fontFamily: typography.fontFamily.bold,
                fontSize: 11,
                color: colors.text.primary,
              }}
            >
              {data.unread > 999 ? '999+' : data.unread}
            </Text>
          </View>
        ) : null}
      </View>
    </Pressable>
  );
}
