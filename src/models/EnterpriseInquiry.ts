import mongoose, { Document, Schema } from 'mongoose';

export interface IEnterpriseInquiry extends Document {
  name: string;
  email: string;
  company: string;
  message: string;
  userId?: string;
  status: 'new' | 'contacted' | 'converted' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

const EnterpriseInquirySchema = new Schema<IEnterpriseInquiry>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    company: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      sparse: true,
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'converted', 'rejected'],
      default: 'new',
    },
  },
  {
    timestamps: true,
  }
);

const EnterpriseInquiry = mongoose.model<IEnterpriseInquiry>(
  'EnterpriseInquiry',
  EnterpriseInquirySchema
);

export default EnterpriseInquiry;
