import { Request, Response } from 'express';
import { User } from '../models/user';
import mongoose from 'mongoose';

export const allUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({}, { _id: 0, __v: 0 });
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const addUser = async (req: Request, res: Response) => {
  console.log(req.body);
  const { username, forename, surname, email } = req.body;
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    username,
    forename,
    surname,
    email,
    createdAt: Date.now(),
  });

  await user
    .save()
    .then(user => res.status(201).json({ user }))
    .catch(error => res.status(500).json({ error }));
};

export const getUser = async (req: Request, res: Response) => {
  const id = req.params['id'];
  try {
    const user = await User.findOne({ id }, { _id: 0, __v: 0 });
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  console.log(req.params);
  const id = req.params['id'];
  try {
    const deletedUser = await User.deleteOne({ id });
    if (deletedUser.deletedCount === 0) {
      res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

//theoritically, the response body may contain many attributes,
//but we are only deserializing email, if it exists.
export const updateEmail = async (req: Request, res: Response) => {
  const id = req.params['id'];
  const { email } = req.body;
  try {
    const updatedUser = await User.findOneAndUpdate({ id }, { email });
    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'Email updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating email:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
