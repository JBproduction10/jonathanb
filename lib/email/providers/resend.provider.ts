// lib/email/providers/resend.provider.ts
import { Resend } from "resend";
import type { EmailProvider, EmailOptions, EmailResult, ResendConfig } from "./interface";

export class ResendProvider implements EmailProvider {
  private resend: Resend;

  constructor(config: ResendConfig) {
    this.resend = new Resend(config.apiKey);
  }

  async send(options: EmailOptions): Promise<EmailResult> {
    try {
      const to = Array.isArray(options.to) ? options.to.join(", ") : options.to;
      const result = await this.resend.emails.send({
        from: options.from || "",
        to,
        subject: options.subject,
        html: options.html,
        text: options.text || options.html.replace(/<[^>]*>/g, ""),
        replyTo: options.replyTo,
      });
      if (result.error) return { success: false, error: result.error.message };
      console.log("✅ Email sent via Resend:", result.data?.id);
      return { success: true, messageId: result.data?.id || "resend-" + Date.now() };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : "Failed to send email" };
    }
  }

  async verifyConnection(): Promise<boolean> {
    try {
      const result = await this.resend.domains.list();
      return result.data !== undefined;
    } catch {
      return false;
    }
  }
}
