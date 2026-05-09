import type { ReviewItemData } from '@/components/profile/ReviewItem';

export const REVIEWS: ReviewItemData[] = [
  {
    id: 'r1',
    reviewer: '강진',
    reviewerPhoto: require('@/assets/images/figma/review-dot-1.png'),
    photo: require('@/assets/images/figma/review-img-1.png'),
    date: '2026.8.8 만남',
    text: 'It was great to meet you, Kevin Dariella, and another friend! I had a wonderful time.',
  },
  {
    id: 'r2',
    reviewer: '이유지',
    reviewerPhoto: require('@/assets/images/figma/review-dot-2.png'),
    photo: require('@/assets/images/figma/review-img-2.png'),
    photoCount: 2,
    date: '2026.7.10 만남',
    text: '다른 친구를 만나서 정말 즐거운 시간이었습니다! 정말 기분 좋은 경험이었어요.',
  },
  {
    id: 'r3',
    reviewer: 'Isabella Anderson',
    reviewerPhoto: require('@/assets/images/figma/review-dot-3.png'),
    photo: require('@/assets/images/figma/review-img-3.png'),
    photoCount: 2,
    date: '2026.8.8 만남',
    text: 'It was great to meet you, Kevin Dariella, and another friend! I had a wonderful time.',
  },
];

export const getReview = (id: string | null | undefined): ReviewItemData | undefined =>
  id ? REVIEWS.find((r) => r.id === id) : undefined;

export type ReviewDetail = {
  id: string;
  reviewer: string;
  initial: string;
  color: string;
  date: string;
  rating: number;
  title: string;
  text: string;
};

export const REVIEW_DETAILS: Record<string, ReviewDetail> = {
  r1: {
    id: 'r1',
    reviewer: '민지',
    initial: '민',
    color: '#A6D26A',
    date: '2026년 5월 2일',
    rating: 5,
    title: '시간 맞춰 잘 와주시고 분위기도 좋았어요',
    text: '시간 맞춰 잘 와주시고 분위기도 좋았어요! 다음에 또 만나고 싶네요. 강남 카페도 좋은 곳 추천해주셔서 즐거운 하루였습니다.',
  },
  r2: {
    id: 'r2',
    reviewer: 'Isabelle Anderson',
    initial: 'I',
    color: '#7B9EF2',
    date: '2026년 4월 27일',
    rating: 5,
    title: 'It was a wonderful afternoon!',
    text: 'It was great to meet you. Kevin, Daniela, and another friend! I had a wonderful time. The places you suggested were perfect for a first-time visitor.',
  },
};
