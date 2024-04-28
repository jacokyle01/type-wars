import { Request, Response } from 'express';
import { Result } from '../models/result';
import mongoose from 'mongoose';
import { dummyResult } from '../util/dummy';
import { PostedResult } from '../types/types';

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

export const fillResults = async (req: Request, res: Response) => {
  const count = req.params['count'];
  const results: PostedResult[] = [];
  for (let i = 0; i < parseInt(count || "0"); i++) {
    results.push(dummyResult());
  }

  await Result.insertMany(results);
  res.json(`Inserted ${count} instances of dummy data`)
}

export const allResults = async (req: Request, res: Response) => {
  try {
    const results = await Result.find({}, { _id: 0, __v: 0 });
    res.json(results);
  } catch (error) {
    console.error('Error fetching results:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
