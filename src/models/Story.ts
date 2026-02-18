import mongoose, { Schema, Document } from 'mongoose';

export interface IStory extends Document {
  title: string;
  synopsis: string;
  genre: string;
  duration: number;
  language: string;
  targetAudience: string;
  animationStyle: string;
  moral: string;
  theme?: string;
  culturalSetting?: string;
  metadata?: Record<string, unknown>;
  overview?: Record<string, unknown>;
  characters?: Record<string, unknown>[];
  script?: Record<string, unknown> | string;
  productionNotes?: Record<string, unknown> | string;
  generation?: Record<string, unknown>;
  createdAt?: Date;
  updatedAt?: Date;
}

const StorySchema = new Schema<IStory>(
  {
    title: { type: String, required: true, index: true }, // Index for title searches
    synopsis: { type: String, required: true },
    genre: { type: String, required: true, index: true }, // Index for genre filtering
    duration: { type: Number, required: true },
    language: { type: String, required: true, index: true }, // Index for language queries
    targetAudience: { type: String, required: true, index: true }, // Index for audience filtering
    animationStyle: { type: String, required: true },
    moral: { type: String, required: true },
    theme: { type: String },
    culturalSetting: { type: String },
    metadata: { type: Schema.Types.Mixed },
    overview: { type: Schema.Types.Mixed },
    characters: { type: [Schema.Types.Mixed], default: [] },
    script: { type: Schema.Types.Mixed },
    productionNotes: { type: Schema.Types.Mixed },
    generation: { type: Schema.Types.Mixed }
  },
  { timestamps: true }
);

// Compound indexes for common query patterns
StorySchema.index({ genre: 1, language: 1 });
StorySchema.index({ targetAudience: 1, language: 1 });
StorySchema.index({ createdAt: -1 }); // For sorting by creation date

const Story = mongoose.model<IStory>('Story', StorySchema);

export default Story;
