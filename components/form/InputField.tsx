import { forwardRef, useState } from 'react';
import { Platform, Text, TextInput, TextInputProps, View } from 'react-native';
import { colors, radius, typography } from '@/constants/theme';

const webNoOutline = Platform.OS === 'web' ? ({ outlineStyle: 'none' } as object) : null;

type InputFieldProps = TextInputProps & {
  label?: string;
  error?: string;
  helper?: string;
  rightAccessory?: React.ReactNode;
};

export const InputField = forwardRef<TextInput, InputFieldProps>(function InputField(
  { label, error, helper, rightAccessory, onFocus, onBlur, style, ...rest },
  ref,
) {
  const [focused, setFocused] = useState(false);

  const handleFocus: TextInputProps['onFocus'] = (e) => {
    setFocused(true);
    onFocus?.(e);
  };
  const handleBlur: TextInputProps['onBlur'] = (e) => {
    setFocused(false);
    onBlur?.(e);
  };

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
          flexDirection: 'row',
          alignItems: 'center',
          height: 52,
          borderRadius: radius.md,
          borderWidth: 1,
          borderColor,
          paddingHorizontal: 16,
          backgroundColor: colors.surface.background,
        }}
      >
        <TextInput
          ref={ref}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholderTextColor={colors.text.tertiary}
          style={[
            {
              flex: 1,
              height: '100%',
              fontFamily: typography.fontFamily.sans,
              fontSize: typography.size.md,
              color: colors.text.primary,
              padding: 0,
              letterSpacing: typography.letterSpacing,
            },
            webNoOutline,
            style,
          ]}
          {...rest}
        />
        {rightAccessory ? <View style={{ marginLeft: 8 }}>{rightAccessory}</View> : null}
      </View>
      {error ? (
        <Text
          style={{
            marginTop: 6,
            fontFamily: typography.fontFamily.sans,
            fontSize: typography.size.xs,
            color: colors.state.error,
          }}
        >
          {error}
        </Text>
      ) : helper ? (
        <Text
          style={{
            marginTop: 6,
            fontFamily: typography.fontFamily.sans,
            fontSize: typography.size.xs,
            color: colors.text.secondary,
          }}
        >
          {helper}
        </Text>
      ) : null}
    </View>
  );
});
