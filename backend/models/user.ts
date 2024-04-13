import mongoose, { Document, Schema, model } from 'mongoose';

export interface IUser {
  id: number;
  name: string;
}

const userSchema = new Schema<IUser>({
  id: { type: Number, required: true },
  name: { type: String, required: true },
});

export const User = model<IUser>('User', userSchema);
