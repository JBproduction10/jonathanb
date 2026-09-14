// lib/email/providers/interface.ts
export interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from?: string;
  replyTo?: string;
}

export interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

export interface EmailProvider {
  send(options: EmailOptions): Promise<EmailResult>;
  verifyConnection(): Promise<boolean>;
}

export type ProviderType = "smtp" | "outlook" | "sendgrid" | "resend";

export interface SMTPConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  password: string;
}

export interface SendGridConfig {
  apiKey: string;
}

export interface ResendConfig {
  apiKey: string;
}
