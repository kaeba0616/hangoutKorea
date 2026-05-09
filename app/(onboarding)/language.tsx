import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { Screen } from '@/components/layout/Screen';
import { AppBar } from '@/components/layout/AppBar';
import { ButtonPrimary } from '@/components/ui/ButtonPrimary';
import { Checkbox } from '@/components/form/Checkbox';
import { SearchBar } from '@/components/form/SearchBar';
import { LANGUAGES, type LanguageOption } from '@/constants/languages';
import { useOnboardingStore } from '@/hooks/useOnboardingStore';
import { colors, typography } from '@/constants/theme';

const MAX_LANGUAGES = 5;

export default function LanguageScreen() {
  const initial = useOnboardingStore((s) => s.languages);
  const setLanguages = useOnboardingStore((s) => s.setLanguages);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<string[]>(initial);

  const list = useMemo(() => {
    if (!query.trim()) return LANGUAGES;
    const q = query.toLowerCase();
    return LANGUAGES.filter(
      (l) => l.nameKo.includes(query) || l.nameEn.toLowerCase().includes(q),
    );
  }, [query]);

  const toggle = (code: string) => {
    setSelected((prev) => {
      if (prev.includes(code)) return prev.filter((c) => c !== code);
      if (prev.length >= MAX_LANGUAGES) return prev;
      return [...prev, code];
    });
  };

  const onNext = () => {
    setLanguages(selected);
    router.push('/(onboarding)/proficiency');
  };

  const renderItem = ({ item }: { item: LanguageOption }) => {
    const isSelected = selected.includes(item.code);
    const atLimit = !isSelected && selected.length >= MAX_LANGUAGES;
    return (
      <Pressable
        onPress={() => toggle(item.code)}
        disabled={atLimit}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 14,
          opacity: atLimit ? 0.4 : 1,
        }}
      >
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily: typography.fontFamily.sans,
              fontSize: typography.size.md,
              color: colors.text.primary,
              letterSpacing: typography.letterSpacing,
            }}
          >
            {item.nameKo}
          </Text>
          <Text
            style={{
              fontFamily: typography.fontFamily.sans,
              fontSize: typography.size.xs,
              color: colors.text.tertiary,
            }}
          >
            {item.nameEn}
          </Text>
        </View>
        <Checkbox checked={isSelected} onPress={() => toggle(item.code)} disabled={atLimit} />
      </Pressable>
    );
  };

  return (
    <Screen>
      <AppBar title="사용 언어" showBack />
      <View style={{ flex: 1, paddingHorizontal: 24 }}>
        <Text
          style={{
            fontFamily: typography.fontFamily.bold,
            fontSize: typography.size.xl,
            lineHeight: typography.lineHeight.xl,
            color: colors.text.primary,
            marginTop: 8,
          }}
        >
          {'사용할 수 있는 언어를\n모두 선택해주세요.'}
        </Text>
        <Text
          style={{
            fontFamily: typography.fontFamily.sans,
            fontSize: typography.size.xs,
            color: colors.text.secondary,
            marginTop: 8,
            marginBottom: 16,
          }}
        >
          최대 {MAX_LANGUAGES}개까지 선택할 수 있어요. ({selected.length}/{MAX_LANGUAGES})
        </Text>
        <SearchBar value={query} onChangeText={setQuery} placeholder="언어 검색" />
        <FlatList
          data={list}
          keyExtractor={(item) => item.code}
          renderItem={renderItem}
          ItemSeparatorComponent={() => (
            <View style={{ height: 1, backgroundColor: colors.surface.divider }} />
          )}
          style={{ marginTop: 12 }}
          contentContainerStyle={{ paddingBottom: 16 }}
          keyboardShouldPersistTaps="handled"
        />
        <View style={{ paddingVertical: 16 }}>
          <ButtonPrimary
            text="선택 완료"
            onPress={onNext}
            disabled={selected.length === 0}
          />
        </View>
      </View>
    </Screen>
  );
}
