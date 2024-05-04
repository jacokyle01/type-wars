import mongoose, { Document, Schema, model } from 'mongoose';
import Inc from 'mongoose-sequence';
const AutoIncrement = Inc(mongoose);

export interface IResult {
  id: number;
  uname: string;
  uid: number;
  wpm: number;
  words: number;
  createdAt: Date;
}

const resultSchema = new Schema<IResult>({
  uname: {type: String, required: true},
  uid: { type: Number, required: true },
  wpm: { type: Number, required: true },
  words: { type: Number, required: true },
  createdAt: { type: Date, required: true },
});

resultSchema.plugin(AutoIncrement, { id: 'rid', inc_field: 'id' });
export const Result = model<IResult>('Result', resultSchema);
