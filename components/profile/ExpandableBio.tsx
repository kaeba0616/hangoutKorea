import { useState } from 'react';
import { NativeSyntheticEvent, Pressable, Text, TextLayoutEventData, View } from 'react-native';
import { colors, typography } from '@/constants/theme';

type Props = {
  text: string;
  collapsedLines?: number;
};

export function ExpandableBio({ text, collapsedLines = 2 }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [overflows, setOverflows] = useState(false);

  const onTextLayout = (e: NativeSyntheticEvent<TextLayoutEventData>) => {
    if (e.nativeEvent.lines.length > collapsedLines) {
      setOverflows(true);
    }
  };

  return (
    <View>
      <Text
        onTextLayout={onTextLayout}
        numberOfLines={expanded ? undefined : collapsedLines}
        style={{
          fontFamily: typography.fontFamily.sans,
          fontSize: typography.size.sm,
          color: colors.text.secondary,
          lineHeight: typography.lineHeight.md,
          letterSpacing: typography.letterSpacing,
        }}
      >
        {text}
      </Text>
      {overflows ? (
        <Pressable
          hitSlop={12}
          onPress={() => setExpanded((v) => !v)}
          style={{ marginTop: 6, alignSelf: 'flex-start', paddingVertical: 4, paddingRight: 8 }}
        >
          <Text
            style={{
              fontFamily: typography.fontFamily.sans,
              fontSize: typography.size.xs,
              color: colors.text.secondary,
              letterSpacing: typography.letterSpacing,
            }}
          >
            {expanded ? '접기 ︿' : '더보기 ﹀'}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}
