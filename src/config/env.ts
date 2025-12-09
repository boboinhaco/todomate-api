//환경변수 관리 파일
import dotenv from 'dotenv';

dotenv.config();

function getEnv(key: string, defaultValue?: string): string {
  const value = process.env[key] ?? defaultValue;
  if (value === undefined) {
    throw new Error(`Environment variable ${key} is required`);
  }
  return value;
}

export const env = {
    NODE_ENV: getEnv('NODE_ENV', 'development'),
  PORT: Number(getEnv('PORT', '4000')),
  DATABASE_URL: getEnv('DATABASE_URL', 'postgresql://user:pass@localhost:5432/todomate'),
  JWT_ACCESS_SECRET: getEnv('JWT_ACCESS_SECRET', 'change_me_access'),
  JWT_REFRESH_SECRET: getEnv('JWT_REFRESH_SECRET', 'change_me_refresh'),
  // 나중에 DATABASE_URL, JWT_SECRET 등 여기 계속 추가할 예정
};
