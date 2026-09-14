// lib/email/providers/smtp.provider.ts
import nodemailer from "nodemailer";
import type { EmailProvider, EmailOptions, EmailResult, SMTPConfig } from "./interface";

export class SMTPProvider implements EmailProvider {
  private transporter: nodemailer.Transporter;

  constructor(config: SMTPConfig) {
    this.transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: { user: config.user, pass: config.password },
      ...(config.host.includes("office365") || config.host.includes("outlook") || config.port === 587
        ? { tls: { ciphers: "SSLv3" } }
        : {}),
    });
  }

  async send(options: EmailOptions): Promise<EmailResult> {
    try {
      const to = Array.isArray(options.to) ? options.to.join(", ") : options.to;
      const info = await this.transporter.sendMail({
        from: options.from,
        to,
        subject: options.subject,
        html: options.html,
        text: options.text || options.html.replace(/<[^>]*>/g, ""),
        replyTo: options.replyTo,
      });
      console.log("✅ Email sent via SMTP:", info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error("❌ SMTP send error:", error);
      return { success: false, error: error instanceof Error ? error.message : "Failed to send email" };
    }
  }

  async verifyConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      return true;
    } catch (error) {
      console.error("❌ SMTP connection failed:", error);
      return false;
    }
  }
}
