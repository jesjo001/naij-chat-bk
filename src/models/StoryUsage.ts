import mongoose, { Schema, Document } from 'mongoose';

export interface IStoryUsage extends Document {
  identifier: string;
  month: string; // YYYY-MM
  count: number;
  updatedAt: Date;
  createdAt: Date;
}

const StoryUsageSchema = new Schema<IStoryUsage>(
  {
    identifier: { type: String, required: true, index: true },
    month: { type: String, required: true, index: true },
    count: { type: Number, default: 0 },
  },
  { timestamps: true }
);

StoryUsageSchema.index({ identifier: 1, month: 1 }, { unique: true });

const StoryUsage = mongoose.model<IStoryUsage>('StoryUsage', StoryUsageSchema);

export default StoryUsage;
