# HangKo - Hangout in Korea

한국에서 새로운 친구를 만나는 소셜 매칭 앱

## Overview

HangKo는 한국을 방문하거나 거주하는 외국인과 현지인을 연결해주는 Flutter 기반 모바일 앱입니다. Figma 디자인(`HangKo_GUI_MVP_v1.0`)을 기반으로 구현되었습니다.

## Features

### Onboarding (00_Onboarding)
- **Splash** - 앱 소개 화면
- **Auth** - SNS 로그인 (LINE, Apple, Kakao) + 이메일 로그인
- **Email Auth** - 단계별 이메일/비밀번호 입력, 비밀번호 재설정
- **Terms** - 이용약관 및 정책 동의
- **Profile Setup** - 프로필 작성 (이름, 언어, 생년월일, 성별, 국적, 자기소개)
- **Language** - 사용 언어 선택 (최대 5개) + 숙련도 설정
- **Nationality** - 국적 선택
- **Complete** - 온보딩 완료

### User Profile (01_UserProfile)
- **My Profile** - 프로필 헤더 + 캘린더 탭 + 후기 탭
- **Other Profile** - 타인 프로필 + Follow/리뷰 작성
- **Profile Edit** - 프로필 편집 폼
- **Settings Menu** - 설정/알림/개인정보/로그아웃
- **Followers/Following** - 목록 + 삭제/언팔로우 다이얼로그
- **Reviews** - 행아웃 후기 목록/상세/작성

### Matching (02_Matching)
- **Matching Main** - 희망 일정(캘린더), 위치 설정(지도), 언어 수준, 선호 조건
- **Location Setting** - 지도 + 매칭 반경 슬라이더 (5~20km)
- **Matching Loading** - 매칭 진행 중 로딩
- **Matching Result** - 매칭 결과 없음 상태

### Chat (04_Chatting)
- **Chat List** - 대화 중인 채팅 + 나를 기다리는 채팅 (읽지않은 수 배지)
- **Chat Room** - 1:1 채팅 (메시지 버블, 약속 카드, 안전 안내 배너, 첨부 메뉴)
- **Create Appointment** - 약속 잡기 (모임명, 날짜, 시간, 장소)

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Flutter 3.41 |
| State Management | Riverpod |
| Navigation | GoRouter (ShellRoute + bottom nav) |
| Screen Adaptation | flutter_screenutil (375px base) |
| Design | Figma-based (green gradient theme) |

## Project Structure

```
lib/
├── main.dart
├── app.dart
├── core/
│   ├── router/app_router.dart      # GoRouter + ShellRoute + bottom nav
│   └── theme/                      # Colors, TextStyles, Spacing, Theme
├── shared/
│   ├── models/                     # User, Language, Nationality, Review
│   └── widgets/                    # HangkoButton, TextField, AppBar,
│                                   # SearchBar, Chip, Avatar, FollowButton,
│                                   # ProfileHeader
└── features/
    ├── splash/                     # Splash screen
    ├── auth/                       # Auth entry, email login/signup
    ├── terms/                      # Terms of service
    ├── onboarding/                 # Profile setup, language, nationality, complete
    ├── profile/                    # My/other profile, edit, menu, followers,
    │                               # following, reviews
    ├── matching/                   # Matching main, location, loading, result
    └── chat/                       # Chat list, chat room, create appointment
```

## Getting Started

```bash
# Install dependencies
flutter pub get

# Run on web
flutter run -d chrome

# Run on web server
flutter run -d web-server --web-port=8080

# Build APK
flutter build apk

# Build iOS
flutter build ios
```

## Design

- **Primary color**: Green gradient (`#4CAF50` → `#8BC34A` → `#CDDC39`)
- **Button style**: Rounded gradient (active) / grey (disabled)
- **SNS buttons**: LINE (green), Apple (black), Kakao (yellow)
- **Bottom nav**: 채팅 / 매칭 / 커뮤니티 / 프로필
- **Design width**: 375px (iPhone form factor)

## Screens

| Page | Screens | Widgets |
|------|---------|---------|
| 00_Onboarding | 26 Figma frames | 10 screen widgets |
| 01_UserProfile | 23 Figma frames | 10 screen widgets |
| 02_Matching | 7 Figma frames | 4 screen widgets |
| 04_Chatting | 6 Figma frames | 3 screen widgets |
| **Total** | **62 Figma frames** | **27 screen widgets** |

## Status

- [x] Onboarding flow (splash → auth → profile → language → nationality → complete)
- [x] User profile (my/other profile, edit, followers, following, reviews)
- [x] Matching (main, location, loading, result)
- [x] Chat (list, room, appointment)
- [x] Bottom navigation (ShellRoute)
- [x] Shared widgets (8 reusable components)
- [ ] Backend API integration
- [ ] Real map integration (Google Maps)
- [ ] Push notifications
- [ ] Community feature
- [ ] Image upload
