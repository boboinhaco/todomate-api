//공동 에러 처리기
import { NextFunction, Request, Response } from 'express';

interface ApiError extends Error {
  statusCode?: number;
}

export function errorHandler(
  err: ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const status = err.statusCode || 500;

  if (process.env.NODE_ENV !== 'test') {
    console.error(err);
  }

  res.status(status).json({
    error: {
      message: err.message || 'Internal Server Error',
      statusCode: status
    }
  });
}
