import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { Screen } from '@/components/layout/Screen';
import { AppBar } from '@/components/layout/AppBar';
import { ButtonPrimary } from '@/components/ui/ButtonPrimary';
import { Radio } from '@/components/form/Radio';
import { SearchBar } from '@/components/form/SearchBar';
import { COUNTRIES, type Country } from '@/constants/countries';
import { useOnboardingStore } from '@/hooks/useOnboardingStore';
import { colors, typography } from '@/constants/theme';

export default function NationalityScreen() {
  const initial = useOnboardingStore((s) => s.nationality);
  const setNationality = useOnboardingStore((s) => s.setNationality);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<string | null>(initial);

  const list = useMemo(() => {
    if (!query.trim()) return COUNTRIES;
    const q = query.toLowerCase();
    return COUNTRIES.filter(
      (c) => c.nameKo.includes(query) || c.nameEn.toLowerCase().includes(q),
    );
  }, [query]);

  const onConfirm = () => {
    if (!selected) return;
    setNationality(selected);
    if (router.canGoBack()) router.back();
    else router.replace('/(onboarding)/setup');
  };

  const renderItem = ({ item }: { item: Country }) => {
    const isSelected = item.code === selected;
    return (
      <Pressable
        onPress={() => setSelected(item.code)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 14,
        }}
      >
        <Text style={{ fontSize: 24, marginRight: 12 }}>{item.flagEmoji}</Text>
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
        <Radio selected={isSelected} onPress={() => setSelected(item.code)} />
      </Pressable>
    );
  };

  return (
    <Screen>
      <AppBar title="국적" showBack />
      <View style={{ flex: 1, paddingHorizontal: 24 }}>
        <Text
          style={{
            fontFamily: typography.fontFamily.bold,
            fontSize: typography.size.xl,
            lineHeight: typography.lineHeight.xl,
            color: colors.text.primary,
            marginTop: 8,
            marginBottom: 16,
          }}
        >
          국적을 선택하세요.
        </Text>
        <SearchBar value={query} onChangeText={setQuery} placeholder="국가 검색" />
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
          <ButtonPrimary text="선택 완료" onPress={onConfirm} disabled={!selected} />
        </View>
      </View>
    </Screen>
  );
}
