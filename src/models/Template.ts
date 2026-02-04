import mongoose, { Schema, Document } from 'mongoose';

export interface ITemplate extends Document {
  name: string;
  description: string;
  category: string;
  difficulty: string;
  estimatedDuration?: string;
  defaults?: Record<string, unknown>;
  structure?: Record<string, unknown>;
  characterArchetypes?: Record<string, unknown>[];
  createdAt?: Date;
  updatedAt?: Date;
}

const TemplateSchema = new Schema<ITemplate>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    difficulty: { type: String, required: true },
    estimatedDuration: { type: String },
    defaults: { type: Schema.Types.Mixed },
    structure: { type: Schema.Types.Mixed },
    characterArchetypes: { type: [Schema.Types.Mixed], default: [] }
  },
  { timestamps: true }
);

const Template = mongoose.model<ITemplate>('Template', TemplateSchema);

export default Template;
