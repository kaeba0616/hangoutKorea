export type LanguageOption = {
  code: string;
  nameKo: string;
  nameEn: string;
};

export const LANGUAGES: LanguageOption[] = [
  { code: 'ko', nameKo: '한국어', nameEn: 'Korean' },
  { code: 'en', nameKo: '영어', nameEn: 'English' },
  { code: 'ja', nameKo: '일본어', nameEn: 'Japanese' },
  { code: 'zh', nameKo: '중국어', nameEn: 'Chinese' },
  { code: 'es', nameKo: '스페인어', nameEn: 'Spanish' },
  { code: 'fr', nameKo: '프랑스어', nameEn: 'French' },
  { code: 'de', nameKo: '독일어', nameEn: 'German' },
  { code: 'it', nameKo: '이탈리아어', nameEn: 'Italian' },
  { code: 'pt', nameKo: '포르투갈어', nameEn: 'Portuguese' },
  { code: 'ru', nameKo: '러시아어', nameEn: 'Russian' },
  { code: 'ar', nameKo: '아랍어', nameEn: 'Arabic' },
  { code: 'hi', nameKo: '힌디어', nameEn: 'Hindi' },
  { code: 'th', nameKo: '태국어', nameEn: 'Thai' },
  { code: 'vi', nameKo: '베트남어', nameEn: 'Vietnamese' },
  { code: 'id', nameKo: '인도네시아어', nameEn: 'Indonesian' },
  { code: 'ms', nameKo: '말레이어', nameEn: 'Malay' },
  { code: 'tl', nameKo: '타갈로그어', nameEn: 'Tagalog' },
  { code: 'tr', nameKo: '튀르키예어', nameEn: 'Turkish' },
  { code: 'pl', nameKo: '폴란드어', nameEn: 'Polish' },
  { code: 'nl', nameKo: '네덜란드어', nameEn: 'Dutch' },
  { code: 'sv', nameKo: '스웨덴어', nameEn: 'Swedish' },
  { code: 'da', nameKo: '덴마크어', nameEn: 'Danish' },
  { code: 'no', nameKo: '노르웨이어', nameEn: 'Norwegian' },
  { code: 'fi', nameKo: '핀란드어', nameEn: 'Finnish' },
  { code: 'cs', nameKo: '체코어', nameEn: 'Czech' },
  { code: 'el', nameKo: '그리스어', nameEn: 'Greek' },
  { code: 'he', nameKo: '히브리어', nameEn: 'Hebrew' },
  { code: 'uk', nameKo: '우크라이나어', nameEn: 'Ukrainian' },
];

export type ProficiencyLevel = 'beginner' | 'intermediate' | 'advanced' | 'native';

export const PROFICIENCY_LEVELS: { value: ProficiencyLevel; label: string; phrase: string }[] = [
  { value: 'beginner', label: '초급', phrase: '서툴러요' },
  { value: 'intermediate', label: '중급', phrase: '보통이에요' },
  { value: 'advanced', label: '고급', phrase: '잘해요' },
  { value: 'native', label: '원어민', phrase: '원어민이에요' },
];
