import { useState } from 'react';
import { router } from 'expo-router';
import { Image, Pressable, Text, View } from 'react-native';
import { Screen } from '@/components/layout/Screen';
import { AppBar } from '@/components/layout/AppBar';
import { Camera } from '@/components/icons/Camera';
import { Mail } from '@/components/icons/Mail';
import { UserOutline } from '@/components/icons/UserOutline';
import { InputField } from '@/components/form/InputField';
import { Radio } from '@/components/form/Radio';
import { TextareaField } from '@/components/form/TextareaField';
import { SelectFieldSmall } from '@/components/form/SelectFieldSmall';
import { COUNTRIES } from '@/constants/countries';
import { useOnboardingStore } from '@/hooks/useOnboardingStore';
import type { Gender } from '@/hooks/useOnboardingStore';
import { colors, typography } from '@/constants/theme';

const GENDER_OPTIONS: { value: Gender; label: string }[] = [
  { value: 'male', label: '남성' },
  { value: 'female', label: '여성' },
  { value: 'other', label: '기타' },
];

const YEARS = Array.from({ length: 70 }, (_, i) => `${2010 - i}년`);
const MONTHS = Array.from({ length: 12 }, (_, i) => `${i + 1}월`);
const DAYS = Array.from({ length: 31 }, (_, i) => `${i + 1}일`);

