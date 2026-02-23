import nodemailer from 'nodemailer';
import axios from 'axios';
import { logger } from './logger.js';
import dotenv from 'dotenv';

dotenv.config();

export type PaymentEmailStatus = 'pending' | 'successful' | 'failed';

export interface PaymentEmailPayload {
  status: PaymentEmailStatus;
  transactionRef: string;
  amount: number;
  currency: string;
  subscriptionTier: string;
  subscriptionPeriod: string;
  customerEmail?: string;
  userId?: string;
}

const buildTransporter = () => {
  const host = process.env.MAIL_HOST;
  const port = Number(process.env.MAIL_PORT || 587);
  const user = process.env.MAIL_USER;
  const pass = process.env.MAIL_PASS;

  if (!host || !user || !pass) {
    logger.warn('Mail transport not configured - missing MAIL_HOST/MAIL_USER/MAIL_PASS');
    return null;
  }

  const secure = process.env.MAIL_SECURE === 'true' || port === 465;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
};

const formatCurrency = (amount: number, currency: string) =>
  new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);

interface InternalMailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  from?: string;
}

const sendViaMailbridge = async (options: InternalMailOptions) => {
  const apiKey = process.env.API_MAIL_KEY;
  if (!apiKey) throw new Error('API_MAIL_KEY not configured');

  const response = await axios.post(
    'https://mailserver.automationlounge.com/api/v1/messages/send',
    {
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
      from: options.from,
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.data.success) {
    console.log('Mailbridge API error:', response);
    throw new Error(`Mailbridge API error: ${JSON.stringify(response.data)}`);
  }

  return response.data;
};

const sendViaSMTP = async (options: InternalMailOptions) => {
  const transporter = buildTransporter();
  if (!transporter) throw new Error('SMTP transporter not configured (missing host/user/pass)');

  return transporter.sendMail({
    from: options.from,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
  });
};

const sendMail = async (options: InternalMailOptions) => {
  const defaultFrom = process.env.MAIL_FROM || process.env.MAIL_USER || 'no-reply@naijagbt.ai';
  const mailOptions = { ...options, from: options.from || defaultFrom };

  // Try Mailbridge API first if API key is present
  if (process.env.API_MAIL_KEY) {
    try {
      await sendViaMailbridge(mailOptions);
      logger.info('Email sent successfully via Mailbridge API', { to: mailOptions.to, subject: mailOptions.subject });
      return;
    } catch (error: any) {
      console.log('Mailbridge API failed - falling back to SMTP', error);
      logger.warn('Mailbridge API failed - falling back to SMTP', { error: error.message, to: mailOptions.to });
    }
  }

  // Fallback to SMTP
  try {
    await sendViaSMTP(mailOptions);
    logger.info('Email sent successfully via SMTP fallback', { to: mailOptions.to, subject: mailOptions.subject });
  } catch (error: any) {
      console.log('SMTP fallback failed', error);
    logger.error('Failed to send email via SMTP fallback', { error: error.message, to: mailOptions.to });
    throw error;
  }
};

export const sendPaymentStatusEmail = async (payload: PaymentEmailPayload) => {
  const to = process.env.PAYMENT_ALERT_EMAIL;
  if (!to) {
    logger.warn('PAYMENT_ALERT_EMAIL not configured - skipping payment email');
    return;
  }

  const from = process.env.MAIL_FROM || process.env.MAIL_USER || 'no-reply@naijagbt.ai';
  const subject = `Payment ${payload.status.toUpperCase()} · ${payload.subscriptionTier}`;
  const amountLabel = formatCurrency(payload.amount, payload.currency);

  const lines = [
    `Status: ${payload.status}`,
    `Tier: ${payload.subscriptionTier}`,
    `Period: ${payload.subscriptionPeriod}`,
    `Amount: ${amountLabel}`,
    `Currency: ${payload.currency}`,
    `Transaction Ref: ${payload.transactionRef}`,
    payload.customerEmail ? `Customer Email: ${payload.customerEmail}` : undefined,
    payload.userId ? `User ID: ${payload.userId}` : undefined,
  ].filter(Boolean);

  const text = lines.join('\n');
  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #111827;">
      <h2 style="margin: 0 0 12px;">Payment ${payload.status.toUpperCase()}</h2>
      <ul>
        ${lines.map((line) => `<li>${line}</li>`).join('')}
      </ul>
    </div>
  `;

  try {
    await sendMail({
      from,
      to,
      subject,
      text,
      html,
    });
    logger.info('Payment status email request processed', {
      status: payload.status,
      transactionRef: payload.transactionRef,
      to,
    });
  } catch (error) {
    logger.error('Failed to process payment status email request', { error });
  }
};

export interface EnterpriseInquiryPayload {
  name: string;
  email: string;
  company: string;
  message: string;
  inquiryId: string;
}

export const sendEnterpriseInquiryEmail = async (payload: EnterpriseInquiryPayload) => {
  const to = process.env.PAYMENT_ALERT_EMAIL || 'cov_dove@yahoo.com';
  if (!to) {
    logger.warn('Enterprise inquiry email recipient not configured');
    return;
  }

  const from = process.env.MAIL_FROM || process.env.MAIL_USER || 'no-reply@naijagbt.ai';
  const subject = `New Enterprise Inquiry from ${payload.name} · ${payload.company}`;

  const text = `
New Enterprise Plan Inquiry
===========================

Name: ${payload.name}
Email: ${payload.email}
Company: ${payload.company}
Inquiry ID: ${payload.inquiryId}

Message:
--------
${payload.message}

---
Submitted: ${new Date().toISOString()}
  `.trim();

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827; max-width: 600px;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 8px; color: white; margin-bottom: 20px;">
        <h2 style="margin: 0;">🚀 New Enterprise Plan Inquiry</h2>
      </div>

      <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h3 style="margin: 0 0 15px; color: #111827;">Contact Information</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; font-weight: 600; color: #667eea; width: 100px;">Name:</td>
            <td style="padding: 8px 0;">${payload.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 600; color: #667eea;">Email:</td>
            <td style="padding: 8px 0;"><a href="mailto:${payload.email}" style="color: #667eea; text-decoration: none;">${payload.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 600; color: #667eea;">Company:</td>
            <td style="padding: 8px 0;">${payload.company}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 600; color: #667eea;">Inquiry ID:</td>
            <td style="padding: 8px 0; font-family: monospace; background: white; padding: 8px; border-radius: 4px;">${payload.inquiryId}</td>
          </tr>
        </table>
      </div>

      <div style="background: white; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px; margin-bottom: 20px;">
        <h3 style="margin: 0 0 10px; color: #111827;">Message</h3>
        <div style="white-space: pre-wrap; color: #374151; line-height: 1.6;">
${payload.message}
        </div>
      </div>

      <div style="background: #eff6ff; padding: 15px; border-left: 4px solid #667eea; border-radius: 4px; color: #1e40af; font-size: 14px;">
        <strong>Next Steps:</strong> Review the inquiry and follow up with the contact via email within 24 hours.
      </div>

      <div style="margin-top: 20px; text-align: center; color: #9ca3af; font-size: 12px;">
        <p>Submitted: ${new Date().toLocaleString()}</p>
      </div>
    </div>
  `;

  try {
    await sendMail({
      from,
      to,
      subject,
      text,
      html,
    });
    logger.info('Enterprise inquiry email sent successfully', { inquiryId: payload.inquiryId, to });
  } catch (error) {
    logger.error('Failed to send enterprise inquiry email', { error });
    throw error;
  }
};

export interface VerificationEmailPayload {
  email: string;
  name: string;
  verificationUrl: string;
}

export const sendVerificationEmail = async (payload: VerificationEmailPayload) => {
  const from = process.env.MAIL_FROM || process.env.MAIL_USER || 'no-reply@naijagbt.ai';
  const subject = 'Verify Your Email - NaijaGPT';

  const text = `
Hello ${payload.name},

Welcome to NaijaGPT! Please verify your email address by clicking the link below:

${payload.verificationUrl}

This link will expire in 24 hours.

If you didn't create an account, please ignore this email.

Best regards,
The NaijaGPT Team
  `.trim();

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 8px 8px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to NaijaGPT! 🎉</h1>
      </div>

      <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
        <p style="font-size: 16px; margin: 0 0 20px;">Hello <strong>${payload.name}</strong>,</p>
        
        <p style="font-size: 16px; margin: 0 0 20px;">
          Thank you for signing up! To complete your registration and start using NaijaGPT, please verify your email address.
        </p>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${payload.verificationUrl}" 
             style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                    color: white; 
                    padding: 14px 32px; 
                    text-decoration: none; 
                    border-radius: 6px; 
                    font-weight: 600;
                    font-size: 16px;
                    display: inline-block;
                    box-shadow: 0 4px 6px rgba(102, 126, 234, 0.3);">
            Verify Email Address
          </a>
        </div>

        <div style="background: #f9fafb; padding: 15px; border-radius: 6px; margin: 20px 0;">
          <p style="margin: 0; font-size: 14px; color: #6b7280;">
            <strong>Note:</strong> This verification link will expire in 24 hours.
          </p>
        </div>

        <p style="font-size: 14px; color: #6b7280; margin: 20px 0 0;">
          If you didn't create an account, you can safely ignore this email.
        </p>
      </div>

      <div style="text-align: center; margin-top: 20px; padding: 20px; color: #9ca3af; font-size: 12px;">
        <p style="margin: 5px 0;">© ${new Date().getFullYear()} NaijaGPT. All rights reserved.</p>
      </div>
    </div>
  `;

  try {
    await sendMail({
      from,
      to: payload.email,
      subject,
      text,
      html,
    });
    logger.info('Verification email sent successfully', { email: payload.email });
  } catch (error) {
    logger.error('Failed to send verification email', { error, email: payload.email });
    throw error;
  }
};

export interface PasswordResetEmailPayload {
  email: string;
  name: string;
  resetUrl: string;
}

export const sendPasswordResetEmail = async (payload: PasswordResetEmailPayload) => {
  const from = process.env.MAIL_FROM || process.env.MAIL_USER || 'no-reply@naijagbt.ai';
  const subject = 'Reset Your Password - NaijaGPT';

  const text = `
Hello ${payload.name},

You requested to reset your password for your NaijaGPT account.

Click the link below to reset your password:

${payload.resetUrl}

This link will expire in 1 hour.

If you didn't request a password reset, please ignore this email or contact support if you have concerns.

Best regards,
The NaijaGPT Team
  `.trim();

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 8px 8px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">Password Reset Request</h1>
      </div>

      <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
        <p style="font-size: 16px; margin: 0 0 20px;">Hello <strong>${payload.name}</strong>,</p>
        
        <p style="font-size: 16px; margin: 0 0 20px;">
          You requested to reset your password for your NaijaGPT account. Click the button below to create a new password.
        </p>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${payload.resetUrl}" 
             style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                    color: white; 
                    padding: 14px 32px; 
                    text-decoration: none; 
                    border-radius: 6px; 
                    font-weight: 600;
                    font-size: 16px;
                    display: inline-block;
                    box-shadow: 0 4px 6px rgba(102, 126, 234, 0.3);">
            Reset Password
          </a>
        </div>

        <div style="background: #fef3c7; padding: 15px; border-left: 4px solid #f59e0b; border-radius: 6px; margin: 20px 0;">
          <p style="margin: 0; font-size: 14px; color: #92400e;">
            <strong>⚠️ Important:</strong> This password reset link will expire in 1 hour.
          </p>
        </div>

        <p style="font-size: 14px; color: #6b7280; margin: 20px 0 0;">
          If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.
        </p>
      </div>

      <div style="text-align: center; margin-top: 20px; padding: 20px; color: #9ca3af; font-size: 12px;">
        <p style="margin: 5px 0;">© ${new Date().getFullYear()} NaijaGPT. All rights reserved.</p>
        <p style="margin: 5px 0;">If you have questions, please contact our support team.</p>
      </div>
    </div>
  `;

  try {
    await sendMail({
      from,
      to: payload.email,
      subject,
      text,
      html,
    });
    logger.info('Password reset email sent successfully', { email: payload.email });
  } catch (error) {
    logger.error('Failed to send password reset email', { error, email: payload.email });
    throw error;
  }
};
