import mongoose, { Document, Schema, model } from 'mongoose';
import Inc from 'mongoose-sequence';
const AutoIncrement = Inc(mongoose);

export interface IUser {
  id: number;
  username: string;
  forename: string;
  surname: string;
  email: string;
  createdAt: Date;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  forename: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true },
  createdAt: { type: Date, required: true },
});

userSchema.plugin(AutoIncrement, { id: 'uid', inc_field: 'id' });
export const User = model<IUser>('User', userSchema);
