// 서버 시작 파일
import app from './app';
import { env } from './config/env';

const PORT = env.PORT;

app.listen(PORT, () => {
  console.log(`🚀 TodoMate API server running on port ${PORT}`);
});
