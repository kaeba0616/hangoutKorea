# HangKo — 데모용 README

한국에서 외국인을 위한 트래블/소셜 매칭 앱. **React Native + Expo + expo-router** MVP. 시안 `HangKo_GUI_MVP_v1.0`의 **인증·온보딩 + 매칭 + 채팅 + 프로필 + 약속**까지 핵심 흐름을 모두 구현했습니다.

## 한 줄 요약

**날짜·언어·동행·위치 조건으로 매칭 → 프로필 확인 → 채팅 → 약속 만들기**까지 끊김 없이 동작하는 데모.

---

## 빠른 시작

```sh
npm install        # 의존성 (이미 설치됐으면 생략)
npm run web        # 데모용: 브라우저 → http://localhost:8081
# 또는
npm run ios        # iOS 시뮬레이터
npm run android    # Android 에뮬레이터
```

웹 데모는 `--clear` 옵션을 추가하면 캐시 초기화돼서 새로고침이 깔끔합니다:
```sh
npx expo start --web --port 8081 --clear
```

### 검증

```sh
npm run typecheck  # 0 errors
npm run lint       # 0 warnings
```

---

## 데모 시연 가이드

### 1) 첫 진입 (초기 mock 인증 상태)
- `/onboarding-splash` → "시작하기"
- → SNS 로그인 화면 → "이메일로 계속하기"
- → 이메일 → 비밀번호 (6개 룰 매트릭스 검증) → 인증 → 약관 → 가입 완료
- → 프로필 작성(`/setup`) → 국적 → 언어 → 숙련도 → 환영
- → 메인 탭(`/profile`)

> **빠른 데모 팁**: 위 흐름을 건너뛰려면 브라우저에서 바로 `/profile`, `/match`, `/chat` 으로 이동하세요. 4탭 네비게이션이 아래에 표시됩니다.

### 2) 매칭 흐름 (가장 임팩트 큰 데모)

```
/match
  → 캘린더에서 날짜 1개 이상 선택 (안 하면 "매칭하기" 비활성)
  → 위치/언어/동행/조건 설정
  → "매칭하기" 클릭
/match/searching (4.5초 애니메이션)
  → 70% 확률로 → /match/result/sarah  (성공)
  → 30% 확률로 → /match/no-result      (실패)
/match/result/sarah
  → Sarah 프로필 + 겹치는 일정 + 후기
  → "채팅하기" → /chat/sarah
```

### 3) 채팅 + 약속 만들기

```
/chat/sarah (Sarah와의 채팅, mock 메시지 4개 + 약속 카드)
  → 입력창에 메시지 → 보내기 (Enter 또는 ▶) → 메시지 추가 + 자동 스크롤
  → 약속 카드의 "수정하기" → /chat/new-appointment?edit=...
  → 또는 "+" → /chat/new-appointment (새 약속)
/chat/new-appointment
  → 모임명 입력
  → 날짜 → DatePickerSheet (캘린더 시트)
  → 시간 → TimePickerSheet (iOS 휠 스타일, 스냅 스크롤)
  → 장소 → PlacePickerSheet (검색 + 6개 mock)
  → "완료"
```

### 4) 빈 채팅방 데모

`/chat/1`, `/chat/2`, `/chat/3`, `/chat/4`, `/chat/6` — Sarah(`/chat/5`) 외 다른 채팅방은 빈 상태로 진입:
- "{이름}님과의 첫 채팅이에요" EmptyState 표시
- 메시지를 보내면 일반 채팅방처럼 동작

### 5) 프로필 + 인터랙션

- **`/profile`** — 본인 프로필. 우상단 🔔(빨간 점) → `/notifications`, ⋮ → 메뉴(프로필 수정/설정)
- **`/u/sarah`** — 다른 사용자 프로필. 받기/매칭하기, ⋮ → 신고/차단
- **`/u/followers`** — 팔로워/팔로잉 탭. ×로 삭제 (확인 모달), Following 탭에서 "팔로잉" 버튼도 삭제 트리거
- **`/u/reviews`** — 후기 카드 (실제 사진 thumbnail 포함)
- **`/u/edit`** — 프로필 수정 (이메일, 이름, 언어, 생년월일 3-Select, 성별, 국적, 자기소개)
- **`/u/settings`** — 알림/계정/약관/로그아웃
- **`/notifications`** — 알림 리스트. 탭하면 해당 화면으로 라우팅

### 6) 일정 상세

