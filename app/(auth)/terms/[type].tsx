import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';
import { Screen } from '@/components/layout/Screen';
import { AppBar } from '@/components/layout/AppBar';
import { TERMS_CONTENT, TermBlock, TermContent, isTermType } from '@/constants/termsContent';
import { colors, typography } from '@/constants/theme';

function Block({ block }: { block: TermBlock }) {
  const bodyText = {
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.sm,
    letterSpacing: typography.letterSpacing,
    color: colors.text.secondary,
  };

  if (block.kind === 'paragraph') {
    return <Text style={bodyText}>{block.text}</Text>;
  }

  if (block.kind === 'circled') {
    return (
      <View style={{ flexDirection: 'row', gap: 4 }}>
        <Text style={[bodyText, { fontSize: typography.size.xs }]}>{block.index}</Text>
        <Text style={[bodyText, { flex: 1 }]}>{block.text}</Text>
      </View>
    );
  }

  if (block.kind === 'ordered') {
    const start = block.start ?? 1;
    return (
      <View style={{ gap: 8 }}>
        {block.items.map((item, idx) => (
          <View key={idx} style={{ flexDirection: 'row', gap: 8, paddingLeft: 4 }}>
            <Text style={[bodyText, { width: 18 }]}>{`${start + idx}.`}</Text>
            <Text style={[bodyText, { flex: 1 }]}>{item}</Text>
          </View>
        ))}
      </View>
    );
  }

  return (
    <View style={{ gap: 4 }}>
      {block.items.map((item, idx) => (
        <View key={idx} style={{ flexDirection: 'row', gap: 8, paddingLeft: 8 }}>
          <Text style={bodyText}>•</Text>
          <Text style={[bodyText, { flex: 1 }]}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

export default function TermsDetail() {
  const { type } = useLocalSearchParams<{ type: string }>();
  const termType = isTermType(type) ? type : 'tos';
  const content: TermContent = TERMS_CONTENT[termType];

  return (
    <Screen scroll>
      <AppBar showBack title="약관 및 정책" />
      <View style={{ paddingHorizontal: 16, paddingVertical: 32, gap: 32 }}>
        <Text
          style={{
            fontFamily: typography.fontFamily.bold,
            fontSize: typography.size['2xl'],
            lineHeight: typography.lineHeight['2xl'],
            letterSpacing: typography.letterSpacing,
            color: colors.text.primary,
          }}
        >
          {content.title}
        </Text>

        <View style={{ gap: 24 }}>
          {content.sections.map((section, sIdx) => (
            <View key={sIdx} style={{ gap: 12 }}>
              <Text
                style={{
                  fontFamily: typography.fontFamily.bold,
                  fontSize: typography.size.md,
                  lineHeight: typography.lineHeight.md,
                  letterSpacing: typography.letterSpacing,
                  color: colors.text.primary,
                }}
              >
                {section.heading}
              </Text>
              {section.blocks.map((block, bIdx) => (
                <Block key={bIdx} block={block} />
              ))}
            </View>
          ))}
        </View>
      </View>
    </Screen>
  );
}
