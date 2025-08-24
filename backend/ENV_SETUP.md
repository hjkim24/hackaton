# 환경별 설정 가이드

## 환경변수 파일 설정

### 개발 환경 (.env.development)

```bash
# Development Environment
NODE_ENV=development
PORT=3000
DATABASE_URL="postgresql://username:password@localhost:5432/hackaton_dev"
LOG_LEVEL=debug
```

### 프로덕션 환경 (.env)

```bash
# Production Environment
NODE_ENV=production
PORT=8080
DATABASE_URL="postgresql://username:password@production-db:5432/hackaton_prod"
LOG_LEVEL=info
```

## 실행 방법

### 개발 환경

```bash
# 개발 모드로 실행 (자동으로 .env.development 사용)
npm run start:dev

# 또는
NODE_ENV=development npm run start:dev
```

### 프로덕션 환경

```bash
# 프로덕션 모드로 실행 (자동으로 .env 사용)
npm run start:prod

# 또는
NODE_ENV=production npm run start:prod
```

### 테스트

```bash
# 테스트 실행 (자동으로 .env.development 사용)
npm run test
```

## Prisma 데이터베이스 관리

### 개발 환경에서 Prisma 사용
```bash
# 마이그레이션 생성 및 적용
npm run prisma:migrate:dev

# 데이터베이스 스키마 푸시
npm run db:push

# Prisma Studio 실행
npm run prisma:studio

# Prisma 클라이언트 생성
npm run prisma:generate
```

### 프로덕션 환경에서 Prisma 사용
```bash
# 프로덕션 마이그레이션 적용
npm run prisma:migrate:deploy

# Prisma 클라이언트 생성
npm run prisma:generate
```

### 수동으로 환경변수 설정하여 Prisma 실행
```bash
# 개발 환경
NODE_ENV=development npx prisma migrate dev

# 프로덕션 환경
NODE_ENV=production npx prisma migrate deploy
```

## 환경변수 우선순위

1. `NODE_ENV` 환경변수
2. `.env.development` (NODE_ENV !== 'production')
3. `.env` (NODE_ENV === 'production')
4. 기본값 (예: PORT=3000)

## 주의사항

- `.env.development`와 `.env` 파일은 `.gitignore`에 추가되어 있어야 합니다
- 민감한 정보(데이터베이스 비밀번호, API 키 등)는 환경변수로 관리하세요
- 프로덕션 환경에서는 보안을 위해 환경변수를 직접 설정하는 것을 권장합니다
- **Prisma CLI는 NestJS ConfigModule과 독립적으로 작동하므로, `NODE_ENV`를 명시적으로 설정해야 합니다**
