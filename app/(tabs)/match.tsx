import { useState } from 'react';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Screen } from '@/components/layout/Screen';
import { ButtonPrimary } from '@/components/ui/ButtonPrimary';
import { Switch } from '@/components/ui/Switch';
import { Slider } from '@/components/ui/Slider';
import { Settings } from '@/components/icons/Settings';
import { MapPin } from '@/components/icons/MapPin';
import { ChevronRight } from '@/components/icons/ChevronRight';
import { MonthCalendar } from '@/components/match/MonthCalendar';
import { SectionTitle } from '@/components/match/SectionTitle';
import { colors, radius, typography } from '@/constants/theme';
import { useOnboardingStore } from '@/hooks/useOnboardingStore';
import { LANGUAGES, PROFICIENCY_LEVELS } from '@/constants/languages';

export default function MatchTab() {
  const onboarding = useOnboardingStore();
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [radiusKm, setRadiusKm] = useState(13);
  const [companion, setCompanion] = useState<'alone' | 'friend'>('alone');
  const [sameGenderOnly, setSameGenderOnly] = useState(true);
  const [oneOnOne, setOneOnOne] = useState(false);

  const onToggleDate = (date: Date) => {
    setSelectedDates((prev) => {
      const exists = prev.some(
        (d) =>
          d.getFullYear() === date.getFullYear() &&
          d.getMonth() === date.getMonth() &&
          d.getDate() === date.getDate(),
      );
      return exists
        ? prev.filter((d) => !(d.getFullYear() === date.getFullYear() && d.getMonth() === date.getMonth() && d.getDate() === date.getDate()))
        : [...prev, date];
    });
  };

  const selectedLanguages = onboarding.languages
    .map((code) => LANGUAGES.find((l) => l.code === code))
    .filter((l): l is (typeof LANGUAGES)[number] => Boolean(l));

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.surface.background }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          height: 56,
        }}
      >
        <View style={{ width: 32 }} />
        <Text
          style={{
            fontFamily: typography.fontFamily.bold,
            fontSize: typography.size.md,
            color: colors.text.primary,
            letterSpacing: typography.letterSpacing,
          }}
        >
          매칭
        </Text>
        <Pressable hitSlop={8}>
          <Settings size={22} color={colors.text.primary} />
        </Pressable>
      </View>

      <Screen scroll edges={[]}>
        <View style={{ paddingHorizontal: 24, paddingTop: 8, paddingBottom: 24 }}>
          <View style={{ marginBottom: 24 }}>
            <SectionTitle title="매칭 일정" />
            <MonthCalendar selected={selectedDates} onSelectDate={onToggleDate} />
          </View>

          <View style={{ marginBottom: 24 }}>
            <SectionTitle title="매칭 위치 설정" actionLabel="위치 변경 ›" onAction={() => router.push('/match/location')} />
            <View
              style={{
                height: 132,
                borderRadius: radius.lg,
                backgroundColor: colors.surface.muted,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 12,
                overflow: 'hidden',
              }}
            >
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: '#E8F4EF',
                }}
              />
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  gap: 6,
                }}
              >
                <MapPin size={20} />
                <Text
                  style={{
                    fontFamily: typography.fontFamily.bold,
                    fontSize: typography.size.sm,
                    color: colors.text.primary,
                    letterSpacing: typography.letterSpacing,
                  }}
                >
                  Seoul
                </Text>
              </View>
            </View>
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
                반경 변경
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
          </View>

          <View style={{ marginBottom: 24 }}>
            <SectionTitle title="사용 언어 수준" actionLabel="언어 추가 ›" onAction={() => router.push('/(onboarding)/language')} />
            <Text
              style={{
                fontFamily: typography.fontFamily.sans,
                fontSize: typography.size.xs,
                color: colors.text.secondary,
                letterSpacing: typography.letterSpacing,
                marginBottom: 8,
              }}
            >
              매칭에 반영하고 싶은 언어를 골라주세요.
            </Text>
            {selectedLanguages.length === 0 ? (
              <View
                style={{
                  height: 48,
                  borderRadius: radius.md,
                  backgroundColor: colors.surface.field,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{
                    fontFamily: typography.fontFamily.sans,
                    fontSize: typography.size.sm,
                    color: colors.text.tertiary,
                  }}
                >
                  선택된 언어가 없어요
                </Text>
              </View>
            ) : (
              <View style={{ gap: 8 }}>
                {selectedLanguages.map((lang) => {
                  const level = onboarding.proficiency[lang.code] ?? 'beginner';
                  const levelLabel =
                    PROFICIENCY_LEVELS.find((p) => p.value === level)?.label ?? '초급';
                  return (
                    <View
                      key={lang.code}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 16,
                        paddingVertical: 12,
                        backgroundColor: colors.surface.field,
                        borderRadius: radius.md,
                        gap: 12,
                      }}
                    >
                      <View
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: radius.full,
                          backgroundColor: colors.surface.background,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: typography.fontFamily.bold,
                            fontSize: typography.size.xs,
                            color: colors.text.primary,
                          }}
                        >
                          {lang.code.toUpperCase()}
                        </Text>
                      </View>
                      <Text
                        style={{
                          flex: 1,
                          fontFamily: typography.fontFamily.bold,
                          fontSize: typography.size.sm,
                          color: colors.text.primary,
                        }}
                      >
                        {lang.nameKo}
                      </Text>
                      <Text
                        style={{
                          fontFamily: typography.fontFamily.sans,
                          fontSize: typography.size.xs,
                          color: colors.text.secondary,
                        }}
                      >
                        {levelLabel}
                      </Text>
                      <ChevronRight size={16} />
                    </View>
                  );
                })}
              </View>
            )}
          </View>

          <View style={{ marginBottom: 24 }}>
            <SectionTitle title="동행 여부" />
            <View style={{ flexDirection: 'row', gap: 8 }}>
              {([
                { key: 'alone', label: '혼자 갈래요' },
                { key: 'friend', label: '친구랑 같이 갈래요' },
              ] as const).map((opt) => {
                const active = companion === opt.key;
                return (
                  <Pressable
                    key={opt.key}
                    onPress={() => setCompanion(opt.key)}
                    style={{
                      flex: 1,
                      height: 48,
                      borderRadius: radius.md,
                      borderWidth: 1.5,
                      borderColor: active ? colors.brand.primary : colors.surface.divider,
                      backgroundColor: active ? '#F2FBF7' : colors.surface.background,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: active ? typography.fontFamily.bold : typography.fontFamily.sans,
                        fontSize: typography.size.sm,
                        color: colors.text.primary,
                        letterSpacing: typography.letterSpacing,
                      }}
                    >
                      {opt.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View style={{ marginBottom: 24 }}>
            <SectionTitle title="선호 조건 설정" />
            <View style={{ gap: 4 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingVertical: 14,
                }}
              >
                <Text
                  style={{
                    fontFamily: typography.fontFamily.sans,
                    fontSize: typography.size.sm,
                    color: colors.text.primary,
                    letterSpacing: typography.letterSpacing,
                  }}
                >
                  동성만 만나고 싶어요
                </Text>
                <Switch value={sameGenderOnly} onChange={setSameGenderOnly} />
              </View>
              <View style={{ height: 1, backgroundColor: colors.surface.divider }} />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingVertical: 14,
                }}
              >
                <Text
                  style={{
                    fontFamily: typography.fontFamily.sans,
                    fontSize: typography.size.sm,
                    color: colors.text.primary,
                    letterSpacing: typography.letterSpacing,
                  }}
                >
                  1:1 만남이 좋아요
                </Text>
                <Switch value={oneOnOne} onChange={setOneOnOne} />
              </View>
            </View>
          </View>
          <View style={{ marginTop: 8 }}>
            <ButtonPrimary
              text="매칭하기"
              disabled={selectedDates.length === 0}
              onPress={() => router.push('/match/searching')}
            />
            {selectedDates.length === 0 ? (
              <Text
                style={{
                  marginTop: 8,
                  fontFamily: typography.fontFamily.sans,
                  fontSize: typography.size.xs,
                  color: colors.text.tertiary,
                  textAlign: 'center',
                  letterSpacing: typography.letterSpacing,
                }}
              >
                만나고 싶은 날짜를 한 개 이상 선택해 주세요.
              </Text>
            ) : null}
          </View>
        </View>
      </Screen>
    </SafeAreaView>
  );
}
