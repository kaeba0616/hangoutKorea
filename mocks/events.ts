import type { EventItemData } from '@/components/profile/EventListItem';

export type EventDetail = {
  title: string;
  date: string;
  time: string;
  place: string;
  address: string;
  participants: { initial: string; color: string; name: string }[];
  chatId: string;
};

export const RECENT_EVENTS: EventItemData[] = [
  {
    id: 'e1',
    title: '홍대 먹부림',
    participants: '강진, Kevin Daniela 외 1명',
    location: '홍대입구역',
    time: '오후 2:00',
    date: '2026.08.08',
    dotColor: '#F4C430',
  },
  {
    id: 'e2',
    title: '북촌 한옥 마을 구경해요',
    participants: '이지유, Anne Marie 외 3명',
    location: '안국역',
    time: '오전 10:00',
    date: '2026.07.10',
    dotColor: '#A6D26A',
  },
  {
    id: 'e3',
    title: '강남 로컬 맛집 투어',
    participants: 'Kevin, Isabelle',
    location: '신사동',
    time: '오후 7:00',
    date: '2026.06.12',
    dotColor: '#7B9EF2',
  },
  {
    id: 'e4',
    title: '한강 야시장',
    participants: 'Andrew',
    location: '여의도',
    time: '오후 8:30',
    date: '2026.04.28',
    dotColor: '#E07BC4',
  },
];

export const RECENT_EVENTS_OTHER: EventItemData[] = [
  {
    id: 'e1',
    title: '카페 투어',
    participants: 'Sarah 외 1명',
    location: '성수동',
    time: '오후 3:00',
    date: '2026.08.20',
    dotColor: '#F4C430',
  },
  {
    id: 'e2',
    title: '한강 야경 산책',
    participants: 'Kevin',
    location: '여의도',
    time: '오후 8:00',
    date: '2026.08.14',
    dotColor: '#A6D26A',
  },
];

// 시안의 mock(8월) 패턴을 현재 월(5월)에 매핑 — today 기준 캘린더가 자동으로 활성 날짜 표시
export const MY_SCHEDULED = [
  new Date(2026, 4, 17),
  new Date(2026, 4, 18),
  new Date(2026, 4, 19),
  new Date(2026, 4, 20),
  new Date(2026, 4, 21),
];

export const MY_DOTS = [
  new Date(2026, 4, 8),
  new Date(2026, 4, 9),
  new Date(2026, 4, 10),
];

export const OTHER_SCHEDULED = [
  new Date(2026, 4, 14),
  new Date(2026, 4, 17),
  new Date(2026, 4, 20),
];

export const OTHER_DOTS = [
  new Date(2026, 4, 7),
  new Date(2026, 4, 9),
  new Date(2026, 4, 22),
];

export const EVENTS: Record<string, EventDetail> = {
  '4': {
    title: '벙커 약속',
    date: '2026.12.01 (월)',
    time: '13:00',
    place: '강남역 8번 출구',
    address: '서울 강남구 강남대로 396',
    participants: [
      { initial: 'S', color: '#E07BC4', name: 'Sarah' },
      { initial: '나', color: '#A6D26A', name: '나' },
    ],
    chatId: '5',
  },
  default: {
    title: '주말 한강 피크닉',
    date: '2026.05.18 (일)',
    time: '14:00',
    place: '뚝섬한강공원',
    address: '서울 광진구 자양동 704-1',
    participants: [
      { initial: 'S', color: '#E07BC4', name: 'Sarah' },
      { initial: 'D', color: '#7BC4E0', name: 'Daniel' },
      { initial: '나', color: '#A6D26A', name: '나' },
    ],
    chatId: '5',
  },
};

export const getEvent = (id: string | null | undefined): EventDetail =>
  (id && EVENTS[id]) || EVENTS.default;
