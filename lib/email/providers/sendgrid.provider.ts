// lib/email/providers/sendgrid.provider.ts
import sgMail from "@sendgrid/mail";
import type { EmailProvider, EmailOptions, EmailResult, SendGridConfig } from "./interface";

export class SendGridProvider implements EmailProvider {
  constructor(config: SendGridConfig) {
    sgMail.setApiKey(config.apiKey);
  }

  async send(options: EmailOptions): Promise<EmailResult> {
    try {
      const to = Array.isArray(options.to) ? options.to : [options.to];
      const result = await sgMail.send({
        to,
        from: options.from || "",
        subject: options.subject,
        html: options.html,
        text: options.text || options.html.replace(/<[^>]*>/g, ""),
        replyTo: options.replyTo,
      });
      console.log("✅ Email sent via SendGrid:", result[0].statusCode);
      return { success: true, messageId: (result[0].headers["x-message-id"] as string) || "sendgrid-" + Date.now() };
    } catch (error: unknown) {
      console.error("❌ SendGrid send error:", error);
      let errorMessage = "Failed to send email";
      if (error && typeof error === "object" && "response" in error) {
        const err = error as { response?: { body?: { errors?: Array<{ message?: string }> } } };
        errorMessage = err.response?.body?.errors?.[0]?.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      return { success: false, error: errorMessage };
    }
  }

  async verifyConnection(): Promise<boolean> {
    try {
      await sgMail.send({
        to: "test@example.com",
        from: "test@example.com",
        subject: "Connection Test",
        text: "Test",
        mailSettings: { sandboxMode: { enable: true } },
      });
      return true;
    } catch {
      return false;
    }
  }
}
