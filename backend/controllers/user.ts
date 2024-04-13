import { Request, Response } from 'express';
import { User } from '../models/user';
import mongoose from 'mongoose';

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

export const addUser = async (req: Request, res: Response) => {
  console.log(req.body);
  const { id, name } = req.body;
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    id,
    name,
  });

  await user
    .save()
    .then(user => res.status(201).json({ user }))
    .catch(error => res.status(500).json({ error }));
};
