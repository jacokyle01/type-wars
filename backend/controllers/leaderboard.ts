import { Request, Response } from 'express';
import { Result } from '../models/result';

export const getLeaderboard = async (req: Request, res: Response) => {
  const { timeControl, limit } = req.query;
  const query = timeControl ? { timeControl } : {};
  const projection = { _id: 0, __v: 0 };

  const options = {};

  try {
    const leaderboard = await Result.find(query, null, projection)
      .sort({ wpm: -1 })
      .limit(parseInt(limit as string));
    res.json(leaderboard);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
