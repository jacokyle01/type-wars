import express, { Router, Request, Response } from 'express';
import { getLeaderboard } from '../controllers/leaderboard';

const router = Router();
//get leaderboard
//has query parameters timeControl and limit
//returns results ordered by wpm 
router.get('', getLeaderboard);

export default router;
