import mongoose, { Schema, Document } from 'mongoose';

export interface ICachedElement extends Document {
  key: string;
  value: Record<string, unknown> | string;
  ttlSeconds: number;
  expiresAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const CachedElementSchema = new Schema<ICachedElement>(
  {
    key: { type: String, required: true, unique: true },
    value: { type: Schema.Types.Mixed, required: true },
    ttlSeconds: { type: Number, required: true },
    expiresAt: { type: Date, required: true }
  },
  { timestamps: true }
);

CachedElementSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const CachedElement = mongoose.model<ICachedElement>('CachedElement', CachedElementSchema);

export default CachedElement;
