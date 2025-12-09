// 기본 라우터
import { Router } from 'express';

export const router = Router();

// 나중에 여기서 /auth, /todos 라우터들 연결할 예정
// router.use('/auth', authRouter);
// router.use('/todos', todoRouter);

router.get('/', (_req, res) => {
  res.json({ message: 'Welcome to TodoMate API' });
});
