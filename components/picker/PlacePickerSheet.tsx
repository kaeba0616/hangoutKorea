import { useMemo, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { SearchBar } from '@/components/form/SearchBar';
import { MapPin } from '@/components/icons/MapPin';
import { ChevronRight } from '@/components/icons/ChevronRight';
import { PLACES, Place } from '@/mocks/places';
import { colors, typography } from '@/constants/theme';

export type { Place };

type Props = {
  visible: boolean;
  onClose: () => void;
  onConfirm: (place: Place) => void;
};

export function PlacePickerSheet({ visible, onClose, onConfirm }: Props) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q
      ? PLACES.filter(
          (p) => p.name.toLowerCase().includes(q) || p.address.toLowerCase().includes(q),
        )
      : PLACES;
  }, [query]);

  return (
    <BottomSheet
      visible={visible}
      title="장소 선택"
      onClose={onClose}
      height={600}
    >
      <View style={{ paddingHorizontal: 16, paddingTop: 12 }}>
        <SearchBar value={query} onChangeText={setQuery} placeholder="장소 검색" />
      </View>
      <View style={{ flex: 1, paddingTop: 8 }}>
        {filtered.length === 0 ? (
          <View style={{ paddingVertical: 48, alignItems: 'center' }}>
            <Text
              style={{
                fontFamily: typography.fontFamily.sans,
                fontSize: typography.size.sm,
                color: colors.text.tertiary,
              }}
            >
              결과가 없어요.
            </Text>
          </View>
        ) : (
          filtered.map((p) => (
            <Pressable
              key={p.id}
              onPress={() => {
                onConfirm(p);
                onClose();
              }}
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
                  {p.name}
                </Text>
                <Text
                  style={{
                    fontFamily: typography.fontFamily.sans,
                    fontSize: typography.size.xs,
                    color: colors.text.secondary,
                    marginTop: 2,
                  }}
                >
                  {p.address}
                </Text>
              </View>
              <ChevronRight size={18} />
            </Pressable>
          ))
        )}
      </View>
    </BottomSheet>
  );
}
