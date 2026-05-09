export type TermType = 'tos' | 'privacy' | 'location' | 'marketing';

export type TermBlock =
  | { kind: 'paragraph'; text: string }
  | { kind: 'circled'; index: string; text: string }
  | { kind: 'ordered'; items: string[]; start?: number }
  | { kind: 'bulleted'; items: string[] };

export type TermSection = {
  heading: string;
  blocks: TermBlock[];
};

export type TermContent = {
  title: string;
  sections: TermSection[];
};

export const TERMS_CONTENT: Record<TermType, TermContent> = {
  tos: {
    title: '이용약관',
    sections: [
      {
        heading: '제1조 (목적)',
        blocks: [
          {
            kind: 'paragraph',
            text:
              '이 약관은 주식회사 Hangout in Korea(이하 "회사"라 합니다)가 제공하는 서비스(이하 "서비스"라 합니다) 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 필요한 제반 사항을 정함을 목적으로 합니다.',
          },
        ],
      },
      {
        heading: '제2조(용어의 정의)',
        blocks: [
          { kind: 'circled', index: '①', text: '이 약관에서 사용하는 용어의 정의는 다음과 같습니다.' },
          {
            kind: 'ordered',
            start: 1,
            items: [
              '"이용고객"이란 회사가 제공하는 서비스를 이용하기 위해 앱스토어 사업자 또는 플랫폼사업자가 운영하는 앱스토어 마켓에서 애플리케이션을 다운로드 받은 자를 말합니다.',
              '"이용자"란 이 약관 및 개인정보처리방침에 동의하고 회사가 제공하는 서비스 이용자격을 부여 받은 이용고객을 말합니다.',
            ],
          },
        ],
      },
      {
        heading: '[부칙] 개인정보보호책임자',
        blocks: [
          {
            kind: 'ordered',
            start: 1,
            items: [
              '회원님의 개인정보를 보호하고 개인정보와 관련된 불만 등을 처리하기 위하여 서비스제공자는 고객서비스담당 부서 및 개인정보보호책임자를 두고 있습니다. 회원님의 개인정보와 관련한 문의사항은 아래의 개인정보보호책임자에게 연락하여 주시기 바랍니다.',
            ],
          },
          {
            kind: 'bulleted',
            items: ['대표 : 양찬진', '이메일 : raffe7600@gmail.com', '전화 : 010-3342-7473'],
          },
          { kind: 'ordered', start: 2, items: ['이 정책은 아래 시행일자부터 시행됩니다.'] },
          { kind: 'bulleted', items: ['시행일: 2026년 05월 01일'] },
        ],
      },
    ],
  },
  privacy: {
    title: '개인정보처리방침',
    sections: [
      {
        heading: '제1조 (개인정보의 수집 항목)',
        blocks: [
          {
            kind: 'paragraph',
            text:
              '회사는 서비스 제공을 위해 다음과 같은 최소한의 개인정보를 수집합니다. 수집된 개인정보는 명시된 목적 외의 용도로 사용되지 않으며, 이용 목적이 변경될 시에는 사전 동의를 구합니다.',
          },
          {
            kind: 'bulleted',
            items: [
              '필수 항목: 이메일 주소, 비밀번호, 닉네임',
              '선택 항목: 프로필 이미지, 생년월일, 국적',
            ],
          },
        ],
      },
      {
        heading: '제2조 (개인정보의 이용 및 보유 기간)',
        blocks: [
          {
            kind: 'paragraph',
            text:
              '회사는 회원의 개인정보를 회원 탈퇴 시까지 보유 및 이용하며, 관련 법령에 따라 보존이 필요한 경우 해당 기간 동안 분리 보관합니다.',
          },
        ],
      },
    ],
  },
  location: {
    title: '위치 기반 서비스 이용약관',
    sections: [
      {
        heading: '제1조 (목적)',
        blocks: [
          {
            kind: 'paragraph',
            text:
              '본 약관은 이용자가 회사가 제공하는 위치 기반 서비스를 이용함에 있어 회사와 이용자의 권리, 의무 및 책임 사항을 규정함을 목적으로 합니다.',
          },
        ],
      },
      {
        heading: '제2조 (개인 위치정보의 이용)',
        blocks: [
          {
            kind: 'paragraph',
            text:
              '회사는 이용자의 동의를 얻어 개인 위치정보를 수집하며, 이용자에게 적합한 매칭 및 추천 서비스 제공을 위한 목적으로만 사용합니다.',
          },
        ],
      },
    ],
  },
  marketing: {
    title: '프로모션 정보 수신',
    sections: [
      {
        heading: '수신 항목',
        blocks: [
          {
            kind: 'paragraph',
            text:
              '신규 이벤트, 할인 혜택, 추천 서비스 등 마케팅 목적의 정보를 이메일/푸시 알림으로 수신합니다. 동의하지 않으셔도 서비스 이용에 제한은 없으며, 언제든 수신 거부가 가능합니다.',
          },
        ],
      },
    ],
  },
};

export function isTermType(value: unknown): value is TermType {
  return value === 'tos' || value === 'privacy' || value === 'location' || value === 'marketing';
}
