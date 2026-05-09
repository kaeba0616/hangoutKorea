import { Pressable, Text, TextInput, View } from 'react-native';
import { Search } from '@/components/icons/Search';
import { colors, radius, typography } from '@/constants/theme';

type Props = {
  value: string;
  onChangeText: (v: string) => void;
  placeholder?: string;
};

export function SearchBar({ value, onChangeText, placeholder = '검색' }: Props) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        height: 44,
        backgroundColor: colors.surface.field,
        borderRadius: radius.md,
        paddingHorizontal: 12,
      }}
    >
      <Search size={18} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.text.tertiary}
        style={{
          flex: 1,
          marginLeft: 8,
          fontFamily: typography.fontFamily.sans,
          fontSize: typography.size.md,
          color: colors.text.primary,
          padding: 0,
          letterSpacing: typography.letterSpacing,
        }}
      />
      {value.length > 0 ? (
        <Pressable
          onPress={() => onChangeText('')}
          hitSlop={8}
          style={{
            width: 22,
            height: 22,
            borderRadius: 11,
            backgroundColor: colors.text.tertiary,
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 6,
          }}
          accessibilityRole="button"
          accessibilityLabel="검색어 지우기"
        >
          <Text
            style={{
              fontFamily: typography.fontFamily.bold,
              fontSize: 14,
              color: colors.surface.background,
              lineHeight: 14,
            }}
          >
            ×
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}
