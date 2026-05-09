# AI Prompt Library Pro

전문적인 비즈니스 및 개인용 AI 프롬프트 라이브러리 및 AI 프롬프트 강화 도구입니다.

## 🚀 주요 기능
- **100+ 프롬프트 라이브러리**: 10가지 카테고리(보고서, 마케팅, HR, IT 등)별 엄선된 프롬프트 제공.
- **AI Prompt Improver**: 단순한 입력을 Gemini AI를 통해 고대비/고효율 프롬프트로 자동 변환.
- **다국어 지원**: 한국어(KO), 영어(EN), 러시아어(RU) 완벽 지원.
- **Bold Typography 디자인**: 강렬하고 가독성 높은 다크 테마 UI/UX.
- **원클릭 복사**: 모든 프롬프트를 즉시 복사하여 사용 가능.

## 🛠 기술 스택
- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS 4 (Bold Typography Theme)
- **Animation**: Motion (Framer Motion)
- **AI Engine**: Google Gemini (gemini-3-flash-preview)
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## 📦 설치 및 실행
1. 저장소 클론
2. 의존성 설치: `npm install`
3. 환경 변수 설정: `.env` 파일에 `GEMINI_API_KEY` 추가
4. 개발 서버 실행: `npm run dev`

## 📂 프로젝트 구조
- `src/data/prompts.ts`: 프롬프트 데이터베이스
- `src/translations.ts`: 다국어 번역 문구
- `src/services/gemini.ts`: AI 로직 처리
- `src/App.tsx`: 메인 어플리케이션 레이아웃 및 로직
