import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  state: string;
  language: string;
  role: 'user' | 'admin';
  emailVerified: boolean;
  subscriptionTier: 'free' | 'naija-plus' | 'business' | 'enterprise';
  subscriptionStatus: 'active' | 'cancelled' | 'expired';
  subscriptionStartDate?: Date;
  subscriptionEndDate?: Date;
  paymentHistory: string[]; // Array of payment IDs
  createdAt: Date;
  updatedAt: Date;
  comparePassword(password: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email address',
      ],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false, // Don't return password by default
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      index: true, // Index for queries by state
    },
    language: {
      type: String,
      required: true,
      default: 'pidgin',
      index: true, // Index for queries by language
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
      index: true, // Index for role-based queries
    },
    emailVerified: {
      type: Boolean,
      default: false,
      index: true, // Index for verification status queries
    },
    subscriptionTier: {
        type: String,
        enum: ['free', 'naija-plus', 'business', 'enterprise'],
        default: 'free',
        index: true, // Index for subscription queries
      },
      subscriptionStatus: {
        type: String,
        enum: ['active', 'cancelled', 'expired'],
        default: 'active',
        index: true, // Index for status checks
      },
      subscriptionStartDate: {
        type: Date,
      },
      subscriptionEndDate: {
        type: Date,
        index: true, // Index for expiration queries
      },
      paymentHistory: {
        type: [String],
        default: [],
      },
  },
  { timestamps: true }
);

// Compound indexes for common query patterns
UserSchema.index({ email: 1, role: 1 });
UserSchema.index({ subscriptionTier: 1, subscriptionStatus: 1 });
UserSchema.index({ createdAt: -1 }); // For sorting by creation date

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function (
  passwordToCompare: string
): Promise<boolean> {
  return bcrypt.compare(passwordToCompare, this.password);
};

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
