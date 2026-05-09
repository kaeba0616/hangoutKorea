# Images

## 필요 자산

스플래시 화면(`app/onboarding-splash.tsx`)에서 사용하는 히어로 이미지가 필요합니다.

- `hero-splash.png` — Figma 노드 `3610:3823`의 한복/한옥 풍경 이미지

## Figma에서 자산 추출

Figma MCP가 제공한 자산 URL은 7일간만 유효합니다. 다음 중 한 가지로 받으세요:

1. Figma desktop/web에서 해당 노드(또는 image 1)를 선택 → Export → PNG @1x
2. MCP `get_design_context` 응답의 asset URL을 만료 전에 다운로드

이 폴더에 `hero-splash.png`로 저장하면 자동으로 사용됩니다.

## 자산이 없을 때

`expo-image`의 `Image` 컴포넌트가 require가 실패하면 그라디언트 배경으로 폴백합니다.
앱은 정상 동작하지만 스플래시는 단색 그라디언트로 표시됩니다.

## 그 외 정해진 자산

다음 이미지/아이콘은 SVG 컴포넌트(`components/icons/*.tsx`)로 인라인 구현되어 있어 추가 자산 파일이 필요하지 않습니다:

- arrow-right
- safety
- check / radio dot
- 국기 (`country-flag-icons` 패키지 사용 권장)
- profile placeholder (CSS로 구현)
