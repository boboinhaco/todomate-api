// 서버 시작 파일
import app from './app';
import { env } from './config/env';
import { testDbConnection } from './config/db';

const PORT = env.PORT;

async function bootstrap() {
  try {
    await testDbConnection(); // DB 연결 체크
    console.log('🚀 PostgreSQL Connected Successfully');

    app.listen(PORT, () => {
      console.log(`🚀 TodoMate API server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

bootstrap();

