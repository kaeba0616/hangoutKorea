import type { ImageSourcePropType } from 'react-native';

export type UserLanguage = { code: string; name: string; level: string; phrase: string };

export type User = {
  id: string;
  name: string;
  initial?: string;
  color?: string;
  photo?: ImageSourcePropType;
  age?: number;
  gender?: '남성' | '여성';
  flag?: string;
  country?: string;
  bio?: string;
  languages?: UserLanguage[];
  following?: number;
  followers?: number;
  verified?: boolean;
};

export const USERS: Record<string, User> = {
  me: {
    id: 'me',
    name: '맹키리',
    photo: require('@/assets/images/figma/self-avatar.png'),
    age: 28,
    gender: '남성',
    flag: '🇰🇷',
    country: '대한민국',
    bio: '안녕하세요! 서울 거주 중인 직장인입니다. 맛있는 음식과 풍경 보러 다니는 것을 좋아해요. 같이 서...',
    languages: [
      { code: 'KR', name: '한국어', level: '원어민', phrase: '원어민이에요' },
      { code: 'EN', name: '영어', level: '고급', phrase: '잘해요' },
    ],
    following: 124,
    followers: 89,
    verified: true,
  },
  sarah: {
    id: 'sarah',
    name: 'Sarah',
    photo: require('@/assets/images/figma/sarah-profile.png'),
    age: 28,
    gender: '여성',
    flag: '🇺🇸',
    country: 'USA',
    bio: '서울 여행 중인 한국 문화 좋아하는 여행자입니다. 강남 맛집 같이 가실 분!',
    languages: [
      { code: 'EN', name: '영어', level: '원어민', phrase: '원어민이에요' },
      { code: 'KO', name: '한국어', level: '초급', phrase: '서툴러요' },
    ],
    following: 87,
    followers: 142,
    verified: true,
  },
  hangko: {
    id: 'hangko',
    name: '행아코',
    photo: require('@/assets/images/figma/follower-1.png'),
    age: 28,
    gender: '남성',
    flag: '🇰🇷',
    country: '대한민국',
    verified: true,
  },
  jiwoo: {
    id: 'jiwoo',
    name: '박지우',
    photo: require('@/assets/images/figma/follower-2.png'),
    age: 22,
    gender: '여성',
    flag: '🇰🇷',
    country: '대한민국',
    verified: true,
  },
  yerin: {
    id: 'yerin',
    name: '이예린',
    photo: require('@/assets/images/figma/follower-3.png'),
    age: 29,
    gender: '여성',
    flag: '🇰🇷',
    country: '대한민국',
    verified: true,
  },
  takeshi: {
    id: 'takeshi',
    name: 'タケシ',
    photo: require('@/assets/images/figma/follower-4.png'),
    age: 28,
    gender: '남성',
    flag: '🇯🇵',
    country: '일본',
    verified: true,
  },
  william: {
    id: 'william',
    name: 'William Johnson',
    initial: 'W',
    color: '#7B9EF2',
    age: 32,
    gender: '남성',
    flag: '🇺🇸',
    country: '미국',
  },
  kangminchan: {
    id: 'kangminchan',
    name: '강민찬',
    initial: '강',
    color: '#F2A07B',
    age: 26,
    gender: '남성',
    flag: '🇰🇷',
    country: '대한민국',
  },
  choijisu: {
    id: 'choijisu',
    name: '최지수, 어쥬미',
    initial: '최',
    color: '#A6D26A',
  },
  kimgunjae: {
    id: 'kimgunjae',
    name: '김건재',
    initial: '김',
    color: '#9B7BC4',
    age: 34,
    gender: '남성',
    flag: '🇰🇷',
    country: '대한민국',
    verified: true,
  },
  emily_scott: {
    id: 'emily_scott',
    name: 'Emily Scott',
    initial: 'E',
    color: '#E07BC4',
    age: 26,
    gender: '여성',
    flag: '🇬🇧',
    country: '영국',
    verified: true,
  },
  andrew_hill: {
    id: 'andrew_hill',
    name: 'Andrew Hill',
    initial: 'A',
    color: '#7BC4E0',
    age: 30,
    gender: '남성',
    flag: '🇦🇺',
    country: '호주',
  },
  emily_miller: {
    id: 'emily_miller',
    name: 'Emily Miller',
    initial: 'E',
    color: '#E07BC4',
    age: 28,
    gender: '여성',
    flag: '🇺🇸',
    country: '미국',
  },
  emily_white: {
    id: 'emily_white',
    name: 'Emily White',
    initial: 'E',
    color: '#7B9EF2',
    age: 30,
    gender: '여성',
    flag: '🇪🇸',
    country: '스페인',
  },
  emily_reddy: {
    id: 'emily_reddy',
    name: 'Emily Reddy',
    initial: 'E',
    color: '#A6D26A',
    age: 21,
    gender: '여성',
    flag: '🇮🇪',
    country: '아일랜드',
  },
  kevin: {
    id: 'kevin',
    name: 'Kevin Hart',
    initial: 'K',
    color: '#F2A07B',
    age: 26,
    gender: '남성',
    flag: '🇨🇦',
    country: '캐나다',
  },
  sarah_johnson: {
    id: 'sarah_johnson',
    name: 'Sarah Johnson',
    initial: 'S',
    color: '#9B7BC4',
    age: 28,
    gender: '여성',
    flag: '🇺🇸',
    country: '미국',
  },
  daniel: {
    id: 'daniel',
    name: 'Daniel Lee',
    initial: 'D',
    color: '#7BC4E0',
    age: 32,
    gender: '남성',
    flag: '🇰🇷',
    country: '한국',
  },
  default: {
    id: 'default',
    name: '행아우',
    initial: '행',
    color: '#A6D26A',
    age: 25,
    gender: '여성',
    flag: '🇰🇷',
    country: '대한민국',
    bio: '안녕하세요! 같이 즐거운 시간 보내요.',
    languages: [
      { code: 'KO', name: '한국어', level: '원어민', phrase: '원어민이에요' },
      { code: 'EN', name: '영어', level: '중급', phrase: '보통이에요' },
    ],
    following: 124,
    followers: 89,
  },
};

export const getUser = (id: string | null | undefined): User =>
  (id && USERS[id]) || USERS.default;

export const FOLLOWER_IDS = ['hangko', 'jiwoo', 'yerin', 'takeshi', 'william'];
export const MUTUAL_IDS = new Set(['hangko', 'jiwoo', 'yerin']);
export const FOLLOWING_IDS = ['emily_scott', 'andrew_hill', 'kimgunjae'];
export const GROUP_CHAT_CANDIDATE_IDS = [
  'emily_miller',
  'emily_white',
  'emily_reddy',
  'kevin',
  'sarah_johnson',
  'daniel',
];
