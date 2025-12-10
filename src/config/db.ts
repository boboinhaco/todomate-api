// src/config/db.ts
import { Pool } from 'pg';
import { env } from './env';

export const pool = new Pool({
  connectionString: env.DATABASE_URL,
});

// 선택: 연결 확인용 (서버 시작할 때 한 번만 테스트)
export async function testDbConnection() {
  const client = await pool.connect();
  try {
    await client.query('SELECT 1');
    console.log('✅ PostgreSQL connected');
  } finally {
    client.release();
  }
}
