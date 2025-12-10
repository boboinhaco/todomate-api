import { Router } from 'express';
import { pool } from '../config/db';

export const todosRouter = Router();

// 전체 Todo 조회
todosRouter.get('/', async (_req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT id, title, completed, created_at FROM todos ORDER BY id DESC',
    );
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

// Todo 생성
/**
 * Todo 추가: POST /api/todos
 * body: { "title": "할 일 제목" }
 */
todosRouter.post('/', async (req, res, next) => {
  try {
    const { title } = req.body;

    if (!title || typeof title !== 'string') {
      return res.status(400).json({ error: 'title is required' });
    }

    const result = await pool.query(
      'INSERT INTO todos (title) VALUES ($1) RETURNING id, title, completed, created_at',
      [title],
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

/**
 * Todo 완료 상태 변경: PATCH /api/todos/:id
 * body: { "completed": true }  // or false
 */
todosRouter.patch('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { completed } = req.body;

    if (Number.isNaN(id)) {
      return res.status(400).json({ error: 'invalid id' });
    }
    if (typeof completed !== 'boolean') {
      return res.status(400).json({ error: 'completed must be boolean' });
    }

    const result = await pool.query(
      'UPDATE todos SET completed = $1 WHERE id = $2 RETURNING id, title, completed, created_at',
      [completed, id],
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'todo not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

/**
 * Todo 삭제: DELETE /api/todos/:id
 */
todosRouter.delete('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({ error: 'invalid id' });
    }

    const result = await pool.query(
      'DELETE FROM todos WHERE id = $1',
      [id],
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'todo not found' });
    }

    res.status(204).send(); // 내용 없는 성공 응답
  } catch (err) {
    next(err);
  }
});