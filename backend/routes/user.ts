import express, { Router, Request, Response } from 'express';

export const router = express.Router();
router.get('/all', async (req: Request, res: Response) => {
  res.send('Hello World');
});
