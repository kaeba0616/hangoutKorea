import { useState } from 'react';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { Screen } from '@/components/layout/Screen';
import { AppBar } from '@/components/layout/AppBar';
import { ButtonPrimary } from '@/components/ui/ButtonPrimary';
import { Slider } from '@/components/ui/Slider';
import { Search } from '@/components/icons/Search';
import { MapPin } from '@/components/icons/MapPin';
import { colors, radius, typography } from '@/constants/theme';

export default function LocationScreen() {
  const [radiusKm, setRadiusKm] = useState(13);

  return (
    <Screen edges={['top', 'bottom']}>
      <AppBar title="위치 설정" />

      <View style={{ paddingHorizontal: 16, marginTop: 4 }}>
        <Pressable
          onPress={() => router.push('/match/search-location')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: 44,
            paddingHorizontal: 12,
            backgroundColor: colors.surface.field,
            borderRadius: radius.md,
            gap: 8,
          }}
        >
          <Search size={18} />
          <Text
            style={{
              fontFamily: typography.fontFamily.sans,
              fontSize: typography.size.sm,
              color: colors.text.tertiary,
              letterSpacing: typography.letterSpacing,
            }}
          >
            검색...
          </Text>
        </Pressable>
      </View>

      <View
        style={{
          flex: 1,
          margin: 16,
          borderRadius: radius.lg,
          backgroundColor: '#E8F4EF',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <View
          style={{
            width: 200,
            height: 200,
            borderRadius: 100,
            backgroundColor: 'rgba(129, 226, 201, 0.2)',
            borderWidth: 2,
            borderColor: colors.brand.primary,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <MapPin size={32} />
        </View>
      </View>

      <View style={{ paddingHorizontal: 24, paddingBottom: 16 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 4,
          }}
        >
          <Text
            style={{
              fontFamily: typography.fontFamily.sans,
              fontSize: typography.size.sm,
              color: colors.text.secondary,
              letterSpacing: typography.letterSpacing,
            }}
          >
            매칭 반경
          </Text>
          <Text
            style={{
              fontFamily: typography.fontFamily.bold,
              fontSize: typography.size.sm,
              color: colors.text.primary,
              letterSpacing: typography.letterSpacing,
            }}
          >
            {`${radiusKm}km`}
          </Text>
        </View>
        <Slider value={radiusKm} min={5} max={20} onChange={setRadiusKm} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 }}>
          {['5km', '10km', '15km', '20km'].map((label) => (
            <Text
              key={label}
              style={{
                fontFamily: typography.fontFamily.sans,
                fontSize: typography.size.xs,
                color: colors.text.tertiary,
              }}
            >
              {label}
            </Text>
          ))}
        </View>
      </View>

      <View
        style={{
          marginHorizontal: 16,
          marginBottom: 12,
          padding: 12,
          borderRadius: radius.md,
          backgroundColor: colors.surface.field,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <MapPin size={18} />
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily: typography.fontFamily.bold,
              fontSize: typography.size.sm,
              color: colors.text.primary,
              letterSpacing: typography.letterSpacing,
            }}
          >
            서울특별시 강남구 신사동
          </Text>
          <Text
            style={{
              fontFamily: typography.fontFamily.sans,
              fontSize: typography.size.xs,
              color: colors.text.secondary,
              marginTop: 2,
            }}
          >
            반경 {radiusKm}km 이내
          </Text>
        </View>
      </View>

      <View style={{ paddingHorizontal: 24, paddingBottom: 24 }}>
        <ButtonPrimary text="이 위치로 설정" onPress={() => router.back()} />
      </View>
    </Screen>
  );
}
