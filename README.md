# TodoMate API

Express + TypeScript + PostgreSQL로 만든 할 일(Todo) 관리 REST API입니다. 라우터 · 설정 · 에러 핸들러를 분리한 최소 구조로, Node 백엔드 프로젝트의 뼈대를 익히기 위해 만들었습니다.

![Node](https://img.shields.io/badge/Node.js-22-339933?logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)

## API

| Method | URI | 설명 | 응답 |
|---|---|---|---|
| GET | `/health` | 헬스 체크 | `{ "status": "ok", "service": "TodoMate API" }` |
| GET | `/api/todos` | 전체 조회 (최신순) | 200 `[{ id, title, completed, created_at }]` |
| POST | `/api/todos` | 생성 `{ "title": "..." }` | 201 생성된 todo · 400 `title is required` |
| PATCH | `/api/todos/:id` | 완료 상태 변경 `{ "completed": true }` | 200 수정된 todo · 400 · 404 |
| DELETE | `/api/todos/:id` | 삭제 | 204 · 400 · 404 |

## 시작하기

```bash
npm install
cp .env.example .env      # DATABASE_URL 수정
npm run dev               # http://localhost:4000 (ts-node-dev, 자동 재시작)
```

테이블은 직접 만들어야 합니다.

```sql
CREATE TABLE todos (
  id         SERIAL PRIMARY KEY,
  title      TEXT NOT NULL,
  completed  BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

배포용 빌드는 `npm run build` 후 `npm start` (`dist/server.js`).

## 환경 변수

| 이름 | 기본값 | 설명 |
|---|---|---|
| `PORT` | `4000` | 서버 포트 |
| `DATABASE_URL` | `postgresql://user:pass@localhost:5432/todomate` | PostgreSQL 접속 문자열 |
| `NODE_ENV` | `development` | 실행 환경 |
| `JWT_ACCESS_SECRET` · `JWT_REFRESH_SECRET` | - | 인증 기능 확장용으로 미리 정의 (현재 미사용) |

## 구조

```
src/
├── server.ts            # DB 연결 확인 후 서버 시작
├── app.ts               # Express 앱: cors · morgan · json · static · /api 라우터 · 에러 핸들러
├── config/
│   ├── env.ts           # 환경변수 로드와 필수값 검증
│   └── db.ts            # pg Pool, 시작 시 SELECT 1 연결 테스트
├── middlewares/
│   └── errorHandler.ts  # 공통 에러 응답
└── routes/
    ├── index.ts         # /api 라우터 묶음
    └── todos.ts         # /api/todos CRUD
```

## 다음 단계

- JWT 로그인 (시크릿은 이미 env에 정의)
- 마이그레이션 도구 도입 (현재 테이블은 수동 생성)
- 입력 검증 라이브러리(zod 등)와 테스트 추가
