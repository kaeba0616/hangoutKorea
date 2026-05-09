import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Screen } from '@/components/layout/Screen';
import { AppBar } from '@/components/layout/AppBar';
import { ButtonPrimary } from '@/components/ui/ButtonPrimary';
import { Radio } from '@/components/form/Radio';
import {
  LANGUAGES,
  PROFICIENCY_LEVELS,
  type ProficiencyLevel,
} from '@/constants/languages';
import { useOnboardingStore } from '@/hooks/useOnboardingStore';
import { colors, radius, typography } from '@/constants/theme';

export default function ProficiencyScreen() {
  const languages = useOnboardingStore((s) => s.languages);
  const initial = useOnboardingStore((s) => s.proficiency);
  const setProficiency = useOnboardingStore((s) => s.setProficiency);

  const [levels, setLevels] = useState<Record<string, ProficiencyLevel>>(() => {
    const next: Record<string, ProficiencyLevel> = {};
    for (const code of languages) {
      next[code] = initial[code] ?? 'beginner';
    }
    return next;
  });

  const update = (code: string, level: ProficiencyLevel) => {
    setLevels((prev) => ({ ...prev, [code]: level }));
  };

  const onNext = () => {
    setProficiency(levels);
    router.push('/(onboarding)/complete');
  };

  const allSet = languages.every((code) => Boolean(levels[code]));

  return (
    <Screen>
      <AppBar title="언어 숙련도" showBack />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={{
            fontFamily: typography.fontFamily.bold,
            fontSize: typography.size.xl,
            lineHeight: typography.lineHeight.xl,
            color: colors.text.primary,
            marginTop: 8,
            marginBottom: 24,
          }}
        >
          {'언어 숙련도를\n선택해주세요'}
        </Text>

        {languages.map((code) => {
          const lang = LANGUAGES.find((l) => l.code === code);
          if (!lang) return null;
          const current = levels[code];
          return (
            <View
              key={code}
              style={{
                marginBottom: 16,
                padding: 16,
                borderRadius: radius.md,
                borderWidth: 1,
                borderColor: colors.surface.divider,
              }}
            >
              <Text
                style={{
                  fontFamily: typography.fontFamily.bold,
                  fontSize: typography.size.md,
                  color: colors.text.primary,
                  marginBottom: 12,
                }}
              >
                {lang.nameKo}
              </Text>
              <View style={{ gap: 12 }}>
                {PROFICIENCY_LEVELS.map((opt) => (
                  <Radio
                    key={opt.value}
                    selected={current === opt.value}
                    onPress={() => update(code, opt.value)}
                    label={opt.label}
                  />
                ))}
              </View>
            </View>
          );
        })}
      </ScrollView>
      <View style={{ paddingHorizontal: 24, paddingVertical: 16 }}>
        <ButtonPrimary text="선택 완료" onPress={onNext} disabled={!allSet} />
      </View>
    </Screen>
  );
}
