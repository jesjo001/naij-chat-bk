import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IConversation extends Document {
  userId: Types.ObjectId;
  title: string;
  messageCount: number;
  lastMessageAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const ConversationSchema = new Schema<IConversation>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      default: 'New Conversation',
      trim: true,
    },
    messageCount: {
      type: Number,
      required: true,
      default: 0,
    },
    lastMessageAt: {
      type: Date,
      default: null,
      index: true, // Index for sorting by last activity
    },
  },
  { timestamps: true }
);

// Compound indexes for common query patterns
ConversationSchema.index({ userId: 1, lastMessageAt: -1 }); // Get user conversations sorted by activity
ConversationSchema.index({ userId: 1, createdAt: -1 }); // Get user conversations sorted by creation

const Conversation = mongoose.model<IConversation>('Conversation', ConversationSchema);

export default Conversation;
