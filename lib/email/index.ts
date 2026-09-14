// lib/email/index.ts
// Email service factory - creates and manages email providers
import type {
  EmailProvider,
  EmailOptions,
  EmailResult,
  ProviderType,
  SMTPConfig,
  SendGridConfig,
  ResendConfig,
} from "./providers/interface";
import { SMTPProvider } from "./providers/smtp.provider";
import { SendGridProvider } from "./providers/sendgrid.provider";
import { ResendProvider } from "./providers/resend.provider";

export interface EmailConfig {
  provider: ProviderType;
  fromName: string;
  fromEmail: string;
  replyTo?: string;
  smtp?: SMTPConfig;
  sendgrid?: SendGridConfig;
  resend?: ResendConfig;
}

class EmailService {
  private provider: EmailProvider | null = null;
  private config: EmailConfig | null = null;

  initialize(config: EmailConfig) {
    this.config = config;
    this.provider = this.createProvider(config);
    console.log(`📧 Email service initialized with provider: ${config.provider}`);
  }

  clearCache() {
    this.provider = null;
    this.config = null;
  }

  private createProvider(config: EmailConfig): EmailProvider {
    switch (config.provider) {
      case "smtp":
      case "outlook":
        if (!config.smtp) throw new Error("SMTP configuration is required");
        return new SMTPProvider(config.smtp);

      case "sendgrid":
        if (!config.sendgrid) throw new Error("SendGrid API key is required");
        return new SendGridProvider(config.sendgrid);

      case "resend":
        if (!config.resend) throw new Error("Resend API key is required");
        return new ResendProvider(config.resend);

      default:
        throw new Error(`Unknown email provider: ${config.provider}`);
    }
  }

  async send(options: EmailOptions): Promise<EmailResult> {
    if (!this.provider || !this.config) {
      throw new Error("Email service not initialized. Please configure email settings first.");
    }

    const from = options.from || `${this.config.fromName} <${this.config.fromEmail}>`;

    return this.provider.send({
      ...options,
      from,
      replyTo: options.replyTo || this.config.replyTo || this.config.fromEmail,
    });
  }

  async verifyConnection(): Promise<boolean> {
    if (!this.provider) {
      console.error("❌ Email service not initialized");
      return false;
    }
    return this.provider.verifyConnection();
  }

  getProviderType(): ProviderType | null {
    return this.config?.provider || null;
  }

  isInitialized(): boolean {
    return this.provider !== null;
  }
}

export const emailService = new EmailService();

export type { EmailProvider, EmailOptions, EmailResult, ProviderType, SMTPConfig, SendGridConfig, ResendConfig };
