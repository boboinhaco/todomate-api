// Express 앱 설정
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { router as apiRouter } from './routes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

// 공통 미들웨어
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// API prefix
app.use('/api', apiRouter);

// 헬스 체크 엔드포인트
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', service: 'TodoMate API' });
});

// 에러 핸들러 (항상 마지막에)
app.use(errorHandler);

export default app;
