import mongoose, { Document, Schema, model } from 'mongoose';
import Inc from 'mongoose-sequence';
const AutoIncrement = Inc(mongoose);

export interface IResult {
  id: number;
  uid: number;
  wpm: number;
  timeControl: number;
  createdAt: Date;
}

const resultSchema = new Schema<IResult>({
  uid: { type: Number, required: true },
  wpm: { type: Number, required: true },
  timeControl: { type: Number, required: true },
  createdAt: { type: Date, required: true },
});

resultSchema.plugin(AutoIncrement, { id: 'rid', inc_field: 'id' });
export const Result = model<IResult>('Result', resultSchema);
