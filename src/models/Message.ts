import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IMessage extends Document {
  conversationId: Types.ObjectId;
  userId: Types.ObjectId;
  role: 'user' | 'assistant';
  content: string;
  language: string;
  personality: string;
  timestamp: Date;
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: 'Conversation',
      required: true,
      index: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    role: {
      type: String,
      enum: ['user', 'assistant'],
      required: true,
      index: true, // Index for filtering by role
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    language: {
      type: String,
      required: true,
      default: 'pidgin',
      index: true, // Index for language-based queries
    },
    personality: {
      type: String,
      required: true,
      default: 'lagos-hustler',
      index: true, // Index for personality queries
    },
    timestamp: {
      type: Date,
      required: true,
      default: Date.now,
      index: true, // Index for time-based queries
    },
  },
  { timestamps: true }
);

// Compound indexes for common query patterns
MessageSchema.index({ conversationId: 1, timestamp: -1 }); // Get messages by conversation sorted by time
MessageSchema.index({ userId: 1, createdAt: -1 }); // Get user messages sorted by creation
MessageSchema.index({ conversationId: 1, role: 1 }); // Filter messages by conversation and role

const Message = mongoose.model<IMessage>('Message', MessageSchema);

export default Message;
