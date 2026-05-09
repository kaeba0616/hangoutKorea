export type NotificationItem = {
  id: string;
  title: string;
  body: string;
  time: string;
  linkTo?: string;
};

export const NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    title: '새로운 매칭이 도착했어요',
    body: 'Sarah님이 매칭을 제안했어요. 프로필을 확인해 보세요.',
    time: '방금',
    linkTo: '/u/sarah',
  },
  {
    id: 'n2',
    title: '약속 D-1 알림',
    body: '내일 14:00 뚝섬한강공원에서 만남이 있어요.',
    time: '오전 9:00',
    linkTo: '/event/4',
  },
  {
    id: 'n3',
    title: '새 후기를 받았어요',
    body: '민지님이 시간 맞춰 잘 와주시고 분위기도 좋았다는 후기를 남겼어요.',
    time: '어제',
    linkTo: '/u/reviews',
  },
];
