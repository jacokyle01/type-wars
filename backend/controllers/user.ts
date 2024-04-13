import { Request, Response } from 'express';
import { User } from '../models/user';

export const allUsers = async (req: Request, res: Response) => {
  // res.json({});
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
