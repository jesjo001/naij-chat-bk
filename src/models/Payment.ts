import mongoose, { Schema, Document } from 'mongoose';

export interface IPayment extends Document {
  userId: mongoose.Types.ObjectId;
  transactionRef: string;
  flutterwaveId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'successful' | 'failed' | 'cancelled';
  subscriptionTier: 'naija-plus' | 'business' | 'enterprise';
  subscriptionPeriod: 'monthly' | 'yearly';
  paymentMethod?: string;
  customerEmail: string;
  customerName?: string;
  metadata?: Record<string, unknown>;
  webhookReceived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema = new Schema<IPayment>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true, // Index for user queries
    },
    transactionRef: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    flutterwaveId: {
      type: String,
      index: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      required: true,
      default: 'NGN',
      uppercase: true,
    },
    status: {
      type: String,
      enum: ['pending', 'successful', 'failed', 'cancelled'],
      default: 'pending',
      index: true,
    },
    subscriptionTier: {
      type: String,
      enum: ['naija-plus', 'business', 'enterprise'],
      required: true,
      index: true, // Index for tier queries
    },
    subscriptionPeriod: {
      type: String,
      enum: ['monthly', 'yearly'],
      default: 'monthly',
    },
    paymentMethod: {
      type: String,
    },
    customerEmail: {
      type: String,
      required: true,
      lowercase: true,
      index: true, // Index for email lookups
    },
    customerName: {
      type: String,
    },
    metadata: {
      type: Schema.Types.Mixed,
    },
    webhookReceived: {
      type: Boolean,
      default: false,
      index: true, // Index for webhook status queries
    },
  },
  { timestamps: true }
);

// Compound indexes for common query patterns
PaymentSchema.index({ userId: 1, createdAt: -1 }); // User payment history
PaymentSchema.index({ status: 1, createdAt: -1 }); // Status-based queries
PaymentSchema.index({ userId: 1, status: 1 }); // User payment status
PaymentSchema.index({ subscriptionTier: 1, status: 1 }); // Tier analytics

const Payment = mongoose.model<IPayment>('Payment', PaymentSchema);

export default Payment;
