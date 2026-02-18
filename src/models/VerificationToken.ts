import mongoose, { Schema, Document } from 'mongoose';

export interface IVerificationToken extends Document {
  userId: mongoose.Types.ObjectId;
  token: string;
  type: 'email-verification' | 'password-reset';
  expiresAt: Date;
  createdAt: Date;
}

const VerificationTokenSchema = new Schema<IVerificationToken>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    token: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    type: {
      type: String,
      enum: ['email-verification', 'password-reset'],
      required: true,
      index: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

// Compound index for efficient queries
VerificationTokenSchema.index({ userId: 1, type: 1 });
VerificationTokenSchema.index({ token: 1, type: 1 });

// Auto-delete expired tokens
VerificationTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const VerificationToken = mongoose.model<IVerificationToken>(
  'VerificationToken',
  VerificationTokenSchema
);

export default VerificationToken;
