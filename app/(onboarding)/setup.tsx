import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Alert, Image, Pressable, Text, View } from 'react-native';
import { Screen } from '@/components/layout/Screen';
import { AppBar } from '@/components/layout/AppBar';
import { ButtonPrimary } from '@/components/ui/ButtonPrimary';
import { Camera } from '@/components/icons/Camera';
import { Mail } from '@/components/icons/Mail';
import { UserOutline } from '@/components/icons/UserOutline';
import { MoreHorizontal } from '@/components/icons/MoreHorizontal';
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

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 80 }, (_, i) => `${CURRENT_YEAR - 14 - i}`);
const MONTHS = Array.from({ length: 12 }, (_, i) => `${i + 1}`);
const DAYS = Array.from({ length: 31 }, (_, i) => `${i + 1}`);

export default function ProfileStep() {
  const stored = useOnboardingStore();
  const [photoUri, setPhotoUri] = useState<string | null>(stored.photoUri);
  const [name, setName] = useState(stored.name);
  const [bio, setBio] = useState(stored.bio);
  const [year, setYear] = useState<string | null>(stored.birthYear?.toString() ?? null);
  const [month, setMonth] = useState<string | null>(stored.birthMonth?.toString() ?? null);
  const [day, setDay] = useState<string | null>(stored.birthDay?.toString() ?? null);
  const [gender, setGender] = useState<Gender | null>(stored.gender);

  const email = stored.email ?? 'userid@gmail.com';
  const nationalityCode = stored.nationality;
  const nationality = nationalityCode
    ? COUNTRIES.find((c) => c.code === nationalityCode)
    : null;

  const languagesLabel =
    stored.languages.length > 0
      ? stored.languages.length > 3
        ? `${stored.languages.slice(0, 3).join(', ')} 외 ${stored.languages.length - 3}개`
        : stored.languages.join(', ')
      : null;

  const pickImage = async () => {
    try {
      const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!perm.granted) {
        Alert.alert('권한 필요', '사진을 선택하려면 사진 라이브러리 접근 권한이 필요합니다.');
        return;
      }
      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });
      if (!res.canceled && res.assets[0]) {
        setPhotoUri(res.assets[0].uri);
      }
    } catch {
      Alert.alert('오류', '사진을 불러오지 못했습니다.');
    }
  };

  const cycle = (
    list: string[],
    current: string | null,
    setter: (v: string) => void,
  ) => {
    const idx = current ? list.indexOf(current) : -1;
    setter(list[(idx + 1) % list.length]);
  };

  const isValid =
    name.trim().length > 0 &&
    year !== null &&
    month !== null &&
    day !== null &&
    gender !== null &&
    nationalityCode !== null &&
    stored.languages.length > 0;

  const onNext = () => {
    const yearNum = year ? Number.parseInt(year, 10) : null;
    const monthNum = month ? Number.parseInt(month, 10) : null;
    const dayNum = day ? Number.parseInt(day, 10) : null;
    stored.setProfile({
      name: name.trim(),
      bio,
      age: yearNum ? CURRENT_YEAR - yearNum : null,
      birthYear: yearNum,
      birthMonth: monthNum,
      birthDay: dayNum,
      gender,
      photoUri,
    });
    router.push('/(onboarding)/complete');
  };

  return (
    <Screen scroll avoidKeyboard contentContainerStyle={{ flexGrow: 1 }}>
      <AppBar
        title="프로필 작성"
        showBack
        right={
          <Pressable hitSlop={8} style={{ padding: 8 }}>
            <MoreHorizontal size={20} />
          </Pressable>
        }
      />
      <View style={{ paddingHorizontal: 16, paddingBottom: 24 }}>
        <View style={{ alignItems: 'center', marginTop: 8, marginBottom: 24 }}>
          <Pressable onPress={pickImage}>
            <View
              style={{
                width: 96,
                height: 96,
                borderRadius: 48,
                backgroundColor: '#D8F0E7',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              {photoUri ? (
                <Image source={{ uri: photoUri }} style={{ width: 96, height: 96 }} />
              ) : (
                <UserOutline size={56} color={colors.brand.primary} />
              )}
            </View>
            <View
              style={{
                position: 'absolute',
                right: -2,
                bottom: -2,
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
              lineHeight: typography.lineHeight.md,
              color: colors.text.primary,
              letterSpacing: typography.letterSpacing,
            }}
          >
            프로필을 작성해 주세요
          </Text>
          {email ? (
            <Text
              style={{
                marginTop: 4,
                fontFamily: typography.fontFamily.sans,
                fontSize: typography.size.xs,
                color: colors.text.tertiary,
                letterSpacing: typography.letterSpacing,
              }}
            >
              {email}
            </Text>
          ) : null}
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
              value={languagesLabel ?? undefined}
              placeholder="언어를 선택하세요"
              onPress={() => router.push('/(onboarding)/language')}
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
              <SelectFieldSmall
                value={day ? `${day}일` : undefined}
                placeholder="일"
                onPress={() => cycle(DAYS, day, setDay)}
              />
              <SelectFieldSmall
                value={month ? `${month}월` : undefined}
                placeholder="월"
                onPress={() => cycle(MONTHS, month, setMonth)}
              />
              <SelectFieldSmall
                value={year ? `${year}년` : undefined}
                placeholder="년"
                onPress={() => cycle(YEARS, year, setYear)}
              />
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
              onPress={() => router.push('/(onboarding)/nationality')}
            />
          </View>

          <TextareaField
            label="자기소개"
            placeholder="나를 잘 나타낼 수 있는 소개말을 작성해 보세요"
            value={bio}
            onChangeText={setBio}
            maxLength={500}
          />
        </View>

        <View style={{ marginTop: 32 }}>
          <ButtonPrimary text="완료" onPress={onNext} disabled={!isValid} />
        </View>
      </View>
    </Screen>
  );
}