- 프로필 캘린더에서 도트 있는 날짜 클릭 → `/event/<month>-<day>`
- 또는 채팅방의 약속 카드 "장소 보기" 클릭 → `/event/<id>`
- 참가자 / 날짜·시간 / 장소·지도 / 채팅방 가기 / 수정하기

---

## 화면 카탈로그 (35개 라우트)

### 인증·온보딩
| 라우트 | 설명 |
|---|---|
| `/onboarding-splash` | 진입 스플래시 |
| `/(auth)/entry`, `/email`, `/password`, `/verify`, `/terms`, `/signup-complete` | 이메일 가입 흐름 |
| `/(onboarding)/setup`, `/nationality`, `/language`, `/proficiency`, `/complete` | 프로필 온보딩 |

### 메인 탭
| 라우트 | 설명 |
|---|---|
| `/profile` | 본인 프로필 (일정/후기 탭) |
| `/match` | 매칭 (캘린더 + 위치 + 조건) |
| `/chat` | 채팅 리스트 (대화 중 / 내가 가는 약속) |
| `/community` | 준비 중 placeholder |

### 매칭 흐름
| 라우트 | 설명 |
|---|---|
| `/match/location`, `/match/search-location` | 위치 설정 |
| `/match/searching` | 매칭 중... (4.5초 후 결과 분기) |
| `/match/result/[id]` | 매칭 성공 + 프로필 + 채팅하기/넘기기 |
| `/match/no-result` | 매칭 실패 |

### 채팅
| 라우트 | 설명 |
|---|---|
| `/chat/[id]` | 채팅방 (메시지/약속 카드/입력) |
| `/chat/new-appointment[?edit=...]` | 약속 만들기/수정 (3개 picker 시트) |
| `/chat/group/new` | 그룹채팅 만들기 (검색 + 다중 선택) |

### 사용자
| 라우트 | 설명 |
|---|---|
| `/u/[id]` | 다른 사용자 프로필 |
| `/u/edit` | 프로필 수정 |
| `/u/settings` | 설정 |
| `/u/followers` | 팔로워/팔로잉 |
| `/u/reviews`, `/u/review/[rid]`, `/u/review/new` | 후기 리스트/상세/작성 |
| `/u/report` | 신고 |

### 기타
| 라우트 | 설명 |
|---|---|
| `/notifications` | 알림 리스트 |
| `/event/[id]` | 약속 상세 |

---

## 기술 스택

- **Expo SDK 54** (managed) + **expo-router** (file-based, typed routes)
- **TypeScript** strict
- **NativeWind v4** + `theme.ts` 단일 토큰
- **React Hook Form + Zod** (비밀번호 등 폼 검증)
- **Zustand** (`useOnboardingStore`, `useFollowsStore`, `useBlocksStore`, `useMockAuth`)
- **expo-linear-gradient**, **expo-image-picker**, **expo-secure-store**, **react-native-svg**

---

## 폴더 구조

```
app/                     # expo-router 라우트 (44개 파일)
  _layout.tsx            # 폰트 게이트, SafeAreaProvider
  index.tsx              # 인증 상태에 따라 분기
  (auth)/, (onboarding)/ # 진입 흐름
  (tabs)/                # 메인 탭 (chat, match, community, profile)
  chat/, match/, u/      # stack routes
  event/, notifications.tsx
components/              # 재사용 UI (53개 파일)
  ui/                    # ButtonPrimary, BottomSheet, PopoverMenu, ConfirmDialog, EmptyState, SegmentedTabs, Switch, Slider
  form/                  # InputField, TextareaField, Radio, Checkbox, SelectField, SearchBar, CheckboxRow
  picker/                # DatePickerSheet, TimePickerSheet (iOS 휠), PlacePickerSheet
  layout/                # Screen, AppBar, PageControl
  icons/                 # 17개 인라인 SVG
  match/, chat/, profile/ # 도메인 전용
mocks/                   # 정적 데이터 single source of truth
  users.ts               # 18명 사용자
  reviews.ts             # 후기 + 후기 상세
  events.ts              # 일정/캘린더 도트/이벤트 상세
  chats.ts               # 채팅 리스트, Sarah 메시지
  notifications.ts       # 알림 (탭 시 이동할 linkTo 포함)
  places.ts              # 장소
hooks/                   # Zustand stores + 인증
  useOnboardingStore.ts  # 본인 프로필 상태
  useFollowsStore.ts     # 팔로잉/팔로워 삭제 상태
  useBlocksStore.ts      # 차단 상태
  useMockAuth.ts         # mock 인증 (secure-store)
constants/
  theme.ts, countries.ts, languages.ts
assets/
  fonts/                 # Pretendard (수동 배치)
  images/figma/          # Figma 자산 (12개: avatars, review thumbnails)
  images/                # hero-splash 등
```

