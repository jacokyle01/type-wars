import { Request, Response } from 'express';
import { Result } from '../models/result';
import mongoose from 'mongoose';

export const addResult = async (req: Request, res: Response) => {
  console.log(req.body);
  const { uid, wpm, timeControl, createdAt } = req.body;
  const result = new Result({
    _id: new mongoose.Types.ObjectId(),
    uid,
    wpm,
    timeControl,
    createdAt: Date.now(),
  });

  await result
    .save()
    .then(result => res.status(201).json({ result }))
    .catch(error => res.status(500).json({ error }));
};

export const getResult = async (req: Request, res: Response) => {
  const id = req.params['id'];
  try {
    const result = await Result.findOne({ id }, { _id: 0, __v: 0 });
    res.json(result);
  } catch (error) {
    console.error('Error fetching result:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};