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
    title: { type: String, required: true },
    synopsis: { type: String, required: true },
    genre: { type: String, required: true },
    duration: { type: Number, required: true },
    language: { type: String, required: true },
    targetAudience: { type: String, required: true },
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

const Story = mongoose.model<IStory>('Story', StorySchema);

export default Story;
