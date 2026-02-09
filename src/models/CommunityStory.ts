import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ICommunityStory extends Document {
  title: string;
  author: string;
  authorId?: Types.ObjectId;
  authorAvatar?: string;
  type: string;
  language: string;
  duration: number;
  excerpt: string;
  content?: string;
  views: number;
  likes: number;
  comments: number;
  saves: number;
  createdAt: Date;
  updatedAt: Date;
}

const CommunityStorySchema = new Schema<ICommunityStory>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    authorId: { type: Schema.Types.ObjectId, ref: 'User' },
    authorAvatar: { type: String },
    type: { type: String, required: true },
    language: { type: String, required: true },
    duration: { type: Number, required: true },
    excerpt: { type: String, required: true },
    content: { type: String },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
    saves: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const CommunityStory = mongoose.model<ICommunityStory>('CommunityStory', CommunityStorySchema);

export default CommunityStory;
