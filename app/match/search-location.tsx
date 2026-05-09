import { useState } from 'react';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { Screen } from '@/components/layout/Screen';
import { AppBar } from '@/components/layout/AppBar';
import { SearchBar } from '@/components/form/SearchBar';
import { MapPin } from '@/components/icons/MapPin';
import { ChevronRight } from '@/components/icons/ChevronRight';
import { SEARCH_PLACES as RESULTS } from '@/mocks/places';
import { colors, typography } from '@/constants/theme';

export default function SearchLocation() {
  const [query, setQuery] = useState('');

  return (
    <Screen edges={['top', 'bottom']}>
      <AppBar title="" />
      <View style={{ paddingHorizontal: 16, marginTop: -8 }}>
        <SearchBar value={query} onChangeText={setQuery} placeholder="검색" />
      </View>

      <View style={{ flex: 1, marginTop: 12 }}>
        {RESULTS.map((r) => (
          <Pressable
            key={r.id}
            onPress={() => router.back()}
            style={({ pressed }) => ({
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 16,
              paddingVertical: 14,
              gap: 12,
              backgroundColor: pressed ? colors.surface.field : 'transparent',
            })}
          >
            <MapPin size={20} color={colors.text.tertiary} />
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: typography.fontFamily.bold,
                  fontSize: typography.size.sm,
                  color: colors.text.primary,
                  letterSpacing: typography.letterSpacing,
                }}
              >
                {r.name}
              </Text>
              <Text
                style={{
                  fontFamily: typography.fontFamily.sans,
                  fontSize: typography.size.xs,
                  color: colors.text.secondary,
                  marginTop: 2,
                }}
              >
                {r.address}
              </Text>
            </View>
            <ChevronRight size={18} />
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}
