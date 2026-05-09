import { ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';
import { colors, typography } from '@/constants/theme';

export type SegmentedTab = {
  key: string;
  label: string;
  icon?: (color: string) => ReactNode;
};

type Props = {
  tabs: SegmentedTab[];
  active: string;
  onChange: (key: string) => void;
};

export function SegmentedTabs({ tabs, active, onChange }: Props) {
  return (
    <View
      style={{
        flexDirection: 'row',
        height: 44,
        borderBottomWidth: 1,
        borderBottomColor: colors.surface.divider,
      }}
    >
      {tabs.map((tab) => {
        const isActive = tab.key === active;
        const tint = isActive ? colors.text.primary : colors.text.tertiary;
        return (
          <Pressable
            key={tab.key}
            onPress={() => onChange(tab.key)}
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
            }}
          >
            {tab.icon ? tab.icon(tint) : null}
            <Text
              style={{
                fontFamily: isActive ? typography.fontFamily.bold : typography.fontFamily.sans,
                fontSize: typography.size.sm,
                color: tint,
                letterSpacing: typography.letterSpacing,
              }}
            >
              {tab.label}
            </Text>
            <View
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: -1,
                height: 2,
                backgroundColor: isActive ? colors.brand.primary : 'transparent',
              }}
            />
          </Pressable>
        );
      })}
    </View>
  );
}
