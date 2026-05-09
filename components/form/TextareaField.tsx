import { useState } from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';
import { colors, radius, typography } from '@/constants/theme';

type Props = TextInputProps & {
  label?: string;
  error?: string;
  helper?: string;
  maxLength?: number;
  showCount?: boolean;
};

export function TextareaField({
  label,
  error,
  helper,
  maxLength,
  showCount = true,
  value,
  onChangeText,
  ...rest
}: Props) {
  const [focused, setFocused] = useState(false);
  const length = value ? value.length : 0;

  const borderColor = error
    ? colors.state.error
    : focused
      ? colors.brand.primary
      : colors.surface.divider;

  return (
    <View style={{ width: '100%' }}>
      {label ? (
        <Text
          style={{
            fontFamily: typography.fontFamily.sans,
            fontSize: typography.size.sm,
            lineHeight: typography.lineHeight.sm,
            color: colors.text.secondary,
            marginBottom: 6,
          }}
        >
          {label}
        </Text>
      ) : null}
      <View
        style={{
          borderRadius: radius.md,
          borderWidth: 1,
          borderColor,
          padding: 12,
          backgroundColor: colors.surface.background,
          minHeight: 96,
        }}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholderTextColor={colors.text.tertiary}
          multiline
          maxLength={maxLength}
          textAlignVertical="top"
          style={{
            fontFamily: typography.fontFamily.sans,
            fontSize: typography.size.md,
            color: colors.text.primary,
            padding: 0,
            minHeight: 72,
            letterSpacing: typography.letterSpacing,
          }}
          {...rest}
        />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 }}>
        {error ? (
          <Text
            style={{
              fontFamily: typography.fontFamily.sans,
              fontSize: typography.size.xs,
              color: colors.state.error,
              flex: 1,
            }}
          >
            {error}
          </Text>
        ) : helper ? (
          <Text
            style={{
              fontFamily: typography.fontFamily.sans,
              fontSize: typography.size.xs,
              color: colors.text.secondary,
              flex: 1,
            }}
          >
            {helper}
          </Text>
        ) : (
          <View style={{ flex: 1 }} />
        )}
        {showCount && maxLength ? (
          <Text
            style={{
              fontFamily: typography.fontFamily.sans,
              fontSize: typography.size.xs,
              color: colors.text.tertiary,
            }}
          >
            {length}/{maxLength}
          </Text>
        ) : null}
      </View>
    </View>
  );
}
