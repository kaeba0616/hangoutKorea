# Fonts

이 디렉토리에 Pretendard 폰트 파일을 추가해야 디자인과 동일한 타이포가 렌더됩니다.

## 필요 파일

- `Pretendard-Regular.otf`
- `Pretendard-Bold.otf`

## 다운로드 방법

공식 저장소에서 받습니다:

- 저장소: https://github.com/orioncactus/pretendard
- 직접 링크 (jsDelivr CDN):
  - https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages/pretendard/dist/public/static/Pretendard-Regular.otf
  - https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages/pretendard/dist/public/static/Pretendard-Bold.otf

받은 파일을 이 폴더(`assets/fonts/`)에 그대로 두세요.

## 폰트가 없을 때

`expo-font`의 `useFonts` 훅이 실패하면 시스템 기본 글꼴(`Apple SD Gothic Neo` / `Roboto`)로 폴백합니다.
앱은 정상 동작하지만 디자인과 미세하게 다르게 보일 수 있습니다.
