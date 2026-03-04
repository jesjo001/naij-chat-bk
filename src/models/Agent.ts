import mongoose, { Schema, Document } from 'mongoose';

export interface IAgent extends Document {
  userId: string; // Reference to the user who created the agent
  name: string;
  description: string;
  systemPrompt: string;
  emoji: string;
  color?: string;
  isPublic: boolean; // Allow sharing agents with community
  usageCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const AgentSchema = new Schema<IAgent>(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    systemPrompt: {
      type: String,
      required: true,
      trim: true,
      maxlength: 5000,
    },
    emoji: {
      type: String,
      required: true,
      default: '🤖',
    },
    color: {
      type: String,
    },
    isPublic: {
      type: Boolean,
      default: false,
      index: true,
    },
    usageCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Index for querying user's agents
AgentSchema.index({ userId: 1, createdAt: -1 });

// Index for public agents
AgentSchema.index({ isPublic: 1, usageCount: -1 });

const Agent = mongoose.model<IAgent>('Agent', AgentSchema);

export default Agent;