export default function ProfileEdit() {
  const stored = useOnboardingStore();
  const [photoUri, setPhotoUri] = useState<string | null>(stored.photoUri);
  const [name, setName] = useState(stored.name || '행아코');
  const [email] = useState(stored.email ?? 'userid@gmail.com');
  const [bio, setBio] = useState(stored.bio || '잘 부탁드립니다! 저는 힐링하는 여행을 좋아해요.');
  const [gender, setGender] = useState<Gender | null>(stored.gender ?? 'male');
  const [year, setYear] = useState<string | null>('2005년');
  const [month, setMonth] = useState<string | null>('12월');
  const [day, setDay] = useState<string | null>('10일');
  const [languagesLabel] = useState('한국어, 영어, 일본어 외 1개');

  const nationality = stored.nationality
    ? COUNTRIES.find((c) => c.code === stored.nationality)
    : COUNTRIES.find((c) => c.code === 'US') ?? null;

  const onSave = () => {
    const yearNum = year ? Number.parseInt(year, 10) : null;
    const monthNum = month ? Number.parseInt(month, 10) : null;
    const dayNum = day ? Number.parseInt(day, 10) : null;
    stored.setProfile({
      name: name.trim(),
      bio,
      age: yearNum ? new Date().getFullYear() - yearNum : null,
      birthYear: yearNum,
      birthMonth: monthNum,
      birthDay: dayNum,
      gender,
      photoUri,
    });
    router.back();
  };

  const cycleYear = () => setYear(YEARS[(YEARS.indexOf(year ?? YEARS[0]) + 1) % YEARS.length]);
  const cycleMonth = () => setMonth(MONTHS[(MONTHS.indexOf(month ?? MONTHS[0]) + 1) % MONTHS.length]);
  const cycleDay = () => setDay(DAYS[(DAYS.indexOf(day ?? DAYS[0]) + 1) % DAYS.length]);

  return (
    <Screen scroll avoidKeyboard contentContainerStyle={{ flexGrow: 1 }}>
      <AppBar
        title="프로필 수정"
        right={
          <Pressable hitSlop={8} onPress={onSave}>
            <Text
              style={{
                fontFamily: typography.fontFamily.bold,
                fontSize: typography.size.sm,
                color: colors.text.primary,
                letterSpacing: typography.letterSpacing,
              }}
            >
              저장
            </Text>
          </Pressable>
        }
      />
      <View style={{ paddingHorizontal: 24, paddingBottom: 32 }}>
        <View style={{ alignItems: 'center', marginTop: 8, marginBottom: 24 }}>
          <Pressable onPress={() => setPhotoUri(null)}>
            <View
              style={{
                width: 96,
                height: 96,
                borderRadius: 48,
                backgroundColor: colors.surface.field,
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              <Image
                source={
                  photoUri
                    ? { uri: photoUri }
                    : require('@/assets/images/figma/self-avatar.png')
                }
                style={{ width: 96, height: 96 }}
              />
            </View>
            <View
              style={{
                position: 'absolute',
                right: 0,
                bottom: 0,
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: colors.brand.primary,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 2,
                borderColor: colors.surface.background,
              }}
            >
              <Camera size={16} color="#FFFFFF" />
            </View>
          </Pressable>
          <Text
            style={{
              marginTop: 12,
              fontFamily: typography.fontFamily.bold,
              fontSize: typography.size.md,
              color: colors.text.primary,
              letterSpacing: typography.letterSpacing,
            }}
          >
            {name || '행아코'}
          </Text>
          <Text
            style={{
              marginTop: 2,
              fontFamily: typography.fontFamily.sans,
              fontSize: typography.size.xs,
              color: colors.text.tertiary,
              letterSpacing: typography.letterSpacing,
            }}
          >
            {email}
          </Text>
        </View>

        <View style={{ gap: 16 }}>
          <InputField
            label="이메일"
            value={email}
            editable={false}
            rightAccessory={<Mail size={18} />}
          />

          <View>
            <InputField
              label="이름"
              placeholder="이름을 입력하세요"
              value={name}
              onChangeText={setName}
              maxLength={20}
              rightAccessory={<UserOutline size={18} />}
            />
            <Text
              style={{
                marginTop: 6,
                fontFamily: typography.fontFamily.sans,
                fontSize: typography.size.xs,
                color: colors.text.tertiary,
                letterSpacing: typography.letterSpacing,
              }}
            >
              본인인증을 진행하면 본명으로 변경됩니다.
            </Text>
          </View>

          <View>
            <Text
              style={{
                fontFamily: typography.fontFamily.sans,
                fontSize: typography.size.sm,
                color: colors.text.secondary,
                marginBottom: 6,
              }}
            >
              사용 가능한 언어
            </Text>
            <SelectFieldSmall
              value={languagesLabel}
              onPress={() => router.push('/language')}
            />
          </View>

          <View>
            <Text
              style={{
                fontFamily: typography.fontFamily.sans,
                fontSize: typography.size.sm,
                color: colors.text.secondary,
                marginBottom: 6,
              }}
            >
              생년월일
            </Text>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <SelectFieldSmall value={year ?? undefined} placeholder="년" onPress={cycleYear} />
              <SelectFieldSmall value={month ?? undefined} placeholder="월" onPress={cycleMonth} />
              <SelectFieldSmall value={day ?? undefined} placeholder="일" onPress={cycleDay} />
            </View>
          </View>

          <View>
            <Text
              style={{
                fontFamily: typography.fontFamily.sans,
                fontSize: typography.size.sm,
                color: colors.text.secondary,
                marginBottom: 8,
              }}
            >
              성별
            </Text>
            <View style={{ flexDirection: 'row', gap: 24 }}>
              {GENDER_OPTIONS.map((opt) => (
                <Radio
                  key={opt.value}
                  selected={gender === opt.value}
                  onPress={() => setGender(opt.value)}
                  label={opt.label}
                />
              ))}
            </View>
          </View>

          <View>
            <Text
              style={{
                fontFamily: typography.fontFamily.sans,
                fontSize: typography.size.sm,
                color: colors.text.secondary,
                marginBottom: 6,
              }}
            >
              국적
            </Text>
            <SelectFieldSmall
              value={nationality?.nameKo}
              placeholder="국적을 선택하세요"
              onPress={() => router.push('/nationality')}
            />
          </View>

          <TextareaField
            label="자기소개"
            placeholder="자유롭게 자신을 소개해주세요"
            value={bio}
            onChangeText={setBio}
            maxLength={500}
          />
        </View>
      </View>
    </Screen>
  );
}
