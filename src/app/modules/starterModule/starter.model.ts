import { Schema, model } from 'mongoose';
import { TInterface } from './starter.interface';

const modelSchema = new Schema<TInterface>(
  {},
  {
    timestamps: true,
  },
);

// make model
export const ModelSchema = model<TInterface>('ModelSchema', modelSchema);