---

## 디자인 토큰 (`constants/theme.ts`)

| 토큰 | 값 |
|---|---|
| brand.primary | `#81E2C9` (mint) |
| brand.secondary | `#C3E956` (lime) |
| Brand gradient | `[primary, secondary]` 0°→90° (`ButtonPrimary`) |
| text.primary / .secondary / .tertiary | `#000` / `#797979` / `#B0B0B0` |
| surface.divider / .field / .muted | `#E5E7EB` / `#F7F7F7` / `#F5F5F5` |
| Pretendard Bold/Regular | OTF |
| radius scale | 4 / 8 / 12 / 16 / 24 / 999 |
| letterSpacing | `-0.15` (숫자) |

---

## 데이터·상태 아키텍처

### 정적 데이터 = `mocks/` (단순 모듈)
- 화면 변경 없는 데이터(사용자/후기/장소/알림/일정/채팅 메시지)
- `import { USERS, getUser } from '@/mocks/users'` 형태로 어디서든 참조
- 동일 인물(예: Sarah)이 여러 화면에 등장해도 단일 출처라 일관성 보장

### 변하는 상태 = `hooks/use*Store.ts` (Zustand)
- `useFollowsStore` — 팔로잉 토글, 팔로워/팔로잉 삭제 (`/u/followers`)
- `useBlocksStore` — 차단/해제 토글 (`/u/sarah` 등)
- `useOnboardingStore` — 본인 프로필 (이름/자기소개/사진/나이/성별/국적/언어/숙련도)
- `useMockAuth` — secure-store 기반 mock 토큰 + onboarded flag

### 향후 API 연동 시
- `mocks/*.ts`의 `export const`를 `fetch` 기반 비동기 함수로 교체하거나
- 각 store에 `fetch*()` 액션을 추가해 API 호출 → store 업데이트
- 화면 코드는 변경 없이 그대로 동작

---

## 검증 결과

| 검증 | 결과 |
|---|---|
| `npm run typecheck` | ✅ 0 errors |
| `npm run lint` | ✅ 0 warnings |
| **35개 라우트 HTTP 응답** | ✅ 모두 200 |
| Metro bundle | ✅ ~7.3MB (web) |
| Playwright 시각 회귀 | ✅ 주요 화면 캡처 일관 |

---

## 알려진 한계 (mock·placeholder)

- **인증**: `useMockAuth`가 secure-store에 가짜 토큰만 저장. 실제 SNS SDK(Naver/Apple/Kakao) 미통합
- **데이터**: 모든 데이터가 정적 mock. 백엔드 호출 없음
- **지도**: 매칭 위치 / 약속 상세의 지도 영역은 mint 색 placeholder. 실제 지도 SDK 미사용
- **이미지 자산**: Figma asset URL은 7일 만료. `assets/images/figma/`에 다운로드된 PNG 사용 중
- **알림 푸시**: 푸시 토큰 등록 없음. 알림 화면은 mock 리스트만
- **그룹채팅 멤버 선택 후 동작**: "완료" 클릭 시 채팅 리스트로 돌아가나, 새 그룹방 생성은 미구현
- **약속 작성/수정 완료**: 폼 데이터를 store에 저장하지 않고 바로 `router.back()` (다음 단계로 미루어 둠)

---

## 다음 단계

API 명세서가 나오면:
1. `mocks/*.ts`의 정적 데이터를 fetch 함수로 교체
2. `hooks/use*Store.ts`에 비동기 액션 추가 (`fetchUsers`, `fetchEvents` 등)
3. 인증을 실제 SDK + JWT/세션으로 교체
4. 푸시 알림(Expo Notifications) 토큰 등록

추가 polish 후보:
- 지도 SDK 연동 (KakaoMap, Naver Maps, 또는 Google Maps)
- E2E 테스트 (Maestro 추천)
- 다국어 (i18n)
- 다크 모드

---

## 트러블슈팅

**dev server가 새 라우트를 못 잡을 때**:
```sh
pkill -f "expo start"
npx expo start --web --port 8081 --clear
```

**Figma 자산 만료 (7일)**:
- 자산은 `assets/images/figma/`에 로컬 저장돼 있어 만료와 무관
- 새 자산이 필요하면 Figma MCP 또는 수동 export 후 같은 폴더에 배치
