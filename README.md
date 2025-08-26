# LunChat

대학생들의 관심사를 바탕으로 밥약 매칭해주는 서비스

## 📋 프로젝트 개요

LunChat은 대학생들이 공강 시간과 관심사를 공유하여 새로운 친구와 밥약을 잡을 수 있는 매칭 플랫폼입니다. FullCalendar를 활용한 직관적인 시간 선택 기능과 관심사 기반 매칭 시스템을 제공합니다.

## 🚀 주요 기능

### 👤 사용자 관리

- **회원가입/로그인**: 안전한 인증 시스템
- **프로필 관리**: 상세한 개인정보 및 관심사 설정
- **MBTI, 학적정보**: 매칭에 활용되는 개인 정보

### ⏰ 공강 시간 관리

- **FullCalendar 기반 시간 선택**: 월~금, 9:00-24:00, 30분 단위
- **드래그 선택**: 직관적인 시간대 선택
- **실시간 편집**: 클릭으로 삭제, 드래그로 추가
- **데이터 구조**: `{ day: 'MON', spareTime: '09:00' }` 형태로 저장

### 🎯 관심사 설정

- **기본 관심사**: 16개 카테고리 제공 (취업, 창업, 연구, 자격증, 게임, 음악, 운동, 독서, 요리, 패션, 미식, 여행, 사진, 노래, 춤, 밴드)
- **커스텀 관심사**: 직접 입력으로 추가 가능
- **Badge 형태**: 선택된 관심사를 시각적으로 표시

### 💬 채팅 시스템

- **추천된 사람**: 관심사 기반 매칭 결과
- **실시간 채팅**: WebSocket 기반 실시간 통신
- **사용자 카드**: 프로필 사진, 닉네임, 나이, 관심사 표시

## 🛠 기술 스택

### Frontend

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **State Management**: Zustand
- **Calendar**: FullCalendar
- **Notifications**: Sonner (Toast)
- **Icons**: React Icons

### Backend

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL (Prisma ORM)
- **Real-time**: Socket.io
- **Authentication**: JWT

### Development Tools

- **Package Manager**: pnpm
- **Code Quality**: ESLint
- **Database**: Docker Compose

## 📁 프로젝트 구조

```
hackaton/
├── frontend/                 # Next.js 프론트엔드
│   ├── app/                 # App Router 구조
│   │   ├── (main)/         # 메인 레이아웃
│   │   │   ├── chat/       # 채팅 관련 페이지
│   │   │   ├── mypage/     # 마이페이지
│   │   │   ├── search/     # 검색 페이지
│   │   │   └── page.tsx    # 홈페이지
│   │   └── globals.css     # 전역 스타일
│   ├── components/         # 재사용 컴포넌트
│   │   ├── ui/            # Shadcn/ui 컴포넌트
│   │   ├── LoginForm.tsx  # 로그인 폼
│   │   ├── PreferenceSelector.tsx  # 관심사 선택
│   │   └── TimeSelectionCalendar.tsx  # 시간 선택 캘린더
│   ├── lib/               # 유틸리티 및 상수
│   ├── stores/            # Zustand 스토어
│   └── types/             # TypeScript 타입 정의
├── backend/               # NestJS 백엔드
│   ├── src/              # 소스 코드
│   │   ├── chat/         # 채팅 모듈
│   │   ├── user/         # 사용자 모듈
│   │   └── main.ts       # 애플리케이션 진입점
│   ├── prisma/           # 데이터베이스 스키마
│   └── docker-compose.yml # 데이터베이스 설정
└── README.md             # 프로젝트 문서
```

## 🚀 시작하기

### Prerequisites

- Node.js 18+
- pnpm
- Docker & Docker Compose

### Frontend 실행

```bash
cd frontend

# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev
```

### Backend 실행

```bash
cd backend

# 의존성 설치
pnpm install

# 데이터베이스 실행
docker-compose up -d

# Prisma 마이그레이션
pnpm prisma migrate dev

# 개발 서버 실행
pnpm run start:dev
```

## 📱 주요 페이지

### 🏠 홈페이지 (`/`)

- 서비스 소개 및 로그인/회원가입

### 👤 마이페이지 (`/mypage`)

- **프로필 정보**: 개인정보, 학적정보, MBTI
- **관심사 설정**: 기본/커스텀 관심사 선택
- **공강 시간 설정**: FullCalendar 기반 시간 선택

### 💬 채팅 (`/chat`)

- **추천된 사람**: 매칭된 사용자 목록
- **채팅방**: 실시간 메시지 교환

### 🔍 검색 (`/search`)

- 사용자 검색 및 필터링

## 🎨 UI/UX 특징

### 🎯 직관적인 시간 선택

- **FullCalendar**: 전문적인 캘린더 인터페이스
- **드래그 선택**: 마우스로 시간대 드래그하여 선택
- **클릭 삭제**: 선택된 시간 클릭으로 삭제
- **제약 조건**: 월~금, 9:00-24:00, 30분 단위만 선택 가능

### 🏷 관심사 관리

- **Badge 형태**: 선택된 관심사를 시각적으로 표시
- **편집 모드**: 수정/취소/저장 버튼으로 상태 관리
- **커스텀 입력**: 직접 관심사 추가 가능

### 📱 반응형 디자인

- **모바일 우선**: 하단 네비게이션 바
- **그리드 레이아웃**: 화면 크기에 따른 자동 조정
- **Touch-friendly**: 터치 기반 인터페이스

## 👥 팀원

- **권서진** - Frontend Developer
- **김학재** - Backend Developer
- **유도현** - Backend Developer
- **전수민** - Frontend Developer
- **최중현** - Designer, Frontend Developer

---

**LunChat** - 대학생 밥약 매칭 플랫폼 🍽️
